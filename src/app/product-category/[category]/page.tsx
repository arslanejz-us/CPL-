import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryHero from "@/components/CategoryHero";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import TrustedBrands from "@/components/TrustedBrands";
import { getCategoryWithAllData } from "@/lib/supabase-queries";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const data = await getCategoryWithAllData(category);

  if (!data) {
    return {
      title: "Category Not Found | Custom Packaging Lane",
    };
  }

  return {
    title: `${data.category.seo_title || data.category.name} | Custom Packaging Lane`,
    description: data.category.seo_description || data.category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const data = await getCategoryWithAllData(categorySlug);

  if (!data) {
    notFound();
  }

  const { category, features, types, materials, testimonials, faqs, trustedBrands } = data;

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <CategoryHero
          breadcrumbLabel={category.name}
          title={category.name}
          description={category.hero_description || category.description}
          categorySlug={categorySlug}
        />

        {/* Trusted Brands */}
        {trustedBrands.length > 0 && <TrustedBrands brands={trustedBrands} />}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature: any) => (
                  <div key={feature.id} className="text-center">
                    <div className="mb-4 text-4xl text-brand-primary">
                      {feature.icon}
                    </div>
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
                  Types of {category.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {types.map((type: any) => (
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
        {category.customization_description && (
          <section className="py-16 lg:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
                  Customize Every Detail With Purpose
                </h2>
                <p className="text-gray-600 mt-4">{category.customization_description}</p>
              </div>

              {category.customize_options && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.customize_options.map((option: any, idx: number) => (
                    <div key={idx} className="text-center p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-bold text-brand-secondary mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

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
                {materials.slice(0, 3).map((material: any) => (
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
                        {material.properties.map((prop: string, idx: number) => (
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
              See and feel the quality of our packaging before placing your order
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
