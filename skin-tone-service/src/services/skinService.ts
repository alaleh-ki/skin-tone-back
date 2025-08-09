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
  // Step 1 — Analyze individual features
  const skin = analyzeSkin(skinRgb);
  const hair = analyzeHair(hairRgb);
  const eyes = analyzeEyes(eyeRgb);

  // Step 2 — Determine undertone (skin-first, then adjust)
  let undertone: Undertone = skin.undertone;
  if (skin.undertone === "neutral") {
    if (hair.tone === "warm" || eyes.tone === "warm") undertone = "warm";
    else if (hair.tone === "cool" || eyes.tone === "cool") undertone = "cool";
  }

  // Step 3 — Determine value (light vs deep)
  const skinLightness = chroma(skinRgb).get("lab.l");
  const hairLightness = chroma(hairRgb).get("lab.l");
  const eyeLightness  = chroma(eyeRgb).get("lab.l");

  // Weighted average: skin 50%, hair 30%, eyes 20%
  const avgLightness = (skinLightness * 0.5) + (hairLightness * 0.3) + (eyeLightness * 0.2);
  const contrast = Math.max(
    Math.abs(skinLightness - hairLightness),
    Math.abs(skinLightness - eyeLightness),
    Math.abs(hairLightness - eyeLightness)
  );

  let value: Value;
  if (avgLightness > 80) value = contrast > 35 ? "medium" : "very light";
  else if (avgLightness > 65) value = contrast > 40 ? "medium-dark" : "light";
  else if (avgLightness > 50) value = contrast > 45 ? "dark" : "medium";
  else value = contrast > 30 ? "deep" : "dark";

  // Step 4 — Determine chroma (color clarity)
  const skinSat = chroma(skinRgb).get("hsl.s");
  const hairSat = chroma(hairRgb).get("hsl.s");
  const eyeSat  = chroma(eyeRgb).get("hsl.s");
  const avgSat = (skinSat + hairSat + eyeSat) / 3;

  let chromaValue: ChromaLevel;
  if (avgSat > 0.65) chromaValue = "very bright";
  else if (avgSat > 0.5) chromaValue = "bright";
  else if (avgSat > 0.35) chromaValue = "medium";
  else if (avgSat > 0.2) chromaValue = "soft";
  else chromaValue = "muted";

  // Step 5 — Map to season
  const season = getSeasonFromAttributes(undertone, value, chromaValue);

  return { undertone, value, chroma: chromaValue, season };
}

// ===== Season Mapping Logic =====
function getSeasonFromAttributes(
  undertone: Undertone,
  value: Value,
  chroma: ChromaLevel
): Season {
  // --- OLIVE HANDLING ---
  // Olive can lean warm or cool depending on chroma and depth
  if (undertone === "olive") {
    if (value.includes("light")) {
      undertone = chroma.includes("bright") ? "warm" : "cool";
    } else if (value.includes("medium")) {
      undertone = chroma.includes("soft") || chroma.includes("muted") ? "cool" : "warm";
    } else {
      // deep/dark olives often lean warm unless chroma is very muted
      undertone = chroma.includes("muted") ? "cool" : "warm";
    }
  }

  // --- WARM UNDERTONE ---
  if (undertone === "warm") {
    if (value.includes("light")) {
      return chroma.includes("bright") ? "Bright Spring" : "Light Spring";
    }
    if (value.includes("medium")) {
      return chroma.includes("soft") || chroma.includes("muted")
        ? "Soft Autumn"
        : "Warm Autumn";
    }
    // Deep/dark warm — check chroma to separate Soft Autumn from Deep Autumn
    return chroma.includes("soft") || chroma.includes("muted")
      ? "Soft Autumn"
      : "Deep Autumn";
  }

  // --- COOL UNDERTONE ---
  if (undertone === "cool") {
    if (value.includes("light")) {
      return chroma.includes("bright") ? "Light Summer" : "Cool Summer";
    }
    if (value.includes("medium")) {
      // muted mediums lean toward Soft Summer
      return chroma.includes("soft") || chroma.includes("muted")
        ? "Soft Summer"
        : "Cool Winter";
    }
    // Deep/dark cool — muted chroma moves to Cool Summer, bright to Deep Winter
    return chroma.includes("soft") || chroma.includes("muted")
      ? "Cool Summer"
      : "Deep Winter";
  }

  // --- NEUTRAL UNDERTONE ---
  if (undertone === "neutral") {
    if (value.includes("light")) {
      return chroma.includes("bright") ? "Bright Spring" : "Soft Summer";
    }
    if (value.includes("medium")) {
      return chroma.includes("bright") ? "Bright Winter" : "Soft Autumn";
    }
    // Deep/dark neutrals — bright → Deep Winter, muted → Soft Autumn
    return chroma.includes("bright") ? "Deep Winter" : "Soft Autumn";
  }

  // --- FALLBACK ---
  return "Soft Summer";
}

// ===== Helpers =====
function analyzeSkin(rgb: [number, number, number]): { undertone: Undertone } {
  const color = chroma(rgb);
  const [l, a, b] = color.lab();
  const hue = color.get("hsl.h");

  if (b > 12 && a > 5) return { undertone: "warm" };
  if (b < 8 && a < 5) return { undertone: "cool" };
  if (a < 6 && b > 8) return { undertone: "olive" };
  if (hue >= 40 && hue <= 65) return { undertone: "warm" };
  return { undertone: "neutral" };
}

function analyzeHair(rgb: [number, number, number]): { tone: "warm" | "cool" | "neutral" } {
  const [ , , b] = chroma(rgb).lab();
  if (b > 12) return { tone: "warm" };
  if (b < 6) return { tone: "cool" };
  return { tone: "neutral" };
}

function analyzeEyes(rgb: [number, number, number]): { tone: "warm" | "cool" | "neutral" } {
  const [ , , b] = chroma(rgb).lab();
  if (b > 10) return { tone: "warm" };
  if (b < 6) return { tone: "cool" };
  return { tone: "neutral" };
}
