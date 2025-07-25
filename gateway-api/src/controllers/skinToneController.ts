import { Request, Response } from "express";
import axios from "axios";

const SKIN_TONE_SERVICE_URL = process.env.SKIN_TONE_SERVICE_URL || "http://skin-tone-service:5002/analyze";

export const analyzeSkinAndHairProxy = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(SKIN_TONE_SERVICE_URL, req.body);
    res.json(response.data);
  } catch (error: any) {
    console.error("Error calling skin-tone-service:", error.message);
    res.status(500).json({ error: "Failed to analyze skin and hair color" });
  }
};
