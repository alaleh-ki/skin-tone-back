import { SkinInput, HairInput, getSeason } from "./types/types";
import { getJewelryColors } from "./jewelry-service";
import { getLipstickColors } from "./lipstick-service";
import { getMakeupColors } from "./makeup-service";
import { getEyeMakeupColors } from "./eye-makeup-service";
import { getClothingColors } from "./clothing-service";
import chroma from "chroma-js";

export function generatePalette({ skin, hair }: { skin: SkinInput; hair?: HairInput }) {
  const season = getSeason(skin, hair);
  const base = chroma(skin.rgb);

  return {
    clothing: getClothingColors(base, skin.shade, season, hair),
    eye_makeup: getEyeMakeupColors(skin.tone, skin.shade, skin.undertone, hair),
    makeup: getMakeupColors(skin.tone, skin.undertone, skin.shade, hair),
    lipstick: getLipstickColors(skin.tone, skin.undertone, skin.shade),
    jewelry: getJewelryColors(skin.undertone),
  };
}