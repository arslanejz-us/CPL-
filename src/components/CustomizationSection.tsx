"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = {
  id: string;
  name: string;
  icon: string;
  products: Product[];
};

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const tabs: Tab[] = [
  {
    id: "base-material",
    name: "Base Material",
    icon: "/tabs-icons/Base-Material.svg",
    products: [
      {
        id: "1",
        name: "Natural Kraft Paperboard",
        description: "Eco-friendly brown cardboard with natural appeal and strength",
        image: "/client-say-one.png",
      },
      {
        id: "2",
        name: "Coated White Board",
        description: "Premium white board with excellent print quality",
        image: "/client-say-two.png",
      },
      {
        id: "3",
        name: "Specialty Paper",
        description: "Textured and premium finishes for luxury branding",
        image: "/client-say-three.png",
      },
    ],
  },
  {
    id: "coatings",
    name: "Coatings",
    icon: "/tabs-icons/Coatings.svg",
    products: [
      {
        id: "1",
        name: "Matte Coating",
        description: "Soft, elegant finish with minimal gloss",
        image: "/client-say-two.png",
      },
      {
        id: "2",
        name: "Gloss Coating",
        description: "Bright, vibrant finish with high shine",
        image: "/client-say-three.png",
      },
      {
        id: "3",
        name: "Soft-Touch Coating",
        description: "Velvety smooth finish for premium feel",
        image: "/client-say-one.png",
      },
      {
        id: "4",
        name: "UV Coating",
        description: "Protective high-gloss finish",
        image: "/client-say-two.png",
      },
    ],
  },
  {
    id: "printings",
    name: "Printings",
    icon: "/tabs-icons/Printings.svg",
    products: [
      {
        id: "1",
        name: "CMYK Printing",
        description: "Full color digital printing for vibrant designs",
        image: "/client-say-three.png",
      },
      {
        id: "2",
        name: "Spot Color Printing",
        description: "Precise color matching for brand consistency",
        image: "/client-say-one.png",
      },
      {
        id: "3",
        name: "Flexographic Printing",
        description: "High-speed printing for bulk production",
        image: "/client-say-two.png",
      },
    ],
  },
  {
    id: "wrappings",
    name: "Wrappings",
    icon: "/tabs-icons/Wrappings.svg",
    products: [
      {
        id: "1",
        name: "Tissue Paper Wrapping",
        description: "Delicate protective wrapping for premium products",
        image: "/client-say-one.png",
      },
      {
        id: "2",
        name: "Kraft Paper Wrapping",
        description: "Eco-friendly wrapping material",
        image: "/client-say-two.png",
      },
      {
        id: "3",
        name: "Custom Logo Wrapping",
        description: "Branded wrapping with your logo",
        image: "/client-say-three.png",
      },
    ],
  },
  {
    id: "add-ons",
    name: "Add-ons",
    icon: "/tabs-icons/Add-ons.svg",
    products: [
      {
        id: "1",
        name: "Ribbon & Bow",
        description: "Decorative ribbon and bow embellishments",
        image: "/client-say-two.png",
      },
      {
        id: "2",
        name: "Stickers & Labels",
        description: "Custom stickers and product labels",
        image: "/client-say-three.png",
      },
      {
        id: "3",
        name: "Thank You Cards",
        description: "Personalized thank you insert cards",
        image: "/client-say-one.png",
      },
      {
        id: "4",
        name: "QR Code Labels",
        description: "Interactive QR code labels for engagement",
        image: "/client-say-two.png",
      },
    ],
  },
  {
    id: "inserts",
    name: "Inserts",
    icon: "/tabs-icons/Inserts.svg",
    products: [
      {
        id: "1",
        name: "Foam Inserts",
        description: "Protective foam padding for product safety",
        image: "/client-say-three.png",
      },
      {
        id: "2",
        name: "Paper Dividers",
        description: "Cardboard dividers for product organization",
        image: "/client-say-one.png",
      },
      {
        id: "3",
        name: "Custom Molded Inserts",
        description: "Precisely molded inserts for perfect fit",
        image: "/client-say-two.png",
      },
    ],
  },
  {
    id: "finishes",
    name: "Finishes",
    icon: "/tabs-icons/Finishes.svg",
    products: [
      {
        id: "1",
        name: "Embossing",
        description: "Raised design elements for tactile appeal",
        image: "/client-say-one.png",
      },
      {
        id: "2",
        name: "Debossing",
        description: "Recessed design elements for elegant look",
        image: "/client-say-two.png",
      },
      {
        id: "3",
        name: "Die Cutting",
        description: "Custom shaped cutouts and windows",
        image: "/client-say-three.png",
      },
    ],
  },
];

export default function CustomizationSection() {
  const [activeTab, setActiveTab] = useState("base-material");
  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center my-0">
          <h2 className="text-4xl font-medium text-black mb-4">
            Customize Every Detail With Purpose
          </h2>
          <p className="text-base font-normal text-[#575757] max-w-2xl mx-auto m-0">
            From the design to the final detailing, every element is up to you. Take a closer look at customization options that enhance the overall appeal of your custom boxes.

          </p>
        </div>
      </div>

      {/* Tabs Bar - Full Width */}
      <div style={{ backgroundColor: "#007066", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center" style={{ scrollBehavior: "smooth" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 pb-3 flex items-center gap-2 transition-all border-b-2 font-medium text-sm text-white ${activeTab === tab.id
                  ? "border-white font-bold"
                  : "border-transparent hover:opacity-80"
                  }`}
                style={{ fontFamily: "Inter" }}
              >
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={tab.icon}
                    alt={tab.name}
                    width={20}
                    height={20}
                    className="w-full h-full"
                  />
                </div>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTabData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTabData.products.map((product) => (
              <div key={product.id} className="flex flex-col">
                {/* Product Card */}
                <div
                  className="rounded-[28px] overflow-hidden bg-white"
                  style={{ width: "100%", maxWidth: "381px", height: "381px", border: "1px solid #CBBEAE" }}
                >
                  {/* Image Section - 70% */}
                  <div
                    className="relative w-full"
                    style={{ height: "267px" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text Section - 30% */}
                  <div
                    className="p-4 flex flex-col justify-center"
                    style={{ height: "114px" }}
                  >
                    <h3 className="text-sm font-semibold text-black mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs font-normal text-[#575757] line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
