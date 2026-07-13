"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import heroBg from "../../../public/about-us/hero-bg.png";

const INDUSTRIES = [
  { id: "apparel-fashion", name: "Apparel & Fashion" },
  { id: "baby-products", name: "Baby Products" },
  { id: "bakery", name: "Bakery" },
  { id: "beverages", name: "Beverage, Wine, Liquor" },
  { id: "cbd", name: "CBD" },
  { id: "candles", name: "Candle" },
  { id: "candy-sweet", name: "candy & Sweet" },
  { id: "chocolate", name: "Chocolate" },
  { id: "coffee-tea", name: "Coffe & Tea" },
  { id: "cosmetics", name: "Cosmetics" },
  { id: "custom-coffee-cups", name: "Custom Coffee Cups" },
  { id: "ecommerce", name: "Ecommerce" },
  { id: "electronics", name: "Electronics" },
  { id: "food-restaurant", name: "Food & Restaurant" },
  { id: "fragrance", name: "Fragrance" },
  { id: "gadgets-accessories", name: "Gadgets-and-Accessories" },
  { id: "gift", name: "Gift" },
  { id: "health-wellness", name: "Health-and-wellness" },
  { id: "holiday", name: "Holiday" },
  { id: "jewelry", name: "Jewelry" },
  { id: "marijuana-cannabis", name: "Marijuana-and-Cannabis" },
  { id: "office-workplace", name: "Office-and-workplace" },
  { id: "pet-supplies", name: "Pet" },
  { id: "pharma", name: "Pharma" },
  { id: "presentation", name: "Presentation" },
  { id: "retail", name: "Retail" },
  { id: "shipping", name: "Shipping" },
  { id: "soap", name: "Soap" },
  { id: "sports", name: "Sport" },
  { id: "stationery", name: "Stationery" },
  { id: "sustainable-packaging", name: "Sustainable-Packaging" },
  { id: "tobacco-cigarette", name: "Tobacco-and-Cigarette" },
];

export default function IndustriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleIndustryClick = (id: string) => {
    setSelectedCategory(id);
    const element = document.getElementById(`industry-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 overflow-hidden">
          <Image
            src={heroBg}
            alt=""
            fill
            className="object-cover object-center pointer-events-none"
            priority
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-[40px] font-medium font-montserrat text-brand-secondary mb-4">
              Industries
            </h1>
            <p className="text-base text-[#575757] max-w-2xl mx-auto leading-relaxed">
              Custom Packaging Lane crafts premium packaging solutions trusted by 3,000+ businesses worldwide.
            </p>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Sidebar - Static (no scroll, no sticky) */}
              <div className="hidden lg:block w-56 flex-shrink-0">
                <div className="bg-white">
                  <h3 style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", color: "#00756E", borderBottom: "1px solid #00756E", paddingBottom: "8px" }} className="mb-4 font-medium">
                    Industries ({INDUSTRIES.length})
                  </h3>
                  <nav className="space-y-2">
                    {INDUSTRIES.map((industry) => (
                      <button
                        key={industry.id}
                        onClick={() => handleIndustryClick(industry.id)}
                        style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "12px", color: "#000000" }}
                        className="block w-full text-left hover:text-brand-primary transition-colors"
                      >
                        {industry.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Industries Grid - Centered */}
              <div className="flex-1">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-items-stretch" style={{ gap: "20px" }}>
                  {INDUSTRIES.map((industry) => (
                    <div
                      key={industry.id}
                      id={`industry-${industry.id}`}
                    >
                      <Link
                        href={`/industries/${industry.id}`}
                        className={`w-full flex flex-col items-center justify-center p-4 rounded-lg hover:shadow-lg transition-all ${
                          selectedCategory === industry.id
                            ? "shadow-lg ring-2 ring-brand-primary"
                            : "hover:shadow-md"
                        }`}
                        style={{
                          backgroundColor: "#F7F7F7",
                          height: "281.7px"
                        }}
                      >
                        <div className="w-20 h-20 mb-3 relative flex items-center justify-center">
                          <Image
                            src={`/industry-icons/${industry.name}.svg`}
                            alt={industry.name}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                        <h3 style={{
                          fontFamily: "Inter",
                          fontSize: "13px",
                          fontWeight: selectedCategory === industry.id ? 700 : 500,
                          color: "#000000"
                        }} className="text-center line-clamp-2">
                          {industry.name}
                        </h3>
                      </Link>
                    </div>
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
