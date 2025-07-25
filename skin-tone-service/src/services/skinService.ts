import chroma from "chroma-js";

export function analyzeSkin(rgb: [number, number, number]) {
  const [r, g, b] = rgb;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  let shade: "light" | "medium" | "dark" = "medium";
  if (luminance > 200) shade = "light";
  else if (luminance < 80) shade = "dark";

  const lab = chroma(rgb).lab();
  const [l, a, b_] = lab;
  let skin_tone: "warm" | "cool" | "neutral" = "neutral";
  let undertone: "golden" | "olive" | "pink" | "neutral" = "neutral";

  if (a > 10 && b_ > 10) {
    skin_tone = "warm";
    undertone = "golden";
  } else if (a < 10 && b_ < 10) {
    skin_tone = "cool";
    undertone = "pink";
  } else if (Math.abs(a) < 10 && Math.abs(b_) < 10) {
    skin_tone = "neutral";
    undertone = "olive";
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
  else if (r > 120 && g < 80 && b < 80) family = "red";
  else if (luminance > 180 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30) family = "gray";

  let tone: "warm" | "cool" | "neutral" = "neutral";
  if (r > b && r > g) tone = "warm";
  else if (b > r && b > g) tone = "cool";

  return { family, shade, tone, rgb };
}
