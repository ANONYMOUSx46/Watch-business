import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

export function Gallery() {
  const { data: galleryItems, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery", { featured: true }],
  });

  if (isLoading) {
    return (
      <section id="gallery" className="py-20 bg-espresso/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-600 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
