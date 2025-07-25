import { Request, Response } from "express";
import { analyzeSkin, analyzeHair } from "../services/skinService";

export const analyzeSkinAndHair = (req: Request, res: Response) => {
  const { skin_rgb, hair_rgb } = req.body;
  if (!skin_rgb || !Array.isArray(skin_rgb) || skin_rgb.length !== 3 || !hair_rgb || !Array.isArray(hair_rgb) || hair_rgb.length !== 3) {
    return res.status(400).json({ error: "Invalid skin_rgb or hair_rgb input" });
  }
  const skinResult = analyzeSkin(skin_rgb as [number, number, number]);
  const hairResult = analyzeHair(hair_rgb as [number, number, number]);
  res.json({ skin: skinResult, hair: hairResult });
};
