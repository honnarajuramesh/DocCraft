export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface CheckProtectedResponse {
  is_protected: boolean;
  method_used: string;
  message: string;
}

export class ApiClient {
  // [Keep existing methods: checkPasswordProtected, removePassword, addPassword]

  static async convertPdfToImages(
    file: File,
    format: "PNG" | "JPEG" | "JPG" = "PNG",
    dpi: number = 200,
    password?: string
  ): Promise<ApiResponse<Blob>> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);
      formData.append("dpi", dpi.toString());
      if (password) {
        formData.append("password", password);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/pdf-to-images`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ detail: "Network error" }));
        return { error: errorData.detail || "Failed to convert PDF to images" };
      }

      const blob = await response.blob();
      return { data: blob };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error:
          "Network error. Please check your internet connection and try again.",
      };
    }
  }

  static async convertImagesToPdf(
    files: File[],
    pageSize: "A4" | "LETTER" | "LEGAL" = "A4",
    orientation: "portrait" | "landscape" = "portrait",
    quality: number = 85
  ): Promise<ApiResponse<Blob>> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("page_size", pageSize);
      formData.append("orientation", orientation);
      formData.append("quality", quality.toString());

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/images-to-pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ detail: "Network error" }));
        return { error: errorData.detail || "Failed to convert images to PDF" };
      }

      const blob = await response.blob();
      return { data: blob };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error:
          "Network error. Please check your internet connection and try again.",
      };
    }
  }

  static async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/health`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        return { error: "Backend unavailable" };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("Health check error:", error);
      return { error: "Backend unavailable" };
    }
  }
}
