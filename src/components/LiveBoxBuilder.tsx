"use client";

import { useState } from "react";
import Image from "next/image";
import realtimeImg from "../../public/realtime.png";

const GROUPS = [
  { label: "Style", options: ["Mailer", "Tuck Box", "Rigid", "Sleeve"] },
  { label: "Material", options: ["Kraft", "White SBS", "Corrugated"] },
  { label: "Size", options: ["Small", "Medium", "Large"] },
  { label: "Finish", options: ["Matte", "Gloss", "Soft Touch"] },
];

function Group({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-teal-200 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selected === opt
                ? "bg-white text-brand-primary border-white"
                : "bg-white/5 text-teal-100 border-white/20 hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LiveBoxBuilder() {
  return (
    <section className="bg-brand-primary text-white py-20" id="builder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left config */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-teal-200 mb-3">
              Live Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Design Your Box in Real Time.
            </h2>
            <p className="text-teal-100 text-sm leading-relaxed max-w-md mb-8">
              Pick a style, material and finish — get an instant price and 3D
              mockup. Sample shipped to your door within 3 days.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {GROUPS.map((g) => (
                <Group key={g.label} label={g.label} options={g.options} />
              ))}
            </div>

            <div className="flex items-center gap-5 mt-10">
              <div className="bg-white text-brand-secondary rounded-xl px-5 py-3">
                <span className="block text-xs text-gray-500 font-medium">Est. unit price</span>
                <span className="text-2xl font-extrabold text-brand-primary">$1.24</span>
              </div>
              <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-md transition-colors">
                Start Designing
              </button>
            </div>
          </div>

          {/* Right preview */}
          <div className="relative h-[420px] w-full rounded-3xl overflow-hidden border border-white/10">
            <Image
              src={realtimeImg}
              alt="Design your box in real time"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
