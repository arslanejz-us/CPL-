import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";

const FALLBACK_IMAGES = [
  "/Custom-tuck-boxes.png",
  "/Retail-packaging.png",
  "/Cosmetic-packaging.png",
  "/Beverage-Packaging.png",
  "/Food-Packaging.png",
];

export const metadata = {
  title: "All Products | Custom Packaging Lane",
  description: "Browse our complete collection of custom packaging solutions",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-light to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-secondary">
                All Products
              </h1>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Explore our complete range of custom packaging solutions
              </p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group"
                  >
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4 bg-gray-100 group-hover:shadow-lg transition-shadow">
                      <Image
                        src={FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-brand-secondary mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.subtitle}
                    </p>
                    <div className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-semibold rounded-full">
                      {product.badge}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
