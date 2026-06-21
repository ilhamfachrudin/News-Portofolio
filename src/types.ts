export interface Project {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  description: string;
  businessProblem: string;
  objective: string;
  role: string;
  toolsUsed: string[];
  workflow: string[];
  deliverables: string[];
  skillsDemonstrated: string[];
  atsKeywords: string[];
  recruiterValue: string;
  simulatedOutcome: string;
  githubUrl?: string;
  githubStars?: number;
  lastCommit?: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  description?: string;
}

export interface CVData {
  name: string;
  title: string;
  contact: {
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    portfolio: string;
  };
  summary: string;
  careerObjective: string;
  uniqueValueProposition: string;
  experience: Experience[];
  certifications: Certification[];
  languages: { language: string; level: string }[];
  achievements: string[];
  headline: string;
}
