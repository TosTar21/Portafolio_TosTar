import { useSyncExternalStore } from "react";
import type { Variants } from "framer-motion";

/** Subscribe to a CSS media query without effects/flash */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Desktop = wide screen with a fine pointer (mouse/trackpad) */
export const DESKTOP_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const viewportOnce = { once: true, margin: "0px 0px -80px 0px" } as const;
