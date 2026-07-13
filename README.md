# 🏫 Little Sprouts Kindergarten Academy Website

A complete, production-ready, **frontend-only** multi-page React SPA for a Kindergarten Educational Institute. Built using React, Tailwind CSS v4, and Framer Motion, it features a warm storybook visual identity combined with premium glassmorphic surfaces, floating capsules, and highly interactive animations that engage children and parents alike.

---

## 🌟 Interactive Features & Design Systems

### 1. Floating Capsule Navbar & Dock Design
- Restructured the top navigation block into a centered, floating capsule dock (`rounded-full` border-radius) that floats at `top-4` with side margins.
- Features a frosted glassmorphic styling (`glass`) that shrinks and increases opacity on page scroll to maintain high text readability.
- Replaced the bottom underline indicators with an active sliding background pill (`bg-primary/10 rounded-full`) that transitions from link to link with spring physics.
- Added a robust dismiss handler that closes the search dropdown when clicking outside, pressing the `Escape` key, or submitting empty fields.

### 2. Light Glassmorphism Sidebar Navigation Drawer
- Transformed the mobile navigation menu drawer into a floating card panel positioned at `top-4 right-4 bottom-4` with highly rounded corners (`rounded-[32px]`) overlaying a soft backdrop.
- Uses a light-themed frosted white glass backdrop (`bg-white/30 backdrop-blur-3xl border border-white/45`) with slate text for high legibility.
- Highlights active tabs with a semi-transparent frosted card container behind the text, and houses the search bar as a solid white card capsule.

### 3. Playful Interactivity & Mascot Integration
- **Sprouty Mascot**: An animated guide seedling mascot widget fixed in the bottom-left viewport. It breathes/wobbles on idle, waves/jumps when tapped, and pops up speech bubbles reacting to page routing and form events.
- **Sparkle Cursor/Touch Trail**: Canvas-based interactive multi-colored particle trail active in the Hero section, tracking mouse movement and touch drags.
- **Confetti Explosion**: Canvas confetti particle bursts triggered from click coordinate origins on successful form submissions or by clicking the navbar logo 3 times within 1 second.
- **3D Card Flips**: Playgroup/Nursery/KG curriculum preview cards flip 180 degrees in-place upon click to reveal visual learning materials (crayons, blocks) instead of immediate navigation.
- **High-Five Submit Feedback**: Form submit buttons briefly display a `"✋ High Five!"` state upon successful validation checks.
- **Reduced Motion Support**: Automatically checks `prefers-reduced-motion` settings to disable heavy canvas particle updates and bouncy spring translations.

---

## 🛠️ Technical Stack

- **Framework**: React 18+ (scaffolded with Vite)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS v4 (using the `@tailwindcss/vite` plugin)
- **Animations**: Framer Motion
- **Icons**: Lucide React + Inline SVGs
- **Theme**: Storybook-inspired custom color palette (orange, sky blue, coral pink, navy, warm cream) using custom typography (Fredoka & Nunito).

---

## 📁 Folder Structure

```
project-root/
│
├── index.html
├── vite.config.js
├── package.json
│
├── /src
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── /components
│   │   ├── /layout        (Navbar, Footer, PageTransition, ScrollToTop)
│   │   ├── /ui             (Button, Card, Modal, Accordion, Badge, Tabs, ConfettiBurst, MascotCharacter, SparkleTrail)
│   │   ├── /forms          (FormField, AdmissionForm, BookVisitForm, ContactForm, Newsletter)
│   │   ├── /home           (Hero, WhyChooseUs, ProgramsPreview, Testimonials, StatsCounter, DayInLife)
│   │
│   ├── /pages
│   │   ├── Home.jsx
│   │   ├── Gallery.jsx
│   │   ├── AdmissionEnquiry.jsx
│   │   ├── Events.jsx
│   │   ├── Achievements.jsx
│   │   ├── Academics.jsx
│   │   ├── AcademicCalendar.jsx
│   │   ├── BookAVisit.jsx
│   │   ├── About.jsx
│   │   ├── FAQ.jsx
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   │
│   ├── /data               (local JS data: events.js, gallery.js, testimonials.js, teachers.js, achievements.js, calendar.js, faqs.js, blogPosts.js)
│   ├── /hooks               (useCountUp.js, useScrollLock.js)
│   ├── /animations           (variants.js — shared Framer Motion animation configurations)
│   ├── /context              (ModalContext.jsx — global enquiry modal state provider)
│   └── /styles                (index.css — Tailwind directives + Google fonts + custom animations)
│
└── README.md
```

---

## 🚀 Getting Started Locally

Follow these steps to run the application on your local machine:

### 1. Install Dependencies
Install the required node packages:
```bash
npm install
```

### 2. Launch Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the address listed in the output (typically `http://localhost:5173`).

### 3. Create Production Build
To build the static assets for production deployment:
```bash
npm run build
```
The compiled, minified HTML/CSS/JS bundles will be generated in the `/dist` directory, ready to be hosted on any static provider (GitHub Pages, Netlify, Vercel, AWS S3, etc.).
