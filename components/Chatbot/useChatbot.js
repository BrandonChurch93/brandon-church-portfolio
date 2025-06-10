"use client";

import { create } from "zustand";
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

// Load resume context
let resumeContext = null;
const loadResumeContext = async () => {
  if (!resumeContext) {
    try {
      const response = await fetch("/data/resume.json");
      resumeContext = await response.json();
    } catch (error) {
      console.error("Failed to load resume context:", error);
      resumeContext = { error: "Failed to load resume data" };
    }
  }
  return resumeContext;
};

// Zustand store for chatbot state
const useChatbotStore = create((set, get) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  error: null,
  autoScroll: true,

  // Actions
  openChatbot: () => set({ isOpen: true }),
  closeChatbot: () => set({ isOpen: false }),
  toggleChatbot: () => set((state) => ({ isOpen: !state.isOpen })),
  setAutoScroll: (value) => set({ autoScroll: value }),

  // Message handling
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          timestamp: new Date(),
          ...message,
        },
      ],
    })),

  // Clear error
  clearError: () => set({ error: null }),

  // Send message to AI
  sendMessage: async (content) => {
    const { addMessage, messages } = get();

    // Add user message
    addMessage({
      role: "user",
      content,
      type: "message",
    });

    // Set loading state
    set({ isLoading: true, error: null });

    try {
      // Load resume context if needed
      const resume = await loadResumeContext();

      // Prepare messages for API
      const systemMessage = {
        role: "system",
        content: `You are Brandon Church's AI assistant. You have access to Brandon's professional background and should answer questions as if you were representing him professionally. Here's his information: ${JSON.stringify(
          resume,
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

      const apiMessages = [
        systemMessage,
        ...messages
          .filter((m) => m.type === "message")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        { role: "user", content },
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 500,
      });

      // Add AI response
      addMessage({
        role: "assistant",
        content: completion.choices[0].message.content,
        type: "message",
      });
    } catch (error) {
      console.error("Chat error:", error);

      // Determine error type
      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (error.message?.includes("401")) {
        errorMessage = "API authentication failed. Please check the API key.";
      } else if (error.message?.includes("429")) {
        errorMessage =
          "Rate limit exceeded. Please wait a moment and try again.";
      } else if (error.message?.includes("network")) {
        errorMessage = "Network error. Please check your connection.";
      }

      set({ error: errorMessage });

      // Add error message
      addMessage({
        role: "assistant",
        content: errorMessage,
        type: "error",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // Retry last message
  retryLastMessage: () => {
    const { messages, sendMessage } = get();
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    if (lastUserMessage) {
      // Remove error message if exists
      set((state) => ({
        messages: state.messages.filter((m) => m.type !== "error"),
      }));

      // Resend message
      sendMessage(lastUserMessage.content);
    }
  },
}));

// Export hook
export const useChatbot = () => {
  const {
    isOpen,
    messages,
    isLoading,
    error,
    autoScroll,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    sendMessage,
    retryLastMessage,
    clearError,
    setAutoScroll,
  } = useChatbotStore();

  return {
    isOpen,
    messages,
    isLoading,
    error,
    autoScroll,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    sendMessage,
    retryLastMessage,
    clearError,
    setAutoScroll,
  };
};
