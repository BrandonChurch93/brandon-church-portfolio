"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
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
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Periodic attention animation for button
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setButtonAnimation(true);
        setTimeout(() => setButtonAnimation(false), 800);
      }, 12000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Body scroll lock on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, isMobile]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // API call
  const generateResponse = async (userMessage) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, userMessage, trainingData }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Chat API request failed");
      return data.message;
    } catch (error) {
      console.error("Error calling chat API:", error);
      return "I'm having trouble connecting right now. Please try again or email Brandon directly at brandonleochurch@gmail.com";
    }
  };

  // Handle sending messages
  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage = { id: messages.length + 1, type: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { icon: <Zap size={14} />, text: "What are Brandon's skills?" },
    { icon: <Sparkles size={14} />, text: "Tell me about his projects" },
    { icon: <MessageCircle size={14} />, text: "Is he available for hire?" },
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: buttonAnimation ? 1.1 : 1 }}
            exit={{ scale: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, delay: 0.35 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant chat"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 9995,
              width: "56px",
              height: "56px",
              borderRadius: "var(--v2-radius-xl)",
              background: "var(--v2-bg-alt)",
              border: "1px solid var(--v2-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 300ms ease, box-shadow 500ms cubic-bezier(0.33, 1, 0.68, 1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            className="v2-ai-btn"
          >
            <MessageCircle size={24} style={{ color: "var(--v2-accent)" }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              left: isMobile ? "24px" : "auto",
              zIndex: 9995,
              width: isMobile ? "auto" : "100%",
              maxWidth: isMobile ? "none" : "420px",
              height: isMobile ? "calc(100vh - 6rem)" : "580px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--v2-radius-xl)",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(212, 165, 116, 0.15), 0 0 80px rgba(212, 165, 116, 0.05)",
            }}
          >
            <div style={{
              position: "relative",
              width: "100%",
              height: "100%",
              background: "var(--v2-bg-alt)",
              borderRadius: "var(--v2-radius-xl)",
              border: "1px solid rgba(212, 165, 116, 0.15)",
              display: "flex",
              flexDirection: "column",
            }}>

              {/* Header */}
              <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--v2-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "var(--v2-radius-lg)",
                    background: "var(--v2-accent-muted)",
                    border: "1px solid rgba(212, 165, 116, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    <Sparkles size={20} style={{ color: "var(--v2-accent)" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--v2-text)" }}>
                      AI Assistant
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--v2-text-dim)" }}>
                      Powered by OpenAI
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close AI Assistant"
                  style={{
                    padding: "8px",
                    borderRadius: "var(--v2-radius-md)",
                    background: "transparent",
                    border: "none",
                    color: "var(--v2-text-dim)",
                    cursor: "pointer",
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                  className="v2-ai-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
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
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexDirection: message.type === "user" ? "row-reverse" : "row",
                    }}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "var(--v2-radius-md)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: message.type === "user" ? "rgba(255,255,255,0.05)" : "var(--v2-accent-muted)",
                      border: `1px solid ${message.type === "user" ? "var(--v2-border)" : "rgba(212, 165, 116, 0.15)"}`,
                    }}>
                      {message.type === "user" ? (
                        <User size={16} style={{ color: "var(--v2-text-muted)" }} />
                      ) : (
                        <Sparkles size={16} style={{ color: "var(--v2-accent)" }} />
                      )}
                    </div>
                    {/* Bubble */}
                    <div style={{
                      maxWidth: "80%",
                      padding: "10px 14px",
                      borderRadius: "var(--v2-radius-lg)",
                      background: message.type === "user" ? "rgba(255,255,255,0.05)" : "var(--v2-accent-muted)",
                      border: `1px solid ${message.type === "user" ? "var(--v2-border)" : "rgba(212, 165, 116, 0.12)"}`,
                    }}>
                      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--v2-text-secondary)" }}>
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "var(--v2-radius-md)",
                      background: "var(--v2-accent-muted)", border: "1px solid rgba(212, 165, 116, 0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Sparkles size={16} style={{ color: "var(--v2-accent)" }} />
                    </div>
                    <div style={{
                      padding: "10px 14px", borderRadius: "var(--v2-radius-lg)",
                      background: "var(--v2-accent-muted)", border: "1px solid rgba(212, 165, 116, 0.12)",
                      display: "flex", alignItems: "center", gap: "4px",
                    }}>
                      {[0, 0.2, 0.4].map((delay) => (
                        <motion.div
                          key={delay}
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                          style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--v2-accent)" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div style={{ padding: "0 20px 12px" }}>
                  <p style={{ fontSize: "11px", color: "var(--v2-text-dim)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Suggested questions
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(action.text)}
                        className="v2-ai-quick"
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          textAlign: "left",
                          padding: "10px 12px",
                          borderRadius: "var(--v2-radius-md)",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--v2-border)",
                          color: "var(--v2-text-muted)",
                          fontSize: "13px",
                          cursor: "pointer",
                          transition: "background 200ms ease, border-color 200ms ease, color 200ms ease",
                        }}
                      >
                        <span style={{ color: "var(--v2-accent)", flexShrink: 0 }}>{action.icon}</span>
                        <span>{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div style={{ padding: "16px 20px", borderTop: "1px solid var(--v2-border)" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    aria-label="Chat message input"
                    className="v2-input"
                    style={{ flex: 1, fontSize: "14px", padding: "10px 14px" }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    aria-label="Send message"
                    style={{
                      padding: "10px 14px",
                      borderRadius: "var(--v2-radius-md)",
                      border: "none",
                      cursor: inputValue.trim() ? "pointer" : "not-allowed",
                      background: inputValue.trim() ? "var(--v2-accent)" : "rgba(255,255,255,0.05)",
                      color: inputValue.trim() ? "var(--v2-bg)" : "var(--v2-text-dim)",
                      transition: "background 200ms ease, color 200ms ease",
                    }}
                  >
                    <Send size={18} />
                  </button>
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
