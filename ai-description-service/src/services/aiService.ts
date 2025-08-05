import dotenv from "dotenv";
import axios from "axios";
import Description from "../models/aiModel";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

interface PaletteDescriptionResponse {
  tone_description: string;
  palette_type: "گرم" | "سرد" | "خنثی";
  clothing: string;
  eye_makeup: string;
  makeup: string;
  lipstick: string;
  jewelry: string;
  palettes: Palettes;
  skin: SkinInfo;
  hair: HairInfo;
}

interface SkinInfo {
  tone: string;
  undertone: string;
  shade: string;
  rgb: number[];
}

interface HairInfo {
  family: string;
  shade: string;
  tone: string;
  rgb: number[];
}

interface Palettes {
  clothing: string[];
  eye_makeup: string[];
  makeup: {
    blush: string[];
    contour: string[];
    highlighter: string[];
  };
  lipstick: string[];
  jewelry: string[];
}

class PaletteDescriptionService {
  async generateDescription(
    skin: SkinInfo,
    hair: HairInfo ,
    palettes: Palettes
  ): Promise<PaletteDescriptionResponse> {
    const prompt = await this.buildPrompt(skin, hair, palettes);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const cleanContent = jsonMatch[0];
    
    const parsed: PaletteDescriptionResponse = JSON.parse(cleanContent);

    await Description.create({
      skin,
      hair,
      palettes,
      response: parsed,
    });

    return parsed;
  }

  private async buildPrompt(
    skin: SkinInfo,
    hair: HairInfo,
    palettes: Palettes
  ): Promise<string> {
    return `
شما یک کارشناس مد و رنگ‌شناسی هستید.

با توجه به مشخصات پوست و مو و پالت‌های رنگی زیر، لطفاً برای هر دسته (لباس، آرایش چشم، آرایش صورت شامل رژگونه، کانتور و هایلایتر، رژ لب و جواهرات) یک یا دو جمله کوتاه و دوستانه بنویسید که چطور این رنگ‌ها با پوست هماهنگ‌اند و چطور می‌توان از آن‌ها در استایل و آرایش استفاده کرد.

اطلاعات پوست:
- نوع رنگ پوست: "${skin.tone}"
- تون رنگ پوست: "${skin.undertone}"
- شدت رنگ پوست: "${skin.shade}"
- مقدار RGB: ${JSON.stringify(skin.rgb)}

اطلاعات مو:
- خانواده رنگ مو: "${hair?.family ?? "نامشخص"}"
- شدت رنگ مو: "${hair?.shade ?? "نامشخص"}"
- تون رنگ مو: "${hair?.tone ?? "نامشخص"}"
- مقدار RGB: ${hair ? JSON.stringify(hair.rgb) : "نامشخص"}

پالت‌های رنگی پیشنهادی:

لباس: ${JSON.stringify(palettes.clothing)}
آرایش چشم: ${JSON.stringify(palettes.eye_makeup)}
آرایش صورت:
  رژگونه: ${JSON.stringify(palettes.makeup.blush)}
  کانتور: ${JSON.stringify(palettes.makeup.contour)}
  هایلایتر: ${JSON.stringify(palettes.makeup.highlighter)}
رژ لب: ${JSON.stringify(palettes.lipstick)}
جواهرات: ${JSON.stringify(palettes.jewelry)}

🔹 لطفاً فقط یک JSON معتبر و کامل با ساختار زیر خروجی بده، بدون هیچ متن اضافی:

{
  "tone_description": "یک جمله کوتاه و صمیمی درباره نوع رنگ پوست",
  "palette_type": "گرم | سرد | خنثی",
  "clothing": "توضیح کوتاه درباره پالت لباس",
  "eye_makeup": "توضیح کوتاه درباره پالت آرایش چشم",
  "makeup": "توضیح کوتاه درباره پالت آرایش صورت (رژگونه، کانتور و هایلایتر)",
  "lipstick": "توضیح کوتاه درباره پالت رژ لب",
  "jewelry": "توضیح کوتاه درباره پالت جواهرات"
}
`;
  }
}

export default new PaletteDescriptionService();
