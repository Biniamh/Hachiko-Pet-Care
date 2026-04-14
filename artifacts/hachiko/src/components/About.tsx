import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-secondary/10 rounded-3xl transform -rotate-3 z-0" />
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl transform rotate-2 z-0" />
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
              <img 
                src="/images/about.png" 
                alt="Owner hugging dog" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl z-20 border border-border max-w-[200px]"
            >
              <p className="text-4xl font-serif font-bold text-primary mb-1">10+</p>
              <p className="text-sm text-card-foreground font-medium leading-tight">Years of dedicated<br/>pet care</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:pl-8"
          >
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Inspired by loyalty. <br />
              <span className="text-primary italic">Driven by love.</span>
            </h2>
            
            <div className="space-y-6 text-lg text-foreground/70">
              <p>
                The story of Hachiko, the Akita dog who waited for his owner at Shibuya Station for nearly ten years, represents the profound, unbreakable bond between humans and animals. That very devotion is the foundation of everything we do.
              </p>
              <p>
                We believe that leaving your pet shouldn't feel like a compromise. We designed our space to feel like a second home—where the smells are familiar, the beds are soft, and the attention is undivided. 
              </p>
              <p>
                When they are with us, they are family. Every walk, every grooming session, and every overnight stay is handled with the utmost care, patience, and professional expertise.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex items-center gap-6">
              <div>
                <p className="font-serif font-bold text-xl text-foreground">Sarah Jenkins</p>
                <p className="text-sm text-muted-foreground">Founder & Lead Caretaker</p>
              </div>
              <Button 
                variant="outline" 
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Meet the Team
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
