import chroma from "chroma-js";
import { Season, Shade, HairInput } from "./types/types";

export function getClothingColors(
    base: chroma.Color,
    shade: Shade,
    season: Season,
    hair?: HairInput
  ): string[] {
    const clothing = {
      spring: [ // Warm & Light
        "#FFB07C", // Apricot (Aritzia)
        "#FFC87C", // Warm yellow (Reformation)
        "#E2A76F", // Caramel (Sézane)
        "#8F5E29", // Burnt sienna (Madewell)
        "#F4E1B1", // Warm cream (COS)
      ],
      summer: [ // Cool & Light
        "#9AC6C5", // Eucalyptus (Aritzia)
        "#C1DFF0", // Skywash (Reformation)
        "#DDEEF7", // Oat milk (COS)
        "#B2DFEE", // Ice blue (Zara)
        "#D0E8F2", // Morning mist (&OtherStories)
      ],
      autumn: [ // Warm & Rich
        "#8B4513", // Saddle (Ralph Lauren)
        "#D2691E", // Terracotta (Free People)
        "#BC8F8F", // Rosemary (Sézane)
        "#5C4033", // French roast (Madewell)
        "#F4A460", // Desert sun (Anthropologie)
      ],
      winter: [ // Cool & Deep
        "#191970", // Midnight blue (Theory)
        "#000080", // Navy (Everlane)
        "#483D8B", // Dark slate (Arket)
        "#2F4F4F", // Dark slate (A.P.C.)
        "#121E3A", // Peacock (Totême)
      ],
    };
  
    let palette = clothing[season];
  
    // Adjust for hair color
    if (hair) {
      const hairColor = chroma(hair.rgb);
      palette = palette.map(c => chroma.mix(c, hairColor, 0.05, "lab").hex());
    }
  
    return palette;
  }