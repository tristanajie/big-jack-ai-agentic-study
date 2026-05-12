"use client";

import { useState } from "react";

interface SummarizeSectionProps {
  onBack: () => void;
  uploadedContent: string;
}

export default function SummarizeSection({ onBack, uploadedContent }: SummarizeSectionProps) {
  const [customText, setCustomText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [useCustomText, setUseCustomText] = useState(false);

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

      const response = await fetch("http://127.0.0.1:8000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textToSummarize }),
      });

      const data = await response.json();

      if (response.ok && data.summary) {
        setSummary(data.summary);
      } else {
        setError(data.error || "Failed to generate summary");
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
          <h2 className="text-3xl font-bold text-gray-900 mb-1">📄 Summarize Documents</h2>
          <p className="text-gray-600">Get concise summaries of your content instantly</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Input</h3>

          {/* Toggle */}
          <div className="flex gap-4 mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={!useCustomText}
                onChange={() => setUseCustomText(false)}
                className="w-4 h-4"
              />
              <span className="ml-2 text-gray-700 font-medium">Use Uploaded PDF</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={useCustomText}
                onChange={() => setUseCustomText(true)}
                className="w-4 h-4"
              />
              <span className="ml-2 text-gray-700 font-medium">Enter Custom Text</span>
            </label>
          </div>

          {/* Text Input */}
          {useCustomText && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text to Summarize
              </label>
              <textarea
                value={customText}
                onChange={(e) => {
                  setCustomText(e.target.value);
                  setError("");
                }}
                placeholder="Enter or paste your text here..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {customText.length} characters
              </p>
            </div>
          )}

          {!useCustomText && uploadedContent && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                ✓ PDF content is ready to summarize
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {uploadedContent.length} characters loaded
              </p>
            </div>
          )}

          {!useCustomText && !uploadedContent && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠ No PDF uploaded. Please upload a PDF first or switch to custom text.
              </p>
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleSummarize}
            disabled={loading || (!useCustomText && !uploadedContent)}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? "Generating Summary..." : "Generate Summary"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Summary</h3>

          {summary ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-800 mb-2">✓ Summary Generated</p>
              </div>
              <div className="h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>
              <button
                onClick={() => {
                  const element = document.createElement("a");
                  const file = new Blob([summary], { type: "text/plain" });
                  element.href = URL.createObjectURL(file);
                  element.download = "summary.txt";
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="w-full px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium rounded-lg transition-colors"
              >
                ⬇ Download Summary
              </button>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-400 text-center">
                {loading ? "⏳ Generating summary..." : "Summary will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
