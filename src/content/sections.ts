// Single source of truth for navigable sections — drives the header nav,
// the active-section highlight, and the D-ID voice tool's section enum.
export interface SectionDef {
  id: string;
  elementId: string;
  label: string;
  aliases: string[];
}

export const SECTIONS: SectionDef[] = [
  { id: "about", elementId: "about", label: "About", aliases: ["who you are", "intro", "bio", "summary"] },
  { id: "experience", elementId: "experience", label: "Experience", aliases: ["work history", "career", "jobs", "roles"] },
  { id: "skills", elementId: "skills", label: "Skills", aliases: ["tech", "stack", "tools", "expertise"] },
  { id: "elevenhacks", elementId: "elevenhacks", label: "ElevenHacks", aliases: ["projects", "hackathon", "portfolio", "work", "builds"] },
  { id: "education", elementId: "education", label: "Education", aliases: ["degrees", "studies", "university"] },
  { id: "contact", elementId: "contact", label: "Contact", aliases: ["reach you", "email", "get in touch"] },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export const getSection = (idOrAlias: string): SectionDef | undefined => {
  const n = idOrAlias.trim().toLowerCase();
  return SECTIONS.find((s) => s.id === n || s.aliases.some((a) => a.toLowerCase() === n));
};
