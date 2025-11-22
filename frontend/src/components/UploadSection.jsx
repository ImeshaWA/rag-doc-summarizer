////components/UploadSection.jsx
import { useState } from "react";
import { FiUpload, FiFile, FiCheckCircle } from "react-icons/fi";

function UploadSection({ setUploadedFile }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    if (!allowedTypes.includes(uploaded.type)) {
      setError("Only PDF, DOCX, or TXT files are allowed.");
      setFile(null);
      setUploadedFile(null);
      return;
    }

    if (uploaded.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      setFile(null);
      setUploadedFile(null);
      return;
    }

    setError("");
    setFile(uploaded);
    setStatus("ready");
    setUploadedFile(uploaded);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus("uploading");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setError("Upload failed: " + data.error);
        setStatus("");
      } else {
        setStatus("success");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setError("Upload failed. Is backend running?");
      setStatus("");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-50 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-500 to-sky-500 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <FiUpload className="text-2xl" />
          Upload Document
        </h2>
      </div>

      <div className="p-6">
        {/* Drop Zone */}
        <div className="relative">
          <input
            type="file"
            id="fileInput"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50/50 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FiUpload className="w-12 h-12 text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-200" />
              <p className="mb-2 text-sm text-gray-600">
                <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOCX or TXT (MAX. 5MB)</p>
            </div>
          </label>
        </div>

        {/* File Info */}
        {file && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiFile className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {status !== "success" && (
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="ml-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-sky-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              )}

              {status === "success" && (
                <div className="ml-4 flex items-center gap-2 text-green-600 font-medium">
                  <FiCheckCircle className="text-xl" />
                  <span>Uploaded!</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Messages */}
        {status === "uploading" && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-2 animate-slide-up">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-700 font-medium">Uploading document...</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100 text-red-600 animate-slide-up">
            <p className="font-medium">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadSection;