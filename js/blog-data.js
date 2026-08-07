/**
 * Blog posts and categories — static data (no external API).
 */
window.BLOG_CATEGORIES = [
  { id: "knowledge", label: "Knowledge Base" },
  { id: "inspiration", label: "Inspiration" },
  { id: "all", label: "All Post" },
];

window.BLOG_POSTS = [
  {
    id: "1",
    title: "How Custom Packaging Lane Sets the Shipping Standard in the Packaging Industry",
    category: "knowledge",
    image: "assets/images/hero-section.png",
  },
  {
    id: "2",
    title: "Shoe Box Dimensions Explained: Sizes, Fit & Packaging Guide",
    category: "knowledge",
    image: "assets/images/styles/custom-tuck-boxes.png",
  },
  {
    id: "3",
    title: "What is a Mylar Bag? Your Guide to Storage and Protection",
    category: "inspiration",
    image: "assets/images/industries/cosmetic-packaging.png",
  },
  {
    id: "4",
    title: "Secure Storage Solutions for Pre Roll Packaging Products",
    category: "knowledge",
    image: "assets/images/styles/custom-mailer-boxes.png",
  },
  {
    id: "5",
    title: "Are Cereal Boxes Recyclable? Build a Sustainable Brand with Cereal Packaging",
    category: "inspiration",
    image: "assets/images/industries/retail-packaging.png",
  },
  {
    id: "6",
    title: "Understand the Difference Between RGB and CMYK for Design Projects",
    category: "knowledge",
    image: "assets/images/industries/food-packaging.png",
  },
  {
    id: "7",
    title: "Why Color Profiles Matter: sRGB, Adobe RGB, and CMYK Explained",
    category: "inspiration",
    image: "assets/images/industries/beverage-packaging.png",
  },
  {
    id: "8",
    title: "How to Make Cardboard Waterproof: 6 Easy and Reliable Solutions",
    category: "knowledge",
    image: "assets/images/hero-section.png",
  },
  {
    id: "9",
    title: "FSC vs. ISC Boxes: Which Would Deliver As Per Your Packaging Needs?",
    category: "inspiration",
    image: "assets/images/styles/custom-tuck-boxes.png",
  },
];

window.getBlogPosts = function (category) {
  if (!category || category === "all") return window.BLOG_POSTS;
  return window.BLOG_POSTS.filter(function (post) {
    return post.category === category;
  });
};
