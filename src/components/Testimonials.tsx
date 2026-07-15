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
  // Offset to show partial card on left edge
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const offset = card ? (card.offsetWidth + 20) * 0.35 : 100;
    el.scrollLeft = el.scrollWidth / 3 - offset;
  }, [reviews.length]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      const amount = card ? card.offsetWidth + 20 : el.clientWidth / 2;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
    <section className="bg-white py-8 sm:py-12 lg:py-16" id="testimonials">
      {/* Header - centered with max-width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-secondary tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 mt-2 text-xs sm:text-sm">
            Loved by brands and individuals across the globe
          </p>
        </div>
      </div>

      {/* Slider - full width edge-to-edge */}
      <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2"
          >
            {LOOP.map((r, i) => {
              const colors = ["border-blue-400", "border-green-400", "border-purple-400", "border-orange-400"];
              const borderColor = colors[i % colors.length];

              return (
                <div
                  key={`${r.client_name}-${i}`}
                  data-card
                  className="w-[78%] sm:w-[45%] lg:w-[27%] flex-shrink-0"
                >
                  <div className={`p-6 rounded-[14px] border-2 ${borderColor} bg-white h-full flex flex-col justify-between`}>
                    {/* Quote Text */}
                    <p className="font-normal text-sm leading-relaxed text-gray-700 mb-4">
                      "{r.content}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-3">
                      {r.client_image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={typeof r.client_image === 'string' ? r.client_image : r.client_image}
                            alt={r.client_name || "Client"}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900">
                          {r.client_name}
                        </h3>
                        {r.client_company && (
                          <p className="text-xs text-gray-500">{r.client_company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
