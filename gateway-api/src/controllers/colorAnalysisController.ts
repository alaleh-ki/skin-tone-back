import { Request, Response } from "express";
import { analyzeColorFlow } from "../services/colorAnalysisService";
import { sendStandardResponse } from "../utils/responseUtil";

export const colorAnalysisProxy = async (req: Request, res: Response) => {
  try {
    const result = await analyzeColorFlow(req.body);
    sendStandardResponse(res, result, 200);
  } catch (error: any) {
    console.error("Error calling color-analysis-service:", error.message);
    sendStandardResponse(res, { error: "Failed to analyze skin and hair color" }, 500);
  }
};
