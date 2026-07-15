"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES, getBlogPosts } from "@/lib/blog";

const POSTS_PER_PAGE = 9;

export default function BlogList() {
  const [activeCategory, setActiveCategory] = useState("knowledge");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = getBlogPosts(activeCategory);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const displayedPosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="py-8 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12 justify-start">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm rounded-[14px] font-medium transition-all ${
                activeCategory === category.id
                  ? "bg-brand-primary text-white"
                  : "border-2 border-gray-300 text-gray-700 hover:border-brand-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {displayedPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="group cursor-pointer">
                <div className="relative h-40 sm:h-48 lg:h-64 rounded-lg overflow-hidden mb-2 sm:mb-4 bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "/Custom-tuck-boxes.png";
                    }}
                  />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-black group-hover:text-brand-primary transition-colors" style={{ fontFamily: 'Inter' }}>
                  {post.title}
                </h3>
              </article>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-6 py-2 rounded-md border-2 font-semibold transition-all ${
              currentPage === 1
                ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 rounded-md font-semibold transition-all ${
              currentPage === totalPages
                ? "bg-gray-300 text-white cursor-not-allowed"
                : "bg-brand-primary text-white hover:bg-brand-primary-dark"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
