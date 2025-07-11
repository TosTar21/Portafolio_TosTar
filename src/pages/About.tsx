import AboutMe from '../components/Sections/AboutMe'

const About = () => {
  return (
    <div className="min-h-screen w-full transition-all duration-500 px-6 md:px-12">
      {/* <Navbar />  Ya está en App.tsx */}
      <div className="py-46 md:py-32">
        <AboutMe />
      </div>
      {/* <Footer />  Ya está en App.tsx */}
    </div>
  );
}

export default About
