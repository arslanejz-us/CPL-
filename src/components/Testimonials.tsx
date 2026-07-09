"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ClientOne from "../../public/client-say-one.png";
import ClientTwo from "../../public/client-say-two.png";
import ClientThree from "../../public/client-say-three.png";

interface Testimonial {
  id?: string;
  client_name?: string;
  client_company?: string;
  client_image?: string;
  content?: string;
  rating?: number;
}

const DEFAULT_REVIEWS = [
  {
    client_name: "Beverly Hills Candle Co",
    client_company: "CEO",
    content: "I've worked with Custom Packaging Lane a few times this year on packaging for our candles.",
    client_image: ClientOne,
    rating: 5,
  },
  {
    client_name: "FIG1 Team",
    client_company: "Founder",
    content: "Happy Customer, here! The team at Custom Packaging Lane was accommodating.",
    client_image: ClientTwo,
    rating: 5,
  },
  {
    client_name: "PANETTONE",
    client_company: "Manager",
    content: "Very happy with Custom Packaging Lane. Sam and Sarah were great to work with.",
    client_image: ClientThree,
    rating: 5,
  },
];

export default function Testimonials({ testimonials }: { testimonials?: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use provided testimonials or fallback
  const reviews = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_REVIEWS;

  // Triple the list so the track can loop seamlessly in both directions.
  const LOOP = [...reviews, ...reviews, ...reviews];

  // Start in the middle copy so there is room to scroll either way.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, [reviews.length]);

  // When a clone boundary is reached, jump silently to the matching
  // position in the middle copy to fake an infinite loop.
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
    const amount = card ? card.offsetWidth + 20 : el.clientWidth / 2;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 border-t-2 border-brand-primary" id="testimonials">
      <div className="max-w-7xl mx-auto pl-4 sm:pl-6 lg:pl-8">
        <div className="text-center max-w-2xl mx-auto mb-10 pr-4 sm:pr-6 lg:pr-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-secondary tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Loved by brands and individuals across the globe
          </p>
        </div>

        <div className="relative">
          {/* Arrows — centered on the image (image is h-96 = 384px) */}
          <button
            onClick={() => slide("left")}
            className="absolute left-2 top-48 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => slide("right")}
            className="absolute right-2 top-48 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2"
          >
            {LOOP.map((r, i) => (
              <div
                key={`${r.client_name}-${i}`}
                data-card
                className="w-[78%] sm:w-[45%] lg:w-[27%] flex-shrink-0"
              >
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  {r.client_image ? (
                    <Image
                      src={typeof r.client_image === 'string' ? r.client_image : r.client_image}
                      alt={r.client_name || "Client"}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  {r.rating && (
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  )}
                  <h3 className="font-semibold text-sm text-brand-secondary">
                    {r.client_name}
                  </h3>
                  {r.client_company && (
                    <p className="text-xs text-gray-500">{r.client_company}</p>
                  )}
                </div>
                <p className="font-normal text-sm mt-2 leading-relaxed text-gray-600">
                  "{r.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
