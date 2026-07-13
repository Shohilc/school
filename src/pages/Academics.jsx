import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, Award, Music, Shield, Palette, Zap } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Accordion from "../components/ui/Accordion";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { fadeInUp, staggerContainer } from "../animations/variants";

const CURRICULUM_DATA = [
  {
    title: "Playgroup Curriculum (Age: 1.5 - 2.5 Years)",
    focus: "Sensory & Physical Coordination",
    points: [
      "Gross Motor Skills: Stacking blocks, basic balance beams, sensory crawl runs.",
      "Sensory Exploration: Soft clay, sandboxes, and colored water tables.",
      "Social Development: Naming basic items, sharing sharing toys, sitting in circles.",
      "Music & Speech: Simple sing-alongs, basic sound imitation, listening to short stories."
    ]
  },
  {
    title: "Nursery Curriculum (Age: 2.5 - 3.5 Years)",
    focus: "Social & Vocabulary Foundations",
    points: [
      "Language & Literacy: Letter sound associations, tracing letters in sand, basic speech scripts.",
      "Cognitive Math: Counting items 1 to 10, distinguishing primary shapes and colors.",
      "Creative Expression: Finger painting, collage pasting, vegetable stamp arts.",
      "Personal Care: Hand washing discipline, organizing school bags, basic table manners."
    ]
  },
  {
    title: "Lower Kindergarten (LKG) (Age: 3.5 - 4.5 Years)",
    focus: "Phonics & Numeracy Beginnings",
    points: [
      "Phonics Reading: Combining letters to sound simple CVC words (cat, pin, log).",
      "Numeracy: Counting 1 to 50, identifying basic larger/smaller items, number writing.",
      "Discovery Science: Planting seeds, exploring floating/sinking items, mixing colors.",
      "Creative Play: Puppet dramatization, basic puzzle completion, paper folding (origami)."
    ]
  },
  {
    title: "Upper Kindergarten (UKG) (Age: 4.5 - 5.5 Years)",
    focus: "Elementary Grade Preparation",
    points: [
      "Language Development: Reading short storybooks, spelling 3-letter words, writing sentences.",
      "Numeracy Math: Double digit counting 1 to 100, basic single-digit additions & subtractions.",
      "EVS & Nature: Learning about animals, seasons, family roles, and simple recycling rules.",
      "School Transition: Focus drills, sitting stability, team projects, and leadership play roles."
    ]
  }
];

const SCHEDULE_HOURS = [
  { time: "08:30 AM - 09:00 AM", activity: "Arrival & Free Play", desc: "Settle in, select favorite blocks, interact with peers." },
  { time: "09:00 AM - 09:30 AM", activity: "Circle Story Session", desc: "Morning prayer, rhymes singing, storytelling with puppets." },
  { time: "09:30 AM - 10:30 AM", activity: "Core Learning block", desc: "Classroom activities: Phonics tracing, block math, science lab trial." },
  { time: "10:30 AM - 11:00 AM", activity: "Hygienic Snack Break", desc: "Healthy warm meals served in our kitchen. Learn table cleanup." },
  { time: "11:00 AM - 12:00 PM", activity: "Outdoor / Play rec", desc: "Sensory sandbox, garden walks, junior hurdles racing." },
  { time: "12:00 PM - 12:30 PM", activity: "Rhythm & Wrap-up", desc: "Clean up workspaces, sing exit songs, coordinate bus pick-ups." }
];

const EXTRA_ACTIVITIES = [
  { id: 1, title: "Music & Rhythm", desc: "Vocal sing-alongs, hand bells playing, acoustic rhythm matching.", icon: Music, color: "text-primary bg-primary-light" },
  { id: 2, title: "Kids Yoga & Stretch", desc: "Soft postures, animal shape stretches, breathing exercises for focus.", icon: Shield, color: "text-secondary bg-secondary-light" },
  { id: 3, title: "Visual Arts & Clay", desc: "Tactile clay modeling, safe non-toxic finger painting, paper folding.", icon: Palette, color: "text-accent-pink bg-accent-pink-light" },
  { id: 4, title: "Gymnastics & Athletics", desc: "Balance beams, low hurdles track, potato relays building agility.", icon: Zap, color: "text-emerald-500 bg-emerald-100" }
];

export default function Academics() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-fredoka font-bold text-secondary uppercase tracking-wider">
            Curriculum Philosophy
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Academics
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            We integrate child-led play frameworks with structured Montessori methodologies to foster cognitive, physical, and emotional milestones.
          </p>
        </div>

        {/* Philosophy Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          <div className="text-left space-y-6">
            <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-navy flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-secondary" />
              <span>Nurturing Lifelong Learners</span>
            </h2>
            <p className="text-navy-muted font-nunito leading-relaxed">
              Our academic model is built around the <strong>Whole Child Approach</strong>. We believe early childhood education should not prioritize rote learning. Instead, children discover literacy, mathematics, and science principles by interacting with physical objects, playing in groups, and exploring the outdoors.
            </p>
            <p className="text-navy-muted font-nunito leading-relaxed">
              Our classrooms feature customized, tactile learning toolkits. We monitor and chart developmental milestone portfolios (social-emotional, motor coordinates, linguistic, numeracy) rather than holding competitive tests.
            </p>
            <div className="flex gap-4">
              <Badge variant="primary">Montessori Inspired</Badge>
              <Badge variant="secondary">Play-Based Framework</Badge>
              <Badge variant="pink">Individual Portfolios</Badge>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border-4 border-dashed border-secondary/35 p-2 bg-white shadow-md">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
              alt="Children playing"
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Age wise accordions */}
        <div className="mb-20 text-left max-w-4xl mx-auto">
          <h2 className="text-3xl font-fredoka font-black text-navy text-center mb-10">
            Age-Wise Learning Pathways
          </h2>
          
          <div className="space-y-4">
            {CURRICULUM_DATA.map((item, idx) => (
              <Accordion key={idx} title={item.title} titleClassName="text-primary-dark">
                <div className="space-y-3">
                  <p className="font-fredoka font-bold text-navy text-sm md:text-base mb-2">
                    🎯 Core Focus: <span className="text-primary">{item.focus}</span>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-navy-muted font-nunito">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </Accordion>
            ))}
          </div>
        </div>

        {/* Sample Timetable */}
        <div className="mb-20 max-w-4xl mx-auto bg-white border-2 border-cream-dark p-6 md:p-8 rounded-3xl text-left">
          <h2 className="text-3xl font-fredoka font-black text-navy text-center mb-4">
            Sample Daily Timetable
          </h2>
          <p className="text-center font-nunito text-navy-muted mb-10 max-w-lg mx-auto text-sm md:text-base">
            Our daily schedule balances learning sessions, physical recess, social interaction, and snack breaks.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-nunito text-xs md:text-sm">
              <thead>
                <tr className="border-b border-cream-dark pb-4 font-fredoka font-bold text-navy uppercase text-[10px] tracking-wider">
                  <th className="py-3 pl-2">Time Slot</th>
                  <th className="py-3">Activity</th>
                  <th className="py-3">Details & Objectives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-dark/55 text-navy-muted">
                {SCHEDULE_HOURS.map((row) => (
                  <tr key={row.time} className="hover:bg-cream/40 transition-colors">
                    <td className="py-4 pl-2 font-mono font-bold text-secondary text-xs sm:text-sm shrink-0 whitespace-nowrap">
                      {row.time}
                    </td>
                    <td className="py-4 font-fredoka font-bold text-navy text-sm sm:text-base">
                      {row.activity}
                    </td>
                    <td className="py-4 text-xs sm:text-sm text-navy-muted">
                      {row.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Extra curricular Grid */}
        <div className="mb-10">
          <h2 className="text-3xl font-fredoka font-black text-navy text-center mb-4">
            Beyond the Classroom
          </h2>
          <p className="text-navy-muted font-nunito text-center max-w-lg mx-auto mb-16 text-sm md:text-base">
            We provide a spectrum of enrichment programs to build confidence, coordination, and creative expressions.
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {EXTRA_ACTIVITIES.map((act) => {
              const Icon = act.icon;
              return (
                <motion.div key={act.id} variants={fadeInUp}>
                  <Card
                    variant="white"
                    hoverEffect
                    blobShape
                    className="h-full flex flex-col items-center text-center p-8 border-2 border-cream-dark/60 rounded-3xl"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 shadow-sm ${act.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-fredoka font-bold text-navy mb-3">
                      {act.title}
                    </h3>
                    <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                      {act.desc}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </PageTransition>
  );
}
