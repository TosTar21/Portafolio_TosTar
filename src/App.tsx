import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CursorFollower } from "@/components/motion/CursorFollower";
import { PageTransition } from "@/components/motion/PageTransition";
import { SiteStarField } from "@/components/motion/StarField";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Resume from "@/pages/Resume";

function AnimatedRoutes() {
  const location = useLocation();
  // Group "/" and unknown paths under the same key so they don't re-animate between each other
  const key = location.pathname === "/about" || location.pathname === "/resume" ? location.pathname : "/";
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={key}>
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <div className="relative isolate min-h-screen bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white">
              {/* night sky behind every page (negative z inside the isolated root, above its background) */}
              <SiteStarField />
              <ScrollProgress />
              <CursorFollower />
              <Navbar />
              <main>
                <AnimatedRoutes />
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}
