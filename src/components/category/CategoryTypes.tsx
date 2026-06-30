"use client";

import Placeholder from "../Placeholder";

interface CategoryTypesProps {
  category: string;
}

const TYPES_DATA: Record<string, any[]> = {
  "custom-tuck-boxes": [
    { id: 1, name: "Straight Tuck Box", description: "Standard design with flaps that tuck into the box" },
    { id: 2, name: "Reverse Tuck Box", description: "Reverse closing flap design for secure closure" },
    { id: 3, name: "Snap Lock Box", description: "Quick-closing mechanism for fast assembly" },
    { id: 4, name: "Bell Lock Box", description: "Interlocking flap design for extra security" },
    { id: 5, name: "Auto Lock Box", description: "Self-locking base for no-glue assembly" },
    { id: 6, name: "Kraft Tuck Box", description: "Eco-friendly kraft material option" },
    { id: 7, name: "Window Tuck Box", description: "Display window to showcase product inside" },
    { id: 8, name: "Gusset Tuck Box", description: "Extra capacity for bulky items" },
  ],
  "cosmetic-boxes": [
    { id: 1, name: "Drawer Box", description: "Elegant sliding drawer design" },
    { id: 2, name: "Folding Box", description: "Secure folding closure" },
    { id: 3, name: "Rigid Box", description: "Premium rigid construction" },
    { id: 4, name: "Window Box", description: "Clear window display" },
    { id: 5, name: "Pillow Box", description: "Curved pillow style" },
    { id: 6, name: "Luxury Box", description: "High-end packaging solution" },
    { id: 7, name: "Gift Box", description: "Perfect for gift sets" },
    { id: 8, name: "Custom Shape", description: "Any custom design needed" },
  ],
  "soap-boxes": [
    { id: 1, name: "Standard Box", description: "Traditional soap packaging" },
    { id: 2, name: "Sleeve Box", description: "Sliding sleeve design" },
    { id: 3, name: "Kraft Box", description: "Eco-friendly kraft paper" },
    { id: 4, name: "Window Box", description: "Product display window" },
    { id: 5, name: "Tuck Box", description: "Easy fold and tuck" },
    { id: 6, name: "Rigid Box", description: "Premium rigid construction" },
    { id: 7, name: "Set Box", description: "Multi-soap packaging" },
    { id: 8, name: "Custom Design", description: "Fully customizable" },
  ],
  "mailer-boxes": [
    { id: 1, name: "Standard Mailer", description: "Basic shipping box" },
    { id: 2, name: "Die Cut Mailer", description: "Custom shaped mailer" },
    { id: 3, name: "Corrugated Mailer", description: "Extra protection" },
    { id: 4, name: "Padded Mailer", description: "Cushioned interior" },
    { id: 5, name: "Branded Mailer", description: "Full color branding" },
    { id: 6, name: "Auto Lock Mailer", description: "Self-closing base" },
    { id: 7, name: "Large Mailer", description: "Oversized packaging" },
    { id: 8, name: "Custom Size", description: "Any dimensions needed" },
  ],
};

export default function CategoryTypes({ category }: CategoryTypesProps) {
  const types = TYPES_DATA[category] || TYPES_DATA["custom-tuck-boxes"];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Available Styles & Types
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Choose from our wide variety of packaging styles to match your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 mb-4 bg-gray-100 rounded-lg">
                <Placeholder label={item.name} className="h-full" rounded="rounded-lg" />
              </div>
              <h3 className="text-lg font-bold text-brand-secondary mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
