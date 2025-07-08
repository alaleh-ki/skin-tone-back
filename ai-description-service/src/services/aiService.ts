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
  return `
شما یک کارشناس مد، زیبایی و رنگ‌شناسی هستید.

هدف:
بر اساس رنگ پوست و پالت پیشنهادی، یک توضیح فارسی، دوستانه و کاربردی ارائه کن.

📌 قوانین مهم:
- فقط درباره کاربرد رنگ‌ها در لباس، استایل و آرایش صحبت کن.
- به هیچ‌وجه درباره دکوراسیون، طراحی داخلی یا گرافیک چیزی ننویس.
- فقط یک JSON معتبر و کامل خروجی بده. هیچ توضیح یا متن اضافی ننویس.

ورودی‌ها:
- رنگ پوست (HEX): "${tone}"
- پالت رنگی متناسب با رنگ پوست: ${JSON.stringify(palette)}

📤 خروجی فقط به این ساختار باشد:

{
  "tone_description": "[توضیح کوتاه و دوستانه درباره رنگ پوست]",
  "palette_description": "[چرا این پالت مناسب است و چطور می‌توان از آن در استایل و آرایش استفاده کرد]",
  "palette_type": "گرم | سرد | خنثی"
}

مثال راهنما (فقط برای لحن و سبک، کپی نکن):

{
  "tone_description": "پوستت یه بژ گرم و لطیفه که حالت صمیمی و طبیعی بهت می‌ده.",
  "palette_description": "رنگ‌های سبز نعنایی، قهوه‌ای کاراملی و صورتی ملایم به خوبی با پوستت هماهنگ‌ هستن. ازشون توی رژ لب، شال یا مانتو استفاده کن تا استایلت بیشتر بدرخشه.",
  "palette_type": "گرم"
}
  `;
}
}

export default new AiService();
