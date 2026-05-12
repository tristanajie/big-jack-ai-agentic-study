# 📚 AI Study Assistant - Project Overview

## 🎯 Project Summary

**AI Study Assistant** adalah aplikasi web modern untuk analisis dokumen cerdas dengan AI. Dibangun dengan Next.js dan Tailwind CSS, aplikasi ini menyediakan alat pembelajaran interaktif untuk mahasiswa dan profesional.

**Purpose:** Memudahkan pengguna untuk menganalisis dokumen PDF, membuat ringkasan, bertanya tentang konten, dan membuat kuis interaktif.

---

## 🏗️ Architecture

### Tech Stack
```
Frontend                Backend
├── Next.js 16         ├── FastAPI
├── React 19           ├── Python 3.11+
├── TypeScript          ├── LLM Services
├── Tailwind CSS 4     ├── PDF Parser
└── ES2024             └── Quiz/QA Engines
```

### Communication Flow
```
User Browser
    ↓
Next.js Frontend (http://localhost:3000)
    ↓
Fetch API (HTTP/JSON)
    ↓
FastAPI Backend (http://127.0.0.1:8000)
    ↓
AI Services (LLM Models)
    ↓
Response back to Frontend
    ↓
Display Results to User
```

---

## 📂 Project Structure

### Frontend (/frontend)
```
frontend/
│
├── 📄 Configuration Files
│   ├── .env.example          - Example environment variables
│   ├── package.json          - Dependencies and scripts
│   ├── tsconfig.json         - TypeScript configuration
│   ├── next.config.ts        - Next.js configuration
│   ├── tailwind.config.js    - Tailwind CSS configuration
│   └── postcss.config.mjs    - PostCSS configuration
│
├── 📱 App Directory (Next.js App Router)
│   ├── app/
│   │   ├── layout.tsx        - Root layout (wrapper for all pages)
│   │   ├── page.tsx          - Main page / Home
│   │   └── globals.css       - Global styles (Tailwind import)
│   │
│   └── components/           - Reusable React components
│       ├── PDFUploadSection.tsx   - PDF upload widget
│       ├── SummarizeSection.tsx   - Document summarization UI
│       ├── QASection.tsx          - Question & Answer interface
│       └── QuizSection.tsx        - Quiz generation & display
│
├── 📚 Documentation
│   ├── README.md                  - Quick start guide
│   ├── SETUP_GUIDE.md             - Detailed setup instructions
│   ├── UI_DOCUMENTATION.md        - Design & styling guidelines
│   ├── API_INTEGRATION.md         - API endpoint documentation
│   └── PROJECT_STRUCTURE.md       - This file
│
├── 📦 Public Assets
│   └── public/               - Static files (images, icons, etc.)
│
└── 🔧 Git Configuration
    └── .gitignore           - Files to ignore in version control
```

### Backend (/backend)
```
backend/
│
├── app/
│   ├── __init__.py
│   ├── main.py                   - FastAPI app initialization
│   ├── config.py                 - Configuration settings
│   │
│   ├── routes/                   - API endpoints
│   │   ├── upload.py             - PDF upload endpoint
│   │   ├── summarize.py          - Summarization endpoint
│   │   ├── qa.py                 - Question & Answer endpoint
│   │   └── quiz.py               - Quiz generation endpoint
│   │
│   ├── services/                 - Business logic
│   │   ├── pdf_parser.py         - Extract text from PDF
│   │   ├── llm_service.py        - LLM API calls
│   │   ├── summarizer.py         - Summarization logic
│   │   ├── qa_engine.py          - Q&A logic
│   │   └── quiz_generator.py     - Quiz generation logic
│   │
│   ├── models/                   - Data models (currently empty)
│   └── utils/                    - Utility functions
│
├── 📋 Configuration
│   ├── requirements.txt          - Python dependencies
│   ├── .env                      - Environment variables (local)
│   └── .env.example              - Example environment variables
│
└── 📚 Documentation
    ├── be-notes.txt              - Backend notes
    └── endpointAPI.txt           - API endpoint examples
```

---

## 🎨 Features Overview

### 1. 📤 PDF Upload
- **Purpose:** Extract text from PDF documents
- **Component:** `PDFUploadSection.tsx`
- **Endpoint:** `POST /upload`
- **Features:**
  - Drag & drop interface
  - File validation (PDF only)
  - Character count display
  - Preview of extracted text
  - Error handling

### 2. 📄 Summarize
- **Purpose:** Generate concise summaries of documents
- **Component:** `SummarizeSection.tsx`
- **Endpoint:** `POST /api/summarize`
- **Features:**
  - Use uploaded PDF OR custom text
  - AI-powered summarization
  - Download as .txt file
  - Real-time loading state
  - Character count tracking

### 3. 💬 Q&A (Question & Answer)
- **Purpose:** Ask questions about document content
- **Component:** `QASection.tsx`
- **Endpoint:** `POST /qa`
- **Features:**
  - Context-aware answers
  - Support for follow-up questions
  - Q&A history tracking
  - Keyboard shortcut (Ctrl+Enter)
  - Beautiful history panel

### 4. 🎯 Quiz Generator
- **Purpose:** Create interactive quizzes from text
- **Component:** `QuizSection.tsx`
- **Endpoint:** `POST /quiz`
- **Features:**
  - Auto-generate multiple choice questions
  - Progress tracking
  - Interactive UI
  - Score calculation
  - Quiz history

---

## 🔄 Data Flow Examples

### Flow 1: Upload & Summarize
```
User uploads PDF
    ↓
PDFUploadSection extracts text
    ↓
Backend stores in document_store
    ↓
SummarizeSection uses stored text
    ↓
Sends to /api/summarize
    ↓
LLM generates summary
    ↓
Display in UI
```

### Flow 2: Ask Question
```
User types question
    ↓
QASection sends question + context
    ↓
Backend receives qa POST
    ↓
LLM generates answer
    ↓
Answer displayed + added to history
    ↓
User can ask follow-up
```

### Flow 3: Generate Quiz
```
User enters text
    ↓
QuizSection sends text
    ↓
Backend receives quiz POST
    ↓
LLM generates questions & options
    ↓
Quiz interface loads
    ↓
User answers questions
    ↓
Score calculated and displayed
```

---

## 🎨 UI/UX Design

### Color Scheme
- **Primary:** Blue (#3B82F6) - Main actions
- **Secondary:** Purple (#A855F7) - Q&A
- **Tertiary:** Pink (#EC4899) - Quiz
- **Neutral:** Gray - Text & backgrounds

### Component Design
- Modern card-based layout
- Gradient backgrounds
- Smooth transitions & hover effects
- Responsive grid (mobile → tablet → desktop)
- Glass morphism effects (semi-transparent whites)

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus indicators on buttons
- Error messages with clear icons

---

## 📊 State Management

### Frontend State
```typescript
// Home Component
uploadedContent: string              // Shared between components
activeTab: "home"|"summarize"|"qa"|"quiz"

// Each Section Component
loading: boolean
error: string
result: any

// Q&A Component
history: Array<{q: string, a: string}>
answers: Record<number, string>

// Quiz Component
currentQuestion: number
score: number | null
```

### Backend State
```python
# Temporary in-memory storage
document_store = {
    "content": ""  # Stores uploaded PDF text
}
```

---

## 🚀 Getting Started

### Quick Start (5 minutes)
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

**Note:** Backend must be running on `http://127.0.0.1:8000`

### Full Setup (15 minutes)
See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Quick start & feature overview |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Installation & troubleshooting |
| [UI_DOCUMENTATION.md](./UI_DOCUMENTATION.md) | Design system & components |
| [API_INTEGRATION.md](./API_INTEGRATION.md) | API endpoints & integration |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | This file - project organization |

---

## 🔧 Development Workflow

### File Editing
```typescript
// 1. Edit component in VS Code
// components/SummarizeSection.tsx

// 2. Save file (Ctrl+S)

// 3. Next.js fast refresh automatically updates browser

// 4. See changes in http://localhost:3000
```

### Adding New Features
1. Create new component in `/components`
2. Import in `app/page.tsx`
3. Add navigation/state management
4. Test with backend API
5. Update documentation

### Testing
- Manual testing in browser
- DevTools console for debugging
- curl commands for API testing
- Check backend logs

---

## 📈 Performance

### Bundle Size
- Frontend: ~250KB gzipped
- No heavy dependencies (only Next.js, React, Tailwind)
- Lazy loading of components

### Optimization Techniques
- Emoji instead of images (lighter assets)
- Tailwind CSS purges unused styles
- Built-in Next.js code splitting
- Local state only (no Redux/Zustand overhead)

### Load Times
- First paint: ~1-2 seconds
- Interactive: ~2-3 seconds (depends on backend)
- Network: API calls are the bottleneck

---

## 🔐 Security Notes

### Frontend Security
- No sensitive data stored in frontend
- Environment variables for API URL
- XSS prevention (React auto-escapes)
- CSRF token (if needed in production)

### File Upload Security
- Only PDF files accepted
- File size validation (backend should check)
- Content type validation
- No code execution from uploads

---

## 📱 Responsive Design

### Breakpoints
```
Mobile:    < 640px  (default styles)
Tablet:    640px-1024px (md: prefix)
Desktop:   > 1024px (lg: prefix)
```

### Layout Adjustments
- Single column on mobile
- 2 columns on tablet
- 3 columns on desktop
- Flexible images & text sizing

---

## 🤝 Contributing

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- React hooks for state
- Functional components

### Before Committing
1. Test all features
2. Check console for errors
3. Run ESLint: `npm run lint`
4. Update documentation
5. Commit with clear message

---

## 📝 Future Enhancements

- [ ] Dark mode support
- [ ] Export quiz as PDF
- [ ] Share documents with others
- [ ] Document history/persistence
- [ ] Multi-language support
- [ ] Real-time collaboration
- [ ] Mobile native app (React Native)
- [ ] Advanced text formatting
- [ ] Audio transcription support

---

## 🐛 Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Port 3000 in use | Run on different port: `npm run dev -- -p 3001` |
| Backend not connecting | Check backend is running on port 8000 |
| Tailwind not working | Clear cache: `rm -r .next && npm run dev` |
| Module not found | Reinstall: `rm -r node_modules && npm install` |

For more detailed troubleshooting, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📞 Support Resources

- **Frontend Framework:** [Next.js Docs](https://nextjs.org/docs)
- **UI Library:** [React Docs](https://react.dev)
- **Styling:** [Tailwind CSS Docs](https://tailwindcss.com)
- **Language:** [TypeScript Docs](https://www.typescriptlang.org)
- **Backend:** Check `backend/README.md` or `backend/be-notes.txt`

---

## 📅 Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2024 | Initial release with 4 main features |

---

**Project Status:** ✅ Ready for Development

**Last Updated:** May 2024

**Maintained By:** Big Jack AI Agentic Study Team