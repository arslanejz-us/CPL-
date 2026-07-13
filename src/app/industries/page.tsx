"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const INDUSTRIES = [
  { id: "apparel-fashion", name: "Apparel & Fashion", icon: "👕" },
  { id: "automotive", name: "Automotive", icon: "🚗" },
  { id: "bakery", name: "Bakery", icon: "🛒" },
  { id: "beauty-skincare", name: "Beauty & Skincare", icon: "💄" },
  { id: "beverages", name: "Beverage, Wine, Liquor", icon: "🍷" },
  { id: "candles", name: "Candle", icon: "🕯️" },
  { id: "candy-sweet", name: "Candy & Sweet", icon: "🍬" },
  { id: "cbd", name: "CBD", icon: "🌿" },
  { id: "chocolate", name: "Chocolate", icon: "🍫" },
  { id: "coffee-tea", name: "Coffee & Tea", icon: "☕" },
  { id: "cosmetics", name: "Cosmetics", icon: "💅" },
  { id: "custom-coffee-cups", name: "Custom Coffee Cups", icon: "☕" },
  { id: "ecommerce", name: "Ecommerce", icon: "📦" },
  { id: "electronics", name: "Electronics", icon: "🎧" },
  { id: "food-restaurant", name: "Food & Restaurant", icon: "🍽️" },
  { id: "fragrance", name: "Fragrance", icon: "🧴" },
  { id: "gadgets-accessories", name: "Gadgets and Accessories", icon: "🔌" },
  { id: "gift", name: "Gift", icon: "🎁" },
  { id: "health-wellness", name: "Health & Wellness", icon: "💊" },
  { id: "holiday", name: "Holiday", icon: "🎄" },
  { id: "jewelry", name: "Jewelry", icon: "💎" },
  { id: "marijuana-cannabis", name: "Marijuana & Cannabis", icon: "🌿" },
  { id: "office-workplace", name: "Office & Workplace", icon: "💼" },
  { id: "packaging", name: "Packaging", icon: "📮" },
  { id: "pharma", name: "Pharma", icon: "💊" },
  { id: "presentation", name: "Presentation", icon: "🎁" },
  { id: "retail", name: "Retail", icon: "🛍️" },
  { id: "shipping", name: "Shipping", icon: "📦" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "stationery", name: "Stationery", icon: "📝" },
  { id: "sustainable-packaging", name: "Sustainable Packaging", icon: "♻️" },
  { id: "tobacco-cigarette", name: "Tobacco & Cigarette", icon: "🚬" },
];

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative py-24 lg:py-32 bg-cover bg-center"
          style={{
            backgroundImage: "url('/industry-background.png')",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div className="absolute inset-0 bg-white/70"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 style={{ fontSize: "40px", fontFamily: "Inter", fontWeight: 500, color: "#000000" }} className="mb-4">
              Custom Packaging for Every Industry
            </h1>
            <p style={{ fontFamily: "Inter", fontSize: "16px", fontWeight: 400 }} className="text-gray-700 max-w-2xl mx-auto">
              Custom Packaging Lane crafts premium packaging solutions trusted by 3,000+ businesses worldwide.
            </p>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar - Static */}
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-20 bg-white">
                  <h3 className="text-sm font-bold text-gray-900 mb-4">Industries (32)</h3>
                  <nav className="space-y-2 max-h-96 overflow-y-auto">
                    {INDUSTRIES.map((industry) => (
                      <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedIndustry === industry.id
                            ? "bg-brand-primary text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {industry.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Industries Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {INDUSTRIES.map((industry) => (
                    <Link
                      key={industry.id}
                      href={`/industries/${industry.id}`}
                      className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:shadow-lg hover:bg-gray-100 transition-all"
                    >
                      <div className="text-5xl mb-3">{industry.icon}</div>
                      <h3 className="text-sm font-medium text-gray-900 text-center">{industry.name}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
