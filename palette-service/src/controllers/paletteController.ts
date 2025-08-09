import { Request, Response } from "express";
import { generatePalette } from "../services/paletteService";

export const recommendPalette = (req: Request, res: Response) => {
  const { season, undertone } = req.body;

  // Basic skin validation
  if (!season) {
    return res.status(400).json({ error: "Invalid season input" });
  }

  const palettes = generatePalette({ season, undertone });
  res.json(palettes);
};
