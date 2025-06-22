import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Watchmaker, Service, Quote, Contact, GalleryItem } from "@shared/schema";

// Watchmaker hooks
export function useWatchmakers(specialization?: string) {
  return useQuery<Watchmaker[]>({
    queryKey: ["/api/watchmakers", { specialization }],
  });
}

export function useWatchmaker(id: number) {
  return useQuery<Watchmaker>({
    queryKey: ["/api/watchmakers", id],
  });
}

// Service hooks
export function useServices(category?: string) {
  return useQuery<Service[]>({
    queryKey: ["/api/services", { category }],
  });
}

export function useService(id: number) {
  return useQuery<Service>({
    queryKey: ["/api/services", id],
  });
}

// Quote hooks
export function useQuotes() {
  return useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });
}

export function useCreateQuote() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/quotes", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
    },
  });
}

// Contact hooks
export function useContacts() {
  return useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
  });
}

// Gallery hooks
export function useGalleryItems(featured?: boolean) {
  return useQuery<GalleryItem[]>({
    queryKey: ["/api/gallery", { featured }],
  });
}

export function useGalleryItem(id: number) {
  return useQuery<GalleryItem>({
    queryKey: ["/api/gallery", id],
  });
}
