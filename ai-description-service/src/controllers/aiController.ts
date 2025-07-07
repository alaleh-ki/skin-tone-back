import dotenv from "dotenv";
import { Request, Response } from "express";
import axios from "axios";
import aiService from "../services/aiService"

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY not set");

interface SkinToneResponse {
  tone_description: string;
  palette_description: string;
  palette_type: "warm" | "cool" | "neutral";
}

class AiController {
  async describeImage(req: Request, res: Response) {
    const { tone, palette } = req.body;
    try{
    const parsed = await aiService.describeImage(tone, palette)
      res.json(parsed);
    } catch (error) {

        console.error("Unknown error occurred:", error);
        res.status(500).json({
          error: "AI service error",
          details: "An unknown error occurred",
        });

    }
  }
}

export default new AiController();