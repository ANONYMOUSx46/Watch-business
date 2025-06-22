import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import { Watch, Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 nav-blur px-6 py-4 transition-all duration-300 ${
      isScrolled ? 'scrolled' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-bronze to-silver rounded-full flex items-center justify-center">
            <Watch className="text-white text-lg" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-primary-custom">
            ChronoLux Repairs
          </h1>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            onClick={() => scrollToSection('services')}
            className="text-primary-custom hover:text-bronze transition-colors font-medium"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="text-primary-custom hover:text-bronze transition-colors font-medium"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-primary-custom hover:text-bronze transition-colors font-medium"
          >
            Contact
          </button>
        </motion.div>

        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
			onClick={() => scrollToSection('contact')}
			className="hidden sm:block bg-gradient-to-r from-bronze to-silver text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
            Get Quote
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden mt-4 liquid-morph p-6 mx-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-primary-custom hover:text-bronze transition-colors text-left font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-primary-custom hover:text-bronze transition-colors text-left font-medium"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-primary-custom hover:text-bronze transition-colors text-left font-medium"
            >
              Contact
            </button>
            <Button className="bg-gradient-to-r from-bronze to-silver text-white rounded-full hover:shadow-lg transition-all w-full">
              Get Quote
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
