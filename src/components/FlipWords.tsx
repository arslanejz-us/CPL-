"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Cycles through `words` with a flip-up transition: the current word slides
 * up and out while the next word slides up into its place.
 */
export default function FlipWords({
  words,
  interval = 2400,
  className,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="relative inline-flex justify-center overflow-hidden align-bottom leading-[0.95]">
      {/* invisible spacer keeps the line height stable */}
      <span aria-hidden className="invisible">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn("absolute inset-0 inline-flex justify-center", className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
