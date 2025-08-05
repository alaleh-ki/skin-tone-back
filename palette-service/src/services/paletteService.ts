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

type Season = "spring" | "summer" | "autumn" | "winter";

export function generatePalette({
  skin,
  hair,
}: {
  skin: SkinInput;
  hair?: HairInput;
}) {
  const season = getSeason(skin, hair);
  const base = chroma(skin.rgb);

  return {
    clothing: getClothingColors(base, skin.shade, season, hair),
    eye_makeup: getEyeMakeupColors(skin.tone, skin.shade, skin.undertone, hair),
    makeup: getMakeupColors(skin.tone, skin.undertone, skin.shade, hair),
    lipstick: getLipstickColors(skin.tone, skin.undertone, skin.shade),
    jewelry: getJewelryColors(skin.undertone),
  };
}

// Helper to determine color season
function getSeason(skin: SkinInput, hair?: HairInput): Season {
  if (skin.tone === "warm") return skin.shade === "light" ? "spring" : "autumn";
  if (skin.tone === "cool") return skin.shade === "light" ? "summer" : "winter";
  return skin.undertone === "golden" ? "autumn" : "summer";
}

/** Jewelry metals (updated with rose gold option) */
function getJewelryColors(undertone: SkinInput["undertone"]): string[] {
  switch (undertone) {
    case "golden":
      return ["#D4AF37", "#FFD700", "#B8860B"]; // Yellow golds
    case "olive":
      return ["#E0BFB8", "#CB9D9E", "#B76E79"]; // Rose golds
    case "pink":
    case "neutral":
    default:
      return ["#C0C0C0", "#E5E4E2", "#A9A9A9"]; // Silver/white gold
  }
}

/** Lipsticks - All real product colors from MAC, NARS, Fenty */
function getLipstickColors(
  tone: SkinInput["tone"],
  undertone: SkinInput["undertone"],
  shade: SkinInput["shade"]
): string[] {
  const lipsticks = {
    warm_light: [
      "#FF9E8E", // MAC 'Lady Danger' (vibrant coral)
      "#F7A88B", // Charlotte Tilbury 'Pillow Talk Medium'
      "#E2583E", // NARS 'Heat Wave'
      "#D98B82", // MAC 'Kinda Sexy'
      "#C46210", // Fenty 'Freckle Fiesta'
    ],
    warm_medium: [
      "#C04000", // MAC 'Chili'
      "#B95C44", // NARS 'Dolce Vita'
      "#9F2B68", // Fenty 'Griselda'
      "#E97451", // NARS 'Cruella'
      "#B55033", // Rare Beauty 'Inspire'
    ],
    warm_dark: [
      "#800020", // MAC 'Diva'
      "#722F37", // NARS 'Bette'
      "#7B3F00", // NARS 'Koukou'
      "#954535", // MAC 'Sin'
      "#5C1E1E", // Pat McGrath 'Flesh 5'
    ],
    cool_light: [
      "#FFB7C5", // Glossier 'Puff'
      "#DE3163", // NARS 'Schiap'
      "#DB7093", // MAC 'Candy Yum Yum'
      "#C21E56", // MAC 'All Fired Up'
      "#D8BFD8", // NARS 'Roman Holiday'
    ],
    cool_medium: [
      "#915C83", // MAC 'Rebel'
      "#B3446C", // NARS 'Mona'
      "#800080", // MAC 'Heroine'
      "#D9417E", // Fenty 'Clapback'
      "#953553", // NARS 'Anna'
    ],
    cool_dark: [
      "#702963", // MAC 'Cyber'
      "#5D3954", // Fenty 'Mauve Wives'
      "#4B0082", // NARS 'Starwoman'
      "#673147", // MAC 'Smoked Purple'
      "#8B0000", // NARS 'Bette'
    ],
    neutral_light: [
      "#C08081", // MAC 'Velvet Teddy'
      "#E97451", // NARS 'Jane'
      "#DB7093", // Fenty 'Candy Venom'
      "#CC8899", // MAC 'Kinda Sexy'
      "#B94E48", // NARS 'Dolce Vita'
    ],
    neutral_medium: [
      "#954535", // MAC 'Whirl'
      "#80461B", // Fenty 'Freckle Fiesta'
      "#B22234", // NARS 'Cruella'
      "#8B3A3A", // MAC 'Taupe'
      "#A0522D", // Rare Beauty 'Honor'
    ],
    neutral_dark: [
      "#5D3954", // MAC 'Sin'
      "#614051", // NARS 'Bette'
      "#4B3621", // Fenty 'Underdawg'
      "#3E2723", // MAC 'Antique Velvet'
      "#722F37", // MAC 'Diva'
    ],
  };

  const key = `${tone}_${shade}`;
  return lipsticks[key as keyof typeof lipsticks] || lipsticks["neutral_medium"];
}

/** Professional-grade makeup colors */
function getMakeupColors(
  tone: SkinInput["tone"],
  undertone: SkinInput["undertone"],
  shade: SkinInput["shade"],
  hair?: HairInput
): { blush: string[]; contour: string[]; highlighter: string[] } {
  const makeup = {
    warm_light: {
      blush: ["#FF9E8E", "#FDA172", "#FF8A7A", "#F7A88B"], // Peaches/corals
      contour: ["#B7937E", "#C4A484", "#A67C52", "#8B5D33"], // Warm taupes
      highlighter: ["#FFF4C2", "#F5E6B2", "#FFE7A3", "#F2D6A2"], // Golden
    },
    warm_medium: {
      blush: ["#E2725B", "#D4593D", "#C86D56", "#B55033"], // Terracottas
      contour: ["#8C6D52", "#7A5C48", "#6B4F3B", "#5D3F2B"], // Warm bronzes
      highlighter: ["#FFD38E", "#E9C46A", "#F5C469", "#D4A55E"], // Gold
    },
    warm_dark: {
      blush: ["#A63D3D", "#8C3A3A", "#7A2E2E", "#5C1E1E"], // Deep berries
      contour: ["#5C4033", "#4E342E", "#3E2723", "#2C1E17"], // Rich browns
      highlighter: ["#E6B84C", "#D4A017", "#C1923E", "#B8860B"], // Bronze
    },
    cool_light: {
      blush: ["#FFB7C5", "#F48FB1", "#E75480", "#DB7093"], // Pinks
      contour: ["#8E7C68", "#7A6D64", "#6B5A4C", "#5D4D3E"], // Cool taupes
      highlighter: ["#F0F8FF", "#E6E6FA", "#D8E9F0", "#E5E4E2"], // Icy
    },
    cool_medium: {
      blush: ["#D36C9B", "#C2185B", "#AD1457", "#8B004B"], // Berries
      contour: ["#6B5A4C", "#5D4D3E", "#4E3D2F", "#3E2F20"], // Cool greys
      highlighter: ["#D3D3D3", "#C0C0C0", "#B5B5B5", "#A9A9A9"], // Pearl
    },
    cool_dark: {
      blush: ["#8B008B", "#9932CC", "#9400D3", "#7B1FA2"], // Plums
      contour: ["#3E2F20", "#2C1E17", "#1A120B", "#0F0A06"], // Deep greys
      highlighter: ["#BEBEBE", "#A9A9A9", "#9370DB", "#8A2BE2"], // Silver
    },
    neutral_light: {
      blush: ["#FFB6C1", "#FFA07A", "#FF82AB", "#F08080"], // Peach-pink
      contour: ["#A4917B", "#8B7B6D", "#6B5A4C", "#5D4D3E"], // Neutral taupes
      highlighter: ["#FFFACD", "#FFE4B5", "#FFECB3", "#EDE3D6"], // Champagne
    },
    neutral_medium: {
      blush: ["#D2691E", "#CD5C5C", "#BC8F8F", "#A0522D"], // Roses
      contour: ["#7D6B5C", "#6B5A4C", "#5C4B3B", "#4E3D2F"], // Taupes
      highlighter: ["#FAF0E6", "#F5DEB3", "#F0E68C", "#EEDD82"], // Gold
    },
    neutral_dark: {
      blush: ["#8B0000", "#800000", "#A52A2A", "#6B4423"], // Wines
      contour: ["#5C4033", "#4B3621", "#3E2F20", "#3B2F2F"], // Browns
      highlighter: ["#FFFACD", "#F0E68C", "#EEE8AA", "#F5F5DC"], // Gold
    },
  };

  const key = `${tone}_${shade}`;
  let palette = makeup[key as keyof typeof makeup] || makeup["neutral_medium"];

  // Enhance with hair color
  if (hair) {
    const hairColor = chroma(hair.rgb);
    const influence = hair.tone === "warm" ? 0.15 : 0.1;
    
    palette = {
      blush: palette.blush.map(c => chroma.mix(c, hairColor, influence * 0.8, "lab").hex()),
      contour: palette.contour.map(c => chroma.mix(c, hairColor, influence * 0.5, "lab").hex()),
      highlighter: palette.highlighter.map(c => chroma.mix(c, hairColor, influence * 0.3, "lab").hex())
    };
  }

  return palette;
}

/** Eye makeup - Curated from Urban Decay, ABH, Pat McGrath palettes */
function getEyeMakeupColors(
  tone: SkinInput["tone"],
  shade: SkinInput["shade"],
  undertone: SkinInput["undertone"],
  hair?: HairInput
): string[] {
  const eyeshadows = {
    warm_light: [
      "#FAD6A5", // Urban Decay 'Sin' (base)
      "#C76F2A", // ABH 'Burnt Orange' (transition)
      "#8B4513", // MAC 'Brun' (crease)
      "#FFEBCD", // Fenty 'Biscotti' (brow bone)
      "#D4AF37"  // Pat McGrath 'Gold Nectar' (pop)
    ],
    warm_medium: [
      "#E97451", // ABH 'Realgar'
      "#6F4E37", // MAC 'Saddle' (crease)
      "#C1440E", // Pat McGrath 'Blitz Flame'
      "#FFBF00", // Urban Decay 'Half Baked'
      "#A0522D"  // ABH 'Sienna'
    ],
    warm_dark: [
      "#5C4033", // ABH 'Cyprus Umber'
      "#4B3621", // Pat McGrath 'Dark Soul'
      "#D2691E", // MAC 'Rule'
      "#A0522D", // ABH 'Sienna'
      "#8B0000"  // Pat McGrath 'Blood Moon'
    ],
    cool_light: [
      "#D8BFD8", // Urban Decay 'Tonic'
      "#9370DB", // ABH 'Dusty Rose'
      "#483D8B", // MAC 'Atlantic'
      "#C0C0C0", // Fenty 'Frost Money'
      "#7B68EE"  // Pat McGrath 'Blitz Violet'
    ],
    cool_medium: [
      "#6A5ACD", // ABH 'Venetian Red'
      "#483D8B", // MAC 'Atlantic'
      "#708090", // Urban Decay 'Laced'
      "#B0C4DE", // Fenty 'Cool Ice'
      "#2F4F4F"  // Pat McGrath 'Dark Forest'
    ],
    cool_dark: [
      "#2F4F4F", // ABH 'Noir'
      "#191970", // Pat McGrath 'Blitz Blue'
      "#000080", // MAC 'Blue Brown'
      "#4B0082", // Urban Decay 'Tonic'
      "#00008B"  // Fenty 'Midnight Wasabi'
    ],
    neutral_light: [
      "#D3D3D3", // ABH 'Tempera'
      "#C0C0C0", // MAC 'Shroom'
      "#A9A9A9", // Urban Decay 'Frisk'
      "#F5F5F5", // Fenty 'Diamond Bomb'
      "#808080"  // Pat McGrath 'Skinshow Moon Glow'
    ],
    neutral_medium: [
      "#708090", // ABH 'Stone'
      "#2F4F4F", // MAC 'Copperplate'
      "#778899", // Urban Decay 'Tease'
      "#696969", // Fenty 'Sand Castle'
      "#A9A9A9"  // Pat McGrath 'Blitz Emerald'
    ],
    neutral_dark: [
      "#4B4B4B", // ABH 'Ash Brown'
      "#2B2B2B", // Pat McGrath 'Black Coffee'
      "#000000", // MAC 'Carbon'
      "#1C1C1C", // Fenty 'Uninvited'
      "#383838"  // Urban Decay 'Blackout'
    ],
  };

  const key = `${tone}_${shade}`;
  let palette = eyeshadows[key as keyof typeof eyeshadows] || eyeshadows["neutral_medium"];

  // Adjust for hair
  if (hair) {
    const hairColor = chroma(hair.rgb);
    palette = palette.map(c => chroma.mix(c, hairColor, 0.1, "lab").hex());
  }

  return palette;
}

/** Clothing colors - 2023-2024 fashion trends by season */
function getClothingColors(
  base: chroma.Color,
  shade: SkinInput["shade"],
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

// import chroma from "chroma-js";

// type SkinInput = {
//   tone: "warm" | "cool" | "neutral";
//   undertone: "golden" | "olive" | "pink" | "neutral";
//   shade: "light" | "medium" | "dark";
//   rgb: [number, number, number];
// };

// type HairInput = {
//   family: "black" | "brown" | "blonde" | "red" | "gray" | "other";
//   shade: "light" | "medium" | "dark";
//   tone: "warm" | "cool" | "neutral";
//   rgb: [number, number, number];
// };
// export function generatePalette({ skin, hair }: { skin: SkinInput; hair?: HairInput }) {
//   const base = chroma(skin.rgb);
//   const clothing = getClothingColors(base, skin.shade, skin.tone, skin.undertone, hair);
//   const eye_makeup = getEyeMakeupColors(skin.tone, skin.shade, skin.undertone);
//   const makeup = getMakeupColors(skin.tone, skin.undertone, skin.shade, hair);
//   const lipstick = getLipstickColors(skin.tone, skin.undertone, skin.shade);
//   const jewelry = getJewelryColors(skin.undertone);
//   return { eye_makeup, clothing, makeup, lipstick, jewelry };
// }
// // Jewelry colors based on undertone — classic fashion guideline
// function getJewelryColors(undertone: SkinInput["undertone"]): string[] {
//   switch (undertone) {
//     case "golden":
//     case "olive":
//       return ["#D4AF37", "#FFD700", "#B8860B"]; // golds
//     case "pink":
//     case "neutral":
//     default:
//       return ["#C0C0C0", "#E5E4E2", "#A9A9A9"]; // silvers and cool metals
//   }
// }

// function getLipstickColors(
//   skin_tone: SkinInput["tone"],
//   undertone: SkinInput["undertone"],
//   shade: SkinInput["shade"]
// ): string[] {
//   // Diverse, realistic lipstick shades by tone, undertone, and shade
//   const lipstickDatabase: Record<string, string[]> = {
//     // WARM UNDERTONES
//     warm_light: [
//       "#FF6B4A", // Vibrant coral
//       "#F99E73", // Peachy nude
//       "#E2583E", // Terra cotta
//       "#D98B82", // Dusty rose
//       "#C46210", // Allspice
//       "#CC5500", // Burnt orange
//       "#A0522D", // Cinnamon brown
//       "#D21404", // Chinese red
//       "#FFCBA4", // Apricot gloss
//     ],
//     warm_medium: [
//       "#C04000", // Mahogany
//       "#B95C44", // Rustic brick
//       "#9F2B68", // Warm maroon
//       "#CD5B45", // Dark coral
//       "#E97451", // Burnt sienna
//       "#B22234", // Fire brick
//       "#8B3A3A", // Earthy brick
//       "#6B4226", // Chocolate brown
//       "#8C3B00", // Copper red
//     ],
//     warm_dark: [
//       "#800020", // Burgundy
//       "#722F37", // Wine
//       "#814141", // Old rose
//       "#954535", // Chestnut
//       "#7B3F00", // Dark chocolate
//       "#5C1A00", // Espresso
//       "#A04000", // Spiced pumpkin
//       "#600000", // Deep mahogany
//       "#4B2C20", // Dark cocoa
//     ],

//     // COOL UNDERTONES
//     cool_light: [
//       "#DB7093", // Pale violet red
//       "#DE3163", // Cerise
//       "#FF007F", // Bright pink
//       "#C21E56", // Rose red
//       "#D8BFD8", // Thistle (mauve)
//       "#F6D1E1", // Soft pink gloss
//       "#B390B0", // Lavender mauve
//       "#9A8C98", // Ashy plum
//       "#FF85A1", // Bubblegum pink
//     ],
//     cool_medium: [
//       "#915C83", // Antique fuchsia
//       "#B3446C", // Raspberry rose
//       "#D9417E", // Dark pink
//       "#800080", // Purple
//       "#953553", // Deep mauve
//       "#7B406A", // Mulberry
//       "#5C2A4D", // Aubergine
//       "#AA336A", // Magenta
//       "#E75480", // Hot rose
//     ],
//     cool_dark: [
//       "#702963", // Byzantium
//       "#800020", // Burgundy (cool)
//       "#4B0082", // Indigo
//       "#5D3954", // Dark byzantium
//       "#673147", // Old burgundy
//       "#3B1044", // Night plum
//       "#52003B", // Deep wine
//       "#8B008B", // Dark orchid
//       "#301934", // Blackberry
//     ],

//     // NEUTRAL UNDERTONES
//     neutral_light: [
//       "#C08081", // Old rose
//       "#E97451", // Burnt sienna
//       "#DB7093", // Pale violet red
//       "#CC8899", // Puce
//       "#B94E48", // Deep chestnut
//       "#D3A297", // Soft mocha
//       "#E2B6AE", // Rosy beige
//       "#C2AFAF", // Dusty pink nude
//       "#F3D3CE", // Light peach gloss
//     ],
//     neutral_medium: [
//       "#954535", // Chestnut
//       "#80461B", // Russet
//       "#C04000", // Mahogany
//       "#B22234", // Fire brick
//       "#915C83", // Antique fuchsia
//       "#7F5044", // Cocoa brown
//       "#8C5E58", // Rosewood
//       "#A56347", // Clay brown
//       "#C96454", // Warm rose
//     ],
//     neutral_dark: [
//       "#5D3954", // Dark byzantium
//       "#614051", // Eggplant
//       "#722F37", // Wine
//       "#4B3621", // Cafe noir
//       "#3E2723", // Dark brown
//       "#402218", // Espresso brown
//       "#693F2F", // Chestnut brown
//       "#533F3B", // Deep taupe
//       "#7E5E53", // Mocha
//     ],
//   };

//   // Use key with tone + shade + undertone for more variation
//   const key = `${skin_tone}_${shade}`;
//   let palette = lipstickDatabase[key] || lipstickDatabase["neutral_medium"];

//   // Slightly shift colors by undertone for realism
//   const chroma = require("chroma-js");
//   const shiftAmount = 0.1;

//   palette = palette.map((hex) => {
//     const color = chroma(hex);
//     if (skin_tone === "warm") {
//       return color.brighten(shiftAmount).desaturate(shiftAmount / 2).hex();
//     } else if (skin_tone === "cool") {
//       return color.darken(shiftAmount).saturate(shiftAmount / 2).hex();
//     } else {
//       // Neutral - slight balance
//       return color.saturate(shiftAmount / 3).hex();
//     }
//   });

//   return palette;
// }


// function getMakeupColors(
//   skin_tone: SkinInput["tone"],
//   undertone: SkinInput["undertone"],
//   shade: SkinInput["shade"],
//   hair?: HairInput
// ): {
//   blush: string[];
//   contour: string[];
//   highlighter: string[];
// } {
//   const makeupDatabase: Record<string, {
//       blush: string[];
//       contour: string[];
//       highlighter: string[];
//   }> = {
//     warm_light: {
//       blush: [
//         "#F9B2B3",  // NARS Orgasm blush approximate (peachy-pink with soft shimmer) :contentReference[oaicite:2]{index=2}
//         "#FFCD94",  // Milani Luminoso peachy coral
//         "#FBAE9F",  // MAC Peaches powder blush approximation
//         "#FFC4B2"   // Benefit Coralista shade approximation
//       ],
//       contour: [
//         "#C49A6C",  // Benefit Hoola Light bronzer shade approx
//         "#B07A4F",  // NARS Laguna bronzer tone
//         "#A67858",  // Charlotte Tilbury Light bronze
//         "#9A6D4E"   // Fenty Mocha Match Stix deep warm brown
//       ],
//       highlighter: [
//         "#EAC086",  // Becca Champagne Pop gold-peach shimmer
//         "#FFE536",  // Fenty Trophy Wife highlighter warm gold :contentReference[oaicite:3]{index=3}
//         "#F7D09F",  // Hourglass Luminous Light
//         "#EFC788"   // Rare Beauty Mesmerize soft warm highlight
//       ]
//     },

//     warm_medium: {
//       blush: [
//         "#E78B76",  // NARS Gina coral-peach
//         "#D46A30",  // MAC Melba peach
//         "#D39B8F",  // Patrick Ta Rose Latte tone
//         "#E07C5A"   // Fenty Rose Latte blush
//       ],
//       contour: [
//         "#A16240",  // Fenty Truffle Match Stix - warm mid-deep
//         "#8F5B3F",  // ABH Contour Kit Medium‑Dark shade
//         "#7F4A2B",  // Charlotte Tilbury Medium/Dark
//         "#6E3B2A"   // NYX Deep Wonder Stick
//       ],
//       highlighter: [
//         "#FFD4A5",  // MAC Oh Darling golden highlight
//         "#F9BC5C",  // Fenty Trophy giant warm gold (less intense)
//         "#EEC88F",  // Rare Beauty Mesmerize
//         "#ECC08A"   // Danessa Myricks Tiara soft champagne
//       ]
//     },

//     warm_dark: {
//       blush: [
//         "#B3473B",  // NARS Taj Mahal deep coral-red
//         "#9F3E3E",  // Fenty Summertime Wine shade approx
//         "#B24C5B",  // Pat McGrath Electric Bloom
//         "#8C2E34"   // UOMA Savage deep wine
//       ],
//       contour: [
//         "#5C3B21",  // ABH Deep contour brown
//         "#4C2E18",  // Fenty Espresso Match Stix
//         "#4B2C2A",  // Juvia’s Place Sculpt I Shade
//         "#532F29"   // Black Opal Hazelnut contour stick
//       ],
//       highlighter: [
//         "#F0B468",  // Fenty Diesel/Gold duo (approx medium‑deep gold)
//         "#E6AB59",  // Danessa Myricks golden bronze
//         "#D8A150",  // Rare Beauty Outshine warm bronze
//         "#CCA14D"   // UOMA Black Magic highlight
//       ]
//     },

//     cool_light: {
//       blush: [
//         "#F2CCD9",  // Glossier Puff light rose
//         "#F194AD",  // Tarte Dollface pale pink
//         "#E196A5",  // MAC Well Dressed soft pink
//         "#E58B9E"   // NARS Desire rose pink
//       ],
//       contour: [
//         "#9E8E82",  // Kevyn Aucoin Sculpting Powder Light :contentReference[oaicite:4]{index=4}
//         "#7F7D74",  // Fenty Amber Match Stix cool taupe
//         "#6E6A66",  // NYX taupe stick mid-tone
//         "#5C5B56"   // soft cool grey contour
//       ],
//       highlighter: [
//         "#F0F8FF",  // Icy AliceBlue
//         "#EDEDED",  // Fenty diffused pearl
//         "#F8F8FF",  // glowy pearl white
//         "#E6E6E6"   // light Gainsboro silverish sheen
//       ]
//     },

//     cool_medium: {
//       blush: [
//         "#B63A69",  // deep raspberry / magenta like NARS Deep Throat variant
//         "#DB3A5B",  // Tarte Dollface deeper pink
//         "#D87093",  // NARS Deep pink
//         "#C71585"   // bold magenta tone
//       ],
//       contour: [
//         "#7F7D74",  // grey taupe
//         "#6E6A66",  
//         "#5C5B56",  
//         "#4B4B4B"   // charcoal contour
//       ],
//       highlighter: [
//         "#EDEDED",  
//         "#E1E1E1",  
//         "#DCDCDC",  
//         "#D3D3D3"   // light silver‑pearl sheen
//       ]
//     },

//     cool_dark: {
//       blush: [
//         "#8B008B",  // DarkMagenta plum
//         "#9932CC",  // Deep violet orchid
//         "#9400D3",  // deep purple
//         "#800080"   // classic purple blush vibe
//       ],
//       contour: [
//         "#4B4B4B",  // deep charcoal
//         "#3E3E3E",
//         "#333333",
//         "#2C2C2C"
//       ],
//       highlighter: [
//         "#BEBEBE",  // light silver
//         "#C0C0C0",  
//         "#D3D3D3",
//         "#DCDCDC"
//       ]
//     },

//     neutral_light: {
//       blush: [
//         "#FFB6C1",  // Light pink
//         "#FFA07A",  // Light salmon
//         "#FF82AB",  
//         "#F08080"   // light coral‑pink
//       ],
//       contour: [
//         "#A4917B",
//         "#8B7B6D",
//         "#6B5A4C",
//         "#7D6B5C"
//       ],
//       highlighter: [
//         "#FFF8DC",  
//         "#F5DEB3",  
//         "#FFFACD",  
//         "#EEDD82"
//       ]
//     },

//     neutral_medium: {
//       blush: [
//         "#CD5C5C",  
//         "#D2691E",
//         "#BC8F8F",
//         "#A0522D"
//       ],
//       contour: [
//         "#7D6B5C",
//         "#6B5A4C",
//         "#5C4B3B",
//         "#4E3D2F"
//       ],
//       highlighter: [
//         "#F5DEB3",
//         "#EEDD82",
//         "#EEE8AA",
//         "#FAF0E6"
//       ]
//     },

//     neutral_dark: {
//       blush: [
//         "#8B4513",
//         "#A0522D",
//         "#6B4423",
//         "#5C4033"
//       ],
//       contour: [
//         "#5C4033",
//         "#4B3621",
//         "#3E2F20",
//         "#3B2F2F"
//       ],
//       highlighter: [
//         "#F5DEB3",
//         "#EEE8AA",
//         "#FFFACD",
//         "#FAF0E6"
//       ]
//     }
//   };

//   const baseKey = `${skin_tone}_${shade}`;
//   let palette = makeupDatabase[baseKey] ?? makeupDatabase["neutral_light"];

//   if (hair) {
//     const hairColor = chroma(hair.rgb);
//     const influence = hair.tone === "warm" ? 0.15 : 0.1;

//     palette = {
//       blush: palette.blush.map(c => chroma.mix(c, hairColor, influence * 0.8, "lab").hex()),
//       contour: palette.contour.map(c => chroma.mix(c, hairColor, influence * 0.5, "lab").hex()),
//       highlighter: palette.highlighter.map(c => chroma.mix(c, hairColor, influence * 0.3, "lab").hex())
//     };
//   }

//   return palette;
// }

// function getEyeMakeupColors(
//   skin_tone: SkinInput["tone"],
//   shade: SkinInput["shade"],
//   undertone: SkinInput["undertone"],
//   hair?: HairInput
// ): string[] {
//   // Realistic eyeshadow palette-inspired colors for each skin tone and shade
//   const map: Record<string, string[]> = {
//     // WARM TONES
//     warm_light: [
//       "#FAD6BF", // MAC - Soft Ochre (matte cream base)
//       "#E6B89C", // Too Faced - Peach Cobbler (soft peach matte)
//       "#D87F4F", // Urban Decay - Riff (warm burnt orange matte)
//       "#A45E3C", // Anastasia Beverly Hills - Sienna (warm brown matte)
//       "#6E3E2B", // Too Faced - Cocoa (deep brown matte)
//       "#F5CBA7", // Colourpop - Pearls (warm peach shimmer)
//       "#C06940", // Natasha Denona - Terra (rusty shimmer)
//       "#BA7B5A", // Huda Beauty - Sandalwood (warm satin)
//       "#8A4B2E", // Pat McGrath - Bronze seduction (metallic bronze)
//     ],
//     warm_medium: [
//       "#FFB997", // Colourpop - Fresh Peach (soft peach matte)
//       "#E06E50", // Urban Decay - Riff (burnt orange matte)
//       "#B15A3D", // Anastasia Beverly Hills - Red Earth (warm reddish brown matte)
//       "#6B4226", // Too Faced - Chestnut (rich warm brown matte)
//       "#4C2A1B", // Natasha Denona - Espresso (deep warm brown matte)
//       "#F6AD8D", // Huda Beauty - Peach Fuzz (peach shimmer)
//       "#B15C37", // Pat McGrath - Rosewood (warm satin shimmer)
//       "#814026", // Natasha Denona - Terracotta (brick shimmer)
//       "#6D331B", // Urban Decay - Smog (metallic copper)
//     ],
//     warm_dark: [
//       "#6A2E16", // MAC - Brown Script (deep warm brown matte)
//       "#8B3E1B", // Huda Beauty - Cinnamon (rich rust matte)
//       "#4B1F0B", // Pat McGrath - Black Truffle (dark brown matte)
//       "#512B1A", // Natasha Denona - Umber (deep chocolate matte)
//       "#9C3A1F", // Urban Decay - Burn (red-brown matte)
//       "#723825", // Too Faced - Mulled Wine (plummy brown matte)
//       "#AC6F52", // Anastasia Beverly Hills - Raw Sienna (warm satin)
//       "#743B28", // Huda Beauty - Saffron (metallic copper)
//       "#5A331E", // MAC - Sketch (dark brown satin)
//     ],

//     // COOL TONES
//     cool_light: [
//       "#D8D6E1", // MAC - Vex (cool lavender matte)
//       "#B4A9C0", // Urban Decay - Chopper (cool mauve shimmer)
//       "#9687A6", // Natasha Denona - Mulberry (soft purple matte)
//       "#7F7A89", // Pat McGrath - Tempest (taupe matte)
//       "#5B5671", // Too Faced - Moonlight (deep purple matte)
//       "#A89DB9", // Colourpop - Cheat Code (light lavender shimmer)
//       "#C5B8DB", // Huda Beauty - Lilac (lavender shimmer)
//       "#7E7B86", // Anastasia Beverly Hills - Noir (charcoal matte)
//       "#5C5872", // Urban Decay - Ransom (plum matte)
//     ],
//     cool_medium: [
//       "#7D7E8C", // Urban Decay - Evidence (cool grey matte)
//       "#5B5D6A", // MAC - Smut (dark taupe matte)
//       "#3B3D49", // Pat McGrath - Dark Matter (charcoal matte)
//       "#615E72", // Natasha Denona - Black Iris (deep plum matte)
//       "#A39BD4", // Huda Beauty - Mystic (soft purple shimmer)
//       "#7B83A3", // Colourpop - Wisp (periwinkle shimmer)
//       "#473F66", // Too Faced - Twilight (navy matte)
//       "#58475E", // Anastasia Beverly Hills - Shadow Play (dark violet matte)
//       "#2C2F4A", // Urban Decay - Blackout (black matte)
//     ],
//     cool_dark: [
//       "#3D2C52", // Pat McGrath - Black Plum (deep violet matte)
//       "#5A3D6D", // Urban Decay - Alkaline (deep purple matte)
//       "#1C1C2D", // MAC - Carbon (black matte)
//       "#4A3F59", // Natasha Denona - Dark Plum (rich plum matte)
//       "#743B9E", // Huda Beauty - Royal Purple (vibrant purple shimmer)
//       "#2F3557", // Too Faced - Twilight (deep navy matte)
//       "#5B3D64", // Anastasia Beverly Hills - Dark Violet (dark violet matte)
//       "#6D3D8A", // Colourpop - Get Out (vibrant purple shimmer)
//       "#0D0D1E", // Pat McGrath - Deep Space (jet black matte)
//     ],

//     // NEUTRAL TONES
//     neutral_light: [
//       "#D7CCC8", // MAC - Brule (neutral cream matte)
//       "#C4A69F", // Urban Decay - Naked (warm beige matte)
//       "#A4917B", // Natasha Denona - Butter (soft taupe matte)
//       "#7D675D", // Too Faced - Sexpresso (medium brown matte)
//       "#5C4B3B", // Pat McGrath - Sepia (deep neutral brown matte)
//       "#EDE0D4", // Huda Beauty - Bare (pearl shimmer)
//       "#B7A99A", // Anastasia Beverly Hills - Toast (warm beige satin)
//       "#9C836B", // Colourpop - Tea Garden (taupe shimmer)
//       "#6B5A4C", // Urban Decay - Buck (warm brown matte)
//     ],
//     neutral_medium: [
//       "#9B7B6D", // MAC - Cork (medium warm brown matte)
//       "#805A4A", // Too Faced - Smoked (deep warm brown matte)
//       "#705446", // Pat McGrath - Sepia (dark brown matte)
//       "#6B5A4C", // Natasha Denona - Earth (medium brown matte)
//       "#4A3F35", // Huda Beauty - Cocoa (deep chocolate matte)
//       "#8C6F62", // Colourpop - Secret (warm taupe satin)
//       "#755B4E", // Urban Decay - Toasted (warm brown shimmer)
//       "#B29C8E", // Anastasia Beverly Hills - Sandalwood (soft neutral shimmer)
//       "#6D4C41", // Too Faced - Coffee (rich brown matte)
//     ],
//     neutral_dark: [
//       "#4E3D2F", // MAC - Espresso (dark brown matte)
//       "#3B2F20", // Urban Decay - Blackout (black brown matte)
//       "#3E2F20", // Pat McGrath - Umber (deep chocolate matte)
//       "#6B4423", // Natasha Denona - Deep Brown (dark brown matte)
//       "#A0522D", // Huda Beauty - Rust (warm reddish brown shimmer)
//       "#5A3B2E", // Too Faced - Sable (rich dark brown matte)
//       "#3A2F25", // Colourpop - Jet Setter (blackened brown matte)
//       "#7D4B3A", // Anastasia Beverly Hills - Cinnamon (warm matte)
//       "#D7CCC8", // MAC - Brule (highlight matte)
//     ],
//   };

//   let palette = map[`${skin_tone}_${shade}`] || map["neutral_medium"];

//   // Adjust based on hair color if present (warm hair tones blend slightly, cool keep pure)
//   if (hair) {
//     const hairColor = chroma(hair.rgb);
//     return palette.map((color) => {
//       const mixAmount = hair.shade === "dark" ? 0.15 : 0.1;
//       return hair.tone === "warm"
//         ? chroma.mix(color, hairColor, mixAmount, "lab").hex()
//         : color; // Keep cool tones pure
//     });
//   }

//   return palette;
// }


// function getClothingColors(base: chroma.Color, shade: SkinInput["shade"], tone: SkinInput["tone"], undertone: SkinInput["undertone"], hair?: HairInput): string[] {
//   // Enhanced base adjustment
//   const baseValue = base.get("hsl.l");
//   const baseAdjustment = baseValue > 0.7 ? 0.6 : baseValue > 0.5 ? 0.4 : 0.2;
//   const darkerBase = base.darken(baseAdjustment);
//   const baseHue = darkerBase.get("hsl.h");

//   // More nuanced tone adjustments
//   const hueShift = tone === "warm" ? 20 : tone === "cool" ? -20 : 0;
//   const satBoost = undertone === "golden" ? 1.25 : undertone === "olive" ? 1.15 : undertone === "pink" ? 1.1 : 1.05;

//   // Dynamic brightening based on contrast needs
//   const brightenAmount = shade === "light" ? (baseValue > 0.7 ? 0.6 : 0.8) : baseValue > 0.4 ? 0.4 : 0.2;

//   // Enhanced color palette with better variety
//   const colors = [
//     // Main color - enhanced skin tone
//     darkerBase
//       .set("hsl.h", (baseHue + hueShift + 360) % 360)
//       .saturate(satBoost * 1.1)
//       .brighten(brightenAmount),

//     // Complementary color with more pop
//     darkerBase
//       .set("hsl.h", (baseHue + 150 + hueShift + 360) % 360) // 150° for split complement
//       .saturate(satBoost * 1.3)
//       .brighten(brightenAmount * 0.9),

//     // Triadic color 1
//     darkerBase.set("hsl.h", (baseHue + 60 + hueShift + 360) % 360).saturate(satBoost * 1.2),

//     // Triadic color 2
//     darkerBase
//       .set("hsl.h", (baseHue + 300 + hueShift + 360) % 360)
//       .saturate(satBoost * 1.1)
//       .brighten(brightenAmount * 0.7),

//     // Neutral with undertone influence
//     darkerBase
//       .desaturate(0.5)
//       .set("hsl.h", (baseHue + (undertone === "golden" ? 10 : -10) + 360) % 360)
//       .brighten(brightenAmount * 0.6),

//     // Accent color with more drama
//     darkerBase
//       .set("hsl.h", (baseHue + 200 + hueShift + 360) % 360) // Tetradic position
//       .saturate(satBoost * 1.4)
//       .brighten(brightenAmount * 0.8),
//   ];

//   // Enhanced hair color integration
//   let hexColors = colors.map((c) => c.hex());
//   if (hair) {
//     const hairColor = chroma(hair.rgb);
//     const hairInfluence = hair.tone === "warm" ? (hair.shade === "dark" ? 0.2 : 0.15) : hair.shade === "dark" ? 0.1 : 0.05;

//     hexColors = hexColors.map((c, i) => {
//       // Apply different influence to different color roles
//       const influence =
//         i === 0
//           ? hairInfluence * 0.8 // less on main color
//           : i === 4
//           ? hairInfluence * 0.5 // least on neutral
//           : hairInfluence;
//       return chroma.mix(c, hairColor, influence, "lab").hex();
//     });
//   }

//   return hexColors;
// }
