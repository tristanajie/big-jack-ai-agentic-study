# 🎓 AI Study Assistant - Frontend

A modern, beautiful web application for intelligent document analysis, powered by Next.js 16 and Tailwind CSS.

## ✨ Features

- **📤 PDF Upload** - Drag & drop PDF files for instant text extraction
- **📄 Summarize** - AI-powered document summarization
- **💬 Q&A** - Ask questions and get intelligent answers from your documents
- **🎯 Quiz Generator** - Automatically create interactive quizzes from text
- **🎨 Beautiful UI** - Modern, responsive design with Tailwind CSS
- **⚡ Fast & Responsive** - Built with Next.js for optimal performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn
- Backend server running on `http://127.0.0.1:8000`

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with navigation
│   └── globals.css         # Global styles
├── components/
│   ├── PDFUploadSection.tsx    # PDF upload component
│   ├── SummarizeSection.tsx    # Summarization feature
│   ├── QASection.tsx           # Q&A feature
│   └── QuizSection.tsx         # Quiz generator feature
├── package.json            # Dependencies
└── tsconfig.json           # TypeScript config
```

## 🎯 How to Use

### 1. Upload PDF
- Click on "📤 Upload PDF" or drag & drop a PDF file
- The system extracts text from your document
- Use the extracted content for analysis

### 2. Summarize
- Go to "Summarize" tab
- Choose between uploaded PDF or custom text
- Click "Generate Summary"
- Download the summary as .txt file

### 3. Ask Questions
- Go to "Q&A" tab
- Upload a PDF (or use previously uploaded)
- Type your question
- Get instant AI-powered answers
- View your Q&A history

### 4. Create Quiz
- Go to "Quiz Generator" tab
- Enter study material or educational text
- Click "Generate Quiz"
- Answer questions and get your score

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4
- **React:** 19.2.4
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Linting:** ESLint

## 📋 API Endpoints Used

- `POST /upload` - Upload PDF
- `POST /api/summarize` - Summarize text
- `POST /qa` - Question & Answer
- `POST /quiz` - Generate quiz

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Modern gradient backgrounds
- Smooth transitions and hover effects
- Responsive grid layouts
- Beautiful card components
- Accessible color schemes

## 💡 Tips

- **Large PDFs:** For better performance, use PDFs under 10MB
- **Question Quality:** More specific questions get better answers
- **Quiz Quality:** Longer, more detailed text generates better quizzes
- **Auto-save:** Your Q&A history is saved in the current session

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🐛 Troubleshooting

### Backend Connection Error
- Ensure backend is running on `http://127.0.0.1:8000`
- Check `.env.local` for correct API URL
- Verify CORS settings in backend

### Components Not Loading
- Clear browser cache
- Run `npm install` to ensure all dependencies
- Restart development server

## 📝 License

This project is part of the Big Jack AI Agentic Study initiative.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
