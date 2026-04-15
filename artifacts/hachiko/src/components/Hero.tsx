import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HachikoLogo } from "@/components/Logo";
import { ArrowRight, Shield, Heart, Clock } from "lucide-react";

export function Hero() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/20 z-10" />
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          src="/images/hero.png"
          alt="Veterinary care at Hachiko"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo in hero */}
            <div className="mb-8">
              <HachikoLogo variant="light" size="lg" />
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.08] mb-6 text-white">
              Professional care<br />
              <span className="text-primary italic">they deserve.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              Named after the legendary loyal dog, Hachiko provides compassionate, expert veterinary and pet care services — because your companion deserves the best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                onClick={scrollToBooking}
                size="lg"
                className="rounded-full text-base px-8 h-14 shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90 gap-2"
                data-testid="button-hero-book"
              >
                Book an Appointment
                <ArrowRight size={18} />
              </Button>
              <Button
                onClick={scrollToServices}
                variant="outline"
                size="lg"
                className="rounded-full text-base px-8 h-14 bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:border-white/60"
              >
                Our Services
              </Button>
            </div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Shield, text: "Licensed Veterinarians" },
                { icon: Heart, text: "500+ Happy Pets" },
                { icon: Clock, text: "3+ Years Experience" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/90">
                  <Icon size={16} className="text-primary" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
