import { LuDownload } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { siteCopy } from "@/data/site";
import { Reveal } from "@/components/motion/Reveal";

export default function Resume() {
  const { tr } = useLanguage();
  const r = siteCopy.resume;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl md:text-5xl">{tr(r.title)}</h1>
        <a
          href={r.file}
          download="CV_Oscar_Zuñiga_Sanchez_2026.pdf"
          className="glow-orange inline-flex items-center gap-2 rounded-md border-2 border-neutral-900 px-5 py-2.5 text-sm font-medium transition-colors hover:border-orange-400 dark:border-neutral-200"
        >
          <LuDownload aria-hidden className="h-4 w-4" />
          {tr(r.download)}
        </a>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#1a1a1a]">
        <object data={`${r.file}#view=FitH`} type="application/pdf" className="h-[calc(100svh-12rem)] w-full">
          <p className="p-8 text-center">
            {tr(r.fallback)}
            <a href={r.file} target="_blank" rel="noopener noreferrer" className="link-underline text-orange-500 dark:text-orange-300">
              {tr(r.open)}
            </a>
            .
          </p>
        </object>
      </Reveal>
    </div>
  );
}