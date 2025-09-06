import type { PDFProcessorResult } from "../types";

export class PDFProcessor {
  static async removePassword(
    file: File,
    password: string
  ): Promise<PDFProcessorResult> {
    try {
      console.log("Starting PDF processing...");
      console.log("File size:", file.size);
      console.log("File type:", file.type);
      console.log("Password provided:", password ? "Yes" : "No");

      // Import pdf-lib dynamically
      const { PDFDocument } = await import("pdf-lib");
      console.log("pdf-lib imported successfully");

      // Read the file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      console.log("File read as ArrayBuffer, size:", arrayBuffer.byteLength);

      // Try to load the PDF with password
      console.log("Attempting to load PDF with password...");
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        password: password,
        ignoreEncryption: false,
        parseSpeed: 1, // Use slower but more reliable parsing
      });
      console.log("PDF loaded successfully with password");

      // Save without password (this creates a new PDF without encryption)
      console.log("Saving PDF without password...");
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });
      console.log("PDF saved successfully, new size:", pdfBytes.length);

      // Create blob for download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const filename = file.name.replace(/\.pdf$/i, "_unlocked.pdf");

      console.log("PDF processing completed successfully");
      return { blob, filename };
    } catch (error) {
      console.error("Error in PDF processing:", error);

      // Enhanced error handling
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);

        // Check for specific error types
        if (error.message.toLowerCase().includes("password")) {
          throw new Error(
            "Incorrect password provided. Please check your password and try again."
          );
        }

        if (error.message.toLowerCase().includes("encrypted")) {
          throw new Error(
            "Unable to decrypt PDF. Please verify the password is correct."
          );
        }

        if (error.message.toLowerCase().includes("invalid")) {
          throw new Error(
            "Invalid PDF file or corrupted encryption. Please try a different file."
          );
        }

        if (error.message.toLowerCase().includes("not supported")) {
          throw new Error("This PDF uses an unsupported encryption method.");
        }

        throw new Error(`PDF processing failed: ${error.message}`);
      }

      throw new Error("Unknown error occurred while processing PDF");
    }
  }

  static downloadFile(blob: Blob, filename: string): void {
    try {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log("File download initiated:", filename);
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error("Failed to download file");
    }
  }

  // New method to test if PDF is password protected
  static async isPasswordProtected(file: File): Promise<boolean> {
    try {
      console.log("Checking if PDF is password protected...");
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();

      // Try to load without password first
      try {
        await PDFDocument.load(arrayBuffer);
        console.log("PDF loaded without password - not protected");
        return false;
      } catch (error) {
        console.log("PDF failed to load without password:", error);

        // Check if the error indicates password protection
        if (error instanceof Error) {
          const errorMsg = error.message.toLowerCase();
          if (
            errorMsg.includes("password") ||
            errorMsg.includes("encrypted") ||
            errorMsg.includes("decrypt")
          ) {
            console.log("PDF is password protected");
            return true;
          }
        }

        // If it's some other error, the PDF might be corrupted
        console.log("PDF has other issues, assuming not password protected");
        return false;
      }
    } catch (error) {
      console.error("Error checking password protection:", error);
      return false; // Assume not protected if we can't determine
    }
  }

  // Method to validate a password without processing the full PDF
  static async validatePassword(
    file: File,
    password: string
  ): Promise<boolean> {
    try {
      console.log("Validating password...");
      const { PDFDocument } = await import("pdf-lib");
      const arrayBuffer = await file.arrayBuffer();

      // Try to load with the provided password
      await PDFDocument.load(arrayBuffer, { password });
      console.log("Password validation successful");
      return true;
    } catch (error) {
      console.log("Password validation failed:", error);
      return false;
    }
  }
}
