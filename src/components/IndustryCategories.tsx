"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodPackagingImg from "../../public/Food-Packaging.png";
import RetailPackagingImg from "../../public/Retail-packaging.png";
import CosmeticPackagingImg from "../../public/Cosmetic-packaging.png";
import BeveragePackagingImg from "../../public/Beverage-Packaging.png";

const INDUSTRIES = [
  { name: "Food Packaging", image: FoodPackagingImg },
  { name: "Retail Packaging", image: RetailPackagingImg },
  { name: "Cosmetic Packaging", image: CosmeticPackagingImg },
  { name: "Beverage Packaging", image: BeveragePackagingImg },
];

export default function IndustryCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slide = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth / 2;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary tracking-tight">
            Custom Boxes for Your Industry
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            From tuck-ends to rigid and magnetic closure boxes, each design is
            backed by precision printing and quality assurance.
          </p>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => slide("left")}
            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => slide("right")}
            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {INDUSTRIES.map(({ name, image }) => (
              <div
                key={name}
                className="w-[260px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start group cursor-pointer"
              >
                <div className="relative h-64 w-full rounded-2xl overflow-hidden group-hover:shadow-lg transition-shadow">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <p className="text-center font-semibold text-brand-secondary mt-4">
                  {name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
