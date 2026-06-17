import React from "react";
import { ImageIcon } from "lucide-react";

interface PlaceholderProps {
  label?: string;
  className?: string;
  iconClassName?: string;
  rounded?: string;
}

/**
 * Reusable image placeholder. Drop wherever a real photo will go later.
 */
export default function Placeholder({
  label = "Image",
  className = "",
  iconClassName = "w-10 h-10",
  rounded = "rounded-2xl",
}: PlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 ${rounded} ${className}`}
    >
      <ImageIcon className={iconClassName} />
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-center px-2">
          {label}
        </span>
      )}
    </div>
  );
}
