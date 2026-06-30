"use client";

import Image from "next/image";
import Placeholder from "../Placeholder";
import { ProductShowcaseItem } from "@/lib/products";

interface ProductShowcaseProps {
  items: ProductShowcaseItem[];
  productName: string;
}

export default function ProductShowcase({ items, productName }: ProductShowcaseProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Showcase Your Products
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            {productName} work across multiple industries and product types
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
