export interface ColorAnalysisRequest {
  skin_rgb: [number, number, number];
  hair_rgb: [number, number, number];
  eye_rgb: [number, number, number];
}

export interface SkinToneResult {
  undertone: string;
  value: string;
  chroma: string;
  season: string;
}

export interface MakeupPalette {
  blush: string[];
  contour: string[];
  highlighter: string[];
  _id?: string; // MongoDB document ID (optional, may be present in response)
}

export interface ColorPalette {
  clothing: string[];
  eye_makeup: string[];
  makeup: MakeupPalette;
  lipstick: string[];
  jewelry: string[];
}

export interface AIDescription {
  tone_description: string;
  palette_type: string;
  clothing: string;
  eye_makeup: string;
  makeup: string;
  lipstick: string;
  jewelry: string;
  season: string;
}

export interface ColorAnalysisResponse {
  skinTone: SkinToneResult;
  colorPalette: ColorPalette;
  aiDescription: AIDescription;
}

