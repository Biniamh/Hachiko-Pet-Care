import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Licensed veterinarians with 10+ years experience",
  "State-of-the-art diagnostic equipment",
  "Low-stress, fear-free handling techniques",
  "Transparent pricing with no hidden fees",
];

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
            {/* Decorative green background shapes */}
            <div className="absolute -inset-4 bg-primary/8 rounded-3xl transform -rotate-3 z-0" />
            <div className="absolute -inset-4 bg-accent/40 rounded-3xl transform rotate-2 z-0" />

            {/* Main vet photo */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4]">
              <img
                src="/images/vet.png"
                alt="Hachiko veterinarian with patient"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Second photo inset */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-8 -right-4 md:-right-10 w-36 h-36 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white"
            >
              <img
                src="/images/about.png"
                alt="Veterinarian caring for a dog"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-6 -right-4 md:-right-8 bg-primary p-5 rounded-2xl shadow-xl z-20 text-white max-w-[150px]"
            >
              <p className="text-4xl font-serif font-bold leading-none mb-1">10+</p>
              <p className="text-xs font-medium leading-tight opacity-90">Years of dedicated pet care</p>
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
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Inspired by loyalty.<br />
              <span className="text-primary italic">Driven by love.</span>
            </h2>

            <div className="space-y-5 text-lg text-foreground/70 mb-8">
              <p>
                The story of Hachiko, the Akita who waited faithfully at Shibuya Station for nearly ten years, represents the profound bond between humans and animals. That devotion is the foundation of everything we do.
              </p>
              <p>
                Our veterinary team combines clinical expertise with genuine compassion — because we believe every pet deserves care delivered with patience, skill, and heart.
              </p>
            </div>

            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-border flex items-center gap-6">
              <div>
                <p className="font-serif font-bold text-xl text-foreground">Dr. Sarah Jenkins, DVM</p>
                <p className="text-sm text-muted-foreground">Founder & Lead Veterinarian</p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
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
