import React from "react";

export default function Skeleton({
  variant = "text",
  className = "",
  width = "w-full",
  height = "h-4"
}) {
  const baseStyles = "animate-shimmer rounded-xl";
  
  const variants = {
    text: "h-4 rounded-md mb-2",
    title: "h-8 rounded-lg mb-4",
    circle: "rounded-full",
    rect: "rounded-2xl"
  };

  const getStyle = () => {
    if (variant === "circle") {
      return `w-12 h-12 ${variants.circle}`;
    }
    return `${width} ${height} ${variants[variant]}`;
  };

  return <div className={`${baseStyles} ${getStyle()} ${className}`} />;
}
