import dotenv from "dotenv";
import axios from "axios";
import Description from "../models/aiModel";

dotenv.config({ quiet: true });


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

interface PaletteDescriptionResponse {
  tone_description: string;
  palette_type: "warm" | "cool" | "neutral";
  clothing: string;
  eye_makeup: string;
  makeup: string;
  lipstick: string;
  jewelry: string;
  palettes: Palettes;
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
    season: string,
    palettes: Palettes
  ): Promise<PaletteDescriptionResponse> {
    const prompt = await this.buildPrompt(season, palettes);

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
      season,
      palettes,
      response: parsed,
    });

    return parsed;
  }

  private async buildPrompt(
    season: string,
    palettes: Palettes
  ): Promise<string> {
    return `
  You are a fashion and color expert.
  
  The color season "${season}" includes characteristics such as skin tone, color intensity, and color clarity that influence the selection of appropriate clothing and makeup colors. Please first provide a brief and clear explanation about the general characteristics of this color season.
  
  Then, based on the color palettes below, write one or two short and friendly sentences for each category (clothing, eye makeup, face makeup including blush, contour and highlighter, lipstick, and jewelry) explaining how these colors harmonize with the color season and how they can be used in styling and makeup.
  
  Suggested color palettes:
  
  Clothing: ${JSON.stringify(palettes.clothing)}
  Eye Makeup: ${JSON.stringify(palettes.eye_makeup)}
  Face Makeup:
    Blush: ${JSON.stringify(palettes.makeup.blush)}
    Contour: ${JSON.stringify(palettes.makeup.contour)}
    Highlighter: ${JSON.stringify(palettes.makeup.highlighter)}
  Lipstick: ${JSON.stringify(palettes.lipstick)}
  Jewelry: ${JSON.stringify(palettes.jewelry)}
  
  🔹 Please output only a valid and complete JSON with the structure below, without any additional text:
  
  {
    "tone_description": "A short and friendly sentence about the color season and its characteristics",
    "palette_type": "warm | cool | neutral",
    "clothing": "A brief description of the clothing palette",
    "eye_makeup": "A brief description of the eye makeup palette",
    "makeup": "A brief description of the face makeup palette (blush, contour, and highlighter)",
    "lipstick": "A brief description of the lipstick palette",
    "jewelry": "A brief description of the jewelry palette",
    "season": "An explanation of about one paragraph about the color season"
  }
    `;
  }

  // PERSIAN VERSION (COMMENTED OUT)
  // private async buildPrompt(
  //   season: string,
  //   palettes: Palettes
  // ): Promise<string> {
  //   return `
  // شما یک کارشناس مد و رنگ‌شناسی هستید.
  // 
  // فصل رنگ‌شناسی "${season}" شامل ویژگی‌هایی مانند تون رنگ پوست، شدت رنگ و شفافیت رنگ‌ها است که بر انتخاب رنگ‌های مناسب لباس و آرایش تأثیر می‌گذارد. لطفاً ابتدا یک توضیح کوتاه و واضح درباره ویژگی‌های کلی این فصل رنگ‌شناسی ارائه دهید.
  // 
  // سپس، با توجه به پالت‌های رنگی زیر، برای هر دسته (لباس، آرایش چشم، آرایش صورت شامل رژگونه، کانتور و هایلایتر، رژ لب و جواهرات) یک یا دو جمله کوتاه و دوستانه بنویسید که چطور این رنگ‌ها با فصل رنگ هماهنگ‌اند و چطور می‌توان از آن‌ها در استایل و آرایش استفاده کرد.
  // 
  // پالت‌های رنگی پیشنهادی:
  // 
  // لباس: ${JSON.stringify(palettes.clothing)}
  // آرایش چشم: ${JSON.stringify(palettes.eye_makeup)}
  // آرایش صورت:
  //   رژگونه: ${JSON.stringify(palettes.makeup.blush)}
  //   کانتور: ${JSON.stringify(palettes.makeup.contour)}
  //   هایلایتر: ${JSON.stringify(palettes.makeup.highlighter)}
  // رژ لب: ${JSON.stringify(palettes.lipstick)}
  // جواهرات: ${JSON.stringify(palettes.jewelry)}
  // 
  // 🔹 لطفاً فقط یک JSON معتبر و کامل با ساختار زیر خروجی بده، بدون هیچ متن اضافی:
  // 
  // {
  //   "tone_description": "یک جمله کوتاه و صمیمی درباره فصل رنگ‌شناسی و ویژگی‌های آن",
  //   "palette_type": "گرم | سرد | خنثی",
  //   "clothing": "توضیح کوتاه درباره پالت لباس",
  //   "eye_makeup": "توضیح کوتاه درباره پالت آرایش چشم",
  //   "makeup": "توضیح کوتاه درباره پالت آرایش صورت (رژگونه، کانتور و هایلایتر)",
  //   "lipstick": "توضیح کوتاه درباره پالت رژ لب",
  //   "jewelry": "توضیح کوتاه درباره پالت جواهرات",
  //   "season": "یک توضیح حدود یک پاراگراف راجع به فصل رنگ‌شناسی"
  // }
  //   `;
  // }
}

export default new PaletteDescriptionService();
