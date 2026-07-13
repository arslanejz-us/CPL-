"use client";

import { useState } from "react";
import Image from "next/image";
import quoteBgImg from "../../public/Qutote-form-background-image.png";

const inputClass =
  "w-full bg-white border border-gray-200 focus:border-brand-primary outline-none rounded-[14px] py-2.5 px-4 text-sm transition-colors placeholder-gray-400";

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
          <div className="w-full lg:max-w-[520px] bg-white rounded-[14px] shadow-xl p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-primary tracking-tight text-center mb-4">
              Get a Quote in 15 Minutes
            </h2>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className={inputClass} placeholder="Full Name*" />
                <input className={inputClass} type="tel" placeholder="Phone*" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className={inputClass} type="email" placeholder="Email*" />
                <input className={inputClass} placeholder="Total Quantity" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <input className={inputClass} placeholder="Length" />
                <input className={inputClass} placeholder="Width" />
                <input className={inputClass} placeholder="Height" />
                <select className={`${inputClass} appearance-none cursor-pointer`}>
                  <option>Inches</option>
                  <option>cm</option>
                  <option>mm</option>
                </select>
              </div>
              <textarea
                rows={3}
                className="w-full bg-white border border-gray-200 focus:border-brand-primary outline-none rounded-[14px] py-2.5 px-4 text-sm transition-colors resize-none placeholder-gray-400"
                placeholder="Provide detailed packaging specifications including dimensions, materials, weight restrictions and design references and we'll get back to you with an instant quote."
              />

              {/* File upload */}
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1.5">
                  Upload Your Design
                </p>
                <label className="flex items-center gap-3 text-sm text-gray-500 cursor-pointer">
                  <span className="flex-shrink-0 font-medium text-brand-secondary bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 hover:bg-gray-200 transition-colors">
                    Choose File
                  </span>
                  <span className="truncate">{fileName || "No File Chosen"}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-[14px] transition-colors mt-1"
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
