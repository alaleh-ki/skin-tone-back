import axios from "axios";
import type { ColorAnalysisRequest, ColorAnalysisResponse } from "../types/api.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const analyzeColors = async (data: ColorAnalysisRequest): Promise<ColorAnalysisResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<ColorAnalysisResponse>>("/color-analysis/analyze", data);

    // Extract data from the wrapped response
    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error("Invalid response format from server");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Failed to analyze colors. Please try again.");
    }
    throw error;
  }
};
