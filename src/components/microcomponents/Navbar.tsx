import { navLinks } from "../../data/navLinks";
import { useTheme } from "../../hooks/useTheme";

const Navbar = () => {
  const { isDarkMode } = useTheme();

  return (
    <nav
      className={`w-full h-20 flex justify-between items-center px-8 md:px-16 fixed top-0 left-0 z-50 transition-all duration-500 ${
        isDarkMode ? "text-white" : "text-black"
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

      {/* Links de navegación con línea en hover */}
      <div className="flex gap-8">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.path}
            className="relative group text-xl font-inter font-semibold transition-all duration-300 hover:text-primary"
          >
            {link.name}
            {/* Línea animada en hover */}
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
