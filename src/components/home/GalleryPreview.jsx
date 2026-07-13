import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Image, ArrowRight } from "lucide-react";
import { galleryItems } from "../../data/gallery";
import { fadeInUp } from "../../animations/variants";

export default function GalleryPreview() {
  // Grab first 6 items for preview
  const previewItems = galleryItems.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="text-left max-w-2xl">
            <span className="text-sm font-fredoka font-bold text-accent-pink uppercase tracking-wider">
              Snapshots of Joy
            </span>
            <h2 className="text-3xl md:text-5xl font-fredoka font-black text-navy mt-2 leading-tight">
              Life at Little Sprouts
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-fredoka font-bold text-accent-pink hover:text-accent-pink-dark transition-colors text-base cursor-pointer shrink-0"
          >
            <span>Visit Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Thumbnail grid strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {previewItems.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              custom={idx * 0.08}
              className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer border-2 border-cream-dark/50"
              onClick={() => window.location.href="/gallery"}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              
              {/* Hover overlay mask */}
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  className="p-3 bg-white/95 rounded-full text-accent-pink shadow-md"
                >
                  <Image className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
