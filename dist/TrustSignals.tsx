import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, Star, CheckCircle } from "lucide-react";

export function TrustSignals() {
  const trustItems = [
    {
      icon: Award,
      title: "Certified Watchmaker",
      description: "Our professional watch repairer"
    },
    {
      icon: Shield,
      title: "Secure & Insured Service",
      description: "Your timepieces are looked after during service and repair"
    },
    {
      icon: Clock,
      title: "Precision Guaranteed"
    },
	{
      icon: Shield,
      title: "Secure and trusted Website"
    }
  ];

  const testimonials = [
    {
      name: "Liam De Wet",
      role: "Vintage Watch Collector",
      comment: "My watch we excelently repaired by Corbin and for a reasonable price, I was well pleased.",
      rating: 5,
      image: ""
    }
  ];

  return (
    <section className="py-20 bg-espresso/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust Signals */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl font-bold text-primary-custom mb-4">
            Trusted Excellence in Horology
          </h2>
          <p className="text-lg text-muted-custom max-w-2xl mx-auto font-medium">
            When precision matters, trust the experts who understand the art and science of timekeeping.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {trustItems.map((item, index) => (
            <motion.div 
              key={index}
              className="text-center liquid-morph p-6 hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-bronze to-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="text-white text-xl" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary-custom mb-2">
                {item.title}
              </h3>
              <p className="text-muted-custom text-sm mb-3">
                {item.description}
              </p>
              <div className="text-bronze font-semibold text-sm">
                {item.stats}
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  );
}
