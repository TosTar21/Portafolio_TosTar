import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { BsMoon, BsSunFill } from "react-icons/bs";

const ThemeIcon = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.div
      className="absolute left-[50%] md:left-[55%] top-[180px] -translate-x-1/2 cursor-pointer z-20"
      onClick={toggleTheme}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={`text-3xl md:text-4xl ${isDarkMode ? "text-white" : "text-black"}`}
        animate={{ y: [0, -8, 0] }} 
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        {isDarkMode ? <BsMoon /> :  <BsSunFill />}
      </motion.div>
    </motion.div>
  );
};

export default ThemeIcon;
