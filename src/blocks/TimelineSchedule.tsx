"use client";

import { motion } from "framer-motion";
import type { InvitationContent, MotifPack } from "@/engine/types";
import { Divider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

/**
 * Schedule as a vertical timeline (alternative to the torn-paper cards). A center
 * line with alternating event nodes. Used by the Royal Ornate / Minimal templates.
 */
export function TimelineSchedule({
  content,
  motif,
}: {
  content: InvitationContent;
  motif: MotifPack;
}) {
  const events = content.schedule.events;
  if (!events.length) return null;
  return (
    <section className="px-6 py-20 text-center">
      <Reveal>
        <h2
          className="font-display text-2xl uppercase tracking-[0.12em] sm:text-3xl"
          style={{ color: "var(--c-primary)" }}
        >
          {content.schedule.heading}
        </h2>
        {content.schedule.subtext ? (
          <p
            className="font-display mt-3 text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--c-accent)" }}
          >
            {content.schedule.subtext}
          </p>
        ) : null}
        <Divider className="my-8" width={100} />
      </Reveal>

      <div className="relative mx-auto max-w-xl">
        {/* center line */}
        <span
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 sm:block"
          style={{ background: "color-mix(in srgb, var(--c-accent) 45%, transparent)" }}
          aria-hidden
        />
        <div className="flex flex-col gap-10">
          {events.map((event, i) => {
            const icon = (event.icon && motif.icons[event.icon]) || motif.icons.heart || "♥";
            const left = i % 2 === 0;
            return (
              <Reveal key={event.id} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col items-center sm:w-1/2 ${
                    left ? "sm:items-end sm:self-start sm:pr-10" : "sm:items-start sm:self-end sm:pl-10"
                  }`}
                >
                  {/* node */}
                  <span
                    className="absolute top-1 hidden h-3 w-3 rounded-full sm:block"
                    style={{
                      background: "var(--c-accent)",
                      [left ? "right" : "left"]: -6,
                    }}
                    aria-hidden
                  />
                  <div className={`text-center ${left ? "sm:text-right" : "sm:text-left"}`}>
                    <div className="text-2xl" style={{ color: "var(--c-accent)" }} aria-hidden>
                      {icon}
                    </div>
                    <h3 className="font-script text-3xl" style={{ color: "var(--c-primary)" }}>
                      {event.name}
                    </h3>
                    <p
                      className="font-display text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "var(--c-secondary)" }}
                    >
                      {event.date} · {event.time}
                    </p>
                    <p className="font-body text-base" style={{ color: "var(--c-text)" }}>
                      {event.venue}
                    </p>
                    {event.address ? (
                      <p className="font-body text-sm" style={{ color: "var(--c-muted)" }}>
                        {event.address}
                      </p>
                    ) : null}
                    {event.verse ? (
                      <p className="font-body mt-2 text-sm italic" style={{ color: "var(--c-secondary)" }}>
                        “{event.verse}” {event.verseRef ? `— ${event.verseRef}` : ""}
                      </p>
                    ) : null}
                    {event.mapUrl ? (
                      <a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display mt-2 inline-block text-[10px] uppercase tracking-[0.16em] underline-offset-4 hover:underline"
                        style={{ color: "var(--c-secondary)" }}
                      >
                        ♥ Directions
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
