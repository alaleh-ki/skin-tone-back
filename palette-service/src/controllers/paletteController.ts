import { Request, Response } from "express";
import { generatePalette } from "../services/paletteService";

export const recommendPalette = (req: Request, res: Response) => {
  const { skin, hair } = req.body;

  // Basic skin validation
  if (
    !skin ||
    !skin.tone ||
    !skin.undertone ||
    !skin.shade ||
    !skin.rgb ||
    !Array.isArray(skin.rgb) ||
    skin.rgb.length !== 3
  ) {
    return res.status(400).json({ error: "Invalid skin input" });
  }

  if (hair) {
    if (
      !hair.family ||
      !hair.shade ||
      !hair.tone ||
      !hair.rgb ||
      !Array.isArray(hair.rgb) ||
      hair.rgb.length !== 3
    ) {
      return res.status(400).json({ error: "Invalid hair input" });
    }
  }

  const palettes = generatePalette({ skin, hair });
  res.json(palettes);
};
