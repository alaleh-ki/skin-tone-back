import chroma from "chroma-js";
import { Season } from "./types/types";

export function getEyeMakeupColors(season: Season): string[] {
  // Real eyeshadow palettes mapped to 12 seasons
  const eyeshadows: Record<Season, string[]> = {
    // SPRING (warm & bright/light)
    "Bright Spring": [
      "#FFA94D", // Urban Decay 'Freelove'
      "#FFD93B", // ABH 'Buttercup'
      "#FF6B6B", // MAC 'Lady Danger'
      "#4ECDC4", // Pat McGrath 'Emerald'
      "#38A3A5", // Fenty 'Trophy Wife'
    ],
    "Light Spring": [
      "#FFD8A8", // ABH 'Peach Sorbet'
      "#FFE066", // MAC 'Honey Lust'
      "#FFB3B3", // Too Faced 'Coral Bliss'
      "#9AE3D4", // Urban Decay 'Hijack'
      "#B5E48C", // ColourPop 'Lemon Drop'
    ],
    "Warm Spring": [
      "#F6A85E", // ABH 'Sienna'
      "#FFD166", // Pat McGrath 'Gold Nectar'
      "#E56B6F", // MAC 'Sauce'
      "#6BCB77", // Fenty 'Choppa Choppa'
      "#4D908E", // Natasha Denona 'Sienna'
    ],

    // SUMMER (cool & soft/light)
    "Cool Summer": [
      "#A2C7E5", // Urban Decay 'Crisp'
      "#B5B8E3", // MAC 'Plumage'
      "#C9BBCF", // ColourPop 'Come and Get It'
      "#9BB7D4", // Natasha Denona 'Cloud'
      "#94B4C2", // Fenty 'Calabasas'
    ],
    "Light Summer": [
      "#C5DFF8", // Too Faced 'Snowcone'
      "#D8E2DC", // Urban Decay 'Tease'
      "#BDE0FE", // Pat McGrath 'Blue Velvet'
      "#C8B6FF", // MAC 'Violet'
      "#B8E0D2", // ColourPop 'Crush'
    ],
    "Soft Summer": [
      "#A8B6BF", // MAC 'Mystery'
      "#B1A7A6", // Urban Decay 'Backdoor'
      "#9D9FAB", // Fenty 'Wiggle'
      "#91A6A6", // Natasha Denona 'Stone'
      "#9CBFA7", // ABH 'Seafoam'
    ],

    // AUTUMN (warm & rich/deep)
    "Soft Autumn": [
      "#CBB682", // ABH 'Caramel'
      "#B08968", // MAC 'Antique Bronze'
      "#DDB892", // Natasha Denona 'Bronze'
      "#B5825D", // Fenty 'Cocoa'
      "#997B66", // Pat McGrath 'Umber'
    ],
    "Warm Autumn": [
      "#A47C48", // MAC 'Copperplate'
      "#C97C5D", // Pat McGrath 'Saffron'
      "#D9AE61", // ABH 'Gold Rush'
      "#A47148", // Too Faced 'Caramel'
      "#B5651D", // Urban Decay 'Spoon'
    ],
    "Deep Autumn": [
      "#704214", // MAC 'Brun'
      "#8B5E3C", // Natasha Denona 'Chestnut'
      "#A97155", // Fenty 'Mink'
      "#8B6F47", // ABH 'Fudge'
      "#6F4E37", // Pat McGrath 'Dark Soul'
    ],

    // WINTER (cool & deep/bright)
    "Cool Winter": [
      "#3C4F76", // Pat McGrath 'Midnight Blue'
      "#536878", // MAC 'Sleek'
      "#4B4453", // Fenty 'Noir'
      "#2C2E43", // Urban Decay 'Perversion'
      "#3E4C59", // Natasha Denona 'Slate'
    ],
    "Bright Winter": [
      "#FF595E", // Pat McGrath 'Blood Rush'
      "#FFCA3A", // ABH 'Gold'
      "#8AC926", // Fenty 'Green Tea'
      "#1982C4", // MAC 'Electric Eel'
      "#6A4C93", // Urban Decay 'Vice'
    ],
    "Deep Winter": [
      "#1B263B", // MAC 'Carbon'
      "#0D1B2A", // Pat McGrath 'Obsidian'
      "#415A77", // Fenty 'Blue Moon'
      "#2E4057", // Natasha Denona 'Blueberry'
      "#3D2C2E", // Urban Decay 'Blackout'
    ],
  };

  return eyeshadows[season] || [];
}


// import chroma from "chroma-js";
// import { SkinTone, Shade, Undertone, HairInput } from "./types/types";

// export function getEyeMakeupColors(
//   tone: SkinTone,
//   shade: Shade,
//   undertone: Undertone,
//   hair?: HairInput
// ): string[] {
//     const eyeshadows = {
//         warm_light: [
//           "#FAD6A5", // Urban Decay 'Sin' (base)
//           "#C76F2A", // ABH 'Burnt Orange' (transition)
//           "#8B4513", // MAC 'Brun' (crease)
//           "#FFEBCD", // Fenty 'Biscotti' (brow bone)
//           "#D4AF37"  // Pat McGrath 'Gold Nectar' (pop)
//         ],
//         warm_medium: [
//           "#E97451", // ABH 'Realgar'
//           "#6F4E37", // MAC 'Saddle' (crease)
//           "#C1440E", // Pat McGrath 'Blitz Flame'
//           "#FFBF00", // Urban Decay 'Half Baked'
//           "#A0522D"  // ABH 'Sienna'
//         ],
//         warm_dark: [
//           "#5C4033", // ABH 'Cyprus Umber'
//           "#4B3621", // Pat McGrath 'Dark Soul'
//           "#D2691E", // MAC 'Rule'
//           "#A0522D", // ABH 'Sienna'
//           "#8B0000"  // Pat McGrath 'Blood Moon'
//         ],
//         cool_light: [
//           "#D8BFD8", // Urban Decay 'Tonic'
//           "#9370DB", // ABH 'Dusty Rose'
//           "#483D8B", // MAC 'Atlantic'
//           "#C0C0C0", // Fenty 'Frost Money'
//           "#7B68EE"  // Pat McGrath 'Blitz Violet'
//         ],
//         cool_medium: [
//           "#6A5ACD", // ABH 'Venetian Red'
//           "#483D8B", // MAC 'Atlantic'
//           "#708090", // Urban Decay 'Laced'
//           "#B0C4DE", // Fenty 'Cool Ice'
//           "#2F4F4F"  // Pat McGrath 'Dark Forest'
//         ],
//         cool_dark: [
//           "#2F4F4F", // ABH 'Noir'
//           "#191970", // Pat McGrath 'Blitz Blue'
//           "#000080", // MAC 'Blue Brown'
//           "#4B0082", // Urban Decay 'Tonic'
//           "#00008B"  // Fenty 'Midnight Wasabi'
//         ],
//         neutral_light: [
//           "#D3D3D3", // ABH 'Tempera'
//           "#C0C0C0", // MAC 'Shroom'
//           "#A9A9A9", // Urban Decay 'Frisk'
//           "#F5F5F5", // Fenty 'Diamond Bomb'
//           "#808080"  // Pat McGrath 'Skinshow Moon Glow'
//         ],
//         neutral_medium: [
//           "#708090", // ABH 'Stone'
//           "#2F4F4F", // MAC 'Copperplate'
//           "#778899", // Urban Decay 'Tease'
//           "#696969", // Fenty 'Sand Castle'
//           "#A9A9A9"  // Pat McGrath 'Blitz Emerald'
//         ],
//         neutral_dark: [
//           "#4B4B4B", // ABH 'Ash Brown'
//           "#2B2B2B", // Pat McGrath 'Black Coffee'
//           "#000000", // MAC 'Carbon'
//           "#1C1C1C", // Fenty 'Uninvited'
//           "#383838"  // Urban Decay 'Blackout'
//         ],
//       };
    
//       const key = `${tone}_${shade}`;
//       let palette = eyeshadows[key as keyof typeof eyeshadows] || eyeshadows["neutral_medium"];
    
//       // Adjust for hair
//       if (hair) {
//         const hairColor = chroma(hair.rgb);
//         palette = palette.map(c => chroma.mix(c, hairColor, 0.1, "lab").hex());
//       }
    
//       return palette;
//     }
    