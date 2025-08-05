import { SkinTone, Undertone, Shade } from "./types/types";

export function getLipstickColors(
  tone: SkinTone,
  undertone: Undertone,
  shade: Shade
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