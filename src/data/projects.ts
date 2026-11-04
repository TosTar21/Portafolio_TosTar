import type { Localized } from "@/context/LanguageContext";

export type ProjectCategory = "web" | "system" | "ai" | "ecommerce";

export interface Project {
  id: string;
  number: string;
  title: Localized;
  /** full description — always shown whole on the card */
  summary: Localized;
  category: ProjectCategory;
  /** shows the "placeholder" chip */
  placeholder?: boolean;
  image: string;
  /** extra screenshots for the modal gallery (the main image is always first) */
  gallery?: string[];
  /** badgeDocs keys or display names (resolved with resolveBadge) */
  badges: string[];
  github: string;
  liveDemo: string;
  year?: string;
  role?: Localized;
  features?: Localized<string[]>;
}

/** Cards shown before "Show more" */
export const PAGE_SIZE = 9;

/**
 * Order matters: the bento layout is positional (wide, half, half, …),
 * so to feature a project put it first.
 */
export const projects: Project[] = [
  {
    id: "nursing-home-website",
    number: "01",
    title: { en: "Nursing Home Website", es: "Sitio Web Hogar de Ancianos" },
    summary: {
      en: "I developed an informational website for Santa Cruz Nursing Home, where families and visitors can learn about the institution, its services and admission process. The site includes sections to submit online requests for resident admission, volunteer opportunities and donations, making it easier to connect the community with the home.",
      es: "Desarrollé un sitio web informativo para el Hogar de Ancianos de Santa Cruz, donde familiares y visitantes pueden conocer la institución, sus servicios y el proceso de ingreso. El sitio incluye formularios en línea para solicitudes de admisión de residentes, voluntariado y donaciones, facilitando la conexión de la comunidad con el hogar.",
    },
    category: "web",
    image: "https://i.ibb.co/N2FV8Gv2/image.png",
    badges: ["React", "Vite", "TailwindCSS", "TypeScript"],
    github: "",
    liveDemo: "https://nuestrasenorainformativo.com/",
    year: "2024 – 2025",
    features: {
      en: ["Institution, services and admission process information", "Online resident admission requests", "Volunteer and donation forms"],
      es: ["Información de la institución, servicios y proceso de ingreso", "Solicitudes de admisión de residentes en línea", "Formularios de voluntariado y donaciones"],
    },
  },
  {
    id: "nursing-home-admin",
    number: "02",
    title: { en: "Nursing Home Admin System", es: "Sistema Administrativo del Hogar de Ancianos" },
    summary: {
      en: "I built an internal management system for Santa Cruz Nursing Home that centralizes key operational processes. Staff can review and manage admission, volunteer and donation requests, access detailed resident profiles, track medical information, view upcoming appointments, and monitor inventories for food, cleaning supplies and office materials.",
      es: "Desarrollé un sistema administrativo interno para el Hogar de Ancianos de Santa Cruz que centraliza los procesos de gestión. El personal puede revisar y administrar solicitudes de ingreso, voluntariado y donaciones, consultar perfiles detallados de los residentes, visualizar información médica, ver las citas programadas y controlar los inventarios de comida, limpieza y materiales de oficina.",
    },
    category: "system",
    image: "/images/sistema-administrativo.png",
    badges: ["React", "Vite", "TailwindCSS", "TypeScript", ".NET", "MySQL"],
    github: "",
    liveDemo: "",
    year: "2024 – 2025",
    features: {
      en: ["Admission, volunteer and donation request management", "Resident profiles with medical information", "Upcoming appointments", "Food, cleaning and office supply inventories"],
      es: ["Gestión de solicitudes de ingreso, voluntariado y donaciones", "Perfiles de residentes con información médica", "Citas programadas", "Inventarios de comida, limpieza y materiales de oficina"],
    },
  },
  {
    id: "gadea-iso",
    number: "03",
    title: { en: "Photographer Website – Gadea ISO", es: "Página web Fotógrafo – Gadea ISO" },
    summary: {
      en: "I designed and developed a website for a professional photographer to promote wedding, birthday, corporate and commercial photography services. The site includes a hero section, services grid, portfolio highlights, client testimonials, and a contact form connected to WhatsApp for quick inquiries.",
      es: "Diseñé y desarrollé una página web para un fotógrafo profesional, orientada a promocionar servicios de bodas, cumpleaños, eventos corporativos y fotografía comercial. Incluye sección hero, servicios, portafolio destacado, testimonios de clientes y formulario de contacto integrado con WhatsApp para cotizaciones rápidas.",
    },
    category: "web",
    image: "https://i.ibb.co/sJstszVJ/image.png",
    badges: ["Astro", "TypeScript", "TailwindCSS"],
    github: "",
    liveDemo: "https://www.gadeafotografia.com/",
    features: {
      en: ["Services grid and portfolio highlights", "Client testimonials", "Contact form connected to WhatsApp"],
      es: ["Servicios y portafolio destacado", "Testimonios de clientes", "Formulario de contacto integrado con WhatsApp"],
    },
  },
  {
    id: "loomibuy",
    number: "04",
    title: { en: "LoomiBuy – Home Organization Store", es: "LoomiBuy – Tienda de Organizadores para el Hogar" },
    summary: {
      en: "I designed and developed the LoomiBuy online store, an e-commerce site specializing in home organization products. I implemented the visual identity, catalog structure, customized product variants and a responsive experience focused on mobile devices.",
      es: "Diseñé y desarrollé la tienda en línea LoomiBuy, un e-commerce especializado en productos de organización para el hogar. Implementé la identidad visual, la estructura del catálogo, variantes de productos personalizadas y una experiencia responsiva enfocada en dispositivos móviles.",
    },
    category: "ecommerce",
    image: "https://i.ibb.co/9mvC52Vr/image.png",
    badges: ["Shopify"],
    github: "",
    liveDemo: "",
    features: {
      en: ["Visual identity", "Catalog structure and custom product variants", "Mobile-first responsive experience"],
      es: ["Identidad visual", "Estructura del catálogo y variantes de productos personalizadas", "Experiencia responsiva enfocada en móviles"],
    },
  },
  {
    id: "dmr-rentals",
    number: "05",
    title: { en: "DMR Rentals – Real Estate & Lodging Website", es: "DMR Rentals – Alojamientos y Propiedades" },
    summary: {
      en: "I developed a website for DMR Rentals to showcase vacation rentals and properties for sale. The platform presents available accommodations, property details, and the full range of services offered by the company, providing a clear and user-friendly experience for potential clients.",
      es: "Desarrollé un sitio web para DMR Rentals donde se muestran alojamientos turísticos y propiedades en venta. La plataforma presenta los detalles de cada propiedad y los servicios que ofrece la empresa, brindando una experiencia clara y fácil de usar para los clientes.",
    },
    category: "web",
    image: "https://res.cloudinary.com/dxrzwnjee/image/upload/v1793831169/bkvxaiqgcgbqqrfsbzhu.avif",
    badges: ["React", "Vite", "TailwindCSS", "TypeScript", "Firebase", "Supabase"],
    github: "",
    liveDemo: "https://www.dmrrentalscr.com/",
    year: "2025",
    features: {
      en: ["Vacation rentals and properties for sale", "Property detail pages", "Company services overview"],
      es: ["Alojamientos turísticos y propiedades en venta", "Detalle de cada propiedad", "Servicios de la empresa"],
    },
  },
  {
    id: "psychologist-landing",
    number: "06",
    title: { en: "Psychologist Landing Page", es: "Landing Page Psicóloga" },
    summary: {
      en: "I designed and developed a landing page for a psychologist to present her services and therapy modalities. The site focuses on clarity, accessibility, and trust, helping potential clients understand available treatments and easily get in contact.",
      es: "Diseñé y desarrollé una landing page para una psicóloga, enfocada en presentar sus servicios y modalidades de atención. El sitio prioriza la claridad, la confianza y una experiencia accesible para facilitar el contacto con posibles pacientes.",
    },
    category: "web",
    image: "https://i.ibb.co/h3RPL1Y/image.png",
    badges: ["Astro", "TypeScript", "TailwindCSS"],
    github: "",
    liveDemo: "https://landing-psychology-peach.vercel.app/",
    features: {
      en: ["Services and therapy modalities", "Clear, accessible layout", "Easy contact"],
      es: ["Servicios y modalidades de atención", "Diseño claro y accesible", "Contacto sencillo"],
    },
  },
  {
    "id": "mtb-barra-honda",
    "number": "07",
    "title": {
      "en": "MTB El Valle del Nacaome – Cycling Event Website",
      "es": "MTB El Valle del Nacaome – Sitio de Rodada Recreativa"
    },
    "summary": {
      "en": "I developed the official website for MTB El Valle del Nacaome, a community cycling event held in Barra Honda, Guanacaste. The site presents the event, its route, rules and weekend activities, and lets participants register online by uploading their payment receipt. They can later check the status of their registration with their folio and ID number.",
      "es": "Desarrollé el sitio web oficial de MTB El Valle del Nacaome, una rodada recreativa comunitaria en Barra Honda, Guanacaste. El sitio presenta el evento, la ruta, el reglamento y las actividades del fin de semana, y permite a los participantes inscribirse en línea adjuntando su comprobante de pago. Después pueden consultar el estado de su inscripción con su folio y número de cédula."
    },
    "category": "web",
    "placeholder": false,
    "image": "https://res.cloudinary.com/dxrzwnjee/image/upload/v1793831707/vkdffka0jwotmo2pooek.avif",
    "gallery": [
     
    ],
    "badges": ["Astro", "TypeScript", "TailwindCSS"],
    "github": "",
    "liveDemo": "https://recreativa-barra-honda.vercel.app/",
    "year": "2026",
    "role": {
      "en": "Web Developer",
      "es": "Desarrollador Web"
    },
    "features": {
      "en": [
        "Countdown to event day and event information",
        "Route map and profile, rules and FAQ",
        "Online registration for several participants with payment receipt upload",
        "Registration status lookup by folio and ID number",
        "Photo gallery and weekend activities section",
        "Smooth page transitions"
      ],
      "es": [
        "Cuenta regresiva al día del evento e información general",
        "Mapa y perfil de la ruta, reglamento y preguntas frecuentes",
        "Inscripción en línea de varias personas con comprobante de pago adjunto",
        "Consulta del estado de la inscripción por folio y cédula",
        "Galería de fotos y sección de actividades del fin de semana",
        "Transiciones fluidas entre páginas"
      ]
    }
  },
  {
    "id": "mtb-barra-honda-admin",
    "number": "08",
    "title": {
      "en": "MTB Registration Admin Panel",
      "es": "Panel Administrativo de Inscripciones MTB"
    },
    "summary": {
      "en": "I built the admin panel for the MTB El Valle del Nacaome event. The organizing team uses it to review registrations, check payment receipts and approve or reject participants, so the registration flow of the public website is managed from a single place.",
      "es": "Desarrollé el panel administrativo del evento MTB El Valle del Nacaome. El equipo organizador lo usa para revisar inscripciones, validar comprobantes de pago y aprobar o rechazar participantes, de modo que todo el flujo de inscripción del sitio público se gestiona desde un solo lugar."
    },
    "category": "system",
    "placeholder": false,
    "image": "https://res.cloudinary.com/dxrzwnjee/image/upload/v1793831813/c1432bd0-db5a-4a68-a68e-6db5436267ed.png",
    "gallery": [],
    "badges": ["React", "TypeScript", "TailwindCSS", "Supabase"],
    "github": "",
    "liveDemo": "",
    "year": "2026",
    "role": {
      "en": "Full Stack Developer",
      "es": "Desarrollador Full Stack"
    },
    "features": {
      "en": [
        "Registrations list with participant data",
        "Payment receipt review",
        "Approve or reject registrations",
        "Connected to the public registration and status lookup pages"
      ],
      "es": [
        "Listado de inscripciones con los datos de los participantes",
        "Revisión de comprobantes de pago",
        "Aprobación o rechazo de inscripciones",
        "Conectado con las páginas públicas de inscripción y consulta de estado"
      ]
    }
  },
  {
    "id": "bubble-beads",
    "number": "09",
    "title": {
      "en": "Bubble Beads – Handmade Jewelry Store",
      "es": "Bubble Beads – Tienda de Joyería Artesanal"
    },
    "summary": {
      "en": "I developed the Bubble Beads online store, specialized in handmade beaded jewelry, hair accessories and curated Bubble Boxes. The store features themed collections, build-your-own bracelet customization, gift kits at three price levels, a live shopping section for TikTok and Instagram lives, customer testimonials, and multi-currency shipping across Europe.",
      "es": "Desarrollé la tienda en línea Bubble Beads, especializada en joyería artesanal con cuentas, accesorios para el cabello y Bubble Boxes curadas. La tienda incluye colecciones temáticas, personalización de pulseras, kits de regalo en tres niveles de precio, una sección de ventas en vivo para TikTok e Instagram, testimonios de clientes y envíos a toda Europa con múltiples monedas."
    },
    "category": "ecommerce",
    "placeholder": false,
    "image": "https://res.cloudinary.com/dxrzwnjee/image/upload/v1793831853/ezl3vo6gofbdgbvopt39.avif",
    "gallery": [
      "https://res.cloudinary.com/dxrzwnjee/image/upload/v1793832404/awmtlvxewgp7mo3xoc4u.avif"
    ],
    "badges": ["Shopify"],
    "github": "",
    "liveDemo": "https://bubblebeads.shop/",
    "year": "2026",
    "role": {
      "en": "Shopify Developer",
      "es": "Desarrollador Shopify"
    },
    "features": {
      "en": [
        "Themed collections and category navigation (bracelets, necklaces, hair, press-on nails)",
        "Build-your-own bracelet section",
        "Bubble Boxes: gift kits at €50, €100 and €150",
        "Live shopping section with weekly schedule",
        "Customer testimonials and community section",
        "Multi-currency and shipping across Europe"
      ],
      "es": [
        "Colecciones temáticas y navegación por categorías (pulseras, collares, cabello, uñas press-on)",
        "Sección para diseñar tu propia pulsera",
        "Bubble Boxes: kits de regalo de €50, €100 y €150",
        "Sección de ventas en vivo con horario semanal",
        "Testimonios de clientes y sección de comunidad",
        "Múltiples monedas y envíos a toda Europa"
      ]
    }
  }
];

export const projectsCopy = {
  title: { en: "My Projects", es: "Mis Proyectos" } as Localized,
  counter: {
    en: (shown: number, total: number) => `Showing ${shown} of ${total} projects`,
    es: (shown: number, total: number) => `Mostrando ${shown} de ${total} proyectos`,
  } as Localized<(shown: number, total: number) => string>,
  filters: {
    all: { en: "All", es: "Todos" },
    web: { en: "Web", es: "Web" },
    system: { en: "Systems", es: "Sistemas" },
    ecommerce: { en: "E-commerce", es: "E-commerce" },
  } as Record<"all" | ProjectCategory, Localized>,
  categoryLabel: {
    web: { en: "Web", es: "Web" },
    system: { en: "System", es: "Sistema" },
    ecommerce: { en: "E-commerce", es: "E-commerce" },
  } as Record<ProjectCategory, Localized>,
  status: {
    placeholder: { en: "Placeholder", es: "Marcador" },
    live: { en: "Online", es: "En línea" },
    private: { en: "Private", es: "Privado" },
  } as Record<"placeholder" | "live" | "private", Localized>,
  view: {
    label: { en: "View mode", es: "Modo de vista" },
    grid: { en: "Grid view", es: "Vista de cuadrícula" },
    list: { en: "List view", es: "Vista de lista" },
  } as Record<"label" | "grid" | "list", Localized>,
  readMore: { en: "Read more", es: "Ver más" } as Localized,
  readLess: { en: "Read less", es: "Ver menos" } as Localized,
  showMore: { en: "Show more projects", es: "Mostrar más proyectos" } as Localized,
  showLess: { en: "Show less", es: "Mostrar menos" } as Localized,
  empty: { en: "No projects in this category yet.", es: "Aún no hay proyectos en esta categoría." } as Localized,
  modal: {
    liveDemo: { en: "Live demo", es: "Demo" },
    github: { en: "GitHub", es: "GitHub" },
    close: { en: "Close", es: "Cerrar" },
    prev: { en: "Previous project", es: "Proyecto anterior" },
    next: { en: "Next project", es: "Proyecto siguiente" },
    year: { en: "Year", es: "Año" },
    status: { en: "Status", es: "Estado" },
    type: { en: "Type", es: "Tipo" },
    role: { en: "Role", es: "Rol" },
    features: { en: "Features", es: "Características" },
    stack: { en: "Stack", es: "Tecnologías" },
    gallery: { en: "Screenshot", es: "Captura" },
  } as Record<string, Localized>,
};
