import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, Play } from "lucide-react";

export function Hero() {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with luxury watch repair workspace */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: "url('/watch.jpeg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-espresso/50 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div 
          className="liquid-morph p-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Watch
            <span className="gradient-text block">Restoration</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect with a certified watchmaker for premium repair and restoration services. 
            From vintage timepieces to modern complications, we preserve horological excellence, focusing solely on Manual and Automatic watches.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-bronze to-silver text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-xl transition-all transform hover:-translate-y-1">
              <Search className="mr-2 h-5 w-5" />
              Get Free Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
