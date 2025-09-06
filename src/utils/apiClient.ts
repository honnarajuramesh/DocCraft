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
  static async checkPasswordProtected(
    file: File
  ): Promise<ApiResponse<CheckProtectedResponse>> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/check-protected`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.detail || "Failed to check PDF protection" };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error:
          "Network error. Make sure the Python backend is running on port 8000.",
      };
    }
  }

  static async removePassword(
    file: File,
    password: string
  ): Promise<ApiResponse<Blob>> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/remove-password`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.detail || "Failed to remove password" };
      }

      const blob = await response.blob();
      return { data: blob };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error:
          "Network error. Make sure the Python backend is running on port 8000.",
      };
    }
  }

  static async addPassword(
    file: File,
    password: string,
    ownerPassword?: string
  ): Promise<ApiResponse<Blob>> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);
      if (ownerPassword) {
        formData.append("owner_password", ownerPassword);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/add-password`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          error: errorData.detail || "Failed to add password protection",
        };
      }

      const blob = await response.blob();
      return { data: blob };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error:
          "Network error. Make sure the Python backend is running on port 8000.",
      };
    }
  }

  static async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/health`
      );
      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: "Backend not available" };
    }
  }
}
