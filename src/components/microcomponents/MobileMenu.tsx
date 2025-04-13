import React from "react";
import { motion } from "framer-motion";
import { navLinks } from "../../data/navLinks";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import { HiOutlineX } from "react-icons/hi";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  return (
    <motion.div
      className={`md:hidden ${
        isDarkMode ? "bg-[#262626] text-white" : "bg-[#F5F5F5] text-black"
      } fixed top-0 left-0 w-full h-full z-50 flex flex-col items-center justify-center transition-all duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-0 left-5 p-2">
        <img
          alt="Logo"
          src={isDarkMode ? "/logo-dark.png" : "/Logo.png"}
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Botón para cerrar el menú en la esquina superior derecha */}
      <div className="absolute top-0 right-4 p-6">
        <button onClick={onClose} className="text-3xl focus:outline-none">
          <HiOutlineX />
        </button>
      </div>

      {/* Lista de links de navegación */}
      <div className="flex flex-col items-center">
        {navLinks[language].map((link, index) => (
          <a
            key={index}
            href={link.path}
            className="block mb-8 text-2xl font-inter font-semibold transition-all duration-300 hover:text-primary"
            onClick={onClose}
          >
            {link.name}
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
