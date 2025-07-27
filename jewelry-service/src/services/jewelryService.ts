type JewelryInput = {
  skin_tone: 'warm' | 'cool' | 'neutral';
  undertone: 'golden' | 'olive' | 'pink' | 'neutral';
  shade: 'light' | 'medium' | 'dark';
};

export function recommendJewelry({ skin_tone, undertone, shade }: JewelryInput) {
  let recommended_jewelry = 'rose gold';
  if (skin_tone === 'warm') recommended_jewelry = 'gold';
  else if (skin_tone === 'cool') recommended_jewelry = 'silver';
  return { recommended_jewelry };
} 