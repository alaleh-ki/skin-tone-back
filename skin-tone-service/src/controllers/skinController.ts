import { Request, Response } from "express";
import { analyzePersonalColors } from "../services/skinService";

export const analyzeSkinAndHair = (req: Request, res: Response) => {
  const { skin_rgb, hair_rgb, eye_rgb } = req.body;
  if (!skin_rgb || !Array.isArray(skin_rgb) || skin_rgb.length !== 3 || !hair_rgb || !Array.isArray(hair_rgb) || hair_rgb.length !== 3 || !eye_rgb || !Array.isArray(eye_rgb) || eye_rgb.length !== 3) {
    return res.status(400).json({ error: "Invalid skin_rgb or hair_rgb or eye_rgb input" });
  }

  const result = analyzePersonalColors(hair_rgb as [number, number, number], skin_rgb as [number, number, number], eye_rgb as [number, number, number]);
  res.json({ result });
};
