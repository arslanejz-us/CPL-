"use client";

import Image, { StaticImageData } from "next/image";
import { Check } from "lucide-react";

interface ContentSection {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  image: StaticImageData;
  imagePosition: "left" | "right";
}

interface CategoryContentSectionsProps {
  sections: ContentSection[];
}

export default function CategoryContentSections({
  sections,
}: CategoryContentSectionsProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-16 lg:mb-24">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                section.imagePosition === "right" ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden ${
                  section.imagePosition === "right" ? "lg:col-start-2" : ""
                }`}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className={section.imagePosition === "right" ? "lg:col-start-1" : ""}>
                <div className="mb-4">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary mb-2">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-lg text-brand-primary font-semibold">
                      {section.subtitle}
                    </p>
                  )}
                </div>

                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {section.description}
                </p>

                {section.bullets.length > 0 && (
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
