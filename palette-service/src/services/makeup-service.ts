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
  // SPRING TYPES (warm, bright, fresh)
  "Bright Spring": {
    blush: ["#FF8A7A", "#FF6B6B", "#FF9E8E", "#FFC1A6"], // warm coral & peachy pinks
    contour: ["#C9A066", "#B28348", "#A3722E", "#8B5D33"], // warm golden bronze
    highlighter: ["#FFF4C2", "#FFEAA7", "#FFD38E", "#FCE7B7"], // warm creamy golds
  },
  "Light Spring": {
    blush: ["#FFD8A8", "#FFB3B3", "#FFE6C7", "#F7A88B"], // soft peach & coral pinks
    contour: ["#DDB892", "#CBB682", "#B5825D", "#A67C52"], // light warm brown shades
    highlighter: ["#FFFACD", "#FFECB3", "#FFE4B5", "#F7E9D7"], // soft warm ivory
  },
  "Warm Spring": {
    blush: ["#FDA172", "#F6A85E", "#E56B6F", "#FF9A5A"], // warm coral, peach & salmon
    contour: ["#C97C5D", "#A47148", "#8B5D33", "#6E482B"], // rich warm browns
    highlighter: ["#FFD38E", "#F5C469", "#E9C46A", "#FFC36B"], // golden warm highlights
  },

  // SUMMER TYPES (cool, soft, muted)
  "Cool Summer": {
    blush: ["#B5B8E3", "#A2C7E5", "#C9BBCF", "#DB7093"], // muted cool pinks & lavender
    contour: ["#7A6D64", "#6B5A4C", "#5D4D3E", "#544938"], // cool muted taupes & greys
    highlighter: ["#E6E6FA", "#D8E9F0", "#F0F8FF", "#E5E4E2"], // soft cool silvers & icy tones
  },
  "Light Summer": {
    blush: ["#BDE0FE", "#C5DFF8", "#D8E2DC", "#DB7093"], // light cool pinks and soft mauves
    contour: ["#8B7B6D", "#6B5A4C", "#5D4D3E", "#544938"], // soft cool browns & greys
    highlighter: ["#FFFACD", "#FFECB3", "#FFE4B5", "#EDE3D6"], // soft cool ivories
  },
  "Soft Summer": {
    blush: ["#A8B6BF", "#9D9FAB", "#B1A7A6", "#91A6A6"], // muted dusty rose & mauves
    contour: ["#6B5A4C", "#5D4D3E", "#4E3D2F", "#3E2F20"], // muted cool browns
    highlighter: ["#C0C0C0", "#B5B5B5", "#A9A9A9", "#D3D3D3"], // muted silvers & greys
  },

  // AUTUMN TYPES (warm, deep, rich)
  "Soft Autumn": {
    blush: ["#B08968", "#997B66", "#CBB682", "#DDB892"], // muted warm browns & terracotta
    contour: ["#7A5C48", "#6B4F3B", "#5D3F2B", "#4E3822"], // warm deep browns
    highlighter: ["#D4A017", "#E6B84C", "#B8860B", "#C1923E"], // warm golden amber
  },
  "Warm Autumn": {
    blush: ["#C97C5D", "#A47C48", "#B5651D", "#D9AE61"], // rich warm brick & amber
    contour: ["#4B3621", "#5C4033", "#3E2723", "#2C1E17"], // deep warm browns
    highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"], // golden warm highlights
  },
  "Deep Autumn": {
    blush: ["#8B5E3C", "#704214", "#6B4423", "#A97155"], // deep warm rusty browns
    contour: ["#4E342E", "#5C4033", "#3E2723", "#2C1E17"], // deep rich browns
    highlighter: ["#D4A017", "#E6B84C", "#C1923E", "#B8860B"], // amber golds
  },

  // WINTER TYPES (cool, deep, vivid)
  "Cool Winter": {
    blush: ["#4B4453", "#3C4F76", "#536878", "#2C2E43"], // cool deep berries & plums
    contour: ["#2C1E17", "#3E2F20", "#1A120B", "#0F0A06"], // deep cool browns & blacks
    highlighter: ["#A9A9A9", "#BEBEBE", "#8A2BE2", "#9370DB"], // icy silver & violet
  },
  "Bright Winter": {
    blush: ["#FF595E", "#FFCA3A", "#1982C4", "#8AC926"], // bright reds, golds & blues
    contour: ["#2E4057", "#415A77", "#2C2E43", "#3D2C2E"], // dark cool blues & greys
    highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"], // bright icy tones
  },
  "Deep Winter": {
    blush: ["#0D1B2A", "#1B263B", "#415A77", "#3D2C2E"], // deep navy & plum
    contour: ["#1A120B", "#2B2B2B", "#0F0A06", "#3B2F2F"], // deep black & brown
    highlighter: ["#BEBEBE", "#A9A9A9", "#9370DB", "#8A2BE2"], // icy violet & silver
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