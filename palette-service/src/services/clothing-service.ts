import chroma from "chroma-js";
import { Season } from "./types/types";

export function getClothingColors(season: Season): string[] {
  const clothing: Record<Season, string[]> = {
    "Bright Spring": ["#FFA94D", "#FFD93B", "#FF6B6B", "#4ECDC4", "#38A3A5"],
    "Light Spring": ["#FFD8A8", "#FFE066", "#FFB3B3", "#9AE3D4", "#B5E48C"],
    "Warm Spring": ["#F6A85E", "#FFD166", "#E56B6F", "#6BCB77", "#4D908E"],
    "Cool Summer": ["#A2C7E5", "#B5B8E3", "#C9BBCF", "#9BB7D4", "#94B4C2"],
    "Light Summer": ["#C5DFF8", "#D8E2DC", "#BDE0FE", "#C8B6FF", "#B8E0D2"],
    "Soft Summer": ["#A8B6BF", "#B1A7A6", "#9D9FAB", "#91A6A6", "#9CBFA7"],
    "Soft Autumn": ["#CBB682", "#B08968", "#DDB892", "#B5825D", "#997B66"],
    "Warm Autumn": ["#A47C48", "#C97C5D", "#D9AE61", "#A47148", "#B5651D"],
    "Deep Autumn": ["#704214", "#8B5E3C", "#A97155", "#8B6F47", "#6F4E37"],
    "Cool Winter": ["#3C4F76", "#536878", "#4B4453", "#2C2E43", "#3E4C59"],
    "Bright Winter": ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"],
    "Deep Winter": ["#1B263B", "#0D1B2A", "#415A77", "#2E4057", "#3D2C2E"],
  };

  let palette = clothing[season];

  // Fallback to a default palette if season is invalid (should never happen if type is strict)
  if (!palette) {
    palette = clothing["Soft Summer"];
  }

  return palette;
}


// import chroma from "chroma-js";
// import { Season, Shade, HairInput } from "./types/types";

// export function getClothingColors(
//     base: chroma.Color,
//     shade: Shade,
//     season: Season,
//     hair?: HairInput
//   ): string[] {
//     const clothing = {
//       spring: [ // Warm & Light
//         "#FFB07C", // Apricot (Aritzia)
//         "#FFC87C", // Warm yellow (Reformation)
//         "#E2A76F", // Caramel (Sézane)
//         "#8F5E29", // Burnt sienna (Madewell)
//         "#F4E1B1", // Warm cream (COS)
//       ],
//       summer: [ // Cool & Light
//         "#9AC6C5", // Eucalyptus (Aritzia)
//         "#C1DFF0", // Skywash (Reformation)
//         "#DDEEF7", // Oat milk (COS)
//         "#B2DFEE", // Ice blue (Zara)
//         "#D0E8F2", // Morning mist (&OtherStories)
//       ],
//       autumn: [ // Warm & Rich
//         "#8B4513", // Saddle (Ralph Lauren)
//         "#D2691E", // Terracotta (Free People)
//         "#BC8F8F", // Rosemary (Sézane)
//         "#5C4033", // French roast (Madewell)
//         "#F4A460", // Desert sun (Anthropologie)
//       ],
//       winter: [ // Cool & Deep
//         "#191970", // Midnight blue (Theory)
//         "#000080", // Navy (Everlane)
//         "#483D8B", // Dark slate (Arket)
//         "#2F4F4F", // Dark slate (A.P.C.)
//         "#121E3A", // Peacock (Totême)
//       ],
//     };
  
//     let palette = clothing[season];
  
//     // Adjust for hair color
//     if (hair) {
//       const hairColor = chroma(hair.rgb);
//       palette = palette.map(c => chroma.mix(c, hairColor, 0.05, "lab").hex());
//     }
  
//     return palette;
//   }