import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { upsertSeasonPalette, upsertJewelryPalette } from "../src/repositories/paletteRepository";
import { Season, Undertone } from "../src/services/types/types";

dotenv.config({ path: process.env.ENV_PATH || undefined, debug: false });

const MONGO_URI: string = process.env.MONGO_URI || "mongodb://localhost:27017/skin_tone_app";

interface SeasonPaletteJSON {
  season: Season;
  clothing: string[];
  eye_makeup: string[];
  makeup: { blush: string[]; contour: string[]; highlighter: string[] };
  lipstick: string[];
}

interface JewelryPaletteJSON {
  undertone: Undertone;
  jewelry: string[];
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const dataDir = path.join(process.cwd(), "data");
  const seasonsPath = path.join(dataDir, "season-palettes.json");
  const jewelryPath = path.join(dataDir, "jewelry-palettes.json");

  if (!fs.existsSync(seasonsPath) || !fs.existsSync(jewelryPath)) {
    throw new Error(`Missing data JSON files in ${dataDir}. Run 'npm run export --workspace=palette-service' first.`);
  }

  const seasonsJson = JSON.parse(fs.readFileSync(seasonsPath, "utf8")) as SeasonPaletteJSON[];
  const jewelryJson = JSON.parse(fs.readFileSync(jewelryPath, "utf8")) as JewelryPaletteJSON[];

  for (const s of seasonsJson) {
    await upsertSeasonPalette(s);
    console.log(`Upserted season palette: ${s.season}`);
  }

  for (const j of jewelryJson) {
    await upsertJewelryPalette(j);
    console.log(`Upserted jewelry palette for undertone: ${j.undertone}`);
  }

  await mongoose.disconnect();
  console.log("Seeding complete");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
