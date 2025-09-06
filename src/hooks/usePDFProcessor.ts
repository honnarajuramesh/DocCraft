import { useState } from "react";
import { ProcessingState, FileInfo, PDFProcessorResult } from "../types";
import { ApiClient } from "../utils/apiClient";

export type ProcessingMode = "remove" | "add";

export const usePDFProcessor = () => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [password, setPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [mode, setMode] = useState<ProcessingMode>("remove");
  const [isPasswordProtected, setIsPasswordProtected] = useState<
    boolean | null
  >(null);
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    error: null,
    success: false,
  });
  const [result, setResult] = useState<PDFProcessorResult | null>(null);

  const checkPasswordProtection = async (pdfFile: File) => {
    try {
      console.log("Checking password protection for:", pdfFile.name);
      setState((prev) => ({ ...prev, error: null }));

      const response = await ApiClient.checkPasswordProtected(pdfFile);

      if (response.error) {
        setState((prev) => ({ ...prev, error: response.error! }));
        setIsPasswordProtected(null);
        return;
      }

      if (response.data) {
        setIsPasswordProtected(response.data.is_protected);
        console.log(
          "Password protection check result:",
          response.data.is_protected
        );
      }
    } catch (error) {
      console.error("Error checking password protection:", error);
      setIsPasswordProtected(null);
      setState((prev) => ({
        ...prev,
        error: "Unable to analyze PDF file. Please try again.",
      }));
    }
  };

  const handleFileSelect = async (selectedFile: File) => {
    console.log(
      "File selected:",
      selectedFile.name,
      selectedFile.size,
      selectedFile.type
    );

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      });

      setState((prev) => ({ ...prev, error: null, success: false }));
      setResult(null);
      setPassword("");
      setOwnerPassword("");
      setIsPasswordProtected(null);

      await checkPasswordProtection(selectedFile);
    } else {
      setState((prev) => ({
        ...prev,
        error: "Please select a valid PDF file",
      }));
    }
  };

  const processFile = async () => {
    console.log("Process file called, mode:", mode);

    if (!file) {
      setState((prev) => ({ ...prev, error: "Please select a file" }));
      return;
    }

    if (!password || password.trim() === "") {
      setState((prev) => ({ ...prev, error: "Please enter a password" }));
      return;
    }

    // Validation based on mode
    if (mode === "remove") {
      if (isPasswordProtected === false) {
        setState((prev) => ({
          ...prev,
          error: "This PDF is not password protected. No action needed.",
        }));
        return;
      }
      if (isPasswordProtected === null) {
        setState((prev) => ({
          ...prev,
          error: "Unable to determine PDF protection status. Please try again.",
        }));
        return;
      }
    } else if (mode === "add") {
      if (isPasswordProtected === true) {
        setState((prev) => ({
          ...prev,
          error:
            "This PDF is already password protected. Please remove existing password first.",
        }));
        return;
      }
      if (password.length < 4) {
        setState((prev) => ({
          ...prev,
          error: "Password must be at least 4 characters long",
        }));
        return;
      }
    }

    console.log(
      `Starting PDF ${
        mode === "remove" ? "unlocking" : "encryption"
      } with Python backend...`
    );
    setState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
      progress: 0,
      success: false,
    }));

    try {
      setState((prev) => ({ ...prev, progress: 25 }));
      console.log("Calling Python API...");

      let response;
      if (mode === "remove") {
        response = await ApiClient.removePassword(file.file, password);
      } else {
        response = await ApiClient.addPassword(
          file.file,
          password,
          ownerPassword || undefined
        );
      }

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        setState((prev) => ({ ...prev, progress: 100, success: true }));

        const suffix = mode === "remove" ? "_unlocked" : "_protected";
        const filename = file.name.replace(/\.pdf$/i, `${suffix}.pdf`);
        setResult({
          blob: response.data,
          filename: filename,
        });

        console.log(
          `PDF ${
            mode === "remove" ? "unlocking" : "encryption"
          } completed successfully`
        );
      } else {
        throw new Error("No data received from API");
      }
    } catch (error) {
      console.error("Error in processFile:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : `Unable to ${
              mode === "remove" ? "unlock" : "encrypt"
            } PDF. Please check your input.`;

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
      try {
        const url = URL.createObjectURL(result.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = result.filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log("File download initiated:", result.filename);
      } catch (error) {
        console.error("Download error:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to download file. Please try again.",
        }));
      }
    }
  };

  const reset = () => {
    console.log("Resetting application state");
    setFile(null);
    setPassword("");
    setOwnerPassword("");
    setIsPasswordProtected(null);
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
    ownerPassword,
    mode,
    state,
    result,
    isPasswordProtected,
    setPassword,
    setOwnerPassword,
    setMode,
    handleFileSelect,
    processFile,
    downloadFile,
    reset,
  };
};
