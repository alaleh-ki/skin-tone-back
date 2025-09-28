import { Request, Response } from "express";
import axios from "axios";

const mode = process.env.APP_MODE || "dev";
const AI_DESCRIPTION_SERVICE_URL = mode === "docker" ? process.env.AI_DESCRIPTION_SERVICE_URL_DOCKER : process.env.AI_DESCRIPTION_SERVICE_URL_DEV;

export const describePaletteProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(AI_DESCRIPTION_SERVICE_URL!, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling ai-description-service:", error);
    res.status(500).json({ error: "Failed to generate AI description" });
  }
};
