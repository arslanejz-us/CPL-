"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Placeholder from "./Placeholder";

const REVIEWS = [
  {
    title: "The Beverly Hills Candle Co x CPL",
    text: "I've worked with Custom Packaging Lane a few times this year on packaging for our candles.",
  },
  {
    title: "FIG1 x Custom Packaging Lane",
    text: "Happy Customer, here! The team at Custom Packaging Lane was accommodating.",
  },
  {
    title: "PANETTONE x Custom Packaging Lane",
    text: "Very happy with Custom Packaging Lane. Sam and Sarah were great to work with.",
  },
  {
    title: "LUCENT x Custom Packaging Lane",
    text: "Happy Customer, here! The team at Custom Packaging Lane was accommodating.",
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slide = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth / 2;
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
          <button
            onClick={() => slide("left")}
            className="absolute left-2 top-[110px] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => slide("right")}
            className="absolute right-2 top-[110px] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-brand-primary shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
          >
            {REVIEWS.map((r) => (
              <div
                key={r.title}
                className="w-[300px] lg:w-[calc(33.333%-14px)] flex-shrink-0 snap-start"
              >
                <Placeholder
                  label="Client Photo"
                  className="h-52 w-full"
                  rounded="rounded-2xl"
                />
                <h3 className="font-montserrat font-semibold text-[15px] text-brand-secondary mt-4">
                  {r.title}
                </h3>
                <p
                  className="font-montserrat font-normal text-[13px] mt-1.5 leading-relaxed"
                  style={{ color: "#575757" }}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
