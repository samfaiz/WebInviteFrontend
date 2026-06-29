"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { InvitationContent } from "@/engine/types";
import { MonogramCrest, Divider } from "@/components/Ornaments";
import { ScratchCard } from "./ScratchCard";

/**
 * Hero: monogram crest, couple names, "We Are Getting Married", and the
 * scratch-to-reveal date card. Background art is a CSS scenic gradient for now
 * (swap for uploaded artwork via the Studio later) with a gentle parallax drift.
 */
export function Hero({ content }: { content: InvitationContent }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const { couple, hero, dateReveal } = content;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
    >
      {/* parallax scenic background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          y: bgY,
          scale: 1.15,
          background:
            "linear-gradient(180deg, #f6f1e7 0%, #e7eef4 30%, #cdddea 60%, #b9cfe0 100%)",
        }}
      >
        {/* arch vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(255,255,255,0.5) 100%)",
          }}
        />
        {/* soft floral haze bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(0deg, rgba(255,255,255,0.55), transparent)",
          }}
        />
      </motion.div>

      <motion.div style={{ y: contentY }} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <MonogramCrest monogram={couple.monogram} size={104} />
        </motion.div>

        <motion.h1
          className="mt-6 flex flex-wrap items-baseline justify-center gap-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <span className="font-script text-6xl sm:text-7xl" style={{ color: "var(--c-primary)" }}>
            {couple.partner1.name}
          </span>
          <span
            className="font-display text-sm uppercase tracking-[0.25em]"
            style={{ color: "var(--c-accent)" }}
          >
            {couple.connector ?? "&"}
          </span>
          <span className="font-script text-6xl sm:text-7xl" style={{ color: "var(--c-primary)" }}>
            {couple.partner2.name}
          </span>
        </motion.h1>

        <motion.p
          className="font-display mt-4 text-sm uppercase tracking-[0.34em] sm:text-base"
          style={{ color: "var(--c-secondary)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          {hero.marriageText}
        </motion.p>

        <Divider className="my-7" width={80} />

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <ScratchCard
            teaser={dateReveal.teaser}
            revealLabel={dateReveal.revealLabel}
            eventDate={dateReveal.eventDate}
            location={dateReveal.location}
          />
        </motion.div>

        <motion.div
          className="mt-12"
          style={{ color: "var(--c-muted)" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
