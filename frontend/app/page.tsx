"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    const res = await fetch("http://127.0.0.1:8000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>AI Study Assistant</h1>

      <textarea
        rows={10}
        cols={50}
        placeholder="Masukkan teks..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handleSummarize}>
        Summarize
      </button>

      <h2>Hasil:</h2>
      <p>{summary}</p>
    </main>
  );
}