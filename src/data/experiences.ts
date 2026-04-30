export interface ExperienceSection {
  title: string;
  bullets: string[];
  result?: string;
}

export interface Experience {
  tag: string;
  company: string;
  role: string;
  period: string;
  sections: ExperienceSection[];
}

export const EXPERIENCES: Experience[] = [
  {
    tag: "Capítulo 01",
    company: "L'Oréal",
    role: "Influencer Marketing & Brand Content Specialist",
    period: "September 2024 — March 2026 · Madrid",
    sections: [
      {
        title: "Digital & Social",
        bullets: [
          "Managed content calendar, asset coordination and Corporate LinkedIn @L'Oréal Groupe",
          "Scripting, production and editing of content for corporate social channels",
          "Advocacy program management via Sprinklr: KPI analysis, agency coordination, ambassador activation"
        ],
        result: "Ambassador post reach doubled in one year through a UGC-based strategy. Content volume multiplied ×4."
      },
      {
        title: "Employee Engagement",
        bullets: [
          "Internal newsletter: writing, layout and approval flow redesign",
          "Global campaign execution and localization across internal channels. Automated internal scheduling system.",
          "Event production for 1,200+ employees alongside external agency",
          "C-Level Townhalls: narrative definition, key message structure, executive briefing, rehearsal supervision"
        ],
        result: "Click-Through Rate doubled. 20% reduction in team workload through automation."
      },
      {
        title: "Influencer Marketing",
        bullets: [
          "KOL scouting for corporate campaigns",
          "Influencer briefing management",
          "Content production and delivery"
        ]
      }
    ]
  },
  {
    tag: "Capítulo 02",
    company: "INNN",
    role: "Content Creation & Digital Strategy",
    period: "February — May 2024 · Sevilla",
    sections: [
      {
        title: "Content & Web",
        bullets: [
          "Web content creation for digital platforms",
          "Motion graphics and animations in After Effects",
          "Web analytics and user behavior tracking via Google Analytics",
          "Content management and publishing in WordPress"
        ]
      },
      {
        title: "Paid Media",
        bullets: [
          "Ad adaptation for A/B testing on Meta and Google Ads",
          "Creative asset production for performance campaigns"
        ],
        result: "Hands-on experience across the full digital content pipeline, from creation to distribution and measurement."
      }
    ]
  },
  {
    tag: "Capítulo 03",
    company: "Kircher Network",
    role: "Social Media & Community Manager",
    period: "November 2022 — April 2023",
    sections: [
      {
        title: "Social Media & Content",
        bullets: [
          "Social media management across multiple platforms",
          "Editorial calendar planning and execution",
          "Graphic design and visual content production",
          "Community engagement and audience growth",
          "Web content management and publishing"
        ]
      }
    ]
  },
  {
    tag: "Capítulo 04",
    company: "Heuritech",
    role: "Creative Design & Visual Content",
    period: "February — July 2022 · Paris",
    sections: [
      {
        title: "Creative & Design",
        bullets: [
          "Assisted the Art Director in visual production for luxury and lifestyle brands",
          "Designed and edited video content for social media publications and reels",
          "Created fashion one-pagers and investor presentation decks",
          "UI design work and digital product design exploration",
          "Produced visual assets aligned with fashion-tech brand identity"
        ],
        result: "Immersive experience in high-end visual production at the intersection of fashion, data and creativity."
      }
    ]
  }
];

export const TV_CARDS = [
  {
    company: "L'Oréal",
    role: "Influencer Marketing & Brand Content",
    years: "2024 — 2026",
    label: "L'Oréal Groupe",
    desc: "Madrid · 1 year 7 months",
    metric: "×4 contenidos publicados"
  },
  {
    company: "INNN",
    role: "Content Creation & Digital Strategy",
    years: "2024",
    label: "INNN",
    desc: "Sevilla · 4 months",
    metric: "A/B tests Meta & Google Ads"
  },
  {
    company: "Kircher",
    role: "Social Media & Community Manager",
    years: "2022 — 2023",
    label: "Kircher Network",
    desc: "6 months",
    metric: "Gestión editorial multicanal"
  },
  {
    company: "Heuritech",
    role: "Creative Design & Visual Content",
    years: "2022",
    label: "Heuritech",
    desc: "Paris · 6 months",
    metric: "Contenido visual para fashion-tech"
  }
];
