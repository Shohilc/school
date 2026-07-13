import React from "react";
import PageTransition from "../components/layout/PageTransition";
import Hero from "../components/home/Hero";
import WhyChooseUs from "../components/home/WhyChooseUs";
import ProgramsPreview from "../components/home/ProgramsPreview";
import StatsCounter from "../components/home/StatsCounter";
import Testimonials from "../components/home/Testimonials";
import DayInLife from "../components/home/DayInLife";
import EventsPreview from "../components/home/EventsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import CTABanner from "../components/home/CTABanner";

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full">
        {/* Playful Storybook Hero Section */}
        <Hero />

        {/* Value features staggered entry */}
        <WhyChooseUs />

        {/* Age group courses preview */}
        <ProgramsPreview />

        {/* Animated scrolling numbers counter */}
        <StatsCounter />

        {/* Interactive day timeline storyboard */}
        <DayInLife />

        {/* Parent reviews slider */}
        <Testimonials />

        {/* Previews for upcoming events and calendar */}
        <EventsPreview />

        {/* Thumbnails strip linking to gallery */}
        <GalleryPreview />

        {/* Call to action panel */}
        <CTABanner />
      </div>
    </PageTransition>
  );
}
