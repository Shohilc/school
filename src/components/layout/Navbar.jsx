import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const m = motion;
import { Search, Menu, X, Calendar, MessageSquare, GraduationCap, Home, BookOpen, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/academics", label: "Academics" },
  { path: "/admission", label: "Admission Enquiry" },
  { path: "/events", label: "Events" },
  { path: "/achievements", label: "Achievements" },
  { path: "/gallery", label: "Gallery" },
  { path: "/calendar", label: "Calendar" },
  { path: "/about", label: "About Us" },
  { path: "/faq", label: "FAQs" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openEnquiry, triggerConfetti, triggerMascotReaction } = useModal();
  const location = useLocation();

  const [logoClicks, setLogoClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = (e) => {
    const now = Date.now();
    if (now - lastClickTime < 1000) {
      const newClicks = logoClicks + 1;
      setLogoClicks(newClicks);
      if (newClicks >= 3) {
        e.preventDefault();
        triggerConfetti(e.clientX, e.clientY);
        triggerMascotReaction("easterEgg");
        setLogoClicks(0);
      }
    } else {
      setLogoClicks(1);
    }
    setLastClickTime(now);
  };

  const getLinkIcon = (path) => {
    const iconClass = "w-4 h-4 stroke-[2.2]";
    switch (path) {
      case "/":
        return <Home className={iconClass} />;
      case "/academics":
        return <GraduationCap className={iconClass} />;
      case "/admission":
        return <MessageSquare className={iconClass} />;
      case "/events":
        return <Calendar className={iconClass} />;
      case "/achievements":
        return <Sparkles className={iconClass} />;
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const searchRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}" (simulated)`);
      setSearchQuery("");
    }
    setIsSearchOpen(false);
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Close search dropdown on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  // Hamburger menu variants for SVG paths
  const topBarVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: 45, y: 6 }
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    opened: { opacity: 0 }
  };

  const bottomBarVariants = {
    closed: { rotate: 0, y: 0 },
    opened: { rotate: -45, y: -6 }
  };

  return (
    <>
      <header
        className="fixed top-4 left-0 right-0 z-40 w-full flex justify-center px-4 md:px-6 transition-all duration-300 pointer-events-none"
      >
        <div
          className={`w-full max-w-7xl glass rounded-full px-6 shadow-xl border border-white/35 flex items-center justify-between pointer-events-auto transition-all duration-300
            ${isScrolled ? "py-2 bg-white/70 backdrop-blur-lg border-primary/20 shadow-primary/5" : "py-3 bg-white/40"}
          `}
        >
          {/* Logo Badge with Triple Click Easter Egg */}
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group select-none">
            <m.div
              className="w-12 h-12 md:w-14 md:h-14 bg-primary rounded-full flex items-center justify-center text-white font-fredoka font-black text-xl md:text-2xl shadow-md shadow-primary/30"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.5 }}
            >
              LS
            </m.div>
            <div className="hidden sm:block">
              <span className="block font-fredoka font-black text-lg md:text-xl text-navy leading-none">
                Little Sprouts
              </span>
              <span className="block font-nunito font-semibold text-xs md:text-sm text-primary">
                Educational Academy
              </span>
            </div>
          </Link>

          {/* Desktop Nav Core (5 main items) */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.slice(0, 5).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <m.div
                  key={link.path}
                  whileTap={{ scale: 0.93 }}
                  className="inline-block relative"
                >
                  <Link
                    to={link.path}
                    className={`relative font-fredoka font-bold text-sm md:text-base py-1.5 px-4 rounded-full transition-colors z-10 block select-none
                      ${isActive ? "text-primary font-black" : "text-navy hover:text-primary"}
                    `}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <m.span
                        layoutId="navActivePill"
                        className="absolute inset-0 bg-primary/10 rounded-full z-0"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </Link>
                </m.div>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3">
            {/* Search Widget */}
            <div className="relative" ref={searchRef}>
              <m.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-navy hover:text-primary hover:bg-cream-dark/50 rounded-full transition-colors cursor-pointer"
                whileTap={{ scale: 0.95 }}
                aria-label="Search site"
              >
                <Search className="w-5 h-5 md:w-6 md:h-6" />
              </m.button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <m.form
                    onSubmit={handleSearchSubmit}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 20 }}
                    className="absolute right-0 top-12 bg-white p-3 rounded-2xl border-2 border-primary/20 shadow-lg flex gap-2 w-72"
                  >
                    <input
                      type="text"
                      placeholder="Search website..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-1.5 border border-cream-dark rounded-xl text-sm text-navy outline-none focus:border-primary"
                      autoFocus
                    />
                    <Button type="submit" variant="primary" size="sm">Go</Button>
                  </m.form>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button (Desktop only) */}
            <Button
              variant="secondary"
              size="sm"
              onClick={openEnquiry}
              className="hidden md:inline-flex"
            >
              Enquire Now
            </Button>

            {/* Hamburger Button */}
            <m.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:p-2 p-1.5 text-navy hover:text-primary hover:bg-cream-dark/50 rounded-full transition-colors cursor-pointer"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <m.path
                  d="M4 6h16"
                  variants={topBarVariants}
                  animate={isMobileMenuOpen ? "opened" : "closed"}
                  transition={{ duration: 0.2 }}
                />
                <m.path
                  d="M4 12h16"
                  variants={middleBarVariants}
                  animate={isMobileMenuOpen ? "opened" : "closed"}
                  transition={{ duration: 0.2 }}
                />
                <m.path
                  d="M4 18h16"
                  variants={bottomBarVariants}
                  animate={isMobileMenuOpen ? "opened" : "closed"}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </m.button>
          </div>
        </div>
      </header>

      {/* Full screen slide-in menu drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/15 backdrop-blur-[2px] z-45"
            />
            {/* Drawer */}
            <m.div
              initial={{ x: "110%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "110%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
              className="fixed top-4 right-4 bottom-4 w-full max-w-[340px] bg-white/30 backdrop-blur-3xl rounded-[32px] border border-white/45 z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl text-navy scrollbar-none"
            >
              <div className="flex flex-col flex-grow">
                {/* Header with logo & close */}
                <div className="flex items-center justify-between mb-6 select-none">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-fredoka font-black text-white text-sm shadow-sm shadow-primary/20">
                      LS
                    </div>
                    <span className="font-fredoka font-black text-base text-navy tracking-wide">
                      Little Sprouts
                    </span>
                  </div>
                  <m.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 text-navy/40 hover:text-navy hover:bg-white/40 rounded-full cursor-pointer transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </m.button>
                </div>

                {/* Drawer Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/40" />
                  <input
                    type="text"
                    placeholder="Search curriculum, events..."
                    className="w-full bg-white border border-white/20 shadow-sm rounded-xl py-2.5 pl-10 pr-4 text-xs font-nunito font-semibold text-navy placeholder-navy/40 focus:outline-none focus:border-primary/45 transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Section Menu Header */}
                <div className="text-[10px] font-fredoka font-black text-navy/40 tracking-widest uppercase mb-4 text-left select-none">
                  Menu
                </div>

                {/* Menu items */}
                <div className="flex flex-col gap-1 text-left">
                  {NAV_LINKS.slice(0, 7).map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <m.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="relative"
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`relative flex items-center gap-3.5 py-2.5 px-3.5 font-fredoka font-bold text-sm rounded-xl transition-all select-none w-full
                            ${isActive ? "text-primary bg-white/55 border border-white/35 shadow-sm" : "text-navy/60 hover:text-navy hover:bg-white/25"}
                          `}
                        >
                          {getLinkIcon(link.path)}
                          <span>{link.label}</span>
                        </Link>
                      </m.div>
                    );
                  })}

                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
