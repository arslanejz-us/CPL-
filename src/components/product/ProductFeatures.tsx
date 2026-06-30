"use client";

import * as Icons from "lucide-react";

interface Feature {
  title: string;
  description: string;
  iconName: string;
}

interface ProductFeaturesProps {
  features: Feature[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Shield: Icons.Shield,
      Leaf: Icons.Leaf,
      Zap: Icons.Zap,
      Package: Icons.Package,
      BarChart3: Icons.BarChart3,
      Palette: Icons.Palette,
    };
    return iconMap[iconName] || Icons.Package;
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Why Choose Our Packaging?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Professional packaging solutions that protect your brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = getIcon(feature.iconName);
            return (
              <div key={idx} className="flex flex-col gap-4">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-brand-primary/10 text-brand-primary mx-auto">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-brand-secondary">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {feature.description}
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
