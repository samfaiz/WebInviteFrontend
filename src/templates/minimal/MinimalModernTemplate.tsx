"use client";

import type { CSSProperties } from "react";
import type { RenderProps } from "@/engine/types";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ParticleField } from "@/components/ParticleField";
import { MusicToggle } from "@/components/MusicToggle";
import { Divider } from "@/components/Ornaments";
import { HeroMinimal } from "@/blocks/HeroMinimal";
import { Countdown } from "@/blocks/Countdown";
import { Families } from "@/blocks/Families";
import { StoryGrid } from "@/blocks/StoryGrid";
import { TimelineSchedule } from "@/blocks/TimelineSchedule";
import { RSVPForm } from "@/blocks/RSVPForm";

/**
 * "Minimal Modern" — clean contemporary layout. Sans display type (Jost), no
 * envelope intro, restrained particles. Reuses the shared blocks with the font
 * tokens overridden to a geometric sans for a modern feel.
 */
export function MinimalModernTemplate({
  content,
  theme,
  motif,
  live = false,
}: RenderProps & { intro?: boolean; live?: boolean }) {
  // Override display/body fonts to the sans for descendants; keep script accents.
  const sansOverride = {
    "--f-display": "var(--font-jost)",
    "--f-body": "var(--font-jost)",
  } as CSSProperties;

  return (
    <ThemeProvider theme={theme} className="relative min-h-screen overflow-x-hidden">
      <div style={sansOverride}>
        <SmoothScroll />
        <ParticleField type={theme.particles.type} color={theme.particles.color} count={6} />

        <main>
          <HeroMinimal content={content} />
          <Countdown
            targetDate={content.countdown.targetDate}
            headline={content.countdown.headline}
            subtext={content.countdown.subtext}
          />
          <Families content={content} />
          <StoryGrid content={content} />
          <TimelineSchedule content={content} motif={motif} />
          <RSVPForm content={content} live={live} />

          <footer className="px-6 pb-24 pt-6 text-center">
            <p
              className="text-2xl"
              style={{ fontFamily: "var(--font-jost)", fontWeight: 300, color: "var(--c-primary)" }}
            >
              {content.couple.partner1.name} &amp; {content.couple.partner2.name}
            </p>
            <Divider className="my-5" width={70} />
            <p
              className="text-[10px] uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-jost)", color: "var(--c-muted)" }}
            >
              With love
            </p>
          </footer>
        </main>

        <MusicToggle trackUrl={content.music.trackUrl} />
      </div>
    </ThemeProvider>
  );
}
