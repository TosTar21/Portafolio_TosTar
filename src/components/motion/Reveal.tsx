import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE, viewportOnce } from "@/lib/motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  delay?: number;
  y?: number;
}

/** whileInView fade + rise. MotionConfig(reducedMotion="user") removes the movement for reduced-motion users. */
export function Reveal({ delay = 0, y = 24, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
