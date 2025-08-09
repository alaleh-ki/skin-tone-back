
import { Season } from "./types/types";

export function getLipstickColors(season: Season): string[] {
  // Real lipstick shades mapped by 12 season system
  const lipsticks: Record<Season, string[]> = {
    // SPRING TYPES (warm, bright, fresh)
    "Bright Spring": [
      "#FF6B6B", // NARS 'Heat Wave' (vibrant coral red)
      "#FF9E8E", // MAC 'Lady Danger' (bright coral)
      "#FFD93B", // Fenty 'Freckle Fiesta' (warm yellowy)
      "#F7A88B", // Charlotte Tilbury 'Pillow Talk Medium' (warm peach)
      "#E56B6F", // NARS 'Orgasm' (warm pinky coral)
    ],
    "Light Spring": [
      "#FFD8A8", // MAC 'Peach Blossom' (soft peach)
      "#FFE066", // Clinique 'Fresh Picked' (soft yellow)
      "#FFB3B3", // Dior 'Rose Montaigne' (light pink)
      "#FAD6A5", // ABH 'Peach Sorbet' (soft apricot)
      "#FFABAB", // Too Faced 'Coral Fire' (soft coral)
    ],
    "Warm Spring": [
      "#F6A85E", // MAC 'Chili' (warm red-orange)
      "#FFD166", // Fenty 'Freckle Fiesta' (warm gold)
      "#E56B6F", // NARS 'Heat Wave' (warm coral red)
      "#FDA172", // Charlotte Tilbury 'Walk of No Shame' (warm peach)
      "#C46210", // Fenty 'Freckle Fiesta' (burnt orange)
    ],

    // SUMMER TYPES (cool, soft, muted)
    "Cool Summer": [
      "#C9BBCF", // MAC 'Twig' (muted rose)
      "#B5B8E3", // NARS 'Roman Holiday' (lavender pink)
      "#A2C7E5", // Urban Decay 'Ransom' (soft blue-pink)
      "#DB7093", // MAC 'Candy Yum Yum' (bright pink)
      "#9370DB", // Fenty 'Clapback' (cool lilac)
    ],
    "Light Summer": [
      "#C5DFF8", // Clinique 'Fresh Picked' (light cool pink)
      "#D8E2DC", // Fenty 'Candy Venom' (soft mauve)
      "#BDE0FE", // Urban Decay 'Laced' (soft baby blue)
      "#FFB7C5", // Glossier 'Puff' (light pink)
      "#D8BFD8", // NARS 'Roman Holiday' (light lavender)
    ],
    "Soft Summer": [
      "#A8B6BF", // MAC 'Stone' (muted blue-grey)
      "#B1A7A6", // NARS 'Dolce Vita' (muted rose)
      "#9D9FAB", // Fenty 'Mauve Wives' (muted mauve)
      "#91A6A6", // Urban Decay 'Tease' (soft grey mauve)
      "#9CBFA7", // Charlotte Tilbury 'Pillow Talk' (muted pink)
    ],

    // AUTUMN TYPES (warm, deep, rich)
    "Soft Autumn": [
      "#CBB682", // MAC 'Taupe' (warm brown)
      "#B08968", // NARS 'Dolce Vita' (soft terracotta)
      "#DDB892", // Fenty 'Freckle Fiesta' (warm caramel)
      "#B5825D", // Charlotte Tilbury 'Walk of No Shame' (warm bronze)
      "#997B66", // MAC 'Whirl' (warm brown)
    ],
    "Warm Autumn": [
      "#A47C48", // MAC 'Chili' (warm brick)
      "#C97C5D", // NARS 'Cruella' (warm orange-red)
      "#D9AE61", // Fenty 'Freckle Fiesta' (warm gold)
      "#A47148", // Charlotte Tilbury 'Bond Girl' (warm caramel)
      "#B5651D", // MAC 'Chili' (warm rust)
    ],
    "Deep Autumn": [
      "#704214", // MAC 'Diva' (deep berry)
      "#8B5E3C", // NARS 'Bette' (deep brown)
      "#A97155", // Fenty 'Blitz Flame' (deep orange)
      "#8B6F47", // Pat McGrath 'Blood Moon' (deep warm brown)
      "#6F4E37", // MAC 'Antique Velvet' (deep brown)
    ],

    // WINTER TYPES (cool, deep, vivid)
    "Cool Winter": [
      "#3C4F76", // MAC 'Cyber' (deep blue-red)
      "#536878", // Pat McGrath 'Blood Moon' (deep cool berry)
      "#4B4453", // Fenty 'Midnight Wasabi' (dark plum)
      "#2C2E43", // NARS 'Starwoman' (deep violet)
      "#3E4C59", // MAC 'Smoked Purple' (deep cool purple)
    ],
    "Bright Winter": [
      "#FF595E", // MAC 'Ruby Woo' (bright red)
      "#FFCA3A", // NARS 'Heat Wave' (bright coral)
      "#8AC926", // Fenty 'Clapback' (bright green)
      "#1982C4", // MAC 'Heroine' (bright blue)
      "#6A4C93", // Pat McGrath 'Blitz Violet' (bright purple)
    ],
    "Deep Winter": [
      "#1B263B", // MAC 'Sin' (deep red)
      "#0D1B2A", // NARS 'Bette' (deep wine)
      "#415A77", // Fenty 'Underdawg' (deep navy)
      "#2E4057", // Urban Decay 'Blackout' (deep black)
      "#3D2C2E", // MAC 'Cyber' (deep cool brown)
    ],
  };

  return lipsticks[season] || [];
}

// import { SkinTone, Undertone, Shade } from "./types/types";

// export function getLipstickColors(
//   tone: SkinTone,
//   undertone: Undertone,
//   shade: Shade
// ): string[] {
//     const lipsticks = {
//         warm_light: [
//           "#FF9E8E", // MAC 'Lady Danger' (vibrant coral)
//           "#F7A88B", // Charlotte Tilbury 'Pillow Talk Medium'
//           "#E2583E", // NARS 'Heat Wave'
//           "#D98B82", // MAC 'Kinda Sexy'
//           "#C46210", // Fenty 'Freckle Fiesta'
//         ],
//         warm_medium: [
//           "#C04000", // MAC 'Chili'
//           "#B95C44", // NARS 'Dolce Vita'
//           "#9F2B68", // Fenty 'Griselda'
//           "#E97451", // NARS 'Cruella'
//           "#B55033", // Rare Beauty 'Inspire'
//         ],
//         warm_dark: [
//           "#800020", // MAC 'Diva'
//           "#722F37", // NARS 'Bette'
//           "#7B3F00", // NARS 'Koukou'
//           "#954535", // MAC 'Sin'
//           "#5C1E1E", // Pat McGrath 'Flesh 5'
//         ],
//         cool_light: [
//           "#FFB7C5", // Glossier 'Puff'
//           "#DE3163", // NARS 'Schiap'
//           "#DB7093", // MAC 'Candy Yum Yum'
//           "#C21E56", // MAC 'All Fired Up'
//           "#D8BFD8", // NARS 'Roman Holiday'
//         ],
//         cool_medium: [
//           "#915C83", // MAC 'Rebel'
//           "#B3446C", // NARS 'Mona'
//           "#800080", // MAC 'Heroine'
//           "#D9417E", // Fenty 'Clapback'
//           "#953553", // NARS 'Anna'
//         ],
//         cool_dark: [
//           "#702963", // MAC 'Cyber'
//           "#5D3954", // Fenty 'Mauve Wives'
//           "#4B0082", // NARS 'Starwoman'
//           "#673147", // MAC 'Smoked Purple'
//           "#8B0000", // NARS 'Bette'
//         ],
//         neutral_light: [
//           "#C08081", // MAC 'Velvet Teddy'
//           "#E97451", // NARS 'Jane'
//           "#DB7093", // Fenty 'Candy Venom'
//           "#CC8899", // MAC 'Kinda Sexy'
//           "#B94E48", // NARS 'Dolce Vita'
//         ],
//         neutral_medium: [
//           "#954535", // MAC 'Whirl'
//           "#80461B", // Fenty 'Freckle Fiesta'
//           "#B22234", // NARS 'Cruella'
//           "#8B3A3A", // MAC 'Taupe'
//           "#A0522D", // Rare Beauty 'Honor'
//         ],
//         neutral_dark: [
//           "#5D3954", // MAC 'Sin'
//           "#614051", // NARS 'Bette'
//           "#4B3621", // Fenty 'Underdawg'
//           "#3E2723", // MAC 'Antique Velvet'
//           "#722F37", // MAC 'Diva'
//         ],
//       };
    
//       const key = `${tone}_${shade}`;
//       return lipsticks[key as keyof typeof lipsticks] || lipsticks["neutral_medium"];
// }