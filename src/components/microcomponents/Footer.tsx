// src/components/microcomponents/Footer.tsx
import React from "react";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { footerData } from "../../data/footer";

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  const { date, name, message, socialTitle, roleTitle, email} = footerData[language];
  const { socialLinks } = footerData; // mismos links para todos los idiomas

  return (
    <footer
      className={`
        w-full font-poppins
        ${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"}
        border-t-2 ${isDarkMode ? "border-neutral-700" : "border-neutral-300"}
        py-8 transition-all duration-500
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 
                      grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        {/* Columna 1: Nombre y rol */}
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-semibold">{name}</h2>
          <p className="text-sm">{roleTitle}</p>
          <a className="text-blue-800 font-semibold" href={`mailto:${email}`}>{email}</a>
        </div>

        {/* Columna 2: Copyright */}
        <div className="text-center">
          <p className="text-sm">
            &copy; {date} {name} | {message}
          </p>
        </div>

        {/* Columna 3: Social Media */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <h2 className="text-xl font-semibold">{socialTitle}</h2>
          <div className="flex space-x-6">
            {socialLinks.map((social) => {
              let Icon = FaGithub;
              switch (social.name.toLowerCase()) {
                case "instagram":
                  Icon = FaInstagram;
                  break;
                case "linkedin":
                case "linkedinin":
                  Icon = FaLinkedinIn;
                  break;
                case "github":
                default:
                  Icon = FaGithub;
              }
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:underline hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
