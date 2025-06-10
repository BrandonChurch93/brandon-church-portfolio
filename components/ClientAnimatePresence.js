"use client";

import { AnimatePresence } from "framer-motion";

export default function ClientAnimatePresence({ children, mode = "wait" }) {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
}
