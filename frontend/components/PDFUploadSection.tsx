"use client";

import { useState } from "react";

interface PDFUploadSectionProps {
  onUploadSuccess: (content: string) => void;
}

export default function PDFUploadSection({ onUploadSuccess }: PDFUploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      setFile(e.dataTransfer.files[0]);
      setMessage("");
    }
  };

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

      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message}`);
        setUploadedFileName(file.name);
        onUploadSuccess(data.preview);
        setFile(null);
      } else {
        setMessage(`❌ ${data.error || "Upload failed"}`);
      }
    } catch (error) {
      setMessage(`❌ Error uploading file: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📤 Upload PDF</h2>
        <p className="text-blue-100">Start by uploading your study material</p>
      </div>

      <div className="p-6">
        {/* Drag and Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragOver
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <div className="text-5xl mb-3">📁</div>
          <p className="text-gray-600 mb-2 font-medium">Drag and drop your PDF here</p>
          <p className="text-gray-400 text-sm mb-4">or</p>
          <label className="inline-block">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer font-medium">
              Choose File
            </span>
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Selected file:</span> {file.name}
            </p>
            <p className="text-xs text-gray-500">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${
            message.startsWith("✅")
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        {/* Uploaded File Status */}
        {uploadedFileName && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <span className="font-semibold">✓ Current file:</span> {uploadedFileName}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Ready for analysis. Go to Summarize, Q&A, or Quiz to process this document.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
