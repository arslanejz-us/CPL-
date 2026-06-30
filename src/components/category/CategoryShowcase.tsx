"use client";

import Image from "next/image";
import Placeholder from "../Placeholder";
import cosmeticImg from "../../../public/Cosmetic-packaging.png";
import retailImg from "../../../public/Retail-packaging.png";
import beverageImg from "../../../public/Beverage-Packaging.png";
import foodImg from "../../../public/Food-Packaging.png";

interface CategoryShowcaseProps {
  category: string;
}

const SHOWCASE_DATA: Record<string, any[]> = {
  "custom-tuck-boxes": [
    { id: 1, title: "Cosmetic Products", description: "Perfect for skincare and beauty products", image: cosmeticImg },
    { id: 2, title: "Retail Products", description: "Ideal for retail store shelves", image: retailImg },
    { id: 3, title: "Beverage Products", description: "Suitable for drinks and beverages", image: beverageImg },
    { id: 4, title: "Food Products", description: "Great for food and snack items", image: foodImg },
  ],
  "cosmetic-boxes": [
    { id: 1, title: "Skincare Products", description: "Perfect for creams and serums", image: cosmeticImg },
    { id: 2, title: "Makeup Products", description: "Ideal for makeup sets", image: cosmeticImg },
    { id: 3, title: "Beauty Kits", description: "Great for gift sets", image: retailImg },
    { id: 4, title: "Premium Line", description: "Luxury cosmetic packaging", image: cosmeticImg },
  ],
  "soap-boxes": [
    { id: 1, title: "Artisan Soap", description: "Perfect for handmade soap", image: foodImg },
    { id: 2, title: "Soap Sets", description: "Ideal for soap collections", image: retailImg },
    { id: 3, title: "Gift Boxes", description: "Great for corporate gifts", image: cosmeticImg },
    { id: 4, title: "Retail Soap", description: "Commercial soap packaging", image: retailImg },
  ],
  "mailer-boxes": [
    { id: 1, title: "Small Items", description: "Perfect for accessories", image: retailImg },
    { id: 2, title: "Medium Boxes", description: "Ideal for clothing items", image: retailImg },
    { id: 3, title: "Large Packages", description: "Great for multiple items", image: beverageImg },
    { id: 4, title: "Custom Sizes", description: "Any size you need", image: foodImg },
  ],
};

export default function CategoryShowcase({ category }: CategoryShowcaseProps) {
  const items = SHOWCASE_DATA[category] || SHOWCASE_DATA["custom-tuck-boxes"];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Showcase Your Products
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Our packaging works across multiple industries and product types
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group">
              <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Placeholder label={item.title} className="h-full" />
                )}
              </div>
              <h3 className="text-lg font-bold text-brand-secondary">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
