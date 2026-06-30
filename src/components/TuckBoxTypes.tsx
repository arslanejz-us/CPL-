"use client";

import Placeholder from "./Placeholder";

export default function TuckBoxTypes() {
  const boxTypes = [
    {
      id: 1,
      name: "Straight Tuck Box",
      description: "Standard design with flaps that tuck into the box",
    },
    {
      id: 2,
      name: "Reverse Tuck Box",
      description: "Reverse closing flap design for secure closure",
    },
    {
      id: 3,
      name: "Snap Lock Box",
      description: "Quick-closing mechanism for fast assembly",
    },
    {
      id: 4,
      name: "Bell Lock Box",
      description: "Interlocking flap design for extra security",
    },
    {
      id: 5,
      name: "Auto Lock Box",
      description: "Self-locking base for no-glue assembly",
    },
    {
      id: 6,
      name: "Kraft Tuck Box",
      description: "Eco-friendly kraft material option",
    },
    {
      id: 7,
      name: "Window Tuck Box",
      description: "Display window to showcase product inside",
    },
    {
      id: 8,
      name: "Gusset Tuck Box",
      description: "Extra capacity for bulky items",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-secondary">
            Types of Custom Tuck Boxes
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Choose from our wide variety of tuck box styles to match your packaging needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boxTypes.map((box) => (
            <div key={box.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 mb-4 bg-gray-100 rounded-lg">
                <Placeholder label={box.name} className="h-full" rounded="rounded-lg" />
              </div>
              <h3 className="text-lg font-bold text-brand-secondary mb-2">
                {box.name}
              </h3>
              <p className="text-sm text-gray-600">{box.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
