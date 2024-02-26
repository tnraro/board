const req = async (path: string, options: RequestInit) => {
  const url = new URL(path, process.env.OLLAMA_ORIGIN ?? "http://localhost:11434/");

  const res = await fetch(url, options);
  if (!res.ok) throw res;
  return await res.json() as {
    message: Message,
  };
}

export interface Message {
  role: "system" | "user" | "assistant",
  content: string,
}
export const chat = async (model: string, messages: Message[]) => {
  const { message } = await req("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      format: "json",
    })
  });
  return message;
}