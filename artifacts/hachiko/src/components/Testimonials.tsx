import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Emily Chen",
    pet: "Owner of Max (Golden Retriever)",
    text: "I was always anxious about leaving Max anywhere, but the moment I walked into Hachiko, I knew he was safe. The daily photo updates during his boarding stay put my mind completely at ease. He didn't want to leave!",
    rating: 5,
  },
  {
    id: 2,
    name: "David Rodriguez",
    pet: "Owner of Luna (Maine Coon)",
    text: "The grooming spa here is unlike anything else in the city. Luna is usually terrified of water, but their gentle approach and calming environment made her actual purr during her bath. Outstanding service.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Thorne",
    pet: "Owner of Bella & Cooper",
    text: "Their adventure walks have been transformative for our high-energy pups. The team is professional, punctual, and truly understands canine behavior. It's premium care in every sense of the word.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-accent/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block"
          >
            Word of Mouth
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Trusted by the city's <br className="hidden md:block"/>
            <span className="italic text-secondary">most discerning pets</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <Card className="h-full bg-card border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex gap-1 mb-6 text-primary">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg text-foreground/80 leading-relaxed mb-8 flex-grow">
                    "{t.text}"
                  </blockquote>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.pet}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
