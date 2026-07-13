import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Award, Leaf, Palette, CalendarCheck, Building, Heart, Star, Compass } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import StatsCounter from "../components/home/StatsCounter";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { timelineAchievements, studentHighlights, pressMentions } from "../data/achievements";
import { fadeInUp, staggerContainer } from "../animations/variants";

// Map icon string names to Lucide icons
const ICON_MAP = {
  Award,
  Leaf,
  Palette,
  CalendarCheck,
  Building,
  Heart
};

// Student Flip Card Component
function StudentFlipCard({ student }) {
  return (
    <div
      className="w-full h-80 rounded-3xl relative cursor-pointer select-none group"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-full h-full rounded-3xl relative"
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-white border-2 border-cream-dark p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center">
            {/* Student Avatar */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-cream shadow-inner shrink-0">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="font-fredoka font-bold text-navy text-xl leading-none">
              {student.name}
            </h3>
            <span className="font-nunito text-xs text-navy-muted mt-1.5 font-bold">
              Grade: {student.grade}
            </span>
          </div>

          <div className="flex justify-center border-t border-cream-dark pt-4">
            <Badge variant="pink">{student.badge}</Badge>
          </div>
        </div>

        {/* Back Side (Rotated 180 degrees) */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-navy border-2 border-primary/20 p-6 flex flex-col justify-between text-white"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Star className="w-8 h-8 text-yellow-500 fill-current mb-3 animate-bounce" />
            <h4 className="font-fredoka font-bold text-lg text-primary mb-2">
              {student.achievement}
            </h4>
            <p className="font-nunito text-xs md:text-sm text-slate-300 leading-relaxed max-w-[200px]">
              {student.description}
            </p>
          </div>
          <div className="text-center font-fredoka font-bold text-[10px] uppercase tracking-wider text-slate-400">
            Hover to Flip back
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const containerRef = useRef(null);
  
  // Track scroll inside the timeline container to animate path drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PageTransition>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Page Title */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
              Pillars of Success
            </span>
            <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
              Achievements
            </h1>
            <p className="text-navy-muted font-nunito text-base md:text-lg">
              Explore the history of Little Sprouts Academy, celebrating certifications, awards, and our student winners.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <StatsCounter />

        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-20">
          
          {/* Timeline of Institute achievements */}
          <div ref={containerRef} className="relative max-w-3xl mx-auto mb-24">
            <h2 className="text-3xl font-fredoka font-black text-navy mb-16 text-center">
              Our Journey & Milestones
            </h2>

            {/* Scroll-drawn Central Timeline Line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1.5 bg-cream-dark -translate-x-1/2 rounded-full overflow-hidden">
              <motion.div
                className="w-full h-full bg-primary origin-top"
                style={{ scaleY }}
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-16"
            >
              {timelineAchievements.map((item, index) => {
                const IconComponent = ICON_MAP[item.icon] || Award;
                const isEven = index % 2 === 0;

                return (
                  <div key={item.year} className="relative flex flex-col md:flex-row items-start md:items-center">
                    {/* Circle Anchor */}
                    <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-white bg-secondary shadow-md -translate-x-1/2 z-20" />

                    {/* Left Column */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${isEven ? "" : "md:opacity-0 pointer-events-none md:order-last"}`}>
                      {isEven && (
                        <motion.div variants={fadeInUp}>
                          <Card variant="white" hoverEffect={false} className="border border-cream-dark">
                            <span className="inline-block px-3 py-1 font-fredoka font-black text-sm bg-primary text-white rounded-full mb-3 shadow-sm shadow-primary/20">
                              {item.year}
                            </span>
                            <div className="flex items-center gap-3 md:justify-end mb-3">
                              <h3 className="text-xl font-fredoka font-bold text-navy order-2 md:order-1">
                                {item.title}
                              </h3>
                              <div className="p-2 bg-primary-light text-primary-dark rounded-xl shrink-0 order-1 md:order-2">
                                <IconComponent className="w-5 h-5" />
                              </div>
                            </div>
                            <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                              {item.description}
                            </p>
                          </Card>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-12 md:text-left ${!isEven ? "" : "md:opacity-0 pointer-events-none"}`}>
                      {!isEven && (
                        <motion.div variants={fadeInUp}>
                          <Card variant="white" hoverEffect={false} className="border border-cream-dark">
                            <span className="inline-block px-3 py-1 font-fredoka font-black text-sm bg-secondary text-white rounded-full mb-3 shadow-sm shadow-secondary/20">
                              {item.year}
                            </span>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-secondary-light text-secondary-dark rounded-xl shrink-0">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <h3 className="text-xl font-fredoka font-bold text-navy">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                              {item.description}
                            </p>
                          </Card>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Student Achievements */}
          <div className="mb-24">
            <h2 className="text-3xl font-fredoka font-black text-navy mb-4 text-center">
              Student Hall of Fame
            </h2>
            <p className="text-navy-muted font-nunito text-center max-w-xl mx-auto mb-16 text-sm md:text-base">
              Celebrating our students who excelled in inter-school competitions, drawing displays, and spelling contests.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {studentHighlights.map((student) => (
                <StudentFlipCard key={student.id} student={student} />
              ))}
            </div>
          </div>

          {/* Media Mentions Auto-Marquee */}
          <div className="py-12 border-t-2 border-dashed border-cream-dark overflow-hidden relative">
            <h3 className="text-center font-fredoka font-bold text-navy-muted text-sm uppercase tracking-widest mb-10">
              Featured In Local Media & Press
            </h3>
            
            {/* Auto Scrolling Marquee Track */}
            <div className="relative w-full flex items-center">
              <motion.div
                className="flex gap-16 md:gap-24 shrink-0 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                {[...pressMentions, ...pressMentions].map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-center gap-2 font-fredoka font-black text-navy/40 text-lg md:text-2xl tracking-wide select-none"
                  >
                    <Compass className="w-5 h-5 text-primary/30" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
