import { Request, Response } from "express";
import { recommendColorPalette } from "../services/colorPaletteService";
import { sendStandardResponse } from "../utils/responseUtil";

export const recommendColorPaletteProxy = async (req: Request, res: Response) => {
  try {
    const result = await recommendColorPalette(req.body);
    sendStandardResponse(res, result, 200);
  } catch (error: any) {
    console.error("Error calling palette-service:", error);
    sendStandardResponse(res, { error: "Failed to recommend color palette" }, 500);
  }
};
