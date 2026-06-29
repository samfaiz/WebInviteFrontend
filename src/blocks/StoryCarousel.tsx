"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { InvitationContent } from "@/engine/types";
import { Divider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

/**
 * Polaroid story carousel — swipe/drag or use the arrows. Postcard-style framing
 * with handwritten (script) captions.
 */
export function StoryCarousel({ content }: { content: InvitationContent }) {
  const items = content.story.items;
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  if (!items.length) return null;

  const paginate = (d: number) =>
    setState(([prev]) => [(prev + d + items.length) % items.length, d]);

  const item = items[index];

  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2
          className="font-display text-2xl uppercase tracking-[0.12em] sm:text-3xl"
          style={{ color: "var(--c-primary)" }}
        >
          {content.story.heading}
        </h2>
        {content.story.subtext ? (
          <p className="font-body mt-2 text-base italic" style={{ color: "var(--c-secondary)" }}>
            {content.story.subtext}
          </p>
        ) : null}
        <Divider className="my-7" width={90} />
      </Reveal>

      <div className="relative mx-auto flex max-w-md items-center justify-center">
        <CarouselArrow side="left" onClick={() => paginate(-1)} />

        <div className="relative h-[420px] w-[300px]">
          <AnimatePresence custom={dir} initial={false} mode="popLayout">
            <motion.div
              key={index}
              custom={dir}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) paginate(1);
                else if (info.offset.x > 70) paginate(-1);
              }}
              initial={{ opacity: 0, x: dir > 0 ? 120 : -120, rotate: dir > 0 ? 6 : -6 }}
              animate={{ opacity: 1, x: 0, rotate: -2 }}
              exit={{ opacity: 0, x: dir > 0 ? -120 : 120, rotate: dir > 0 ? -6 : 6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <div
                className="mx-auto flex h-full w-full flex-col rounded-sm p-3 pb-5"
                style={{
                  background: "#fffdf8",
                  boxShadow: "0 16px 40px rgba(40,50,80,0.22)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div className="relative flex-1 overflow-hidden rounded-sm bg-[var(--c-grad-to)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo}
                    alt={item.caption}
                    className="h-full w-full object-cover"
                    draggable={false}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                    }}
                  />
                  {/* postage stamp accent */}
                  <span
                    className="absolute right-2 top-2 rounded-[2px] px-1 text-[8px]"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      color: "var(--c-accent)",
                      border: "1px dashed var(--c-accent)",
                    }}
                  >
                    ♥
                  </span>
                </div>
                <p
                  className="font-script mt-3 text-2xl leading-tight"
                  style={{ color: "var(--c-secondary)" }}
                >
                  {item.caption}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselArrow side="right" onClick={() => paginate(1)} />
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === index ? 18 : 8,
              background: i === index ? "var(--c-accent)" : "var(--c-muted)",
              opacity: i === index ? 1 : 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function CarouselArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={side === "left" ? "Previous" : "Next"}
      className="z-10 mx-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{
        background: "var(--c-surface)",
        color: "var(--c-primary)",
        boxShadow: "0 4px 12px rgba(40,50,80,0.14)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
