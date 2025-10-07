import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const mode = process.env.APP_MODE || "dev";
const COLOR_ANALYSIS_SERVICE_URL = mode === "docker" ? process.env.COLOR_ANALYSIS_SERVICE_URL_DOCKER : process.env.COLOR_ANALYSIS_SERVICE_URL_DEV;
const COLOR_PALETTE_SERVICE_URL = mode === "docker" ? process.env.COLOR_PALETTE_SERVICE_URL_DOCKER : process.env.COLOR_PALETTE_SERVICE_URL_DEV;
const AI_DESCRIPTION_SERVICE_URL = mode === "docker" ? process.env.AI_DESCRIPTION_SERVICE_URL_DOCKER : process.env.AI_DESCRIPTION_SERVICE_URL_DEV;

export const analyzeColorFlow = async (body: any) => {
  const skinToneResponse = await axios.post(COLOR_ANALYSIS_SERVICE_URL!, body);
  const skinAnalysis = skinToneResponse.data;

  const paletteRequest = {
    season: skinAnalysis.result.season,
    undertone: skinAnalysis.result.undertone,
  };

  const colorPaletteResponse = await axios.post(COLOR_PALETTE_SERVICE_URL!, paletteRequest);
  const colorPalette = colorPaletteResponse.data;

  const aiDescriptionResponse = await axios.post(AI_DESCRIPTION_SERVICE_URL!, {
    palettes: colorPalette,
    season: skinAnalysis.result.season,
  });

  return {
    skinTone: skinToneResponse.data.result,
    colorPalette: colorPaletteResponse.data,
    aiDescription: aiDescriptionResponse.data,
  };
};

