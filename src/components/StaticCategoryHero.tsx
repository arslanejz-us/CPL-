import Link from "next/link";

const inputClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none rounded-full py-3 px-5 text-sm transition-colors placeholder-gray-400";

const textareaClass =
  "w-full bg-white border border-gray-300 focus:border-brand-primary outline-none rounded-full py-3 px-5 text-sm transition-colors resize-none placeholder-gray-400";

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
  return (
    <section
      className="relative py-16 lg:py-24 min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: 'url(/Product-categories/Product-categories-background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 flex-wrap">
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
            <form className="flex flex-col gap-4 mt-4">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className={inputClass}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  required
                />
              </div>

              {/* Row 2: Phone and Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  className={inputClass}
                />
              </div>

              {/* Row 3: Product Packaging Details */}
              <textarea
                placeholder="Product Packaging Details"
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

          {/* Right: Background image fills the space */}
        </div>
      </div>
    </section>
  );
}
