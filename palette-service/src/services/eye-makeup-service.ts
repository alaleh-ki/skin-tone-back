import chroma from "chroma-js";
import { Season } from "./types/types";

export function getEyeMakeupColors(season: Season): string[] {
  // Real eyeshadow palettes mapped to 12 seasons
  const eyeshadows: Record<Season, string[]> = {
    // SPRING (warm & bright/light)
    "Bright Spring": [
      "#FFA94D", // Urban Decay 'Freelove' - Warm bright orange
      "#FFD93B", // ABH 'Buttercup' - Warm bright yellow
      "#FF6B6B", // MAC 'Lady Danger' - Warm coral red
      "#4ED6C9", // Adjusted: Cool aqua with a slight warm tint (Pat McGrath 'Emerald' → brighter & warmer aqua)
      "#38A3A5", // Fenty 'Trophy Wife' - Cool turquoise, kept for contrast
    ],
    "Light Spring": [
      "#FFD8A8", // ABH 'Peach Sorbet' - Warm soft peach
      "#FFE066", // MAC 'Honey Lust' - Warm soft yellow
      "#FFB3B3", // Too Faced 'Coral Bliss' - Warm soft coral pink
      "#9AE3D4", // Urban Decay 'Hijack' - Soft aqua (good)
      "#B5E48C", // ColourPop 'Lemon Drop' - Soft fresh yellow-green (great variety)
    ],
    "Warm Spring": [
      "#F6A85E", // ABH 'Sienna' - Warm orange
      "#FFD166", // Pat McGrath 'Gold Nectar' - Warm gold
      "#E56B6F", // MAC 'Sauce' - Warm muted red
      "#7AB77A", // Adjusted: Replace 'Choppa Choppa' with slightly deeper olive green for warmth variety
      "#4D908E", // Natasha Denona 'Sienna' - Muted teal/blue-green, kept for balance
    ],

    // SUMMER (cool & soft/light)
    "Cool Summer": [
      "#A2C7E5", // Urban Decay 'Crisp' - Cool soft blue (good)
      "#B5B8E3", // MAC 'Plumage' - Muted cool lavender (good)
      "#C9BBCF", // ColourPop 'Come and Get It' - Soft cool mauve (good)
      "#8FA6B2", // Adjusted: Replace 'Cloud' with softer gray-blue for better softness
      "#94B4C2", // Fenty 'Calabasas' - Soft steel blue (good)
    ],
    "Light Summer": [
      "#C5DFF8", // Too Faced 'Snowcone' - Light icy blue (good)
      "#D8E2DC", // Urban Decay 'Tease' - Very soft warm gray (good)
      "#BDE0FE", // Pat McGrath 'Blue Velvet' - Light bright blue (good)
      "#C8B6FF", // MAC 'Violet' - Light cool lavender (good)
      "#B8E0D2", // ColourPop 'Crush' - Soft mint green (good)
    ],
    "Soft Summer": [
      "#A8B6BF", // MAC 'Mystery' - Muted gray-blue (good)
      "#B1A7A6", // Urban Decay 'Backdoor' - Muted mauve gray (good)
      "#8D92A6", // Adjusted: Replace 'Wiggle' with slightly cooler muted periwinkle
      "#91A6A6", // Natasha Denona 'Stone' - Muted blue-gray (good)
      "#9CBFA7", // ABH 'Seafoam' - Muted green-gray (good)
    ],
    "Soft Autumn": [
      "#CBB682", // ABH 'Caramel' - Warm soft gold (good)
      "#B08968", // MAC 'Antique Bronze' - Warm soft brown (good)
      "#DDB892", // Natasha Denona 'Bronze' - Warm beige-gold (good)
      "#A67B5B", // Adjusted: Slightly darker soft warm brown replacing 'Cocoa' to add depth variety
      "#997B66", // Pat McGrath 'Umber' - Warm muted brown (good)
    ],
    "Warm Autumn": [
      "#A47C48", // MAC 'Copperplate' - Warm gold-brown (good)
      "#C97C5D", // Pat McGrath 'Saffron' - Warm muted orange (good)
      "#D9AE61", // ABH 'Gold Rush' - Warm gold (good)
      "#8F5A29", // Adjusted: Deeper rusty brown replacing 'Caramel' for richer depth
      "#B5651D", // Urban Decay 'Spoon' - Deep warm orange-brown (good)
    ],
    "Deep Autumn": [
      "#704214", // MAC 'Brun' - Deep warm brown (good)
      "#8B5E3C", // Natasha Denona 'Chestnut' - Warm chestnut brown (good)
      "#A97155", // Fenty 'Mink' - Warm medium brown (good)
      "#5C3A21", // Adjusted: Deeper espresso brown replacing 'Fudge' for more depth
      "#6F4E37", // Pat McGrath 'Dark Soul' - Deep muted brown (good)
    ],

    // WINTER (cool & deep/bright)
    "Cool Winter": [
      "#3C4F76", // Pat McGrath 'Midnight Blue' - Deep cool blue (good)
      "#536878", // MAC 'Sleek' - Muted cool blue (good)
      "#4B4453", // Fenty 'Noir' - Cool dark purple-gray (good)
      "#2C2E43", // Urban Decay 'Perversion' - Deep black-blue (good)
      "#7F8FA6", // Adjusted: Replace 'Slate' with cooler steel blue to add light contrast
    ],
    "Bright Winter": [
      "#FF595E", // Pat McGrath 'Blood Rush' - Bright cool red (good)
      "#FFCA3A", // ABH 'Gold' - Bright yellow (good)
      "#8AC926", // Fenty 'Green Tea' - Bright green (good)
      "#1982C4", // MAC 'Electric Eel' - Bright blue (good)
      "#9B59B6", // Adjusted: Replace 'Vice' purple with more vibrant cool purple for contrast
    ],
    "Deep Winter": [
      "#1B263B", // MAC 'Carbon' - Very deep cool blue (good)
      "#0D1B2A", // Pat McGrath 'Obsidian' - Very dark blue-black (good)
      "#415A77", // Fenty 'Blue Moon' - Deep cool blue (good)
      "#2E4057", // Natasha Denona 'Blueberry' - Deep muted blue (good)
      "#4B2C3F", // Adjusted: Replace 'Blackout' with deep berry plum to add variety without losing depth
    ],
  };
  // AUTUMN (warm & rich/deep)

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
