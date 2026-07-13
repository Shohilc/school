import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";

export default function CTABanner() {
  const { openEnquiry } = useModal();

  return (
    <section className="py-20 relative bg-primary overflow-hidden">
      {/* Animated blob shapes */}
      <motion.div
        className="absolute top-[-30%] left-[-10%] w-[350px] h-[350px] bg-white/10 rounded-full blur-2xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-[-30%] right-[-10%] w-[350px] h-[350px] bg-secondary/20 rounded-full blur-2xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-fredoka font-black mb-6 leading-tight">
          Nurture Your Child's Unique Talents Today
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-100 font-nunito max-w-2xl mx-auto mb-10 leading-relaxed">
          Enrolment for the 2026-27 academic term is active. Schedule a tour, discuss curriculum milestones, and secure your slot today!
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button
            variant="navy"
            size="lg"
            onClick={openEnquiry}
            className="shadow-lg shadow-navy/30"
          >
            Start Admission Process
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href="/visit"}
            className="border-white text-white hover:bg-white/10 hover:border-white"
          >
            Schedule a Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
