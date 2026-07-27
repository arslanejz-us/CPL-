"use client";

import Link from "next/link";
import { submitFormViaAjax, getFormData } from "@/lib/formSubmit";
import { useState } from "react";

const inputClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm transition-colors placeholder-gray-400";

const textareaClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm transition-colors resize-none placeholder-gray-400";

type StaticCategoryHeroProps = {
  breadcrumbLabel: string;
  title: string;
  description: string;
};

export default function StaticCategoryHero({
  breadcrumbLabel,
  title,
  description,
}: StaticCategoryHeroProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <section
      className="relative w-full py-12 sm:py-16 lg:py-24"
      style={{
        backgroundImage: 'url(/Product-categories/Product-categories-background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: 'auto',
        height: 'auto',
      }}
    >
      {/* Full width content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        {/* 2 Column Grid: Left empty (for background), Right for content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 h-full items-center py-8 lg:py-0">
          {/* Left Column: Empty - background image shows here */}
          <div></div>

          {/* Right Column: All Content - 100% layout */}
          <div className="flex flex-col gap-2 sm:gap-3 justify-center py-4 sm:py-8 lg:py-0">
            {/* Content Section with padding */}
            <div className="space-y-1.5 sm:space-y-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link href="/" className="text-[#00756E] text-xs sm:text-sm font-normal hover:underline">
                  Home
                </Link>
                <span className="text-gray-400 text-xs sm:text-sm">/</span>
                <span className="text-[#00756E] text-xs sm:text-sm font-normal">{breadcrumbLabel}</span>
              </div>

              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight"
                style={{
                  fontFamily:
                    "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                {title}
              </h1>

              {/* Description */}
              <p
                className="text-xs sm:text-sm font-normal text-[#575757] leading-relaxed max-w-md"
                style={{
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                }}
              >
                {description}
              </p>
            </div>

            {/* Quote Form - NO Card Background */}
            <form
              onSubmit={async (e) => {
                console.log("🔘 Category Hero Button clicked!");
                e.preventDefault();
                setLoading(true);
                setMessage("");

                const formElement = e.currentTarget;
                const formData = getFormData(formElement);

                // Convert checkbox to Yes/No
                const consentCheckbox = formElement.querySelector(
                  'input[name="sms_consent"]'
                ) as HTMLInputElement;
                formData.sms_consent = consentCheckbox?.checked ? "Yes" : "No";

                console.log("📦 Category Hero Form data:", formData);
                formData.formType = "quote-category-hero";

                const response = await submitFormViaAjax(formData, "/api/form-submit", "/thank-you");
                console.log("🎯 Category Hero response:", response);
                if (!response.success) {
                  setMessage("✗ " + response.message);
                  setLoading(false);
                }
                // If successful, redirect happens automatically via submitFormViaAjax
              }}
              className="flex flex-col gap-2 sm:gap-3 mt-2 sm:mt-4"
              style={{ borderRadius: '10px' }}
            >
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <input
                  name="Last_Name"
                  type="text"
                  placeholder="Name"
                  className={inputClass}
                  style={{ borderRadius: '10px' }}
                  required
                />
                <input
                  name="Email"
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  style={{ borderRadius: '10px' }}
                  required
                />
              </div>

              {/* Row 2: Phone and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <input
                  name="Phone"
                  type="tel"
                  placeholder="Phone"
                  className={inputClass}
                  style={{ borderRadius: '10px' }}
                  required
                />
                <input
                  name="Total_Quantity"
                  type="text"
                  placeholder="Quantity"
                  className={inputClass}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              {/* Row 3: Product Packaging Details */}
              <textarea
                name="Description"
                placeholder="Provide Packaging Details"
                rows={2}
                className={textareaClass}
                style={{ borderRadius: '10px' }}
              />

              {/* SMS Consent Checkbox */}
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  name="sms_consent"
                  style={{ accentColor: '#00756E' }}
                />
                <span className="text-gray-600">I consent to receive SMS updates</span>
              </label>

              {message && (
                <div
                  className={`text-xs py-2 px-3 rounded text-center ${
                    message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Get a Quote Button */}
              <div className="flex justify-start pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 sm:py-3 px-6 sm:px-12 transition-colors text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    fontFamily:
                      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    borderRadius: '10px',
                  }}
                >
                  {loading ? "Submitting..." : "Get a Quote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
