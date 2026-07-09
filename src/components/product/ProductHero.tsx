"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-br from-brand-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full mb-4">
                {product.badge}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-secondary tracking-tight">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.heroQuickBenefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#quote"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <button className="inline-flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-semibold py-3 px-6 rounded-md transition-colors">
                View Samples
              </button>
            </div>
          </div>

          {/* Image */}
          {product.heroImage && (
            <div className="relative h-[400px] sm:h-[500px]">
              <Image
                src={product.heroImage}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
