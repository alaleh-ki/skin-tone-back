import chroma from "chroma-js";
import { Season } from "./types/types";

export function getMakeupColors(season: Season): {
  blush: string[];
  contour: string[];
  highlighter: string[];
} {
  // Real makeup palettes mapped by 12 season system
  const makeupPalettes: Record<Season, { blush: string[]; contour: string[]; highlighter: string[] }> = {
    // SPRING TYPES (warm, fresh, bright/light)
    "Bright Spring": {
      blush: ["#FF8577", "#FFB07C", "#FF9999", "#FF6F61"], // coral & warm pinks
      contour: ["#C49A6C", "#B07D5C", "#A97457", "#8B5E3C"], // warm tans
      highlighter: ["#FFF4C2", "#FFE9A3", "#FFE7B5", "#FCE1B3"], // golden ivory
    },
    "Light Spring": {
      blush: ["#FFB3A7", "#FFD1A1", "#FFC1B6", "#F7A88B"], // peach-pinks, apricot
      contour: ["#CFA982", "#C39977", "#B88B6B", "#AA7E5A"], // light warm browns
      highlighter: ["#FFFACD", "#FFEFC1", "#FFE4B5", "#FBE8CC"], // soft champagne
    },
    "Warm Spring": {
      blush: ["#F6A85E", "#FF9966", "#E86C5D", "#F08080"], // apricot, terracotta
      contour: ["#B17A4B", "#A56B3D", "#9C6335", "#8B5A2B"], // golden bronze
      highlighter: ["#FFD38E", "#F5C469", "#E9C46A", "#E6B873"], // rich gold
    },

    // SUMMER TYPES (cool, soft, light/medium)
    "Cool Summer": {
      blush: ["#F6A6B2", "#E4A0D3", "#FBB7C0", "#D28EB0"], // cool rose/mauves
      contour: ["#A48C86", "#947C76", "#7E6862", "#6B5651"], // cool taupes
      highlighter: ["#E6E6FA", "#F0F8FF", "#DDE3F0", "#E5E4E2"], // icy pearl
    },
    "Light Summer": {
      blush: ["#F4C2C2", "#FFB6C1", "#EEC9D2", "#F3D1DC"], // pastel pink/rose
      contour: ["#B4A59B", "#A49288", "#938176", "#857568"], // muted cool beige
      highlighter: ["#F9F6EE", "#FAEBD7", "#EDE6F2", "#F5E9EB"], // light pearl/champagne
    },
    "Soft Summer": {
      blush: ["#C8A2C8", "#BFA6A0", "#D8BFD8", "#B48E92"], // dusty pink/rose
      contour: ["#91857B", "#7F726A", "#6F645C", "#5E534C"], // soft browns
      highlighter: ["#D8D8D8", "#C0C0C0", "#BEB6B6", "#B3A9A9"], // muted silver
    },

    // AUTUMN TYPES (warm, rich, deep/medium)
    "Soft Autumn": {
      blush: ["#D4A373", "#C38370", "#B5655E", "#A47148"], // muted peach/rose
      contour: ["#8C6D52", "#7A5C48", "#6B4F3B", "#5D3F2B"], // warm browns
      highlighter: ["#E6B84C", "#D4A017", "#C1923E", "#B8860B"], // golden amber
    },
    "Warm Autumn": {
      blush: ["#B86B4B", "#D97B5B", "#E27A3F", "#A65E2E"], // brick, burnt coral
      contour: ["#6E4B2F", "#5C4033", "#4B3621", "#3E2723"], // deep bronze
      highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"], // rich gold
    },
    "Deep Autumn": {
      blush: ["#8B4726", "#A14D3A", "#9B3F2D", "#7A3B28"], // russet, deep terracotta
      contour: ["#5C4033", "#4E342E", "#3E2723", "#2C1E17"], // espresso browns
      highlighter: ["#E6B84C", "#CFA15B", "#D1A054", "#B98A44"], // golden bronze
    },

    // WINTER TYPES (cool, clear, deep/bright)
    "Cool Winter": {
      blush: ["#D36C87", "#C8507E", "#B03060", "#A23B72"], // cool raspberry, berry
      contour: ["#5C5470", "#4B4E6D", "#3D3A5A", "#2C2E43"], // cool charcoals
      highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"], // icy pearl/lavender
    },
    "Bright Winter": {
      blush: ["#FF4F6D", "#E63946", "#FF6F91", "#FF4F81"], // vivid cool pinks
      contour: ["#3A3E5B", "#2B2D42", "#1E2137", "#2C2E43"], // deep cool navy-charcoal
      highlighter: ["#E6E6FA", "#F0F8FF", "#E0E6ED", "#E5E4E2"], // icy pearl/silver
    },
    "Deep Winter": {
      blush: ["#B11226", "#9B1D36", "#A50044", "#8B104E"], // deep berry, wine
      contour: ["#2E2E38", "#1C1C24", "#0F0F14", "#1A120B"], // almost-black cools
      highlighter: ["#D8D8D8", "#C0C0C0", "#BEB6B6", "#B3A9A9"], // cool silver/pearl
    },
  };

  return (
    makeupPalettes[season] || {
      blush: [],
      contour: [],
      highlighter: [],
    }
  );
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
