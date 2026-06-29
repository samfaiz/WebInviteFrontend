"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Divider } from "@/components/Ornaments";

/**
 * Full-screen sealed-envelope intro. Tap (or it auto-prompts) to open the flap;
 * the overlay then fades to reveal the invitation beneath.
 */
export function EnvelopeIntro({
  tagline,
  seal = "S L",
  onOpen,
}: {
  tagline?: string;
  seal?: string;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 38%, var(--c-grad-from), var(--c-grad-to))",
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: 0.7, delay: opening ? 0.8 : 0 }}
    >
      <motion.button
        onClick={open}
        aria-label="Open invitation"
        className="relative block"
        style={{ width: 300, height: 200, perspective: 1000 }}
        initial={{ scale: 0.92, opacity: 0, y: 22 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: opening ? 1 : 1.02 }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* envelope back */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: "var(--c-surface)",
              boxShadow: "0 24px 50px rgba(40,50,80,0.22)",
            }}
          />
          {/* letter peeking up as it opens */}
          <motion.div
            className="absolute left-1/2 rounded-sm"
            style={{
              width: "82%",
              height: "78%",
              top: "10%",
              x: "-50%",
              background: "#fffdf8",
              border: "1px solid color-mix(in srgb, var(--c-accent) 30%, transparent)",
              zIndex: 5,
            }}
            animate={{ y: opening ? -70 : 0, opacity: opening ? 1 : 0 }}
            transition={{ duration: 0.7, delay: opening ? 0.35 : 0 }}
          />
          {/* front pocket */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 28%, 50% 72%, 100% 28%, 100% 100%, 0 100%)",
              background: "var(--c-surface)",
              borderTop: "1px solid color-mix(in srgb, var(--c-accent) 22%, transparent)",
              zIndex: 10,
            }}
          />
          {/* flap */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: "72%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(180deg, var(--c-surface), color-mix(in srgb, var(--c-grad-to) 60%, var(--c-surface)))",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            animate={{ rotateX: opening ? -178 : 0, zIndex: opening ? 1 : 20 }}
            transition={{ duration: 0.85, ease: [0.6, 0, 0.2, 1] }}
          />
          {/* wax heart seal */}
          <motion.div
            className="absolute left-1/2 top-[46%] z-30"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 0.5 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <svg width="64" height="64" viewBox="0 0 100 100" aria-hidden>
              <defs>
                <radialGradient id="wax" cx="40%" cy="35%" r="75%">
                  <stop offset="0%" stopColor="#d9b366" />
                  <stop offset="60%" stopColor="#b08d57" />
                  <stop offset="100%" stopColor="#8a6a3c" />
                </radialGradient>
              </defs>
              <path
                d="M50 86 C18 60 16 34 36 27 C49 22 50 38 50 41 C50 38 51 22 64 27 C84 34 82 60 50 86 Z"
                fill="url(#wax)"
                stroke="#7d5e34"
                strokeWidth="1"
              />
              <text
                x="50"
                y="52"
                textAnchor="middle"
                fontFamily="var(--font-cinzel), serif"
                fontSize="16"
                fill="#fdf6e6"
                letterSpacing="1"
              >
                {seal}
              </text>
            </svg>
          </motion.div>
        </div>
      </motion.button>

      <motion.div
        className="mt-10 text-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Divider width={70} />
        {tagline ? (
          <p
            className="font-display mt-4 text-[11px] uppercase tracking-[0.32em]"
            style={{ color: "var(--c-muted)" }}
          >
            {tagline}
          </p>
        ) : null}
        <motion.p
          className="mt-3 text-sm"
          style={{ color: "var(--c-secondary)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to open
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
