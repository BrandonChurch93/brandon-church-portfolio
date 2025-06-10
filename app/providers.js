"use client";

import XRInteractionProvider from "@/components/XRInteractionProvider";
import ClientAnimatePresence from "@/components/ClientAnimatePresence";
import Chatbot from "@/components/Chatbot/Chatbot";

export default function Providers({ children }) {
  return (
    <XRInteractionProvider>
      <ClientAnimatePresence>{children}</ClientAnimatePresence>
      <Chatbot />
    </XRInteractionProvider>
  );
}
