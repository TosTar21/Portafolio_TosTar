import { useTheme } from "./hooks/useTheme";
import Work from "./pages/Work";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./styles/index.css";
import About from "./pages/About";
import CVPage from "./pages/CVPage";
import Navbar from "./components/microcomponents/Navbar";
import Footer from "./components/microcomponents/Footer";
import ThemeIcon from "./components/microcomponents/ThemeIcon";

const App = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"} min-h-screen transition-all duration-500`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <ThemeIcon />
              <Work />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<CVPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
