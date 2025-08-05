import { Undertone } from "./types/types";

export function getJewelryColors(undertone: Undertone): string[] {
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