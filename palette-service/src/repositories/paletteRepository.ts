import { SeasonPalette, JewelryPalette } from "../models/palettes";
import { Season, Undertone } from "../services/types/types";

export interface SeasonPaletteDoc {
  season: Season;
  clothing: string[];
  eye_makeup: string[];
  makeup: { blush: string[]; contour: string[]; highlighter: string[] };
  lipstick: string[];
}

export interface JewelryPaletteDoc {
  undertone: Undertone;
  jewelry: string[];
}

export async function getSeasonPaletteBySeason(season: Season): Promise<SeasonPaletteDoc | null> {
  const doc = await SeasonPalette.findOne({ season }).lean<SeasonPaletteDoc>().exec();
  return doc || null;
}

export async function getJewelryByUndertone(undertone: Undertone): Promise<JewelryPaletteDoc | null> {
  const doc = await JewelryPalette.findOne({ undertone }).lean<JewelryPaletteDoc>().exec();
  return doc || null;
}

export async function upsertSeasonPalette(palette: SeasonPaletteDoc): Promise<void> {
  const { season, clothing, eye_makeup, makeup, lipstick } = palette;
  await SeasonPalette.updateOne({ season }, { $set: { season, clothing, eye_makeup, makeup, lipstick } }, { upsert: true }).exec();
}

export async function upsertJewelryPalette(palette: JewelryPaletteDoc): Promise<void> {
  const { undertone, jewelry } = palette;
  await JewelryPalette.updateOne({ undertone }, { $set: { undertone, jewelry } }, { upsert: true }).exec();
}
