import { ReactNode } from "react";

import Footer from "../microcomponents/Footer";
import Navbar from "../microcomponents/Navbar";
import ThemeIcon from "../microcomponents/ThemeIcon";
import { useLocation } from "react-router";

type Props = { children: ReactNode };

const MainLayout = ({ children }: Props) => {
  const { pathname } = useLocation();

  // Rutas donde NO queremos mostrar el botón de tema
  const hideThemeIcon = ["/cv", "/resume"].includes(pathname.toLowerCase());

  return (
    <div className="min-h-screen w-full transition-all duration-500">
      <Navbar />

      {/* Mostrarlo solo si la ruta no está en la lista */}
      {!hideThemeIcon && <ThemeIcon />}

      <main className="px-6 md:px-12">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
