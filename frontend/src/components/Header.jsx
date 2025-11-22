////components/Header.jsx
function Header() {
  return (
    <div className="text-center space-y-4 mb-8">
      <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent animate-slide-up">
        AI Document Summarizer
      </h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Upload your documents and get instant AI-powered summaries with intelligent chat support
      </p>
      
      {/* Feature badges */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium border border-blue-100">
          ✨ Instant Summaries
        </span>
        <span className="px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-sm font-medium border border-sky-100">
          💬 AI Chat
        </span>
        <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium border border-indigo-100">
          📄 Multiple Formats
        </span>
      </div>
    </div>
  );
}

export default Header;