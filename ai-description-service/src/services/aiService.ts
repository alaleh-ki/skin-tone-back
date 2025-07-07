import dotenv from "dotenv";
import axios from "axios";
import Description from "../models/aiModel";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");

interface SkinToneResponse {
  tone_description: string;
  palette_description: string;
  palette_type: "warm" | "cool" | "neutral";
}

class AiService {
  async describeImage(tone: string, palette: Array<string>) {
    const prompt = await this.getPrompt(tone, palette);
    console.log(prompt);

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 400,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response.data.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty response from AI");
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No JSON object found in AI response");
    }

    const cleanContent = jsonMatch[0];
    const parsed: SkinToneResponse = JSON.parse(cleanContent);

    await Description.create({
      tone,
      palette,
      response: parsed,
    });

    return parsed;
  }

  async getPrompt(tone: string, palette: Array<string>) {
    return `شما یک کارشناس مد و زیبایی هستید.

وظیفه:
بر اساس رنگ پوست (کد HEX) و لیست رنگ‌های پیشنهادی (پالت)، یک توصیف فارسی و دوستانه تولید کن.

شرایط بسیار مهم:
- فقط درباره کاربرد در لباس، مد و آرایش بنویس.
- درباره طراحی داخلی، دکور، گرافیک و سایر زمینه‌ها حرف نزن.
- فقط یک JSON فارسی خروجی بده. هیچ توضیح دیگری ننویس.

ورودی‌ها:
- کد رنگ پوست: "${tone}"
- پالت رنگی: ${JSON.stringify(palette)}

خروجی فقط به این شکل باشد:

{
  "tone_description": "...",
  "palette_description": "...",
  "palette_type": "گرم | سرد | خنثی"
}
  
  مثال راهنما (فقط جهت سبک و لحن، کپی نکن):

{
  "tone_description": "پوستت یه گلبهی گرم و خوش‌رنگه که حس صمیمیت و لطافت رو منتقل می‌کنه.",
  "palette_description": "رنگ‌هایی مثل سبز نعنایی، قهوه‌ای عسلی و صورتی هلویی به خوبی با پوستت هماهنگ می‌شن. می‌تونی ازشون توی رژ لب، شال یا مانتوهای تابستونی استفاده کنی تا استایلت چشمگیرتر بشه.",
  "palette_type": "گرم"
}
`;
  }
}

export default new AiService();
