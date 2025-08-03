import chroma from "chroma-js";

type SkinInput = {
  tone: "warm" | "cool" | "neutral";
  undertone: "golden" | "olive" | "pink" | "neutral";
  shade: "light" | "medium" | "dark";
  rgb: [number, number, number];
};

type HairInput = {
  family: "black" | "brown" | "blonde" | "red" | "gray" | "other";
  shade: "light" | "medium" | "dark";
  tone: "warm" | "cool" | "neutral";
  rgb: [number, number, number];
};
export function generatePalette({ skin, hair }: { skin: SkinInput; hair?: HairInput }) {
  const base = chroma(skin.rgb);
  const clothing = getClothingColors(base, skin.shade, skin.tone, skin.undertone, hair);
  const eye_makeup = getEyeMakeupColors(skin.tone, skin.shade, skin.undertone);
  const makeup = getMakeupColors(skin.tone, skin.undertone, skin.shade, hair);
  const lipstick = getLipstickColors(skin.tone, skin.undertone, skin.shade);
  const jewelry = getJewelryColors(skin.undertone);
  return { eye_makeup, clothing, makeup, lipstick, jewelry };
}
// Jewelry colors based on undertone — classic fashion guideline
function getJewelryColors(undertone: SkinInput["undertone"]): string[] {
  switch (undertone) {
    case "golden":
    case "olive":
      return ["#D4AF37", "#FFD700", "#B8860B"]; // golds
    case "pink":
    case "neutral":
    default:
      return ["#C0C0C0", "#E5E4E2", "#A9A9A9"]; // silvers and cool metals
  }
}
function getLipstickColors(skin_tone: SkinInput["tone"], undertone: SkinInput["undertone"], shade: SkinInput["shade"]): string[] {
  // Modern, wearable lipstick shades organized by tone and depth
  const lipstickDatabase: Record<string, string[]> = {
    // WARM UNDERTONES
    warm_light: [
      "#FF6B4A", // Vibrant coral
      "#E2583E", // Terra cotta
      "#D21404", // Chinese red
      "#CC5500", // Burnt orange
      "#C46210", // Allspice
    ],
    warm_medium: [
      "#C04000", // Mahogany
      "#9F2B68", // Maroon
      "#CD5B45", // Dark coral
      "#B22234", // Fire brick
      "#E97451", // Burnt sienna
    ],
    warm_dark: [
      "#800020", // Burgundy
      "#722F37", // Wine
      "#814141", // Old rose
      "#954535", // Chestnut
      "#7B3F00", // Chocolate
    ],

    // COOL UNDERTONES
    cool_light: [
      "#DB7093", // Pale violet red
      "#DE3163", // Cerise
      "#FF007F", // Bright pink
      "#C21E56", // Rose red
      "#D8BFD8", // Thistle (mauve)
    ],
    cool_medium: [
      "#915C83", // Antique fuchsia
      "#B3446C", // Raspberry rose
      "#D9417E", // Dark pink
      "#800080", // Purple
      "#953553", // Deep mauve
    ],
    cool_dark: [
      "#702963", // Byzantium
      "#800020", // Burgundy (cool version)
      "#4B0082", // Indigo
      "#5D3954", // Dark byzantium
      "#673147", // Old burgundy
    ],

    // NEUTRAL UNDERTONES
    neutral_light: [
      "#C08081", // Old rose
      "#E97451", // Burnt sienna
      "#DB7093", // Pale violet red
      "#CC8899", // Puce
      "#B94E48", // Deep chestnut
    ],
    neutral_medium: [
      "#954535", // Chestnut
      "#80461B", // Russet
      "#C04000", // Mahogany
      "#B22234", // Fire brick
      "#915C83", // Antique fuchsia
    ],
    neutral_dark: [
      "#5D3954", // Dark byzantium
      "#614051", // Eggplant
      "#722F37", // Wine
      "#4B3621", // Cafe noir
      "#3E2723", // Dark brown
    ],
  };

  const palette = lipstickDatabase[`${skin_tone}_${shade}`] || lipstickDatabase["neutral_medium"];

  return palette;
}

function getMakeupColors(
  skin_tone: SkinInput["tone"],
  undertone: SkinInput["undertone"],
  shade: SkinInput["shade"],
  hair?: HairInput
): {
  blush: string[];
  contour: string[];
  highlighter: string[];
  eyeshadow: string[];
} {
  // Professional makeup colors organized by product type
  const makeupDatabase: Record<
    string,
    {
      blush: string[];
      contour: string[];
      highlighter: string[];
      eyeshadow: string[];
    }
  > = {
    warm_light: {
      blush: ["#FFA07A", "#FA8072", "#E9967A", "#FF8C69"], // Peach/Coral
      contour: ["#D2B48C", "#BC8F8F", "#CD853F", "#A0522D"], // Warm taupes
      highlighter: ["#FFE4B5", "#FAFAD2", "#FFDEAD", "#F5DEB3"], // Golden lights
      eyeshadow: ["#FFD700", "#DAA520", "#CD853F", "#B8860B"], // Golds/Warms
    },
    cool_light: {
      blush: ["#FFB6C1", "#FF69B4", "#DB7093", "#FF82AB"], // Pink/Rose
      contour: ["#708090", "#778899", "#6D7B8D", "#848484"], // Cool taupes
      highlighter: ["#F0F8FF", "#E6E6FA", "#F5F5F5", "#FFF0F5"], // Icy lights
      eyeshadow: ["#9370DB", "#8A2BE2", "#6A5ACD", "#483D8B"], // Cool tones
    },
    neutral_light: {
      blush: ["#FFA07A", "#FFB6C1", "#FF82AB", "#F08080"], // Peach-Pink mix
      contour: ["#A9A9A9", "#C0C0C0", "#808080", "#708090"], // Neutral taupes
      highlighter: ["#FFFAF0", "#F5F5DC", "#FAF0E6", "#FFF8DC"], // Neutral lights
      eyeshadow: ["#D8BFD8", "#DDA0DD", "#BA55D3", "#9932CC"], // Mauves
    },
    // Add medium/dark variations following same pattern...
  };

  const baseKey = `${skin_tone}_${shade}`;
  let palette = makeupDatabase[baseKey] || makeupDatabase["neutral_light"];

  // Enhance with hair color influence
  if (hair) {
    const hairColor = chroma(hair.rgb);
    const influence = hair.tone === "warm" ? 0.15 : 0.1;

    palette = {
      blush: palette.blush.map((c) => chroma.mix(c, hairColor, influence * 0.8, "lab").hex()),
      contour: palette.contour.map((c) => chroma.mix(c, hairColor, influence * 0.5, "lab").hex()),
      highlighter: palette.highlighter.map((c) => chroma.mix(c, hairColor, influence * 0.3, "lab").hex()),
      eyeshadow: palette.eyeshadow.map((c) => chroma.mix(c, hairColor, influence, "lab").hex()),
    };
  }

  return palette;
}

function getEyeMakeupColors(skin_tone: SkinInput["tone"], shade: SkinInput["shade"], undertone: SkinInput["undertone"], hair?: HairInput): string[] {
  // Universal balanced palette with 5 carefully curated shades for each combination
  const map: Record<string, string[]> = {
    // WARM TONES
    warm_light: [
      "#FFD166", // Vibrant gold (accent)
      "#CC8B65", // Warm terracotta (crease)
      "#F4A261", // Sandy brown (transition)
      "#E76F51", // Coral (pop of color)
      "#2A9D8F", // Teal (contrast - cool/warm balance)
    ],
    warm_medium: [
      "#E9C46A", // Honey gold
      "#BC6C25", // Rich copper
      "#D68C45", // Amber
      "#A63A50", // Raspberry
      "#287271", // Deep aqua
    ],
    warm_dark: [
      "#F4A261", // Bronze
      "#A9714B", // Spiced brown
      "#E76F51", // Burnt orange
      "#8338EC", // Electric purple
      "#2EC4B6", // Tiffany blue
    ],

    // COOL TONES
    cool_light: [
      "#B388EB", // Soft lilac (lid)
      "#82B4D6", // Cool sky blue (highlight)
      "#D8A7A9", // Dusty rose (blend)
      "#7FDBFF", // Icy blue (inner corner)
      "#FF9F1C", // Warm gold (accent - balances coolness)
    ],
    cool_medium: [
      "#9B5DE5", // Royal purple
      "#6E44FF", // Electric indigo
      "#EFC7C2", // Blush pink
      "#00BBF9", // Cobalt
      "#F15BB5", // Hot pink
    ],
    cool_dark: [
      "#7209B7", // Deep violet
      "#3A86FF", // Bright blue
      "#FF006E", // Magenta
      "#8338EC", // Neon purple
      "#FFBE0B", // Gold (contrast)
    ],

    // NEUTRAL TONES (works with warm or cool)
    neutral_light: [
      "#C77DFF", // Lavender
      "#94D2BD", // Seafoam
      "#FFD60A", // Lemon
      "#FF9E00", // Mango
      "#9C6644", // Taupe
    ],
    neutral_medium: [
      "#E09F3E", // Amber
      "#9E2A2B", // Brick
      "#335C67", // Slate
      "#FFF3B0", // Butter
      "#7B2CBF", // Purple
    ],
    neutral_dark: [
      "#5E503F", // Coffee
      "#BB3E03", // Rust
      "#CA6702", // Pumpkin
      "#001219", // Navy
      "#E9D8A6", // Cream
    ],
  };

  let palette = map[`${skin_tone}_${shade}`] || map["neutral_medium"];

  // Adjust based on hair color if present
  if (hair) {
    const hairColor = chroma(hair.rgb);
    return palette.map((color) => {
      const mixAmount = hair.shade === "dark" ? 0.15 : 0.1;
      return hair.tone === "warm" ? chroma.mix(color, hairColor, mixAmount, "lab").hex() : color; // Keep cool tones pure
    });
  }

  return palette;
}

function getClothingColors(base: chroma.Color, shade: SkinInput["shade"], tone: SkinInput["tone"], undertone: SkinInput["undertone"], hair?: HairInput): string[] {
  // Enhanced base adjustment
  const baseValue = base.get("hsl.l");
  const baseAdjustment = baseValue > 0.7 ? 0.6 : baseValue > 0.5 ? 0.4 : 0.2;
  const darkerBase = base.darken(baseAdjustment);
  const baseHue = darkerBase.get("hsl.h");

  // More nuanced tone adjustments
  const hueShift = tone === "warm" ? 20 : tone === "cool" ? -20 : 0;
  const satBoost = undertone === "golden" ? 1.25 : undertone === "olive" ? 1.15 : undertone === "pink" ? 1.1 : 1.05;

  // Dynamic brightening based on contrast needs
  const brightenAmount = shade === "light" ? (baseValue > 0.7 ? 0.6 : 0.8) : baseValue > 0.4 ? 0.4 : 0.2;

  // Enhanced color palette with better variety
  const colors = [
    // Main color - enhanced skin tone
    darkerBase
      .set("hsl.h", (baseHue + hueShift + 360) % 360)
      .saturate(satBoost * 1.1)
      .brighten(brightenAmount),

    // Complementary color with more pop
    darkerBase
      .set("hsl.h", (baseHue + 150 + hueShift + 360) % 360) // 150° for split complement
      .saturate(satBoost * 1.3)
      .brighten(brightenAmount * 0.9),

    // Triadic color 1
    darkerBase.set("hsl.h", (baseHue + 60 + hueShift + 360) % 360).saturate(satBoost * 1.2),

    // Triadic color 2
    darkerBase
      .set("hsl.h", (baseHue + 300 + hueShift + 360) % 360)
      .saturate(satBoost * 1.1)
      .brighten(brightenAmount * 0.7),

    // Neutral with undertone influence
    darkerBase
      .desaturate(0.5)
      .set("hsl.h", (baseHue + (undertone === "golden" ? 10 : -10) + 360) % 360)
      .brighten(brightenAmount * 0.6),

    // Accent color with more drama
    darkerBase
      .set("hsl.h", (baseHue + 200 + hueShift + 360) % 360) // Tetradic position
      .saturate(satBoost * 1.4)
      .brighten(brightenAmount * 0.8),
  ];

  // Enhanced hair color integration
  let hexColors = colors.map((c) => c.hex());
  if (hair) {
    const hairColor = chroma(hair.rgb);
    const hairInfluence = hair.tone === "warm" ? (hair.shade === "dark" ? 0.2 : 0.15) : hair.shade === "dark" ? 0.1 : 0.05;

    hexColors = hexColors.map((c, i) => {
      // Apply different influence to different color roles
      const influence =
        i === 0
          ? hairInfluence * 0.8 // less on main color
          : i === 4
          ? hairInfluence * 0.5 // least on neutral
          : hairInfluence;
      return chroma.mix(c, hairColor, influence, "lab").hex();
    });
  }

  return hexColors;
}
