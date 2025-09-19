import { Request, Response } from "express";
import axios from "axios";

const ai_description_SERVICE_URL = process.env.AI_DESCRIPTION_SERVICE_URL || "http://ai-description-service:5000/describe";

export const describePaletteProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(ai_description_SERVICE_URL, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling ai_description-service:", error);
    res.status(500).json({ error: "Failed to recommend color palette" });
  }
};
