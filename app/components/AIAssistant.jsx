"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  Zap,
  Brain,
  User,
} from "lucide-react";
import { cn } from "../utils/cn";
import trainingData from "../data/training-data.json";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm Brandon's AI assistant. I can answer questions about his experience, skills, and projects. How can I help you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Periodic attention animation for button
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setButtonAnimation("ai-button-attention");
        setTimeout(() => setButtonAnimation(""), 800);
      }, 12000); // Every 12 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Listen for toggle event from navigation
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggleAIAssistant", handleToggle);
    return () => window.removeEventListener("toggleAIAssistant", handleToggle);
  }, []);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simple body scroll lock - mobile only
  useEffect(() => {
    if (isOpen && isMobile) {
      // Just prevent scrolling on mobile, don't change position
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the chat is fully rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Call our API route instead of OpenAI directly
  const generateResponse = async (userMessage) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          userMessage,
          trainingData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("API Error:", data);
        throw new Error(data.error || "Chat API request failed");
      }

      return data.message;
    } catch (error) {
      console.error("Error calling chat API:", error);
      return "I'm having trouble connecting right now. Please try again or email Brandon directly at brandonleochurch@gmail.com";
    }
  };

  // Handle sending messages
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: await generateResponse(inputValue),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    { icon: <Zap size={14} />, text: "What are Brandon's skills?" },
    { icon: <Sparkles size={14} />, text: "Tell me about his projects" },
    { icon: <MessageCircle size={14} />, text: "Is he available for hire?" },
  ];

  return (
    <>
      {/* Floating Button - Bigger and better hover */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={cn(
              "fixed bottom-6 right-6 z-[80]",
              "w-16 h-16",
              "glass rounded-full",
              "border border-white/10",
              "hover:border-[#ff3f81]/50",
              "flex items-center justify-center",
              "transition-colors duration-300",
              "group",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
              buttonAnimation
            )}
            style={{
              willChange: "transform",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
            aria-label="Open AI Assistant chat"
          >
            <MessageCircle
              size={28}
              className="text-[#ff3f81] transition-colors"
            />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full pointer-events-none">
              <div className="absolute inset-0 w-3.5 h-3.5 bg-green-500 rounded-full animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - With smooth animations */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: "easeOut",
            }}
            className={cn(
              "fixed bottom-6 right-6 left-6 sm:left-auto z-[85]",
              "w-auto sm:w-full sm:max-w-md",
              "h-[calc(100vh-6rem)] sm:h-[600px] max-h-[85vh]",
              "flex flex-col",
              "rounded-3xl",
              "overflow-hidden"
            )}
            style={{
              willChange: "transform, opacity",
              boxShadow:
                "0 0 40px rgba(255, 63, 129, 0.3), 0 0 80px rgba(255, 63, 129, 0.1)",
            }}
          >
            {/* Main container with solid background */}
            <div className="relative w-full h-full bg-[#1a0f2e] rounded-3xl border border-[#ff3f81]/30">
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ff3f81]/20 rounded-2xl flex items-center justify-center border border-[#ff3f81]/30">
                          <Brain
                            size={20}
                            className="text-[#ff3f81] sm:w-6 sm:h-6"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-[#1a0f2e]">
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-base sm:text-lg">
                          AI Assistant
                        </h3>
                        <p className="text-xs text-white/60 flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Powered by OpenAI
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all duration-200 text-white/60 hover:text-white"
                      aria-label="Close AI Assistant"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "flex gap-3",
                        message.type === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                          message.type === "user"
                            ? "bg-white/10 border border-white/20"
                            : "bg-[#ff3f81]/10 border border-[#ff3f81]/20"
                        )}
                      >
                        {message.type === "user" ? (
                          <User size={18} className="text-white/80" />
                        ) : (
                          <Sparkles size={18} className="text-[#ff3f81]" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[80%] px-4 py-3 rounded-2xl",
                          message.type === "user"
                            ? "bg-white/10 backdrop-blur-sm border border-white/20"
                            : "bg-[#ff3f81]/10 backdrop-blur-sm border border-[#ff3f81]/20"
                        )}
                      >
                        <p className="text-sm text-white/90 leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#ff3f81]/10 border border-[#ff3f81]/20 flex items-center justify-center">
                        <Sparkles size={18} className="text-[#ff3f81]" />
                      </div>
                      <div className="bg-[#ff3f81]/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-[#ff3f81]/20">
                        <div className="flex items-center gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0,
                            }}
                            className="w-2 h-2 bg-[#ff3f81] rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.2,
                            }}
                            className="w-2 h-2 bg-[#ff3f81] rounded-full"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.4,
                            }}
                            className="w-2 h-2 bg-[#ff3f81] rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions - No animation */}
                {messages.length === 1 && (
                  <div className="px-4 sm:px-6 pb-3">
                    <p className="text-xs text-white/60 mb-3">
                      Suggested questions:
                    </p>
                    <div className="space-y-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(action.text)}
                          className={cn(
                            "w-full flex items-center gap-3 text-left",
                            "px-3 py-2 sm:px-4 sm:py-3 rounded-xl",
                            "bg-white/5 backdrop-blur-sm",
                            "border border-white/10",
                            "text-white/80 text-xs sm:text-sm",
                            "hover:bg-white/10 hover:border-[#ff3f81]/30 hover:text-white",
                            "transition-all duration-200",
                            "group"
                          )}
                        >
                          <span className="text-[#ff3f81] group-hover:scale-110 transition-transform flex-shrink-0">
                            {action.icon}
                          </span>
                          <span className="truncate">{action.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 sm:p-6 border-t border-white/10">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className={cn(
                        "flex-1 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-sm",
                        "bg-white/5 backdrop-blur-sm border border-white/10",
                        "text-white placeholder-white/50",
                        "focus:outline-none focus:ring-2 focus:ring-[#ff3f81] focus:border-transparent",
                        "hover:border-[#ff3f81]/30",
                        "transition-all duration-200"
                      )}
                      aria-label="Chat message input"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "p-2.5 sm:p-3 rounded-2xl transition-all duration-200",
                        inputValue.trim()
                          ? "bg-[#ff3f81] text-white hover:bg-[#ff3f81]/90"
                          : "bg-white/5 text-white/40 cursor-not-allowed border border-white/10"
                      )}
                      aria-label="Send message"
                    >
                      <Send size={18} className="sm:w-5 sm:h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
