import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { navLinks } from "../../data/navLinks";
import { Menu } from "@headlessui/react";
import { FiGlobe } from "react-icons/fi";

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <nav
      className={`w-full h-20 flex justify-between items-center px-8 md:px-16 fixed top-0 left-0 z-50 transition-all duration-500 ${
        isDarkMode ? "text-white bg-[#262626] shadow-2xl" : "bg-[#F5F5F5] shadow-2xl text-black"
      } `}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          alt="Logo"
          className="w-16 h-16 object-contain"
          src={isDarkMode ? "/logo-dark.png" : "/Logo.png"}
        />
      </div>

      {/* Contenedor de navegación (Links + Dropdown) */}
      <div className="flex gap-8 items-center">
        {/* Links de navegación con línea en hover */}
        {navLinks[language].map((link, index) => (
          <a
            key={index}
            href={link.path}
            className="relative group text-xl font-inter font-semibold transition-all duration-300 hover:text-primary"
          >
            {link.name}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}

        {/* Dropdown de idioma */}
        <Menu as="div" className="relative">
          <Menu.Button
            className={`flex items-center gap-2 border px-3 py-1 rounded-md transition-all ${
              isDarkMode
                ? "border-gray-600 bg-neutral-900 text-white hover:bg-neutral-800"
                : "border-gray-400 bg-white text-black hover:bg-gray-100"
            }`}
          >
            <FiGlobe />
            <span>{language === "en" ? "English" : "Español"}</span>
          </Menu.Button>

          <Menu.Items
            className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg transition-all ${
              isDarkMode ? "bg-neutral-900 border-gray-600 text-white" : "bg-white border-gray-300 text-black"
            }`}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={toggleLanguage}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2 ${
                    active ? "bg-gray-700 text-white" : "bg-transparent"
                  }`}
                >
                  {language === "en" ? "Español" : "English"}
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </nav>
  );
};

export default Navbar;
