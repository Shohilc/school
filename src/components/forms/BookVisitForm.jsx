import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "./FormField";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";

const AVAILABLE_SLOTS = [
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM"
];

const INITIAL_STATE = {
  parentName: "",
  phone: "",
  email: "",
  visitDate: "",
  visitTime: "", // Handled by visual slot picker
  purpose: "",
  notes: ""
};

export default function BookVisitForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHighFive, setIsHighFive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { triggerConfetti, triggerMascotReaction } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setFormData((prev) => ({ ...prev, visitTime: slot }));
    if (errors.visitTime) {
      setErrors((prev) => ({ ...prev, visitTime: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.parentName.trim()) newErrors.parentName = "Your name is required";
    if (!formData.visitDate) newErrors.visitDate = "Please choose a date";
    if (!selectedSlot) newErrors.visitTime = "Please select a time slot";
    if (!formData.purpose) newErrors.purpose = "Please select purpose of visit";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API submit
      setTimeout(() => {
        setIsSubmitting(false);
        setIsHighFive(true);
        triggerConfetti(e.clientX, e.clientY);
        triggerMascotReaction("clap");
        
        setTimeout(() => {
          setIsHighFive(false);
          setIsSuccess(true);
        }, 1200);
      }, 1200);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setSelectedSlot("");
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto glass p-6 md:p-8 rounded-3xl border-2 border-white/35 shadow-xl">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8 flex flex-col items-center"
          >
            {/* Success checkmark */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
            </div>

            <h3 className="text-2xl md:text-3xl font-fredoka font-bold text-navy mb-2">
              Visit Booked Successfully!
            </h3>
            <p className="text-navy-muted mb-6 max-w-sm">
              We look forward to meeting you! Your personalized campus tour has been scheduled.
            </p>

            {/* Visit Details Box */}
            <div className="w-full bg-cream-dark/60 rounded-2xl p-5 mb-8 text-left border-2 border-cream-dark">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-fredoka text-navy-muted uppercase tracking-wider">Date</span>
                  <span className="font-fredoka font-bold text-navy text-sm md:text-base">{formData.visitDate}</span>
                </div>
                <div>
                  <span className="block text-xs font-fredoka text-navy-muted uppercase tracking-wider">Time Slot</span>
                  <span className="font-fredoka font-bold text-navy text-sm md:text-base">{formData.visitTime}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-xs font-fredoka text-navy-muted uppercase tracking-wider">Purpose</span>
                  <span className="font-fredoka font-bold text-navy text-sm md:text-base">{formData.purpose === "tour" ? "Campus Tour & Info" : formData.purpose === "discussion" ? "Admissions Discussion" : formData.purpose === "program" ? "Program Details Overview" : "General Visit"}</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" onClick={handleReset}>
              Book Another Visit
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Parent Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                error={errors.parentName}
                placeholder="e.g. David Chen"
                required
              />
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="e.g. +1 555-0199"
                required
              />
            </div>

            <FormField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="e.g. david@example.com"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Preferred Date"
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                error={errors.visitDate}
                required
              />
              <FormField
                label="Purpose of Visit"
                type="select"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                error={errors.purpose}
                placeholder="Select Purpose"
                options={[
                  { value: "tour", label: "Campus Tour" },
                  { value: "discussion", label: "Admission Discussion" },
                  { value: "program", label: "Program Details" },
                  { value: "other", label: "Other" }
                ]}
                required
              />
            </div>

            {/* Visual Available Slots Picker */}
            <div className="mb-6">
              <label className="block mb-2 font-fredoka font-bold text-navy text-sm md:text-base">
                Available Time Slots <span className="text-accent-pink">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {AVAILABLE_SLOTS.map((slot) => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <motion.button
                      key={slot}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`py-3 text-sm md:text-base font-fredoka font-bold rounded-2xl cursor-pointer border-2 transition-all text-center
                        ${isSelected ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/20" : "bg-white border-cream-dark text-navy hover:border-secondary/40"}
                      `}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {slot}
                    </motion.button>
                  );
                })}
              </div>
              {errors.visitTime && (
                <p className="text-accent-pink text-xs md:text-sm font-fredoka font-bold mt-2 ml-1">
                  {errors.visitTime}
                </p>
              )}
            </div>

            <FormField
              label="Additional Notes / Comments"
              type="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Let us know if you are bringing your child along or if you have specific physical accessibility requirements..."
            />

            <div className="mt-8 border-t border-cream-dark pt-6 text-right">
              <Button
                type="submit"
                variant="secondary"
                disabled={isSubmitting || isHighFive}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Processing Booking..." : isHighFive ? "✋ High Five!" : "Confirm Booking Visit"}
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
