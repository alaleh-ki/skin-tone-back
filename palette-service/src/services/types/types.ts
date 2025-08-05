import chroma from "chroma-js";

export type SkinTone = "warm" | "cool" | "neutral";
export type Undertone = "golden" | "olive" | "pink" | "neutral";
export type Shade = "light" | "medium" | "dark";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type HairFamily = "black" | "brown" | "blonde" | "red" | "gray" | "other";
export type HairTone = "warm" | "cool" | "neutral";

export interface SkinInput {
  tone: SkinTone;
  undertone: Undertone;
  shade: Shade;
  rgb: [number, number, number];
}

export interface HairInput {
  family: HairFamily;
  shade: "light" | "medium" | "dark";
  tone: HairTone;
  rgb: [number, number, number];
}

export function getSeason(skin: SkinInput, hair?: HairInput): Season {
  if (skin.tone === "warm") return skin.shade === "light" ? "spring" : "autumn";
  if (skin.tone === "cool") return skin.shade === "light" ? "summer" : "winter";
  return skin.undertone === "golden" ? "autumn" : "summer";
}