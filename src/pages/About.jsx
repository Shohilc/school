import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, ShieldCheck, Heart, Coffee, BookOpen, Compass, Bus, Award } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { teachers } from "../data/teachers";
import { fadeInUp, staggerContainer } from "../animations/variants";

const FACILITIES = [
  { id: 1, title: "Smart Classrooms", desc: "Interactive display modules, safe wooden toys, and sensory play spaces.", icon: BookOpen, color: "text-primary bg-primary-light" },
  { id: 2, title: "Indoor & Outdoor Play", desc: "Equipped with padded security mats, sand water pits, and climbing walls.", icon: Compass, color: "text-secondary bg-secondary-light" },
  { id: 3, title: "Storybook Library", desc: "A cozy reading corner stocked with 300+ children's books and phonics logs.", icon: Heart, color: "text-accent-pink bg-accent-pink-light" },
  { id: 4, title: "In-House Kitchen", desc: "Fresh organic food prepared under professional child dietitian guidelines.", icon: Coffee, color: "text-emerald-500 bg-emerald-100" },
  { id: 5, title: "CCTV safety Net", desc: "Campus borders tracked 24/7 with strict parent pickup gating keys.", icon: ShieldCheck, color: "text-indigo-500 bg-indigo-50" },
  { id: 6, title: "Safe GPS school Bus", desc: "Air-conditioned school buses with active GPS, governors, and female helpers.", icon: Bus, color: "text-amber-500 bg-amber-50" }
];

export default function About() {
  return (
    <PageTransition>
      <div className="w-full">
        
        {/* Intro Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
              Nurturing Seedlings Since 2008
            </span>
            <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
              About Our School
            </h1>
            <p className="text-navy-muted font-nunito text-base md:text-lg">
              Learn about our foundational principles, facilities, and the certified mentors shaping young minds.
            </p>
          </div>
        </div>

        {/* History / Mission / Vision Grid */}
        <section className="bg-cream-dark/20 py-16 mb-20 border-y border-cream-dark/40">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Box 1: History */}
              <Card variant="white" hoverEffect className="text-left p-8 border border-cream-dark rounded-3xl">
                <h3 className="font-fredoka font-bold text-2xl text-primary mb-3">Our History</h3>
                <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                  Founded in 2008 in a cozy green cottage with just 15 toddlers, Little Sprouts Academy grew from a passionate drive to build an alternative early learning school. Today we host over 500 scholars across two centers, staying true to our joyful learning core.
                </p>
              </Card>

              {/* Box 2: Mission */}
              <Card variant="white" hoverEffect className="text-left p-8 border border-cream-dark rounded-3xl">
                <h3 className="font-fredoka font-bold text-2xl text-secondary mb-3">Our Mission</h3>
                <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                  To provide a safe, sensory-rich environment where early child development is fostered naturally. We build speech literacy, physical coordination, and emotional stability through guided play, enabling seamless transitions to primary school.
                </p>
              </Card>

              {/* Box 3: Vision */}
              <Card variant="white" hoverEffect className="text-left p-8 border border-cream-dark rounded-3xl">
                <h3 className="font-fredoka font-bold text-2xl text-accent-pink mb-3">Our Vision</h3>
                <p className="text-sm text-navy-muted font-nunito leading-relaxed">
                  To shape a generation of creative, empathetic, and environmentally-aware young minds who approach problems with curiosity and construct long-lasting friendships with team spirit.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Facilities overview */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-fredoka font-black text-navy leading-tight">
              Our Safety & Infrastructure
            </h2>
            <p className="text-navy-muted font-nunito mt-4 text-sm md:text-base">
              Every room and play corridor is customized to safeguard children and spark spatial exploration.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {FACILITIES.map((fac) => {
              const Icon = fac.icon;
              return (
                <motion.div key={fac.id} variants={fadeInUp}>
                  <Card variant="white" hoverEffect={false} className="h-full flex gap-4 p-6 text-left border border-cream-dark/50">
                    <div className={`p-3 rounded-2xl shrink-0 h-12 w-12 flex items-center justify-center ${fac.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-fredoka font-bold text-lg text-navy mb-1.5">{fac.title}</h3>
                      <p className="text-xs sm:text-sm text-navy-muted font-nunito leading-relaxed">{fac.desc}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Meet the Teachers Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-fredoka font-black text-navy leading-tight">
              Meet Our Loving Educators
            </h2>
            <p className="text-navy-muted font-nunito mt-4 text-sm md:text-base">
              Certified child care specialists, Montessori counselors, and fitness coaches active on our campus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((tch) => (
              <motion.div
                key={tch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group w-full h-[400px] rounded-3xl overflow-hidden relative shadow-sm border-2 border-cream-dark/50"
              >
                {/* Teacher Photo */}
                <img
                  src={tch.image}
                  alt={tch.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Always-visible Name Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 text-left text-white z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <h3 className="font-fredoka font-bold text-xl leading-none">{tch.name}</h3>
                  <span className="text-xs text-primary font-bold mt-1.5 block">{tch.role}</span>
                </div>

                {/* Slide up details overlay on Hover */}
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 bg-navy/95 p-8 text-left flex flex-col justify-between z-20 text-white"
                >
                  <div>
                    <h3 className="font-fredoka font-bold text-2xl text-primary leading-none mb-1.5">{tch.name}</h3>
                    <span className="text-xs text-slate-300 font-bold block mb-4">{tch.role}</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-fredoka font-bold text-[10px] uppercase tracking-wider mb-4">
                      🎓 {tch.qualification}
                    </span>
                    <p className="text-xs md:text-sm text-slate-300 font-nunito leading-relaxed">
                      {tch.bio}
                    </p>
                  </div>
                  
                  <span className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest text-center mt-4">
                    Hover out to see photo
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Accreditations & safety */}
        <section className="bg-cream-dark/10 py-12 border-t border-dashed border-cream-dark/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h3 className="font-fredoka font-bold text-navy-muted text-xs uppercase tracking-widest text-center mb-6">
              Affiliations & Certifications
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
              <div className="flex items-center gap-2 font-fredoka font-black text-navy text-sm md:text-base">
                <Award className="w-5.5 h-5.5 text-primary" />
                <span>National Early Childhood Board</span>
              </div>
              <div className="flex items-center gap-2 font-fredoka font-black text-navy text-sm md:text-base">
                <ShieldCheck className="w-5.5 h-5.5 text-secondary" />
                <span>ISO 9001 Safety Certified</span>
              </div>
              <div className="flex items-center gap-2 font-fredoka font-black text-navy text-sm md:text-base">
                <Award className="w-5.5 h-5.5 text-accent-pink" />
                <span>Green Campus Charter</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
