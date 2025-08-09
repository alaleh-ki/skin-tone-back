import dotenv from "dotenv";
import { Request, Response } from "express";
import PaletteDescriptionService from "../services/aiService";

dotenv.config();

class PaletteDescriptionController {
  async describePalette(req: Request, res: Response) {
    const { season, palettes } = req.body;

    if (!season || !palettes) {
      return res.status(400).json({
        error: "Missing required fields",
        details: "Request body must include 'season' and 'palettes'",
      });
    }

    try {
      const result = await PaletteDescriptionService.generateDescription(
        season,
        palettes
      );

      res.json(result);
    } catch (error) {
      console.error("AI service error:", error);
      res.status(500).json({
        error: "AI service error",
        details: (error as Error).message || "An unknown error occurred",
      });
    }
  }
}

export default new PaletteDescriptionController();
