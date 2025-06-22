import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema, insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Watchmaker routes
  app.get("/api/watchmakers", async (req, res) => {
    try {
      const { specialization } = req.query;
      let watchmakers;
      
      if (specialization && typeof specialization === 'string') {
        watchmakers = await storage.getWatchmakersBySpecialization(specialization);
      } else {
        watchmakers = await storage.getAllWatchmakers();
      }
      
      res.json(watchmakers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchmakers" });
    }
  });

  app.get("/api/watchmakers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const watchmaker = await storage.getWatchmaker(id);
      
      if (!watchmaker) {
        return res.status(404).json({ message: "Watchmaker not found" });
      }
      
      res.json(watchmaker);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchmaker" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    try {
      const { category } = req.query;
      let services;
      
      if (category && typeof category === 'string') {
        services = await storage.getServicesByCategory(category);
      } else {
        services = await storage.getAllServices();
      }
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Quote routes
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.status(201).json(quote);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid quote data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create quote" });
    }
  });

  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const quote = await storage.getQuote(id);
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid contact data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const { featured } = req.query;
      let galleryItems;
      
      if (featured === 'true') {
        galleryItems = await storage.getFeaturedGalleryItems();
      } else {
        galleryItems = await storage.getAllGalleryItems();
      }
      
      res.json(galleryItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  app.get("/api/gallery/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const galleryItem = await storage.getGalleryItem(id);
      
      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      
      res.json(galleryItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
