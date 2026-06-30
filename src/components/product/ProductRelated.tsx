"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RelatedProduct } from "@/lib/products";

interface ProductRelatedProps {
  currentProduct: string;
  relatedProducts: RelatedProduct[];
}

export default function ProductRelated({
  currentProduct,
  relatedProducts,
}: ProductRelatedProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <Link key={product.id} href={product.link}>
              <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
                <div className="relative h-64 bg-gradient-to-br from-brand-light to-brand-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-brand-secondary group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-brand-primary text-sm font-semibold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
