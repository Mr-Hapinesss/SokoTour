// DATA TO FILL THE HOMEPAGE

const markets = [
  { name: "Maasai Market", location: "Nairobi CBD", tag: "Crafts & Beadwork" },
  { name: "Gikomba Market", location: "Nairobi East", tag: "Vintage & Textiles" },
  { name: "City Market", location: "Moi Avenue", tag: "Produce & Spices" },
  { name: "Toi Market", location: "Kibera", tag: "Fashion & Accessories" },
  { name: "Ngara Market", location: "Ngara", tag: "Wholesale Goods" },
  { name: "Kongowea", location: "Mombasa", tag: "Coastal Crafts" },
];

const reviews = [
  {
    name: "Amira Hassan",
    role: "Travel Blogger",
    stars: 5,
    text: "SokoTour completely transformed how I experience Nairobi markets. My guide knew every vendor by name — I left with treasures I'd never have found alone.",
    avatar: "AH",
    color: "bg-amber-500",
  },
  {
    name: "James Oduor",
    role: "Business Traveller",
    stars: 5,
    text: "Sourcing authentic Kenyan textiles used to take days. With SokoTour it took two hours and I got wholesale prices. Absolutely worth it.",
    avatar: "JO",
    color: "bg-green-700",
  },
  {
    name: "Sophie Müller",
    role: "Cultural Explorer",
    stars: 5,
    text: "The guide didn't just translate — she gave context, stories, history. Gikomba Market felt like a living museum.",
    avatar: "SM",
    color: "bg-orange-700",
  },
  {
    name: "David Kamau",
    role: "Local Entrepreneur",
    stars: 4,
    text: "Even as a Kenyan, I learned shortcuts and supplier contacts I never knew about. SokoTour guides are absolute insiders.",
    avatar: "DK",
    color: "bg-yellow-700",
  },
];

const faqs = [
  {
    q: "How are guides matched to me?",
    a: "After you sign up and complete a short preference survey, our algorithm matches you with a guide who specialises in the markets you want to explore, speaks your preferred language, and fits your pace — whether you're a bargain-hunter, cultural enthusiast, or sourcing buyer.",
  },
  {
    q: "Are the markets safe to visit?",
    a: "Yes! Our guides are vetted locals who know every market inside-out. They'll keep you oriented, help you navigate busy corridors, and ensure you're never overcharged.",
  },
  {
    q: "How much does a guided tour cost?",
    a: "Tours start at KES 2,500 for a half-day. Full-day and multi-market packages are available. Pricing is transparent — no hidden fees.",
  },
  {
    q: "Can I book for a group?",
    a: "Absolutely. We accommodate solo travellers up to groups of 12. Corporate and incentive travel packages are available on request.",
  },
];

const stats = [
  { value: "40+", label: "Markets Covered" },
  { value: "3,200+", label: "Happy Explorers" },
  { value: "120+", label: "Local Guides" },
  { value: "4.9★", label: "Average Rating" },
];

export { markets, reviews, faqs, stats };