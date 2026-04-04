import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { messages, userMessage, trainingData } = await request.json();

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key not found");
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    console.log("Making OpenAI API call...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are Brandon Church's AI assistant. Use this information to answer questions: ${JSON.stringify(
              trainingData
            )}. 
            Speak as if you are representing Brandon, using "Brandon" or "he" when referring to him. 
            Be helpful, professional, and friendly. Keep responses concise and relevant.`,
          },
          ...messages
            .filter((m) => m.type === "user" || m.type === "bot")
            .map((m) => ({
              role: m.type === "user" ? "user" : "assistant",
              content: m.content,
            })),
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(
        `OpenAI API error: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const data = await response.json();
    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat API:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
