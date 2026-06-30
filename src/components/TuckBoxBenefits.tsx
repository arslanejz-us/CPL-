"use client";

import {
  Shield,
  Leaf,
  Zap,
  BarChart3,
  Package,
  Palette,
} from "lucide-react";

export default function TuckBoxBenefits() {
  const benefits = [
    {
      icon: Shield,
      title: "Durable Protection",
      description: "Premium materials protect your products during shipping and storage",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly Options",
      description: "Sustainable materials that appeal to conscious consumers",
    },
    {
      icon: Zap,
      title: "Quick Assembly",
      description: "Easy to assemble with minimal additional materials or glue",
    },
    {
      icon: BarChart3,
      title: "Cost-Effective",
      description: "Competitive pricing without compromising on quality",
    },
    {
      icon: Package,
      title: "Space Efficient",
      description: "Flat-folded design reduces storage and shipping costs",
    },
    {
      icon: Palette,
      title: "Full Customization",
      description: "Complete design freedom with unlimited colors and printing options",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Why Choose Custom Tuck Boxes?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Professional packaging that protects your brand and products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary/10 text-brand-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-secondary">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
