import chroma from "chroma-js";

type SkinInput = {
  skin_tone: "warm" | "cool" | "neutral";
  undertone: "golden" | "olive" | "pink" | "neutral";
  shade: "light" | "medium" | "dark";
  rgb: [number, number, number];
};

export function generatePalette({ skin_tone, undertone, shade, rgb }: SkinInput) {
  const base = chroma(rgb);
  const clothing = getClothingColors(base, shade);
  const eye_makeup = getEyeMakeupColors(skin_tone, shade);
  const makeup = getMakeupColors(skin_tone, undertone, shade);
  const lipstick = getLipstickColors(skin_tone, undertone, shade);
  return { eye_makeup, clothing, makeup, lipstick };
}

function getLipstickColors(
  skin_tone: "warm" | "cool" | "neutral",
  undertone: "golden" | "olive" | "pink" | "neutral",
  shade: "light" | "medium" | "dark"
): string[] {
  const map: Record<string, string[]> = {
    warm_light: ["#FF6F61", "#E94B3C", "#C1440E", "#FF8C69", "#FF6347", "#B22222"],
    warm_medium: ["#C72C48", "#A52A2A", "#8B0000", "#B03030", "#993333", "#800000"],
    warm_dark: ["#8B0000", "#5C2A1E", "#A52A2A", "#4B1E1E", "#6B1E1E", "#7B3F00"],
    cool_light: ["#E75480", "#C71585", "#FFB6C1", "#FF69B4", "#D36C9B", "#B03060"],
    cool_medium: ["#B03060", "#800080", "#8B004B", "#A52A99", "#993366", "#551A8B"],
    cool_dark: ["#4B0082", "#800000", "#551A8B", "#660033", "#7D0552", "#3B0A45"],
    neutral_light: ["#F4A460", "#D2691E", "#CD5C5C", "#E9967A", "#E3735E", "#B87333"],
    neutral_medium: ["#B22222", "#A0522D", "#8B4513", "#7E3817", "#A0522D", "#7F462C"],
    neutral_dark: ["#5C4033", "#4B3621", "#3B2F2F", "#3E2723", "#4E342E", "#2E1F17"],
  };
  return map[`${skin_tone}_${shade}`] || ["#A52A2A", "#8B0000", "#B22222", "#800000", "#993333", "#551A8B"];
}

function getMakeupColors(
  skin_tone: "warm" | "cool" | "neutral",
  undertone: "golden" | "olive" | "pink" | "neutral",
  shade: "light" | "medium" | "dark"
): string[] {
  const map: Record<string, string[]> = {
    warm_light: ["#FFDAB9", "#FFB07C", "#E9967A", "#F4A460", "#F5CBA7", "#F8B195"],
    warm_medium: ["#CD853F", "#D2691E", "#E97451", "#B5651D", "#C68642", "#BC8F8F"],
    warm_dark: ["#8B4513", "#A0522D", "#B5651D", "#7F462C", "#5C4033", "#8B5E3C"],
    cool_light: ["#F8BBD0", "#E6A6BE", "#FFDFE0", "#F4A3C0", "#F5C6D7", "#E6A8D7"],
    cool_medium: ["#C71585", "#B03060", "#D36C9B", "#A0527C", "#C154C1", "#D291BC"],
    cool_dark: ["#800080", "#551A8B", "#8B004B", "#5E4B8B", "#7D0552", "#6B5B95"],
    neutral_light: ["#F5CBA7", "#E9967A", "#F4A460", "#EEC591", "#E4B169", "#D8A47F"],
    neutral_medium: ["#CD7F32", "#A0522D", "#8B4513", "#BC8F8F", "#C19A6B", "#B87333"],
    neutral_dark: ["#4B3621", "#3B2F2F", "#5C4033", "#5E433A", "#3E2723", "#4E342E"],
  };
  return map[`${skin_tone}_${shade}`] || ["#E9967A", "#CD7F32", "#A0522D", "#BC8F8F", "#B87333", "#5C4033"];
}

function getEyeMakeupColors(
  skin_tone: "warm" | "cool" | "neutral",
  shade: "light" | "medium" | "dark"
): string[] {
  const map: Record<string, string[]> = {
    warm_light: [
      "#FFD700", "#D2691E", "#CD853F", "#DAA520",
      "#FF4500", "#00CED1"
    ],
    warm_medium: [
      "#A0522D", "#B8860B", "#8B4513", "#BC8F8F",
      "#FF6347", "#008B8B"
    ],
    warm_dark: [
      "#8B4513", "#A0522D", "#5C4033", "#8B5A2B",
      "#FFD700", "#228B22"
    ],
    cool_light: [
      "#ADD8E6", "#9370DB", "#E6E6FA", "#D8BFD8",
      "#1E90FF", "#FF00FF"
    ],
    cool_medium: [
      "#6A5ACD", "#8A2BE2", "#483D8B", "#4169E1",
      "#40E0D0", "#FF1493"
    ],
    cool_dark: [
      "#4B0082", "#483D8B", "#191970", "#3B0A45",
      "#9932CC", "#00BFFF"
    ],
    neutral_light: [
      "#F5DEB3", "#DEB887", "#D2B48C", "#C0A080",
      "#FFA500", "#20B2AA"
    ],
    neutral_medium: [
      "#A0522D", "#8B4513", "#BC8F8F", "#8B5A2B",
      "#FF8C00", "#4682B4"
    ],
    neutral_dark: [
      "#5C4033", "#4B3621", "#3B2F2F", "#3E2723",
      "#FFD700", "#7FFF00"
    ],
  };
  return map[`${skin_tone}_${shade}`] || ["#A0522D", "#8B4513", "#BC8F8F", "#FFD700", "#1E90FF", "#FF00FF"];
}

function getClothingColors(base: chroma.Color, shade: "light" | "medium" | "dark"): string[] {
  const brightnessAdjust = shade === "light" ? 1.2 : shade === "dark" ? 0.8 : 1;
  return [
    base.set("hsl.h", "+90").brighten(brightnessAdjust).hex(),
    base.set("hsl.h", "-90").darken(1).hex(),
    base.brighten(shade === "light" ? 2.2 : 1.2).hex(),
    base.set("hsl.h", "+180").saturate(1.2).hex(),
    base.set("hsl.h", "-45").brighten(1.5).hex(),
    base.set("hsl.h", "+45").darken(0.5).hex(),
  ];
}
