// src/types/sweets.ts

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number; // in BDT
  isBestseller: boolean;
  isSeasonal: boolean;
  isFeatured: boolean;
};

export type StoreLocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
  latitude: number;
  longitude: number;
};

export type WelcomeModal = {
  enabled: boolean;
  imageUrl: string;
  altText: string;
};

export type HeroSlide = {
  id: string;
  imageUrl: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
};


export type ShopStat = {
  label: string;
  value: string;
};

export type SocialLinks = {
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
};

export type GalleryImage = {
  id: string;
  imageUrl: string;
  altText: string;
};

export type Owner = {
  name: string;
  role: string;
  photoUrl: string;
  bio: string; 
};