import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/hero.png"
          alt="Happy dogs running" 
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
            <span className="inline-block py-1 px-3 rounded-full bg-accent text-accent-foreground text-sm font-semibold mb-6 shadow-sm">
              Premium Pet Care
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6 text-foreground">
              Because they're not just pets.<br />
              <span className="text-primary italic">They're family.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl leading-relaxed">
              Named after the legendary loyal dog, Hachiko provides devotion, warmth, and unparalleled care for your beloved companion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact} 
                size="lg" 
                className="rounded-full text-base px-8 h-14 shadow-lg hover:shadow-xl transition-all"
              >
                Schedule a Meet & Greet
              </Button>
              <Button 
                onClick={scrollToServices} 
                variant="outline" 
                size="lg" 
                className="rounded-full text-base px-8 h-14 bg-background/50 backdrop-blur-sm border-border hover:bg-background"
              >
                Explore Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
