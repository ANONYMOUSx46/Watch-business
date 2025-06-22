// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  watchmakers;
  services;
  quotes;
  contacts;
  galleryItems;
  currentUserId;
  currentWatchmakerId;
  currentServiceId;
  currentQuoteId;
  currentContactId;
  currentGalleryItemId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.watchmakers = /* @__PURE__ */ new Map();
    this.services = /* @__PURE__ */ new Map();
    this.quotes = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.galleryItems = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentWatchmakerId = 1;
    this.currentServiceId = 1;
    this.currentQuoteId = 1;
    this.currentContactId = 1;
    this.currentGalleryItemId = 1;
    this.seedData();
  }
  seedData() {
    const watchmakerData = [
      {
        name: "OUR WATCH REPAIRER",
        email: "EMAIL",
        specialization: "Complicated Movements",
        experience: 22,
        hourlyRate: "225.00",
        rating: "5.0",
        reviewCount: 203,
        availability: "8 weeks",
        certifications: ["CERTS"],
        bio: "BIO",
        imageUrl: "",
        isActive: true
      }
    ];
    watchmakerData.forEach((data) => this.createWatchmaker(data));
    const serviceData = [
      {
        name: "Complete Movement Service",
        description: "Full disassembly, cleaning, lubrication, and reassembly of mechanical movements",
        category: "manual",
        basePrice: "DISCUSS",
        estimatedDuration: "2-3 weeks",
        imageUrl: "/watch5.jpeg"
      },
      {
        name: "Automatic Watch Calibration",
        description: "Precision adjustment and regulation of automatic watch movements",
        category: "automatic",
        basePrice: "DISCUSS",
        estimatedDuration: "1-2 weeks",
        imageUrl: "/watch4.jpeg"
      },
      {
        name: "Vintage Restoration",
        description: "Specialized restoration of vintage and antique timepieces",
        category: "vintage",
        basePrice: "DISCUSS",
        estimatedDuration: "4-6 weeks",
        imageUrl: "/watch6.jpg"
      },
      {
        name: "Luxury Complication Repair",
        description: "Expert repair of complex complications including perpetual calendars, minute repeaters",
        category: "luxury",
        basePrice: "DISCUSS",
        estimatedDuration: "6-12 weeks",
        imageUrl: "/watch3.jpeg"
      }
    ];
    serviceData.forEach((data) => this.createService(data));
    const galleryData = [
      {
        title: "WATCH REPAIR ONE",
        description: "Complete restoration of a vintage Omega Speedmaster including movement service and case refinishing",
        beforeImageUrl: "",
        afterImageUrl: "",
        watchmakerName: "Corbin Groenewald",
        serviceType: "Vintage Restoration",
        completionTime: "5 weeks",
        featured: true
      },
      {
        title: "WATCH REPAIR TWO",
        description: "Precision service of a Rolex Submariner 3135 movement with new crown and crystal",
        beforeImageUrl: "",
        afterImageUrl: "",
        watchmakerName: "Corbin Groenewald",
        serviceType: "Automatic Service",
        completionTime: "6 weeks",
        featured: true
      },
      {
        title: "WATCH REPAIR 3",
        description: "Expert repair of annual calendar complication on a Patek Philippe 5396",
        beforeImageUrl: "",
        afterImageUrl: "",
        watchmakerName: "Corbin Groenewald",
        serviceType: "",
        completionTime: "10 weeks",
        featured: true
      }
    ];
    galleryData.forEach((data) => this.createGalleryItem(data));
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Watchmaker operations
  async getAllWatchmakers() {
    return Array.from(this.watchmakers.values()).filter((w) => w.isActive);
  }
  async getWatchmaker(id) {
    return this.watchmakers.get(id);
  }
  async getWatchmakersBySpecialization(specialization) {
    return Array.from(this.watchmakers.values()).filter(
      (w) => w.specialization.toLowerCase().includes(specialization.toLowerCase()) && w.isActive
    );
  }
  async createWatchmaker(insertWatchmaker) {
    const id = this.currentWatchmakerId++;
    const watchmaker = {
      ...insertWatchmaker,
      id,
      hourlyRate: insertWatchmaker.hourlyRate || null,
      fixedRate: insertWatchmaker.fixedRate || null,
      bio: insertWatchmaker.bio || null,
      imageUrl: insertWatchmaker.imageUrl || null,
      certifications: insertWatchmaker.certifications || null,
      isActive: insertWatchmaker.isActive ?? true,
      reviewCount: insertWatchmaker.reviewCount ?? 0
    };
    this.watchmakers.set(id, watchmaker);
    return watchmaker;
  }
  // Service operations
  async getAllServices() {
    return Array.from(this.services.values());
  }
  async getService(id) {
    return this.services.get(id);
  }
  async getServicesByCategory(category) {
    return Array.from(this.services.values()).filter((s) => s.category === category);
  }
  async createService(insertService) {
    const id = this.currentServiceId++;
    const service = {
      ...insertService,
      id,
      imageUrl: insertService.imageUrl || null
    };
    this.services.set(id, service);
    return service;
  }
  // Quote operations
  async getAllQuotes() {
    return Array.from(this.quotes.values());
  }
  async getQuote(id) {
    return this.quotes.get(id);
  }
  async createQuote(insertQuote) {
    const id = this.currentQuoteId++;
    const quote = {
      ...insertQuote,
      id,
      phone: insertQuote.phone || null,
      watchModel: insertQuote.watchModel || null,
      preferredService: insertQuote.preferredService || null,
      budget: insertQuote.budget || null,
      createdAt: /* @__PURE__ */ new Date(),
      status: "pending"
    };
    this.quotes.set(id, quote);
    return quote;
  }
  async updateQuoteStatus(id, status) {
    const quote = this.quotes.get(id);
    if (quote) {
      quote.status = status;
      this.quotes.set(id, quote);
    }
    return quote;
  }
  // Contact operations
  async getAllContacts() {
    return Array.from(this.contacts.values());
  }
  async getContact(id) {
    return this.contacts.get(id);
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      status: "unread"
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async updateContactStatus(id, status) {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.status = status;
      this.contacts.set(id, contact);
    }
    return contact;
  }
  // Gallery operations
  async getAllGalleryItems() {
    return Array.from(this.galleryItems.values());
  }
  async getFeaturedGalleryItems() {
    return Array.from(this.galleryItems.values()).filter((item) => item.featured);
  }
  async getGalleryItem(id) {
    return this.galleryItems.get(id);
  }
  async createGalleryItem(insertGalleryItem) {
    const id = this.currentGalleryItemId++;
    const galleryItem = {
      ...insertGalleryItem,
      id,
      description: insertGalleryItem.description || null,
      completionTime: insertGalleryItem.completionTime || null,
      featured: insertGalleryItem.featured ?? false
    };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var watchmakers = pgTable("watchmakers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  specialization: text("specialization").notNull(),
  experience: integer("experience").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  fixedRate: decimal("fixed_rate", { precision: 10, scale: 2 }),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull().default(0),
  availability: text("availability").notNull(),
  certifications: text("certifications").array(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true)
});
var services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // "manual", "automatic", "vintage", "luxury"
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  estimatedDuration: text("estimated_duration").notNull(),
  imageUrl: text("image_url")
});
var quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  watchBrand: text("watch_brand").notNull(),
  watchModel: text("watch_model"),
  watchType: text("watch_type").notNull(),
  // "manual", "automatic", "digital"
  issueDescription: text("issue_description").notNull(),
  preferredService: text("preferred_service"),
  urgency: text("urgency").notNull(),
  // "standard", "priority", "urgent"
  budget: text("budget"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("pending")
  // "pending", "reviewed", "quoted", "completed"
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("unread")
  // "unread", "read", "responded"
});
var galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  beforeImageUrl: text("before_image_url").notNull(),
  afterImageUrl: text("after_image_url").notNull(),
  watchmakerName: text("watchmaker_name").notNull(),
  serviceType: text("service_type").notNull(),
  completionTime: text("completion_time"),
  featured: boolean("featured").notNull().default(false)
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertWatchmakerSchema = createInsertSchema(watchmakers).omit({
  id: true
});
var insertServiceSchema = createInsertSchema(services).omit({
  id: true
});
var insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  status: true
});
var insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/watchmakers", async (req, res) => {
    try {
      const { specialization } = req.query;
      let watchmakers2;
      if (specialization && typeof specialization === "string") {
        watchmakers2 = await storage.getWatchmakersBySpecialization(specialization);
      } else {
        watchmakers2 = await storage.getAllWatchmakers();
      }
      res.json(watchmakers2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch watchmakers" });
    }
  });
  app2.get("/api/watchmakers/:id", async (req, res) => {
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
  app2.get("/api/services", async (req, res) => {
    try {
      const { category } = req.query;
      let services2;
      if (category && typeof category === "string") {
        services2 = await storage.getServicesByCategory(category);
      } else {
        services2 = await storage.getAllServices();
      }
      res.json(services2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });
  app2.get("/api/services/:id", async (req, res) => {
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
  app2.post("/api/quotes", async (req, res) => {
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
  app2.get("/api/quotes", async (req, res) => {
    try {
      const quotes2 = await storage.getAllQuotes();
      res.json(quotes2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });
  app2.get("/api/quotes/:id", async (req, res) => {
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
  app2.post("/api/contacts", async (req, res) => {
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
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getAllContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const { featured } = req.query;
      let galleryItems2;
      if (featured === "true") {
        galleryItems2 = await storage.getFeaturedGalleryItems();
      } else {
        galleryItems2 = await storage.getAllGalleryItems();
      }
      res.json(galleryItems2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  app2.get("/api/gallery/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
