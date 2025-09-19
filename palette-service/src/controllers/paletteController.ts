import { Request, Response } from "express";
import { generatePalette } from "../services/paletteService";

export const recommendPalette = async (req: Request, res: Response) => {
  const { season, undertone } = req.body;
  if (!season) {
    return res.status(400).json({ error: "Invalid season input" });
  }

  try {
    const palettes = await generatePalette({ season, undertone });
    res.json(palettes);
  } catch (err: any) {
    console.error(err?.message || err);
    res.status(500).json({ error: "Failed to fetch palettes" });
  }
};
