import type { Product, StoreLocation, WelcomeModal, HeroSlide, ShopStat, SocialLinks, GalleryImage, Owner } from "@/types/sweets";

export const products: Product[] = [
  {
    id: "1",
    name: "Kesar Sandesh",
    slug: "kesar-sandesh",
    description: "Saffron-infused chhena sandesh, made fresh every morning.",
    imageUrl: "https://picsum.photos/seed/kesar-sandesh/400/400",
    price: 220,
    isBestseller: true,
    isSeasonal: false,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Spongy Rosogolla",
    slug: "spongy-rosogolla",
    description: "Soft, syrup-soaked rosogolla, a Bengali classic.",
    imageUrl: "https://picsum.photos/seed/rosogolla-2/400/400",
    price: 180,
    isBestseller: true,
    isSeasonal: false,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Nolen Gur Sandesh",
    slug: "nolen-gur-sandesh",
    description: "Winter-special sandesh made with date-palm jaggery.",
    imageUrl: "https://picsum.photos/seed/nolen-gur/400/400",
    price: 250,
    isBestseller: false,
    isSeasonal: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Mishti Doi",
    slug: "mishti-doi",
    description: "Traditional sweetened yogurt, set in clay pots.",
    imageUrl: "https://picsum.photos/seed/mishti-doi/400/400",
    price: 160,
    isBestseller: true,
    isSeasonal: false,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Chomchom",
    slug: "chomchom",
    description: "Cylindrical chhena sweet, soaked in light sugar syrup.",
    imageUrl: "https://picsum.photos/seed/chomchom/400/400",
    price: 200,
    isBestseller: true,
    isSeasonal: false,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Nimki",
    slug: "nimki",
    description: "Crispy, savoury fried snack — perfect with evening tea.",
    imageUrl: "https://picsum.photos/seed/nimki/400/400",
    price: 80,
    isBestseller: false,
    isSeasonal: false,
    isFeatured: false,
  },
  {
    id: "7",
    name: "Pantua",
    slug: "pantua",
    description: "Deep-fried chhena sweet in a rich sugar syrup.",
    imageUrl: "https://picsum.photos/seed/pantua/500/375",
    price: 190,
    isBestseller: false,
    isSeasonal: false,
    isFeatured: false,
  },
  {
    id: "8",
    name: "Kachagolla",
    slug: "kachagolla",
    description: "Soft, grainy chhena sweet, lightly sweetened.",
    imageUrl: "https://picsum.photos/seed/kachagolla/500/375",
    price: 210,
    isBestseller: false,
    isSeasonal: false,
    isFeatured: false,
  },
  {
    id: "9",
    name: "Aloo Chop",
    slug: "aloo-chop",
    description: "Spiced potato fritters, a classic evening snack.",
    imageUrl: "https://picsum.photos/seed/aloo-chop/500/375",
    price: 60,
    isBestseller: false,
    isSeasonal: false,
    isFeatured: false,
  },
];

export const sweetNames = products.map((p) => p.name);

export const bestSellers = products.filter((p) => p.isBestseller);
export const featuredProducts = products.filter((p) => p.isFeatured);

export const storeLocation: StoreLocation = {
  id: "1",
  name: "Nobanno Sweets",
  address: "Solingmor (Fulbaria Road), Mawna, Sreepur, Gazipur",
  phone: "01889983850",
  hours: "9:00 AM – 9:00 PM, Every Day",
  mapEmbedUrl: "",
  latitude: 24.200001,
  longitude: 90.467003,
};

export const welcomeModal: WelcomeModal = {
  enabled: true,
  imageUrl: "https://picsum.photos/seed/welcome/800/1000",
  altText: "Nobanno Sweets festive announcement",
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/seed/carousel-1/1600/900",
    headline: "Kolkata's sweetness, made fresh every day",
    subtext: "Traditional Bengali mishti and snacks, handcrafted at our shop.",
    ctaLabel: "View Menu",
    ctaHref: "/menu",
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/seed/carousel-2/1600/900",
    headline: "Winter specials are here",
    subtext: "Nolen gur sandesh, made only while the season lasts.",
    ctaLabel: "See Seasonal Picks",
    ctaHref: "/menu",
  },
  {
    id: "3",
    imageUrl: "https://picsum.photos/seed/carousel-3/1600/900",
    headline: "Visit us in Gazipur",
    subtext: "Fresh sweets, made daily, ready to take home.",
    ctaLabel: "Find Our Shop",
    ctaHref: "/#visit-us",
  },
];

export const shopStats: ShopStat[] = [
  { value: "25+", label: "Varieties" },
  { value: "500+", label: "Customers Served" },
];

export const socialLinks: SocialLinks = {
  facebookUrl: "https://www.facebook.com/nobannosweets",
  instagramUrl: "https://instagram.com/nobannosweets",
  youtubeUrl: "https://youtube.com/@nobannosweets",
};

export const galleryImages: GalleryImage[] = [
  { id: "1", imageUrl: "https://picsum.photos/seed/gallery-1/500/650", altText: "Fresh sandesh being shaped by hand" },
  { id: "2", imageUrl: "https://picsum.photos/seed/gallery-2/500/500", altText: "Nobanno Sweets shop front" },
  { id: "3", imageUrl: "https://picsum.photos/seed/gallery-3/500/750", altText: "Trays of fresh rosogolla" },
  { id: "4", imageUrl: "https://picsum.photos/seed/gallery-4/500/550", altText: "Festive gift boxes ready for pickup" },
  { id: "5", imageUrl: "https://picsum.photos/seed/gallery-5/500/650", altText: "Sweet-making in the kitchen" },
  { id: "6", imageUrl: "https://picsum.photos/seed/gallery-6/500/500", altText: "Display counter of assorted sweets" },
  { id: "7", imageUrl: "https://picsum.photos/seed/gallery-7/500/700", altText: "Nolen gur sandesh, seasonal favourite" },
  { id: "8", imageUrl: "https://picsum.photos/seed/gallery-8/500/550", altText: "Customers browsing the shop" },
  { id: "9", imageUrl: "https://picsum.photos/seed/gallery-9/500/650", altText: "Fresh chomchom in syrup" },
  { id: "10", imageUrl: "https://picsum.photos/seed/gallery-10/500/500", altText: "Packaging a festival order" },
];

export const owner: Owner = {
  name: "Owner's Name", // replace with real name
  role: "Founder, Nobanno Sweets",
  photoUrl: "https://picsum.photos/seed/owner/500/600",
  bio: "Growing up around his family's kitchen, [Owner] learned every recipe by hand before he ever thought of opening a shop. He started Nobanno Sweets with a simple goal — bring that same homemade quality to more people. Today he's still involved in the kitchen every single day.",
};