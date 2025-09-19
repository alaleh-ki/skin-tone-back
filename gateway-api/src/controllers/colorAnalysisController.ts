import { Request, Response } from "express";
import axios from "axios";

const COLOR_ANALYSIS_SERVICE_URL = process.env.COLOR_ANALYSIS_SERVICE_URL || "http://color-analysis-service:5000/analyze";
const COLOR_PALETTE_SERVICE_URL = process.env.COLOR_PALETTE_SERVICE_URL || "http://palette-service:5000/recommend";
const AI_DESCRIPTION_SERVICE_URL = process.env.AI_DESCRIPTION_SERVICE_URL || "http://ai-description-service:5000/describe";

export const colorAnalysisProxy = async (req: Request, res: Response) => {
  try {
    const skinToneResponse = await axios.post(COLOR_ANALYSIS_SERVICE_URL, req.body);
    const skinAnalysis = skinToneResponse.data;

    const paletteRequest = {
      season: skinAnalysis.result.season,
      undertone: skinAnalysis.result.undertone,
    };
    console.log("paletteRequest", paletteRequest);
    const colorPaletteResponse = await axios.post(COLOR_PALETTE_SERVICE_URL, paletteRequest);
    const colorPalette = colorPaletteResponse.data;
    console.log("colorPalette", colorPalette);
    const aiDescriptionResponse = await axios.post(AI_DESCRIPTION_SERVICE_URL, {
      palettes: colorPalette,
      season: skinAnalysis.result.season,
    });
    console.log("aiDescriptionResponse", aiDescriptionResponse.data);
    res.json({
      skinTone: skinToneResponse.data.result,
      colorPalette: colorPaletteResponse.data,
      aiDescription: aiDescriptionResponse.data,
    });
  } catch (error: any) {
    console.error("Error calling color-analysis-service:", error.message);
    res.status(500).json({ error: "Failed to analyze skin and hair color" });
  }
};
