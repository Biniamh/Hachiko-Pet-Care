import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";

const plans = [
  {
    name: "Grooming Spa",
    price: "From $65",
    description: "Luxurious bath, styling, and care.",
    features: [
      "Organic shampoo & conditioning",
      "Breed-specific styling",
      "Nail trim & ear cleaning",
      "Blueberry facial scrub",
    ],
    popular: false,
    cta: "Book Grooming",
  },
  {
    name: "Boutique Boarding",
    price: "$85/night",
    description: "Cozy, cage-free luxury suites.",
    features: [
      "Private climate-controlled suite",
      "Orthopedic memory foam bed",
      "3 daily adventure walks",
      "Daily photo & video updates",
      "Bedtime tuck-in with treats",
    ],
    popular: true,
    cta: "Reserve Suite",
  },
  {
    name: "Daycare & Walks",
    price: "$40/day",
    description: "Active days for energetic dogs.",
    features: [
      "Supervised small playgroups",
      "Agility & puzzle games",
      "Rest periods in quiet zones",
      "Basic obedience reinforcement",
    ],
    popular: false,
    cta: "Schedule Daycare",
  },
];

export function Pricing() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Transparent pricing for <br/>
            <span className="italic text-primary">premium care</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground/70"
          >
            No hidden fees. Just exceptional service and peace of mind for you and your best friend.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`h-full ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
            >
              <Card className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${plan.popular ? 'border-primary shadow-xl ring-1 ring-primary/20 bg-card' : 'border-border/50 bg-card/50'}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-bold py-1.5 uppercase tracking-wider absolute top-0 w-full">
                    Most Requested
                  </div>
                )}
                <CardHeader className={`pt-10 ${plan.popular ? 'pt-12' : ''}`}>
                  <CardTitle className="text-2xl font-serif mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pb-8 pt-4">
                  <Button 
                    onClick={scrollToContact}
                    className="w-full rounded-full h-12 text-base font-semibold"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
