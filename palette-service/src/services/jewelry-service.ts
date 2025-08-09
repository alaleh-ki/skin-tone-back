import { Undertone } from "./types/types";

export function getJewelryColors(undertone: Undertone): string[] {
  switch (undertone) {
    case "warm": // corresponds to golden undertones
      return [
        "#D4AF37", // 24k Yellow Gold
        "#FFD700", // Classic Gold
        "#B8860B", // Dark Goldenrod (bronze/gold)
      ];
    case "olive":
      return [
        "#B76E79", // Rose Gold (dusty pink)
        "#E0BFB8", // Light Rose Gold
        "#CB9D9E", // Soft Coppery Rose
      ];
    case "cool":
    case "neutral":
    default:
      return [
        "#C0C0C0", // Sterling Silver
        "#E5E4E2", // White Gold
        "#A9A9A9", // Platinum Gray
      ];
  }
}
