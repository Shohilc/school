import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormField from "./FormField";
import Button from "../ui/Button";
import { useModal } from "../../context/ModalContext";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

export default function ContactForm() {
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone.trim() && !/^\+?[\d\s-]{10,15}$/.test(formData.phone)) {
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
        triggerMascotReaction("cheer");
        
        setTimeout(() => {
          setIsHighFive(false);
          setIsSuccess(true);
          setFormData(INITIAL_STATE);
        }, 1200);
      }, 1200);
    }
  };

  return (
    <div className="w-full glass p-6 md:p-8 rounded-3xl border-2 border-white/35 shadow-xl">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-10 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
            
            <h3 className="text-2xl font-fredoka font-bold text-navy mb-2">
              Message Sent!
            </h3>
            <p className="text-navy-muted mb-6">
              Thank you for reaching out. We will get back to you shortly.
            </p>
            <Button variant="pink" onClick={() => setIsSuccess(false)}>
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="e.g. John Doe"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="e.g. john@example.com"
                required
              />
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="e.g. +1 555-0199 (optional)"
              />
            </div>

            <FormField
              label="Message"
              type="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Type your question or feedback here..."
              required
            />

            <div className="mt-6 text-right">
              <Button
                type="submit"
                variant="pink"
                disabled={isSubmitting || isHighFive}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Sending..." : isHighFive ? "✋ High Five!" : "Send Message"}
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
