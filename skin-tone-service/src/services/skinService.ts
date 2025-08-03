import chroma from "chroma-js";

type SkinTone = "warm" | "cool" | "neutral" | "olive";
type Undertone = "golden" | "olive" | "pink" | "peach" | "neutral";
type Shade = "very light" | "light" | "medium" | "tan" | "dark" | "deep";
type HairFamily = "black" | "brown" | "blonde" | "red" | "gray" | "auburn" | "highlighted";
type HairTone = "warm" | "cool" | "neutral";

interface SkinAnalysis {
  tone: SkinTone;
  undertone: Undertone;
  shade: Shade;
  rgb: [number, number, number];
}

interface HairAnalysis {
  family: HairFamily;
  shade: "light" | "medium" | "dark";
  tone: HairTone;
  rgb: [number, number, number];
}

export function analyzeSkin(rgb: [number, number, number]): SkinAnalysis {
  const color = chroma(rgb);
  const [l, a, b] = color.lab();
  const h = color.get('hsl.h') || 0;
  const s = color.get('hsl.s');

  // Determine shade based on luminance with more granularity
  let shade: Shade;
  if (l > 85) shade = "very light";
  else if (l > 70) shade = "light";
  else if (l > 55) shade = "medium";
  else if (l > 40) shade = "tan";
  else if (l > 25) shade = "dark";
  else shade = "deep";

  // Determine skin tone and undertone with more precision
  let tone: SkinTone;
  let undertone: Undertone;

  if (b > 12) {
    tone = "warm";
    if (a > 8 && h > 25 && h < 45) {
      undertone = "golden";
    } else if (a < 6 && b > 15) {
      undertone = "olive";
    } else if (h > 15 && h < 35) {
      undertone = "peach";
    } else {
      undertone = "golden";
    }
  } else if (a > 10 && b < 10) {
    tone = "cool";
    if (h > 330 || h < 15) {
      undertone = "pink";
    } else {
      undertone = "neutral";
    }
  } else {
    tone = "neutral";
    if (Math.abs(a - b) < 5) {
      undertone = "neutral";
    } else if (b > a) {
      undertone = "peach";
    } else {
      undertone = "pink";
    }
  }

  // Special case for olive skin
  if (a < 5 && b > 10 && l < 70) {
    tone = "olive";
    undertone = "olive";
  }

  return { tone, undertone, shade, rgb };
}

export function analyzeHair(rgb: [number, number, number]): HairAnalysis {
  const color = chroma(rgb);
  const [l, a, b] = color.lab();
  const h = color.get('hsl.h') || 0;
  const s = color.get('hsl.s');

  let shade: "light" | "medium" | "dark";
  if (l > 75) shade = "light";
  else if (l > 35) shade = "medium";
  else shade = "dark";


  let family: HairFamily;


  if (l < 25 && s < 0.15) {
    family = "black";
  }

  else if (l > 70 && s < 0.2) {
    family = "gray";
  }

  else if (l > 65 && h > 30 && h < 70) {
    family = "blonde";
  }

  else if (h < 25 || h > 330) {
    if (s > 0.5 && l > 40) {
      family = "red";
    } else if (h > 340 && s > 0.4) {
      family = "auburn";
    } else {
      family = "brown";
    }
  }

  else if (color.hex() !== chroma([rgb[0]*0.9, rgb[1]*0.9, rgb[2]*0.9]).hex()) {
    family = "highlighted";
  }
  else {
    family = "brown";
  }

  let tone: HairTone;
  if (b > 15 && a > 5) {
    tone = "warm";
  } else if (b < 5 && a < 5) {
    tone = "cool";
  } else {
    tone = "neutral";
  }

  if (family === "red" || family === "auburn") tone = "warm";
  if (family === "black" && l < 15) tone = "cool";

  return { family, shade, tone, rgb };
}