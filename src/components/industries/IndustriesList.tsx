"use client";

import { useState, useRef, useEffect } from "react";
import * as Icons from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";

export default function IndustriesList() {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
  const gridRef = useRef<HTMLDivElement>(null);

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Shirt: Icons.Shirt,
      Car: Icons.Car,
      Wine: Icons.Wine,
      Flame: Icons.Flame,
      Gift: Icons.Gift,
      Leaf: Icons.Leaf,
      Package: Icons.Package,
      Coffee: Icons.Coffee,
      Sparkles: Icons.Sparkles,
      Zap: Icons.Zap,
      ShoppingCart: Icons.ShoppingCart,
      UtensilsCrossed: Icons.UtensilsCrossed,
      Droplet: Icons.Droplet,
      Smartphone: Icons.Smartphone,
      Heart: Icons.Heart,
      Sun: Icons.Sun,
      FileText: Icons.FileText,
      PawPrint: Icons.PawPrint,
      Pill: Icons.Pill,
      Presentation: Icons.Presentation,
      Store: Icons.Store,
      Truck: Icons.Truck,
      Trophy: Icons.Trophy,
      Pencil: Icons.Pencil,
    };
    return iconMap[iconName] || Icons.Package;
  };

  const handleIndustryClick = (industryId: string) => {
    setSelectedIndustry(industryId);
    const element = document.getElementById(`industry-${industryId}`);
    if (element && gridRef.current) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 rounded-lg p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="text-lg font-bold text-brand-secondary mb-4">Browse Industries</h3>
              <ul className="space-y-2">
                {INDUSTRIES.map((industry) => (
                  <li key={industry.id}>
                    <button
                      onClick={() => handleIndustryClick(industry.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
                        selectedIndustry === industry.id
                          ? "bg-brand-primary text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{industry.name}</span>
                        {industry.count && (
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {industry.count}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Grid */}
          <div
            ref={gridRef}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {INDUSTRIES.map((industry) => {
              const Icon = getIcon(industry.iconName);
              return (
                <div
                  key={industry.id}
                  id={`industry-${industry.id}`}
                  onClick={() => handleIndustryClick(industry.id)}
                  className={`cursor-pointer rounded-lg p-8 text-center transition-all hover:shadow-lg ${
                    selectedIndustry === industry.id
                      ? "bg-brand-primary/10 border-2 border-brand-primary"
                      : "bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-white rounded-full">
                      <Icon className="w-8 h-8 text-brand-primary" />
                    </div>
                  </div>
                  <h4 className="font-semibold text-brand-secondary text-sm">
                    {industry.name}
                  </h4>
                  {industry.count && (
                    <p className="text-xs text-gray-500 mt-2">{industry.count} products</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
