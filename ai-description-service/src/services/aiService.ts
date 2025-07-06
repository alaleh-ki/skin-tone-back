import dotenv from "dotenv";
import { Request, Response } from "express";
import axios from "axios";
import Description from "../models/aiModel";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) throw new Error("OPENROUTER_API_KEY not set");

interface SkinToneResponse {
  tone_description: string;
  palette_description: string;
  palette_type: "warm" | "cool" | "neutral";
}

class AiService {
  async describeImage(tone: string, palette: Array<string>) {
    const prompt = await this.getPropt(tone, palette);
    console.log(prompt);
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // Free model
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        response_format: { type: "json_object" },
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "YOUR_APP_URL", // Required by OpenRouter
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    // Extract JSON substring using regex
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const cleanContent = jsonMatch[0];

    const parsed: SkinToneResponse = JSON.parse(cleanContent);
    await Description.create({
      tone,
      palette,
      response: parsed,
    });

    return parsed;
  }
  async getPropt(tone: string, palette: Array<string>) {
    const prompt = `Describe skin tone "${tone}" and how it complements this color palette: ${JSON.stringify(palette)}. 
    Return ONLY this JSON format (no other text):
    {
      "tone_description": "...",
      "palette_description": "...",
      "palette_type": "warm|cool|neutral"
    }`;
    return prompt;
  }
}

export default new AiService();
