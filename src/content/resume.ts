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

export const experience: ExperienceEntry[] = [
  {
    company: "Global Automotive Company",
    roles: [
      {
        title: "Technical Architect | Applied AI",
        period: "Feb 2021 – Present",
        bullets: [
          "Lead end-to-end delivery of enterprise AI solutions for document intelligence, regulatory compliance, and engineering productivity.",
          "Architected an AI-powered compliance validation platform that reduced manual review effort by ~98%.",
          "Delivered annual cost savings exceeding $250K through automated supplier compliance verification.",
          "Designed a custom RAG framework for large regulatory documents, cutting review time by more than 95%.",
          "Built agentic workflows for requirement classification, dependency mapping, and impact analysis.",
          "Led large-scale crash data analytics to reduce dependence on physical crash prototypes.",
          "Developed ML models for crash simulation using sequence modeling and synthetic data generation.",
          "Built executive dashboards and visualization platforms that accelerated safety decision making.",
        ],
      },
    ],
  },
  {
    company: "Simon Fraser University",
    roles: [
      {
        title: "Data Analyst",
        period: "May 2020 – Sep 2020",
        bullets: [
          "Delivered production-grade ML and analytics solutions for external industry clients.",
          "Deployed TensorFlow Lite computer-vision models for mobile fish species identification.",
          "Implemented lightweight object detection (SSD MobileNet, Faster R-CNN).",
        ],
      },
      {
        title: "Big Data Analyst & Teaching Assistant",
        period: "Jan 2019 – May 2020",
        bullets: [
          "Conducted applied machine learning research during Master's studies.",
          "Built data pipelines, predictive models, and analytics solutions.",
          "Supported teaching for database and big data systems courses.",
        ],
      },
    ],
  },
  {
    company: "Latecoere Aerostructures Canada (Avcorp Industries)",
    roles: [
      {
        title: "Data Analyst",
        period: "May 2019 – Aug 2019",
        bullets: [
          "Developed end-to-end analytics solutions for aerospace manufacturing operations.",
          "Automated data collection pipelines, reducing manual effort by over 80%.",
          "Built ML models for predictive maintenance with 90%+ classification accuracy for chemical tank failure.",
        ],
      },
    ],
  },
  {
    company: "Data Warehousing & BI",
    roles: [
      {
        title: "Programmer Analyst / Associate",
        period: "Sep 2012 – Jul 2018",
        bullets: [
          "Delivered large-scale data warehousing solutions for banking and retail clients.",
          "Built ETL pipelines using Informatica and Ab Initio.",
          "Worked extensively with Teradata, SQL, and enterprise reporting platforms.",
          "Designed and enhanced enterprise ETL and BI solutions.",
          "Improved data pipeline reliability and reporting performance.",
          "Partnered with stakeholders on planning, delivery, and business reporting.",
        ],
      },
    ],
  },
];

export const skills: SkillGroup[] = [
  { category: "Programming", items: ["Python", "SQL"] },
  {
    category: "AI & Machine Learning",
    items: [
      "LLMs",
      "RAG",
      "Agentic AI Systems",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "OpenAI APIs",
      "Hugging Face",
      "Vertex AI",
      "Claude Code",
    ],
  },
  { category: "MLOps & Observability", items: ["Arize AI", "Comet Opik", "Model Evaluation"] },
  {
    category: "Cloud & Infrastructure",
    items: ["GCP", "Kubernetes", "OpenShift", "Docker", "Terraform", "CI/CD", "Tekton", "ArgoCD"],
  },
  {
    category: "Databases & Search",
    items: ["PostgreSQL", "BigQuery", "MongoDB", "Teradata", "Chroma", "Qdrant", "Elasticsearch", "Neo4j"],
  },
  { category: "Backend", items: ["FastAPI"] },
  { category: "Product & Visualization", items: ["Streamlit", "Gradio", "React", "Power BI", "Tableau", "Qlik"] },
];

export const education: EducationEntry[] = [
  { degree: "Master of Science in Computer Science", school: "Simon Fraser University", location: "Canada" },
  { degree: "Bachelor of Engineering in Computer Science", school: "Anna University", location: "India" },
];
