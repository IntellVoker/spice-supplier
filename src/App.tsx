import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Home/Hero';
import About from './sections/About/About';
import Values from './sections/About/Values';
import Products from './sections/Products/Products';
import WhyChooseUs from './sections/WhyChooseUs/WhyChooseUs';
import ExportProcess from './sections/ExportProcess/ExportProcess';
import Gallery from './sections/Gallery/Gallery';
import FAQ from './sections/FAQ/FAQ';
import Contact from './sections/Contact/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Values />
        <Products />
        <WhyChooseUs />
        <ExportProcess />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
