import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCountUp } from "../../hooks/useCountUp";
import { stats } from "../../data/achievements";
import { staggerContainer, fadeInUp } from "../../animations/variants";

function StatItem({ value, suffix, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(value, 2000, isInView);

  const isComplete = count === value;

  return (
    <div ref={ref} className="text-center px-4 relative flex flex-col items-center">
      <motion.div
        className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-black text-white drop-shadow-sm select-none flex items-center justify-center gap-1"
        animate={isComplete ? { scale: [1, 1.2, 1], rotate: [0, -2, 2, 0] } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        <span>{count}</span>
        <span>{suffix}</span>

        {/* Small gold star pops in when the digit lands */}
        <AnimatePresence>
          {isComplete && (
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.1 }}
              className="inline-block text-xl sm:text-2xl text-yellow-400 select-none ml-1 pointer-events-none"
            >
              ★
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="text-xs sm:text-sm md:text-base font-fredoka font-bold text-slate-200 mt-2 tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative py-16 bg-navy overflow-hidden">
      {/* Decorative blobs inside background */}
      <div className="absolute top-[-50%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="glass-dark border border-white/10 p-8 md:p-12 rounded-3xl grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 items-center divide-y lg:divide-y-0 lg:divide-x divide-white/15 shadow-xl"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              variants={fadeInUp}
              className={`pt-8 lg:pt-0 ${idx === 0 || idx === 1 ? "border-t-0" : ""}`}
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
