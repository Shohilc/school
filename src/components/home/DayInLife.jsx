import React from "react";
import { motion } from "framer-motion";
import { Sun, Smile, BookOpen, Coffee, Moon, Home } from "lucide-react";
import Card from "../ui/Card";
import { staggerContainer, slideInLeft, slideInRight } from "../../animations/variants";

const TIMELINE_STEPS = [
  {
    id: 1,
    time: "08:30 AM",
    title: "Arrival & Greeting",
    desc: "Teachers welcome children with morning high-fives and bag checks. Kids register their attendance and settle in.",
    icon: Sun,
    color: "text-amber-500 bg-amber-50",
    side: "left"
  },
  {
    id: 2,
    time: "09:00 AM",
    title: "Circle Story Time",
    desc: "Rhymes singing, storytelling puppets, calendar discussion, and emotional share-circles build social confidence.",
    icon: Smile,
    color: "text-secondary bg-secondary-light",
    side: "right"
  },
  {
    id: 3,
    time: "09:45 AM",
    title: "Play-Based Discovery",
    desc: "Sowing seeds, sorting blocks, scientific sandbox experiments, and building clay sculptures.",
    icon: BookOpen,
    color: "text-primary bg-primary-light",
    side: "left"
  },
  {
    id: 4,
    time: "12:00 PM",
    title: "Nutritious Lunch",
    desc: "Fresh organic food served in our dining deck. Kids learn table hygiene, eating independence, and sharing.",
    icon: Coffee,
    color: "text-accent-pink bg-accent-pink-light",
    side: "right"
  },
  {
    id: 5,
    time: "01:00 PM",
    title: "Cozy Nap Time",
    desc: "Playgroup and nursery children enjoy quiet, dark nap pods while UKG kids engage in reading circles.",
    icon: Moon,
    color: "text-indigo-500 bg-indigo-50",
    side: "left"
  },
  {
    id: 6,
    time: "03:30 PM",
    title: "Pickup & Dismissal",
    desc: "Concluding rhymes, school bus boarding assisted by nannies, and direct handovers to parents.",
    icon: Home,
    color: "text-emerald-500 bg-emerald-50",
    side: "right"
  }
];

export default function DayInLife() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Daily Routine
          </span>
          <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
            A Day in the Life
          </h2>
          <p className="text-navy-muted font-nunito mt-4 text-base md:text-lg">
            Take a look at the structured, active, and balanced routine our little sprouts go through every day.
          </p>
        </div>

        {/* Timeline Zig-Zag Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Middle Dotted Line track */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 border-l-4 border-dashed border-cream-dark -translate-x-1/2 z-0" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {TIMELINE_STEPS.map((step) => {
              const Icon = step.icon;
              const isLeft = step.side === "left";
              
              return (
                <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Timeline circular timeline point */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-4 border-white bg-primary shadow-md -translate-x-1/2 z-20" />

                  {/* Left Side spacer/content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${isLeft ? "" : "md:opacity-0 pointer-events-none md:order-last"}`}>
                    {isLeft && (
                      <motion.div variants={slideInLeft}>
                        <Card variant="cream" hoverEffect={false} className="border border-cream-dark/50">
                          <span className="inline-block px-3 py-1 font-fredoka font-bold text-xs bg-white text-primary rounded-full mb-3 shadow-sm">
                            ⏰ {step.time}
                          </span>
                          <div className="flex items-center gap-3 md:justify-end mb-3">
                            <h3 className="text-xl font-fredoka font-bold text-navy order-2 md:order-1">
                              {step.title}
                            </h3>
                            <div className={`p-2 rounded-xl shrink-0 order-1 md:order-2 ${step.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                          </div>
                          <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                            {step.desc}
                          </p>
                        </Card>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side spacer/content */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 md:text-left ${!isLeft ? "" : "md:opacity-0 pointer-events-none"}`}>
                    {!isLeft && (
                      <motion.div variants={slideInRight}>
                        <Card variant="cream" hoverEffect={false} className="border border-cream-dark/50">
                          <span className="inline-block px-3 py-1 font-fredoka font-bold text-xs bg-white text-secondary rounded-full mb-3 shadow-sm">
                            ⏰ {step.time}
                          </span>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-xl shrink-0 ${step.color}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-fredoka font-bold text-navy">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                            {step.desc}
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

      </div>
    </section>
  );
}
