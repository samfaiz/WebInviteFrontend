"use client";

import { useState } from "react";
import Link from "next/link";
import { presets, templates, getTemplateMeta, presetCount } from "@/templates/registry";
import { getTheme } from "@/themes";
import { getMotif } from "@/motifs";

const communities = [
  { id: "kerala-christian", label: "Christian" },
  { id: "hindu", label: "Hindu" },
  { id: "muslim", label: "Muslim" },
  { id: "secular", label: "Secular" },
];

export default function GalleryPage() {
  const [community, setCommunity] = useState("kerala-christian");
  const [templateId, setTemplateId] = useState("all");

  const shown = presets.filter(
    (p) =>
      p.community === community &&
      (templateId === "all" || p.templateId === templateId)
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-6 py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-end gap-4 text-sm">
          <Link href="/dashboard" className="text-slate-500 hover:text-slate-800">My invitations</Link>
          <Link href="/login" className="text-slate-500 hover:text-slate-800">Log in</Link>
        </div>
        <header className="text-center">
          <h1 className="font-display text-3xl uppercase tracking-[0.12em] text-[#2b3a67]">
            Choose Your Design
          </h1>
          <p className="font-body mt-2 text-lg italic text-[#7c8aa0]">
            {presetCount(community)} designs for{" "}
            {communities.find((c) => c.id === community)?.label} — customize everything in the Studio.
          </p>
        </header>

        {/* community filter */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {communities.map((c) => (
            <button
              key={c.id}
              onClick={() => setCommunity(c.id)}
              className="font-display rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-all"
              style={{
                background: community === c.id ? "#2b3a67" : "#fff",
                color: community === c.id ? "#fff" : "#2b3a67",
                border: "1px solid rgba(43,58,103,0.2)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* template filter */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {[{ id: "all", name: "All Styles" }, ...templates].map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplateId(t.id)}
              className="font-body rounded-full px-4 py-1.5 text-xs transition-all"
              style={{
                background: templateId === t.id ? "#b08d57" : "transparent",
                color: templateId === t.id ? "#fff" : "#8a7a55",
                border: "1px solid rgba(176,141,87,0.4)",
              }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* preset grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((preset) => {
            const theme = getTheme(preset.themeId);
            const motif = getMotif(preset.motifId);
            const tpl = getTemplateMeta(preset.templateId);
            return (
              <div
                key={preset.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/preview/${preset.id}`} className="block">
                <div
                  className="relative h-44"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo})`,
                  }}
                >
                  <span
                    className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.12em]"
                    style={{ background: "rgba(255,255,255,0.7)", color: theme.colors.primary }}
                  >
                    {tpl.name}
                  </span>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-script text-4xl" style={{ color: theme.colors.primary }}>
                      S &amp; L
                    </span>
                    <span
                      className="font-display mt-1 text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: theme.colors.accent }}
                    >
                      {Object.values(motif.icons).slice(0, 4).join("  ")}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {[theme.colors.primary, theme.colors.accent, theme.colors.secondary, theme.colors.surface].map(
                      (c) => (
                        <span
                          key={c}
                          className="h-3 w-3 rounded-full ring-1 ring-black/10"
                          style={{ background: c }}
                        />
                      )
                    )}
                  </div>
                </div>
                </Link>
                <div className="p-4">
                  <p className="font-display text-sm uppercase tracking-[0.12em] text-[#2b3a67]">
                    {preset.name}
                  </p>
                  <p className="font-body text-sm text-[#7c8aa0]">{motif.name}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <Link
                      href={`/preview/${preset.id}`}
                      className="font-display text-[11px] uppercase tracking-[0.16em] text-[#b08d57] hover:underline"
                    >
                      Preview →
                    </Link>
                    <Link
                      href={`/studio?preset=${preset.id}`}
                      className="font-display text-[11px] uppercase tracking-[0.16em] text-[#2b3a67] hover:underline"
                    >
                      Customize →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
