# ⚡ Quick Reference & Checklists

## 🚀 Quick Commands

### Development
```bash
npm install                 # Install dependencies
npm run dev                 # Start dev server
npm run build              # Build for production
npm start                  # Start production server
npm run lint               # Run ESLint
```

### Backend (in separate terminal)
```bash
cd backend
.\.venv\Scripts\Activate.ps1    # Windows
source .venv/bin/activate       # Mac/Linux
uvicorn app.main:app --reload
```

### Testing
```bash
# Test API connection
curl http://127.0.0.1:8000/health

# Test upload endpoint
curl -X POST http://127.0.0.1:8000/upload -F "file=@test.pdf"

# Test summarize
curl -X POST http://127.0.0.1:8000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Your text"}'
```

---

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] No console errors in browser DevTools
- [ ] No ESLint warnings: `npm run lint`
- [ ] TypeScript checks pass: `npx tsc --noEmit`
- [ ] All components render without errors

### Features Testing
- [ ] ✅ PDF upload works
- [ ] ✅ Summarization generates summary
- [ ] ✅ Q&A answers questions
- [ ] ✅ Quiz generates and displays
- [ ] ✅ All buttons are clickable
- [ ] ✅ Error states display properly
- [ ] ✅ Loading states work correctly

### Responsive Design
- [ ] ✅ Mobile (< 640px) - Stack vertically
- [ ] ✅ Tablet (640-1024px) - 2 columns
- [ ] ✅ Desktop (> 1024px) - Full layout
- [ ] ✅ Text is readable on all sizes
- [ ] ✅ Buttons are tappable on mobile

### Backend Connection
- [ ] ✅ Backend running on port 8000
- [ ] ✅ CORS enabled on backend
- [ ] ✅ .env.local configured correctly
- [ ] ✅ Network requests show in DevTools
- [ ] ✅ No 404 or 500 errors

### Browser Compatibility
- [ ] ✅ Chrome/Edge - Latest version
- [ ] ✅ Firefox - Latest version
- [ ] ✅ Safari - Latest version
- [ ] ✅ Mobile browsers - Latest version

### Documentation
- [ ] ✅ README updated with features
- [ ] ✅ SETUP_GUIDE has clear instructions
- [ ] ✅ API_INTEGRATION.md complete
- [ ] ✅ UI_DOCUMENTATION.md current
- [ ] ✅ Comments in complex code sections

### Performance
- [ ] ✅ Build completes without warnings
- [ ] ✅ Bundle size is reasonable (~250KB)
- [ ] ✅ Images are optimized (using emoji)
- [ ] ✅ No memory leaks (DevTools)
- [ ] ✅ API responses < 5 seconds

---

## 🔧 Common Fixes

### Issue: Blank page
```bash
# Clear cache and rebuild
rm -r .next
npm run dev
```

### Issue: Styles not applying
```bash
# Clear Tailwind cache
rm -r .next
npm run dev

# Or check globals.css has Tailwind import
# @import "tailwindcss";
```

### Issue: Components not found
```bash
# Check import paths are correct
// ✅ Correct: @/components/MyComponent
// ❌ Wrong: ./components/MyComponent or ../components/MyComponent
```

### Issue: Backend 404
```bash
# Verify backend is running
curl http://127.0.0.1:8000/health

# Check .env.local
cat .env.local

# Should have:
# NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📁 File Tree (Quick Reference)

```
frontend/
├── .env.example ..................... Environment template
├── .env.local ....................... Local settings (Git ignored)
├── package.json ..................... Dependencies
├── next.config.ts ................... Next.js config
├── tailwind.config.js ............... Tailwind config
├── tsconfig.json .................... TypeScript config
│
├── app/
│   ├── layout.tsx ................... Root wrapper
│   ├── page.tsx ..................... Main page
│   └── globals.css .................. Global styles
│
├── components/
│   ├── PDFUploadSection.tsx ......... Upload widget
│   ├── SummarizeSection.tsx ......... Summarization
│   ├── QASection.tsx ................ Q&A
│   └── QuizSection.tsx .............. Quiz
│
├── Documentation/
│   ├── README.md .................... Quick start
│   ├── SETUP_GUIDE.md ............... Installation
│   ├── PROJECT_STRUCTURE.md ......... Architecture
│   ├── UI_DOCUMENTATION.md .......... Design system
│   ├── API_INTEGRATION.md ........... API docs
│   ├── TAILWIND_STYLEGUIDE.md ....... CSS classes
│   └── QUICK_REFERENCE.md ........... This file
│
└── public/ ........................... Static assets
```

---

## 🎯 Feature Implementation Checklist

### Adding New Feature (General Process)

1. **Create Component**
   - [ ] New file in `/components/FeatureName.tsx`
   - [ ] Export default function
   - [ ] Add TypeScript interfaces

2. **Import Component**
   - [ ] Add to `app/page.tsx`
   - [ ] Create state if needed
   - [ ] Add navigation logic

3. **Connect to Backend**
   - [ ] Test API endpoint with curl
   - [ ] Add fetch call in component
   - [ ] Handle loading state
   - [ ] Handle error state

4. **Style Component**
   - [ ] Use Tailwind classes
   - [ ] Test responsive design
   - [ ] Ensure accessibility

5. **Test**
   - [ ] Test on desktop
   - [ ] Test on mobile
   - [ ] Check error handling
   - [ ] Verify backend connection

6. **Document**
   - [ ] Update README.md
   - [ ] Add inline comments
   - [ ] Update API_INTEGRATION.md if needed

---

## 🎨 Component Template

```typescript
"use client";

import { useState } from "react";

interface ComponentProps {
  onClose?: () => void;
}

export default function MyComponent({ onClose }: ComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState("");

  const handleAction = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* data */ }),
      });

      const result = await response.json();

      if (response.ok) {
        setData(result);
      } else {
        setError(result.error || "Operation failed");
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Feature Title</h2>
        {onClose && (
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
            ← Back
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        {/* Input/Actions */}
        <button
          onClick={handleAction}
          disabled={loading}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 transition-all"
        >
          {loading ? "Processing..." : "Action"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Result */}
        {data && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">✓ Success</p>
            <p className="text-gray-700 mt-2">{data}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 🔍 Debugging Tips

### 1. Check Browser Console
```javascript
// F12 or Ctrl+Shift+I in browser

// Test API
fetch('http://127.0.0.1:8000/health')
  .then(r => r.json())
  .then(console.log)

// Check environment
console.log(process.env.NEXT_PUBLIC_API_URL)

// Check state
console.log({ uploadedContent, activeTab })
```

### 2. Network Tab
```
F12 → Network tab
- See all API requests
- Check status codes (200 = success)
- View request/response bodies
- Check headers (Content-Type, etc.)
```

### 3. React DevTools
```
F12 → React Components tab
- Inspect component props
- See state updates
- Track re-renders
- Edit props/state for testing
```

### 4. Backend Logs
```
Watch terminal where backend runs
- See which endpoints are called
- Check request parameters
- Identify processing issues
- See error stack traces
```

---

## 📱 Responsive Design Breakpoints

### Tailwind CSS Breakpoints
```
sm    640px    md:
md    768px    md:
lg   1024px    lg:
xl   1280px    xl:
2xl  1536px    2xl:
```

### Mobile-First Approach
```typescript
// Default = mobile
// Add sm: for >= 640px
// Add md: for >= 768px  
// Add lg: for >= 1024px

className="
  grid-cols-1        // Mobile
  sm:grid-cols-2     // Small tablets
  lg:grid-cols-3     // Desktop
"
```

---

## 🔐 Security Best Practices

### Secrets Management
```bash
# ✅ Good: Use .env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# ❌ Bad: Hardcode in component
const API = "http://127.0.0.1:8000"

# ❌ Bad: Commit .env.local
# Always add to .gitignore
```

### Input Validation
```typescript
// ✅ Good: Check before sending
if (!question.trim()) {
  setError("Question cannot be empty");
  return;
}

// ❌ Bad: Send anything
fetch(api, { body: JSON.stringify(data) });
```

### File Upload
```typescript
// ✅ Good: Validate file type
if (!file.name.endsWith('.pdf')) {
  setError('Only PDF files allowed');
  return;
}

// ✅ Good: Check file size
if (file.size > 10 * 1024 * 1024) {
  setError('File too large');
  return;
}
```

---

## 📊 Performance Checklist

### Frontend Performance
- [ ] Bundle size < 300KB gzipped
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] No unused imports
- [ ] No console.log in production

### API Performance
- [ ] API response time < 3 seconds
- [ ] Implement request timeouts
- [ ] Handle slow connections gracefully
- [ ] Show loading states
- [ ] Cache responses if possible

### Database Performance
- [ ] Indexes on frequently searched fields
- [ ] Limit query results
- [ ] Implement pagination

---

## 🚀 Deployment Checklist

### Before Pushing to Production
- [ ] All tests passing
- [ ] No console errors
- [ ] Performance optimized
- [ ] Security review done
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Backups created
- [ ] Rollback plan ready

### Production Environment
```bash
# Build for production
npm run build

# Test production build locally
npm start

# Should work at http://localhost:3000
```

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor API response times
- [ ] Track user analytics
- [ ] Set up alerts for errors

---

## 📚 Learning Resources

### Frontend
- [Next.js Official Docs](https://nextjs.org/docs)
- [React Official Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Development Tools
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)
- [CSS Tricks](https://css-tricks.com/)

### Backend Integration
- [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🆘 Getting Help

### Troubleshooting Steps
1. Check this document first
2. Read error message carefully
3. Check browser console (F12)
4. Check backend logs
5. Search documentation
6. Test with curl/Postman
7. Check GitHub issues
8. Ask in team chat

### Common Questions
- **"Why is my component not rendering?"** → Check import paths and JSX syntax
- **"Why is styling not working?"** → Clear .next cache, check Tailwind config
- **"Why is API not responding?"** → Check backend is running, check .env.local
- **"Why is my build failing?"** → Check for TypeScript errors: `npx tsc --noEmit`

---

**Last Updated:** May 2024
**Quick Reference Version:** 1.0