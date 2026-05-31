// Display labels for tech tags used across the projects.
export const TAG_LABELS: Record<string, string> = {
  elevenlabs: "ElevenLabs",
  gemini: "Gemini",
  cloudflare: "Cloudflare",
  firecrawl: "Firecrawl",
  stripe: "Stripe",
  phaser: "Phaser",
  llm: "LLM",
  rag: "RAG",
  python: "Python",
  fastapi: "FastAPI",
  react: "React",
  postgresql: "PostgreSQL",
  javascript: "JavaScript",
  did: "D-ID",
};

export const tagLabel = (key: string): string => TAG_LABELS[key] ?? key;
