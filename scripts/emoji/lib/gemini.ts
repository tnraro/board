import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  type InputContent
} from "@google/generative-ai";

const API_KEY = Bun.env.GEMINI_API_KEY!;
const ai = new GoogleGenerativeAI(API_KEY);

export interface Message {
  role: "system" | "user" | "assistant",
  content: string,
}

const adaptRole = (x: Message["role"]): string => {
  switch (x) {
    case "system": return "user";
    case "assistant": return "model";
  }
  return x;
}

export async function chat(model_name: string, messages: Message[]) {
  const history = messages.slice(0, -1).reduce((arr, message) => {
    const top = arr.at(-1);
    const role = adaptRole(message.role);
    if (top == null) {
      arr.push({
        role,
        parts: [message.content]
      });
      return arr;
    }
    if (role === top.role) {
      (top.parts as string[]).push(message.content);
    } else {
      arr.push({
        role,
        parts: [message.content]
      });
    }
    return arr;
  }, [] as InputContent[]);
  const input = messages.at(-1)!.content;

  const model = ai.getGenerativeModel({ model: model_name });

  const chat = model.startChat({
    history,
  });

  const result = await chat.sendMessage(input);
  const response = result.response;
  return { content: response.text().replaceAll(/^```(?:json)?\s+|\s+```$/g, "") };
}