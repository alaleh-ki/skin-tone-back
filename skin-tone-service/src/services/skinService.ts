import chroma from "chroma-js";

type Undertone = "warm" | "cool" | "neutral" | "olive";
type Value = "very light" | "light" | "medium" | "medium-dark" | "dark" | "deep";
type ChromaLevel = "very bright" | "bright" | "medium" | "soft" | "muted";
type Season =
  | "Bright Spring" | "Warm Spring" | "Light Spring"
  | "Light Summer"  | "Cool Summer" | "Soft Summer"
  | "Bright Winter" | "Cool Winter" | "Deep Winter"
  | "Deep Autumn"   | "Warm Autumn" | "Soft Autumn";

interface ColorAnalysis {
  undertone: Undertone;
  value: Value;
  chroma: ChromaLevel;
  season: Season;
}

export function analyzePersonalColors(
  skinRgb: [number, number, number],
  hairRgb: [number, number, number],
  eyeRgb: [number, number, number]
): ColorAnalysis {
  const weights = { skin: 0.5, hair: 0.3, eyes: 0.2 };

  const thresholds = {
    value: {
      veryLight: { l: 82, contrast: 36 },
      light: { l: 68, contrast: 40 },
      medium: { l: 52, contrast: 46 },
      dark: { l: 0, contrast: 32 }
    },
    chroma: {
      veryBright: 42,
      bright: 30,
      medium: 18,
      soft: 8
    },
    clarityBoost: {
      minDifference: 8,
      factor: 0.15
    }
  };

  // ====== STEP 1 — Analyze individual features ======
  const skin = analyzeSkin(skinRgb);
  const hair = analyzeHair(hairRgb);
  const eyes = analyzeEyes(eyeRgb);

  // ====== STEP 2 — Undertone logic ======
  let undertone: Undertone = skin.undertone;
  if (undertone === "neutral") {
    const warmCount = [hair.tone, eyes.tone].filter(t => t === "warm").length;
    const coolCount = [hair.tone, eyes.tone].filter(t => t === "cool").length;
    if (warmCount > coolCount) undertone = "warm";
    else if (coolCount > warmCount) undertone = "cool";
  }

  // ====== STEP 3 — Lightness & contrast ======
  const skinL = chroma(skinRgb).get("lab.l");
  const hairL = chroma(hairRgb).get("lab.l");
  const eyeL = chroma(eyeRgb).get("lab.l");

  const avgL = (skinL * weights.skin) + (hairL * weights.hair) + (eyeL * weights.eyes);
  const contrast = Math.max(
    Math.abs(skinL - hairL),
    Math.abs(skinL - eyeL),
    Math.abs(hairL - eyeL)
  );

  let value: Value;
  if (avgL >= thresholds.value.veryLight.l)
    value = contrast >= thresholds.value.veryLight.contrast ? "medium" : "very light";
  else if (avgL >= thresholds.value.light.l)
    value = contrast >= thresholds.value.light.contrast ? "medium-dark" : "light";
  else if (avgL >= thresholds.value.medium.l)
    value = contrast >= thresholds.value.medium.contrast ? "dark" : "medium";
  else
    value = contrast >= thresholds.value.dark.contrast ? "deep" : "dark";

  // ====== STEP 4 — Chroma & clarity ======
  const skinC = chroma(skinRgb).get("lch.c");
  const hairC = chroma(hairRgb).get("lch.c");
  const eyeC = chroma(eyeRgb).get("lch.c");

  let avgC = (skinC * weights.skin) + (hairC * weights.hair) + (eyeC * weights.eyes);

  // Eye clarity boost (scaled)
  if (eyeC > avgC + thresholds.clarityBoost.minDifference) {
    const boost = (eyeC - avgC) * thresholds.clarityBoost.factor;
    avgC += boost;
  }

  let chromaValue: ChromaLevel;
  if (avgC >= thresholds.chroma.veryBright) chromaValue = "very bright";
  else if (avgC >= thresholds.chroma.bright) chromaValue = "bright";
  else if (avgC >= thresholds.chroma.medium) chromaValue = "medium";
  else if (avgC >= thresholds.chroma.soft) chromaValue = "soft";
  else chromaValue = "muted";

  // ====== STEP 5 — Seasonal mapping ======
  const season = getSeasonFromAttributes(undertone, value, chromaValue, avgC, contrast);

  return { undertone, value, chroma: chromaValue, season };
}


function getSeasonFromAttributes(
  ud: Undertone,
  val: Value,
  chromaLevel: ChromaLevel,
  avgChromaNumeric: number,
  contrast: number
): Season {
  // Helper: categorize value
  const isLight = val === "very light" || val === "light";
  const isMedium = val === "medium" || val === "medium-dark";
  const isDeep = val === "dark" || val === "deep";
  const isBright = chromaLevel === "very bright" || chromaLevel === "bright";
  const isSoftOrMuted = chromaLevel === "soft" || chromaLevel === "muted";

  // Derived flags
  const isLowChroma = avgChromaNumeric < 18;
  const isHighChroma = avgChromaNumeric >= 30;
  const lowContrast = contrast < 30;
  const mediumContrast = contrast >= 30 && contrast < 45;
  const highContrast = contrast >= 45;

  // Smooth olive adjustment
  let undertone = ud;
  if (ud === "olive") {
    const warmBias = isHighChroma || highContrast;
    const coolBias = isLowChroma && lowContrast;
    if (warmBias && !coolBias) undertone = "warm";
    else if (coolBias && !warmBias) undertone = "cool";
    else undertone = "neutral";
  }

  // Map of undertone → value depth → chroma brightness → season
  const seasonMap: Record<
    Undertone,
    Record<"light" | "medium" | "deep", Record<"bright" | "muted", Season>>
  > = {
    warm: {
      light: { bright: "Bright Spring", muted: "Light Spring" },
      medium: { bright: "Warm Autumn", muted: "Soft Autumn" },
      deep: { bright: "Deep Autumn", muted: "Soft Autumn" }
    },
    cool: {
      light: { bright: "Light Summer", muted: "Cool Summer" },
      medium: { bright: "Bright Winter", muted: "Soft Summer" },
      deep: { bright: "Deep Winter", muted: "Cool Summer" }
    },
    neutral: {
      light: { bright: "Bright Spring", muted: "Soft Summer" },
      medium: { bright: "Bright Winter", muted: "Soft Autumn" },
      deep: { bright: "Deep Winter", muted: "Soft Autumn" }
    },
    olive: {
      light: { bright: "Bright Spring", muted: "Soft Summer" }, // fallback to neutral light
      medium: { bright: "Bright Winter", muted: "Soft Autumn" }, // fallback to neutral medium
      deep: { bright: "Deep Winter", muted: "Soft Autumn" } // fallback to neutral deep
    }
  };

  // Determine depth key
  let depthKey: "light" | "medium" | "deep" = "medium";
  if (isLight) depthKey = "light";
  else if (isDeep) depthKey = "deep";

  // Special case: warm deep + muted + low chroma + low contrast → softer autumn
  if (
    undertone === "warm" &&
    depthKey === "deep" &&
    isSoftOrMuted &&
    isLowChroma &&
    lowContrast
  ) {
    return "Soft Autumn";
  }

  // Pick from lookup table
  return seasonMap[undertone][depthKey][isBright ? "bright" : "muted"];
}


function analyzeSkin(rgb: [number, number, number]): { undertone: Undertone } {
  const c = chroma(rgb);
  const [L, a, b] = c.lab();
  const hue = c.get("hsl.h");

  if (b >= 10 && a >= 3) return { undertone: "warm" };
  if (b <= 5 && a <= 2) return { undertone: "cool" };
  if (a <= 6 && b >= 6 && L >= 40 && L <= 70) return { undertone: "olive" };

  if (hue >= 30 && hue <= 80) return { undertone: "warm" };
  return { undertone: "neutral" };
}

function analyzeHair(rgb: [number, number, number]): { tone: "warm" | "cool" | "neutral" } {
  const [, a, b] = chroma(rgb).lab();
  if (b >= 12) return { tone: "warm" };
  if (b <= 6 && a <= 3) return { tone: "cool" };
  return { tone: "neutral" };
}

function analyzeEyes(rgb: [number, number, number]): { tone: "warm" | "cool" | "neutral" } {
  const [, a, b] = chroma(rgb).lab();
  if (b >= 10) return { tone: "warm" };
  if (b <= 5 && a <= 3) return { tone: "cool" };
  return { tone: "neutral" };
}
