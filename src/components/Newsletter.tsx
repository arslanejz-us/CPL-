"use client";

export default function Newsletter() {
  return (
    <section className="bg-white py-8 sm:py-12 border-b border-gray-200" id="newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="w-full md:w-auto">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-brand-secondary tracking-tight">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
            Join our newsletter to get 30% off on your next order.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-3 md:flex-shrink-0"
        >
          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full sm:w-auto bg-white border border-gray-300 focus:border-brand-primary outline-none py-2 sm:py-2.5 px-3 sm:px-4 text-sm transition-colors"
            style={{ borderRadius: '10px' }}
          />
          <button
            type="submit"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-7 transition-colors whitespace-nowrap"
            style={{ borderRadius: '10px' }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
