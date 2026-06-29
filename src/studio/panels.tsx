"use client";

import { useState } from "react";
import type { Draft } from "./draft";
import { expiryFromDate, formatDisplayDate } from "./draft";
import { Field, TextInput, TextArea, Select, ColorInput, Btn, Group } from "./ui";
import { templates } from "@/templates/registry";
import { themeList, getTheme } from "@/themes";
import { motifList, getMotif } from "@/motifs";

export type PanelProps = {
  draft: Draft;
  update: (mutator: (d: Draft) => void) => void;
};

const splitList = (s: string) =>
  s.split(",").map((x) => x.trim()).filter(Boolean);

/* ------------------------------- DESIGN ------------------------------- */

export function DesignPanel({ draft, update }: PanelProps) {
  return (
    <div>
      <Field label="Layout">
        <Select
          value={draft.templateId}
          onChange={(v) => update((d) => { d.templateId = v; })}
          options={templates.map((t) => ({ value: t.id, label: t.name }))}
        />
      </Field>

      <Field label="Community (motifs & blessings)">
        <Select
          value={draft.motifId}
          onChange={(v) => update((d) => { d.motifId = v; })}
          options={motifList.map((m) => ({ value: m.id, label: m.name }))}
        />
      </Field>

      <p className="mb-2 mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
        Color Theme
      </p>
      <div className="grid grid-cols-2 gap-2">
        {themeList.map((t) => {
          const active = draft.theme.id === t.id;
          return (
            <button
              key={t.id}
              onClick={() => update((d) => { d.theme = structuredClone(getTheme(t.id)); })}
              className="overflow-hidden rounded-lg border text-left transition-all"
              style={{ borderColor: active ? t.colors.primary : "#e2e8f0", borderWidth: active ? 2 : 1 }}
            >
              <div className="flex h-8" style={{ background: `linear-gradient(90deg, ${t.colors.gradientFrom}, ${t.colors.gradientTo})` }}>
                {[t.colors.primary, t.colors.accent, t.colors.secondary].map((c) => (
                  <span key={c} className="my-auto ml-1 h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: c }} />
                ))}
              </div>
              <span className="block px-2 py-1 text-[11px] text-slate-600">{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ CONTENT ------------------------------ */

export function ContentPanel({ draft, update }: PanelProps) {
  const c = draft.content;
  const motif = getMotif(draft.motifId);
  const iconOptions = Object.keys(motif.icons).map((k) => ({ value: k, label: k }));

  return (
    <div>
      <Group title="Couple" open>
        <Field label="Name 1">
          <TextInput value={c.couple.partner1.name} onChange={(e) => update((d) => { d.content.couple.partner1.name = e.target.value; })} />
        </Field>
        <Field label="Name 2">
          <TextInput value={c.couple.partner2.name} onChange={(e) => update((d) => { d.content.couple.partner2.name = e.target.value; })} />
        </Field>
        <Field label="Connector"><TextInput value={c.couple.connector ?? ""} onChange={(e) => update((d) => { d.content.couple.connector = e.target.value; })} /></Field>
        <Field label="Monogram"><TextInput value={c.couple.monogram ?? ""} onChange={(e) => update((d) => { d.content.couple.monogram = e.target.value; })} /></Field>
      </Group>

      <Group title="Families">
        <Field label="Name 1 — Parents (father, mother)">
          <TextInput
            value={[c.couple.partner1.father, c.couple.partner1.mother].filter(Boolean).join(", ")}
            onChange={(e) => update((d) => { const [f, m] = splitList(e.target.value); d.content.couple.partner1.father = f ?? ""; d.content.couple.partner1.mother = m ?? ""; })}
          />
        </Field>
        <Field label="Name 1 — Siblings (comma separated)">
          <TextInput value={(c.couple.partner1.siblings ?? []).join(", ")} onChange={(e) => update((d) => { d.content.couple.partner1.siblings = splitList(e.target.value); })} />
        </Field>
        <Field label="Name 2 — Parents (father, mother)">
          <TextInput
            value={[c.couple.partner2.father, c.couple.partner2.mother].filter(Boolean).join(", ")}
            onChange={(e) => update((d) => { const [f, m] = splitList(e.target.value); d.content.couple.partner2.father = f ?? ""; d.content.couple.partner2.mother = m ?? ""; })}
          />
        </Field>
        <Field label="Name 2 — Siblings (comma separated)">
          <TextInput value={(c.couple.partner2.siblings ?? []).join(", ")} onChange={(e) => update((d) => { d.content.couple.partner2.siblings = splitList(e.target.value); })} />
        </Field>
        <Field label="Heading"><TextInput value={c.families.heading} onChange={(e) => update((d) => { d.content.families.heading = e.target.value; })} /></Field>
        <Field label="Footer line"><TextInput value={c.families.footer ?? ""} onChange={(e) => update((d) => { d.content.families.footer = e.target.value; })} /></Field>
      </Group>

      <Group title="Hero & Envelope">
        <Field label="Envelope tagline"><TextInput value={c.envelope.tagline ?? ""} onChange={(e) => update((d) => { d.content.envelope.tagline = e.target.value; })} /></Field>
        <Field label="Wax seal text"><TextInput value={c.envelope.seal ?? ""} onChange={(e) => update((d) => { d.content.envelope.seal = e.target.value; })} /></Field>
        <Field label="Marriage text"><TextInput value={c.hero.marriageText} onChange={(e) => update((d) => { d.content.hero.marriageText = e.target.value; })} /></Field>
        <Field label="Reveal date (display)"><TextInput value={c.dateReveal.eventDate} onChange={(e) => update((d) => { d.content.dateReveal.eventDate = e.target.value; })} /></Field>
        <Field label="Location"><TextInput value={c.dateReveal.location} onChange={(e) => update((d) => { d.content.dateReveal.location = e.target.value; })} /></Field>
      </Group>

      <Group title="Countdown">
        <Field label="Headline"><TextInput value={c.countdown.headline} onChange={(e) => update((d) => { d.content.countdown.headline = e.target.value; })} /></Field>
        <Field label="Subtext"><TextInput value={c.countdown.subtext ?? ""} onChange={(e) => update((d) => { d.content.countdown.subtext = e.target.value; })} /></Field>
      </Group>

      <Group title="Our Story">
        <Field label="Subtext"><TextInput value={c.story.subtext ?? ""} onChange={(e) => update((d) => { d.content.story.subtext = e.target.value; })} /></Field>
        {c.story.items.map((item, i) => (
          <div key={i} className="mb-2 rounded-md border border-slate-200 p-2">
            <Field label={`Caption ${i + 1}`}>
              <TextInput value={item.caption} onChange={(e) => update((d) => { d.content.story.items[i].caption = e.target.value; })} />
            </Field>
            <Btn variant="danger" onClick={() => update((d) => { d.content.story.items.splice(i, 1); })}>Remove</Btn>
          </div>
        ))}
        <Btn onClick={() => update((d) => { d.content.story.items.push({ photo: "", caption: "New moment" }); })}>+ Add photo slot</Btn>
        <p className="mt-1 text-[11px] text-slate-400">Upload the images in the Photos tab.</p>
      </Group>

      <Group title="Schedule of Events">
        <Field label="Subtext"><TextInput value={c.schedule.subtext ?? ""} onChange={(e) => update((d) => { d.content.schedule.subtext = e.target.value; })} /></Field>
        {c.schedule.events.map((ev, i) => (
          <div key={ev.id} className="mb-2 rounded-md border border-slate-200 p-2">
            <Field label="Event name"><TextInput value={ev.name} onChange={(e) => update((d) => { d.content.schedule.events[i].name = e.target.value; })} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Date"><TextInput value={ev.date} onChange={(e) => update((d) => { d.content.schedule.events[i].date = e.target.value; })} /></Field>
              <Field label="Time"><TextInput value={ev.time} onChange={(e) => update((d) => { d.content.schedule.events[i].time = e.target.value; })} /></Field>
            </div>
            <Field label="Venue"><TextInput value={ev.venue} onChange={(e) => update((d) => { d.content.schedule.events[i].venue = e.target.value; })} /></Field>
            <Field label="Address"><TextInput value={ev.address ?? ""} onChange={(e) => update((d) => { d.content.schedule.events[i].address = e.target.value; })} /></Field>
            <Field label="Map URL"><TextInput value={ev.mapUrl ?? ""} onChange={(e) => update((d) => { d.content.schedule.events[i].mapUrl = e.target.value; })} /></Field>
            <Field label="Icon"><Select value={ev.icon ?? "heart"} onChange={(v) => update((d) => { d.content.schedule.events[i].icon = v; })} options={iconOptions} /></Field>
            <Field label="Verse / blessing (optional)"><TextArea value={ev.verse ?? ""} onChange={(e) => update((d) => { d.content.schedule.events[i].verse = e.target.value; })} /></Field>
            <Field label="Verse reference"><TextInput value={ev.verseRef ?? ""} onChange={(e) => update((d) => { d.content.schedule.events[i].verseRef = e.target.value; })} /></Field>
            <Btn variant="danger" onClick={() => update((d) => { d.content.schedule.events.splice(i, 1); })}>Remove event</Btn>
          </div>
        ))}
        <Btn onClick={() => update((d) => { d.content.schedule.events.push({ id: `event-${d.content.schedule.events.length + 1}-${Date.now()}`, name: "New Event", date: "", time: "", venue: "", icon: "heart" }); })}>+ Add event</Btn>
      </Group>

      <Group title="RSVP">
        <Field label="Heading"><TextInput value={c.rsvp.heading} onChange={(e) => update((d) => { d.content.rsvp.heading = e.target.value; })} /></Field>
        <Field label="Prompt"><TextInput value={c.rsvp.prompt} onChange={(e) => update((d) => { d.content.rsvp.prompt = e.target.value; })} /></Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Accept label"><TextInput value={c.rsvp.acceptLabel} onChange={(e) => update((d) => { d.content.rsvp.acceptLabel = e.target.value; })} /></Field>
          <Field label="Decline label"><TextInput value={c.rsvp.declineLabel} onChange={(e) => update((d) => { d.content.rsvp.declineLabel = e.target.value; })} /></Field>
        </div>
        <Field label="Submit button"><TextInput value={c.rsvp.submitLabel} onChange={(e) => update((d) => { d.content.rsvp.submitLabel = e.target.value; })} /></Field>
        <Field label="Footer line"><TextInput value={c.rsvp.footer ?? ""} onChange={(e) => update((d) => { d.content.rsvp.footer = e.target.value; })} /></Field>
      </Group>
    </div>
  );
}

/* ------------------------------ COLORS ------------------------------ */

const FONTS = [
  { value: "var(--font-cinzel)", label: "Cinzel (serif caps)" },
  { value: "var(--font-cormorant)", label: "Cormorant (serif)" },
  { value: "var(--font-greatvibes)", label: "Great Vibes (script)" },
  { value: "var(--font-jost)", label: "Jost (sans)" },
];

const COLOR_TOKENS: { key: keyof Draft["theme"]["colors"]; label: string }[] = [
  { key: "primary", label: "Primary (headings)" },
  { key: "secondary", label: "Secondary (script)" },
  { key: "accent", label: "Accent (gold/ornaments)" },
  { key: "text", label: "Body text" },
  { key: "muted", label: "Muted text" },
  { key: "bg", label: "Background" },
  { key: "surface", label: "Surface (cards)" },
  { key: "gradientFrom", label: "Gradient from" },
  { key: "gradientTo", label: "Gradient to" },
];

export function ColorsPanel({ draft, update }: PanelProps) {
  const markCustom = (d: Draft) => { d.theme.id = "custom"; d.theme.name = "Custom"; };
  return (
    <div>
      <p className="mb-3 text-[11px] text-slate-400">
        Editing creates a “Custom” theme. Pick a base theme in the Design tab to start over.
      </p>
      {COLOR_TOKENS.map((t) => (
        <Field key={t.key} label={t.label}>
          <ColorInput
            value={draft.theme.colors[t.key]}
            onChange={(v) => update((d) => { d.theme.colors[t.key] = v; markCustom(d); })}
          />
        </Field>
      ))}

      <Group title="Fonts">
        <Field label="Display (headings)"><Select value={draft.theme.fonts.display} onChange={(v) => update((d) => { d.theme.fonts.display = v; markCustom(d); })} options={FONTS} /></Field>
        <Field label="Script (names)"><Select value={draft.theme.fonts.script} onChange={(v) => update((d) => { d.theme.fonts.script = v; markCustom(d); })} options={FONTS} /></Field>
        <Field label="Body"><Select value={draft.theme.fonts.body} onChange={(v) => update((d) => { d.theme.fonts.body = v; markCustom(d); })} options={FONTS} /></Field>
      </Group>

      <Group title="Particles">
        <Field label="Type">
          <Select
            value={draft.theme.particles.type}
            onChange={(v) => update((d) => { d.theme.particles.type = v as "petals" | "sparkles" | "none"; markCustom(d); })}
            options={[{ value: "petals", label: "Petals" }, { value: "sparkles", label: "Sparkles" }, { value: "none", label: "None" }]}
          />
        </Field>
        <Field label="Color"><ColorInput value={draft.theme.particles.color} onChange={(v) => update((d) => { d.theme.particles.color = v; markCustom(d); })} /></Field>
      </Group>
    </div>
  );
}

/* ------------------------------ PHOTOS ------------------------------ */

export function PhotosPanel({ draft, update }: PanelProps) {
  const items = draft.content.story.items;
  const onFile = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update((d) => { d.content.story.items[idx].photo = String(reader.result); });
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <p className="mb-3 text-[11px] text-slate-400">
        Phase 3: photos are stored locally in your browser. They’ll upload to your account later.
      </p>
      {items.map((item, i) => (
        <div key={i} className="mb-3 flex items-center gap-3 rounded-lg border border-slate-200 p-2">
          <div className="h-16 w-14 shrink-0 overflow-hidden rounded bg-slate-100">
            {item.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.photo} alt={item.caption} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-400">none</div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-slate-600">{item.caption}</p>
            <input type="file" accept="image/*" onChange={(e) => onFile(e, i)} className="mt-1 block w-full text-[11px] text-slate-500 file:mr-2 file:rounded file:border-0 file:bg-slate-800 file:px-2 file:py-1 file:text-white" />
          </div>
        </div>
      ))}
      {items.length === 0 ? <p className="text-xs text-slate-400">Add photo slots in the Content tab first.</p> : null}
    </div>
  );
}

/* ------------------------------ SETTINGS ------------------------------ */

export function SettingsPanel({ draft, update }: PanelProps) {
  const [autoExpiry, setAutoExpiry] = useState(true);
  const dt = draft.content.countdown.targetDate.slice(0, 16); // YYYY-MM-DDTHH:mm

  const onDate = (value: string) => {
    update((d) => {
      d.content.countdown.targetDate = value;
      d.content.dateReveal.eventDate = formatDisplayDate(value);
      if (autoExpiry) d.content.expiry.expiresAt = expiryFromDate(value);
    });
  };

  return (
    <div>
      <Field label="Your email" hint="We’ll email you the RSVP attendee list (Excel) for this invite.">
        <TextInput type="email" value={draft.ownerEmail} placeholder="you@example.com" onChange={(e) => update((d) => { d.ownerEmail = e.target.value; })} />
      </Field>

      <Field label="URL slug" hint="Your invite will live at /i/<slug>">
        <TextInput value={draft.content.meta.slug} onChange={(e) => update((d) => { d.content.meta.slug = e.target.value.replace(/\s+/g, "-").toLowerCase(); })} />
      </Field>

      <Field label="Wedding date & time">
        <TextInput type="datetime-local" value={dt} onChange={(e) => onDate(e.target.value)} />
      </Field>

      <label className="mb-2 flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={autoExpiry}
          onChange={(e) => {
            setAutoExpiry(e.target.checked);
            if (e.target.checked) update((d) => { d.content.expiry.expiresAt = expiryFromDate(d.content.countdown.targetDate); });
          }}
        />
        Auto-expire 1 day after the wedding date
      </label>

      <Field label="Invitation expires on" hint={autoExpiry ? "Auto-set to wedding date + 1 day." : "Set a custom expiry date."}>
        <TextInput
          type="date"
          disabled={autoExpiry}
          value={draft.content.expiry.expiresAt}
          onChange={(e) => update((d) => { d.content.expiry.expiresAt = e.target.value; })}
        />
      </Field>

      <Field label="Music track URL (optional)">
        <TextInput value={draft.content.music.trackUrl ?? ""} placeholder="https://…/song.mp3" onChange={(e) => update((d) => { d.content.music.trackUrl = e.target.value; })} />
      </Field>

      <Field label="Directions button URL">
        <TextInput value={draft.content.map.directionsUrl ?? ""} onChange={(e) => update((d) => { d.content.map.directionsUrl = e.target.value; })} />
      </Field>
    </div>
  );
}
