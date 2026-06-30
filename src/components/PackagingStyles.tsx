"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TuckBoxesImg from "../../public/Custom-tuck-boxes.png";
import MailerBoxesImg from "../../public/Custom-mailer-boxes.png";
import MylarBagsImg from "../../public/Custom-Mylar-Bags.png";
import GableBoxesImg from "../../public/Custom-Gable-Boxes.png";

const STYLES = [
  { name: "Custom Tuck Boxes", image: TuckBoxesImg },
  { name: "Custom Mailer Boxes", image: MailerBoxesImg },
  { name: "Custom Mylar Bags", image: MylarBagsImg },
  { name: "Custom Gable Boxes", image: GableBoxesImg },
];

// Triple the list so the track can loop seamlessly in both directions.
const LOOP = [...STYLES, ...STYLES, ...STYLES];

export default function PackagingStyles() {
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
    const amount = card ? card.offsetWidth + 24 : el.clientWidth / 2;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-white pt-10 pb-20" id="styles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary tracking-tight">
            Explore Our Custom Box Packaging Styles
          </h2>
          <p className="text-gray-500 mt-3 text-sm">
            From tuck-end to rigid and magnetic closure boxes, each design is
            backed by precision printing and quality assurance.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => slide("left")}
            className="absolute -left-3 lg:-left-6 top-40 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => slide("right")}
            className="absolute -right-3 lg:-right-6 top-40 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border-2 border-brand-primary shadow-md flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-2"
          >
            {LOOP.map(({ name, image }, i) => (
              <div
                key={`${name}-${i}`}
                data-card
                className="w-[260px] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0 group cursor-pointer"
              >
                <div className="relative h-80 w-full rounded-2xl border border-gray-100 group-hover:shadow-lg transition-shadow p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-contain object-center mix-blend-multiply"
                    />
                  </div>
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
