import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalIcon, ChevronLeft, ChevronRight, AlertCircle, Info } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Modal from "../components/ui/Modal";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { calendarEvents, eventTypes } from "../data/calendar";

// Month metadata config for 2026 (Common year)
const MONTHS_2026 = [
  { value: 6, label: "July 2026", days: 31, startDay: 3 }, // Wed
  { value: 7, label: "August 2026", days: 31, startDay: 6 }, // Sat
  { value: 8, label: "September 2026", days: 30, startDay: 2 }, // Tue
  { value: 9, label: "October 2026", days: 31, startDay: 4 }, // Thu
  { value: 10, label: "November 2026", days: 30, startDay: 0 }, // Sun
  { value: 11, label: "December 2026", days: 31, startDay: 2 } // Tue
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AcademicCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0); // Starts at July 2026
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const activeMonth = MONTHS_2026[currentMonthIdx];

  const handlePrevMonth = () => {
    if (currentMonthIdx > 0) {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIdx < MONTHS_2026.length - 1) {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  };

  // Helper to format Date string
  const getDateString = (day) => {
    const monthNum = activeMonth.value + 1;
    const paddedMonth = String(monthNum).padStart(2, "0");
    const paddedDay = String(day).padStart(2, "0");
    return `2026-${paddedMonth}-${paddedDay}`;
  };

  // Find events on a specific day
  const getDayEvents = (day) => {
    const dateStr = getDateString(day);
    return calendarEvents.filter((evt) => {
      const matchDate = evt.date === dateStr;
      const matchFilter = selectedFilter === "all" || evt.type === selectedFilter;
      return matchDate && matchFilter;
    });
  };

  // Render month grid cells
  const renderCells = () => {
    const cells = [];
    
    // Add empty spacers for starting day alignment
    for (let i = 0; i < activeMonth.startDay; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[70px] sm:min-h-[90px] bg-cream-dark/10 border border-cream-dark/30 rounded-xl" />);
    }

    // Add days of the month
    for (let day = 1; day <= activeMonth.days; day++) {
      const dayEvents = getDayEvents(day);
      const dateStr = getDateString(day);
      const isToday = dateStr === "2026-07-13"; // Custom relative mock today's date

      cells.push(
        <motion.div
          key={`day-${day}`}
          onClick={() => {
            if (dayEvents.length > 0) {
              setSelectedEvent(dayEvents[0]); // Opens the modal for the event
            }
          }}
          whileHover={dayEvents.length > 0 ? { scale: 1.03, y: -2 } : {}}
          className={`min-h-[70px] sm:min-h-[90px] p-2 border border-cream-dark/50 rounded-xl flex flex-col justify-between text-left relative transition-colors
            ${dayEvents.length > 0 ? "bg-white hover:bg-cream hover:border-primary/30 cursor-pointer shadow-sm" : "bg-cream/40 text-navy/40"}
            ${isToday ? "border-2 border-secondary ring-2 ring-secondary/20 bg-secondary-light/30" : ""}
          `}
        >
          {/* Day Number */}
          <span className={`font-fredoka font-bold text-sm sm:text-base leading-none p-1 rounded-md
            ${isToday ? "bg-secondary text-white font-black" : "text-navy"}
          `}>
            {day}
          </span>

          {/* Dots Indicator */}
          {dayEvents.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {dayEvents.map((evt) => (
                <span
                  key={evt.id}
                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${eventTypes[evt.type]?.color}`}
                  title={`${eventTypes[evt.type]?.label}: ${evt.title}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      );
    }

    return cells;
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Academic Schedule
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            School Calendar
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            A comprehensive overview of upcoming term durations, public holidays, parent-teacher reviews, and celebrations.
          </p>
        </div>

        {/* Legend / Category Filter Dots */}
        <div className="bg-white border-2 border-cream-dark p-6 rounded-3xl mb-10 text-left">
          <h3 className="font-fredoka font-bold text-navy mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            <span>Filter Calendar Legend</span>
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 font-fredoka font-bold text-xs md:text-sm rounded-full border-2 transition-all cursor-pointer
                ${selectedFilter === "all" ? "bg-navy border-navy text-white" : "bg-white border-cream-dark text-navy hover:border-navy/20"}
              `}
            >
              All Dates
            </button>
            {Object.entries(eventTypes).map(([key, item]) => {
              const isActive = selectedFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedFilter(key)}
                  className={`px-4 py-2 font-fredoka font-bold text-xs md:text-sm rounded-full border-2 flex items-center gap-2 transition-all cursor-pointer
                    ${isActive ? "bg-navy border-navy text-white" : "bg-white border-cream-dark text-navy hover:border-navy/20"}
                  `}
                >
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calendar Grid Box */}
        <div className="bg-white border-2 border-cream-dark p-6 md:p-8 rounded-3xl shadow-sm mb-16">
          
          {/* Calendar Header / Month Toggle */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-cream-dark">
            <button
              onClick={handlePrevMonth}
              disabled={currentMonthIdx === 0}
              className="p-2.5 border border-cream-dark rounded-xl text-navy hover:text-primary hover:bg-cream-dark/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl sm:text-2xl font-fredoka font-black text-navy flex items-center gap-2">
              <CalIcon className="w-6 h-6 text-primary" />
              <span>{activeMonth.label}</span>
            </h2>
            
            <button
              onClick={handleNextMonth}
              disabled={currentMonthIdx === MONTHS_2026.length - 1}
              className="p-2.5 border border-cream-dark rounded-xl text-navy hover:text-primary hover:bg-cream-dark/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday Titles */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className={`font-fredoka font-bold text-xs sm:text-sm uppercase tracking-wider
                  ${day === "Sun" || day === "Sat" ? "text-accent-pink" : "text-navy-muted"}
                `}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Monthly grid cell blocks */}
          <div className="grid grid-cols-7 gap-2">
            {renderCells()}
          </div>
        </div>

        {/* Event Detail Popover Modal */}
        <Modal
          isOpen={selectedEvent !== null}
          onClose={() => setSelectedEvent(null)}
          title="Calendar Date Details"
        >
          {selectedEvent && (
            <div className="text-left space-y-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <Badge variant={selectedEvent.type === "holiday" ? "pink" : selectedEvent.type === "event" ? "secondary" : selectedEvent.type === "ptm" ? "primary" : "green"}>
                    {eventTypes[selectedEvent.type]?.label}
                  </Badge>
                  <h3 className="text-2xl font-fredoka font-black text-navy leading-tight mt-2.5">
                    {selectedEvent.title}
                  </h3>
                </div>
                <div className="text-right shrink-0">
                  <span className="block font-fredoka font-bold text-xs text-navy-muted">DATE</span>
                  <span className="font-mono text-sm font-bold text-primary-dark">{selectedEvent.date}</span>
                </div>
              </div>

              <div className="p-4 bg-cream-dark/40 border border-cream-dark rounded-2xl">
                <span className="block font-fredoka font-bold text-xs text-navy-muted uppercase mb-1">Details</span>
                <p className="text-sm md:text-base text-navy-muted font-nunito leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="border-t border-cream-dark pt-5 flex justify-end">
                <Button variant="outlineSecondary" onClick={() => setSelectedEvent(null)}>
                  Got It, Thanks
                </Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </PageTransition>
  );
}
