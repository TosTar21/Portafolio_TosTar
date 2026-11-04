import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/data/about";
import { EASE } from "@/lib/motion";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";

/** Identity block: photo + name, title and bio */
export function AboutIntro() {
  const { lang, tr } = useLanguage();

  return (
    <section aria-labelledby="about-title" className="grid items-center gap-10 pt-12 md:grid-cols-[auto_1fr] md:gap-12 md:pt-20">
      <motion.div
        className="mx-auto"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <TiltCard max={4} className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-800 dark:bg-[#1a1a1a]">
          <img
            src={profile.image}
            alt={profile.name}
            className="h-72 w-60 rounded-xl object-cover object-top md:h-80 md:w-64"
          />
        </TiltCard>
      </motion.div>

      <div className="text-center md:text-left">
        <h1 id="about-title" className="text-3xl leading-tight md:text-4xl">
          <SplitText text={profile.name} />
        </h1>
        <p className="mt-3 font-heading text-lg font-semibold text-orange-500 md:text-xl dark:text-orange-300">{tr(profile.title)}</p>
        <motion.p
          key={lang}
          className="mx-auto mt-5 max-w-2xl leading-relaxed text-neutral-700 md:mx-0 md:text-lg dark:text-neutral-200"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          {tr(profile.description)}
        </motion.p>
      </div>
    </section>
  );
}
