import React, { useState } from "react";
import { Search, AlertCircle, HelpCircle } from "lucide-react";
import PageTransition from "../components/layout/PageTransition";
import Accordion from "../components/ui/Accordion";
import Tabs from "../components/ui/Tabs";
import { faqs, faqCategories } from "../data/faqs";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter FAQs based on tab selection and search input query
  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const categoriesTabs = faqCategories.map((cat) => ({
    id: cat,
    label: cat === "All" ? "All FAQs" : cat
  }));

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-fredoka font-bold text-primary uppercase tracking-wider">
            Got Questions?
          </span>
          <h1 className="text-4xl md:text-6xl font-fredoka font-black text-navy mt-2 mb-4 leading-none">
            FAQ Desk
          </h1>
          <p className="text-navy-muted font-nunito text-base md:text-lg">
            Find quick answers regarding our admission parameters, fee installment plans, transport logs, and safety systems.
          </p>
        </div>

        {/* Search Bar Widget */}
        <div className="relative w-full max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search FAQs (e.g. food, ratios, fees)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-6 py-3.5 rounded-2xl border-2 border-cream-dark focus:border-primary outline-none text-navy bg-white shadow-sm transition-all focus:ring-4 focus:ring-primary/20 text-sm md:text-base font-nunito"
          />
          <Search className="w-5.5 h-5.5 text-navy-muted absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Category Tabs list */}
        <div className="flex justify-center mb-10">
          <Tabs
            tabs={categoriesTabs}
            activeTab={activeCategory}
            onChange={(cat) => {
              setActiveCategory(cat);
              // Clear search when switching tabs to avoid confusion
              setSearchQuery("");
            }}
            className="flex-wrap justify-center"
          />
        </div>

        {/* FAQs Accordion List */}
        <div className="text-left mb-16">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Accordion
                  key={faq.id}
                  title={faq.question}
                  titleClassName="text-navy leading-snug font-semibold text-base md:text-lg"
                  className="shadow-sm"
                >
                  <div className="flex gap-3 items-start">
                    <div className="p-1.5 bg-primary-light text-primary rounded-xl shrink-0 mt-0.5">
                      <HelpCircle className="w-4.5 h-4.5" />
                    </div>
                    <p className="text-sm md:text-base text-navy-muted font-nunito leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </Accordion>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-3xl border-2 border-dashed border-cream-dark">
              <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
              <h3 className="font-fredoka font-bold text-navy text-xl mb-1">No FAQs Found</h3>
              <p className="text-sm text-navy-muted font-nunito max-w-sm mx-auto">
                We couldn't find any FAQs matching "{searchQuery}" under {activeCategory === "All" ? "all categories" : activeCategory}. Try typing a different keyword.
              </p>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
