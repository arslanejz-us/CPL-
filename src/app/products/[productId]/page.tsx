import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import TrustedBrands from "@/components/TrustedBrands";
import Testimonials from "@/components/Testimonials";
import SampleKitForm from "@/components/SampleKitForm";
import ProductHero from "@/components/product/ProductHero";
import ProductFeatures from "@/components/product/ProductFeatures";
import BenefitsCircular from "@/components/category/BenefitsCircular";
import ProductShowcase from "@/components/product/ProductShowcase";
import ProductCustomization from "@/components/product/ProductCustomization";
import ProductMaterials from "@/components/product/ProductMaterials";
import CategoryContentSections from "@/components/category/CategoryContentSections";
import ProductRelated from "@/components/product/ProductRelated";
import { getProduct, getAllProductIds } from "@/lib/products";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found | Custom Packaging Lane",
    };
  }

  return {
    title: `${product.title} | Custom Packaging Lane`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return getAllProductIds().map((productId) => ({
    productId,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <ProductHero product={product} />

        {/* 2. Trusted Brands */}
        <TrustedBrands />

        {/* 3. Key Features (4 boxes) */}
        <ProductFeatures features={product.keyFeatures} />

        {/* 4. Packaging Benefits Circular */}
        <BenefitsCircular
          title={product.packagingBenefits.title}
          subtitle={product.packagingBenefits.subtitle}
          description={product.packagingBenefits.description}
          image={product.packagingBenefits.image}
          features={product.packagingBenefits.features}
        />

        {/* 5. Customization */}
        <ProductCustomization productId={product.id} />

        {/* 6. Materials */}
        <ProductMaterials productId={product.id} />

        {/* 7. Product Showcase */}
        <ProductShowcase items={product.showcaseItems} productName={product.name} />

        {/* 8. Quote Form */}
        <QuoteForm />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Content Sections */}
        <CategoryContentSections sections={product.contentSections} />

        {/* 11. Related Products */}
        <ProductRelated currentProduct={product.id} relatedProducts={product.relatedProducts} />

        {/* 12. FAQ */}
        <FAQ />

        {/* 13. Sample Kit */}
        <SampleKitForm />

        {/* 14. Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
