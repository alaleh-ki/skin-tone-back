import chroma from "chroma-js";
import { Season } from "./types/types";

export function getMakeupColors(season: Season): {
  blush: string[];
  contour: string[];
  highlighter: string[];
} {
  // Real makeup palettes mapped by 12 season system
  const makeupPalettes: Record<
    Season,
    { blush: string[]; contour: string[]; highlighter: string[] }
  > = {
    // SPRING TYPES (warm, fresh, bright/light)
    "Bright Spring": {
      blush: ["#FFA94D", "#FFD93B", "#FF6B6B", "#FF8A7A"],
      contour: ["#B7937E", "#C4A484", "#A67C52", "#8B5D33"],
      highlighter: ["#FFF4C2", "#F5E6B2", "#FFE7A3", "#F2D6A2"],
    },
    "Light Spring": {
      blush: ["#FFD8A8", "#FFE066", "#FFB3B3", "#F7A88B"],
      contour: ["#CBB682", "#B08968", "#DDB892", "#B5825D"],
      highlighter: ["#FFFACD", "#FFE4B5", "#FFECB3", "#EDE3D6"],
    },
    "Warm Spring": {
      blush: ["#F6A85E", "#FFD166", "#E56B6F", "#FDA172"],
      contour: ["#A47C48", "#C97C5D", "#D9AE61", "#A47148"],
      highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"],
    },

    // SUMMER TYPES (cool, soft, light/medium)
    "Cool Summer": {
      blush: ["#A2C7E5", "#B5B8E3", "#C9BBCF", "#E75480"],
      contour: ["#8E7C68", "#7A6D64", "#6B5A4C", "#5D4D3E"],
      highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"],
    },
    "Light Summer": {
      blush: ["#C5DFF8", "#D8E2DC", "#BDE0FE", "#DB7093"],
      contour: ["#A4917B", "#8B7B6D", "#6B5A4C", "#5D4D3E"],
      highlighter: ["#FFFACD", "#FFE4B5", "#FFECB3", "#EDE3D6"],
    },
    "Soft Summer": {
      blush: ["#A8B6BF", "#B1A7A6", "#9D9FAB", "#91A6A6"],
      contour: ["#6B5A4C", "#5D4D3E", "#4E3D2F", "#3E2F20"],
      highlighter: ["#D3D3D3", "#C0C0C0", "#B5B5B5", "#A9A9A9"],
    },

    // AUTUMN TYPES (warm, rich, deep/medium)
    "Soft Autumn": {
      blush: ["#CBB682", "#B08968", "#DDB892", "#997B66"],
      contour: ["#8C6D52", "#7A5C48", "#6B4F3B", "#5D3F2B"],
      highlighter: ["#E6B84C", "#D4A017", "#C1923E", "#B8860B"],
    },
    "Warm Autumn": {
      blush: ["#A47C48", "#C97C5D", "#D9AE61", "#B5651D"],
      contour: ["#5C4033", "#4B3621", "#3E2723", "#2C1E17"],
      highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"],
    },
    "Deep Autumn": {
      blush: ["#704214", "#8B5E3C", "#A97155", "#6B4423"],
      contour: ["#5C4033", "#4E342E", "#3E2723", "#2C1E17"],
      highlighter: ["#E6B84C", "#D4A017", "#C1923E", "#B8860B"],
    },

    // WINTER TYPES (cool, clear, deep/bright)
    "Cool Winter": {
      blush: ["#3C4F76", "#536878", "#4B4453", "#2C2E43"],
      contour: ["#3E2F20", "#2C1E17", "#1A120B", "#0F0A06"],
      highlighter: ["#BEBEBE", "#A9A9A9", "#9370DB", "#8A2BE2"],
    },
    "Bright Winter": {
      blush: ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4"],
      contour: ["#415A77", "#2E4057", "#3D2C2E", "#2C2E43"],
      highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"],
    },
    "Deep Winter": {
      blush: ["#1B263B", "#0D1B2A", "#415A77", "#3D2C2E"],
      contour: ["#2B2B2B", "#1A120B", "#0F0A06", "#3B2F2F"],
      highlighter: ["#BEBEBE", "#A9A9A9", "#9370DB", "#8A2BE2"],
    },
  };

  return makeupPalettes[season] || {
    blush: [],
    contour: [],
    highlighter: [],
  };
}

// import chroma from "chroma-js";
// import { SkinTone, Undertone, Shade, HairInput } from "./types/types";

// export function getMakeupColors(
//     tone: SkinTone,
//     undertone: Undertone,
//     shade: Shade,
//     hair?: HairInput
//   ): { blush: string[]; contour: string[]; highlighter: string[] } {
//     const makeup = {
//       warm_light: {
//         blush: ["#FF9E8E", "#FDA172", "#FF8A7A", "#F7A88B"], // Peaches/corals
//         contour: ["#B7937E", "#C4A484", "#A67C52", "#8B5D33"], // Warm taupes
//         highlighter: ["#FFF4C2", "#F5E6B2", "#FFE7A3", "#F2D6A2"], // Golden
//       },
//       warm_medium: {
//         blush: ["#E2725B", "#D4593D", "#C86D56", "#B55033"], // Terracottas
//         contour: ["#8C6D52", "#7A5C48", "#6B4F3B", "#5D3F2B"], // Warm bronzes
//         highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"], // Gold
//       },
//       warm_dark: {
//         blush: ["#A63D3D", "#8C3A3A", "#7A2E2E", "#5C1E1E"], // Deep berries
//         contour: ["#5C4033", "#4E342E", "#3E2723", "#2C1E17"], // Rich browns
//         highlighter: ["#E6B84C", "#D4A017", "#C1923E", "#B8860B"], // Bronze
//       },
//       cool_light: {
//         blush: ["#FFB7C5", "#F48FB1", "#E75480", "#DB7093"], // Pinks
//         contour: ["#8E7C68", "#7A6D64", "#6B5A4C", "#5D4D3E"], // Cool taupes
//         highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"], // Icy
//       },
//       cool_medium: {
//         blush: ["#D36C9B", "#C2185B", "#AD1457", "#8B004B"], // Berries
//         contour: ["#6B5A4C", "#5D4D3E", "#4E3D2F", "#3E2F20"], // Cool greys
//         highlighter: ["#D3D3D3", "#C0C0C0", "#B5B5B5", "#A9A9A9"], // Pearl
//       },
//       cool_dark: {
//         blush: ["#8B008B", "#9932CC", "#9400D3", "#7B1FA2"], // Plums
//         contour: ["#3E2F20", "#2C1E17", "#1A120B", "#0F0A06"], // Deep greys
//         highlighter: ["#BEBEBE", "#A9A9A9", "#9370DB", "#8A2BE2"], // Silver
//       },
//       neutral_light: {
//         blush: ["#FFB6C1", "#FFA07A", "#FF82AB", "#F08080"], // Peach-pink
//         contour: ["#A4917B", "#8B7B6D", "#6B5A4C", "#5D4D3E"], // Neutral taupes
//         highlighter: ["#FFFACD", "#FFE4B5", "#FFECB3", "#EDE3D6"], // Champagne
//       },
//       neutral_medium: {
//         blush: ["#D2691E", "#CD5C5C", "#BC8F8F", "#A0522D"], // Roses
//         contour: ["#7D6B5C", "#6B5A4C", "#5C4B3B", "#4E3D2F"], // Taupes
//         highlighter: ["#FAF0E6", "#F5DEB3", "#F0E68C", "#EEDD82"], // Gold
//       },
//       neutral_dark: {
//         blush: ["#8B0000", "#800000", "#A52A2A", "#6B4423"], // Wines
//         contour: ["#5C4033", "#4B3621", "#3E2F20", "#3B2F2F"], // Browns
//         highlighter: ["#FFFACD", "#F0E68C", "#EEE8AA", "#F5F5DC"], // Gold
//       },
//     };
  
//     const key = `${tone}_${shade}`;
//     let palette = makeup[key as keyof typeof makeup] || makeup["neutral_medium"];
  
//     // Enhance with hair color
//     if (hair) {
//       const hairColor = chroma(hair.rgb);
//       const influence = hair.tone === "warm" ? 0.15 : 0.1;
      
//       palette = {
//         blush: palette.blush.map(c => chroma.mix(c, hairColor, influence * 0.8, "lab").hex()),
//         contour: palette.contour.map(c => chroma.mix(c, hairColor, influence * 0.5, "lab").hex()),
//         highlighter: palette.highlighter.map(c => chroma.mix(c, hairColor, influence * 0.3, "lab").hex())
//       };
//     }
  
//     return palette;
//   }