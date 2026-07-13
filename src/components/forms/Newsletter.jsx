import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("Email is required");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Invalid email address");
      return;
    }

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  const handleFocus = () => {
    if (status === "error" || status === "success") {
      setStatus("idle");
    }
  };

  return (
    <div className="w-full">
      <h4 className="font-fredoka font-bold text-lg text-white mb-3">
        Join Our Newsletter
      </h4>
      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
        Stay updated with parenting tips, upcoming school events, and academic calendars.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-emerald-400 font-fredoka font-bold text-sm bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800"
        >
          <div className="p-1 bg-emerald-500 rounded-full text-navy">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>Subscribed successfully!</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
              className={`w-full px-4 py-2.5 rounded-full text-navy bg-white outline-none border-2 transition-all text-sm
                ${status === "error" ? "border-accent-pink focus:ring-accent-pink/30" : "border-slate-700 focus:border-secondary focus:ring-2 focus:ring-secondary/20"}
              `}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 bg-secondary hover:bg-secondary-dark text-white rounded-full font-fredoka font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              {status === "loading" ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
          
          <AnimatePresence>
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-accent-pink text-xs font-fredoka font-bold mt-1.5 ml-2 absolute left-0"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
