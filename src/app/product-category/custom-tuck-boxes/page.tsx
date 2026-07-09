import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import TrustedBrands from "@/components/TrustedBrands";
import StaticCategoryHero from "@/components/StaticCategoryHero";
import Image from "next/image";

export const metadata = {
  title: "Custom Tuck Boxes | Custom Packaging Lane",
  description: "Premium custom tuck boxes designed for retail brands that care about unboxing experience.",
};

export default function CustomTuckBoxesPage() {
  // Hero Section Data
  const heroData = {
    breadcrumbLabel: "Custom Tuck Boxes",
    title: "Custom Tuck Boxes",
    description: "Premium custom tuck boxes designed for retail brands that care about unboxing experience. Perfect for packaging products with maximum impact.",
  };

  // Features Data
  const features = [
    {
      id: "1",
      icon: "🎯",
      title: "Precision Design",
      description: "Perfectly tailored to your product dimensions",
    },
    {
      id: "2",
      icon: "🌱",
      title: "Eco-Friendly",
      description: "Sustainable materials with minimal environmental impact",
    },
    {
      id: "3",
      icon: "✨",
      title: "Premium Quality",
      description: "High-end finishing and durable construction",
    },
    {
      id: "4",
      icon: "⚡",
      title: "Fast Turnaround",
      description: "Quick production and delivery timelines",
    },
  ];

  // Types Data
  const types = [
    {
      id: "1",
      name: "Standard Tuck",
      description: "Classic tuck box design for most products",
      image: null,
    },
    {
      id: "2",
      name: "Reverse Tuck",
      description: "Reverse closure for secure, premium feel",
      image: null,
    },
    {
      id: "3",
      name: "One-Piece Tuck",
      description: "Simplified design for maximum impact",
      image: null,
    },
    {
      id: "4",
      name: "Custom Configurations",
      description: "Tailored solutions for unique requirements",
      image: null,
    },
  ];

  // Materials Data
  const materials = [
    {
      id: "1",
      name: "Kraft Cardboard",
      description: "Eco-friendly brown cardboard with natural appeal",
      image: null,
      properties: ["Recyclable", "Sustainable", "Natural Look"],
    },
    {
      id: "2",
      name: "Coated Board",
      description: "Premium white board with excellent print quality",
      image: null,
      properties: ["High-Quality Print", "Vibrant Colors", "Professional"],
    },
    {
      id: "3",
      name: "Specialty Paper",
      description: "Textured and premium finishes for luxury branding",
      image: null,
      properties: ["Luxury Feel", "Customizable Texture", "Premium"],
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: "1",
      client_name: "Sarah Mitchell",
      client_title: "Brand Director",
      client_company: "Premium Cosmetics Co.",
      rating: 5,
      content: "The tuck boxes exceeded our expectations. The quality and attention to detail were outstanding.",
    },
    {
      id: "2",
      client_name: "James Chen",
      client_title: "Operations Manager",
      client_company: "Gourmet Foods Inc.",
      rating: 5,
      content: "Fast turnaround time and excellent communication throughout the process.",
    },
    {
      id: "3",
      client_name: "Emily Rodriguez",
      client_title: "E-commerce Manager",
      client_company: "Retail Brands Ltd.",
      rating: 5,
      content: "Our customers love the unboxing experience. These boxes make a real difference.",
    },
  ];

  // FAQs Data
  const faqs = [
    {
      id: "1",
      question: "What is the minimum order quantity?",
      answer: "We accept orders from 100 units. Pricing is competitive even at lower volumes.",
    },
    {
      id: "2",
      question: "How long does production take?",
      answer: "Standard production takes 5-7 business days. Rush options available upon request.",
    },
    {
      id: "3",
      question: "Can you customize the design?",
      answer: "Absolutely! We offer full customization for colors, printing, and dimensions.",
    },
    {
      id: "4",
      question: "Do you provide samples?",
      answer: "Yes, we offer free sample kits so you can feel the quality before ordering.",
    },
  ];

  // Trusted Brands Data
  const trustedBrands = [
    { id: "1", brand_name: "Brand A", brand_logo: null },
    { id: "2", brand_name: "Brand B", brand_logo: null },
    { id: "3", brand_name: "Brand C", brand_logo: null },
    { id: "4", brand_name: "Brand D", brand_logo: null },
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <StaticCategoryHero
          breadcrumbLabel={heroData.breadcrumbLabel}
          title={heroData.title}
          description={heroData.description}
        />

        {/* Trusted Brands */}
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                  <div key={feature.id} className="text-center">
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
        )}

        {/* Types Grid */}
        {types.length > 0 && (
          <section className="py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                  Types of Custom Tuck Boxes
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {types.map((type) => (
                  <div key={type.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {type.image && (
                      <div className="relative h-40">
                        <Image
                          src={type.image}
                          alt={type.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-brand-secondary mb-1">{type.name}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Customization Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                Customize Every Detail With Purpose
              </h2>
              <p className="text-gray-600 mt-4">
                Our custom tuck boxes can be tailored to match your brand identity perfectly. From dimensions and materials to printing and finishing options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Dimensions", description: "Custom sizes to fit your products perfectly" },
                { title: "Colors", description: "Full range of colors to match your brand" },
                { title: "Printing", description: "High-quality offset or digital printing" },
                { title: "Finishes", description: "Matte, gloss, soft-touch, and emboss options" },
              ].map((option, idx) => (
                <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-bold text-brand-secondary mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materials Section */}
        {materials.length > 0 && (
          <section className="py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                  Premium Materials
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {materials.map((material) => (
                  <div key={material.id} className="text-center">
                    {material.image && (
                      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                        <Image
                          src={material.image}
                          alt={material.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-brand-secondary mb-2">
                      {material.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                    {material.properties && (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {material.properties.map((prop, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold rounded-full"
                          >
                            {prop}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

        {/* FAQ */}
        {faqs.length > 0 && <FAQ faqs={faqs} />}

        {/* Sample Kit */}
        <section className="py-16 lg:py-20 bg-brand-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold mb-4">Order a Free Sample Kit</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              See and feel the quality of our custom tuck boxes before placing your order
            </p>
            <button className="bg-white text-brand-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Request Sample
            </button>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
