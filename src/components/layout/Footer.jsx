import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Newsletter from "../forms/Newsletter";

// Inline brand icon SVGs to maintain reliability across dependency versions
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t-8 border-primary">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: School Intro */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-fredoka font-black text-lg">
                LS
              </div>
              <span className="font-fredoka font-black text-xl leading-none">
                Little Sprouts
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Nurturing curiosities, building character, and developing a lifelong love for learning through structured, joyful discovery.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer" aria-label="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-fredoka font-bold text-lg mb-4 text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Our Academy</Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-primary transition-colors">Our Curriculum</Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-primary transition-colors">Admissions Guidelines</Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-primary transition-colors">Academic Calendar</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors">School Gallery</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">Frequently Asked FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Map */}
          <div>
            <h4 className="font-fredoka font-bold text-lg mb-4 text-accent-pink">
              Contact Details
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-300 mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-accent-pink shrink-0 mt-0.5" />
                <span>123 Seedling Way, Greenwood City, GC 50012</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-pink shrink-0" />
                <a href="tel:+15550199" className="hover:text-accent-pink transition-colors">+1 (555) 0199</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-pink shrink-0" />
                <a href="mailto:info@littlesprouts.edu" className="hover:text-accent-pink transition-colors">info@littlesprouts.edu</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-accent-pink shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold">Office Hours:</span>
                  <span>Mon - Fri: 08:00 AM - 04:30 PM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Location map frame */}
          <div className="flex flex-col gap-6">
            <Newsletter />
            
            {/* Embedded maps placeholder */}
            <div className="w-full h-32 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center relative group">
              <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="relative z-10 text-center p-2 bg-navy/85 backdrop-blur-sm rounded-xl m-2 border border-slate-700">
                <span className="block text-[11px] font-bold text-secondary uppercase tracking-wider">Find Us On Maps</span>
                <span className="block text-[10px] text-slate-300">Little Sprouts Academy Campuses</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 text-[10px] font-fredoka font-bold text-primary hover:underline cursor-pointer"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center md:text-left">
            &copy; {currentYear} Little Sprouts Educational Academy. All rights reserved. Built with love for early education.
          </p>
          <div className="flex gap-6 text-xs text-slate-400">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Safety Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
