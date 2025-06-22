import { 
  users, watchmakers, services, quotes, contacts, galleryItems,
  type User, type InsertUser,
  type Watchmaker, type InsertWatchmaker,
  type Service, type InsertService,
  type Quote, type InsertQuote,
  type Contact, type InsertContact,
  type GalleryItem, type InsertGalleryItem
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Watchmaker operations
  getAllWatchmakers(): Promise<Watchmaker[]>;
  getWatchmaker(id: number): Promise<Watchmaker | undefined>;
  getWatchmakersBySpecialization(specialization: string): Promise<Watchmaker[]>;
  createWatchmaker(watchmaker: InsertWatchmaker): Promise<Watchmaker>;

  // Service operations
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  getServicesByCategory(category: string): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;

  // Quote operations
  getAllQuotes(): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  updateQuoteStatus(id: number, status: string): Promise<Quote | undefined>;

  // Contact operations
  getAllContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;

  // Gallery operations
  getAllGalleryItems(): Promise<GalleryItem[]>;
  getFeaturedGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private watchmakers: Map<number, Watchmaker>;
  private services: Map<number, Service>;
  private quotes: Map<number, Quote>;
  private contacts: Map<number, Contact>;
  private galleryItems: Map<number, GalleryItem>;
  private currentUserId: number;
  private currentWatchmakerId: number;
  private currentServiceId: number;
  private currentQuoteId: number;
  private currentContactId: number;
  private currentGalleryItemId: number;

  constructor() {
    this.users = new Map();
    this.watchmakers = new Map();
    this.services = new Map();
    this.quotes = new Map();
    this.contacts = new Map();
    this.galleryItems = new Map();
    this.currentUserId = 1;
    this.currentWatchmakerId = 1;
    this.currentServiceId = 1;
    this.currentQuoteId = 1;
    this.currentContactId = 1;
    this.currentGalleryItemId = 1;

    this.seedData();
  }

  private seedData() {
    // Seed watchmakers
    const watchmakerData: InsertWatchmaker[] = [
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

    watchmakerData.forEach(data => this.createWatchmaker(data));

    // Seed services
    const serviceData: InsertService[] = [
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

    serviceData.forEach(data => this.createService(data));

    // Seed gallery items
    const galleryData: InsertGalleryItem[] = [
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

    galleryData.forEach(data => this.createGalleryItem(data));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Watchmaker operations
  async getAllWatchmakers(): Promise<Watchmaker[]> {
    return Array.from(this.watchmakers.values()).filter(w => w.isActive);
  }

  async getWatchmaker(id: number): Promise<Watchmaker | undefined> {
    return this.watchmakers.get(id);
  }

  async getWatchmakersBySpecialization(specialization: string): Promise<Watchmaker[]> {
    return Array.from(this.watchmakers.values()).filter(
      w => w.specialization.toLowerCase().includes(specialization.toLowerCase()) && w.isActive
    );
  }

  async createWatchmaker(insertWatchmaker: InsertWatchmaker): Promise<Watchmaker> {
    const id = this.currentWatchmakerId++;
    const watchmaker: Watchmaker = { 
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
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByCategory(category: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.category === category);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { 
      ...insertService, 
      id,
      imageUrl: insertService.imageUrl || null
    };
    this.services.set(id, service);
    return service;
  }

  // Quote operations
  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { 
      ...insertQuote, 
      id, 
      phone: insertQuote.phone || null,
      watchModel: insertQuote.watchModel || null,
      preferredService: insertQuote.preferredService || null,
      budget: insertQuote.budget || null,
      createdAt: new Date(),
      status: "pending"
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async updateQuoteStatus(id: number, status: string): Promise<Quote | undefined> {
    const quote = this.quotes.get(id);
    if (quote) {
      quote.status = status;
      this.quotes.set(id, quote);
    }
    return quote;
  }

  // Contact operations
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date(),
      status: "unread"
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      contact.status = status;
      this.contacts.set(id, contact);
    }
    return contact;
  }

  // Gallery operations
  async getAllGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getFeaturedGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(item => item.featured);
  }

  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }

  async createGalleryItem(insertGalleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.currentGalleryItemId++;
    const galleryItem: GalleryItem = { 
      ...insertGalleryItem, 
      id,
      description: insertGalleryItem.description || null,
      completionTime: insertGalleryItem.completionTime || null,
      featured: insertGalleryItem.featured ?? false
    };
    this.galleryItems.set(id, galleryItem);
    return galleryItem;
  }
}

export const storage = new MemStorage();
