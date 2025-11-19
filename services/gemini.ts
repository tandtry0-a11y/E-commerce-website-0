import { GoogleGenAI, Chat } from "@google/genai";
import { MOCK_PRODUCTS } from "../constants";

// Initialize the AI client
// Note: In a production app, ensure your environment setup is correct.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Lumina", a helpful, witty, and knowledgeable AI shopping assistant for the Lumina Store.
The store sells high-quality lifestyle products including electronics, home goods, and accessories.

Here is the current product inventory:
${JSON.stringify(MOCK_PRODUCTS.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category, description: p.description })))}

Your goal is to help customers find the perfect product. 
- If a user asks for recommendations, suggest items from the inventory based on their needs.
- Be concise but friendly.
- If asked about pricing, quote the prices from the inventory.
- If asked about non-shopping topics, politely steer the conversation back to Lumina products or general lifestyle advice.
- You can use emojis to make the conversation lively.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const response = await session.sendMessage({ message });
    return response.text || "I'm having a little trouble thinking right now. Ask me again in a moment!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be disconnected from the mainframe. Please check your API Key configuration.";
  }
};

// Function to generate a creative marketing blurb for a product
export const generateProductBlurb = async (productName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, punchy, and exciting 2-sentence marketing blurb for a product named "${productName}". Do not use quotes.`,
    });
    return response.text || "Experience the quality.";
  } catch (error) {
    return "Discover excellence with this product.";
  }
};