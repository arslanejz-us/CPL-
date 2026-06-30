"use client";

import { useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Placeholder from "./Placeholder";
import ClientOne from "../../public/client-say-one.png";
import ClientTwo from "../../public/client-say-two.png";
import ClientThree from "../../public/client-say-three.png";

type Review = {
  title: string;
  text: string;
  image?: StaticImageData;
};

const REVIEWS: Review[] = [
  {
    title: "The Beverly Hills Candle Co x CPL",
    text: "I've worked with Custom Packaging Lane a few times this year on packaging for our candles.",
    image: ClientOne,
  },
  {
    title: "FIG1 x Custom Packaging Lane",
    text: "Happy Customer, here! The team at Custom Packaging Lane was accommodating.",
    image: ClientTwo,
  },
  {
    title: "PANETTONE x Custom Packaging Lane",
    text: "Very happy with Custom Packaging Lane. Sam and Sarah were great to work with.",
    image: ClientThree,
  },
  {
    title: "LUCENT x Custom Packaging Lane",
    text: "Happy Customer, here! The team at Custom Packaging Lane was accommodating.",
    image: ClientOne,
  },
];

// Triple the list so the track can loop seamlessly in both directions.
const LOOP = [...REVIEWS, ...REVIEWS, ...REVIEWS];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Start in the middle copy so there is room to scroll either way.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
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
                key={`${r.title}-${i}`}
                data-card
                className="w-[78%] sm:w-[45%] lg:w-[27%] flex-shrink-0"
              >
                <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                  {r.image ? (
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover object-center"
                    />
                  ) : (
                    <Placeholder
                      label="Client Photo"
                      className="h-full w-full"
                      rounded="rounded-2xl"
                    />
                  )}
                </div>
                <h3 className="font-montserrat font-semibold text-[15px] text-brand-secondary mt-4">
                  {r.title}
                </h3>
                <p
                  className="font-montserrat font-normal text-[13px] mt-1.5 leading-relaxed pr-4"
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
