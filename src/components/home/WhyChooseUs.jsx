import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Palette, Users } from "lucide-react";
import Card from "../ui/Card";
import { staggerContainer, fadeInUp } from "../../animations/variants";

const FEATURES = [
  {
    id: 1,
    title: "Safe & Secure",
    description: "24/7 CCTV monitor, gated single entry point, pediatric first-aid certified care staff.",
    icon: ShieldCheck,
    color: "text-secondary bg-secondary-light"
  },
  {
    id: 2,
    title: "Expert Mentorship",
    description: "Montessori-trained teachers passionate about early development milestones.",
    icon: Heart,
    color: "text-accent-pink bg-accent-pink-light"
  },
  {
    id: 3,
    title: "Play-Based Focus",
    description: "Curriculum centered around tactile sensory boxes, clay art, and physical rhythm.",
    icon: Palette,
    color: "text-primary bg-primary-light"
  },
  {
    id: 4,
    title: "Small Class Sizes",
    description: "Low student-to-mentor ratios ensuring individualized care and feedback portfolios.",
    icon: Users,
    color: "text-navy-light bg-cream-dark"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Our Core Values
          </span>
          <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
            Why Parents Choose Little Sprouts
          </h2>
          <p className="text-navy-muted font-nunito mt-4 text-base md:text-lg">
            We provide a child-first ecosystem where learning is natural, safe, and joyful.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div key={feat.id} variants={fadeInUp}>
                <Card
                  variant="white"
                  hoverEffect
                  blobShape
                  className="h-full flex flex-col items-center text-center p-8 border-2 border-cream-dark/60 rounded-3xl"
                >
                  {/* Icon Wrapper */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm ${feat.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-fredoka font-bold text-navy mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                    {feat.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
