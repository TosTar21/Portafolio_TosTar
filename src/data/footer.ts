import type { Localized } from "@/context/LanguageContext";

export const footerData = {
  date: 2025,
  name: "Oscar Zúñiga",
  email: "oscarzswork@gmail.com",
  message: { en: "All rights reserved", es: "Todos los derechos reservados" } as Localized,
  socialTitle: { en: "Social Media", es: "Redes Sociales" } as Localized,
  roleTitle: { en: "Frontend Developer", es: "Desarrollador Frontend" } as Localized,
  // same links for every language
  socialLinks: [
    { id: 1, name: "GitHub", href: "https://github.com/Oscar26-zs" },
    { id: 2, name: "Instagram", href: "https://www.instagram.com/tostar.oz_" },
    { id: 3, name: "LinkedIn", href: "https://www.linkedin.com/in/oscar-zu%C3%B1iga-sanchez-ba33a0363/" },
  ],
};
