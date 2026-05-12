"use client";

import { useState } from "react";

interface QuizSectionProps {
  onBack: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  selected?: string;
}

export default function QuizSection({ onBack }: QuizSectionProps) {
  const [text, setText] = useState("");
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleGenerateQuiz = async () => {
    if (!text.trim()) {
      setError("Please enter some text to generate quiz");
      return;
    }

    setLoading(true);
    setError("");
    setQuiz([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.quiz) {
        // Parse quiz data (assuming it's a string or array)
        let quizData: Question[] = [];

        if (typeof data.quiz === "string") {
          // If quiz is a string, try to parse it
          try {
            quizData = JSON.parse(data.quiz);
          } catch {
            // If parsing fails, create a simple quiz structure
            quizData = [
              {
                id: 1,
                question: "Based on the text provided, what is the main concept?",
                options: ["Not provided", "See generated content", "Check API response", "Review data"],
                selected: "",
              },
            ];
          }
        } else if (Array.isArray(data.quiz)) {
          quizData = data.quiz;
        }

        // Ensure quiz has proper structure
        quizData = quizData.map((q: any, idx: number) => ({
          id: idx + 1,
          question: q.question || "Question",
          options: q.options || q.choices || ["Option 1", "Option 2", "Option 3", "Option 4"],
        }));

        setQuiz(quizData);
        setCurrentQuestion(0);
        setAnswers({});
        setScore(null);
      } else {
        setError(data.error || "Failed to generate quiz");
      }
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score (simple: count how many answers were selected)
    const answeredCount = Object.keys(answers).length;
    const scorePercentage = (answeredCount / quiz.length) * 100;
    setScore(scorePercentage);
  };

  const resetQuiz = () => {
    setText("");
    setQuiz([]);
    setCurrentQuestion(0);
    setScore(null);
    setAnswers({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1">🎯 Quiz Generator</h2>
          <p className="text-gray-600">Create interactive quizzes from text</p>
        </div>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
        >
          ← Back
        </button>
      </div>

      {/* Quiz Not Generated */}
      {quiz.length === 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create a Quiz</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Text to Generate Quiz From
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError("");
                }}
                placeholder="Enter educational text, article, or study material..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {text.length} characters
              </p>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={loading || !text.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? "Generating Quiz..." : "Generate Quiz"}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Presentation */}
      {quiz.length > 0 && score === null && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  Question {currentQuestion + 1} of {quiz.length}
                </h3>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  {Math.round(((currentQuestion + 1) / quiz.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestion + 1) / quiz.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                {quiz[currentQuestion].question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {quiz[currentQuestion].options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-medium ${
                      answers[currentQuestion] === option
                        ? "border-pink-500 bg-pink-50 text-pink-900"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-pink-300"
                    }`}
                  >
                    <span className="inline-flex items-center gap-3 w-full">
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === option
                            ? "border-pink-500 bg-pink-500"
                            : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion] === option && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </span>
                      {option}
                    </span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-4 justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 rounded-lg font-medium transition-colors"
                >
                  ← Previous
                </button>

                <div className="flex gap-3">
                  {currentQuestion === quiz.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white rounded-lg font-medium transition-all duration-300"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:shadow-lg text-white rounded-lg font-medium transition-all duration-300"
                    >
                      Next →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {score !== null && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 text-center">
            <div className="text-6xl mb-4">
              {score === 100 ? "🎉" : score >= 70 ? "👍" : "💪"}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {score === 100
                ? "Perfect!"
                : score >= 70
                ? "Great Job!"
                : "Good Effort!"}
            </h3>
            <p className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent mb-4">
              {score.toFixed(0)}%
            </p>
            <p className="text-gray-600 mb-8">
              You answered {Object.keys(answers).length} out of {quiz.length} questions
            </p>

            <div className="space-y-3">
              <button
                onClick={resetQuiz}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Create Another Quiz
              </button>
              <button
                onClick={onBack}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
