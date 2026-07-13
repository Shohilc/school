import React from "react";

export default function Badge({
  children,
  variant = "primary",
  className = ""
}) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-fredoka font-bold tracking-wider";
  
  const variants = {
    primary: "bg-primary-light text-primary-dark",
    secondary: "bg-secondary-light text-secondary-dark",
    pink: "bg-accent-pink-light text-accent-pink-dark",
    green: "bg-emerald-100 text-emerald-700",
    navy: "bg-navy text-cream",
    gray: "bg-slate-100 text-slate-600"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
