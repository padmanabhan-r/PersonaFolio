export interface ExperienceRole {
  title: string;
  period: string;
  bullets: string[];
}
export interface ExperienceEntry {
  company: string;
  roles: ExperienceRole[];
}
export interface SkillGroup {
  category: string;
  items: string[];
}
export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
}

// Kept deliberately generic — domain + impact, no employer-identifying specifics or dates.
export const experience: ExperienceEntry[] = [
  {
    company: "Global Automotive Company",
    roles: [
      {
        title: "Technical Architect · Applied AI",
        period: "Current",
        bullets: [
          "Lead end-to-end delivery of enterprise AI solutions for document intelligence, regulatory compliance, and engineering productivity.",
          "Architected an AI-powered compliance-validation platform that dramatically reduced manual review effort.",
          "Delivered significant recurring cost savings through automated compliance verification.",
          "Designed a custom RAG framework for large, complex documents, cutting review time substantially.",
          "Built agentic workflows for classification, dependency mapping, and impact analysis.",
          "Led data analytics and ML modeling to reduce reliance on physical prototype testing, with executive dashboards for decision-making.",
        ],
      },
    ],
  },
  {
    company: "Research University",
    roles: [
      {
        title: "Data Analyst · Research Assistant",
        period: "Earlier",
        bullets: [
          "Delivered production-grade ML and analytics solutions for external industry clients.",
          "Deployed lightweight computer-vision models for on-device inference.",
          "Conducted applied machine-learning research during graduate studies.",
          "Built data pipelines, predictive models, and object-detection architectures.",
          "Supported teaching for database and big-data systems courses.",
        ],
      },
    ],
  },
  {
    company: "Aerospace Manufacturer",
    roles: [
      {
        title: "Data Scientist",
        period: "Earlier",
        bullets: [
          "Built end-to-end analytics solutions for manufacturing operations.",
          "Automated data-collection pipelines, cutting manual effort significantly.",
          "Developed high-accuracy ML models for predictive maintenance.",
        ],
      },
    ],
  },
  {
    company: "Global Banking Company",
    roles: [
      {
        title: "Data Engineer",
        period: "Early career",
        bullets: [
          "Delivered large-scale data-warehousing solutions for enterprise clients.",
          "Built and maintained ETL pipelines and enterprise reporting platforms.",
          "Improved pipeline reliability and reporting performance; partnered with stakeholders on delivery.",
        ],
      },
    ],
  },
];

// Concrete tech/tools only — the high-level themes (GenAI, agentic, ML, cloud) live on the About page.
export const skills: SkillGroup[] = [
  { category: "Languages & APIs", items: ["Python", "TypeScript", "SQL", "FastAPI"] },
  { category: "Agents & GenAI", items: ["LangChain", "LangGraph", "CrewAI", "Hermes Agent", "OpenClaw", "Claude Code", "ElevenLabs"] },
  { category: "ML & Evaluation", items: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "Arize AI", "Comet Opik"] },
  { category: "Cloud & DevOps", items: ["GCP", "Vertex AI", "Cloudflare", "Kubernetes", "Docker", "Terraform", "CI/CD"] },
  { category: "Data & Search", items: ["PostgreSQL", "MongoDB", "Chroma", "Qdrant", "turbopuffer", "Elasticsearch", "Neo4j"] },
  { category: "Product & UI", items: ["React", "Streamlit", "Gradio", "Power BI", "Tableau"] },
];

export const education: EducationEntry[] = [
  { degree: "Master of Science in Computer Science", school: "Simon Fraser University", location: "Canada" },
  { degree: "Bachelor of Engineering in Computer Science", school: "Anna University", location: "India" },
];
