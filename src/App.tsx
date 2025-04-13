import MainLayout from "./components/Layout/MainLayout";
import { useTheme } from "./hooks/useTheme";
import Work from "./pages/Work";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./styles/index.css";
import About from "./pages/About";

const App = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"} min-h-screen transition-all duration-500`}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
};

export default App;
