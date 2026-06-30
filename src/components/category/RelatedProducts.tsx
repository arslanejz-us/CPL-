"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import CustomTuckImg from "../../../public/Custom-tuck-boxes.png";
import CosmeticImg from "../../../public/Cosmetic-packaging.png";
import MailerImg from "../../../public/Custom-mailer-boxes.png";
import RetailImg from "../../../public/Retail-packaging.png";

interface RelatedProductsProps {
  currentCategory: string;
}

const RELATED_PRODUCTS = [
  {
    id: "custom-tuck-boxes",
    name: "Custom Tuck Boxes",
    description: "Versatile and cost-effective packaging",
    image: CustomTuckImg,
  },
  {
    id: "cosmetic-boxes",
    name: "Custom Cosmetic Boxes",
    description: "Elegant beauty product packaging",
    image: CosmeticImg,
  },
  {
    id: "mailer-boxes",
    name: "Custom Mailer Boxes",
    description: "Secure shipping solutions",
    image: MailerImg,
  },
  {
    id: "soap-boxes",
    name: "Custom Soap Boxes",
    description: "Perfect for artisan soap brands",
    image: RetailImg,
  },
];

// Triple the list for infinite scroll effect
const LOOP = [...RELATED_PRODUCTS, ...RELATED_PRODUCTS, ...RELATED_PRODUCTS];

export default function RelatedProducts({ currentCategory }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    if (el.scrollLeft <= 1) {
      el.scrollLeft += third;
    } else if (el.scrollLeft >= third * 2) {
      el.scrollLeft -= third;
    }
  };

  const slide = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth / 2;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Related Products
          </h2>
          <p className="text-gray-600 mt-3">
            Explore our other packaging solutions tailored to your industry needs
          </p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => slide("left")}
            className="absolute -left-3 lg:-left-6 top-40 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => slide("right")}
            className="absolute -right-3 lg:-right-6 top-40 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-2"
          >
            {LOOP.map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                data-card
                className={`w-[280px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 group cursor-pointer ${
                  product.id === currentCategory ? "opacity-60" : ""
                }`}
              >
                <a href={`/product-category/${product.id}`} className="block">
                  <div className="relative h-72 w-full rounded-xl overflow-hidden mb-4 bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">{product.description}</p>
                  <div className="flex items-center gap-2 text-brand-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
