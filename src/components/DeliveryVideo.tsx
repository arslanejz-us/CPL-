"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

const YT_ID = "JDBfpNw3PQo";

export default function DeliveryVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16" id="delivery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-beige rounded-3xl p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-full bg-brand-primary text-white font-extrabold text-xl flex items-center justify-center">
                6
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
                Delivery
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md">
              The boxes are produced with durable and premium quality material to
              ensure we make the best tailor-made design!
            </p>
          </div>

          {/* Right: video thumbnail with play button */}
          <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
              alt="Delivery video"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              onClick={() => setIsOpen(true)}
              className="absolute inset-0 flex items-center justify-center group bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Play video"
            >
              <span className="w-16 h-16 rounded-full bg-white text-brand-primary flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1`}
              title="Delivery video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
