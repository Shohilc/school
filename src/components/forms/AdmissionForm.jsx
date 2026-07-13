import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "./FormField";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";

const INITIAL_STATE = {
  childName: "",
  dob: "",
  gender: "",
  parentName: "",
  phone: "",
  email: "",
  program: "",
  batch: "",
  notes: ""
};

export default function AdmissionForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
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

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.childName.trim()) newErrors.childName = "Child's name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.program) newErrors.program = "Please select a program";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.parentName.trim()) newErrors.parentName = "Your name is required";
    if (!formData.batch) newErrors.batch = "Please select a batch";
    
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

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
      return;
    }

    if (validateStep2()) {
      setIsSubmitting(true);
      // Simulate API Call submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsHighFive(true);
        triggerConfetti(e.clientX, e.clientY);
        triggerMascotReaction("cheer");
        
        setTimeout(() => {
          setIsHighFive(false);
          setIsSuccess(true);
          // Reset form
          setFormData(INITIAL_STATE);
          setStep(1);
        }, 1200);
      }, 1200);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto glass p-6 md:p-8 rounded-3xl border-2 border-white/35 shadow-xl">
      {/* Progress Bar */}
      {!isSuccess && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-fredoka font-bold text-primary">
              Step {step} of 2
            </span>
            <span className="text-xs md:text-sm font-fredoka font-bold text-navy-muted">
              {step === 1 ? "Basic Information" : "Program Preferences"}
            </span>
          </div>
          <div className="w-full bg-cream-dark h-3.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: "50%" }}
              animate={{ width: step === 1 ? "50%" : "100%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center py-10 flex flex-col items-center justify-center"
          >
            {/* SVG Checkmark Draw Animation */}
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-md shadow-emerald-100">
              <svg
                className="w-12 h-12 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </svg>
            </div>
            
            <h3 className="text-3xl font-fredoka font-bold text-navy mb-3">
              Enquiry Submitted!
            </h3>
            <p className="text-navy-muted mb-8 max-w-sm mx-auto">
              Thank you for choosing Little Sprouts Academy. Our admissions officer will contact you within the next 24-48 hours to schedule your campus visit.
            </p>
            <Button variant="primary" onClick={() => setIsSuccess(false)}>
              Submit Another Enquiry
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-fredoka font-bold text-navy border-b border-cream-dark pb-2 mb-4">
                    Child's Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Child's Full Name"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      error={errors.childName}
                      placeholder="e.g. Leo Jenkins"
                      required
                    />
                    <FormField
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      error={errors.dob}
                      required
                    />
                  </div>
                  
                  <FormField
                    label="Gender"
                    type="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    error={errors.gender}
                    placeholder="Select Gender"
                    options={[
                      { value: "boy", label: "Boy" },
                      { value: "girl", label: "Girl" },
                      { value: "other", label: "Other" }
                    ]}
                    required
                  />

                  <h4 className="text-lg font-fredoka font-bold text-navy border-b border-cream-dark pb-2 mb-4 mt-6">
                    Parent/Guardian Details
                  </h4>
                  <FormField
                    label="Parent/Guardian Full Name"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    error={errors.parentName}
                    placeholder="e.g. Sarah Jenkins"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <FormField
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="e.g. sarah@example.com"
                      required
                    />
                  </div>

                  <div className="flex justify-end mt-8 border-t border-cream-dark pt-6">
                    <Button variant="secondary" onClick={handleNext}>
                      Next Step
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg font-fredoka font-bold text-navy border-b border-cream-dark pb-2 mb-4">
                    Program Preferences
                  </h4>
                  
                  <FormField
                    label="Preferred Program"
                    type="select"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    error={errors.program}
                    placeholder="Select Program"
                    options={[
                      { value: "playgroup", label: "Playgroup (1.5 - 2.5 Years)" },
                      { value: "nursery", label: "Nursery (2.5 - 3.5 Years)" },
                      { value: "lkg", label: "Lower Kindergarten (LKG) (3.5 - 4.5 Years)" },
                      { value: "ukg", label: "Upper Kindergarten (UKG) (4.5 - 5.5 Years)" }
                    ]}
                    required
                  />
                  
                  <FormField
                    label="Preferred Batch Timing"
                    type="select"
                    name="batch"
                    value={formData.batch}
                    onChange={handleChange}
                    error={errors.batch}
                    placeholder="Select Batch Timing"
                    options={[
                      { value: "morning", label: "Morning Session (08:30 AM - 12:30 PM)" },
                      { value: "afternoon", label: "Afternoon Session (01:00 PM - 05:00 PM)" }
                    ]}
                    required
                  />

                  <FormField
                    label="Additional Message / Special Notes"
                    type="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Mention any allergies, medical conditions, special care requirements, or specific queries..."
                  />

                  <div className="flex justify-between items-center mt-8 border-t border-cream-dark pt-6">
                    <Button variant="outlineSecondary" onClick={handlePrev}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting || isHighFive}
                    >
                      {isSubmitting ? "Submitting..." : isHighFive ? "✋ High Five!" : "Submit Enquiry"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
