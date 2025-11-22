//App.jsx
import { useState } from "react";
import Header from "./components/Header";
import UploadSection from "./components/UploadSection";
import SummarySection from "./components/SummarySection";
import ChatInterface from "./components/ChatInterface";

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-sky-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg shadow-sm z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                DocSummarizer
              </span>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-3">
              <button className="px-5 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                Login
              </button>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 animate-slide-up">
            <Header />
            <UploadSection setUploadedFile={setUploadedFile} />
            <SummarySection uploadedFile={uploadedFile} />
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;