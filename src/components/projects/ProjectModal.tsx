import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight, LuExternalLink, LuX } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { projectsCopy, type Project } from "@/data/projects";
import { TechBadge } from "@/components/ui/TechBadge";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";

interface ProjectModalProps {
  project: Project | null;
  index: number;
  total: number;
  onClose: () => void;
  onNavigate: (dir: 1 | -1) => void;
}

const iconButton =
  "glow-orange grid h-9 w-9 place-items-center rounded-md border border-neutral-300 transition-colors hover:border-orange-400 dark:border-neutral-700";

function Gallery({ project }: { project: Project }) {
  const { lang, tr } = useLanguage();
  const images = [project.image, ...(project.gallery ?? [])];
  const [active, setActive] = useState(0);
  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 shadow-[0_8px_30px_rgb(0_0_0/0.08)] dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-[0_8px_30px_rgb(0_0_0/0.4)]">
        <div aria-hidden className="flex h-5 items-center gap-1 border-b border-neutral-200 px-2 dark:border-neutral-700">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400/80" />
        </div>
        <img src={current} alt={`${projectsCopy.modal.gallery[lang]} — ${tr(project.title)}`} className="aspect-[16/10] w-full object-cover object-top" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-2">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  "overflow-hidden rounded-md border-2 transition-colors",
                  i === active ? "border-orange-400" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <img src={src} alt="" loading="lazy" className="aspect-[16/10] w-20 object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Content({ project }: { project: Project }) {
  const { lang, tr } = useLanguage();
  const m = projectsCopy.modal;
  const status = project.placeholder ? "placeholder" : project.liveDemo ? "live" : "private";
  const meta: { label: string; value: string }[] = [
    ...(project.year ? [{ label: m.year[lang], value: project.year }] : []),
    { label: m.status[lang], value: projectsCopy.status[status][lang] },
    { label: m.type[lang], value: tr(projectsCopy.categoryLabel[project.category]) },
  ];

  return (
    <div className="space-y-8 px-6 pb-10 pt-6 sm:px-8">
      <Gallery project={project} />

      <div>
        <DialogTitle as="h2" className="text-2xl leading-snug md:text-3xl">
          {tr(project.title)}
        </DialogTitle>
        <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {meta.map((x) => (
            <div key={x.label}>
              <dt className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{x.label}</dt>
              <dd className="mt-0.5 font-heading text-sm font-semibold">{x.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="leading-relaxed text-neutral-700 dark:text-neutral-200">{tr(project.summary)}</p>

      {project.role && (
        <section>
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{m.role[lang]}</h3>
          <p className="mt-2">{tr(project.role)}</p>
        </section>
      )}

      {project.features && (
        <section>
          <h3 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{m.features[lang]}</h3>
          <ul className="mt-3 space-y-2.5">
            {tr(project.features).map((f) => (
              <li key={f} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400 shadow-[0_0_8px_rgb(251_146_60)]" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{m.stack[lang]}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.badges.map((b) => (
            <li key={b}>
              <TechBadge name={b} size="md" link />
            </li>
          ))}
        </ul>
      </section>

      {(project.liveDemo || project.github) && (
        <div className="flex flex-wrap gap-3">
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer noopener"
              className="glow-orange inline-flex items-center gap-2 rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
            >
              <LuExternalLink aria-hidden className="h-4 w-4" />
              {m.liveDemo[lang]}
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="glow-orange inline-flex items-center gap-2 rounded-md border-2 border-neutral-900 px-5 py-2 text-sm font-medium transition-colors hover:border-orange-400 dark:border-neutral-200"
            >
              <FaGithub aria-hidden className="h-4 w-4" />
              {m.github[lang]}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/** Right-side panel with the full project; prev/next with buttons or ←/→ */
export function ProjectModal({ project, index, total, onClose, onNavigate }: ProjectModalProps) {
  const { lang } = useLanguage();
  const m = projectsCopy.modal;
  const open = project !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onNavigate]);

  return (
    <AnimatePresence>
      {project && (
        <Dialog static open onClose={onClose} className="relative z-[75]">
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            className="fixed inset-y-0 right-0 flex w-full max-w-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <DialogPanel className="flex h-full w-full flex-col bg-white text-black shadow-2xl dark:bg-[#1e1e1e] dark:text-white">
              <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-6 py-4 sm:px-8 dark:border-neutral-800">
                <p className="font-heading text-sm font-semibold tabular-nums text-neutral-500 dark:text-neutral-400">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => onNavigate(-1)} aria-label={m.prev[lang]} className={iconButton}>
                    <LuChevronLeft className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={() => onNavigate(1)} aria-label={m.next[lang]} className={iconButton}>
                    <LuChevronRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={onClose} aria-label={m.close[lang]} className={cn(iconButton, "ml-2")}>
                    <LuX className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <Content project={project} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </DialogPanel>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
