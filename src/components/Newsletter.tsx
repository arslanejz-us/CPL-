"use client";

export default function Newsletter() {
  return (
    <section className="bg-white py-12 border-b border-gray-200" id="newsletter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-extrabold text-brand-secondary tracking-tight">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join our newsletter to get 30% off on your next order.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full md:w-auto gap-3 min-w-0 sm:min-w-[420px]"
        >
          <input
            type="email"
            required
            placeholder="Email Address"
            className="flex-grow bg-white border border-gray-300 focus:border-brand-primary outline-none rounded-md py-2.5 px-4 text-sm transition-colors"
          />
          <button
            type="submit"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-2.5 px-7 rounded-md transition-colors flex-shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
