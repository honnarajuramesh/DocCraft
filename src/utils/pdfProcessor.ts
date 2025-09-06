import { PDFDocument } from "pdf-lib";
import type { PDFProcessorResult } from "../types";

export class PDFProcessor {
  static async removePassword(
    file: File,
    password: string
  ): Promise<PDFProcessorResult> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password });
      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const filename = file.name.replace(".pdf", "_unlocked.pdf");

      return { blob, filename };
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes("password") ||
          error.message.includes("encrypted")
        ) {
          throw new Error(
            "Invalid password or the PDF is not password protected"
          );
        }
        throw new Error(`Error processing PDF: ${error.message}`);
      }
      throw new Error("Unknown error occurred while processing PDF");
    }
  }

  static downloadFile(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
