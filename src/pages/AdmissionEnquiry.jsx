import React from "react";
import { motion } from "framer-motion";
import { FileText, ClipboardList, CheckSquare, HelpCircle } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import AdmissionForm from "../components/forms/AdmissionForm";
import Accordion from "../components/ui/Accordion";
import Badge from "../components/ui/Badge";
import { staggerContainer, fadeInUp } from "../animations/variants";

const PROCESS_STEPS = [
  {
    step: "Step 1",
    title: "Online Enquiry",
    desc: "Complete our quick multi-step enquiry form to state child details and program preference.",
    color: "bg-primary text-white"
  },
  {
    step: "Step 2",
    title: "Campus Visit & Discussion",
    desc: "Schedule a personalized visit to tour classrooms, play decks, and discuss developmental portfolios.",
    color: "bg-secondary text-white"
  },
  {
    step: "Step 3",
    title: "Child Assessment",
    desc: "A brief, stress-free interaction for teachers to check motor and language milestones.",
    color: "bg-accent-pink text-white"
  },
  {
    step: "Step 4",
    title: "Secure Enrollment",
    desc: "Submit mandatory documents, select batch times, pay term fees, and secure the nursery slot.",
    color: "bg-emerald-500 text-white"
  }
];

const FEE_STRUCTURE = [
  { program: "Playgroup", age: "1.5 - 2.5 Yrs", time: "09:00 AM - 12:00 PM", fee: "$750 / Term" },
  { program: "Nursery", age: "2.5 - 3.5 Yrs", time: "08:30 AM - 12:30 PM", fee: "$900 / Term" },
  { program: "Lower KG", age: "3.5 - 4.5 Yrs", time: "08:30 AM - 12:30 PM", fee: "$1,050 / Term" },
  { program: "Upper KG", age: "4.5 - 5.5 Yrs", time: "08:30 AM - 12:30 PM", fee: "$1,050 / Term" }
];

export default function AdmissionEnquiry() {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Admissions 2026-27
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            Enrollment Enquiry
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Nurture your child's primary steps. Follow our guide below to enquire and confirm registration.
          </p>
        </div>

        {/* Content Layout: Form Left, Process timeline + fees right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="text-left mb-6 pl-2">
              <h2 className="text-2xl md:text-3xl font-fredoka font-bold text-navy mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                <span>Admission Enquiry Form</span>
              </h2>
              <p className="text-sm text-navy-muted font-nunito">
                Please provide accurate contact and child info. We will schedule a physical visit based on details.
              </p>
            </div>
            <AdmissionForm />
          </div>

          {/* Right Column: Process & Fees */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Timeline: Steps to Join */}
            <div className="bg-white border-2 border-cream-dark p-6 rounded-3xl text-left">
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy mb-6 flex items-center gap-2">
                <ClipboardList className="w-5.5 h-5.5 text-secondary" />
                <span>Admissions Timeline</span>
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[18px] before:w-[2px] before:bg-cream-dark"
              >
                {PROCESS_STEPS.map((step) => (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className="flex gap-4 items-start relative z-10"
                  >
                    <div className={`w-9 h-9 rounded-full font-fredoka font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${step.color}`}>
                      {step.step.split(" ")[1]}
                    </div>
                    <div>
                      <h4 className="font-fredoka font-bold text-navy text-base">
                        {step.title}
                      </h4>
                      <p className="text-xs text-navy-muted font-nunito leading-relaxed mt-1">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Fee structure table */}
            <div className="bg-white border-2 border-cream-dark p-6 rounded-3xl text-left">
              <h3 className="text-xl md:text-2xl font-fredoka font-bold text-navy mb-4 flex items-center gap-2">
                <CheckSquare className="w-5.5 h-5.5 text-accent-pink" />
                <span>Program Fees & Timing</span>
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left font-nunito text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-cream-dark/60 font-fredoka font-bold text-navy uppercase text-[10px] tracking-wider">
                      <th className="py-2.5">Program</th>
                      <th className="py-2.5">Age Limit</th>
                      <th className="py-2.5">Timings</th>
                      <th className="py-2.5 text-right">Tuition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-dark/40 text-navy-muted">
                    {FEE_STRUCTURE.map((row) => (
                      <tr key={row.program} className="hover:bg-cream/40 transition-colors">
                        <td className="py-3 font-fredoka font-bold text-navy">{row.program}</td>
                        <td className="py-3">{row.age}</td>
                        <td className="py-3 font-mono text-[11px]">{row.time}</td>
                        <td className="py-3 text-right font-bold text-primary-dark">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-navy-muted mt-3 font-nunito leading-relaxed">
                * Tuition fee covers nutritious daily warm meals, learning kits, and art materials. A refundable security deposit is charged separately at entry.
              </p>
            </div>

            {/* Document Checklist Accordions */}
            <div className="text-left">
              <h3 className="text-xl font-fredoka font-bold text-navy mb-4 pl-2 flex items-center gap-2">
                <HelpCircle className="w-5.5 h-5.5 text-emerald-500" />
                <span>Required Documents</span>
              </h3>

              <Accordion title="Checklist: Documents for Registration">
                <ul className="list-disc pl-5 space-y-2 text-xs md:text-sm text-navy-muted font-nunito">
                  <li><strong>Child Birth Certificate:</strong> Original + 1 copy for verification.</li>
                  <li><strong>Immunization Record:</strong> Certified medical record copy highlighting vaccinations taken.</li>
                  <li><strong>Passport Photos:</strong> 4 colored passport size photos of the child.</li>
                  <li><strong>Parent Identification:</strong> Passport photos and ID cards (Aadhaar, Passport, DL) of both parents.</li>
                  <li><strong>Address Proof:</strong> Utility bill (electricity, water) or rent lease agreement.</li>
                  <li><strong>Transfer Certificate:</strong> Required only for UKG entries from another school board.</li>
                </ul>
              </Accordion>
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
