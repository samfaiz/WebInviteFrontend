"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { RenderProps } from "@/engine/types";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ParticleField } from "@/components/ParticleField";
import { MusicToggle } from "@/components/MusicToggle";
import { MonogramCrest, Divider } from "@/components/Ornaments";
import { EnvelopeIntro } from "@/blocks/EnvelopeIntro";
import { Hero } from "@/blocks/Hero";
import { Countdown } from "@/blocks/Countdown";
import { Families } from "@/blocks/Families";
import { StoryCarousel } from "@/blocks/StoryCarousel";
import { Schedule } from "@/blocks/Schedule";
import { RSVPForm } from "@/blocks/RSVPForm";

/**
 * Flagship template ("Lake Como Romance") — composes the block library into the
 * reference layout, rendering entirely from the InvitationContent passed in.
 * The `intro={false}` prop skips the envelope (used by gallery thumbnails / Studio preview).
 */
export function FlagshipTemplate({
  content,
  theme,
  motif,
  intro = true,
  live = false,
}: RenderProps & { intro?: boolean; live?: boolean }) {
  const [opened, setOpened] = useState(!intro);

  return (
    <ThemeProvider theme={theme} className="relative min-h-screen overflow-x-hidden">
      <SmoothScroll />
      <ParticleField type={theme.particles.type} color={theme.particles.color} />

      <AnimatePresence>
        {!opened ? (
          <EnvelopeIntro
            key="envelope"
            tagline={content.envelope.tagline}
            seal={content.envelope.seal}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <main>
        <Hero content={content} />
        <Countdown
          targetDate={content.countdown.targetDate}
          headline={content.countdown.headline}
          subtext={content.countdown.subtext}
        />
        <Families content={content} />
        <StoryCarousel content={content} />
        <Schedule content={content} motif={motif} />
        <RSVPForm content={content} live={live} />

        <footer className="px-6 pb-24 pt-6 text-center">
          <MonogramCrest monogram={content.couple.monogram} size={72} />
          <p className="font-script mt-3 text-3xl" style={{ color: "var(--c-primary)" }}>
            {content.couple.partner1.name} &amp; {content.couple.partner2.name}
          </p>
          <Divider className="my-5" width={70} />
          <p
            className="font-display text-[10px] uppercase tracking-[0.24em]"
            style={{ color: "var(--c-muted)" }}
          >
            With love &amp; blessings
          </p>
        </footer>
      </main>

      <MusicToggle trackUrl={content.music.trackUrl} />
    </ThemeProvider>
  );
}
