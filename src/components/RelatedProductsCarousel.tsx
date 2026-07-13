"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
}

export default function RelatedProductsCarousel({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Triple the list for infinite loop
  const LOOP = [...products, ...products, ...products];

  // Initialize scroll position to middle
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, [products.length]);

  // Handle infinite loop scrolling
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    if (el.scrollLeft <= 1) {
      el.scrollLeft += third;
    } else if (el.scrollLeft >= third * 2 - 10) {
      el.scrollLeft -= third;
    }
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const card = el.querySelector<HTMLElement>("[data-product]");
      const amount = card ? card.offsetWidth + 24 : 300;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-product]");
    const amount = card ? card.offsetWidth + 24 : 300; // 24px is gap-6
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="pt-6 lg:pt-8 pb-16 lg:pb-20 bg-white">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <h2 className="text-4xl font-medium text-black mb-4">
            Related Products
          </h2>
          <p className="text-base font-normal text-[#575757] max-w-2xl mx-auto">
            Discover packaging tailored for your products
          </p>
        </div>
      </div>

      {/* Products Slider with Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors text-lg"
        >
          &#8249;
        </button>

        {/* Products Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-2"
          style={{ paddingLeft: 'max(1rem, calc(50vw - 250px))', paddingRight: 'calc(50vw - 170px)' }}
          onScroll={handleScroll}
        >
          {LOOP.map((product, index) => (
            <div
              key={product.id}
              data-product
              className="flex-shrink-0"
              style={{ width: '280px' }}
            >
              <div className="flex flex-col">
                {/* Product Image */}
                <div className="relative w-full mb-4" style={{ height: '280px' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-[20px]"
                  />
                </div>
                {/* Product Title */}
                <h3 className="text-base font-normal text-black text-left">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-primary-dark transition-colors text-lg"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
