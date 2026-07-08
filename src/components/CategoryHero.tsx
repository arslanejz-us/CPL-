"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import categoryBg from "../../public/Product-categories/Product-categories-background.webp";

const inputClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none rounded-full py-3 px-5 text-sm transition-colors placeholder-gray-400";

const textareaClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none rounded-full py-3 px-5 text-sm transition-colors resize-none placeholder-gray-400";

type CategoryHeroProps = {
  breadcrumbLabel: string;
  title: string;
  description: string;
  categorySlug: string;
};

export default function CategoryHero({
  breadcrumbLabel,
  title,
  description,
  categorySlug,
}: CategoryHeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    packagingDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <section className="relative py-16 lg:py-24 min-h-screen flex items-center overflow-hidden">
      {/* Full-width background image */}
      <Image
        src={categoryBg}
        alt={title}
        fill
        priority
        className="object-cover object-right"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <Link href="/" className="text-[#00756E] text-sm font-normal hover:underline">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/categories" className="text-[#00756E] text-sm font-normal hover:underline">
                Categories
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#00756E] text-sm font-normal">{breadcrumbLabel}</span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl font-medium text-black leading-tight">
                {title}
              </h1>
              <p className="text-base font-normal text-[#575757] mt-4 leading-relaxed max-w-md">
                {description}
              </p>
            </div>

            {/* Quote Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              {/* Row 2: Phone and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Row 3: Product Packaging Details */}
              <textarea
                name="packagingDetails"
                placeholder="Product Packaging Details"
                value={formData.packagingDetails}
                onChange={handleChange}
                rows={4}
                className={textareaClass}
              />

              {/* Get a Quote Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-colors"
                >
                  Get a Quote
                </button>
              </div>
            </form>
          </div>

          {/* Right: Background image fills the space (already set via background) */}
        </div>
      </div>
    </section>
  );
}
