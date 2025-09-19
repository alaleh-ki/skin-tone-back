import { getJewelryColors } from "./jewelry-service";
import { getLipstickColors } from "./lipstick-service";
import { getMakeupColors } from "./makeup-service";
import { getEyeMakeupColors } from "./eye-makeup-service";
import { getClothingColors } from "./clothing-service";
import { Season, Undertone } from "./types/types";

export function generatePalette({ season, undertone }: { season: Season; undertone: Undertone }) {
  return {
    clothing: getClothingColors(season),
    eye_makeup: getEyeMakeupColors(season),
    makeup: getMakeupColors(season),
    lipstick: getLipstickColors(season),
    jewelry: getJewelryColors(undertone),
  };
}
