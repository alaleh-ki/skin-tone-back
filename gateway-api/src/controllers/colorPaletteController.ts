import { Request, Response } from "express";
import axios from "axios";

const mode = process.env.APP_MODE || "dev";
const COLOR_PALETTE_SERVICE_URL = mode === "docker" ? process.env.COLOR_PALETTE_SERVICE_URL_DOCKER : process.env.COLOR_PALETTE_SERVICE_URL_DEV;

export const recommendColorPaletteProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(COLOR_PALETTE_SERVICE_URL!, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling palette-service:", error);
    res.status(500).json({ error: "Failed to recommend color palette" });
  }
};
