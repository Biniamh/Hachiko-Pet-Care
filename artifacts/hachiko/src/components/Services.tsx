import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Home, Footprints, Stethoscope } from "lucide-react";

const services = [
  {
    id: "grooming",
    title: "Spa & Grooming",
    description: "Luxurious baths, styling, and nail care to keep your pet looking and feeling their absolute best. We use organic, hypoallergenic products.",
    icon: <Scissors className="w-6 h-6 text-primary" />,
    image: "/images/grooming.png",
  },
  {
    id: "boarding",
    title: "Boutique Boarding",
    description: "Cage-free, cozy suites designed to feel just like home. 24/7 supervision and daily play sessions included.",
    icon: <Home className="w-6 h-6 text-primary" />,
    image: "/images/boarding.png",
  },
  {
    id: "walking",
    title: "Adventure Walks",
    description: "High-energy park adventures or leisurely neighborhood strolls tailored to your dog's specific needs and pace.",
    icon: <Footprints className="w-6 h-6 text-primary" />,
    image: "/images/walking.png",
  },
  {
    id: "vet",
    title: "Wellness & Care",
    description: "Compassionate, low-stress veterinary care. From routine check-ups to comprehensive wellness planning.",
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    image: "/images/vet.png",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Exceptional Care for <span className="text-primary italic">Every Need</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-foreground/70"
          >
            Whether they need a fresh groom, a safe place to stay, or medical attention, we provide premium services tailored to your pet's comfort.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item} className="h-full">
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50 bg-card hover:-translate-y-1">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute bottom-4 left-4 z-20 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold font-serif mb-3 text-card-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
