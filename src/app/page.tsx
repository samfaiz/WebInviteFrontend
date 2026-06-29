import { FlagshipTemplate } from "@/templates/flagship/FlagshipTemplate";
import { sampleSurajLibina } from "@/data/sampleSurajLibina";
import { getTheme } from "@/themes";
import { getMotif } from "@/motifs";

/**
 * Phase 1 demo: the flagship template rendered from sample JSON.
 * (Later this route becomes the marketing landing page; invites live at /i/[slug].)
 */
export default function Home() {
  return (
    <FlagshipTemplate
      content={sampleSurajLibina}
      theme={getTheme("dusty-blue")}
      motif={getMotif(sampleSurajLibina.meta.community)}
    />
  );
}
