import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import StaticProductHero from "@/components/StaticProductHero";

export const metadata = {
  title: "Standard Custom Tuck Boxes | Custom Packaging Lane",
  description: "Premium standard custom tuck boxes perfect for retail packaging solutions.",
};

export default function StandardTuckBoxesProductPage() {
  // Hero Section Data
  const heroData = {
    breadcrumbLabel: "Standard Tuck Boxes",
    title: "Standard Custom Tuck Boxes",
    description: "Classic tuck box design engineered for optimal product protection and brand presentation.",
  };

  // Product Specifications
  const specifications = [
    { label: "Material", value: "100% Recyclable Cardboard" },
    { label: "Box Type", value: "Standard Tuck" },
    { label: "Minimum Order", value: "100 Units" },
    { label: "Production Time", value: "5-7 Business Days" },
    { label: "Printing", value: "Full Color CMYK" },
    { label: "Finishes Available", value: "Matte, Gloss, Soft-Touch" },
  ];

  // Testimonials
  const testimonials = [
    {
      id: "1",
      client_name: "Sarah Mitchell",
      client_title: "Brand Director",
      client_company: "Premium Cosmetics Co.",
      rating: 5,
      content: "The standard tuck boxes were exactly what we needed. Perfect quality at a competitive price.",
    },
    {
      id: "2",
      client_name: "James Chen",
      client_title: "Operations Manager",
      client_company: "Gourmet Foods Inc.",
      rating: 5,
      content: "Outstanding quality and the turnaround time was faster than expected.",
    },
  ];

  // FAQs
  const faqs = [
    {
      id: "1",
      question: "What sizes are available?",
      answer: "We offer fully customizable sizing. Typical sizes range from 2x2x2 to 12x12x12 inches, but we can manufacture custom dimensions.",
    },
    {
      id: "2",
      question: "What is the lead time?",
      answer: "Standard production takes 5-7 business days. Rush options available for 3-5 day delivery.",
    },
    {
      id: "3",
      question: "Can we get samples?",
      answer: "Yes! We provide free sample kits so you can evaluate quality and fit before full production.",
    },
    {
      id: "4",
      question: "Do you offer eco-friendly options?",
      answer: "Absolutely. All our cardboard is 100% recyclable and we use eco-friendly inks and coatings.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <StaticProductHero
          breadcrumbLabel={heroData.breadcrumbLabel}
          title={heroData.title}
          description={heroData.description}
          backLink="/product-category/custom-tuck-boxes"
        />

        {/* Specifications Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                Product Specifications
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specifications.map((spec, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-semibold text-brand-primary mb-2">
                    {spec.label}
                  </h3>
                  <p className="text-lg font-bold text-brand-secondary">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                Why Choose Standard Tuck Boxes?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "✓", title: "Cost-Effective", description: "Affordable pricing without compromising quality" },
                { icon: "⚡", title: "Fast Production", description: "Quick turnaround times to meet your deadline" },
                { icon: "🌍", title: "Eco-Friendly", description: "100% recyclable materials and sustainable practices" },
                { icon: "🎨", title: "Custom Design", description: "Full color printing with multiple finish options" },
              ].map((feature, idx) => (
                <div key={idx} className="text-center">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-brand-secondary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design & Customization Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                Design & Customization Options
              </h2>
              <p className="text-gray-600 mt-4">
                Make these boxes truly yours with full customization options
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Dimensions",
                  items: ["Custom width, height, depth", "Interior dividers available", "Auto-bottom or tuck style"],
                },
                {
                  title: "Printing & Design",
                  items: ["Full CMYK color printing", "Spot colors available", "Die-cut windows"],
                },
                {
                  title: "Materials & Finishes",
                  items: ["Kraft, white, or natural cardboard", "Matte, gloss, soft-touch finishes", "Embossing available"],
                },
                {
                  title: "Additional Options",
                  items: ["Tissue paper insert", "Business card slot", "Custom stickers or labels"],
                },
              ].map((section, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-xl font-bold text-brand-secondary mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <span className="text-brand-primary font-bold mt-1">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

        {/* FAQ */}
        {faqs.length > 0 && <FAQ faqs={faqs} />}

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to Order?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Get started with a free quote or request a sample kit to experience the quality firsthand
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get a Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Request Sample
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
