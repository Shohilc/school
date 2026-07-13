import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Tabs from "../components/ui/Tabs";
import { galleryItems } from "../data/gallery";
import { fadeIn, scaleUp } from "../animations/variants";

const CATEGORIES = [
  { id: "All", label: "All Photos" },
  { id: "Classroom", label: "Classrooms" },
  { id: "Playground", label: "Playgrounds" },
  { id: "Events", label: "Events" },
  { id: "Arts & Crafts", label: "Arts & Crafts" },
  { id: "Sports Day", label: "Sports Day" },
  { id: "Annual Day", label: "Annual Day" }
];

const zoomSpin = {
  hidden: { opacity: 0, scale: 0.3, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 18
    }
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    rotate: 15,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const lightboxRef = useRef(null);

  // Filter gallery items
  const filteredItems = activeTab === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeTab);

  // Handle keyboard events in lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        navigateLightbox(1);
      } else if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    
    // Focus lock setup
    const focusable = lightboxRef.current?.querySelectorAll("button");
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (step) => {
    setSlideDirection(step);
    setLightboxIndex((prevIndex) => {
      const nextIndex = prevIndex + step;
      if (nextIndex >= filteredItems.length) return 0;
      if (nextIndex < 0) return filteredItems.length - 1;
      return nextIndex;
    });
  };

  const activeImage = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-accent-pink uppercase tracking-wider">
            Photo Archives
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Our Gallery
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            A window into the happy, creative, and active learning environment we foster daily.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex justify-center mb-10">
          <Tabs
            tabs={CATEGORIES}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="flex-wrap justify-center"
          />
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer border-2 border-cream-dark/60"
                onClick={() => openLightbox(idx)}
              >
                {/* Lazy loading image with fade-in on load */}
                <motion.img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Hover overlay mask */}
                <div className="absolute inset-0 bg-navy/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-left">
                  <div className="self-end p-2 bg-white/95 rounded-full text-primary shadow-md">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full font-fredoka font-bold text-[10px] uppercase tracking-wider bg-primary-light text-primary-dark mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-fredoka font-bold text-white text-lg leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && activeImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/95 backdrop-blur-sm">
              {/* Overlay Dismiss Click */}
              <div className="absolute inset-0" onClick={closeLightbox} />

              <motion.div
                ref={lightboxRef}
                variants={zoomSpin}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative max-w-5xl w-full flex flex-col items-center z-10"
              >
                {/* Top Control Bar */}
                <div className="w-full flex justify-between items-center text-white pb-3 mb-2 border-b border-white/10">
                  <span className="font-fredoka text-sm font-bold text-slate-400">
                    {lightboxIndex + 1} of {filteredItems.length} &middot; {activeImage.category}
                  </span>
                  
                  <button
                    onClick={closeLightbox}
                    className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Sliding Image Container */}
                <div className="relative w-full aspect-video md:max-h-[70vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center">
                  <AnimatePresence custom={slideDirection} mode="wait">
                    <motion.img
                      key={activeImage.id}
                      src={activeImage.image}
                      alt={activeImage.title}
                      custom={slideDirection}
                      variants={{
                        enter: (dir) => ({
                          x: dir > 0 ? 150 : -150,
                          opacity: 0
                        }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir) => ({
                          x: dir < 0 ? 150 : -150,
                          opacity: 0
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      className="max-w-full max-h-full object-contain pointer-events-none select-none"
                    />
                  </AnimatePresence>

                  {/* Previous Button */}
                  <button
                    onClick={() => navigateLightbox(-1)}
                    className="absolute left-4 p-3 glass-dark hover:bg-navy border border-white/15 text-white rounded-full shadow-md cursor-pointer transition-colors"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={() => navigateLightbox(1)}
                    className="absolute right-4 p-3 glass-dark hover:bg-navy border border-white/15 text-white rounded-full shadow-md cursor-pointer transition-colors"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Info Footer */}
                <div className="w-full text-left text-white mt-4 glass-dark p-4 rounded-2xl border border-white/15 shadow-xl">
                  <h4 className="font-fredoka font-bold text-lg text-primary">
                    {activeImage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-nunito mt-1 leading-relaxed">
                    {activeImage.description}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
