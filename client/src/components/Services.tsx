import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Service } from "@shared/schema";

export function Services() {
  // Static services data for Netlify hosting
  const services: Service[] = [
    {
      id: 1,
      name: "Manual Wind Service",
      description: "Complete disassembly, cleaning, lubrication, and reassembly of manual wind movements. Includes regulation and accuracy testing.",
      category: "manual",
      basePrice: "150.00",
      estimatedDuration: "2-3 weeks",
      imageUrl: "/watch2.jpeg"
    },
    {
      id: 2,
      name: "Automatic Watch Service",
      description: "Full service for automatic movements including rotor cleaning, mainspring replacement, and precision regulation.",
      category: "automatic",
      basePrice: "200.00",
      estimatedDuration: "3-4 weeks",
      imageUrl: "/watch3.jpeg"
    },
    {
      id: 3,
      name: "Vintage Watch Restoration",
      description: "Specialized restoration for vintage timepieces, including case polishing, dial refinishing, and movement conservation.",
      category: "vintage",
      basePrice: "300.00",
      estimatedDuration: "4-6 weeks",
      imageUrl: "/watch4.jpeg"
    },
    {
      id: 4,
      name: "Luxury Watch Service",
      description: "Premium service for high-end timepieces with specialized tools and techniques for luxury brands.",
      category: "luxury",
      basePrice: "400.00",
      estimatedDuration: "3-5 weeks",
      imageUrl: "/watch5.jpeg"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-espresso/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-custom mb-4">
            Premium Watch Services
          </h2>
          <p className="text-lg text-muted-custom max-w-2xl mx-auto font-medium">
            Expert repair and restoration services by our certified watchmaker. Each service is backed by our guarantee of precision and excellence.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services?.map((service) => (
            <motion.div 
              key={service.id}
              className="liquid-morph p-8 group hover:scale-105 transition-transform duration-300"
              variants={itemVariants}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img 
                  src={service.imageUrl || `C:\Users\Pamspc\Downloads\ArtMarketNavigator\ArtMarketNavigator\client\src\components\watch2.jpg`}
                  alt={service.name}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge 
                    className={`${
                      service.category === 'luxury' ? 'bg-bronze' : 
                      service.category === 'vintage' ? 'bg-silver text-navy' : 'bg-navy'
                    } text-white`}
                  >
                    {service.category === 'luxury' ? 'Luxury' : 
                     service.category === 'vintage' ? 'Vintage' : 
                     service.category === 'automatic' ? 'Automatic' : 'Manual'}
                  </Badge>
                </div>
              </div>
              
              <h3 className="font-playfair text-2xl font-bold text-primary-custom mb-3">
                {service.name}
              </h3>
              
              <p className="text-muted-custom mb-4 line-clamp-3">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-bronze font-semibold text-lg">
                  From ${service.basePrice}
                </span>
                <div className="flex text-bronze">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-muted-custom mb-4">
                <span className="font-semibold">Duration:</span> {service.estimatedDuration}
              </div>
              
              <Button className="w-full bg-gradient-to-r from-bronze to-silver text-white py-3 rounded-full font-medium hover:shadow-lg transition-all">
                Learn More
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
