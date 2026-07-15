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
  title: "Custom Mailer Boxes | Custom Packaging Lane",
  description: "Premium custom mailer boxes for shipping products with style and protection.",
};

export default function CustomMailerBoxesPage() {
  const heroData = {
    breadcrumbLabel: "Custom Mailer Boxes",
    title: "Custom Mailer Boxes",
    description: "Premium custom mailer boxes for shipping products with style and protection. Perfect for e-commerce and direct mail.",
  };

  const types = [
    { id: "1", name: "Standard Mailer Box", image: "/client-say-one.png" },
    { id: "2", name: "Padded Mailer Box", image: "/client-say-two.png" },
    { id: "3", name: "Die-Cut Mailer Box", image: "/client-say-three.png" },
    { id: "4", name: "Kraft Mailer Box", image: "/client-say-one.png" },
    { id: "5", name: "White Mailer Box", image: "/client-say-two.png" },
    { id: "6", name: "Branded Mailer Box", image: "/client-say-three.png" },
    { id: "7", name: "Custom Size Mailer", image: "/client-say-one.png" },
    { id: "8", name: "Premium Mailer Box", image: "/client-say-two.png" },
  ];

  const featureBlocks = [
    { id: "1", icon: "/Product-categories/flexible.svg", title: "Flexible\nOrder Volume", description: "From low MOQs to high\nvolume production." },
    { id: "2", icon: "/Product-categories/fastest.svg", title: "FASTEST\nTURNAROUND", description: "7–10 business day lead\ntimes with free shipping." },
    { id: "3", icon: "/Product-categories/support.svg", title: "24/7 EXPERT\nSUPPORT", description: "Dedicated packaging\nspecialists available anytime" },
    { id: "4", icon: "/Product-categories/price-match.svg", title: "PRICE MATCH\nGUARANTEE", description: "Competitive pricing without\ncompromising quality." },
  ];

  const testimonials = [
    { id: "1", client_name: "Sarah Mitchell", client_company: "Premium Cosmetics Co.", rating: 5, content: "Perfect mailer boxes for our shipping needs. Quality exceeded expectations!" },
    { id: "2", client_name: "James Chen", client_company: "Gourmet Foods Inc.", rating: 5, content: "Fast turnaround and excellent communication. Highly recommended!" },
    { id: "3", client_name: "Emily Rodriguez", client_company: "Retail Brands Ltd.", rating: 5, content: "Our customers love the unboxing experience. These are perfect!" },
  ];

  const faqs = [
    { id: "1", question: "What is the minimum order quantity?", answer: "We accept orders from 100 units with competitive pricing." },
    { id: "2", question: "How long does production take?", answer: "Standard production takes 5-7 business days. Rush options available." },
    { id: "3", question: "Can you customize the design?", answer: "Absolutely! Full customization for colors, printing, and dimensions." },
    { id: "4", question: "Do you provide samples?", answer: "Yes, we offer free sample kits before full production." },
  ];

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
        <StaticCategoryHero breadcrumbLabel={heroData.breadcrumbLabel} title={heroData.title} description={heroData.description} />
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}
        {featureBlocks.length > 0 && (
          <section className="w-full" style={{ backgroundColor: '#F7F7F7', paddingTop: '20px', paddingBottom: '20px' }}>
            <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1140px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.id} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10">
                      <Image src={block.icon} alt={block.title} width={40} height={40} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#05766E] leading-4 mb-1 whitespace-pre-line">{block.title}</h3>
                      <p className="text-xs font-normal text-[#575757] whitespace-pre-line">{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {types.length > 0 && (
          <section className="pt-16 lg:pt-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-2 sm:mb-4" style={{ fontFamily: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>Types of Custom Mailer Boxes</h2>
                <p className="text-sm sm:text-base font-normal text-[#575757] max-w-2xl mx-auto" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>Explore our complete range of custom mailer boxes for every shipping need.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {types.map((type) => (
                  <div key={type.id} className="flex flex-col">
                    <div className="relative w-full mb-4" style={{ height: '344px' }}>
                      <Image src={type.image} alt={type.name} fill className="object-cover rounded-[28px]" />
                    </div>
                    <h3 className="text-base font-normal text-black text-left">{type.name}</h3>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <button className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-8 rounded-full transition-colors">Request a Quote</button>
                <button className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-colors">View All</button>
              </div>
            </div>
          </section>
        )}
        <section className="pt-16 lg:pt-20 bg-white">
          <CustomizationSection />
        </section>
        <QuoteForm />
        {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
        <section className="py-16 lg:py-20 bg-white">
          <div style={{ maxWidth: '1140px', margin: '0 auto', backgroundColor: '#F5F1EB', borderRadius: '14px', height: '500px', overflowY: 'auto', padding: '40px' }} className="mx-4 sm:mx-6 lg:mx-8">
            <div className="text-center mb-12">
              <h2 className="font-extrabold text-brand-secondary" style={{ fontSize: '22px' }}>Premium Mailer Box Materials and Options</h2>
              <p className="text-gray-700 mt-4 text-left">Choose from premium materials designed for shipping protection and brand presentation.</p>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-brand-secondary mb-3">Material Options:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Corrugated cardboard</strong> - Durable protection for safe shipping</li>
                  <li><strong>Kraft paper</strong> - Eco-friendly and sustainable option</li>
                  <li><strong>White cardboard</strong> - Premium appearance for brand presentation</li>
                  <li><strong>Padded inserts</strong> - Extra protection for fragile items</li>
                  <li><strong>Custom printing</strong> - Full color branding and design</li>
                  <li><strong>Various sizes</strong> - Custom dimensions for any product</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {faqs.length > 0 && <FAQ faqs={faqs} />}
        <SampleKitForm />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
