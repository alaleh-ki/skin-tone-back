import { Schema, model } from "mongoose";

const DescriptionSchema = new Schema({
  season: { type: String, required: true },
  palettes: {
    clothing: [String],
    eye_makeup: [String],
    makeup: {
      blush: [String],
      contour: [String],
      highlighter: [String],
    },
    lipstick: [String],
    jewelry: [String],
  },
  response: {
    tone_description: String,
    palette_type: { type: String, enum: ["گرم", "سرد", "خنثی"] },
    clothing: String,
    eye_makeup: String,
    makeup: String,
    lipstick: String,
    jewelry: String,
    season: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Description", DescriptionSchema);
