import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Import basic data to embed in system prompts for zero-client leakage
import { cvData, atsKeywords, skillMappings } from "./src/data/resume.js";
import { projects } from "./src/data/projects.js";

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Interactive API for Chat with AI Recruiter Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Build standard chat system prompt
    const systemInstruction = `You are the Expert AI Recruiter Agent representing the candidate "Ahmad Ilham Fachrudin Nur Yahya", a highly certified AI Content Specialist.
Your task is to answer inquiries from remote recruiters, hiring managers, and team leaders about Ahmad's qualifications.

Ahmad's Key Details:
- Title: AI Content Specialist
- Certifications: "AI for Work & Career Readiness with Google AI Products" (Google AI & Hacktiv8 Indonesia) and "Dasar dan Penggunaan Generatif AI" (Codepolitan supported by Google.org & ADB).
- Over 2 years of independent experience as an AI Prompt Engineer & Content Specialist, and Lead Content Strategist (Volunteer) at Facebook Digital Design Community.
- Main Core Competencies: Google AI Studio, Advanced Prompt Engineering, SEO content copywriting, dynamic prompt libraries, reducing workflow cycle duration by 40%.
- Location: Kab. Malang, East Java, Indonesia. Willing to work globally Remote-first async.
- Languages: Indonesian (Native), English (Intermediate - highly fluent in written B2B technical documents & prompt-augmented localization).

Portfolio Project Categories (He has 10 COMPLETE, detailed projects!):
1. Enterprise AI Content Production Assembly
2. Multi-Turn Few-Shot Business Blogging Framework
3. Retrieval-Augmented Semantic Grounding System
4. Latent Semantic Optimizer & Content Tuning Workflow
5. Automated Content Quality Evaluation Program
6. Kanban-Aligned AI Editorial Scheduler
7. Interactive Developer Portal Guide & Portal Builder
8. Layered Context Whitepaper Generation System
9. Interactive AI Content Dashboard Tracker
10. Global AI Content Operations & Governance Playbook

Rules for your responses:
- Speak professionally, clearly, and concisely. Keep responses engaging and structured.
- Only support and highlight certifications and skills that Ahmad actually possesses.
- Focus ONLY on the role: "AI Content Specialist". Do NOT refer to him as general marketing managers, social media runners, or unrelated disciplines.
- Give concrete examples quoting his 10 portfolio projects when asked about his skills or experiences!
- Help the user understand how Ahmad's mix of technical prompt engineering, content strategy, and web markup skills (HTML/CSS) makes him the perfect asset for their content operations.`;

    // Format chat history for Gemini API content structure
    const contents = [];
    
    // Inject historical context if present
    for (const h of history) {
      contents.push({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      });
    }

    // Push current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      role: "model",
      content: response.text || "I was unable to generate a coherent response. Ask me anything about Ahmad's profile!",
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI agent services." });
  }
});

// Interactive API for Job Description Analysis (ATS Optimizer)
app.post("/api/analyze-job", async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim() === "") {
      return res.status(400).json({ error: "Job description is empty is required." });
    }

    const promptText = `Evaluate the following Job Description and see how it aligns with Ahmad Ilham Fachrudin Nur Yahya's profile as an AI Content Specialist.

Job Description to Evaluate:
"""
${jobDescription}
"""

Ahmad's Resume Reference:
- Title: AI Content Specialist
- Certifications:
  * "AI for Work & Career Readiness with Google AI Products" from Hacktiv8
  * "Dasar dan Penggunaan Generatif AI" supported by Google.org
- Technical Skills: Google AI Studio, Gemini API Prototyping, Prompt Engineering (Zero-Shot, Few-Shot, CoT), HTML/CSS, foundational Python, Latent Semantic SEO Optimization.
- Experience: 2+ Years automating text pipelines, constructing prompt templates in Google AI Studio, preventing context decay.

Portfolio Projects:
${JSON.stringify(projects.map(p => ({ id: p.id, title: p.title, category: p.category, keywords: p.atsKeywords })))}

Analyze the alignment and provide your assessment in structured JSON holding:
1. jobTitle: Str (Designation found in JD)
2. companyName: Str (Company name found in JD, or 'the host company')
3. extractedKeywords: Array of Strings (Key roles, technologies, or concepts from the JD)
4. matchedKeywords: Array of Strings (Keywords Ahmad matches perfectly)
5. missingKeywords: Array of Strings (Gaps or unment items)
6. matchScore: Number (0 to 100 based on keyword overlap and AI certifications match)
7. reasoning: Array of Strings (3-4 concise feedback items on why he matches and how his projects prove it)
8. suggestedProjects: Array of Strings (List of names of Ahmad's projects that prove these matches)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobTitle: { type: Type.STRING },
            companyName: { type: Type.STRING },
            extractedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            matchedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            matchScore: { type: Type.INTEGER },
            reasoning: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedProjects: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["jobTitle", "companyName", "extractedKeywords", "matchedKeywords", "missingKeywords", "matchScore", "reasoning", "suggestedProjects"],
        },
        temperature: 0.2,
      },
    });

    const resultText = response.text || "{}";
    const resultJson = JSON.parse(resultText);
    res.json(resultJson);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the job processing service." });
  }
});

// Configure Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
