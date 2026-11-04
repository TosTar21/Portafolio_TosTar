import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

interface SplitTextProps {
  text: string;
  by?: "word" | "char";
  className?: string;
  delay?: number;
  stagger?: number;
}

const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: EASE } },
};
const charVariant: Variants = {
  hidden: { y: 10, opacity: 0, filter: "blur(4px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: EASE } },
};

/** Staggered word / letter reveal. Screen readers get the full text via aria-label. */
export function SplitText({ text, by = "word", className, delay = 0, stagger }: SplitTextProps) {
  const parts = by === "word" ? text.split(" ") : Array.from(text);
  const step = stagger ?? (by === "word" ? 0.07 : 0.035);

  return (
    <motion.span
      key={text}
      aria-label={text}
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {parts.map((p, i) =>
        by === "word" ? (
          <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block" variants={wordVariant}>
              {p}
            </motion.span>
            {i < parts.length - 1 ? " " : ""}
          </span>
        ) : (
          <motion.span key={i} aria-hidden className="inline-block whitespace-pre" variants={charVariant}>
            {p}
          </motion.span>
        ),
      )}
    </motion.span>
  );
}
