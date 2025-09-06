import React from "react";
import {
  Upload,
  Download,
  Unlock,
  Shield,
  Zap,
  AlertCircle,
} from "lucide-react";
import { usePDFProcessor } from "../hooks/usePDFProcessor";
import { Button } from "./ui/Button";
import { FileUpload } from "./ui/FileUpload";
import { PasswordInput } from "./ui/PasswordInput";

const PDFUnlocker: React.FC = () => {
  const {
    file,
    password,
    state,
    result,
    setPassword,
    handleFileSelect,
    processFile,
    downloadFile,
    reset,
  } = usePDFProcessor();

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

      <div className="relative z-10 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl">
                  <Unlock className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                PDF Unlocker
              </h1>
            </div>
            <p className="text-gray-400 text-lg font-medium">
              Remove password protection with military-grade security
            </p>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-400" />
                100% Private
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-yellow-400" />
                Lightning Fast
              </div>
            </div>
          </div>

          {/* Main Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
              {!file && <FileUpload onFileSelect={handleFileSelect} />}

              {file && !result && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md"></div>
                      <div className="relative bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                        <Upload className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-lg">
                        {file.name}
                      </p>
                      <p className="text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                      </p>
                    </div>
                  </div>

                  <PasswordInput
                    value={password}
                    onChange={setPassword}
                    onEnter={processFile}
                  />

                  <div className="flex gap-4">
                    <Button
                      onClick={processFile}
                      disabled={state.isProcessing || !password}
                      loading={state.isProcessing}
                      icon={Unlock}
                      className="flex-1"
                    >
                      {state.isProcessing ? "Unlocking..." : "Remove Password"}
                    </Button>
                    <Button onClick={reset} variant="secondary">
                      Reset
                    </Button>
                  </div>
                </div>
              )}

              {result && (
                <div className="text-center space-y-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                          <div className="relative bg-green-500 p-3 rounded-full">
                            <Unlock className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-green-400">
                          Password Removed!
                        </span>
                      </div>
                      <p className="text-green-300 text-lg">
                        Your PDF has been successfully unlocked and is ready for
                        download
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={downloadFile}
                      variant="success"
                      icon={Download}
                      className="flex-1"
                    >
                      Download Unlocked PDF
                    </Button>
                    <Button onClick={reset} variant="secondary">
                      Process Another
                    </Button>
                  </div>
                </div>
              )}

              {state.error && (
                <div className="mt-8 relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative flex items-start gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl">
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 font-medium">{state.error}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl"></div>
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-blue-400 mb-3 text-lg">
                    🔒 Privacy & Security Guaranteed
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>100% client-side processing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Zero server uploads</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Password never leaves your device</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Open-source pdf-lib technology</span>
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
