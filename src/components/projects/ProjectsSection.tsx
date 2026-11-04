import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { PAGE_SIZE, projects, projectsCopy } from "@/data/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { FilterBar, type Filter, type ViewMode } from "./FilterBar";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { cn } from "@/utils/cn";

const HASH_PREFIX = "#project-";

type Tile = "wide" | "half";

/**
 * Two-column bento, repeated every 3 projects:
 *   [        wide        ]
 *   [  half  ][  half    ]
 * Every tile shows the same information; only the arrangement changes.
 * A half tile left alone on the last row is widened so the grid never leaves a hole.
 */
const CYCLE: Tile[] = ["wide", "half", "half"];
function bentoLayout(count: number): Tile[] {
  const tiles = Array.from({ length: count }, (_, i) => CYCLE[i % CYCLE.length]);
  if (count % CYCLE.length === 2) tiles[count - 1] = "wide";
  return tiles;
}

function idFromHash(): string | null {
  const h = window.location.hash;
  if (!h.startsWith(HASH_PREFIX)) return null;
  const id = decodeURIComponent(h.slice(HASH_PREFIX.length));
  return projects.some((p) => p.id === id) ? id : null;
}

export function ProjectsSection() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<ViewMode>("grid");
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(() => idFromHash());

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: projects.length, web: 0, system: 0, ai: 0, ecommerce: 0 };
    projects.forEach((p) => (c[p.category] += 1));
    return c;
  }, []);

  const filtered = useMemo(() => (filter === "all" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hidden = filtered.length - visible.length;
  const tiles = useMemo(() => bentoLayout(visible.length), [visible.length]);

  // URL hash (#project-<id>) — deep-linkable modal, no router history spam
  const open = useCallback((id: string) => {
    setSelectedId(id);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${HASH_PREFIX}${id}`);
  }, []);
  const close = useCallback(() => {
    setSelectedId(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, []);
  useEffect(() => {
    const onHash = () => setSelectedId(idFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const navList = filtered.some((p) => p.id === selectedId) ? filtered : projects;
  const selectedIndex = navList.findIndex((p) => p.id === selectedId);
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (selectedIndex < 0) return;
      const next = navList[(selectedIndex + dir + navList.length) % navList.length];
      open(next.id);
    },
    [navList, selectedIndex, open],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 px-6 pb-24 pt-8 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <Parallax distance={10}>
          <Reveal className="text-center">
            <h2 id="projects-title" className="text-4xl md:text-5xl">
              {projectsCopy.title[lang]}
            </h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300" aria-live="polite">
              {projectsCopy.counter[lang](visible.length, filtered.length)}
            </p>
          </Reveal>
        </Parallax>

        <Reveal className="mt-8" delay={0.1}>
          <FilterBar
            filter={filter}
            onFilter={(f) => {
              setFilter(f);
              setShowAll(false);
            }}
            counts={counts}
            view={view}
            onView={setView}
          />
        </Reveal>

        <motion.ul layout className={cn("relative mt-8 grid", view === "grid" ? "gap-5 lg:grid-cols-2" : "grid-cols-1 gap-2")}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, opacity: { duration: 0.25 } }}
                className={cn(view === "grid" && tiles[i] === "wide" && "lg:col-span-2")}
              >
                <ProjectCard project={p} variant={view === "list" ? "list" : tiles[i]} onOpen={open} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && <p className="mt-10 text-center text-neutral-500">{projectsCopy.empty[lang]}</p>}

        {filtered.length > PAGE_SIZE && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              aria-expanded={showAll}
              className="glow-orange inline-flex items-center gap-2 rounded-md border-2 border-neutral-900 px-5 py-2.5 text-sm font-medium transition-colors hover:border-orange-400 dark:border-neutral-200"
            >
              {showAll ? projectsCopy.showLess[lang] : `${projectsCopy.showMore[lang]} (+${hidden})`}
              <LuChevronDown aria-hidden className={cn("h-4 w-4 transition-transform", showAll && "rotate-180")} />
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} index={Math.max(selectedIndex, 0)} total={navList.length} onClose={close} onNavigate={navigate} />
    </section>
  );
}
