////components/ChatInterface.jsx
import { useState, useRef, useEffect } from "react";
import { FiUser, FiCpu, FiSend } from "react-icons/fi";

function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! Ask me anything about the document." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ question: input }),
      });

      const data = await res.json();
      
      setMessages([
        ...newMessages,
        { role: "bot", content: data.answer || "No answer received." },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "bot", content: "❌ Error connecting to backend." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiCpu className="text-2xl" />
          Chat with AI
        </h2>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            } animate-slide-up`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-sky-500"
                  : "bg-gradient-to-br from-indigo-500 to-purple-500"
              }`}
            >
              {msg.role === "user" ? (
                <FiUser className="text-white text-lg" />
              ) : (
                <FiCpu className="text-white text-lg" />
              )}
            </div>

            {/* Message Bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blue-500 to-sky-500 text-white rounded-tr-sm"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3 animate-slide-up">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <FiCpu className="text-white text-lg" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-50 border-t border-blue-100">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about the document..."
            className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
          >
            <FiSend className="text-lg" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;