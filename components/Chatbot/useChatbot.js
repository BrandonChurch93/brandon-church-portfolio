"use client";

import { create } from "zustand";

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
      const apiMessages = messages
        .filter((m) => m.type === "message")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      // Add current message
      apiMessages.push({ role: "user", content });

      // Call our API route instead of OpenAI directly
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          resumeContext: resume,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Add AI response
      addMessage({
        role: "assistant",
        content: data.message,
        type: "message",
      });
    } catch (error) {
      console.error("Chat error:", error);

      // Determine error type
      let errorMessage = "Sorry, I encountered an error. Please try again.";

      if (error.message?.includes("authentication")) {
        errorMessage =
          "API authentication failed. Please check the API key configuration.";
      } else if (error.message?.includes("Rate limit")) {
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
