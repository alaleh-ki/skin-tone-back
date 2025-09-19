import { Schema, model } from "mongoose";

const MakeupSchema = new Schema({
  blush: { type: [String], required: true },
  contour: { type: [String], required: true },
  highlighter: { type: [String], required: true },
});

const SeasonPaletteSchema = new Schema({
  season: { type: String, required: true, unique: true },
  clothing: { type: [String], required: true },
  eye_makeup: { type: [String], required: true },
  makeup: { type: MakeupSchema, required: true },
  lipstick: { type: [String], required: true },
});

const JewelryPaletteSchema = new Schema({
  undertone: { type: String, enum: ["warm", "cool", "neutral", "olive"], required: true, unique: true },
  jewelry: { type: [String], required: true },
});

export const SeasonPalette = model("Season_palette", SeasonPaletteSchema);
export const JewelryPalette = model("Jewelry_palette", JewelryPaletteSchema);
