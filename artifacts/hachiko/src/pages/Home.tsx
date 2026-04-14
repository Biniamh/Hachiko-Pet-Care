import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { About } from "../components/About";
import { Testimonials } from "../components/Testimonials";
import { Pricing } from "../components/Pricing";
import { Booking } from "../components/Booking";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Pricing />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
