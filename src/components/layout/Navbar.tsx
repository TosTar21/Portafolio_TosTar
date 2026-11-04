import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { LuCheck, LuChevronDown, LuGlobe, LuMenu, LuX } from "react-icons/lu";
import { useLanguage, type Lang } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { navLinks, siteCopy } from "@/data/site";
import { cn } from "@/utils/cn";
import { MobileMenu } from "./MobileMenu";

const LANGS: Lang[] = ["es", "en"];

function LanguageMenu() {
  const { lang, setLang, tr } = useLanguage();
  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label={tr(siteCopy.language.label)}
        className="glow-orange flex items-center gap-2 rounded-md border-2 border-neutral-300 px-2.5 py-1.5 text-sm font-medium transition-colors hover:border-neutral-500 data-[open]:border-orange-400 dark:border-neutral-600 dark:hover:border-neutral-400"
      >
        <LuGlobe aria-hidden className="h-4 w-4" />
        <span className="hidden md:inline">{siteCopy.language.names[lang]}</span>
        <LuChevronDown aria-hidden className="h-3.5 w-3.5 opacity-70" />
      </MenuButton>
      {/* rendered inside the sticky header (no portal / anchor) and non-modal, so it never hides or locks the page scroll */}
      <MenuItems
        modal={false}
        transition
        className="absolute right-0 top-full z-[60] mt-2 w-36 origin-top-right rounded-lg border border-neutral-200 bg-white p-1 text-sm shadow-lg outline-none transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-neutral-700 dark:bg-[#1e1e1e]"
      >
        {LANGS.map((l) => (
          <MenuItem key={l}>
            <button
              type="button"
              onClick={() => setLang(l)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left data-[focus]:bg-neutral-100 dark:data-[focus]:bg-neutral-800"
            >
              {siteCopy.language.names[l]}
              {l === lang && <LuCheck aria-hidden className="h-4 w-4 text-orange-500 dark:text-orange-300" />}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

export function Navbar() {
  const { tr } = useLanguage();
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-neutral-100/95 backdrop-blur-md dark:border-neutral-700/60 dark:bg-neutral-800/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
          <Link to="/" aria-label={tr(siteCopy.nav.home)} className="glow-orange shrink-0 rounded-md">
            <img
              src={theme === "dark" ? "/images/logo-dark.png" : "/images/logo.png"}
              alt="TosTar"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
          </Link>

          <nav aria-label={tr(siteCopy.nav.main)} className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link, i) => {
                const active = pathname === link.path;
                return (
                  <li key={link.path} className="flex items-center">
                    {i > 0 && (
                      <span aria-hidden className="mx-3 h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                    )}
                    <Link
                      to={link.path}
                      data-active={active}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "link-underline glow-text font-heading text-lg font-semibold transition-colors",
                        active ? "text-black dark:text-white" : "text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white",
                      )}
                    >
                      {tr(link.label)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageMenu />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? tr(siteCopy.nav.closeMenu) : tr(siteCopy.nav.openMenu)}
              aria-expanded={open}
              className="glow-orange grid h-10 w-10 place-items-center rounded-md md:hidden"
            >
              {open ? <LuX className="h-6 w-6" /> : <LuMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
