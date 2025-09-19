import { Season, Undertone } from "./types/types";
import { getSeasonPaletteBySeason, getJewelryByUndertone } from "../repositories/paletteRepository";

export async function generatePalette({ season, undertone }: { season: Season; undertone: Undertone }) {
  const seasonDoc = await getSeasonPaletteBySeason(season);
  if (!seasonDoc) {
    throw new Error(`Season palette not found for '${season}'`);
  }

  const jewelryDoc = await getJewelryByUndertone(undertone);
  if (!jewelryDoc) {
    throw new Error(`Jewelry palette not found for undertone '${undertone}'`);
  }

  return {
    clothing: seasonDoc.clothing,
    eye_makeup: seasonDoc.eye_makeup,
    makeup: seasonDoc.makeup,
    lipstick: seasonDoc.lipstick,
    jewelry: jewelryDoc.jewelry,
  };
}
