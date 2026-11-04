import type { Localized } from "@/context/LanguageContext";

export const heroCopy = {
  greeting: {
    en: "Hi, I'm Oscar or better known as TosTar",
    es: "Hola, soy Oscar o mejor conocido como TosTar",
  } as Localized,
  role: { en: "Systems Engineer", es: "Ingeniero en Sistemas" } as Localized,
  /** Rotated in the hero with a typewriter effect (first item = role shown with reduced motion) */
  roles: {
    en: ["Systems Engineer", "Full Stack Developer", "Frontend Developer", "Web Developer", "AI Agents Developer"],
    es: ["Ingeniero en Sistemas", "Desarrollador Full Stack", "Desarrollador Frontend", "Desarrollador Web", "Desarrollador de Agentes IA"],
  } as Localized<string[]>,
  description: {
    en: "I'm a passionate web developer based in Costa Rica. I specialize in creating intuitive web applications and modern user experiences.",
    es: "Soy un apasionado desarrollador web de Costa Rica. Me especializo en crear aplicaciones web intuitivas y experiencias de usuario modernas.",
  } as Localized,
  imageAlt: { en: "Line illustration of Oscar", es: "Ilustración de Oscar" } as Localized,
};

export const navLinks: { label: Localized; path: string }[] = [
  { label: { en: "Work", es: "Proyectos" }, path: "/" },
  { label: { en: "About", es: "Sobre mí" }, path: "/about" },
  { label: { en: "Resume", es: "Currículum" }, path: "/resume" },
];

export const siteCopy = {
  theme: {
    toLight: { en: "Switch to light mode", es: "Cambiar a modo claro" } as Localized,
    toDark: { en: "Switch to dark mode", es: "Cambiar a modo oscuro" } as Localized,
  },
  language: {
    label: { en: "Language", es: "Idioma" } as Localized,
    names: { en: "English", es: "Español" },
  },
  nav: {
    home: { en: "Go to home", es: "Ir al inicio" } as Localized,
    main: { en: "Main navigation", es: "Navegación principal" } as Localized,
    openMenu: { en: "Open menu", es: "Abrir menú" } as Localized,
    closeMenu: { en: "Close menu", es: "Cerrar menú" } as Localized,
  },
  resume: {
    file: "/CV_Oscar_Zuniga_Sanchez_2026.pdf",
    title: { en: "Resume", es: "Currículum" } as Localized,
    download: { en: "Download resume", es: "Descargar currículum" } as Localized,
    fallback: { en: "Your browser can't display PDFs. ", es: "Tu navegador no puede mostrar PDFs. " } as Localized,
    open: { en: "Open it in a new tab", es: "Ábrelo en una pestaña nueva" } as Localized,
  },
};
