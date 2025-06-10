"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiRefreshCw } from "react-icons/fi";
import { useChatbot } from "./useChatbot";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import styles from "./chatbot.module.css";

const Chatbot = () => {
  const {
    isOpen,
    messages,
    isLoading,
    error,
    autoScroll,
    closeChatbot,
    sendMessage,
    retryLastMessage,
    clearError,
    setAutoScroll,
  } = useChatbot();

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const cursorInteraction = useCursorInteraction();

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Handle scroll to detect if user scrolled up
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

    setAutoScroll(isAtBottom);
  }, [setAutoScroll]);

  // Handle send message
  const handleSend = useCallback(() => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
      setInputValue("");
    }
  }, [inputValue, isLoading, sendMessage]);

  // Handle key press
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeChatbot();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeChatbot]);

  // Modal variants
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const contentVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeChatbot}
        >
          <motion.div
            className={styles.modal}
            variants={contentVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.title}>Chat with Brandon's AI</h2>
              <button
                className={styles.closeButton}
                onClick={closeChatbot}
                aria-label="Close chat"
                {...cursorInteraction}
              >
                <FiX />
              </button>
            </div>

            {/* Messages Container */}
            <div
              className={styles.messagesContainer}
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {/* Welcome Message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.welcomeMessage}
                >
                  <p>👋 Hi! I'm Brandon's AI assistant.</p>
                  <p>
                    Feel free to ask me about Brandon's experience, skills,
                    projects, or anything else you'd like to know!
                  </p>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((message, index) => (
                <Message
                  key={message.id}
                  message={message}
                  index={index}
                  onRetry={retryLastMessage}
                />
              ))}

              {/* Loading Indicator */}
              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className={styles.inputContainer}>
              {error && (
                <motion.div
                  className={styles.errorBar}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <span>{error}</span>
                  <button onClick={clearError} {...cursorInteraction}>
                    ✕
                  </button>
                </motion.div>
              )}

              <div className={styles.inputWrapper}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.input}
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  {...cursorInteraction}
                />
                <button
                  className={styles.sendButton}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  {...cursorInteraction}
                >
                  <FiSend />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Message Component
const Message = ({ message, index, onRetry }) => {
  const cursorInteraction = useCursorInteraction();
  const isUser = message.role === "user";
  const isError = message.type === "error";

  return (
    <motion.div
      className={`${styles.messageWrapper} ${
        isUser ? styles.userMessage : styles.aiMessage
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div
        className={`${styles.message} ${isError ? styles.errorMessage : ""}`}
      >
        {message.content}
        {isError && (
          <button
            className={styles.retryButton}
            onClick={onRetry}
            aria-label="Retry message"
            {...cursorInteraction}
          >
            <FiRefreshCw /> Retry
          </button>
        )}
      </div>
      <span className={styles.timestamp}>
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </motion.div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => {
  return (
    <motion.div
      className={`${styles.messageWrapper} ${styles.aiMessage}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.typingIndicator}>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

export default Chatbot;
