# 🏗️ Architecture & Data Flow Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
│                   (http://localhost:3000)                       │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  Next.js Frontend                                      │    │
│  │  ├── Layout (Header, Navigation)                      │    │
│  │  ├── Home Page (Feature Navigation)                   │    │
│  │  ├── PDFUploadSection (📤)                            │    │
│  │  ├── SummarizeSection (📄)                            │    │
│  │  ├── QASection (💬)                                   │    │
│  │  └── QuizSection (🎯)                                 │    │
│  └────────────────────────────────────────────────────────┘    │
│              │                                                   │
│              │ HTTP POST/GET Requests                           │
│              │ JSON Data Exchange                               │
│              │                                                   │
└──────────────┼────────────────────────────────────────────────┘
               │
               │ CORS Enabled
               ↓
        ┌──────────────────────────────────────────┐
        │   FastAPI Backend                        │
        │   (http://127.0.0.1:8000)                │
        │  ┌───────────────────────────────────┐   │
        │  │ API Routes                        │   │
        │  ├── POST /upload                    │   │
        │  ├── POST /api/summarize             │   │
        │  ├── POST /qa                        │   │
        │  └── POST /quiz                      │   │
        │  └───────────────────────────────────┘   │
        │                                           │
        │  ┌───────────────────────────────────┐   │
        │  │ Services Layer                    │   │
        │  ├── pdf_parser.py                   │   │
        │  ├── summarizer.py                   │   │
        │  ├── qa_engine.py                    │   │
        │  ├── quiz_generator.py               │   │
        │  └── llm_service.py                  │   │
        │  └───────────────────────────────────┘   │
        │                                           │
        │  ┌───────────────────────────────────┐   │
        │  │ External Services                 │   │
        │  ├── LLM API (OpenAI, etc.)          │   │
        │  ├── Document Storage                │   │
        │  └── Vector Database (Optional)      │   │
        │  └───────────────────────────────────┘   │
        └──────────────────────────────────────────┘
```

---

## Data Flow: Upload PDF

```
User
  ↓
[Choose/Drag PDF File]
  ↓
PDFUploadSection.tsx
  ├── Validates file type (.pdf)
  ├── Shows file preview
  └── Creates FormData
      ↓
  POST http://127.0.0.1:8000/upload
      ↓
Backend: routes/upload.py
  ├── Validates PDF
  ├── Extracts text using pdf_parser.py
  └── Stores in document_store (temp memory)
      ↓
Response: {
  "message": "PDF uploaded successfully",
  "characters": 12345,
  "preview": "First 500 chars..."
}
  ↓
Frontend Updates
  ├── Shows success message ✅
  ├── Displays character count
  ├── Stores uploadedContent in state
  └── Enables Summarize, Q&A, Quiz features
```

---

## Data Flow: Summarize

```
User on SummarizeSection
  ├── Option 1: Use Uploaded PDF
  │   └── Uses: document_store["content"]
  └── Option 2: Enter Custom Text
      └── Uses: customText from textarea
      ↓
[Click: Generate Summary]
  ↓
POST http://127.0.0.1:8000/api/summarize
Body: { "text": "document content..." }
  ↓
Backend: routes/summarize.py
  ├── Receives text
  ├── Calls: summarizer.summarize_text(text)
  │   └── Uses LLM to create summary
  └── Returns summary
      ↓
Response: {
  "summary": "Concise summary of document..."
}
  ↓
Frontend Display
  ├── Sets loading = false
  ├── Shows summary in result area
  ├── Enables download button
  └── Updates UI with success state
```

---

## Data Flow: Question & Answer

```
User on QASection
  ├── [Ensures PDF is uploaded]
  ├── [Types question in textarea]
  └── [Presses Ctrl+Enter or clicks button]
      ↓
POST http://127.0.0.1:8000/qa
Body: {
  "context": "document content...",
  "question": "user question..."
}
  ↓
Backend: routes/qa.py
  ├── Receives context + question
  ├── Calls: qa_engine.answer_question(context, question)
  │   └── Uses LLM to generate answer
  └── Returns answer
      ↓
Response: {
  "answer": "Detailed answer based on context..."
}
  ↓
Frontend Updates
  ├── Displays answer in result area
  ├── Adds {q, a} to history array
  ├── Clears question input
  └── Shows history panel with Q&A history
      ↓
User can ask follow-up questions
(Process repeats)
```

---

## Data Flow: Quiz Generation

```
User on QuizSection
  ├── [Types/Pastes study material]
  └── [Clicks: Generate Quiz]
      ↓
POST http://127.0.0.1:8000/quiz
Body: { "text": "study material..." }
  ↓
Backend: routes/quiz.py
  ├── Receives text
  ├── Calls: quiz_generator.generate_quiz(text)
  │   ├── Uses LLM to create questions
  │   ├── Generates options for each question
  │   └── Returns quiz data
  └── Returns quiz array
      ↓
Response: {
  "quiz": [
    {
      "question": "Question 1?",
      "options": ["A", "B", "C", "D"]
    },
    ...
  ]
}
  ↓
Frontend Quiz Interface
  ├── Shows current question (1 of N)
  ├── Displays options as radio buttons
  ├── Progress bar shows completion %
  ├── User selects answers
  ├── Previous/Next buttons for navigation
  └── Submit button on last question
      ↓
On Submit:
  ├── Calculate score
  ├── Show results screen
  ├── Option to create new quiz
  └── Option to go back home
```

---

## Component Hierarchy

```
RootLayout (app/layout.tsx)
  ├── Header (Navigation bar)
  │   ├── Logo
  │   ├── Title
  │   └── Status
  │
  ├── Main Content (Conditional Rendering)
  │   ├── Home Page (Default)
  │   │   ├── Hero Section
  │   │   ├── Features Grid
  │   │   │   ├── PDFUploadSection (Left)
  │   │   │   ├── SummarizeCard (Right)
  │   │   │   ├── QACard (Right)
  │   │   │   └── QuizCard (Right)
  │   │   └── Stats Section
  │   │
  │   ├── Summarize Page (If activeTab === "summarize")
  │   │   └── SummarizeSection
  │   │       ├── Input Panel
  │   │       └── Output Panel
  │   │
  │   ├── Q&A Page (If activeTab === "qa")
  │   │   └── QASection
  │   │       ├── Input Panel (Sticky)
  │   │       ├── Current Answer
  │   │       └── History Panel
  │   │
  │   └── Quiz Page (If activeTab === "quiz")
  │       └── QuizSection
  │           ├── Quiz Generator
  │           ├── Quiz Display
  │           └── Results Screen
  │
  └── Footer (Copyright)
```

---

## State Management Flow

```
Home Component (page.tsx)
  ├── uploadedContent: string
  │   └── Passed to: SummarizeSection, QASection
  │   └── Updated by: PDFUploadSection (via callback)
  │
  ├── activeTab: "home" | "summarize" | "qa" | "quiz"
  │   └── Controls: Which section displays
  │   └── Updated by: Button clicks
  │
  ├── PDFUploadSection
  │   └── Local state: file, loading, message
  │
  ├── SummarizeSection
  │   ├── Local state: customText, summary, loading, error
  │   └── Uses uploadedContent (prop)
  │
  ├── QASection
  │   ├── Local state: question, answer, history, loading, error
  │   └── Uses uploadedContent (prop)
  │
  └── QuizSection
      ├── Local state: text, quiz, currentQuestion, score, answers
      └── No props (independent)
```

---

## API Contract

### Request/Response Patterns

#### Successful Request
```
REQUEST:
  Method: POST
  URL: http://127.0.0.1:8000/endpoint
  Headers: {"Content-Type": "application/json"}
  Body: {...data}

RESPONSE:
  Status: 200
  Body: {
    "result": "data",
    "message": "Optional success message"
  }
```

#### Error Request
```
REQUEST:
  Method: POST
  URL: http://127.0.0.1:8000/endpoint
  Body: {...invalid_data}

RESPONSE:
  Status: 400 or 500
  Body: {
    "error": "Error description",
    "detail": "Additional details"
  }
```

---

## Component Responsibilities

### PDFUploadSection
```
Responsibilities:
├── Handle file selection (input + drag-drop)
├── Validate file type
├── Send POST /upload request
├── Parse response
├── Show feedback (loading, error, success)
└── Pass content to parent via callback

Input: onUploadSuccess callback
Output: Triggers parent state update
```

### SummarizeSection
```
Responsibilities:
├── Accept uploadedContent from parent
├── Allow custom text input
├── Send POST /api/summarize request
├── Display summary result
├── Provide download functionality
└── Handle errors gracefully

Input: uploadedContent prop, onBack callback
Output: None (displays data)
```

### QASection
```
Responsibilities:
├── Accept uploadedContent from parent
├── Provide question input
├── Send POST /qa request with context
├── Maintain Q&A history array
├── Display current answer
├── Show history panel
└── Handle keyboard shortcuts

Input: uploadedContent prop, onBack callback
Output: None (maintains local history)
```

### QuizSection
```
Responsibilities:
├── Accept text input for quiz generation
├── Send POST /quiz request
├── Parse quiz response
├── Display quiz interface
├── Track current question
├── Record user answers
├── Calculate and display score
└── Allow quiz restart

Input: onBack callback
Output: None (self-contained)
```

---

## Data Structures

### Uploaded Document
```typescript
uploadedContent: string
// Example:
"Joko Widodo adalah Presiden Indonesia..."
```

### Summary Result
```typescript
summary: string
// Example:
"Dokumen ini membahas perjalanan karir Joko Widodo..."
```

### Q&A Item
```typescript
{ q: string, a: string }
// Example:
{
  q: "Siapa Joko Widodo?",
  a: "Joko Widodo adalah..."
}
```

### Quiz Question
```typescript
{
  id: number,
  question: string,
  options: string[]
}
// Example:
{
  id: 1,
  question: "Berapa lama Jokowi menjadi Presiden?",
  options: ["10 tahun", "10 tahun", "12 tahun", "14 tahun"]
}
```

---

## Rendering Flow

```
User visits http://localhost:3000
  ↓
Next.js loads layout.tsx
  ├── Imports globals.css (Tailwind)
  ├── Renders Header component
  ├── Renders Main content area
  ├── Renders Footer component
  └── Imports page.tsx
      ↓
page.tsx renders (Home component)
  ├── Initializes state (uploadedContent, activeTab)
  ├── activeTab === "home" → Display home layout
  │   ├── Render hero section
  │   ├── Render features grid
  │   └── Render upload section
  └── User clicks feature → activeTab changes
      ├── Conditional render switches to new component
      └── Component receives props (uploadedContent, onBack)
         ↓
      Component renders
      User interacts (click buttons, type text, etc.)
         ↓
      API call to backend
         ↓
      Receive response
      Update local state
      Re-render component
      Display results
```

---

## Performance Flow

```
Initial Load
  ├── Parse HTML
  ├── Load CSS (Tailwind)
  ├── Load JavaScript
  ├── Initialize React
  ├── Render components
  └── Ready ✅

After User Interaction
  ├── User clicks button
  ├── React updates state
  ├── Component re-renders
  ├── API call sends (async)
  ├── Show loading state
  ├── Receive response
  ├── Update state
  ├── Re-render with results
  └── Ready ✅
```

---

## Error Handling Flow

```
Error Occurs
  ├── Backend returns error response
  │   └── 400: Bad request
  │   └── 422: Validation error
  │   └── 500: Server error
  └── Frontend receives error
      ├── Extract error message
      ├── Set error state
      ├── Component re-renders
      ├── Show error message to user
      └── Disable submit button
```

---

## Navigation Map

```
Home Page
├─ Click "Summarize" → Summarize Page
│  └─ Click "Back" → Home Page
├─ Click "Q&A" → Q&A Page
│  └─ Click "Back" → Home Page
├─ Click "Quiz" → Quiz Page
│  └─ Click "Back" → Home Page
└─ Upload PDF available on all pages
```

---

## Mobile Responsive Flow

```
Desktop (> 1024px)
├── 3 column layout
├── Sidebar navigation
└── Full featured UI

Tablet (640px - 1024px)
├── 2 column layout
├── Flexible navigation
└── Adapted UI

Mobile (< 640px)
├── Single column stack
├── Touch-friendly buttons
└── Simplified UI
```

---

**This diagram set helps understand the complete architecture and data flow of the AI Study Assistant application.**