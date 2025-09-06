import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = ".pdf",
  maxSize = 50 * 1024 * 1024, // 50MB default
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSelectFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSelectFile(selectedFile);
    }
  };

  const validateAndSelectFile = (file: File) => {
    // Check file size
    if (file.size > maxSize) {
      alert(
        `File size must be less than ${(maxSize / 1024 / 1024).toFixed(0)}MB`
      );
      return;
    }

    // Check file type for PDF
    if (accept.includes(".pdf") && file.type !== "application/pdf") {
      alert("Please select a valid PDF file");
      return;
    }

    onFileSelect(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
        dragOver
          ? "border-purple-400 bg-purple-500/10 scale-[1.02]"
          : "border-gray-600 hover:border-purple-500/50 hover:bg-gray-800/50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <div className="relative">
        <div
          className={`transition-all duration-300 ${
            dragOver ? "scale-110" : ""
          }`}
        >
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 w-full h-full rounded-xl flex items-center justify-center">
              {dragOver ? (
                <FileText className="w-8 h-8 text-white" />
              ) : (
                <Upload className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          {dragOver ? "Drop your PDF here" : "Drop your PDF here"}
        </h3>
        <p className="text-gray-400 mb-6 text-base">
          or click to browse your files
        </p>

        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />

        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
          <Upload className="w-4 h-4 mr-2" />
          Select PDF File
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Maximum file size: {(maxSize / 1024 / 1024).toFixed(0)}MB
        </div>
      </div>
    </div>
  );
};
