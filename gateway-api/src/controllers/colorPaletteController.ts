import { Request, Response } from "express";
import axios from "axios";

const COLOR_PALETTE_SERVICE_URL = process.env.COLOR_PALETTE_SERVICE_URL || "http://palette-service:5000/recommend";

export const recommendColorPaletteProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(COLOR_PALETTE_SERVICE_URL, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling palette-service:", error);
    res.status(500).json({ error: "Failed to recommend color palette" });
  }
};
