"use client";

import { useState } from "react";

interface QASectionProps {
  onBack: () => void;
  uploadedContent: string;
}

export default function QASection({ onBack, uploadedContent }: QASectionProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Array<{ q: string; a: string }>>([]);

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
      const response = await fetch("http://127.0.0.1:8000/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context: uploadedContent,
          question: question.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.answer) {
        setAnswer(data.answer);
        setHistory([{ q: question, a: data.answer }, ...history]);
        setQuestion("");
      } else {
        setError(data.error || "Failed to get answer");
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">💬 Q&A</h2>
          <p className="text-gray-600">Ask questions about your uploaded document</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
        >
          ← Back
        </button>
      </div>

      {!uploadedContent && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠ No PDF uploaded. Please upload a PDF first to ask questions.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ask Question</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      handleAsk();
                    }
                  }}
                  placeholder="Ask a question about your document..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Ctrl+Enter to submit
                </p>
              </div>

              <button
                onClick={handleAsk}
                disabled={loading || !uploadedContent}
                className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? "Getting Answer..." : "Ask Question"}
              </button>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Current Answer */}
            {answer && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">Answer</h3>
                    <p className="text-sm text-gray-500">Based on your document</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-gray-700 leading-relaxed">{answer}</p>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📚 Q&A History</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {history.map((item, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                      <p className="text-sm font-semibold text-purple-700 mb-2">
                        Q: {item.q}
                      </p>
                      <p className="text-sm text-gray-700 pl-4 border-l-2 border-purple-300">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!answer && !loading && (
              <div className="bg-white rounded-xl shadow-md p-12 border border-gray-100 text-center">
                <p className="text-4xl mb-3">❓</p>
                <p className="text-gray-400">
                  {uploadedContent
                    ? "Ask a question to get started"
                    : "Upload a PDF first"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
