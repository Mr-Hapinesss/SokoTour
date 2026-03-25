export const MARKETS = [
  { name: "Maasai Market",  location: "Nairobi CBD",  tag: "Crafts & Beadwork",     emoji: "🛖", color: "#E8860A" },
  { name: "Gikomba Market", location: "Nairobi East", tag: "Vintage & Textiles",    emoji: "👗", color: "#3D6B4F" },
  { name: "City Market",    location: "Moi Avenue",   tag: "Produce & Spices",      emoji: "🥬", color: "#7C3B0F" },
  { name: "Toi Market",     location: "Kibera",       tag: "Fashion & Accessories", emoji: "👠", color: "#B5621E" },
  { name: "Ngara Market",   location: "Ngara",        tag: "Wholesale Goods",       emoji: "📦", color: "#2D5A3F" },
  { name: "Kongowea",       location: "Mombasa",      tag: "Coastal Crafts",        emoji: "🐚", color: "#C4732A" },
];

export const GUIDES = [
  { name: "Grace Wanjiru", specialty: "Maasai Market",  rating: 4.9, reviews: 120, initials: "GW", color: "#3D6B4F" },
  { name: "Brian Otieno",  specialty: "Gikomba Market", rating: 4.8, reviews: 98,  initials: "BO", color: "#E8860A" },
  { name: "Fatuma Said",   specialty: "Kongowea",       rating: 5.0, reviews: 74,  initials: "FS", color: "#7C3B0F" },
  { name: "James Kariuki", specialty: "City Market",    rating: 4.7, reviews: 143, initials: "JK", color: "#B5621E" },
];

export const PAST_TOURS = [
  { market: "Maasai Market", guide: "Grace Wanjiru", date: "12 Mar 2026", status: "completed", emoji: "🛖" },
  { market: "City Market",   guide: "James Kariuki", date: "28 Feb 2026", status: "completed", emoji: "🥬" },
];

export const UPCOMING_TOURS = [
  { market: "Gikomba Market", guide: "Brian Otieno", date: "2 Apr 2026", status: "upcoming", emoji: "👗" },
];

export const LOCATIONS = [
  "Nairobi CBD", "Westlands", "Kibera", "Ngara",
  "Eastleigh", "Karen", "Mombasa", "Kisumu", "Other",
];

export const DURATIONS = [
  { label: "1 – 2 hours",        value: "1-2hrs"   },
  { label: "Half day (3–4 hrs)", value: "half-day" },
  { label: "Full day",           value: "full-day" },
  { label: "Custom",             value: "custom"   },
];
