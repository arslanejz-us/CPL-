import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "@/lib/categories";

const FALLBACK_IMAGES = [
  "/Food-Packaging.png",
  "/Retail-packaging.png",
  "/Cosmetic-packaging.png",
  "/Beverage-Packaging.png",
];

export const metadata = {
  title: "Categories | Custom Packaging Lane",
  description: "Browse packaging categories for different industries",
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-light to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-secondary">
                Product Categories
              </h1>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Discover packaging solutions tailored to your industry
              </p>
            </div>

            {categories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No categories found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                  <Link
                    key={category.id}
                    href={`/product-category/${category.slug}`}
                    className="group"
                  >
                    <div className="relative h-72 rounded-2xl overflow-hidden mb-4 bg-gray-100 group-hover:shadow-lg transition-shadow">
                      <Image
                        src={
                          FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
                        }
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white text-center px-4">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
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
