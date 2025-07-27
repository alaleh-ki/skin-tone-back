import chroma from "chroma-js";

export function analyzeSkin(rgb: [number, number, number]) {
  const [r, g, b] = rgb;

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  let shade: "light" | "medium" | "dark" = "medium";
  if (luminance > 200) shade = "light";
  else if (luminance < 80) shade = "dark";

  const [l, a, b_] = chroma(rgb).lab();
  let skin_tone: "warm" | "cool" | "neutral" = "neutral";
  let undertone: "golden" | "olive" | "pink" | "neutral" = "neutral";

  if (b_ > 15) {
    skin_tone = "warm";
    undertone = a < 5 ? "olive" : "golden";
  } else if (a > 10 && b_ < 10) {
    skin_tone = "cool";
    undertone = "pink";
  } else {
    skin_tone = "neutral";
    undertone = "neutral";
  }

  return { skin_tone, undertone, shade, rgb };
}

export function analyzeHair(rgb: [number, number, number]) {
  const [r, g, b] = rgb;

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  let shade: "light" | "medium" | "dark" = "medium";
  if (luminance > 180) shade = "light";
  else if (luminance < 60) shade = "dark";

  let family: "black" | "brown" | "blonde" | "red" | "gray" = "brown";
  if (luminance < 50 && r < 80 && g < 80 && b < 80) family = "black";
  else if (r > 180 && g > 160 && b < 100) family = "blonde";
  else if (r > 120 && g < 90 && b < 80) family = "red";
  else if (luminance > 180 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30)
    family = "gray";

  let tone: "warm" | "cool" | "neutral" = "neutral";
  if (family === "blonde" || family === "red" || r > b + 20) tone = "warm";
  else if (family === "black" || b > r + 20) tone = "cool";

  return { family, shade, tone, rgb };
}
