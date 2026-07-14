import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { fadeInUp } from "../../animations/variants";

const PROGRAMS = [
  {
    id: "pg",
    name: "Playgroup",
    age: "1.5 - 2.5 Years",
    time: "09:00 AM - 12:00 PM",
    desc: "Sensory integration, socialization, motor coordination games, and music exploration in safe play zones.",
    color: "primary",
    bgColor: "bg-primary-light/50",
    borderColor: "border-primary/20",
    badgeVariant: "primary",
    icons: ["🧸", "🎵", "🎨"],
    highlights: ["Sensory toys & games", "Sing-along music circles", "Soft clay play"]
  },
  {
    id: "ns",
    name: "Nursery",
    age: "2.5 - 3.5 Years",
    time: "08:30 AM - 12:30 PM",
    desc: "Interactive vocabulary building, basic storytelling circles, self-expression arts, and cooperative playtime.",
    color: "secondary",
    bgColor: "bg-secondary-light/50",
    borderColor: "border-secondary/20",
    badgeVariant: "secondary",
    icons: ["📚", "🧩", "✏️"],
    highlights: ["Picture storytelling", "Shape & logic puzzles", "Finger painting labs"]
  },
  {
    id: "lkg",
    name: "Lower KG",
    age: "3.5 - 4.5 Years",
    time: "08:30 AM - 12:30 PM",
    desc: "Sound letter phonics, block numeracy, writing foundations, plant gardening, and visual painting workshops.",
    color: "pink",
    bgColor: "bg-accent-pink-light/50",
    borderColor: "border-accent-pink/20",
    badgeVariant: "pink",
    icons: ["🌱", "🧱", "🅰️"],
    highlights: ["Nature & gardening", "Building blocks", "Sound letter phonics"]
  },
  {
    id: "ukg",
    name: "Upper KG",
    age: "4.5 - 5.5 Years",
    time: "08:30 AM - 12:30 PM",
    desc: "Reading books, elementary math concepts, basic science lab trials, and preparation for primary grade schools.",
    color: "gray",
    bgColor: "bg-cream-dark/50",
    borderColor: "border-navy/10",
    badgeVariant: "gray",
    icons: ["🔬", "🔢", "📖"],
    highlights: ["Mini science lab", "Number logic concepts", "Self reading books"]
  }
];

export default function ProgramsPreview() {
  const [flippedId, setFlippedId] = useState(null);

  const handleCardClick = (id) => {
    setFlippedId(flippedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-cream-dark/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left max-w-2xl">
            <span className="text-sm font-fredoka font-bold text-secondary uppercase tracking-wider">
              Educational Pathways
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
              Nurturing Programs by Age Groups
            </h2>
            <p className="text-navy-muted font-nunito mt-4 text-base">
              Explore customized programs tailored to your child's age. Click a card to reveal learning tools!
            </p>
          </div>
          <Link
            to="/academics"
            className="inline-flex items-center gap-2 font-fredoka font-bold text-secondary hover:text-secondary-dark transition-colors text-base cursor-pointer shrink-0"
          >
            <span>View Full Curriculum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROGRAMS.map((prog, idx) => {
            const isFlipped = flippedId === prog.id;
            return (
              <motion.div
                key={prog.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx * 0.1}
                className="perspective-1000 h-[360px] w-full"
              >
                <motion.div
                  className="w-full h-full relative"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  
                  {/* FRONT SIDE */}
                  <div
                    onClick={() => handleCardClick(prog.id)}
                    className={`absolute inset-0 backface-hidden glass border border-white/35 p-6 rounded-3xl flex flex-col justify-between cursor-pointer select-none ${prog.bgColor}`}
                  >
                    <div>
                      {/* Age Badge */}
                      <div className="flex justify-between items-start">
                        <Badge variant={prog.badgeVariant} className="mb-4">
                          {prog.age}
                        </Badge>
                        <RefreshCw className="w-4 h-4 text-navy-muted opacity-40 hover:opacity-100 transition-opacity" />
                      </div>
                      
                      <h3 className="text-2xl font-fredoka font-black text-navy mb-3">
                        {prog.name}
                      </h3>
                      
                      <span className="block text-xs font-bold text-navy-muted uppercase tracking-wider mb-4">
                        🕒 {prog.time}
                      </span>
                      
                      <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                        {prog.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-sm font-fredoka font-bold text-navy hover:text-primary transition-colors cursor-pointer text-left self-start"
                    >
                      <span>Show Tools</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    className={`absolute inset-0 backface-hidden glass border-2 border-primary/30 p-6 rounded-3xl flex flex-col justify-between select-none ${prog.bgColor}`}
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div>
                      <div className="flex justify-between items-center border-b border-white/30 pb-3 mb-4">
                        <span className="text-xs font-fredoka font-black text-primary uppercase tracking-widest">
                          Learning Tools
                        </span>
                        <button
                          onClick={() => handleCardClick(prog.id)}
                          className="text-[10px] font-fredoka font-bold text-navy-muted bg-white/50 px-2 py-0.5 rounded-full hover:bg-white transition-colors cursor-pointer"
                        >
                          Back ↩
                        </button>
                      </div>

                      {/* Tool Icons Burst */}
                      <div className="flex gap-4 justify-center my-4">
                        {prog.icons.map((ico, i) => (
                          <motion.span
                            key={i}
                            className="text-4xl filter drop-shadow-sm select-none"
                            animate={{ scale: isFlipped ? [0.6, 1.2, 1] : 0.6 }}
                            transition={{ delay: 0.15 + i * 0.1, type: "spring" }}
                          >
                            {ico}
                          </motion.span>
                        ))}
                      </div>

                      <ul className="space-y-2 mt-4 text-left font-nunito text-sm text-navy font-semibold">
                        {prog.highlights.map((high, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            <span>{high}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/academics"
                      className="inline-flex items-center gap-1.5 text-sm font-fredoka font-bold text-white bg-primary px-4 py-2 rounded-full shadow-md shadow-primary/20 hover:bg-primary-dark transition-colors self-start cursor-pointer pointer-events-auto"
                      onClick={(e) => e.stopPropagation()} // Stop flip click
                    >
                      <span>Full Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
