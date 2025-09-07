import React, { useState } from "react";
import {
  Download,
  Image,
  Settings,
  AlertCircle,
  FileImage,
} from "lucide-react";
import { ApiClient } from "../utils/apiClient";
import { Button } from "./ui/Button";
import { FileUpload } from "./ui/FileUpload";

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

interface FileInfo {
  file: File;
  name: string;
  size: number;
}

export const PdfToImages: React.FC = () => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [password, setPassword] = useState("");
  const [format, setFormat] = useState<"PNG" | "JPEG">("PNG");
  const [dpi, setDpi] = useState(200);
  const [result, setResult] = useState<Blob | null>(null);
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    success: false,
  });

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
      });
      setState((prev) => ({ ...prev, error: null, success: false }));
      setResult(null);
      setPassword("");
    } else {
      setState((prev) => ({
        ...prev,
        error: "Please select a valid PDF file",
      }));
    }
  };

  const processFile = async () => {
    if (!file) {
      setState((prev) => ({ ...prev, error: "Please select a PDF file" }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
      progress: 0,
      success: false,
    }));

    try {
      setState((prev) => ({ ...prev, progress: 50 }));

      const response = await ApiClient.convertPdfToImages(
        file.file,
        format,
        dpi,
        password || undefined
      );

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setState((prev) => ({ ...prev, progress: 100, success: true }));
        setResult(response.data);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        progress: 0,
        success: false,
      }));
    } finally {
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  const downloadFile = () => {
    if (result) {
      const url = URL.createObjectURL(result);
      const a = document.createElement("a");
      a.href = url;
      a.download = file?.name.replace(".pdf", "_images.zip") || "images.zip";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const reset = () => {
    setFile(null);
    setPassword("");
    setResult(null);
    setState({
      isProcessing: false,
      progress: 0,
      error: null,
      success: false,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
              <FileImage className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">PDF to Images</h2>
        </div>
        <p className="text-gray-400">
          Convert PDF pages to high-quality images
        </p>
      </div>

      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
        {!file && <FileUpload onFileSelect={handleFileSelect} accept=".pdf" />}

        {file && !result && (
          <div className="space-y-6">
            {/* File Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
              <div className="bg-green-500/10 p-2 rounded-lg">
                <FileImage className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{file.name}</p>
                <p className="text-gray-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Conversion Settings
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) =>
                      setFormat(e.target.value as "PNG" | "JPEG")
                    }
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white"
                  >
                    <option value="PNG">PNG (Lossless)</option>
                    <option value="JPEG">JPEG (Smaller file)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quality (DPI): {dpi}
                  </label>
                  <input
                    type="range"
                    min="72"
                    max="300"
                    value={dpi}
                    onChange={(e) => setDpi(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>72 DPI</span>
                    <span>300 DPI</span>
                  </div>
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password (if protected)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter PDF password if required"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={processFile}
                disabled={state.isProcessing}
                loading={state.isProcessing}
                icon={Image}
                className="flex-1"
              >
                {state.isProcessing ? "Converting..." : "Convert to Images"}
              </Button>
              <Button onClick={reset} variant="secondary" className="px-4">
                Reset
              </Button>
            </div>
          </div>
        )}

        {result && (
          <div className="text-center space-y-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-green-400">
                  Conversion Complete!
                </span>
              </div>
              <p className="text-green-300">
                Your PDF has been converted to images and packaged in a ZIP file
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={downloadFile}
                variant="success"
                icon={Download}
                className="flex-1"
              >
                Download Images (ZIP)
              </Button>
              <Button onClick={reset} variant="secondary" className="px-4">
                Convert Another
              </Button>
            </div>
          </div>
        )}

        {state.error && (
          <div className="mt-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-300 text-sm">{state.error}</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="font-semibold text-blue-400 mb-2">Conversion Details</h4>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-300">
          <div>• Each PDF page becomes a separate image</div>
          <div>• Higher DPI = better quality, larger files</div>
          <div>• PNG for graphics, JPEG for photos</div>
          <div>• All images packaged in ZIP file</div>
        </div>
      </div>
    </div>
  );
};
