import Footer from "../microcomponents/Footer";
import Navbar from "../microcomponents/Navbar";
import ThemeIcon from "../microcomponents/ThemeIcon";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full transition-all duration-500">
      <Navbar />
      <ThemeIcon />
      <main className="px-6 md:px-12">{children}</main>
      <Footer/>
    </div>
  );
};

export default MainLayout;
