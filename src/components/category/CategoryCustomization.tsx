"use client";

import { CheckCircle2 } from "lucide-react";

interface CategoryCustomizationProps {
  category: string;
}

const CUSTOMIZATION_OPTIONS = [
  {
    category: "Design",
    items: ["Custom Printing", "Full Color CMYK", "Pantone Colors", "Metallic Inks"],
  },
  {
    category: "Finishing",
    items: ["Matte Finish", "Glossy Finish", "Spot UV Coating", "Embossing"],
  },
  {
    category: "Size & Shape",
    items: ["Custom Dimensions", "Die-cut Designs", "Window Cutouts", "Handle Options"],
  },
  {
    category: "Materials",
    items: ["Kraft Paper", "White Cardboard", "Corrugated", "Rigid Board"],
  },
];

export default function CategoryCustomization({ category }: CategoryCustomizationProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Customize Every Detail
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            With unlimited customization options, create packaging that perfectly represents your brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CUSTOMIZATION_OPTIONS.map((option, idx) => (
            <div key={idx} className="bg-gradient-to-br from-brand-light to-white rounded-2xl p-8 border border-brand-primary/10">
              <h3 className="text-2xl font-bold text-brand-secondary mb-6">
                {option.category}
              </h3>
              <ul className="space-y-3">
                {option.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our design team is ready to bring your vision to life. Let's create something amazing together.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-8 rounded-md transition-colors"
          >
            Start Your Custom Design
          </a>
        </div>
      </div>
    </section>
  );
}
