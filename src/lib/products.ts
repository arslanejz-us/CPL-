import { StaticImageData } from "next/image";

const CustomTuckBoxImg = require("../../public/Custom-tuck-boxes.png").default;
const RetailPackagingImg = require("../../public/Retail-packaging.png").default;
const CosmeticPackagingImg = require("../../public/Cosmetic-packaging.png").default;
const BeveragePackagingImg = require("../../public/Beverage-Packaging.png").default;

export interface CircularFeature {
  number: number;
  iconName: string;
  title: string;
  description: string;
}

export interface ContentSection {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  image: StaticImageData;
  imagePosition: "left" | "right";
}

export interface RelatedProduct {
  id: string;
  name: string;
  link: string;
}

export interface ProductShowcaseItem {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  heroImage: StaticImageData;
  heroQuickBenefits: string[];
  keyFeatures: {
    title: string;
    description: string;
    iconName: string;
  }[];
  packagingBenefits: {
    title: string;
    subtitle?: string;
    description?: string;
    image: StaticImageData;
    features: CircularFeature[];
  };
  contentSections: ContentSection[];
  showcaseItems: ProductShowcaseItem[];
  relatedProducts: RelatedProduct[];
}

// Sample product data
export const PRODUCTS: Record<string, Product> = {
  "straight-tuck-boxes": {
    id: "straight-tuck-boxes",
    name: "Straight Tuck Boxes",
    title: "Custom Straight Tuck Boxes",
    subtitle: "Professional, versatile, and cost-effective packaging",
    description:
      "Professional, versatile, and cost-effective packaging that protects your products while enhancing your brand presence on shelves.",
    badge: "PREMIUM PACKAGING SOLUTION",
    heroImage: CustomTuckBoxImg,
    heroQuickBenefits: [
      "Easy to assemble",
      "Excellent durability",
      "Fully customizable",
      "Eco-friendly options",
    ],
    keyFeatures: [
      {
        title: "Durable Protection",
        description: "Premium materials protect your products during shipping",
        iconName: "Shield",
      },
      {
        title: "Eco-Friendly Options",
        description: "Sustainable materials that appeal to conscious consumers",
        iconName: "Leaf",
      },
      {
        title: "Quick Assembly",
        description: "Easy to assemble with minimal additional materials",
        iconName: "Zap",
      },
      {
        title: "Cost-Effective",
        description: "Competitive pricing without compromising on quality",
        iconName: "Package",
      },
    ],
    packagingBenefits: {
      title: "Packaging Made Easier & Quicker",
      subtitle: "Streamlined Process from Design to Delivery",
      description:
        "Get your custom tuck boxes faster with our optimized production workflow",
      image: CustomTuckBoxImg,
      features: [
        {
          number: 1,
          iconName: "Zap",
          title: "Quick Design",
          description: "Fast turnaround on design approvals and customization",
        },
        {
          number: 2,
          iconName: "Package",
          title: "Fast Production",
          description: "Efficient manufacturing process ensures quick delivery",
        },
        {
          number: 3,
          iconName: "Leaf",
          title: "Easy Assembly",
          description: "Simple fold-and-tuck design requires minimal effort",
        },
        {
          number: 4,
          iconName: "Shield",
          title: "Reliable Quality",
          description: "Consistent quality control throughout production",
        },
      ],
    },
    contentSections: [
      {
        title: "Custom Tuck Boxes for Durable, Retail-Ready Product Packaging",
        subtitle: "Industry-Leading Packaging Solutions",
        description:
          "Our custom tuck boxes are engineered for optimal product protection while maintaining an attractive retail presence. Perfect for cosmetics, food, beverages, and retail products, these versatile boxes combine functionality with stunning visual impact.",
        bullets: [
          "Durable construction withstands shipping and handling",
          "Customizable sizes to fit your exact product specifications",
          "Full-color printing with premium finish options",
          "Eco-friendly materials available for sustainable brands",
          "Fast turnaround times without compromising quality",
          "Expert design assistance from our creative team",
        ],
        image: RetailPackagingImg,
        imagePosition: "right",
      },
      {
        title:
          "Premium-Grade Materials Tailored for Your Product Safety and Print Quality",
        subtitle: "Superior Materials & Craftsmanship",
        description:
          "We understand that packaging is the first point of contact with your customers. That's why we use only premium-grade materials and employ advanced printing techniques to ensure your brand stands out while protecting your products.",
        bullets: [
          "Premium cardboard stock with superior durability",
          "Advanced CMYK printing technology for vibrant colors",
          "Specialty finishing options including matte, gloss, and spot UV",
          "Reinforced tuck tabs for secure closure and longevity",
          "FDA-compliant materials for food and beverage products",
          "Moisture-resistant options for sensitive product protection",
        ],
        image: CustomTuckBoxImg,
        imagePosition: "left",
      },
    ],
    showcaseItems: [
      {
        id: 1,
        title: "Cosmetic Products",
        description: "Perfect for skincare and beauty products",
        image: CosmeticPackagingImg,
      },
      {
        id: 2,
        title: "Retail Products",
        description: "Ideal for retail store shelves",
        image: RetailPackagingImg,
      },
      {
        id: 3,
        title: "Beverage Products",
        description: "Suitable for drinks and beverages",
        image: BeveragePackagingImg,
      },
      {
        id: 4,
        title: "Food Products",
        description: "Great for food and snack items",
        image: CustomTuckBoxImg,
      },
    ],
    relatedProducts: [
      { id: "cosmetic-boxes", name: "Cosmetic Boxes", link: "/products/cosmetic-boxes" },
      { id: "mailer-boxes", name: "Mailer Boxes", link: "/products/mailer-boxes" },
      { id: "soap-boxes", name: "Soap Boxes", link: "/products/soap-boxes" },
    ],
  },
};

export function getProduct(productId: string): Product | undefined {
  return PRODUCTS[productId];
}

export function getAllProductIds(): string[] {
  return Object.keys(PRODUCTS);
}
