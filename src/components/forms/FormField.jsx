import React from "react";
import { motion } from "framer-motion";
import { shakeError } from "../../animations/variants";

export default function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  options = [],
  placeholder = "",
  required = false,
  className = "",
  rows = 4,
  ...props
}) {
  const isSelect = type === "select";
  const isTextarea = type === "textarea";

  const inputStyles = `w-full px-5 py-3 rounded-2xl border-2 transition-all outline-none text-navy bg-white
    ${error ? "border-accent-pink focus:border-accent-pink focus:ring-4 focus:ring-accent-pink/20" : "border-cream-dark focus:border-primary focus:ring-4 focus:ring-primary/20"}
  `;

  return (
    <motion.div
      className={`mb-4 ${className}`}
      animate={error ? "shake" : "default"}
      variants={shakeError}
    >
      {label && (
        <label className="block mb-2 font-fredoka font-bold text-navy text-sm md:text-base">
          {label} {required && <span className="text-accent-pink">*</span>}
        </label>
      )}

      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputStyles} cursor-pointer`}
          required={required}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={inputStyles}
          required={required}
          {...props}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={inputStyles}
          required={required}
          {...props}
        />
      )}

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-accent-pink text-xs md:text-sm font-fredoka font-bold mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
