export interface SocialLink {
  label: string;
  url: string;
}

export const profile = {
  name: "Padmanabhan",
  handle: "@Limb",
  label: "SWE | Applied AI | @Limb",
  role: "Software Engineer · Applied AI",
  location: "India",
  x: "https://x.com/__padmanabhan",
  tagline: "I turn business goals into production-grade AI products that ship and scale.",
  about: [
    "Software engineer focused on applied AI — generative AI, RAG, agentic systems, and LLM applications.",
    "Over a decade turning business objectives into production-grade AI products across automotive, aerospace, banking, retail, and research. I work across architecture, delivery, and adoption — equally at home in design reviews and in the codebase.",
  ],
  stats: [
    { value: "13+", label: "years in technology" },
    { value: "5+", label: "years in AI/ML" },
    { value: "$1M+", label: "measurable impact" },
    { value: "11", label: "ElevenHacks builds" },
  ],
  // TODO: replace placeholder profile URLs
  socials: [
    { label: "X", url: "https://x.com/__padmanabhan" },
    { label: "GitHub", url: "https://github.com/padmanabhan-r/PersonaFolio" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ] as SocialLink[],
};
