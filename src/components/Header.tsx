"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const PRODUCT_CATEGORIES = [
  { name: "Custom Tuck Boxes", href: "/product-category/custom-tuck-boxes" },
  { name: "Custom Mailer Boxes", href: "/product-category/custom-mailer-boxes" },
  { name: "Rigid Boxes", href: "/product-category/rigid-boxes" },
  { name: "Folding Cartons", href: "/product-category/folding-cartons" },
  { name: "Custom Display Boxes", href: "/product-category/custom-display-boxes" },
];

const NAV = [
  { name: "Industries", href: "/industries", caret: true, submenu: PRODUCT_CATEGORIES },
  { name: "Shapes & Styles", href: "#styles", caret: true },
  { name: "Flexible Packaging", href: "#builder", caret: true },
  { name: "Blog", href: "/blog", caret: false },
  { name: "Portfolio", href: "#styles", caret: false },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center flex-shrink-0">
      <Image
        src="/Website-logos/Website-Logo.svg"
        alt="Custom Packaging Lane"
        width={180}
        height={40}
        className="h-10 w-auto"
      />
    </Link>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-[68px]">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-primary transition-colors py-2"
                  >
                    {item.name}
                    {item.caret && <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-brand-primary" />}
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.submenu && (
                    <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-primary transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
                className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 px-5 text-sm transition-colors"
                style={{ borderRadius: '10px' }}
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
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-gray-700 hover:text-brand-primary py-3 transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                      className="px-3 py-3 text-gray-700 hover:text-brand-primary"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {/* Mobile Dropdown */}
                {item.submenu && openDropdown === item.name && (
                  <div className="bg-gray-50 rounded-md ml-4 mt-2 mb-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className="block px-3 py-2.5 text-sm text-gray-700 hover:text-brand-primary hover:bg-white rounded-md transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="border-b border-gray-50"></div>
              </div>
            ))}
          </nav>
          <Link
            href="#quote"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-brand-primary text-white font-semibold py-3 px-6 text-center"
            style={{ borderRadius: '10px' }}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
