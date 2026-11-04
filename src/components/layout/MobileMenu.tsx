import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { navLinks } from "@/data/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  onClose: () => void;
}

/** Full-screen menu below the navbar (mobile only) */
export function MobileMenu({ onClose }: MobileMenuProps) {
  const { tr } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col items-center justify-center bg-neutral-100/95 backdrop-blur-md md:hidden dark:bg-neutral-800/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ul className="flex flex-col items-center gap-8">
        {navLinks.map((link, i) => {
          const active = pathname === link.path;
          return (
            <motion.li
              key={link.path}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.06, ease: EASE }}
            >
              <Link
                to={link.path}
                onClick={onClose}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "link-underline font-heading text-2xl font-semibold",
                  active ? "text-black dark:text-white" : "text-neutral-600 dark:text-neutral-300",
                )}
              >
                {tr(link.label)}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
