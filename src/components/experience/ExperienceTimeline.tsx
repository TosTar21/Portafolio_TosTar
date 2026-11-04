import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { LuCalendar, LuMapPin } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { aboutCopy, experienceCopy, workExperience, type WorkExperience } from "@/data/about";
import { TechBadge } from "@/components/ui/TechBadge";
import { TiltCard } from "@/components/motion/TiltCard";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { EASE, viewportOnce } from "@/lib/motion";
import { cn } from "@/utils/cn";

function SummaryStrip() {
  const { tr } = useLanguage();
  const s = experienceCopy.summary;
  const present = tr(s.range).split("–")[1]?.trim() ?? "";
  return (
    <Reveal className="mt-6">
      <dl className="flex flex-col divide-y-2 divide-neutral-300 overflow-hidden rounded-lg border-2 border-neutral-300 bg-white sm:flex-row sm:divide-x-2 sm:divide-y-0 dark:divide-neutral-700 dark:border-neutral-700 dark:bg-[#1e1e1e]">
        <div className="flex-1 px-5 py-4">
          <dt className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{tr(s.sinceLabel)}</dt>
          <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
            <CountUp from={s.startYear - 24} to={s.startYear} duration={1.6} /> – {present}
          </dd>
        </div>
        <div className="flex-1 px-5 py-4">
          <dt className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{tr(s.rolesLabel)}</dt>
          <dd className="mt-1 font-heading text-xl font-bold tabular-nums">
            <CountUp to={workExperience.length} duration={1.2} /> {tr(s.rolesLabel)}
          </dd>
        </div>
        <div className="flex-[1.4] px-5 py-4">
          <dt className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{tr(s.pathLabel)}</dt>
          <dd className="mt-1 font-heading text-xl font-bold">{tr(s.path)}</dd>
        </div>
      </dl>
    </Reveal>
  );
}

/** Always fully expanded — every role shows its summary, achievements and stack without extra clicks */
function ExperienceItem({ exp }: { exp: WorkExperience }) {
  const { tr } = useLanguage();
  const ref = useRef<HTMLLIElement>(null);
  // node lights up once this entry reaches the middle of the viewport
  const lit = useInView(ref, { margin: "0px 0px -55% 0px", once: true });

  return (
    <motion.li
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* timeline node */}
      <span aria-hidden className="absolute -left-[38px] top-7 grid h-3.5 w-3.5 place-items-center">
        {exp.current && lit && <span className="pulse-ring absolute inset-0 rounded-full bg-orange-400/60" />}
        <span
          className={cn(
            "relative h-3.5 w-3.5 rounded-full border-2 transition-all duration-500",
            lit
              ? "border-orange-400 bg-orange-400 shadow-[0_0_12px_3px_rgb(251_146_60/0.55)]"
              : "border-neutral-400 bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-800",
          )}
        />
      </span>

      <TiltCard
        max={2}
        className="rounded-lg border-2 border-neutral-300 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-700 dark:bg-[#1e1e1e] dark:hover:border-neutral-500"
      >
        <div className="p-5 sm:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-heading text-lg font-bold leading-snug sm:text-xl">{tr(exp.company)}</h3>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/70 px-2.5 py-0.5 text-xs font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="pulse-ring absolute inset-0 rounded-full bg-orange-400" />
                      <span className="relative h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(251_146_60)]" />
                    </span>
                    {tr(experienceCopy.current)}
                  </span>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
                <LuCalendar aria-hidden className="h-3.5 w-3.5" />
                {tr(exp.period)}
              </span>
            </div>

            <p className="mt-1.5 font-heading text-base font-semibold">{tr(exp.position)}</p>

            {(exp.location || exp.mode) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-neutral-600 dark:text-neutral-300">
                {exp.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <LuMapPin aria-hidden className="h-3.5 w-3.5" />
                    {tr(exp.location)}
                  </span>
                )}
                {exp.mode && (
                  <span className="rounded-md border border-neutral-400 px-2 py-0.5 text-xs font-medium dark:border-neutral-500">
                    {tr(exp.mode)}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-200">{tr(exp.summary)}</p>
          </div>
        </div>

        <div className="border-t border-neutral-200 px-5 pb-6 pt-5 sm:px-6 dark:border-neutral-700">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            {tr(experienceCopy.achievements)}
          </p>
          <ul className="mt-3 space-y-2.5">
            {tr(exp.achievements).map((a, i) => (
              <motion.li
                key={a}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: 0.12 + i * 0.06, duration: 0.35 }}
                className="flex gap-3 text-sm leading-relaxed sm:text-base"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(251_146_60)]" />
                <span>{a}</span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-6 font-semibold">{tr(experienceCopy.technologies)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {exp.technologies.map((t) => (
              <li key={t}>
                <TechBadge name={t} size="md" className="!px-3 !py-1.5 !text-sm" />
              </li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </motion.li>
  );
}

export function ExperienceTimeline() {
  const { tr } = useLanguage();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 110, damping: 26, restDelta: 0.001 });

  return (
    <section aria-labelledby="experience-title" className="mt-20">
      <h2 id="experience-title" className="border-b-2 border-neutral-900 pb-2 text-xl dark:border-neutral-200">
        {tr(aboutCopy.experienceTitle)}
      </h2>

      <SummaryStrip />

      <ol ref={listRef} className="relative mt-10 space-y-6 pl-12">
        {/* base line + line that draws itself with scroll */}
        <span aria-hidden className="absolute bottom-2 left-4 top-2 w-0.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        <motion.span
          aria-hidden
          className="absolute bottom-2 left-4 top-2 w-0.5 origin-top rounded-full bg-orange-400 shadow-[0_0_10px_rgb(251_146_60/0.7)]"
          style={{ scaleY }}
        />
        {workExperience.map((exp) => (
          <ExperienceItem key={exp.company.en} exp={exp} />
        ))}
      </ol>
    </section>
  );
}
