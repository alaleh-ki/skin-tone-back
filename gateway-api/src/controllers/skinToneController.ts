import { Request, Response } from "express";
import axios from "axios";

const SKIN_TONE_SERVICE_URL = process.env.SKIN_TONE_SERVICE_URL || "http://skin-tone-service:5002/analyze";
const COLOR_PALETTE_SERVICE_URL = process.env.COLOR_PALETTE_SERVICE_URL || "http://palette-service:5003/recommend";
const AI_DESCRIPTION_SERVICE_URL = process.env.AI_DESCRIPTION_SERVICE_URL || "http://ai-description-service:5001/describe";

export const analyzeSkinAndHairProxy = async (req: Request, res: Response) => {
  try {
    const skinToneResponse = await axios.post(SKIN_TONE_SERVICE_URL, req.body);
    const skinAnalysis = skinToneResponse.data;

    const paletteRequest = {
      skin: skinAnalysis.skin,
      hair: skinAnalysis.hair,
    };
    console.log("paletteRequest", paletteRequest);
    const colorPaletteResponse = await axios.post(COLOR_PALETTE_SERVICE_URL, paletteRequest);
    const colorPalette = colorPaletteResponse.data;
    console.log("colorPalette", colorPalette);
    const aiDescriptionResponse = await axios.post(AI_DESCRIPTION_SERVICE_URL, {
      skin: skinAnalysis.skin,
      hair: skinAnalysis.hair,
      palettes: colorPalette,
    });
    console.log("aiDescriptionResponse", aiDescriptionResponse.data);
    res.json({
      skinTone: skinToneResponse.data,
      colorPalette: colorPaletteResponse.data,
      aiDescription: aiDescriptionResponse.data,
    });
  } catch (error: any) {
    console.error("Error calling skin-tone-service:", error.message);
    res.status(500).json({ error: "Failed to analyze skin and hair color" });
  }
};
