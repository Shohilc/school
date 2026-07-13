export const calendarEvents = [
  // July 2026
  {
    id: "cal-1",
    date: "2026-07-15",
    title: "Term 1 Classes Begin",
    type: "term",
    description: "Welcome back! Regular school classes start for Playgroup, Nursery, LKG, and UKG batches."
  },
  {
    id: "cal-2",
    date: "2026-07-24",
    title: "First Parent-Teacher Orientation",
    type: "ptm",
    description: "A meeting to discuss learning goals, safety guidelines, and introduce classroom teachers."
  },
  {
    id: "cal-3",
    date: "2026-07-31",
    title: "Monsoon Splash Play Day",
    type: "event",
    description: "Sensory water play and outdoor splash pools (weather permitting) with rain-boots and umbrellas."
  },

  // August 2026
  {
    id: "cal-4",
    date: "2026-08-15",
    title: "Annual Science & Discovery Fair",
    type: "event",
    description: "Interactive science projects, magnet building trials, and safe chemistry volcano displays."
  },
  {
    id: "cal-5",
    date: "2026-08-25",
    title: "Mid-Term Progress Check",
    type: "ptm",
    description: "One-on-one parent conferences to review student portfolios and behavioral development."
  },
  {
    id: "cal-6",
    date: "2026-08-31",
    title: "Summer End Picnic Holiday",
    type: "holiday",
    description: "School closed for national end of summer holidays."
  },

  // September 2026
  {
    id: "cal-7",
    date: "2026-09-05",
    title: "Grandparents Day storytelling",
    type: "event",
    description: "Grandparents storytelling circles, photo booths, and sharing memories."
  },
  {
    id: "cal-8",
    date: "2026-09-18",
    title: "Term 1 Creative Assessment",
    type: "term",
    description: "Playful developmental milestones assessment. Standard classroom hours apply."
  },
  {
    id: "cal-9",
    date: "2026-09-28",
    title: "Teachers Training Seminar",
    type: "holiday",
    description: "School closed for teacher training and Montessori workshop sessions."
  },

  // October 2026
  {
    id: "cal-10",
    date: "2026-10-12",
    title: "Autumn Nature Exploration Walk",
    type: "event",
    description: "Collecting autumn leaves, spotting bark structures and insects, concluding with leaf sketches."
  },
  {
    id: "cal-11",
    date: "2026-10-23",
    title: "Halloween Pumpkin Carving Contest",
    type: "event",
    description: "Children dress in cute costumes and carve child-safe soft squash/pumpkins."
  },
  {
    id: "cal-12",
    date: "2026-10-29",
    title: "Autumn Break Commences",
    type: "holiday",
    description: "School closed for autumn vacation break, reopening on Nov 4."
  },

  // November 2026
  {
    id: "cal-13",
    date: "2026-11-04",
    title: "School Reopens / Term 2 Begins",
    type: "term",
    description: "Classes resume after the autumn holiday break."
  },
  {
    id: "cal-14",
    date: "2026-11-14",
    title: "Children's Carnival & Fun Games",
    type: "event",
    description: "A fun-filled day of magic shows, cotton candy stalls, and junior obstacle courses."
  },
  {
    id: "cal-15",
    date: "2026-11-20",
    title: "Portfolio Development Review",
    type: "ptm",
    description: "Detailed review of arts, letters, and phonics achievements with teachers."
  },

  // December 2026
  {
    id: "cal-16",
    date: "2026-12-18",
    title: "Winter Festival Parade & Choir",
    type: "event",
    description: "Children singing holiday tunes, doing winter crafts, and holding parent choirs."
  },
  {
    id: "cal-17",
    date: "2026-12-23",
    title: "Winter Vacation Holiday",
    type: "holiday",
    description: "School closed for Winter/New Year break, reopening on Jan 6, 2027."
  }
];

export const eventTypes = {
  holiday: { label: "Holiday", color: "bg-red-500", dot: "●" },
  event: { label: "School Event", color: "bg-sky-500", dot: "●" },
  ptm: { label: "Parent-Teacher Meet (PTM)", color: "bg-orange-500", dot: "●" },
  term: { label: "Term Dates / Exams", color: "bg-emerald-500", dot: "●" }
};
