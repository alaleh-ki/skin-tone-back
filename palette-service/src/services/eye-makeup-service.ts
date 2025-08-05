import chroma from "chroma-js";
import { SkinTone, Shade, Undertone, HairInput } from "./types/types";

export function getEyeMakeupColors(
  tone: SkinTone,
  shade: Shade,
  undertone: Undertone,
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
    