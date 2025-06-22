import { motion } from "framer-motion";
import { Watch, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { QuoteForm } from "./QuoteForm";
import { ContactForm } from "./ContactForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Footer() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        {/* Background with elegant watch workshop */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606381888154-de6a8becd6b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-espresso/80 to-navy/90"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Restore Your Timepiece?
            </h2>
            <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium">
              Connect with our watch repairer for expert consultation and professional service. Your timepiece deserves the finest care.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="quote" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur">
                <TabsTrigger value="quote" className="text-white data-[state=active]:bg-bronze data-[state=active]:text-white">
                  Get Quote
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-white data-[state=active]:bg-bronze data-[state=active]:text-white">
                  Contact Us
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="quote">
                <QuoteForm />
              </TabsContent>
              
              <TabsContent value="contact">
                <ContactForm />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-espresso text-ivory py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-bronze to-silver rounded-full flex items-center justify-center">
                  <Watch className="text-white text-lg" />
                </div>
                <h3 className="font-playfair text-xl font-bold">NAME</h3>
              </div>
              <p className="text-ivory/85 mb-4 font-medium">
                Connecting watch enthusiasts with master craftsmanship for premium repair and restoration services.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-bronze/20 rounded-full flex items-center justify-center hover:bg-bronze transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-ivory/85">
                <li><a href="#" className="hover:text-bronze transition-colors font-medium">Vintage Watch Restoration</a></li>
                <li><a href="#" className="hover:text-bronze transition-colors font-medium">Luxury Watch Service</a></li>
                <li><a href="#" className="hover:text-bronze transition-colors font-medium">Movement Repair</a></li>
                <li><a href="#" className="hover:text-bronze transition-colors font-medium">Complication Service</a></li>
                <li><a href="#" className="hover:text-bronze transition-colors font-medium">Authenticity Verification</a></li>
              </ul>
            </div>
            
            
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Contact Info</h4>
              <div className="space-y-3 text-ivory/85">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-bronze" />
                  <a href="liamjudedewet85@gmail.com" className="hover:text-bronze transition-colors font-medium">
                    liamjudedewet85@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-bronze" />
                  <a href="cell:+27 79 413 7016" className="hover:text-bronze transition-colors font-medium">
                    +27 79 413 7016
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-bronze" />
                  <address className="not-italic">
                    63 Civic Road Grassy Park | Cape Town<br />
                    <br />
                    
                  </address>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="border-t border-ivory/20 pt-8 text-center text-ivory/85 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 NEED A NAME. All rights reserved. Crafted with precision for horological excellence.</p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
