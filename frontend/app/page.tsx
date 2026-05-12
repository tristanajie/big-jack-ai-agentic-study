"use client";

import { useState } from "react";
import PDFUploadSection from "@/components/PDFUploadSection";
import SummarizeSection from "@/components/SummarizeSection";
import QASection from "@/components/QASection";
import QuizSection from "@/components/QuizSection";

export default function Home() {
  const [uploadedContent, setUploadedContent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"home" | "summarize" | "qa" | "quiz">("home");

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Study Assistant
                </h1>
                <p className="text-xs text-gray-500">Smart Learning Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "home" ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to AI Study Assistant</h2>
              <p className="text-xl text-gray-600 mb-8">
                Unlock powerful learning tools with AI-powered document analysis
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Section */}
              <PDFUploadSection onUploadSuccess={setUploadedContent} />

              {/* Features Cards */}
              <div className="space-y-4">
                {/* Summarize Card */}
                <button
                  onClick={() => setActiveTab("summarize")}
                  className="w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <span className="text-2xl group-hover:scale-125 transition-transform">→</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Summarize</h3>
                  <p className="text-gray-600 text-sm">Get instant summaries of your documents</p>
                </button>

                {/* QA Card */}
                <button
                  onClick={() => setActiveTab("qa")}
                  className="w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💬</span>
                    </div>
                    <span className="text-2xl group-hover:scale-125 transition-transform">→</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Q&A</h3>
                  <p className="text-gray-600 text-sm">Ask questions about your documents</p>
                </button>

                {/* Quiz Card */}
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="w-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-gray-100 text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <span className="text-2xl group-hover:scale-125 transition-transform">→</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz Generator</h3>
                  <p className="text-gray-600 text-sm">Create interactive quizzes</p>
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">📚</div>
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">PDF Support</span> - Upload and analyze any PDF
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">⚡</div>
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">AI-Powered</span> - Instant intelligent analysis
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">🎓</div>
                <p className="text-gray-600">
                  <span className="font-bold text-gray-900">Learning Tools</span> - Multiple study features
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === "summarize" ? (
          <SummarizeSection onBack={() => setActiveTab("home")} uploadedContent={uploadedContent} />
        ) : activeTab === "qa" ? (
          <QASection onBack={() => setActiveTab("home")} uploadedContent={uploadedContent} />
        ) : activeTab === "quiz" ? (
          <QuizSection onBack={() => setActiveTab("home")} />
        ) : null}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200/50 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 text-sm">
          <p>© 2024 AI Study Assistant. Powered by advanced AI technology.</p>
        </div>
      </footer>
    </main>
  );
}