"use client";

import Image from "next/image";
import Placeholder from "../Placeholder";

interface CategoryMaterialsProps {
  category: string;
}

const MATERIALS = [
  {
    id: 1,
    name: "Kraft Paper",
    description: "Recyclable and eco-friendly brown cardboard",
    features: ["100% Recyclable", "Cost-effective", "Natural look"],
  },
  {
    id: 2,
    name: "White Cardboard",
    description: "Bright white finish perfect for vibrant printing",
    features: ["Premium finish", "Excellent printability", "Professional look"],
  },
  {
    id: 3,
    name: "Corrugated Cardboard",
    description: "Strong and durable with enhanced protection",
    features: ["Extra durability", "Impact resistant", "Heavy-duty"],
  },
  {
    id: 4,
    name: "Rigid Board",
    description: "Premium thick board for luxury packaging",
    features: ["Premium feel", "High-quality", "Luxury brand ready"],
  },
];

export default function CategoryMaterials({ category }: CategoryMaterialsProps) {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Material Options
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Choose the perfect material for your packaging needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATERIALS.map((material) => (
            <div key={material.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-64 bg-gray-100">
                <Placeholder label={material.name} className="h-full" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-secondary mb-2">
                  {material.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {material.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {material.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
