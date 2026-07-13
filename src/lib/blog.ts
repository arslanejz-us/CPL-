export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "knowledge" | "inspiration" | "all";
  image: string;
  date: string;
  author?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How Custom Packaging Lane Sets the Shipping Standard in the Packaging Industry",
    excerpt: "Learn how we revolutionize packaging standards...",
    category: "knowledge",
    image: "/hero-section.png",
    date: "2024-01-15",
    content: "Custom Packaging Lane has revolutionized the way businesses approach their packaging solutions. Our commitment to excellence, innovation, and sustainability has set new standards in the industry.\n\nWith over a decade of experience, we understand the unique challenges that businesses face when it comes to packaging. Whether you're a small startup or a large enterprise, we have the expertise and resources to deliver packaging solutions that meet your exact specifications.\n\nOur state-of-the-art facilities and expert team ensure that every package we produce meets the highest quality standards. We pride ourselves on our quick turnaround times, competitive pricing, and exceptional customer service.\n\nWe are committed to sustainability and offer eco-friendly packaging options that don't compromise on quality or aesthetics. Our innovative designs and materials help businesses reduce their environmental footprint while maintaining a premium brand image.",
  },
  {
    id: "2",
    title: "Shoe Box Dimensions Explained: Sizes, Fit & Packaging Guide",
    excerpt: "Complete guide to shoe box sizing and specifications...",
    category: "knowledge",
    image: "/Custom-tuck-boxes.png",
    date: "2024-01-14",
    content: "Understanding shoe box dimensions is crucial for proper product protection and efficient storage. The standard shoe box dimensions vary depending on the shoe size and type.\n\nMost women's shoe boxes typically measure around 12.5 x 8 x 5 inches, while men's shoe boxes are usually slightly larger at 13 x 8 x 6 inches. Athletic shoes may require larger boxes, sometimes reaching 14 x 10 x 6 inches.\n\nThe choice of shoe box dimensions affects shipping costs, storage space, and unboxing experience. Oversized boxes lead to higher shipping costs and require more protective materials. On the other hand, boxes that are too tight can damage the shoes.\n\nWhen designing custom shoe boxes, consider the shoe size, packaging materials, and any additional inserts or tissue wrapping. Our team at Custom Packaging Lane can help you determine the optimal dimensions for your shoe boxes to maximize protection while minimizing costs.",
  },
  {
    id: "3",
    title: "What is a Mylar Bag? Your Guide to Storage and Protection",
    excerpt: "Everything you need to know about mylar packaging...",
    category: "inspiration",
    image: "/Cosmetic-packaging.png",
    date: "2024-01-13",
    content: "Mylar bags have become increasingly popular for storing and protecting products, especially in the food, pharmaceutical, and cosmetic industries. These bags offer excellent protection against moisture, oxygen, and light.\n\nMylar is a polyester film that provides a barrier against external elements. The material is lightweight, flexible, and can be easily sealed. Mylar bags are available in various sizes and configurations, from small pouches to large bulk storage bags.\n\nThe advantages of using Mylar bags include:\n- Superior moisture barrier properties\n- Extended shelf life for products\n- Protection from UV light and oxidation\n- Lightweight and space-efficient storage\n- Excellent for both retail and bulk applications\n\nMylar bags are particularly useful for storing coffee, tea, herbs, spices, and other products that require protection from environmental factors. When properly sealed, Mylar bags can keep products fresh for years.",
  },
  {
    id: "4",
    title: "Secure Storage Solutions for Pre Roll Packaging Products",
    excerpt: "Best practices for storing and protecting pre roll boxes...",
    category: "knowledge",
    image: "/Custom-mailer-boxes.png",
    date: "2024-01-12",
    content: "Pre roll packaging requires special attention to ensure product quality, compliance, and safety. Whether you're in the cannabis industry or producing other pre-rolled products, proper storage solutions are essential.\n\nKey considerations for pre roll packaging storage:\n- Temperature control to prevent product degradation\n- Humidity management to preserve product quality\n- Light protection to prevent oxidation\n- Secure sealing to ensure child safety and compliance\n- Clear labeling for product information and compliance\n\nOur custom pre roll packaging solutions are designed to meet all regulatory requirements while providing an attractive presentation. We offer various materials including kraft paper, corrugated, and specialty finishes.\n\nCustom Packaging Lane specializes in creating compliant and professional pre roll packaging that helps your products stand out on retail shelves while maintaining optimal storage conditions.",
  },
  {
    id: "5",
    title: "Are Cereal Boxes Recyclable? Build a Sustainable Brand with Cereal Packaging",
    excerpt: "Sustainable packaging solutions for cereal and food products...",
    category: "inspiration",
    image: "/Retail-packaging.png",
    date: "2024-01-11",
    content: "Yes, most cereal boxes are recyclable! They are made from corrugated cardboard, which is one of the most recycled materials. Building a sustainable brand starts with choosing eco-friendly packaging solutions.\n\nBenefits of recyclable cereal box packaging:\n- Reduced environmental impact\n- Appeal to eco-conscious consumers\n- Lower carbon footprint compared to other materials\n- Cost-effective production and transportation\n- Compliance with sustainability regulations\n\nWhen designing sustainable cereal packaging, consider:\n- Using recycled content cardboard\n- Minimizing ink usage with simple, elegant designs\n- Avoiding plastic windows or coatings when possible\n- Using water-based inks and adhesives\n- Designing for easy recyclability\n\nCustom Packaging Lane offers sustainable cereal box packaging that doesn't compromise on design or functionality. Our eco-friendly materials and processes help your brand appeal to environmentally conscious consumers.",
  },
  {
    id: "6",
    title: "Understand the Difference Between RGB and CMYK for Design Projects",
    excerpt: "Master color modes for professional packaging design...",
    category: "knowledge",
    image: "/Food-Packaging.png",
    date: "2024-01-10",
    content: "Understanding the difference between RGB and CMYK color modes is essential for professional packaging design. These color models serve different purposes and produce different results.\n\nRGB (Red, Green, Blue):\n- Used for digital displays (screens, monitors, websites)\n- Additive color model where colors are created by combining light\n- Larger color gamut with vibrant colors\n- Not suitable for print production\n\nCMYK (Cyan, Magenta, Yellow, Black):\n- Used for print and physical packaging\n- Subtractive color model using inks\n- Smaller color gamut than RGB\n- Essential for accurate printed packaging\n\nWhen designing packaging for print, always work in CMYK color mode to ensure that the colors you see on your screen match the final printed product. RGB colors may appear differently when printed because of the fundamental differences in how light and ink interact.\n\nOur design team at Custom Packaging Lane understands these technical aspects and ensures your packaging designs are optimized for perfect print results.",
  },
  {
    id: "7",
    title: "Why Color Profiles Matter: sRGB, Adobe RGB, and CMYK Explained",
    excerpt: "Deep dive into color management for packaging design...",
    category: "inspiration",
    image: "/Beverage-Packaging.png",
    date: "2024-01-09",
    content: "Color profiles are critical for maintaining color consistency across different devices and print outputs. Understanding sRGB, Adobe RGB, and CMYK profiles is essential for professional packaging design.\n\nsRGB Color Profile:\n- Standard profile for web and digital displays\n- Compatible with most devices and screens\n- Smaller color gamut compared to Adobe RGB\n- Best for designs intended for digital viewing\n\nAdobe RGB Color Profile:\n- Larger color gamut than sRGB\n- Used by professional photographers and designers\n- Contains more color information\n- Requires proper color management software\n\nCMYK Color Profile:\n- Specific to print production\n- Represents ink colors used in printing\n- Limited color gamut but necessary for print accuracy\n- Should be used for all packaging design files sent to print\n\nWhen preparing your packaging design for production, ensure you're using the correct color profile. Converting from RGB to CMYK at the wrong time can result in color shifts and unsatisfactory print quality. Professional packaging designers use proper color management workflows to ensure consistent results.",
  },
  {
    id: "8",
    title: "How to Make Cardboard Waterproof: 6 Easy and Reliable Solutions",
    excerpt: "Protect your products with waterproof packaging techniques...",
    category: "knowledge",
    image: "/hero-section.png",
    date: "2024-01-08",
    content: "Waterproofing cardboard packaging is essential for products that need protection from moisture, humidity, and water exposure. Here are six proven methods to make your cardboard boxes waterproof.\n\n1. Wax Coating:\nApplying a wax coating to the exterior of cardboard creates a waterproof barrier. This method is cost-effective and works well for many applications.\n\n2. Plastic Lamination:\nLaminating cardboard with plastic film provides excellent water resistance and durability. This option is more expensive but offers superior protection.\n\n3. Polyethylene Lining:\nLining the inside of cardboard boxes with polyethylene creates a moisture barrier. This is commonly used for food packaging.\n\n4. Water-resistant Coating:\nSpecial water-resistant coatings can be applied to cardboard to repel moisture while maintaining the natural cardboard appearance.\n\n5. Corrugated Plastic Lining:\nUsing corrugated plastic material as an insert or lining provides superior water protection.\n\n6. Oil-resistant Treatment:\nChemical treatments can make cardboard resistant to both water and oil, ideal for certain product applications.\n\nCustom Packaging Lane offers all these waterproofing solutions customized to your specific needs and budget.",
  },
  {
    id: "9",
    title: "FSC vs. ISC Boxes: Which Would Deliver As Per Your Packaging Needs?",
    excerpt: "Compare sustainable packaging certification standards...",
    category: "inspiration",
    image: "/Custom-tuck-boxes.png",
    date: "2024-01-07",
    content: "Choosing between FSC and ISC certified boxes is an important decision for environmentally conscious brands. Understanding the differences helps you select the certification that best matches your values and business needs.\n\nFSC (Forest Stewardship Council):\n- Globally recognized certification\n- Ensures responsible forest management\n- Chain of custody tracking\n- Widely accepted by retailers and consumers\n- Higher certification costs\n- More stringent environmental standards\n\nISC (International Social Compliance):\n- Focuses on social and labor standards\n- Ensures ethical manufacturing practices\n- Worker rights and safety compliance\n- Growing recognition but less widespread than FSC\n- Complementary to environmental certifications\n\nBoth certifications have value:\n- FSC is ideal if environmental sustainability is your primary concern\n- ISC is better if ethical manufacturing practices are important\n- Many companies pursue both certifications for comprehensive sustainability\n- Your target market and values should guide your choice\n\nCustom Packaging Lane offers packaging with both FSC and ISC certifications, helping you build a brand that aligns with your sustainability goals and resonates with conscious consumers.",
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
