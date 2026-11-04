import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useLanguage } from "@/context/LanguageContext";
import { footerData } from "@/data/footer";

const ICONS: Record<string, IconType> = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
};

export function Footer() {
  const { tr } = useLanguage();
  const { date, name, email, message, socialTitle, roleTitle, socialLinks } = footerData;

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100/80 backdrop-blur-[2px] dark:border-neutral-700/60 dark:bg-neutral-800/80">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-6 py-10 md:grid-cols-3">
        <div className="space-y-1">
          <p className="font-heading text-xl font-semibold">{name}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{tr(roleTitle)}</p>
          <a
            href={`mailto:${email}`}
            className="link-underline inline-block text-sm font-medium text-orange-500 dark:text-orange-300"
          >
            {email}
          </a>
        </div>

        <p className="text-sm text-neutral-500 md:text-center dark:text-neutral-400">
          &copy; {date} {name} | {tr(message)}
        </p>

        <div className="flex flex-col gap-2 md:items-end">
          <p className="font-heading text-xl font-semibold">{tr(socialTitle)}</p>
          <ul className="flex gap-5">
            {socialLinks.map((social) => {
              const Icon = ICONS[social.name.toLowerCase()] ?? FaGithub;
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="glow-orange block text-neutral-700 transition-colors hover:text-orange-500 dark:text-neutral-200 dark:hover:text-orange-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
