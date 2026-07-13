import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/variants";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't render breadcrumbs on Home page
  if (location.pathname === "/") return null;

  // Map route paths to parent-friendly titles
  const routeMap = {
    academics: "Academics",
    admission: "Admission Enquiry",
    events: "School Events",
    achievements: "Achievements & Awards",
    gallery: "Gallery",
    calendar: "Academic Calendar",
    about: "About Us",
    faq: "FAQs",
    blog: "Parent Resources / Blog",
    contact: "Contact Us",
    visit: "Book a Visit"
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 md:px-6 pt-6 -mb-2"
    >
      <nav className="flex items-center gap-2 text-xs md:text-sm font-fredoka font-bold text-navy-muted" aria-label="Breadcrumb">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-primary transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = routeMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <React.Fragment key={to}>
              <ChevronRight className="w-3.5 h-3.5 text-cream-dark/80" />
              {isLast ? (
                <span className="text-primary truncate" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </motion.div>
  );
}
