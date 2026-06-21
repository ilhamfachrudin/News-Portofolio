import { CVData } from "../types";

export const cvData: CVData = {
  name: "Ahmad Ilham Fachrudin Nur Yahya",
  title: "AI Content Specialist",
  headline: "AI Content Specialist | Enterprise LLM Customizer & Google AI Studio Expert",
  contact: {
    location: "Kab. Malang, Prov. Jawa Timur, Indonesia 651651",
    phone: "+6285733309949",
    email: "novi240397@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilhamfachrudin",
    portfolio: "https://ai.studio/build"
  },
  summary: "Highly adaptable, result-driven AI Content Specialist with over 2 years of independent experience managing automated content pipelines, LLM prototyping, and advanced generative AI frameworks. Certified in Google AI products and generative infrastructures with proven expertise planning, architecting, and optimizing high-velocity prompt pipelines inside Google AI Studio. Expert in structuring contextual knowledge, engineering robust system instructions, and leveraging deep LLM parameters to reduce editorial production cycles by 40% while preserving strict content quality guidelines.",
  careerObjective: "Seeking a specialized remote role as an AI Content Specialist in an international tech organization. My objective is to bridge the gap between creative storytelling and generative AI technologies, establishing automated content creation workflows, high-precision prompt libraries, and scalable editorial evaluation systems that elevate brand authority and deliver reliable, high-fidelity technical documentation.",
  uniqueValueProposition: "I don't just prompt; I engineer. By combining certifications in Google AI infrastructures with frontend foundations (HTML/CSS) and standard SEO blueprints, I create complete GenAI content architectures. I build systematic, repeatable pipelines in Google AI Studio that convert raw technical schemas into high-integrity developer documentation, multi-format media assets, and SEO-optimized knowledge repositories with zero prompt drift.",
  experience: [
    {
      id: "exp-1",
      company: "INDEPENDENT / FREELANCE",
      location: "Remote | Indonesia",
      role: "AI Prompt Engineer & Content Specialist",
      period: "2024 - Present",
      highlights: [
        "Architected and executed custom prompt frameworks and system instructions within Google AI Studio, successfully reducing end-to-end text and technical content creation timelines by 40% for multi-channel pipelines.",
        "Engineered high-fidelity LLM responses and text-based automation workflows using advanced configuration parameters (Temperature, Top-K, Top-P) to eliminate hallucination vectors and minimize context window inefficiencies.",
        "Streamlined digital asset pipelines and content delivery speeds by integrating targeted structured Prompt Engineering architectures (Few-Shot, CoT, Role-Play), accelerating conceptual research and creative brand assets by 3x.",
        "Developed and maintained user-centric static web documentation incorporating HTML and CSS, ensuring precise alignment between AI-generated content drafts and standard front-end code usability templates."
      ]
    },
    {
      id: "exp-2",
      company: "FACEBOOK DIGITAL DESIGN COMMUNITY",
      location: "Remote | Indonesia",
      role: "Lead Content Strategist (Volunteer)",
      period: "2025 - Present",
      highlights: [
        "Engineered structured information architecture and digital content hierarchies for an active tech community, drove user engagement metrics and improved customer retention through clear content delivery.",
        "Authored targeted technical content directives, community system prompts, and training repositories that enhanced community interactions and supported long-form, multi-channel platform integration."
      ]
    }
  ],
  certifications: [
    {
      name: "AI for Work & Career Readiness with Google AI Products",
      issuer: "Maju Bareng AI (Hosted by Hacktiv8 Indonesia)",
      date: "May 2026",
      credentialId: "05002/H8/CSR/MBA2/V/2026",
      description: "10-Hour Intensive Program validating professional application of Google generative AI suites, advanced prompting, and product integration."
    },
    {
      name: "Dasar dan Penggunaan Generatif AI",
      issuer: "Codepolitan (Supported by Google.org & Asian Development Bank)",
      date: "May 2026",
      credentialId: "CPRAI-CR/2026/V/2785",
      description: "Validates foundational technical expertise in Generative AI architectures, prompt optimization, and regional digital transformation strategies."
    }
  ],
  languages: [
    { language: "Indonesian", level: "Native / Advanced (Professional)" },
    { language: "English", level: "Intermediate (Highly proficient in written technical content, AI-augmented international remote collaboration, and prompt-based localization)" }
  ],
  achievements: [
    "Successfully established an enterprise-grade prompt-library blueprint in Google AI Studio, achieving a 45% reduction in content localization timelines across Asian markets.",
    "Recognized as a leading generative AI practitioner by Maju Bareng AI & High-Velocity Hacktiv8 Training Program (Satisfactory Evaluations, 2026)."
  ]
};

export const atsKeywords = {
  aiSkills: [
    "Google AI Studio", "Gemini API Prototyping", "Prompt Engineering", "System Instructions",
    "Few-Shot Prompting", "Chain-of-Thought (CoT)", "Zero-Shot Prompting", "LLM Tuning Parameters",
    "Hallucination Mitigation", "Context Window Management", "Structured JSON Outputs",
    "Temperature & Top-K/Top-P Adjustment", "System Instructions Prompting", "LLM Safety Guardrails"
  ],
  contentSkills: [
    "Technical Content Layouts", "SEO Content Architecture", "Digital Storytelling", "High-Fidelity Text Generation",
    "Multichannel Publishing", "Brand Voice Calibration", "Content Style Guide Integration", "Syntactic Polish",
    "Fact-Checking Layouts", "Information Architecture", "Content Quality Evaluation Frameworks", "Knowledge Base Engineering"
  ],
  researchSkills: [
    "Retrieval-Augmented Generation (RAG) Grounding", "Competitor Content Analysis", "Source Validation",
    "Semantic Search Engineering", "Content Performance Analytics", "Knowledge Synthesis", "User Intent Optimization"
  ],
  tools: [
    "Google AI Studio", "Vite", "HTML5", "CSS3", "JavaScript", "Python (Foundational)", "Markdown Editors",
    "Git", "GitHub", "Notion Workspace Manager", "Microsoft Office Suite", "Slack & Remote Collaboration Spaces"
  ],
  remoteSkills: [
    "Asynchronous Output Operations", "Cross-Timezone Collaboration", "Self-Directed Project Management",
    "Written Technical Communication", "Documentation Control", "Virtual Agile Workspaces"
  ]
};

export interface SkillMapping {
  skill: string;
  projectId: string;
  projectTitle: string;
  evidence: string;
}

export const skillMappings: SkillMapping[] = [
  {
    skill: "Google AI Studio & Gemini API",
    projectId: "proj-1",
    projectTitle: "AI Content Production System (System-Prompt Engine)",
    evidence: "Built an automated system instruction compiler within Google AI Studio that exports structured prompt packages, reducing editorial setup times by 40%."
  },
  {
    skill: "Advanced Prompt Engineering (Few-shot, CoT)",
    projectId: "proj-2",
    projectTitle: "AI Blog Content Framework (Structural Few-Shot Orchestrator)",
    evidence: "Implemented multi-turn few-shot chains that preserve complex B2B brand voices across 10+ distinct formats without style drift."
  },
  {
    skill: "RAG & Keyword Grounding",
    projectId: "proj-3",
    projectTitle: "AI Content Research System (Semantic Grounding Hub)",
    evidence: "Designed a citation-verification pipeline securing semantic retrieval accuracy, mitigating content hallucination rates to less than 1%."
  },
  {
    skill: "SEO Content Architecture",
    projectId: "proj-4",
    projectTitle: "AI Content Optimization Workflow (V3 Latent Semantic Evaluator)",
    evidence: "Developed an automated density-mapping script analyzing content drafts for schema alignment, resulting in a 35% gain in organic search visibility metrics."
  },
  {
    skill: "Content Quality Evaluation Frameworks",
    projectId: "proj-5",
    projectTitle: "AI Content Quality Evaluation Framework (The 'Content-Audit' Evaluator)",
    evidence: "Authored an analytical rubric template that scores AI drafts across five specific dimensions (Accuracy, Sentiment, Safety, Depth, Bias)."
  },
  {
    skill: "Editorial Flow Planning & Automation",
    projectId: "proj-6",
    projectTitle: "AI Editorial Planning System (Unified Workflow Scheduler)",
    evidence: "Built a Kanban integrated dashboard automating title scheduling, prompt assembly, output formatting, and review steps."
  },
  {
    skill: "Knowledge Base Engineering",
    projectId: "proj-7",
    projectTitle: "AI Knowledge Base Content Project (Technical Portal Builder)",
    evidence: "Laid out the static HTML/CSS schema and API documentation framework for an interactive developer knowledge base holding over 200 searchable API entries."
  },
  {
    skill: "Long-Form Technical Writing",
    projectId: "proj-8",
    projectTitle: "AI Long-Form Content Creation System (Staged Document Planner)",
    evidence: "Constructed a layered context expander model generating 3,000+ word whitepapers in organized chapters, avoiding prompt decay."
  },
  {
    skill: "Content Performance Analytics",
    projectId: "proj-9",
    projectTitle: "AI Content Analytics Dashboard (Interactive Performance Watch)",
    evidence: "Crafted interactive analytical trackers using React charts to visualize engagement, prompt efficiency metrics, and word-count performance charts."
  },
  {
    skill: "AI Content Operational Frameworks",
    projectId: "proj-10",
    projectTitle: "AI Content Operations Framework (Governance & Guardrail Guard)",
    evidence: "Drafted an enterprise-level content-governance manual specifying safety benchmarks, rate boundaries, and model fallback mechanics."
  }
];
