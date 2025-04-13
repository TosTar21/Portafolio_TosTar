// src/components/microcomponents/Footer.tsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";

// Iconos de react-icons
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { footerData } from "../../data/footer";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Extraemos la parte del objeto que corresponde al idioma
  const { date, name, message } = footerData[language];
  // Enlaces sociales (compartidos)
  const { socialLinks } = footerData;

  return (
    <footer
      className={`w-full font-poppins ${
        isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
      } py-6 border-t-2 border-neutral-300 transition-all duration-500`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-4">
        {/* Iconos Sociales */}
        <div className="flex gap-6">
          {socialLinks.map((social) => {
            // Definimos qué icono usar según el nombre
            let IconComponent;
            switch (social.name.toLowerCase()) {
              case "github":
                IconComponent = FaGithub;
                break;
              case "instagram":
                IconComponent = FaInstagram;
                break;
              case "linkedin":
              case "linkedinin":
                IconComponent = FaLinkedinIn;
                break;
              default:
                IconComponent = FaGithub;
            }

            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <IconComponent size={24} />
              </a>
            );
          })}
        </div>

        {/* Texto de Copyright */}
        <p className="text-sm text-center">
          &copy; {date} {name} | {message}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
