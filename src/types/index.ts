export interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

export interface FileInfo {
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface PDFProcessorResult {
  blob: Blob;
  filename: string;
}