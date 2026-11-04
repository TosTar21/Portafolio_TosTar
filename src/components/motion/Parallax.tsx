import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /** px of travel across the element's scroll range (negative = moves up faster) */
  distance?: number;
  className?: string;
}

/** Subtle scroll parallax — disabled for reduced-motion */
export function Parallax({ children, distance = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={reduced ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
