"use client";

import { useState } from "react";
import Image from "next/image";
import quoteBgImg from "../../public/Qutote-form-background-image.png";

const inputClass =
  "w-full bg-white border border-gray-200 focus:border-brand-primary outline-none py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-colors placeholder-gray-400";

export default function QuoteForm() {
  const [fileName, setFileName] = useState("");

  return (
    <section className="relative py-8 lg:py-10" id="quote">
      {/* Full-section background image */}
      <Image
        src={quoteBgImg}
        alt="Custom packaging products"
        fill
        priority
        className="object-cover object-[20%_center]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex lg:justify-end">
          {/* Form card floats on the right */}
          <div className="w-full lg:max-w-[520px] bg-white shadow-xl p-4 sm:p-6" style={{ borderRadius: '10px' }}>
            <h2 className="text-lg sm:text-2xl font-extrabold text-brand-primary tracking-tight text-center mb-3 sm:mb-4" style={{ fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Get a Quote in 15 Minutes
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2.5 sm:gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input className={inputClass} placeholder="Full Name*" style={{ borderRadius: '10px' }} />
                <input className={inputClass} type="tel" placeholder="Phone*" style={{ borderRadius: '10px' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <input className={inputClass} type="email" placeholder="Email*" style={{ borderRadius: '10px' }} />
                <input className={inputClass} placeholder="Total Quantity" style={{ borderRadius: '10px' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 sm:gap-2">
                <input className={inputClass} placeholder="Length" style={{ borderRadius: '10px' }} />
                <input className={inputClass} placeholder="Width" style={{ borderRadius: '10px' }} />
                <input className={inputClass} placeholder="Height" style={{ borderRadius: '10px' }} />
                <select className={`${inputClass} appearance-none cursor-pointer`} style={{ borderRadius: '10px' }}>
                  <option>Inches</option>
                  <option>cm</option>
                  <option>mm</option>
                </select>
              </div>
              <textarea
                rows={3}
                className="w-full bg-white border border-gray-200 focus:border-brand-primary outline-none py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-colors resize-none placeholder-gray-400"
                style={{ borderRadius: '10px' }}
                placeholder="Provide detailed packaging specifications including dimensions, materials, weight restrictions and design references and we'll get back to you with an instant quote."
                style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              />

              {/* File upload */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                  Upload Your Design
                </p>
                <label className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 cursor-pointer">
                  <span className="flex-shrink-0 font-medium text-brand-secondary bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 hover:bg-gray-200 transition-colors whitespace-nowrap">
                    Choose File
                  </span>
                  <span className="truncate text-xs sm:text-sm">{fileName || "No File Chosen"}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 transition-colors mt-1 text-sm sm:text-base"
                style={{ borderRadius: '10px' }}
                style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
              >
                Get a Quote
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
