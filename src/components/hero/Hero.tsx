import { AnimatePresence, motion } from "framer-motion";
import { LuMoon, LuSun } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { heroCopy, siteCopy } from "@/data/site";
import { EASE } from "@/lib/motion";
import { Parallax } from "@/components/motion/Parallax";
import { SplitText } from "@/components/motion/SplitText";
import { RotatingRole } from "./RotatingRole";

const heroLine = "/images/hero.png";

// Fades every background layer out before the section ends, so there is no visible seam with the next section
const FADE_BOTTOM = "[mask-image:linear-gradient(to_bottom,black_70%,transparent)]";

export function Hero() {
  const { lang, tr } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <section className="relative isolate overflow-hidden">
      {/* soft orange glow behind the illustration */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 ${FADE_BOTTOM} bg-[radial-gradient(circle_at_26%_58%,rgb(251_146_60/0.12),transparent_42%),radial-gradient(circle_at_80%_20%,rgb(0_0_0/0.05),transparent_45%)] dark:bg-[radial-gradient(circle_at_26%_58%,rgb(251_146_60/0.10),transparent_42%),radial-gradient(circle_at_80%_20%,rgb(255_255_255/0.05),transparent_45%)]`}
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-6xl flex-col px-6">
        {/* theme toggle */}
        <div className="flex justify-center pt-8 md:pt-12">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? siteCopy.theme.toLight[lang] : siteCopy.theme.toDark[lang]}
            className="glow-orange grid h-12 w-12 place-items-center rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {dark ? <LuMoon className="h-8 w-8" strokeWidth={1.6} /> : <LuSun className="h-8 w-8" strokeWidth={1.8} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="grid flex-1 items-center gap-10 py-12 md:grid-cols-2 md:gap-6 md:py-16">
          <Parallax distance={22} className="flex justify-center">
            <motion.img
              src={heroLine}
              alt={tr(heroCopy.imageAlt)}
              width={900}
              draggable={false}
              className="max-h-[420px] w-auto max-w-[78%] select-none object-contain md:max-h-[520px] dark:invert"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </Parallax>

          <div className="text-center md:text-left">
            <h1 className="text-3xl leading-tight md:text-4xl lg:text-[2.6rem]">
              <SplitText text={tr(heroCopy.greeting)} />
            </h1>
            <p className="mt-5 font-heading text-lg font-semibold md:text-xl">
              <RotatingRole roles={tr(heroCopy.roles)} />
              <span aria-hidden className="caret ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.2em] bg-orange-400 shadow-[0_0_8px_rgb(251_146_60)]" />
            </p>
            <motion.p
              key={lang}
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed md:mx-0 md:text-lg"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
            >
              {tr(heroCopy.description)}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
