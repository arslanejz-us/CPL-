import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import CategoryHero from "@/components/category/CategoryHero";
import CategoryShowcase from "@/components/category/CategoryShowcase";
import CategoryTypes from "@/components/category/CategoryTypes";
import CategoryBenefits from "@/components/category/CategoryBenefits";
import CategoryMaterials from "@/components/category/CategoryMaterials";
import CategoryCustomization from "@/components/category/CategoryCustomization";

// Category data - define all available categories here
const CATEGORIES: Record<string, any> = {
  "custom-tuck-boxes": {
    title: "Custom Tuck Boxes",
    subtitle: "Professional, versatile, and cost-effective packaging",
    description: "Professional, versatile, and cost-effective packaging that protects your products while enhancing your brand presence on shelves.",
    badge: "PREMIUM PACKAGING SOLUTION",
    benefits: ["Easy to assemble", "Excellent durability", "Fully customizable", "Eco-friendly options"],
  },
  "cosmetic-boxes": {
    title: "Custom Cosmetic Boxes",
    subtitle: "Elegant packaging for beauty products",
    description: "Beautiful and protective packaging designed specifically for cosmetic and beauty products.",
    badge: "BEAUTY PACKAGING",
    benefits: ["Premium finish", "Product visibility", "Eco-friendly", "Custom branding"],
  },
  "soap-boxes": {
    title: "Custom Soap Boxes",
    subtitle: "Perfect for artisan and commercial soap brands",
    description: "Durable and attractive packaging for soap products of all sizes.",
    badge: "SPECIALTY PACKAGING",
    benefits: ["Moisture resistant", "Eye-catching design", "Cost-effective", "Fully customizable"],
  },
  "mailer-boxes": {
    title: "Custom Mailer Boxes",
    subtitle: "Shipping and delivery packaging solutions",
    description: "Secure and professional packaging for shipping products directly to customers.",
    badge: "SHIPPING SOLUTION",
    benefits: ["Impact protection", "Brand visibility", "Easy assembly", "Cost-effective shipping"],
  },
};

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const categoryData = CATEGORIES[category];

  return {
    title: `${categoryData?.title || category} | Custom Packaging Lane`,
    description: categoryData?.description || `Explore our ${category} packaging solutions`,
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryData = CATEGORIES[category];

  if (!categoryData) {
    return (
      <>
        <Header />
        <main className="flex-grow flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-brand-secondary mb-2">Category Not Found</h1>
            <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        <CategoryHero categoryData={categoryData} category={category} />
        <CategoryShowcase category={category} />
        <CategoryTypes category={category} />
        <CategoryBenefits category={category} />
        <CategoryMaterials category={category} />
        <CategoryCustomization category={category} />
        <QuoteForm />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
