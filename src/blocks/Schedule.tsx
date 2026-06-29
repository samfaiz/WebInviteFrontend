"use client";

import { motion } from "framer-motion";
import type { EventItem, InvitationContent, MotifPack } from "@/engine/types";
import { Divider } from "@/components/Ornaments";
import { Reveal } from "@/components/Reveal";

function EventCard({
  event,
  motif,
  index,
}: {
  event: EventItem;
  motif: MotifPack;
  index: number;
}) {
  const icon = (event.icon && motif.icons[event.icon]) || motif.icons.heart || "♥";
  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative mx-auto w-full max-w-md rounded-sm px-8 py-9 text-center"
        style={{
          background:
            "linear-gradient(180deg, var(--c-surface), color-mix(in srgb, var(--c-grad-from) 50%, var(--c-surface)))",
          boxShadow: "0 16px 38px rgba(40,50,80,0.14)",
          // inner double frame
          outline: "1px solid color-mix(in srgb, var(--c-accent) 40%, transparent)",
          outlineOffset: -10,
        }}
      >
        <p
          className="font-display text-xs uppercase tracking-[0.22em]"
          style={{ color: "var(--c-primary)" }}
        >
          {event.date}
        </p>
        <div className="my-4 text-3xl" style={{ color: "var(--c-accent)" }} aria-hidden>
          {icon}
        </div>
        <h3 className="font-script text-4xl" style={{ color: "var(--c-primary)" }}>
          {event.name}
        </h3>
        <Divider className="my-4" width={60} />
        <p className="font-display text-sm tracking-[0.12em]" style={{ color: "var(--c-text)" }}>
          {event.time}
        </p>
        <p
          className="font-display mt-3 text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--c-accent)" }}
        >
          Venue
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
          <div className="mt-5">
            <p className="font-body text-sm italic" style={{ color: "var(--c-secondary)" }}>
              “{event.verse}”
            </p>
            {event.verseRef ? (
              <p
                className="font-display mt-1 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "var(--c-muted)" }}
              >
                {event.verseRef}
              </p>
            ) : null}
          </div>
        ) : null}

        {event.mapUrl ? (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display mt-5 inline-block text-[11px] uppercase tracking-[0.18em] underline-offset-4 hover:underline"
            style={{ color: "var(--c-secondary)" }}
          >
            ♥ Get Directions
          </a>
        ) : null}
      </motion.article>
    </Reveal>
  );
}

export function Schedule({
  content,
  motif,
}: {
  content: InvitationContent;
  motif: MotifPack;
}) {
  if (!content.schedule.events.length) return null;

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

      <div className="mx-auto flex max-w-md flex-col gap-8">
        {content.schedule.events.map((event, i) => (
          <EventCard key={event.id} event={event} motif={motif} index={i} />
        ))}
      </div>
    </section>
  );
}
