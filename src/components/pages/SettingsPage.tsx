import React, { useState } from "react";
import { Settings, Download, Upload, Trash2, RefreshCw } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [maxFileSize, setMaxFileSize] = useState(50);
  const [processingTimeout, setProcessingTimeout] = useState(30);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Settings className="w-10 h-10 text-purple-400" />
            Settings
          </h1>
          <p className="text-xl text-gray-300">
            Configure DocCraft to match your preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* File Processing Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Upload className="w-6 h-6 text-blue-400" />
              File Processing
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Maximum File Size (MB)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxFileSize}
                  onChange={(e) => setMaxFileSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>1 MB</span>
                  <span className="text-white font-medium">
                    {maxFileSize} MB
                  </span>
                  <span>100 MB</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Processing Timeout (seconds)
                </label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={processingTimeout}
                  onChange={(e) =>
                    setProcessingTimeout(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-1">
                  <span>10s</span>
                  <span className="text-white font-medium">
                    {processingTimeout}s
                  </span>
                  <span>120s</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">
                    Automatic File Cleanup
                  </h3>
                  <p className="text-sm text-gray-400">
                    Automatically delete temporary files after processing
                  </p>
                </div>
                <button
                  onClick={() => setAutoCleanup(!autoCleanup)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoCleanup ? "bg-purple-600" : "bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoCleanup ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Backend Settings */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <RefreshCw className="w-6 h-6 text-green-400" />
              Backend Configuration
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Backend URL
                </label>
                <input
                  type="text"
                  value="http://localhost:8000"
                  readOnly
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Backend URL is automatically configured for local development
                </p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Trash2 className="w-6 h-6 text-red-400" />
              Data Management
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">
                    Clear All Temporary Files
                  </h3>
                  <p className="text-sm text-gray-400">
                    Remove all temporary files from the backend
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors">
                  Clear Files
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
