import { Request, Response } from "express";
import { describePalette } from "../services/aiDescriptionService";
import { sendStandardResponse } from "../utils/responseUtil";

export const describePaletteProxy = async (req: Request, res: Response) => {
  try {
    const result = await describePalette(req.body);
    sendStandardResponse(res, result, 200);
  } catch (error: any) {
    console.error("Error calling ai-description-service:", error);
    sendStandardResponse(res, { error: "Failed to generate AI description" }, 500);
  }
};
