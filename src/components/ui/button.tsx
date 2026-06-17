import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  variant: {
    default: "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-dark",
    outline:
      "border border-gray-200 bg-white text-brand-secondary hover:bg-gray-50",
    ghost: "text-brand-secondary hover:bg-gray-100",
    secondary: "bg-brand-light text-brand-secondary hover:bg-gray-200",
  },
  size: {
    default: "h-11 px-7 py-2 text-sm",
    sm: "h-9 px-4 text-sm",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant;
  size?: keyof typeof buttonVariants.size;
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-montserrat font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    base,
    buttonVariants.variant[variant],
    buttonVariants.size[size],
    className
  );

  // Lightweight Radix `Slot` equivalent: merge classes onto a single child.
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: cn(classes, child.props.className),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export { Button, buttonVariants };
