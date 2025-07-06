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

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// import { Request, Response } from "express";

// dotenv.config();

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set");

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// class aiController {
//   async describeImage(req: Request, res: Response) {
//     try {
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-pro", 
//         generationConfig: {
//           temperature: 0.4,
//           maxOutputTokens: 600
//         }
//       });

//       const { tone, palette } = req.body;
//       const prompt = `Analyze skin tone "${tone}" and palette ${JSON.stringify(palette)} in Farsi...`;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       res.json({ text: response.text() });

//     } catch (error) {
//       console.error("Gemini Error:", {
//         message: error
//       });
//       res.status(500).json({ 
//         error: "API request failed",
//         suggestion: "Verify your model name and API key"
//       });
//     }
//   }
// }

// export default new aiController();