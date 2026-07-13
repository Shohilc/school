import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Info } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Tabs from "../components/ui/Tabs";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { upcomingEvents, pastEvents } from "../data/events";
import { fadeInUp, scaleUp } from "../animations/variants";

// Countdown Ticker Component
function CountdownBadge({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="glass-dark text-white p-6 rounded-3xl inline-flex flex-col items-center gap-3 w-full shadow-lg border border-white/10">
      <span className="font-fredoka font-bold text-xs uppercase tracking-wider text-primary-light">
        Nearest Event Countdown
      </span>
      <div className="flex gap-4">
        {Object.entries(timeLeft).map(([unit, val]) => (
          <div key={unit} className="flex flex-col items-center">
            <span className="font-fredoka font-black text-2xl md:text-3xl bg-white/10 px-3.5 py-1.5 rounded-2xl w-14 sm:w-16">
              {String(val).padStart(2, "0")}
            </span>
            <span className="font-fredoka font-bold text-[9px] uppercase tracking-widest text-slate-200 mt-1">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const TABS = [
    { id: "upcoming", label: "Upcoming Events" },
    { id: "past", label: "Past Memories" }
  ];

  const eventsList = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-secondary uppercase tracking-wider">
            Institute Activities
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            School Events
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Stay updated with discovery fairs, storytelling walks, and musical showcases happening on campus.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <Tabs
            tabs={TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Countdown Ticker for Nearest Upcoming Event */}
        {activeTab === "upcoming" && upcomingEvents.length > 0 && (
          <div className="max-w-md mx-auto mb-12">
            <CountdownBadge targetDate={upcomingEvents[0].date} />
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {eventsList.map((evt, idx) => {
              const isPast = activeTab === "past";
              return (
                <motion.div
                  key={evt.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                >
                  <Card
                    variant="glass"
                    hoverEffect
                    className={`h-full flex flex-col justify-between border border-white/35 p-0 overflow-hidden cursor-pointer
                      ${isPast ? "group hover:grayscale-0 grayscale transition-all duration-300" : ""}
                    `}
                    onClick={() => setSelectedEvent(evt)}
                  >
                    <div>
                      {/* Image cover */}
                      <div className="h-52 w-full overflow-hidden relative">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant={isPast ? "gray" : "primary"}>
                            {evt.displayDate.split(",")[0]}
                          </Badge>
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 text-left">
                        <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy hover:text-primary transition-colors leading-tight mb-3">
                          {evt.title}
                        </h3>
                        <p className="text-sm text-navy-muted font-nunito line-clamp-3 leading-relaxed">
                          {evt.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-6 pt-0 text-left border-t border-white/20 mt-4 flex flex-col gap-2 font-fredoka text-xs font-bold text-navy-muted">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>{evt.time}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent-pink shrink-0" />
                        <span>{evt.location}</span>
                      </span>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detailed Event Modal */}
        <Modal
          isOpen={selectedEvent !== null}
          onClose={() => setSelectedEvent(null)}
          title="School Event Details"
        >
          {selectedEvent && (
            <div className="text-left space-y-6">
              {/* Event Image */}
              <div className="h-64 md:h-80 rounded-2xl overflow-hidden relative border border-cream-dark">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="primary">{selectedEvent.displayDate}</Badge>
                </div>
              </div>

              {/* Title & Metadata */}
              <div>
                <h3 className="text-2xl md:text-3xl font-fredoka font-black text-navy leading-tight mb-4">
                  {selectedEvent.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 p-4 glass border border-white/25 rounded-2xl text-xs md:text-sm font-fredoka font-bold text-navy-muted">
                  <span className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </span>
                  <span className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-accent-pink shrink-0" />
                    <span>{selectedEvent.location}</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h4 className="font-fredoka font-bold text-lg text-navy border-b border-cream-dark pb-2">
                  Event Description
                </h4>
                <p className="text-sm md:text-base text-navy-muted font-nunito leading-relaxed">
                  {selectedEvent.longDescription}
                </p>
              </div>

              {/* Action */}
              <div className="border-t border-cream-dark pt-5 flex justify-end">
                <Button variant="outlineSecondary" onClick={() => setSelectedEvent(null)}>
                  Close Details
                </Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </PageTransition>
  );
}
