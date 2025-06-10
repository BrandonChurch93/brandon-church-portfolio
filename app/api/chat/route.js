// src/app/api/chat/route.js
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Note: No NEXT_PUBLIC_ prefix
});

export async function POST(request) {
  try {
    const { messages, resumeContext } = await request.json();

    // Prepare system message
    const systemMessage = {
      role: "system",
      content: `You are Brandon Church's AI assistant. You have access to Brandon's professional background and should answer questions as if you were representing him professionally. Here's his information: ${JSON.stringify(
        resumeContext,
        null,
        2
      )}
        
        Guidelines:
        - Be professional but friendly
        - Highlight Brandon's expertise in AI integration and XR development
        - Mention specific projects and achievements when relevant
        - If asked about availability or rates, suggest contacting Brandon directly
        - Keep responses concise but informative`,
    };

    // Prepare messages for OpenAI
    const apiMessages = [systemMessage, ...messages];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI API error:", error);

    // Handle specific error types
    if (error.status === 401) {
      return NextResponse.json(
        { error: "API authentication failed" },
        { status: 401 }
      );
    } else if (error.status === 429) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
