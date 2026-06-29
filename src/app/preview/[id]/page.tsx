import { notFound } from "next/navigation";
import { getTemplateComponent } from "@/templates/components";
import { getPreset } from "@/templates/registry";
import { sampleSurajLibina } from "@/data/sampleSurajLibina";
import { getTheme } from "@/themes";
import { getMotif } from "@/motifs";

/** Live full-page preview of a gallery preset (template × theme × motif). */
export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const preset = getPreset(id);
  if (!preset) notFound();

  const Template = getTemplateComponent(preset.templateId);
  return (
    <Template
      content={sampleSurajLibina}
      theme={getTheme(preset.themeId)}
      motif={getMotif(preset.motifId)}
    />
  );
}
