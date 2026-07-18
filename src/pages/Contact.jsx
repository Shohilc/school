import React from "react";
import { MapPin, Phone, Mail, Clock, HelpCircle } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import ContactForm from "../components/forms/ContactForm";

const OFFICE_HOURS = [
  { days: "Monday - Friday", hours: "08:00 AM - 04:30 PM" },
  { days: "Saturday", hours: "09:00 AM - 01:00 PM (PTM / Admissions)" },
  { days: "Sunday", hours: "Closed" }
];

export default function Contact() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Contact Us
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Have questions about fees, curriculums, or safety? Reach out to our administration office directly.
          </p>
        </div>

        {/* Layout: Form Left, Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <div className="text-left mb-6 pl-2">
              <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-navy mb-2">
                Send a Message
              </h2>
              <p className="text-sm text-navy-muted font-nunito">
                Fill out the form below. A member of our admissions or admin team will respond via email within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Right: Info & Details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Contact details list */}
            <div className="bg-white border-2 border-cream-dark p-6 md:p-8 rounded-3xl">
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy mb-6">
                Administrative Desk
              </h3>
              
              <ul className="space-y-5 text-sm md:text-base text-navy-muted font-nunito">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5.5 h-5.5 text-accent-pink shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy font-fredoka">School Location:</strong>
                    <span>123 Seedling Way, Greenwood City, GC 50012</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <Phone className="w-5.5 h-5.5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy font-fredoka">Call Us:</strong>
                    <a href="tel:+15550199" className="text-secondary hover:underline font-bold font-mono">+1 (555) 0199</a>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <Mail className="w-5.5 h-5.5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-navy font-fredoka">Email Us:</strong>
                    <a href="mailto:info@littlesprouts.edu" className="text-primary hover:underline font-bold">info@littlesprouts.edu</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Office Hours table */}
            <div className="bg-white border-2 border-cream-dark p-6 md:p-8 rounded-3xl">
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy mb-4 flex items-center gap-2">
                <Clock className="w-5.5 h-5.5 text-emerald-500" />
                <span>Office Hours</span>
              </h3>
              
              <div className="divide-y divide-cream-dark/60 font-nunito text-sm text-navy-muted">
                {OFFICE_HOURS.map((row) => (
                  <div key={row.days} className="py-3 flex justify-between gap-4 items-center">
                    <span className="font-fredoka font-bold text-navy">{row.days}</span>
                    <span className="text-right text-xs md:text-sm font-mono">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maps Frame Mock */}
            <div className="w-full h-48 rounded-3xl overflow-hidden border-2 border-cream-dark bg-slate-900 flex items-center justify-center relative group">
              <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="relative z-10 text-center p-3 bg-navy/90 backdrop-blur-sm rounded-2xl m-3 border border-slate-700 max-w-xs">
                <span className="block text-xs font-bold text-secondary uppercase tracking-wider">Main Campus Map</span>
                <span className="block text-[11px] text-slate-300 mt-1">Visit us to inspect rooms & check learning boxes.</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-full text-[10px] font-fredoka font-bold transition-colors cursor-pointer"
                >
                  Get Driving Directions
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
