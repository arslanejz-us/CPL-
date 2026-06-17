"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Leaf } from "lucide-react";

const NAV = [
  { name: "Industries", href: "#industries", caret: true },
  { name: "Shapes & Styles", href: "#styles", caret: true },
  { name: "Flexible Packaging", href: "#builder", caret: true },
  { name: "Blog", href: "#testimonials", caret: false },
  { name: "Portfolio", href: "#styles", caret: false },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <span className="w-9 h-9 rounded-md bg-brand-primary flex items-center justify-center text-white">
        <Leaf className="w-5 h-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-[0.15em] text-brand-secondary font-display">
          CUSTOM
        </span>
        <span className="text-sm font-bold tracking-[0.15em] text-brand-secondary font-display -mt-0.5">
          PACKAGING LANE
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-[68px]">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-primary transition-colors"
                >
                  {item.name}
                  {item.caret && <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-40 bg-gray-50 border border-gray-200 rounded-full py-2 pl-9 pr-4 text-sm outline-none focus:border-brand-primary transition-colors"
                />
              </div>
              <Link
                href="#quote"
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 px-5 rounded-md text-sm transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-80 max-w-full bg-white shadow-2xl p-6 transition-transform duration-300 flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <Logo />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500" aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 text-base font-medium mb-8">
            {NAV.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-brand-primary py-3 border-b border-gray-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Link
            href="#quote"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-brand-primary text-white font-semibold py-3 px-6 rounded-md text-center"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
