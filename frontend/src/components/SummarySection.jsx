//components/SummarySection.jsx
import { useEffect, useState } from "react";
import { FiFileText, FiZap, FiLayers } from "react-icons/fi";

function SummarySection({ uploadedFile }) {
  const [loading, setLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [lastFileName, setLastFileName] = useState("");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (uploadedFile && uploadedFile.name !== lastFileName) {
      setShowSummary(false);
      setError("");
      setLoading(false);
      setSummary("");
      setStep(0);
      setLastFileName(uploadedFile.name);
    }
  }, [uploadedFile, lastFileName]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const getStepInfo = () => {
    const steps = [
      { icon: FiZap, text: "Initializing AI...", color: "text-blue-500" },
      { icon: FiLayers, text: "Chunking document...", color: "text-sky-500" },
      { icon: FiFileText, text: "Generating summary...", color: "text-indigo-500" }
    ];
    return steps[step - 1] || steps[0];
  };

  const handleClick = async () => {
    if (!uploadedFile) {
      setError("⚠️ Please upload a document before getting the summary.");
      return;
    }

    setLoading(true);
    setError("");
    setShowSummary(false);
    setSummary("");
    setStep(0);

    try {
      setStep(1);
      await delay(2000);
      setStep(2);
      await delay(8000);
      setStep(3);
      await delay(2500);

      const res = await fetch("http://127.0.0.1:8000/summarize", {
        method: "POST",
      });

      if (!res.ok) {
        const text = await res.text();
        setError(`❌ Server returned error: ${text}`);
        setLoading(false);
        setStep(0);
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else if (data.summary) {
        setSummary(data.summary);
        setShowSummary(true);
      } else {
        setError("❌ Unexpected response from server.");
      }
    } catch (err) {
      setError("❌ Failed to fetch summary. Is the backend running?");
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  const StepIcon = getStepInfo().icon;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="p-8">
        <div className="flex flex-col items-center">
          {/* Action Button */}
          <button
            onClick={handleClick}
            disabled={loading}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-sky-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none min-w-[250px]"
          >
            {!loading && !showSummary && (
              <span className="flex items-center justify-center gap-2">
                <FiFileText className="text-xl" />
                Get Summary
              </span>
            )}

            {loading && (
              <span className="flex items-center justify-center gap-3">
                <StepIcon className={`text-xl animate-pulse ${getStepInfo().color}`} />
                <span className="font-medium">{getStepInfo().text}</span>
              </span>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-6 w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-xl animate-slide-up">
              <p className="text-red-600 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Summary Output */}
          {showSummary && (
            <div className="mt-8 w-full animate-slide-up">
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-6 border border-blue-100 shadow-inner">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <FiFileText className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900">Document Summary</h3>
                </div>
                
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SummarySection;