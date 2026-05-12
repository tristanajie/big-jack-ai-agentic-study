# 🧪 Testing Guide - Step by Step

## ✅ Prerequisites Check

Pastikan sebelum testing:

```bash
# 1. Check Backend Running
curl http://127.0.0.1:8000/health
# Response: {"status":"ok"} atau sejenis

# 2. Check Frontend Running
# Open: http://localhost:3000 di browser

# 3. Check .env.local
cat frontend/.env.local
# Should contain: NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 🧪 Test 1: Upload PDF

### Via Browser (Recommended)
```
1. Open: http://localhost:3000
2. Click: "Upload PDF" card di homepage
3. Drag & drop atau click "Choose File"
4. Select any PDF file
5. Click: "Upload PDF" button
6. Expected: Success message ✅
```

### Via Terminal (Testing Endpoint)
```bash
# Pastikan ada file test.pdf di folder
curl -X POST http://127.0.0.1:8000/upload \
  -F "file=@test.pdf"

# Response:
{
  "message": "PDF uploaded successfully",
  "characters": 1234,
  "preview": "First 500 characters..."
}
```

### ✅ Success Indicators:
- ✓ Upload success message muncul
- ✓ Character count ditampilkan
- ✓ Preview text muncul
- ✓ "Current file" status muncul

### ❌ Common Issues:
```
Error: "Only PDF files are allowed"
→ Pastikan file adalah PDF

Error: "Failed to fetch"
→ Check backend di port 8000

Error: "Upload failed"
→ Check backend logs untuk detail
```

---

## 🧪 Test 2: Summarize

### Via Browser
```
1. Open: http://localhost:3000
2. Click: "Summarize" card
3. Option 1 - Use Uploaded PDF:
   - Make sure PDF sudah diupload
   - Click: "Use Uploaded PDF" radio
   - Click: "Generate Summary"

   Option 2 - Use Custom Text:
   - Click: "Enter Custom Text" radio
   - Paste/type text
   - Click: "Generate Summary"

4. Expected: Summary muncul di hasil area
```

### Via Terminal
```bash
curl -X POST http://127.0.0.1:8000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Fotosintesis adalah proses yang dilakukan tumbuhan menggunakan cahaya matahari untuk mengubah air dan CO2 menjadi glukosa dan oksigen."
  }'

# Response:
{
  "summary": "Dokumen ini membahas fotosintesis..."
}
```

### ✅ Success Indicators:
- ✓ Summary text muncul
- ✓ No error message
- ✓ Download button muncul

### ❌ Common Issues:
```
Error: "No document uploaded"
→ Upload PDF dulu atau gunakan custom text

Error: "Failed to summarize"
→ Check backend logs

Empty summary
→ Check API response di browser console
```

---

## 🧪 Test 3: Q&A

### Via Browser
```
1. Open: http://localhost:3000
2. Click: "Q&A" card
3. Make sure PDF sudah diupload
4. Type question: "Apa itu fotosintesis?"
5. Press: Ctrl+Enter atau click "Ask Question"
6. Expected: Answer muncul
7. Tanya lagi untuk test history
```

### Via Terminal
```bash
curl -X POST http://127.0.0.1:8000/qa \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Fotosintesis adalah proses yang dilakukan tumbuhan...",
    "question": "Apa itu fotosintesis?"
  }'

# Response:
{
  "answer": "Fotosintesis adalah proses dimana tumbuhan..."
}
```

### ✅ Success Indicators:
- ✓ Answer text muncul
- ✓ History panel updated
- ✓ Can ask follow-up questions
- ✓ No duplicate answers

### ❌ Common Issues:
```
Error: "No document uploaded"
→ Upload PDF dulu

Error: "Question cannot be empty"
→ Type something di input

Error: "Failed to generate answer"
→ Check context dan question valid
```

---

## 🧪 Test 4: Quiz

### Via Browser
```
1. Open: http://localhost:3000
2. Click: "Quiz Generator" card
3. Enter/paste text:
   "Fotosintesis adalah proses yang dilakukan tumbuhan menggunakan cahaya matahari untuk mengubah air dan CO2 menjadi glukosa dan oksigen. Proses ini terjadi di kloroplas dan menghasilkan energi untuk pertumbuhan tumbuhan."
4. Click: "Generate Quiz"
5. Expected: Quiz interface muncul
6. Pilih answers
7. Click: "Previous"/"Next" buttons
8. On last question: Click "Submit Quiz"
9. Expected: Score muncul
```

### Via Terminal
```bash
curl -X POST http://127.0.0.1:8000/quiz \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Fotosintesis adalah proses yang dilakukan tumbuhan menggunakan cahaya matahari..."
  }'

# Response:
{
  "quiz": [
    {
      "question": "Apa itu fotosintesis?",
      "options": ["...", "...", "...", "..."]
    }
  ]
}
```

### ✅ Success Indicators:
- ✓ Questions muncul
- ✓ Options selectable
- ✓ Progress bar works
- ✓ Navigation buttons work
- ✓ Score calculated
- ✓ Results screen muncul

### ❌ Common Issues:
```
Error: "Text cannot be empty"
→ Enter some text

Error: "Failed to generate quiz"
→ Check text length (need enough content)

Quiz not loading
→ Wait longer (LLM processing)
```

---

## 🔍 DevTools Testing

### Open DevTools: F12 atau Ctrl+Shift+I

#### Network Tab
```
1. Click: Network tab
2. Perform action (upload, summarize, etc)
3. See network requests:
   - POST requests ke /api/summarize, /upload, /qa, /quiz
   - Status 200 = success
   - Status 4xx/5xx = error

4. Click request untuk detail:
   - Headers tab: Check Content-Type, authorization
   - Payload tab: Check request body
   - Response tab: Check response data
```

#### Console Tab
```
1. Click: Console tab
2. Paste commands:

fetch('http://127.0.0.1:8000/health')
  .then(r => r.json())
  .then(d => console.log(d))

3. Check response
4. Debug errors
```

#### React DevTools
```
1. Install React DevTools extension
2. Click: Components tab
3. Inspect: Home component
4. See: uploadedContent state
5. See: activeTab state
6. Check: Props passed to child components
```

---

## 📊 Complete Test Checklist

### Upload Module ✓
- [ ] PDF drag & drop works
- [ ] File selection works
- [ ] PDF validation works
- [ ] Error message displays correctly
- [ ] Success message displays
- [ ] Character count shows
- [ ] Preview text displays

### Summarize Module ✓
- [ ] Toggle PDF/Custom text works
- [ ] Text input accepts text
- [ ] Generate button works
- [ ] Summary displays correctly
- [ ] No error on valid input
- [ ] Download button works
- [ ] Error displays on invalid input

### Q&A Module ✓
- [ ] Question input accepts text
- [ ] Send button works
- [ ] Keyboard shortcut (Ctrl+Enter) works
- [ ] Answer displays correctly
- [ ] History updates
- [ ] Can ask follow-up questions
- [ ] Error displays correctly

### Quiz Module ✓
- [ ] Text input accepts text
- [ ] Generate button works
- [ ] Quiz displays correctly
- [ ] Options are selectable
- [ ] Progress bar works
- [ ] Navigation works (Previous/Next)
- [ ] Submit works
- [ ] Score displays correctly

### Integration ✓
- [ ] API calls successful (200 status)
- [ ] No CORS errors
- [ ] No network errors
- [ ] Data flows correctly
- [ ] State updates correctly
- [ ] UI updates on response

---

## 🎯 Full User Journey Test

### Scenario: Complete Learning Experience

```
1. USER UPLOADS PDF
   Action: Click Upload PDF → Select file → Click Upload
   Expected: ✅ PDF uploaded successfully

2. USER SUMMARIZES DOCUMENT
   Action: Click Summarize → Click Generate Summary
   Expected: ✅ Summary displayed

3. USER ASKS QUESTIONS
   Action: Click Q&A → Type question → Submit
   Expected: ✅ Answer displayed

4. USER CREATES QUIZ
   Action: Click Quiz → Enter text → Generate → Answer → Submit
   Expected: ✅ Score displayed

5. USER NAVIGATES BACK
   Action: Click "Back" button
   Expected: ✅ Return to home page

6. USER UPLOADS DIFFERENT PDF
   Action: Click Upload → Select new file
   Expected: ✅ New PDF uploaded (overwrites previous)
```

---

## 🔧 Troubleshooting Quick Fixes

### Problem: Nothing Happens When Click Button
```
Solution:
1. Check browser console (F12)
2. Look for JavaScript errors
3. Check network tab (no requests?)
4. If no network request:
   → Component not handling click event
   → Check component onClick handler

If network request present:
   → Check status code
   → Read response body for error
   → Check backend logs
```

### Problem: CORS Error
```
Solution:
1. Error message: "Access to XMLHttpRequest blocked by CORS"
2. Fix in backend/app/main.py:
   Add CORSMiddleware before routes
3. Restart backend
4. Refresh browser
5. Retry
```

### Problem: 404 Not Found
```
Solution:
1. Error: "POST /endpoint 404"
2. Check endpoint name in route file
3. Check URL in frontend matches
4. Verify route registered in main.py
5. Check backend logs
6. Restart backend if changes made
```

### Problem: Timeout/Slow Response
```
Solution:
1. Wait longer (LLM API can be slow)
2. Try with shorter text
3. Check backend logs for processing time
4. If consistently slow:
   → Check LLM API status
   → Check internet connection
   → Try with simpler prompt
```

---

## 📈 Performance Testing

### Load Testing
```
Test 1: Single Request
- Action: Click button once
- Expected: Response < 3 seconds

Test 2: Multiple Requests
- Action: Click button multiple times rapidly
- Expected: Queue properly, no crashes

Test 3: Large Files
- Action: Upload large PDF
- Expected: Handle gracefully or error
```

### Memory Testing
```
1. Open DevTools → Memory tab
2. Take snapshot
3. Perform actions (upload, etc)
4. Take another snapshot
5. Compare: Memory should not grow significantly
```

---

## ✅ Sign Off Checklist

When all tests pass:

```
FUNCTIONALITY:
☑ Upload works
☑ Summarize works
☑ Q&A works
☑ Quiz works

INTEGRATION:
☑ Frontend connects to backend
☑ No CORS errors
☑ No network errors
☑ All endpoints working

UI/UX:
☑ Responsive on desktop
☑ Responsive on mobile
☑ Error messages clear
☑ Loading states visible

PERFORMANCE:
☑ Response time acceptable
☑ No memory leaks
☑ No console errors

READY FOR PRODUCTION ✅
```

---

## 🚀 Ready to Deploy!

If all tests pass, your frontend is ready to:
- [ ] Deploy to production
- [ ] Share with users
- [ ] Add more features
- [ ] Optimize further

**Next Steps:**
1. Fix any issues found
2. Test on different browsers
3. Test on mobile devices
4. Deploy to production server

---

**Happy Testing! 🎉**