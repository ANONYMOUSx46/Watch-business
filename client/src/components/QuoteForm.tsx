import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertQuoteSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, CheckCircle } from "lucide-react";
import type { z } from "zod";

type QuoteFormData = z.infer<typeof insertQuoteSchema>;

export function QuoteForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(insertQuoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      watchBrand: "",
      watchModel: "",
      watchType: "",
      issueDescription: "",
      preferredService: "",
      urgency: "standard",
      budget: "",
    },
  });

  const onSubmit = () => {
    setIsSubmitted(true);
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24 hours with a detailed quote.",
    });
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-playfair text-2xl font-bold text-navy dark:text-ivory mb-2">
          Quote Request Submitted!
        </h3>
        <p className="text-navy/70 dark:text-ivory/70 mb-6">
          Thank you for your request. Our master watchmakers will review your timepiece details and provide a comprehensive quote within 24 hours.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          variant="outline"
          className="border-bronze text-bronze hover:bg-bronze hover:text-white"
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="liquid-morph border-none">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl text-navy dark:text-ivory flex items-center">
          <Clock className="mr-3 text-bronze" />
          Get Your Professional Quote
        </CardTitle>
        <p className="text-navy/70 dark:text-ivory/70">
          Provide details about your timepiece and we'll connect you with the perfect master watchmaker for your needs.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            name="quote"
            method="POST"
            data-netlify="true"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Hidden field required by Netlify */}
            <input type="hidden" name="form-name" value="quote" />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your full name" />
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
                      <Input {...field} type="email" placeholder="your.email@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+27 123 456 7890" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="watchBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watch Brand</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Rolex, Omega, Patek Philippe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="watchModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watch Model (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Submariner, Speedmaster" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="watchType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Watch Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select watch type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manual">Manual Wind</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="issueDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Please describe the issues with your watch, any symptoms you've noticed, and what repairs you think might be needed..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="preferredService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Service (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Full Service, Cleaning" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Urgency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Standard (2-4 weeks)</SelectItem>
                        <SelectItem value="priority">Priority (1-2 weeks)</SelectItem>
                        <SelectItem value="urgent">Urgent (Rush service)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., R200-250" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-bronze to-silver text-white py-3 rounded-full hover:shadow-lg transition-all"
            >
              Request Professional Quote
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
