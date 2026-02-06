
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateRomanticMessage = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Валентины баярт зориулж ${name} гэдэг охинд маш хөөрхөн, чин сэтгэлийн, богинохон романтик мэссэж монголоор бичээд өгөөч. Зөвхөн мэссэжийг нь л бичээрэй.`,
      config: {
        temperature: 0.9,
      }
    });
    
    return response.text || "Чи бол миний амьдралын хамгийн тод гэрэл. Валентины баярын мэнд хүргэе!";
  } catch (error) {
    console.error("Error generating message:", error);
    return "Чи бол миний амьдралын хамгийн нандин эрдэнэ. Хайртай шүү.";
  }
};
