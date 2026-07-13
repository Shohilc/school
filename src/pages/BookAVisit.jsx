import React from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import BookVisitForm from "../components/forms/BookVisitForm";
import Card from "../components/ui/Card";
import { staggerContainer, fadeInUp } from "../animations/variants";

const TOUR_HIGHLIGHTS = [
  {
    id: 1,
    title: "Guided Infrastructure Walk",
    desc: "Inspect our vibrant, child-safe classrooms, digital learning decks, and outdoor sandbox layouts.",
    icon: MapPin,
    color: "text-primary"
  },
  {
    id: 2,
    title: "Meet Classroom Educators",
    desc: "Speak directly with our Montessori-certified mentors and learn about student portfolio tracking.",
    icon: Sparkles,
    color: "text-secondary"
  },
  {
    id: 3,
    title: "Curriculum Q&A discussion",
    desc: "Sit down with our Principal to discuss fee timelines, batch hours, and developmental guidelines.",
    icon: CheckCircle2,
    color: "text-accent-pink"
  },
  {
    id: 4,
    title: "Safety Audits Review",
    desc: "Examine our emergency routes, first-aid logs, and clean in-house meal preparations.",
    icon: ShieldCheck,
    color: "text-emerald-500"
  }
];

export default function BookAVisit() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-fredoka font-bold text-secondary uppercase tracking-wider">
            Campus Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Schedule a Visit
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Experience our learning spaces firsthand. Book a personalized campus tour below.
          </p>
        </div>

        {/* Layout Grid: Form Left, Side Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="text-left mb-6 pl-2">
              <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-navy mb-2">
                Book Campus Visit
              </h2>
              <p className="text-sm text-navy-muted font-nunito">
                Select your preferred date and choose an available time slot. Guided tours take approximately 45 minutes.
              </p>
            </div>
            <BookVisitForm />
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Tour info panel */}
            <div className="bg-white border-2 border-cream-dark p-6 md:p-8 rounded-3xl text-left">
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy mb-6">
                What to Expect During Your Visit
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {TOUR_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="flex gap-4 items-start"
                    >
                      <div className={`p-2.5 bg-cream-dark/40 rounded-xl shrink-0 ${item.color}`}>
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h4 className="font-fredoka font-bold text-navy text-base">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-navy-muted font-nunito leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Quick Safety Note */}
            <Card variant="secondaryLight" hoverEffect={false} className="text-left p-6 border-2 border-secondary/15">
              <h4 className="font-fredoka font-bold text-navy text-base mb-2">
                🔒 Campus Visit Guidelines
              </h4>
              <p className="text-xs sm:text-sm text-navy-muted font-nunito leading-relaxed">
                For security reasons, campus tours are restricted to pre-scheduled bookings. Visitors are requested to carry a government-issued photo ID card. Please arrive 10 minutes prior to your selected slot time.
              </p>
            </Card>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
