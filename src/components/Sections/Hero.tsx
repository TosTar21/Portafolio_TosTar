import { motion } from "framer-motion";
import { heroData } from "../../data/hero";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

const Hero = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage(); // Obtener idioma actual
  const hero = heroData[language]; // Datos traducidos dinámicamente

  return (
    <motion.section
      className={`min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
        isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Contenedor principal - Cambia el orden en modo oscuro */}
      <div
        className={`flex flex-col md:flex-row items-center justify-center max-w-screen-xl pt-28 w-full px-6 md:px-12 transition-all duration-500 ${
          isDarkMode ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Imagen */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: isDarkMode ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <img
            className="w-[400px] md:w-[500px] h-auto"
            src={isDarkMode ? "/PersonaDark.png" : "/Persona.png"}
            alt="Profile"
          />
        </motion.div>

        {/* Texto con transición sincronizada */}
        <motion.div
          className={`w-full md:w-1/2 text-center md:text-left space-y-4 transition-all duration-500 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
          initial={{ opacity: 0, x: isDarkMode ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-4xl font-inter font-bold">{hero.greeting}</h1>
          <p className="text-lg font-poppins font-semibold">{hero.role} - {hero.location}</p>
          <p className="text-lg font-poppins">{hero.description}</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
