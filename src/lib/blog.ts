export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "knowledge" | "inspiration" | "all";
  image: string;
  date: string;
  author?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How Custom Packaging Lane Sets the Shipping Standard in the Packaging Industry",
    excerpt: "Learn how we revolutionize packaging standards...",
    category: "knowledge",
    image: "/hero-section.png",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Shoe Box Dimensions Explained: Sizes, Fit & Packaging Guide",
    excerpt: "Complete guide to shoe box sizing and specifications...",
    category: "knowledge",
    image: "/Custom-tuck-boxes.png",
    date: "2024-01-14",
  },
  {
    id: "3",
    title: "What is a Mylar Bag? Your Guide to Storage and Protection",
    excerpt: "Everything you need to know about mylar packaging...",
    category: "inspiration",
    image: "/Cosmetic-packaging.png",
    date: "2024-01-13",
  },
  {
    id: "4",
    title: "Secure Storage Solutions for Pre Roll Packaging Products",
    excerpt: "Best practices for storing and protecting pre roll boxes...",
    category: "knowledge",
    image: "/Custom-mailer-boxes.png",
    date: "2024-01-12",
  },
  {
    id: "5",
    title: "Are Cereal Boxes Recyclable? Build a Sustainable Brand with Cereal Packaging",
    excerpt: "Sustainable packaging solutions for cereal and food products...",
    category: "inspiration",
    image: "/Retail-packaging.png",
    date: "2024-01-11",
  },
  {
    id: "6",
    title: "Understand the Difference Between RGB and CMYK for Design Projects",
    excerpt: "Master color modes for professional packaging design...",
    category: "knowledge",
    image: "/Food-Packaging.png",
    date: "2024-01-10",
  },
  {
    id: "7",
    title: "Why Color Profiles Matter: sRGB, Adobe RGB, and CMYK Explained",
    excerpt: "Deep dive into color management for packaging design...",
    category: "inspiration",
    image: "/Beverage-Packaging.png",
    date: "2024-01-09",
  },
  {
    id: "8",
    title: "How to Make Cardboard Waterproof: 6 Easy and Reliable Solutions",
    excerpt: "Protect your products with waterproof packaging techniques...",
    category: "knowledge",
    image: "/hero-section.png",
    date: "2024-01-08",
  },
  {
    id: "9",
    title: "FSC vs. ISC Boxes: Which Would Deliver As Per Your Packaging Needs?",
    excerpt: "Compare sustainable packaging certification standards...",
    category: "inspiration",
    image: "/Custom-tuck-boxes.png",
    date: "2024-01-07",
  },
];

export function getBlogPosts(category?: string) {
  if (!category || category === "all") return BLOG_POSTS;
  return BLOG_POSTS.filter((post) => post.category === category);
}

export const BLOG_CATEGORIES = [
  { id: "knowledge", label: "Knowledge Base" },
  { id: "inspiration", label: "Inspiration" },
  { id: "all", label: "All Post" },
];
