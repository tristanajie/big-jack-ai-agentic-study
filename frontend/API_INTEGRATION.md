# 🔌 API Integration Guide

## Overview

The frontend communicates with the backend API at `http://127.0.0.1:8000`. All requests are made directly from React components using the Fetch API.

## Environment Setup

Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

In components:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
```

## API Endpoints

### 1. Upload PDF
**Endpoint:** `POST /upload`

**Component:** `PDFUploadSection.tsx`

```typescript
const formData = new FormData();
formData.append("file", file);

const response = await fetch("http://127.0.0.1:8000/upload", {
  method: "POST",
  body: formData,
});

// Response
{
  "message": "PDF uploaded successfully",
  "characters": 12345,
  "preview": "First 500 characters of extracted text..."
}
```

**Features:**
- Only accepts PDF files
- Returns character count and text preview
- Content stored in temporary backend storage
- Used by Summarize, Q&A, and Quiz features

### 2. Summarize Document
**Endpoint:** `POST /api/summarize`

**Component:** `SummarizeSection.tsx`

```typescript
const response = await fetch("http://127.0.0.1:8000/api/summarize", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: textContent }),
});

// Response
{
  "summary": "Concise summary of the document..."
}
```

**Features:**
- Works with uploaded PDF content OR custom text
- Returns comprehensive summary
- Can export as TXT file
- Error handling for empty documents

### 3. Question & Answer
**Endpoint:** `POST /qa`

**Component:** `QASection.tsx`

```typescript
const response = await fetch("http://127.0.0.1:8000/qa", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    context: documentContent,
    question: userQuestion,
  }),
});

// Response
{
  "answer": "Detailed answer based on the context..."
}
```

**Features:**
- Requires uploaded document as context
- Generates answers based on document content
- Supports follow-up questions
- Maintains history in frontend

### 4. Quiz Generator
**Endpoint:** `POST /quiz`

**Component:** `QuizSection.tsx`

```typescript
const response = await fetch("http://127.0.0.1:8000/quiz", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: studyMaterial }),
});

// Response
{
  "quiz": [
    {
      "question": "Question text?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
    },
    ...
  ]
}
```

**Features:**
- Generates multiple choice questions
- Creates interactive quiz interface
- Calculates score based on answers
- Can generate from any text

## Error Handling Patterns

### Try-Catch with User Feedback
```typescript
try {
  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (response.ok) {
    // Success handling
    setSummary(data.summary);
  } else {
    setError(data.error || "Operation failed");
  }
} catch (error) {
  setError(`Error: ${error}`);
}
```

### Response Status Codes
- `200` - Success
- `400` - Bad request (invalid input)
- `422` - Validation error
- `500` - Server error

## State Management

Each section component manages its own state:
```typescript
const [content, setContent] = useState("");
const [result, setResult] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
```

Shared state through parent component:
```typescript
// In Home component
const [uploadedContent, setUploadedContent] = useState("");

// Pass to child components
<SummarizeSection uploadedContent={uploadedContent} />
<QASection uploadedContent={uploadedContent} />
```

## Loading and Disabled States

```typescript
<button
  onClick={handleAction}
  disabled={loading || !requiredData}
  className="disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Processing..." : "Action"}
</button>
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────┐
│ Home (page.tsx)                             │
│ • Manages active tab                        │
│ • Stores uploadedContent                    │
│ • Routes between sections                   │
└────────────┬────────────────────────────────┘
             │
             ├─→ PDFUploadSection
             │   └─→ POST /upload
             │       └─→ Updates uploadedContent
             │
             ├─→ SummarizeSection
             │   └─→ POST /api/summarize
             │       └─→ Displays summary
             │
             ├─→ QASection
             │   └─→ POST /qa
             │       └─→ Maintains history
             │
             └─→ QuizSection
                 └─→ POST /quiz
                     └─→ Interactive quiz UI
```

## File Upload Handling

### PDF Upload
```typescript
const handleUpload = async () => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData, // Don't set Content-Type header!
  });
};
```

**Important Notes:**
- Don't set `Content-Type` header (browser sets it with boundary)
- Only PDF files accepted (.pdf extension check)
- File size: Recommended < 10MB

## Debugging Tips

### 1. Check Network Requests
```javascript
// In browser console
fetch("http://127.0.0.1:8000/health")
  .then(r => r.json())
  .then(d => console.log(d))
```

### 2. CORS Issues
If you see CORS error, ensure backend has:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)
```

### 3. Response Structure
Always check response structure before using:
```typescript
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
```

## Adding New Features

### Example: Add "Export as PDF" Feature

1. **Create new component:**
```typescript
// components/ExportFeature.tsx
export default function ExportFeature({ content }) {
  const handleExportPDF = () => {
    // Use html2pdf library
  };
}
```

2. **Add to main page:**
```typescript
<ExportFeature content={summary} />
```

3. **Install dependency:**
```bash
npm install html2pdf.js
```

## Performance Considerations

1. **Debounce Search** - For real-time question input
```typescript
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
```

2. **Cancel Previous Requests** - Prevent race conditions
```typescript
const controller = new AbortController();
fetch(url, { signal: controller.signal });
```

3. **Limit Request Size** - For file uploads
```typescript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
if (file.size > MAX_FILE_SIZE) {
  // Show error
}
```

## Testing

### Manual Testing Checklist
- [ ] Upload PDF and verify content extraction
- [ ] Generate summary from uploaded PDF
- [ ] Ask questions about document
- [ ] Generate quiz from text
- [ ] All error states display correctly
- [ ] Responsive design on mobile/tablet
- [ ] Keyboard navigation works

### Using curl to test API
```bash
# Test health
curl http://127.0.0.1:8000/health

# Test summarize
curl -X POST http://127.0.0.1:8000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text here"}'

# Test upload
curl -X POST http://127.0.0.1:8000/upload \
  -F "file=@document.pdf"
```

## Deployment Considerations

When deploying to production:

1. **Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://api.production.com
```

2. **CORS Configuration** - Update backend to allow production domain

3. **API Rate Limiting** - Implement on backend for scalability

4. **Error Logging** - Send errors to monitoring service (Sentry, etc.)

5. **Performance Monitoring** - Track API response times