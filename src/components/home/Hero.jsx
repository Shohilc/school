import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, GraduationCap } from "lucide-react";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";
import { floatAnimation, fadeInUp, fadeInDown } from "../../animations/variants";
import SparkleTrail from "../ui/SparkleTrail";

export default function Hero() {
  const { openEnquiry } = useModal();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-cream-dark/30 pt-10 md:pt-16 pb-20 overflow-hidden">
      <SparkleTrail />
      {/* Sky Blue Gradient background on the right side */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-b lg:bg-gradient-to-l from-secondary-light/40 to-transparent pointer-events-none z-0" />

      {/* Bottom-left organic orange blob/wave shape bleeding off-screen */}
      <div className="absolute -bottom-16 -left-16 w-64 h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10 overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-cream fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.52,159.93,122.4,222.21,105.77C263.3,94.75,286.08,63,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-left"
          >
            {/* Circular badge */}
            <motion.div
              variants={fadeInDown}
              className="inline-flex items-center gap-2 bg-primary-light border-2 border-primary/20 px-4 py-1.5 rounded-full text-primary-dark font-fredoka font-bold text-xs md:text-sm mb-6"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Admissions Open for Year 2026-27</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-black text-navy leading-[1.1] mb-6"
            >
              Where Joy Meets <br />
              <span className="text-primary">Early Learning!</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-navy-muted text-base md:text-lg max-w-lg mb-8 leading-relaxed font-nunito"
            >
              Welcome to <strong className="text-navy">Little Sprouts Academy</strong>. We integrate child-led play frameworks, safety practices, and Montessori methodologies to spark curiosity in children aged 1.5 to 6.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-4 items-center"
            >
              <Button variant="primary" size="lg" onClick={openEnquiry}>
                Register Now
              </Button>
              <Button variant="outlineSecondary" size="lg" onClick={() => window.location.href="/visit"}>
                Book a Visit
              </Button>
            </motion.div>
          </motion.div>

          {/* Right SVG Illustration Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center items-center relative"
          >
            {/* Sky blue background shape */}
            <div className="absolute w-[80%] h-[80%] bg-secondary/15 rounded-full filter blur-xl -z-10 animate-pulse" />

            <svg viewBox="0 0 500 500" className="w-full max-w-[450px] drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
              {/* Outer circular background */}
              <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" className="text-secondary/10" strokeWidth="4" strokeDasharray="10 10" />

              {/* Character: Child Reading a Book */}
              <g id="child-character">
                {/* Child torso */}
                <path d="M210 380 C190 320, 310 320, 290 380 Z" fill="#F43F5E" />
                {/* Book pages */}
                <path d="M170 320 C220 300, 250 315, 250 340" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
                <path d="M330 320 C280 300, 250 315, 250 340" fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
                <path d="M170 320 C220 300, 250 315, 250 340" fill="none" stroke="#F1F5F9" strokeWidth="16" strokeLinecap="round" />
                <path d="M330 320 C280 300, 250 315, 250 340" fill="none" stroke="#F1F5F9" strokeWidth="16" strokeLinecap="round" />
                {/* Book cover back */}
                <path d="M165 325 L250 345 L335 325" fill="none" stroke="#F97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Child Head */}
                <circle cx="250" cy="230" r="45" fill="#FED7AA" />
                {/* Hair */}
                <path d="M205 230 C205 180, 295 180, 295 230 C290 200, 210 200, 205 230 Z" fill="#78350F" />
                {/* Eyes */}
                <circle cx="235" cy="230" r="4" fill="#0F172A" />
                <circle cx="265" cy="230" r="4" fill="#0F172A" />
                {/* Cheeks */}
                <circle cx="228" cy="238" r="5" fill="#FDA4AF" opacity="0.6" />
                <circle cx="272" cy="238" r="5" fill="#FDA4AF" opacity="0.6" />
                {/* Smile */}
                <path d="M244 242 Q250 248 256 242" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                {/* Hands holding the book */}
                <circle cx="185" cy="330" r="10" fill="#FED7AA" />
                <circle cx="315" cy="330" r="10" fill="#FED7AA" />
              </g>

              {/* Floating Educational Icons (animated with Framer Motion float animations) */}
              
              {/* Alphabet "A" */}
              <motion.g
                variants={floatAnimation(0.2)}
                animate="animate"
                whileTap={{ scale: 1.25, rotate: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="text-primary fill-current cursor-pointer select-none"
              >
                <circle cx="100" cy="140" r="28" fill="#FFedd5" />
                <text x="100" y="150" textAnchor="middle" fontStyle="bold" fontSize="26" fontFamily="Fredoka" fill="#ea580c">A</text>
              </motion.g>

              {/* Planet Saturn */}
              <motion.g
                variants={floatAnimation(1)}
                animate="animate"
                whileTap={{ scale: 1.25, rotate: 45 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="text-secondary fill-current cursor-pointer select-none"
              >
                <circle cx="380" cy="130" r="24" fill="#e0f2fe" />
                {/* Saturn Ring */}
                <ellipse cx="380" cy="130" rx="34" ry="8" fill="none" stroke="#0ea5e9" strokeWidth="4" transform="rotate(-15 380 130)" />
                <circle cx="380" cy="130" r="14" fill="#0ea5e9" />
              </motion.g>

              {/* Numbers "1 2 3" */}
              <motion.g
                variants={floatAnimation(0.5)}
                animate="animate"
                whileTap={{ scale: 1.25, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="cursor-pointer select-none"
              >
                <circle cx="90" cy="300" r="24" fill="#ffe4e6" />
                <text x="90" y="308" textAnchor="middle" fontWeight="bold" fontSize="20" fontFamily="Fredoka" fill="#F43F5E">123</text>
              </motion.g>

              {/* Paint Palette */}
              <motion.g
                variants={floatAnimation(1.4)}
                animate="animate"
                whileTap={{ scale: 1.2, rotate: -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="cursor-pointer select-none"
              >
                <circle cx="390" cy="280" r="28" fill="#F5EFEB" />
                {/* Paint blotches */}
                <path d="M375 275 A6 6 0 1 1 381 269 M395 265 A6 6 0 1 1 401 259 M400 285 A6 6 0 1 1 406 279" fill="none" stroke="#F43F5E" strokeWidth="4" />
                <circle cx="378" cy="275" r="3" fill="#38BDF8" />
                <circle cx="392" cy="272" r="3" fill="#F97316" />
                <circle cx="395" cy="288" r="3" fill="#22C55E" />
              </motion.g>

              {/* Pencil */}
              <motion.g
                variants={floatAnimation(0.8)}
                animate="animate"
                whileTap={{ scale: 1.25, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="cursor-pointer select-none"
                transform="rotate(45 250 80)"
              >
                <rect x="238" y="55" width="24" height="50" rx="4" fill="#EAB308" />
                <polygon points="238,55 250,35 262,55" fill="#FED7AA" />
                <polygon points="246,38 250,35 254,38" fill="#0F172A" />
                <rect x="238" y="95" width="24" height="10" fill="#FDA4AF" />
              </motion.g>

              {/* Book Icon */}
              <motion.g
                variants={floatAnimation(1.8)}
                animate="animate"
                whileTap={{ scale: 1.3, rotate: 360 }}
                transition={{ type: "spring", stiffness: 180, damping: 10 }}
                className="cursor-pointer select-none"
              >
                <circle cx="250" cy="430" r="22" fill="#E2E8F0" />
                <path d="M240 422 h20 v16 h-20 z" fill="#38BDF8" />
                <path d="M245 422 v16" fill="none" stroke="#fff" strokeWidth="2" />
              </motion.g>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
