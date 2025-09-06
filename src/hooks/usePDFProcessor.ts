import { useState } from "react";
import type { ProcessingState, FileInfo, PDFProcessorResult } from "../types";
import { PDFProcessor } from "../utils/pdfProcessor";

export const usePDFProcessor = () => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [password, setPassword] = useState("");
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    success: false,
  });
  const [result, setResult] = useState<PDFProcessorResult | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      });
      setState((prev) => ({ ...prev, error: null, success: false }));
      setResult(null);
    } else {
      setState((prev) => ({
        ...prev,
        error: "Please select a valid PDF file",
      }));
    }
  };

  const processFile = async () => {
    if (!file || !password) {
      setState((prev) => ({
        ...prev,
        error: "Please select a file and enter the password",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
      progress: 0,
    }));

    try {
      // Simulate progress
      setState((prev) => ({ ...prev, progress: 25 }));

      const result = await PDFProcessor.removePassword(file.file, password);

      setState((prev) => ({ ...prev, progress: 100, success: true }));
      setResult(result);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        progress: 0,
      }));
    } finally {
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  const downloadFile = () => {
    if (result) {
      PDFProcessor.downloadFile(result.blob, result.filename);
    }
  };

  const reset = () => {
    setFile(null);
    setPassword("");
    setState({
      isProcessing: false,
      progress: 0,
      error: null,
      success: false,
    });
    setResult(null);
  };

  return {
    file,
    password,
    state,
    result,
    setPassword,
    handleFileSelect,
    processFile,
    downloadFile,
    reset,
  };
};
