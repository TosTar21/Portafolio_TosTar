import { motion } from "framer-motion";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { projectsCopy, type ProjectCategory } from "@/data/projects";
import { cn } from "@/utils/cn";

export type Filter = "all" | ProjectCategory;
export type ViewMode = "grid" | "list";

const FILTERS: Filter[] = ["all", "web", "system", "ecommerce"];

interface FilterBarProps {
  filter: Filter;
  onFilter: (f: Filter) => void;
  counts: Record<Filter, number>;
  view: ViewMode;
  onView: (v: ViewMode) => void;
}

export function FilterBar({ filter, onFilter, counts, view, onView }: FilterBarProps) {
  const { lang } = useLanguage();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div
        role="group"
        aria-label={lang === "es" ? "Filtrar proyectos" : "Filter projects"}
        className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 py-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => onFilter(f)}
              className={cn(
                "glow-orange relative shrink-0 rounded-md border-2 px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-neutral-900 text-white dark:border-neutral-100 dark:text-neutral-900"
                  : "border-neutral-300 hover:border-neutral-500 dark:border-neutral-600 dark:hover:border-neutral-400",
              )}
            >
              {active && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-0 rounded-[4px] bg-neutral-900 dark:bg-neutral-100"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {projectsCopy.filters[f][lang]}
                <span className={cn("text-xs tabular-nums", active ? "opacity-70" : "text-neutral-500 dark:text-neutral-400")}>
                  {counts[f]}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="group"
        aria-label={projectsCopy.view.label[lang]}
        className="flex w-fit self-end rounded-md border-2 border-neutral-300 p-0.5 sm:self-auto dark:border-neutral-600"
      >
        {(["grid", "list"] as ViewMode[]).map((v) => {
          const Icon = v === "grid" ? LuLayoutGrid : LuList;
          const active = view === v;
          return (
            <button
              key={v}
              type="button"
              aria-pressed={active}
              aria-label={projectsCopy.view[v][lang]}
              title={projectsCopy.view[v][lang]}
              onClick={() => onView(v)}
              className={cn(
                "glow-orange rounded-[4px] p-2 transition-colors",
                active
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
