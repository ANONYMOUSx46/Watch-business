import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

export function Gallery() {
  // Static gallery data for Netlify hosting
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Vintage Omega Seamaster Restoration",
      description: "Complete restoration of a 1960s Omega Seamaster including case polishing, movement service, and dial refinishing.",
      beforeImageUrl: "/watch6.jpg",
      afterImageUrl: "/watch.jpeg",
      watchmakerName: "Liam De Wet",
      serviceType: "Vintage Restoration",
      completionTime: "6 weeks",
      featured: true
    },
    {
      id: 2,
      title: "Rolex Submariner Service",
      description: "Full service and maintenance of a Rolex Submariner, including crystal replacement and bracelet refurbishment.",
      beforeImageUrl: "/watch2.jpeg",
      afterImageUrl: "/watch3.jpeg",
      watchmakerName: "Liam De Wet",
      serviceType: "Luxury Service",
      completionTime: "4 weeks",
      featured: true
    },
    {
      id: 3,
      title: "Mechanical Watch Movement Repair",
      description: "Complex movement repair involving gear replacement and regulation adjustment for optimal accuracy.",
      beforeImageUrl: "/watch4.jpeg",
      afterImageUrl: "/watch5.jpeg",
      watchmakerName: "Liam De Wet",
      serviceType: "Movement Repair",
      completionTime: "3 weeks",
      featured: true
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-espresso/20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-custom mb-4">
            Before & After Gallery
          </h2>
          <p className="text-lg text-muted-custom max-w-2xl mx-auto font-medium">
            Witness the transformation of timepieces through expert restoration and repair by our watch repairer.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems?.map((item, index) => (
            <motion.div 
              key={item.id}
              className="liquid-morph p-6 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="font-playfair text-xl font-bold text-primary-custom mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-custom text-sm mb-4">
                  {item.description}
                </p>
              </div>

              {/* Before & After Images */}
              <div className="space-y-4 mb-6">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={item.beforeImageUrl}
                    alt="Before restoration"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">Before</Badge>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={item.afterImageUrl}
                    alt="After restoration"
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-500 text-white">After</Badge>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-custom">
                    <User className="w-4 h-4 mr-2 text-bronze" />
                    <span>Craftsman:</span>
                  </div>
                  <span className="font-semibold text-primary-custom">
                    {item.watchmakerName}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-custom">Service:</span>
                  <Badge variant="secondary">{item.serviceType}</Badge>
                </div>
                
              </div>

            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button className="bg-gradient-to-r from-bronze to-silver text-white px-8 py-3 rounded-full hover:shadow-lg transition-all">
            View Complete Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
