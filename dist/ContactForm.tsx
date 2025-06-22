import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, CheckCircle } from "lucide-react";
import type { z } from "zod";

type ContactFormData = z.infer<typeof insertContactSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll respond within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-navy dark:text-ivory mb-2">Message Sent Successfully!</h3>
        <p className="text-navy/70 dark:text-ivory/70 mb-6">We've received your message and will get back to you within 24 hours.</p>
        <Button onClick={() => setIsSubmitted(false)} variant="outline" className="border-bronze text-bronze hover:bg-bronze hover:text-white">
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="liquid-morph border-none">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl text-navy dark:text-ivory flex items-center">
          <Mail className="mr-3 text-bronze" />
          Get In Touch
        </CardTitle>
        <p className="text-navy/70 dark:text-ivory/70">
          Have questions about our services? Need expert advice? We're here to help with all your watch repair needs.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Netlify required hidden input */}
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} name="name" placeholder="Your full name" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} name="email" type="email" placeholder="your.email@example.com" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} name="subject" placeholder="What can we help you with?" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} name="message" rows={5} placeholder="Please provide details about your inquiry..." required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-bronze to-silver text-white py-3 rounded-full hover:shadow-lg transition-all"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
