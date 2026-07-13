import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar as CalIcon, MapPin, ArrowRight, Clock } from "lucide-react";
import { upcomingEvents } from "../../data/events";
import { calendarEvents } from "../../data/calendar";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { fadeInUp } from "../../animations/variants";

export default function EventsPreview() {
  // Grab first 2 upcoming events
  const featuredEvents = upcomingEvents.slice(0, 2);

  // Grab first 3 calendar dates in July/August
  const featuredCalendar = calendarEvents.slice(0, 3);

  return (
    <section className="py-20 bg-cream-dark/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left max-w-2xl">
            <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
              Happening at School
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
              Upcoming Events & Dates
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 font-fredoka font-bold text-primary hover:text-primary-dark transition-colors text-base cursor-pointer shrink-0"
          >
            <span>See All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid: Events left, Calendar sidebar right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Events Grid (2 Cols on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {featuredEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={idx * 0.1}
              >
                <Card
                  variant="white"
                  hoverEffect
                  className="flex flex-col sm:flex-row gap-6 p-6 border-2 border-cream-dark rounded-3xl"
                  onClick={() => window.location.href=`/events`}
                >
                  {/* Event Thumbnail */}
                  <div className="w-full sm:w-48 h-36 rounded-2xl overflow-hidden shrink-0 relative">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="primary">{evt.displayDate.split(",")[0]}</Badge>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="text-left flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy hover:text-primary transition-colors mb-2">
                        {evt.title}
                      </h3>
                      <p className="text-sm text-navy-muted font-nunito line-clamp-2 leading-relaxed mb-4">
                        {evt.shortDescription}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-bold text-navy-muted font-fredoka border-t border-cream-dark/60 pt-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{evt.time}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-accent-pink" />
                        <span>{evt.location}</span>
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Calendar Dates Sidebar */}
          <div className="space-y-6">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white border-2 border-cream-dark p-6 rounded-3xl h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-fredoka font-bold text-navy border-b-2 border-cream-dark pb-4 mb-4 flex items-center gap-2">
                  <CalIcon className="w-5 h-5 text-secondary" />
                  <span>Calendar Quick-Look</span>
                </h3>
                
                <div className="space-y-4">
                  {featuredCalendar.map((item) => (
                    <div key={item.id} className="flex gap-4 items-start text-left border-b border-cream-dark pb-3 last:border-0 last:pb-0">
                      {/* Mini Date Block */}
                      <div className="w-12 py-2 bg-secondary-light rounded-xl flex flex-col items-center justify-center shrink-0 border border-secondary/10">
                        <span className="font-fredoka font-black text-secondary-dark text-base leading-none">
                          {item.date.split("-")[2]}
                        </span>
                        <span className="font-fredoka font-bold text-[9px] uppercase tracking-wider text-secondary mt-1">
                          {new Date(item.date).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      
                      {/* Details */}
                      <div>
                        <span className="font-fredoka font-bold text-sm text-navy block hover:text-secondary cursor-pointer" onClick={() => window.location.href="/calendar"}>
                          {item.title}
                        </span>
                        <span className="text-xs text-navy-muted font-nunito line-clamp-1 mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/calendar"
                className="inline-flex items-center justify-center gap-1.5 font-fredoka font-bold text-sm bg-cream-dark hover:bg-cream-dark/95 text-navy hover:text-primary transition-colors py-2.5 rounded-2xl w-full mt-6"
              >
                <span>View Full Year Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
