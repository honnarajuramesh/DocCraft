import React, { useEffect, useState } from "react";
import {
  Upload,
  Download,
  Unlock,
  Shield,
  Zap,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { usePDFProcessor } from "../hooks/usePDFProcessor";
import { Button } from "./ui/Button";
import { FileUpload } from "./ui/FileUpload";
import { PasswordInput } from "./ui/PasswordInput";
import { ApiClient } from "../utils/apiClient";

const PDFUnlocker: React.FC = () => {
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");

  const {
    file,
    password,
    state,
    result,
    isPasswordProtected,
    setPassword,
    handleFileSelect,
    processFile,
    downloadFile,
    reset,
  } = usePDFProcessor();

  // Check backend status on component mount
  useEffect(() => {
    const checkBackend = async () => {
      const response = await ApiClient.healthCheck();
      setBackendStatus(response.error ? "offline" : "online");
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><g fill='none' fill-rule='evenodd'><g fill='%23374151' fill-opacity='0.05'><circle cx='30' cy='30' r='1'/></g></g></svg>")`,
        }}
      ></div>

      <div className="relative z-10 p-4 max-h-screen overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
                  <Unlock className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                PDF Unlocker
              </h1>
            </div>
            <p className="text-gray-400 text-base font-medium">
              Remove password protection with Python-powered backend
            </p>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-400" />
                100% Private
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-yellow-400" />
                Python Powered
              </div>
              <div className="flex items-center gap-2 text-sm">
                {backendStatus === "checking" && (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-400">Checking...</span>
                  </>
                )}
                {backendStatus === "online" && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Backend Online</span>
                  </>
                )}
                {backendStatus === "offline" && (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Backend Offline</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Backend Status Warning */}
          {backendStatus === "offline" && (
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl"></div>
              <div className="relative flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 font-medium text-sm mb-1">
                    Python Backend Not Running
                  </p>
                  <p className="text-red-400 text-xs">
                    Please start the Python server:{" "}
                    <code>uvicorn main:app --reload</code>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
              {!file && <FileUpload onFileSelect={handleFileSelect} />}

              {file && !result && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md"></div>
                      <div className="relative bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                        <Upload className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold text-white text-base truncate"
                        title={file.name}
                      >
                        {file.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                      </p>
                    </div>
                  </div>

                  {/* Password Protection Status */}
                  {isPasswordProtected !== null && (
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isPasswordProtected
                          ? "bg-blue-500/10 border-blue-500/20"
                          : "bg-yellow-500/10 border-yellow-500/20"
                      }`}
                    >
                      <Info
                        className={`w-5 h-5 flex-shrink-0 ${
                          isPasswordProtected
                            ? "text-blue-400"
                            : "text-yellow-400"
                        }`}
                      />
                      <p
                        className={`text-sm font-medium ${
                          isPasswordProtected
                            ? "text-blue-300"
                            : "text-yellow-300"
                        }`}
                      >
                        {isPasswordProtected
                          ? "This PDF is password protected"
                          : "This PDF is not password protected"}
                      </p>
                    </div>
                  )}

                  {isPasswordProtected && (
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      onEnter={processFile}
                    />
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={processFile}
                      disabled={
                        state.isProcessing ||
                        !password ||
                        isPasswordProtected === false ||
                        backendStatus === "offline"
                      }
                      loading={state.isProcessing}
                      icon={Unlock}
                      className="flex-1"
                    >
                      {state.isProcessing ? "Unlocking..." : "Remove Password"}
                    </Button>
                    <Button
                      onClick={reset}
                      variant="secondary"
                      className="px-4"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}

              {result && (
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                          <div className="relative bg-green-500 p-2 rounded-full">
                            <Unlock className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <span className="text-xl font-bold text-green-400">
                          Password Removed!
                        </span>
                      </div>
                      <p className="text-green-300 text-base">
                        Your PDF has been successfully unlocked by the Python
                        backend
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={downloadFile}
                      variant="success"
                      icon={Download}
                      className="flex-1"
                    >
                      Download Unlocked PDF
                    </Button>
                    <Button
                      onClick={reset}
                      variant="secondary"
                      className="px-4"
                    >
                      Process Another
                    </Button>
                  </div>
                </div>
              )}

              {state.error && (
                <div className="mt-6 relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-xl"></div>
                  <div className="relative flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 font-medium text-sm">
                      {state.error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-400 mb-2 text-base">
                    Privacy & Security Guaranteed
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Local Python processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>No cloud uploads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>PyPDF2 powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span>Automatic cleanup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFUnlocker;
