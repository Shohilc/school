import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

export default function Testimonials() {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = Math.abs(page % testimonials.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleNext = () => paginate(1);
  const handlePrev = () => paginate(-1);

  // Swipe detection handler
  const handleDragEnd = (e, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-accent-pink uppercase tracking-wider">
            Parent Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
            What Parents Say
          </h2>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative min-h-[350px] sm:min-h-[300px] flex items-center justify-center">
          
          {/* Background Quote Mark */}
          <div className="absolute top-2 left-4 text-slate-100 -z-0">
            <Quote className="w-24 h-24 transform -rotate-12" />
          </div>

          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={handleDragEnd}
              className="w-full glass p-8 md:p-10 rounded-3xl shadow-lg border border-white/35 cursor-grab active:cursor-grabbing relative z-10 flex flex-col justify-between"
            >
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6 text-yellow-500">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Quote Content */}
                <p className="text-navy font-nunito text-base md:text-xl italic leading-relaxed mb-8">
                  "{activeTestimonial.content}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-4 border-t border-white/25 pt-6">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary/20 pointer-events-none"
                />
                <div className="text-left">
                  <span className="block font-fredoka font-bold text-navy text-sm md:text-base leading-none">
                    {activeTestimonial.name}
                  </span>
                  <span className="block font-nunito text-xs md:text-sm text-navy-muted mt-1">
                    {activeTestimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows (Desktop) */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] lg:left-[-70px] z-20 p-3 bg-white border border-cream-dark text-navy hover:text-primary rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-20px] lg:right-[-70px] z-20 p-3 bg-white border border-cream-dark text-navy hover:text-primary rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newDirection = idx > activeIndex ? 1 : -1;
                setPage([idx, newDirection]);
              }}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 cursor-pointer
                ${idx === activeIndex ? "bg-accent-pink w-7" : "bg-cream-dark hover:bg-accent-pink/40"}
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
