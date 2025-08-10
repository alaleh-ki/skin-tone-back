import chroma from "chroma-js";
import { Season } from "./types/types";

export function getClothingColors(season: Season): string[] {
  const clothing: Record<Season, string[]> = {
    "Bright Spring": ["#FF6F61", "#FFD23F", "#40E0D0", "#7BC950", "#FF8C69"],
    "Light Spring": ["#FFD8B1", "#FFF2B2", "#B8E3C0", "##A7D8F0", "#F6B5C0"],
    "Warm Spring": ["#DAA520", "#FF7F50", "#40C5A0", "#FF6347", "#7BB661"],
    "Cool Summer": ["#A9C6EA", "#D8A1C4", "#BCA9E8", "#7C8CA1", "#A9E0DC"],
    "Light Summer": ["#F6D1D1", "#B7D7E8", "#D6C1E8", "#BFE3DC", "#C8CED3"],
    "Soft Summer": ["#C9A9A6", "#7B9EAD", "#B6A0B6", "#A3B9A2", "#B3A28E"],
    "Soft Autumn": ["#D4A59A", "#A8B29E", "#B49782", "#BFAE77", "#8B5E3C"],
    "Warm Autumn": ["#CC5500", "#D4A017", "#808000", "#E2725B", "#5C4033"],
    "Deep Autumn": ["#014D4E", "#4A2C2A", "#A07840", "#2E4600", "#8B3220"],
    "Cool Winter": ["#A7C7E7", "#0A3D62", "#36454F", "#2C2E43", "#FFFFFF"],
    "Bright Winter": ["#005BFF", "#D2042D", "#FFFFFF", "#0A0A0A", "#FF007F"],
    "Deep Winter": ["#003153", "#800020", "#333333", "#046307", "#FFFFFF"],
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
