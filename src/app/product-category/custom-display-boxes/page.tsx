import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import TrustedBrands from "@/components/TrustedBrands";
import StaticCategoryHero from "@/components/StaticCategoryHero";
import CustomizationSection from "@/components/CustomizationSection";
import QuoteForm from "@/components/QuoteForm";
import SampleKitForm from "@/components/SampleKitForm";
import Image from "next/image";

export const metadata = {
  title: "Custom Display Boxes | Custom Packaging Lane",
  description: "Premium custom display boxes designed for retail brands that showcase products with elegance and impact.",
};

export default function CustomDisplayBoxesPage() {
  // Hero Section Data
  const heroData = {
    breadcrumbLabel: "Custom Display Boxes",
    title: "Custom Display Boxes",
    description: "Premium custom display boxes designed for retail brands that showcase products with elegance and impact. Perfect for creating memorable retail experiences.",
  };

  // Types Data - Product Cards
  const types = [
    {
      id: "1",
      name: "Countertop Display Box",
      image: "/client-say-one.png",
    },
    {
      id: "2",
      name: "Shelf-Ready Display Box",
      image: "/client-say-two.png",
    },
    {
      id: "3",
      name: "Hanging Display Box",
      image: "/client-say-three.png",
    },
    {
      id: "4",
      name: "Tiered Display Box",
      image: "/client-say-one.png",
    },
    {
      id: "5",
      name: "Window Display Box",
      image: "/client-say-two.png",
    },
    {
      id: "6",
      name: "Floor Display Box",
      image: "/client-say-three.png",
    },
    {
      id: "7",
      name: "Magnetic Display Box",
      image: "/client-say-one.png",
    },
    {
      id: "8",
      name: "Rotating Display Box",
      image: "/client-say-two.png",
    },
  ];

  // Feature Blocks Data (replacing Types)
  const featureBlocks = [
    {
      id: "1",
      icon: "/Product-categories/flexible.svg",
      title: "Flexible\nOrder Volume",
      description: "From low MOQs to high\nvolume production.",
    },
    {
      id: "2",
      icon: "/Product-categories/fastest.svg",
      title: "FASTEST\nTURNAROUND",
      description: "7–10 business day lead\ntimes with free shipping.",
    },
    {
      id: "3",
      icon: "/Product-categories/support.svg",
      title: "24/7 EXPERT\nSUPPORT",
      description: "Dedicated packaging\nspecialists available anytime",
    },
    {
      id: "4",
      icon: "/Product-categories/price-match.svg",
      title: "PRICE MATCH\nGUARANTEE",
      description: "Competitive pricing without\ncompromising quality.",
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
      content: "The display boxes transformed our retail presence. Eye-catching design and exceptional quality!",
    },
    {
      id: "2",
      client_name: "James Chen",
      client_title: "Operations Manager",
      client_company: "Gourmet Foods Inc.",
      rating: 5,
      content: "Perfect for product showcase. Fast production and excellent customer support throughout.",
    },
    {
      id: "3",
      client_name: "Emily Rodriguez",
      client_title: "E-commerce Manager",
      client_company: "Retail Brands Ltd.",
      rating: 5,
      content: "These display boxes increased our in-store sales significantly. Highly recommended!",
    },
  ];

  // FAQs Data
  const faqs = [
    {
      id: "1",
      question: "What is the minimum order quantity for display boxes?",
      answer: "We accept orders from 100 units. Pricing is competitive even at lower volumes.",
    },
    {
      id: "2",
      question: "How long does production take for display boxes?",
      answer: "Standard production takes 5-7 business days. Rush options available upon request.",
    },
    {
      id: "3",
      question: "Can you customize the design of display boxes?",
      answer: "Absolutely! We offer full customization for colors, printing, dimensions, and structural design.",
    },
    {
      id: "4",
      question: "Do you provide samples of display boxes?",
      answer: "Yes, we offer free sample kits so you can feel the quality and design before ordering.",
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

        {/* Feature Blocks Section */}
        {featureBlocks.length > 0 && (
          <section className="w-full" style={{ backgroundColor: '#F7F7F7', paddingTop: '30px', paddingBottom: '30px' }}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1140px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.id} className="flex gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image
                        src={block.icon}
                        alt={block.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {/* Title and Description */}
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#05766E] leading-4 mb-1 whitespace-pre-line">
                        {block.title}
                      </h3>
                      <p className="text-xs font-normal text-[#575757] whitespace-pre-line">
                        {block.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Types of Custom Display Boxes Section */}
        {types.length > 0 && (
          <section className="pt-16 lg:pt-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-medium text-black mb-4">
                  Types of Custom Display Boxes
                </h2>
                <p className="text-base font-normal text-[#575757] max-w-2xl mx-auto">
                  We offer a complete range of custom display boxes to showcase your products effectively and enhance retail visibility.
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {types.map((type) => (
                  <div key={type.id} className="flex flex-col">
                    {/* Product Image */}
                    <div className="relative w-full mb-4" style={{ height: '344px' }}>
                      <Image
                        src={type.image}
                        alt={type.name}
                        fill
                        className="object-cover rounded-[28px]"
                      />
                    </div>
                    {/* Product Title */}
                    <h3 className="text-base font-normal text-black text-left">
                      {type.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center">
                <button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-colors">
                  Request a Quote
                </button>
                <button className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-colors">
                  View All
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Customization Products Section */}
        <section className="pt-16 lg:pt-20 bg-white">
          <CustomizationSection />
        </section>

        {/* Quote Form Section */}
        <QuoteForm />

        {/* Testimonials Section */}
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}

        {/* Customization Details Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div style={{ maxWidth: '1140px', margin: '0 auto', backgroundColor: '#F5F1EB', borderRadius: '14px', height: '500px', overflowY: 'auto', padding: '40px' }} className="mx-4 sm:mx-6 lg:mx-8">
            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>
                Premium-Grade Materials for Eye-Catching Display Solutions
              </h2>
              <p className="text-gray-700 mt-4 text-left">
                The right material transforms your product display into a retail powerhouse. At Custom Lane Packaging, we offer premium materials for custom display boxes that captivate customers and drive sales.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Coated kraft</strong> - Durable and eco-friendly, perfect for sustainable display solutions</li>
                  <li><strong>White paperboard</strong> - Premium finish for vibrant, eye-catching prints</li>
                  <li><strong>Specialty Papers</strong> - Textured finishes for luxury product positioning</li>
                  <li><strong>Corrugated cardboard</strong> - Strong and reliable for heavy-duty displays</li>
                  <li><strong>Rigid board</strong> - Premium structural integrity for impressive presentations</li>
                  <li><strong>Metallic finishes</strong> - High-end options for premium brand showcase</li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>
                Premium-Grade Materials for Eye-Catching Display Solutions
              </h2>
              <p className="text-gray-700 mt-4 text-left">
                The right material transforms your product display into a retail powerhouse. At Custom Lane Packaging, we offer premium materials for custom display boxes that captivate customers and drive sales.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Popular Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Coated kraft</strong> - Durable and eco-friendly, perfect for sustainable display solutions</li>
                  <li><strong>White paperboard</strong> - Premium finish for vibrant, eye-catching prints</li>
                  <li><strong>Specialty Papers</strong> - Textured finishes for luxury product positioning</li>
                  <li><strong>Corrugated cardboard</strong> - Strong and reliable for heavy-duty displays</li>
                  <li><strong>Rigid board</strong> - Premium structural integrity for impressive presentations</li>
                  <li><strong>Metallic finishes</strong> - High-end options for premium brand showcase</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && <FAQ faqs={faqs} />}

        {/* Sample Kit Form */}
        <SampleKitForm />

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
