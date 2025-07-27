import { Request, Response } from "express";
import { generatePalette } from "../services/paletteService";

export const recommendPalette = (req: Request, res: Response) => {
  const { skin_tone, undertone, shade, rgb } = req.body;
  console.log(skin_tone, undertone, shade, rgb, Array.isArray(rgb), rgb.length )
  if (!skin_tone || !undertone || !shade || !rgb || !Array.isArray(rgb) || rgb.length !== 3) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const palettes = generatePalette({ skin_tone, undertone, shade, rgb: rgb as [number, number, number] });
  res.json(palettes);
};
