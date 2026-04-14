import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";
import { HachikoLogo } from "@/components/Logo";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-background/10 pb-12">

          <div className="col-span-1 md:col-span-2">
            <button onClick={scrollToTop} className="mb-6 focus:outline-none">
              <HachikoLogo variant="light" size="md" />
            </button>
            <p className="text-background/70 max-w-md leading-relaxed mt-4">
              Premium veterinary and pet care inspired by legendary loyalty. We provide a warm, safe, and professional environment for your beloved companions.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-primary">Services</h4>
            <ul className="space-y-4 text-background/70">
              <li><a href="#services" className="hover:text-white transition-colors">Grooming Spa</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Luxury Boarding</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Adventure Walks</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Veterinary Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-sm text-primary">Company</h4>
            <ul className="space-y-4 text-background/70">
              <li><a href="#about" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book a Visit</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Hachiko Veterinary Care. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
