"use client";

import Image, { StaticImageData } from "next/image";
import * as Icons from "lucide-react";

interface CircularFeature {
  number: number;
  iconName: string;
  title: string;
  description: string;
}

interface BenefitsCircularProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: StaticImageData | string;
  features: CircularFeature[];
}

export default function BenefitsCircular({
  title,
  subtitle,
  description,
  image,
  features,
}: BenefitsCircularProps) {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Shield: Icons.Shield,
      Leaf: Icons.Leaf,
      Zap: Icons.Zap,
      Package: Icons.Package,
    };
    return iconMap[iconName] || Icons.Package;
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-brand-primary font-semibold mt-2">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Features (Mobile and Tablet) */}
          <div className="lg:hidden space-y-6">
            {features.map((feature) => {
              const Icon = getIcon(feature.iconName);
              return (
                <div
                  key={feature.number}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white font-bold text-lg">
                        {feature.number}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-brand-secondary mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:contents">
            {/* Left Features Column */}
            <div className="lg:col-span-5 space-y-6">
              {features.slice(0, 2).map((feature) => {
                const Icon = getIcon(feature.iconName);
                return (
                  <div
                    key={feature.number}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white font-bold text-lg">
                          {feature.number}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-secondary mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Image */}
            {image && (
              <div className="lg:col-span-2">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Right Features Column */}
            <div className="lg:col-span-5 space-y-6">
              {features.slice(2).map((feature) => {
                const Icon = getIcon(feature.iconName);
                return (
                  <div
                    key={feature.number}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white font-bold text-lg">
                          {feature.number}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-brand-secondary mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
