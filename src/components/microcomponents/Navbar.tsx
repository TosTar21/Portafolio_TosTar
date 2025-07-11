// src/components/Navbar/Navbar.jsx
import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FiGlobe } from "react-icons/fi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { navLinks } from "../../data/navLinks";
import MobileMenu from "./MobileMenu";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const { isDarkMode } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Barra de navegación fija */}
      <nav
        className={`w-full fixed top-0 left-0 z-40 transition-all duration-500 ${
          isDarkMode ? "bg-[#262626] text-white " : "bg-[#F5F5F5] text-black"
        }`}
        style={{ height: "80px" }}
      >
        <div className="mx-auto px-8 md:px-16 w-full h-full flex justify-between items-center">
          {/* Logo */}
          <div>
            <img
              alt="Logo"
              src={isDarkMode ? "/logo-dark.png" : "/Logo.png"}
              className="w-16 h-16 object-contain"
            />
          </div>

          {/* Navegación en escritorio */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks[language].map((link, idx) => {
              const isActive = location.pathname === (link.path || "");
              return (
                <Link
                  key={idx}
                  to={link.path || "#"}
                  onClick={() => setIsOpen(false)}
                  className={`relative group text-xl font-semibold transition-colors duration-200 ${isActive ? "text-primary" : ""}`}
                  style={{ zIndex: 1 }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Sombra naranja detrás del cursor al hacer hover */}
                  <span className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 rounded-full blur-md bg-orange-400 opacity-60"></span>
                  </span>
                  {/* Línea debajo de la opción activa */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2.5px] rounded-full transition-all duration-300
                      ${isActive
                        ? isDarkMode
                          ? "w-full bg-white"
                          : "w-full bg-black"
                        : "w-0 bg-current group-hover:w-full group-hover:" + (isDarkMode ? "bg-white" : "bg-black")
                      }
                    `}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Botones en la esquina derecha */}
          <div className="flex items-center gap-4">
            {/* Dropdown de idioma (visible siempre) */}
            <Menu as="div" className="relative">
              <Menu.Button
                className={`flex items-center gap-2 border px-2 py-1 rounded-md transition-all ${
                  isDarkMode
                    ? "border-gray-600 bg-neutral-900 text-white hover:bg-neutral-800"
                    : "border-gray-400 bg-white text-black hover:bg-gray-100"
                }`}
                style={{ minWidth: "80px", maxWidth: "120px" }}
              >
                <FiGlobe />
                <span className="hidden md:inline">
                  {language === "en" ? "English" : "Español"}
                </span>
              </Menu.Button>
              <Menu.Items
                className={`absolute right-0 mt-2 w-28 max-w-xs rounded-md shadow-lg transition-all overflow-x-auto ${
                  isDarkMode
                    ? "bg-neutral-900 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-black"
                }`}
                style={{ right: 0, left: 'auto' }}
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={toggleLanguage}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 ${
                        active
                          ? isDarkMode
                            ? "bg-gray-700"
                            : "bg-gray-200"
                          : ""
                      }`}
                    >
                      {language === "en" ? "Español" : "English"}
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            {/* Botón hamburguesa para móviles */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil que cubre toda la pantalla */}
      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;
