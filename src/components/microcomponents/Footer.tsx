// src/components/microcomponents/Footer.tsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { footerData } from "../../data/footer";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  // Extraemos las propiedades que agregaste en footerData
  const { date, name, message, socialTitle, roleTitle } = footerData[language];
  // Enlaces sociales (iguales para todos los idiomas)
  const { socialLinks } = footerData;

  return (
    <footer
      className={`
        w-full font-poppins
        ${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"}
        py-8 border-t-2 border-neutral-300 transition-all duration-500
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Columna Izquierda: Nombre y Rol */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-semibold">
            {name}
          </h2>
          <p className="text-sm">
            {roleTitle}
          </p>
        </div>

        {/* Columna Derecha: Título y Enlaces Sociales */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <h2 className="text-xl font-semibold">
            {socialTitle}
          </h2>
          <div className="flex space-x-7">
            {socialLinks.map((social) => {
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
                  className="
                    transition-transform duration-300
                    hover:underline hover:scale-110
                  "
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fila inferior para Copyright */}
      <div className="mt-4 text-center">
        <p className="text-sm">
          &copy; {date} {name} | {message}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
