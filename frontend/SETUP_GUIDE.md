# 🚀 Development Setup & Troubleshooting

## Complete Setup Guide

### Step 1: Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Windows users: ensure PowerShell execution policy
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
```

### Step 2: Install Dependencies
```bash
cd frontend
npm install
```

**Expected packages:**
- next@16.2.4
- react@19.2.4
- react-dom@19.2.4
- tailwindcss@4
- typescript@5

### Step 3: Create Environment File
```bash
cp .env.example .env.local
```

**Content of .env.local:**
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Step 4: Verify Backend is Running

Before starting frontend, ensure backend is running:
```bash
# In another terminal/PowerShell window
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Backend should be accessible at:**
- Health check: `http://127.0.0.1:8000/health`
- Docs: `http://127.0.0.1:8000/docs`

### Step 5: Start Development Server
```bash
npm run dev
```

**Output should show:**
```
> frontend@0.1.0 dev
> next dev

▲ Next.js 16.2.4
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.5s
```

### Step 6: Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

---

## File Structure Verification

After setup, verify these files exist:

```
frontend/
├── .env.local                      ✓
├── .env.example                    ✓
├── package.json                    ✓
├── tsconfig.json                   ✓
├── next.config.ts                  ✓
├── tailwind.config.js              ✓
├── app/
│   ├── layout.tsx                  ✓
│   ├── page.tsx                    ✓
│   └── globals.css                 ✓
└── components/
    ├── PDFUploadSection.tsx        ✓
    ├── SummarizeSection.tsx        ✓
    ├── QASection.tsx               ✓
    └── QuizSection.tsx             ✓
```

---

## Common Issues & Solutions

### Issue 1: "Port 3000 already in use"

**Problem:** Another application is using port 3000

**Solutions:**
```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process using port 3000
# Windows PowerShell:
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue 2: "Backend connection refused"

**Problem:** Cannot connect to `http://127.0.0.1:8000`

**Checklist:**
```bash
# 1. Check backend is running
curl http://127.0.0.1:8000/health

# 2. Check .env.local is correct
cat .env.local

# 3. Check for CORS errors in browser console
# Solution: Add CORS middleware to backend

# 4. Check firewall settings (Windows)
# Allow Node.js and Python through firewall
```

**Backend CORS Fix:**
```python
# In backend/app/main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue 3: "Module not found" errors

**Problem:** Missing dependencies or incomplete installation

**Solutions:**
```bash
# 1. Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# 2. Clear Next.js cache
rm -r .next
npm run dev

# 3. Check if TypeScript types are installed
npm install --save-dev @types/react @types/node
```

### Issue 4: "Cannot find module 'tailwindcss'"

**Problem:** Tailwind CSS not properly installed

**Solutions:**
```bash
# Reinstall Tailwind CSS
npm install -D tailwindcss@4 @tailwindcss/postcss

# Verify tailwind.config.js exists
# Verify postcss.config.mjs exists
```

### Issue 5: "PDF upload not working"

**Problem:** Upload endpoint not responding

**Check:**
```bash
# Test upload endpoint directly
curl -X POST http://127.0.0.1:8000/upload \
  -F "file=@test.pdf"

# Check backend logs for errors
# Verify PDF file is valid
```

### Issue 6: "Components not rendering / blank page"

**Problem:** Component import or syntax errors

**Solutions:**
```bash
# 1. Check browser console for JavaScript errors
# Press F12 in browser

# 2. Verify component imports in page.tsx
# Make sure paths are correct: @/components/...

# 3. Clear build cache
rm -r .next
npm run build

# 4. Check for TypeScript errors
npx tsc --noEmit
```

### Issue 7: "Styling not working (no Tailwind CSS)"

**Problem:** CSS not being applied

**Check:**
```typescript
// 1. Verify globals.css imports
@import "tailwindcss";

// 2. Check layout.tsx includes globals.css
import "./globals.css";

// 3. Verify Tailwind classes are valid
// Valid: bg-blue-500, text-gray-900, hover:scale-105
// Invalid: bg-random, text-wrong

// 4. Clear cache and rebuild
rm -r .next
npm run dev
```

---

## Development Tips

### 1. Fast Refresh
Next.js automatically reloads changes. Just save your file and refresh browser.

### 2. TypeScript Checking
```bash
# Check for type errors
npx tsc --noEmit

# Auto-fix some issues
npx tsc --noEmit --allowJs
```

### 3. ESLint Checking
```bash
# Check for linting errors
npm run lint

# Auto-fix common issues
npx eslint . --fix
```

### 4. Browser DevTools Tips
```javascript
// In browser console

// Test API connection
fetch('http://127.0.0.1:8000/health')
  .then(r => r.json())
  .then(d => console.log(d))

// Check environment variables
console.log(process.env.NEXT_PUBLIC_API_URL)

// Monitor component re-renders
// React DevTools extension is helpful
```

### 5. Debug Mode
Add console logs to track state:
```typescript
useEffect(() => {
  console.log('uploadedContent changed:', uploadedContent);
}, [uploadedContent]);
```

---

## Build & Deployment

### Local Production Build
```bash
# Build for production
npm run build

# Start production server
npm start

# Should be accessible at http://localhost:3000
```

### Performance Optimization
```bash
# Check bundle size
npm run build
# Look for .next/static/chunks/

# Analyze bundle
npm install -D @next/bundle-analyzer
```

### Deployment to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-api.com
```

---

## Git Setup

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: AI Study Assistant frontend"
```

### Ignore Files
**.gitignore** should include:
```
node_modules/
.next/
.env.local
.env.*.local
dist/
build/
*.log
```

---

## Performance Monitoring

### Enable Next.js Analytics
Add to **next.config.ts**:
```typescript
export default {
  productionBrowserSourceMaps: false, // Disable in prod for privacy
  swcMinify: true, // Enable SWC minification
  compress: true, // Enable gzip compression
};
```

### Monitor Logs
```bash
# Frontend logs (in browser console)
# F12 → Console tab

# Next.js server logs
# Watch terminal output

# Backend logs (if running locally)
# Watch backend terminal
```

---

## Testing

### Manual Test Checklist
- [ ] Upload PDF file
- [ ] Summarize text
- [ ] Ask questions
- [ ] Generate quiz
- [ ] Test on mobile (DevTools: Ctrl+Shift+M)
- [ ] Test keyboard navigation (Tab key)
- [ ] Test error states (disconnect backend, try invalid input)

### Browser Compatibility Testing
```bash
# Chrome/Edge - Default works
# Firefox - Test smooth animations
# Safari (Mac) - Test on real device or BrowserStack
```

---

## Maintenance

### Regular Tasks
- [ ] Update dependencies monthly: `npm update`
- [ ] Check for vulnerabilities: `npm audit`
- [ ] Review console warnings in dev mode
- [ ] Monitor API response times
- [ ] Check error logs for issues

### Backup Important Files
- `.env.local` - Keep separately
- Components - Use Git version control
- Documentation - Keep in README

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Support

For issues:
1. Check this document first
2. Read browser console errors
3. Check backend logs
4. Review component code
5. Test with curl/Postman

---

**Last Updated:** 2024
**Frontend Version:** 0.1.0
**Next.js Version:** 16.2.4