# 🔗 Integrasi Endpoint Backend ke Frontend - Praktis

## ✅ Status Saat Ini

```
✅ Backend running: http://127.0.0.1:8000
✅ Frontend running: http://localhost:3000
✅ Components sudah dibuat
✅ Siap integrasi!
```

---

## 🎯 Langkah Integrasi

### STEP 1: Buka File & Test Endpoint Pertama

Mari kita mulai dengan **SummarizeSection** (paling sederhana):

**File yang akan diedit:**
```
frontend/components/SummarizeSection.tsx
```

**Test endpoint dulu di terminal:**
```bash
# Terminal baru
curl -X POST http://127.0.0.1:8000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello world test"}'
```

Jika berhasil, akan melihat response:
```json
{
  "summary": "..."
}
```

---

### STEP 2: Cek API URL di Frontend

**Buka file:** `frontend/.env.local` (jika belum ada, buat baru):

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Pastikan sudah ada di file `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

### STEP 3: Contoh Integrasi Endpoint

Berikut 4 contoh praktis untuk setiap endpoint:

#### **1️⃣ UPLOAD PDF** (`POST /upload`)

```typescript
// Di dalam PDFUploadSection.tsx
// Fungsi yang sudah ada: handleUpload

const handleUpload = async () => {
  if (!file) {
    setMessage("Please select a file first");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const formData = new FormData();
    formData.append("file", file);

    // ✅ INTEGRASI: Panggil endpoint upload
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/upload`,
      {
        method: "POST",
        body: formData,
        // PENTING: Jangan set Content-Type header!
        // Browser akan set otomatis dengan boundary
      }
    );

    const data = await response.json();

    if (response.ok) {
      // ✅ Sukses!
      setMessage(`✅ ${data.message}`);
      setUploadedFileName(file.name);
      onUploadSuccess(data.preview);
      setFile(null);
    } else {
      // ❌ Error dari backend
      setMessage(`❌ ${data.error || "Upload failed"}`);
    }
  } catch (error) {
    setMessage(`❌ Error uploading file: ${error}`);
  } finally {
    setLoading(false);
  }
};
```

**Testing di browser:**
1. Buka http://localhost:3000
2. Click "Upload PDF"
3. Pilih file PDF
4. Click "Upload PDF"
5. Lihat response di console

---

#### **2️⃣ SUMMARIZE** (`POST /api/summarize`)

```typescript
// Di dalam SummarizeSection.tsx
// Fungsi: handleSummarize

const handleSummarize = async () => {
  if (!useCustomText && !uploadedContent) {
    setError("Please upload a PDF first or enter custom text");
    return;
  }

  if (useCustomText && !customText.trim()) {
    setError("Please enter some text to summarize");
    return;
  }

  setLoading(true);
  setError("");
  setSummary("");

  try {
    const textToSummarize = useCustomText ? customText : uploadedContent;

    // ✅ INTEGRASI: Panggil endpoint summarize
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/summarize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      }
    );

    const data = await response.json();

    if (response.ok && data.summary) {
      // ✅ Sukses!
      setSummary(data.summary);
    } else {
      // ❌ Error dari backend
      setError(data.error || "Failed to generate summary");
    }
  } catch (err) {
    setError(`Error: ${err}`);
  } finally {
    setLoading(false);
  }
};
```

**Testing di browser:**
1. Buka http://localhost:3000
2. Click "Summarize"
3. Masukkan teks atau gunakan PDF yang sudah diupload
4. Click "Generate Summary"
5. Lihat hasilnya

---

#### **3️⃣ Q&A** (`POST /qa`)

```typescript
// Di dalam QASection.tsx
// Fungsi: handleAsk

const handleAsk = async () => {
  if (!question.trim()) {
    setError("Please enter a question");
    return;
  }

  if (!uploadedContent) {
    setError("Please upload a PDF first");
    return;
  }

  setLoading(true);
  setError("");
  setAnswer("");

  try {
    // ✅ INTEGRASI: Panggil endpoint qa
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/qa`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: uploadedContent,
          question: question.trim(),
        }),
      }
    );

    const data = await response.json();

    if (response.ok && data.answer) {
      // ✅ Sukses!
      setAnswer(data.answer);
      setHistory([{ q: question, a: data.answer }, ...history]);
      setQuestion("");
    } else {
      // ❌ Error dari backend
      setError(data.error || "Failed to get answer");
    }
  } catch (err) {
    setError(`Error: ${err}`);
  } finally {
    setLoading(false);
  }
};
```

**Testing di browser:**
1. Upload PDF dulu
2. Buka Q&A tab
3. Tanya pertanyaan
4. Tekan Ctrl+Enter atau klik tombol
5. Lihat jawaban

---

#### **4️⃣ QUIZ** (`POST /quiz`)

```typescript
// Di dalam QuizSection.tsx
// Fungsi: handleGenerateQuiz

const handleGenerateQuiz = async () => {
  if (!text.trim()) {
    setError("Please enter some text to generate quiz");
    return;
  }

  setLoading(true);
  setError("");
  setQuiz([]);

  try {
    // ✅ INTEGRASI: Panggil endpoint quiz
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/quiz`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.trim() }),
      }
    );

    const data = await response.json();

    if (response.ok && data.quiz) {
      // ✅ Sukses!
      let quizData = [];

      // Parse response (bisa berupa string atau array)
      if (typeof data.quiz === "string") {
        try {
          quizData = JSON.parse(data.quiz);
        } catch {
          quizData = [
            {
              id: 1,
              question: "Based on the text provided, what is the main concept?",
              options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            },
          ];
        }
      } else if (Array.isArray(data.quiz)) {
        quizData = data.quiz;
      }

      // Ensure proper structure
      quizData = quizData.map((q, idx) => ({
        id: idx + 1,
        question: q.question || "Question",
        options: q.options || q.choices || ["Option 1", "Option 2", "Option 3", "Option 4"],
      }));

      setQuiz(quizData);
      setCurrentQuestion(0);
      setAnswers({});
      setScore(null);
    } else {
      // ❌ Error dari backend
      setError(data.error || "Failed to generate quiz");
    }
  } catch (err) {
    setError(`Error: ${err}`);
  } finally {
    setLoading(false);
  }
};
```

**Testing di browser:**
1. Buka Quiz tab
2. Masukkan teks
3. Click "Generate Quiz"
4. Jawab pertanyaan
5. Submit dan lihat score

---

## 🧪 Testing All Endpoints

### Quick Test dengan Curl

```bash
# 1. Test API Health
curl http://127.0.0.1:8000/health

# 2. Test Summarize
curl -X POST http://127.0.0.1:8000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text":"Fotosintesis adalah proses yang dilakukan tumbuhan menggunakan cahaya matahari untuk mengubah air dan CO2 menjadi glukosa dan oksigen."}'

# 3. Test Q&A
curl -X POST http://127.0.0.1:8000/qa \
  -H "Content-Type: application/json" \
  -d '{
    "context": "Indonesia adalah negara kepulauan yang terletak di Asia Tenggara.",
    "question": "Apa itu Indonesia?"
  }'

# 4. Test Quiz
curl -X POST http://127.0.0.1:8000/quiz \
  -H "Content-Type: application/json" \
  -d '{"text":"Fotosintesis adalah proses yang dilakukan tumbuhan menggunakan cahaya matahari untuk mengubah air dan CO2 menjadi glukosa dan oksigen."}'

# 5. Test Upload (butuh file)
curl -X POST http://127.0.0.1:8000/upload \
  -F "file=@/path/to/your/file.pdf"
```

---

## 🔍 Debug di Browser

### DevTools Console

Buka http://localhost:3000 dan buka Developer Tools (F12):

```javascript
// Test endpoint langsung dari console

// 1. Test API
fetch('http://127.0.0.1:8000/health')
  .then(r => r.json())
  .then(console.log)

// 2. Test Summarize
fetch('http://127.0.0.1:8000/api/summarize', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({text: 'Test text'})
})
  .then(r => r.json())
  .then(console.log)

// 3. Check Environment
console.log(process.env.NEXT_PUBLIC_API_URL)
```

---

## ⚠️ Common Issues & Fixes

### Issue 1: CORS Error
```
Error: Access to XMLHttpRequest at 'http://127.0.0.1:8000/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solusi:** Tambahkan CORS di backend

Di `backend/app/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Issue 2: Backend 404 Error
```
POST http://127.0.0.1:8000/api/summarize 404
```

**Solusi:** Check:
1. Backend running? `curl http://127.0.0.1:8000/health`
2. Route exists? Check `backend/app/routes/summarize.py`
3. Endpoint name correct? Check documentation

---

### Issue 3: Empty Response
```
Response: {summary: null} atau {error: "No document uploaded"}
```

**Solusi:** 
- Pastikan PDF sudah diupload dulu
- Atau gunakan custom text
- Check backend logs untuk detail error

---

### Issue 4: Timeout
```
Error: Failed to fetch - Network timeout
```

**Solusi:**
- Backend processing lama (LLM API response)
- Increase timeout atau wait longer
- Check backend logs untuk debugging

---

## 📊 Response Format Reference

### Success Response
```json
{
  "summary": "...",
  "answer": "...",
  "quiz": [...],
  "message": "..."
}
```

### Error Response
```json
{
  "error": "Error description",
  "detail": "Additional details"
}
```

---

## ✅ Integrasi Checklist

- [ ] `.env.local` dibuat dengan API URL
- [ ] Backend berjalan di port 8000
- [ ] Frontend berjalan di port 3000
- [ ] CORS enabled di backend
- [ ] Test semua endpoint dengan curl
- [ ] Upload PDF berhasil
- [ ] Summarize berfungsi
- [ ] Q&A berfungsi
- [ ] Quiz berfungsi
- [ ] Tidak ada CORS error
- [ ] Components terintegrasi dengan baik

---

## 🎯 Next: Mulai Testing

### Langkah-Langkah:
1. **Browser:** Buka http://localhost:3000
2. **Upload:** Test upload PDF
3. **Summarize:** Generate ringkasan
4. **Q&A:** Tanya pertanyaan
5. **Quiz:** Buat kuis
6. **Check Console:** Lihat network requests

### Monitor:
- DevTools F12 → Network tab
- Lihat request/response
- Check status code (200 = success)
- Debug jika ada error

---

## 📝 API Endpoints Summary

| Feature | Method | URL | Body |
|---------|--------|-----|------|
| Upload | POST | `/upload` | FormData: file |
| Summarize | POST | `/api/summarize` | `{text}` |
| Q&A | POST | `/qa` | `{context, question}` |
| Quiz | POST | `/quiz` | `{text}` |

---

**Siap untuk testing? 🚀**

Buka browser di http://localhost:3000 dan mulai gunakan aplikasinya!