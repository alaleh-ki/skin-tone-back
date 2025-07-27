import { Request, Response } from "express";
import { recommendJewelry } from "../services/jewelryService";

export const recommendJewelryController = (req: Request, res: Response) => {
  const { skin_tone, undertone, shade } = req.body;
  if (!skin_tone || !undertone || !shade) {
    return res.status(400).json({ error: "Invalid input" });
  }
  const result = recommendJewelry({ skin_tone, undertone, shade });
  res.json(result);
};
