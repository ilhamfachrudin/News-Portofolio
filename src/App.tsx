import React, { useState, useEffect, useRef } from "react";
import { 
  Brain, 
  Briefcase, 
  Award, 
  FileText, 
  CheckCircle, 
  X, 
  ChevronRight, 
  Search, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  Terminal, 
  Sliders, 
  BookOpen, 
  AlertCircle, 
  Activity, 
  RefreshCw,
  FolderOpen,
  Menu,
  Sun,
  Moon,
  Mail,
  Phone,
  MapPin,
  Printer,
  PlayCircle,
  ExternalLink,
  Cpu,
  Sparkles,
  Github,
  Star,
  GitBranch
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Data Imports
import { cvData, atsKeywords, skillMappings } from "./data/resume";
import { projects } from "./data/projects";
import { linkedinAssets, notionStructure, atsScores, recruiterReview } from "./data/branding";
import { Project } from "./types";
import ProjectPreviewModal from "./components/ProjectPreviewModal";

const detailedSkills = [
  {
    category: "AI & Prompt Engineering",
    skills: [
      { name: "Google AI Studio", level: 98, text: "98% (Expert / Certified)", desc: "Expertise in designing, testing, and optimizing multi-turn instructions & system prompts." },
      { name: "Prompt Engineering", level: 96, text: "96% (Expert)", desc: "Advanced techniques: Chain-of-Thought (CoT), Few-Shot examples, and structural constraints." },
      { name: "System Instructions", level: 98, text: "98% (Expert)", desc: "Engineering system-level directives to force strict style guides and prevent context decay." },
      { name: "Hallucination Mitigation", level: 94, text: "94% (Expert)", desc: "Applying temperature, Top-P, and factual grounding rules to maintain absolute safety." },
      { name: "LLM Tuning Parameters", level: 90, text: "90% (Advanced)", desc: "Balancing precision vs creativity through direct model parameters tuning." }
    ]
  },
  {
    category: "Content Operations & Architecture",
    skills: [
      { name: "SEO Content Architecture", level: 94, text: "94% (Expert)", desc: "Structuring text for search intent, Latent Semantic Indexing, and clean Markdown headers." },
      { name: "High-Fidelity Text Generation", level: 95, text: "95% (Expert)", desc: "Generating error-free technical content, manuals, tutorials, and structured JSON outputs." },
      { name: "Technical Content Layouts", level: 92, text: "92% (Advanced)", desc: "Representing information with standard HTML/CSS templates and hierarchical flows." },
      { name: "Brand Voice Calibration", level: 93, text: "93% (Advanced)", desc: "Mapping corporate persona guidelines to automatic system prompts without style drift." }
    ]
  },
  {
    category: "Grounding, Research & Ecosystem",
    skills: [
      { name: "RAG & Citation Grounding", level: 92, text: "92% (Advanced)", desc: "Feeding model factual spreadsheets, custom knowledge bases, and verified search grounding." },
      { name: "Source Validation", level: 94, text: "94% (Expert)", desc: "Rigorous cross-checking of generated figures, citations, and product guidelines compliance." },
      { name: "Notion Workspace Management", level: 93, text: "93% (Advanced)", desc: "Designing synchronized team logs, content pipelines calendars, and documentation tables." },
      { name: "HTML5/CSS3 Interfaces", level: 90, text: "90% (Advanced)", desc: "Slicing technical prose straight into clean responsive browser layouts." }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"resume" | "portfolio" | "ats" | "branding" | "chat">("resume");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme_mode");
      return saved === "dark";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("theme_mode", darkMode ? "dark" : "light");
  }, [darkMode]);
  
  // Resume specific state
  const [plainTextMode, setPlainTextMode] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Portfolio specific state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // ATS specific state
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [atsErrorMessage, setAtsErrorMessage] = useState<string | null>(null);

  // Chat specific state
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "model"; content: string }>>([
    { 
      role: "model", 
      content: "Hello! I am Ahmad's interactive AI Recruiter Assistant, certified in Google AI infrastructures. Ask me anything about Ahmad's prompt workflows, technical writing credentials, or projects." 
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  // Handle Copy Callback
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Categories helper
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // ATS analyzer trigger
  const runJobMatch = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    setAtsErrorMessage(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/analyze-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to process job description on server.");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setAtsErrorMessage(err.message || "An error occurred matching keywords.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Chat with AI Recruiter trigger
  const handleSendMessage = async (customMsg?: string) => {
    const textToSend = customMsg || chatMessage;
    if (!textToSend.trim() || chatLoading) return;

    const userMessage = { role: "user" as const, content: textToSend };
    setChatHistory((prev) => [...prev, userMessage]);
    if (!customMsg) setChatMessage("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory.slice(-10), // send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error("Server communication broken.");
      }

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: "model", content: data.content }]);
    } catch (err: any) {
      console.error(err);
      setChatHistory((prev) => [
        ...prev,
        { role: "model", content: "Apologies, I encountered a temporary connection issue. Please make sure your development server is online and running." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Convert Ahmad's CV to Plain Text to simulate ATS Scanners
  const getPlaintextSummary = () => {
    return `${cvData.name}
${cvData.title}
${cvData.contact.location} | Phone: ${cvData.contact.phone} | Email: ${cvData.contact.email}
LinkedIn: ${cvData.contact.linkedin} | Portfolio: ${cvData.contact.portfolio}

PROFESSIONAL SUMMARY
${cvData.summary}

CAREER OBJECTIVE
${cvData.careerObjective}

UNIQUE VALUE PROPOSITION
${cvData.uniqueValueProposition}

CORE COMPETENCIES
${atsKeywords.aiSkills.join(", ")}
${atsKeywords.contentSkills.join(", ")}
${atsKeywords.tools.join(", ")}

WORK EXPERIENCE
${cvData.experience
  .map(
    (exp) => `
${exp.role} | ${exp.company}
${exp.period} | ${exp.location}
${exp.highlights.map((h) => `- ${h}`).join("\n")}`
  )
  .join("\n")}

CERTIFICATIONS
${cvData.certifications
  .map(
    (cert) => `- ${cert.name} (${cert.issuer}) - ID: ${cert.credentialId} | ${cert.date}`
  )
  .join("\n")}

LANGUAGES
${cvData.languages.map((l) => `- ${l.language}: ${l.level}`).join("\n")}

EDUCATION
- Bachelor of Economics and Business (S1) – Accounting | University Terbuka (Malang, Indonesia) | 2021 – Present
  * In-depth focus on the principles of financial accounting, management accounting, and accounting.
  * Demonstrates analytical skills in basic financial reporting and auditing.
  * Demonstrates strong time management skills through distance learning.
- High School Diploma in Social Sciences | TUNAS HARAPAN HIGH SCHOOL (Malang, Indonesia) | 2018 – 2019

ACHIEVEMENTS
${cvData.achievements.map((a) => `- ${a}`).join("\n")}`;
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans antialiased transition-colors duration-300 ${darkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Sidebar Navigation - Left Panel on desktop */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shrink-0 border-r border-[#1e293b]">
        {/* Sidebar Header branding */}
        <div className="p-6 border-b border-slate-850">
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">AI CONTENT SPECIALIST</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Recruiter-First Interface</p>
        </div>

        {/* Sidebar scrollable list */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab("resume")}
            className={`w-full px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors text-left ${
              activeTab === "resume"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "resume" ? "bg-white animate-pulse" : "bg-transparent"}`}></div>
            <FileText className="w-4 h-4 shrink-0 text-indigo-300" />
            <span className="truncate">ATS CV & Skill Map</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`w-full px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors text-left ${
              activeTab === "portfolio"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "portfolio" ? "bg-white animate-pulse" : "bg-transparent"}`}></div>
            <FolderOpen className="w-4 h-4 shrink-0 text-indigo-300" />
            <span className="truncate">Portfolio (10 Projects)</span>
          </button>

          <button
            onClick={() => setActiveTab("ats")}
            className={`w-full px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors text-left ${
              activeTab === "ats"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "ats" ? "bg-white animate-pulse" : "bg-transparent"}`}></div>
            <Sliders className="w-4 h-4 shrink-0 text-indigo-300" />
            <span className="truncate">Interactive ATS Optimizer</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`w-full px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors text-left ${
              activeTab === "chat"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "chat" ? "bg-white animate-pulse" : "bg-transparent"}`}></div>
            <Brain className="w-4 h-4 shrink-0 text-indigo-300" />
            <span className="truncate">AI Recruiter Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("branding")}
            className={`w-full px-3 py-2.5 rounded-md text-sm font-medium flex items-center gap-3 transition-colors text-left ${
              activeTab === "branding"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "branding" ? "bg-white animate-pulse" : "bg-transparent"}`}></div>
            <Linkedin className="w-4 h-4 shrink-0 text-indigo-300" />
            <span className="truncate">LinkedIn & Notion Assets</span>
          </button>
        </nav>

        {/* Sidebar bottom Profile panel */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="/src/assets/images/profile_photo_1782022341766.jpg" 
              alt={cvData.name} 
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/80 shrink-0" 
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{cvData.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{cvData.title}</p>
            </div>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full">
            <div className="h-1 bg-green-400 rounded-full w-[94%]"></div>
          </div>
          <p className="text-[10px] mt-2 text-slate-400">Profile Optimization: 94%</p>
        </div>
      </aside>

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Mobile Top Header (only visible on mobile) */}
        <header className="bg-slate-900 text-white px-4 py-3 flex md:hidden items-center justify-between shrink-0 border-b border-slate-850">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-400" />
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white">AI CONTENT SPECIALIST</h1>
              <p className="text-[8px] uppercase tracking-widest text-[#94a3b8]">Ahmad's Suite</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Slidout Nav menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-14 left-0 right-0 z-40 bg-slate-900 border-b border-slate-800 p-4 md:hidden shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { setActiveTab("resume"); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "resume" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4 text-indigo-300" />
                  <span>ATS CV & Skill Map</span>
                </button>
                <button
                  onClick={() => { setActiveTab("portfolio"); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "portfolio" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <FolderOpen className="w-4 h-4 text-indigo-300" />
                  <span>Portfolio (10 Projects)</span>
                </button>
                <button
                  onClick={() => { setActiveTab("ats"); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "ats" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Sliders className="w-4 h-4 text-indigo-300" />
                  <span>Interactive ATS Optimizer</span>
                </button>
                <button
                  onClick={() => { setActiveTab("chat"); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "chat" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Brain className="w-4 h-4 text-indigo-300" />
                  <span>AI Recruiter Chat</span>
                </button>
                <button
                  onClick={() => { setActiveTab("branding"); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 rounded-md text-xs font-medium flex items-center gap-3 transition-colors ${
                    activeTab === "branding" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-indigo-300" />
                  <span>LinkedIn & Notion Assets</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Uppermost Bar: Role alignment details */}
        <div className="bg-slate-900 text-slate-100 py-1.5 px-6 text-[10px] md:text-xs font-mono flex flex-wrap justify-between items-center gap-2 border-b border-slate-950 shrink-0 select-none no-print">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ROLE SPECIFICATION: SENIOR AI CONTENT SPECIALIST EXPERTISE</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>MALANG, EAST JAVA</span>
            <span>●</span>
            <span>GLOBAL REMOTE ASYNC-READY</span>
          </div>
        </div>

        {/* Main Header from Theme Design */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between px-6 md:px-8 py-4 md:py-0 md:h-20 shrink-0 gap-3 transition-colors duration-300 no-print">
          <div>
            <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-white">Package Strategy: {cvData.title}</h2>
            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Specialist Level: Specialist (2+ Years Verified Credentials) • Status: Recruiter Ready</p>
          </div>
          <div className="flex items-center gap-6 shrink-0 border-t border-slate-100 dark:border-slate-850 pt-3 md:pt-0 md:border-0">
            {/* Elegant Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-950 transition-all shadow-sm cursor-pointer"
              title="Toggle theme mode"
              id="theme-mode-toggle"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-[10px] font-bold font-mono tracking-wider hidden sm:inline uppercase text-amber-500">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="text-[10px] font-bold font-mono tracking-wider hidden sm:inline uppercase text-slate-600">DARK MODE</span>
                </>
              )}
            </button>

            <div className="text-right pr-6 border-r border-slate-200 dark:border-slate-800">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">ATS MATCH RATE</p>
              <p className="text-xl md:text-2xl font-bold text-indigo-600 font-mono">{atsScores.overallScore}/100</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">PORTFOLIO ASSETS</p>
              <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 font-mono">{projects.length} Verified</p>
            </div>
          </div>
        </header>

        {/* Dynamic content canvas scrolling area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 space-y-6">

          <AnimatePresence mode="wait">
            
            {/* TAB 1: CV AND ALIGNMENT MAPPING */}
            {activeTab === "resume" && (
              <motion.div
                key="resume"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
                id="printable-cv-area"
              >
                
                {/* Special Focus Advisory Panel */}
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-3 no-print">
                  <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-indigo-800">
                    <strong>Specialist Focus Statement:</strong> In alignment with standard remote recruiter practices, this asset catalog has been optimized strictly for <strong>AI Content Specialist</strong> workflows (covering structured system prompt design, semantic SEO content layout, fact grounding, quality checkers, and HTML formatting integrations). It purposely avoids marketing management, generic prompting, or legacy SEO copywriting keywords to maximize search relevancy.
                  </p>
                </div>

                {/* Profile Spotlight Banner */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm shadow-indigo-100/10 transition-all">
                  <div className="flex flex-col md:flex-row gap-6 md:items-center">
                    {/* Rounded Profile Headshot */}
                    <div className="relative shrink-0 mx-auto md:mx-0">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                      <img
                        src="/src/assets/images/profile_photo_1782022341766.jpg"
                        alt={cvData.name}
                        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-white dark:border-slate-950 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1.5 right-1.5 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>

                    {/* Meta Details */}
                    <div className="text-center md:text-left space-y-3 flex-1">
                      <div>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                          <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-full uppercase border border-indigo-100/40 dark:border-indigo-950">
                            Remote Ready
                          </span>
                          <span className="bg-green-50 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-[9px] font-bold font-mono tracking-wider px-2 py-0.5 rounded-full uppercase border border-green-100/40 dark:border-green-950">
                            Verified Expert
                          </span>
                        </div>
                        <h1 className="text-lg md:text-2xl font-extrabold text-slate-850 dark:text-white tracking-tight">{cvData.name}</h1>
                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 font-mono mt-0.5">{cvData.title} & AI Prompt Architect</p>
                      </div>

                      {/* Micro Contact Pills */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-4 text-[11px] text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{cvData.contact.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{cvData.contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>Remote | Malang, Indonesia</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                          <a href={cvData.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-600 underline">LinkedIn</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CV Presentation Mode Control Banner */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm no-print">
                  <div>
                    <h3 className="font-bold text-sm text-slate-850">ATS Presentation Modes</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Test compatibility with standard parser interfaces.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPlainTextMode(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border transition-colors ${
                        !plainTextMode 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      Formatted Grid View
                    </button>
                    <button
                      onClick={() => setPlainTextMode(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border flex items-center gap-1.5 transition-colors ${
                        plainTextMode 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      ATS Plain-Text Output
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold font-mono border flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 transition-colors shadow-sm cursor-pointer"
                      title="Print CV or save as PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print CV to PDF
                    </button>
                  </div>
                </div>

                {plainTextMode ? (
                  // Plain-Text Copyable ATS Emulation View
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-xs font-bold font-mono text-slate-400 tracking-wider">EMULATION SCREEN (PLAIN TEXT PARSER VIEW)</span>
                      <button
                        onClick={() => handleCopy(getPlaintextSummary(), "plaintext")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-colors no-print"
                      >
                        {copiedText === "plaintext" ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy Plain-Text CV
                      </button>
                    </div>
                    <pre className="p-5 bg-slate-900 text-slate-100 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[600px] border border-slate-950">
                      {getPlaintextSummary()}
                    </pre>
                  </div>
                ) : (
                  // Premium Polished UI View
                  <div className="space-y-6">
                    
                    {/* Upper Professional Profiles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: summary cards */}
                      <div className="md:col-span-7 flex flex-col gap-6">
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Brand Alignment</h3>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 mb-4">
                            <p className="text-[10px] font-bold text-indigo-600 mb-1 italic uppercase tracking-wider">Ahmad's Professional Summary</p>
                            <p className="text-xs leading-relaxed text-slate-700 font-medium">
                              {cvData.summary}
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <p className="text-[10px] font-bold text-indigo-600 mb-1 italic uppercase tracking-wider">Career Objective</p>
                            <p className="text-xs leading-relaxed text-slate-600">
                              {cvData.careerObjective}
                            </p>
                          </div>
                        </section>
                      </div>

                      {/* Right: Unique valuation and Achievements */}
                      <div className="md:col-span-5 flex flex-col gap-6">
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1">
                          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-4">Unique Value Proposition</h4>
                          <p className="text-xs leading-relaxed text-slate-700 font-medium p-3.5 bg-indigo-50/50 rounded-lg border border-indigo-100/40 mb-5">
                            {cvData.uniqueValueProposition}
                          </p>

                          <h4 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Key Achievements Summary</h4>
                          <ul className="text-xs text-slate-600 space-y-2.5">
                            {cvData.achievements.map((a, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold mt-0.5">✔</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </div>

                    {/* Timeline of Work Experiences */}
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        Professional Work Experience Timeline
                      </h3>
                      <div className="space-y-8 pl-4 border-l-2 border-slate-200">
                        {cvData.experience.map((exp) => (
                          <div key={exp.id} className="relative group">
                            {/* Dot line helper */}
                            <span className="absolute -left-[24px] top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white group-hover:bg-indigo-600 transition-colors" />
                            <div className="flex flex-wrap justify-between items-baseline mb-2 gap-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
                                  {exp.role}
                                </span>
                                <h4 className="font-bold text-xs text-slate-850">{exp.company}</h4>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 font-bold">{exp.period} | {exp.location}</span>
                            </div>
                            <ul className="text-xs text-slate-600 space-y-2 mt-3 list-disc pl-4 leading-relaxed">
                              {exp.highlights.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications and Languages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Certifications */}
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                          <Award className="w-4 h-4 text-indigo-600" />
                          Validated AI Credentials
                        </h3>
                        <div className="space-y-4">
                          {cvData.certifications.map((cert, index) => (
                            <div key={index} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                              <h4 className="text-xs font-semibold text-slate-800 leading-tight mb-1">{cert.name}</h4>
                              <p className="text-[10px] font-mono text-slate-400 mb-2">{cert.issuer} | {cert.date}</p>
                              <div className="bg-white text-[9px] text-slate-500 p-2 rounded border border-slate-150 font-mono leading-none">
                                CREDENTIAL ID: {cert.credentialId}
                              </div>
                              {cert.description && (
                                <p className="text-[10px] text-slate-500 mt-2 italic leading-relaxed">{cert.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Languages and Education */}
                      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 mb-5 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Sliders className="w-4 h-4 text-indigo-600" />
                            Validated Language Skills
                          </h3>
                          <div className="space-y-3 mb-6">
                            {cvData.languages.map((l, i) => (
                              <div key={i} className="p-3.5 bg-slate-50 border border-slate-100 rounded-lg">
                                <div className="flex justify-between items-center mb-1 flex-wrap gap-1">
                                  <span className="font-bold text-xs text-slate-800">{l.language}</span>
                                  <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                                    {l.language === "English" ? "INTERMEDIATE AI-AUGMENTED" : "NATIVE"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">{l.level}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Education info panel */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl text-xs space-y-4">
                          <h4 className="font-bold text-[10px] font-mono text-indigo-800 dark:text-indigo-400 uppercase tracking-wider">Education Details</h4>
                          
                          <div className="border-b border-slate-200 dark:border-slate-850 pb-3">
                            <p className="font-bold text-slate-850 dark:text-slate-100">UNIVERSITY TERBUKA | Malang, Indonesia</p>
                            <p className="text-slate-650 dark:text-slate-300 font-semibold text-[11px] mt-0.5">Bachelor of Economics and Business (S1) – Accounting | 2021 – Present</p>
                            <ul className="list-disc pl-4 mt-2 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                              <li>In-depth focus on the principles of financial accounting, management accounting, and accounting.</li>
                              <li>Demonstrates analytical skills in basic financial reporting and auditing.</li>
                              <li>Demonstrates strong time management skills through distance learning.</li>
                            </ul>
                          </div>
                          
                          <div className="pt-1">
                            <p className="font-bold text-slate-850 dark:text-slate-100">TUNAS HARAPAN HIGH SCHOOL | Malang, Indonesia</p>
                            <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">High School Diploma in Social Sciences | 2018 – 2019</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed italic">Focusing on written technical structures, research analytics patterns, and local digital operations.</p>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Validated Core Competencies & Proficiency Metrics */}
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b border-slate-100 pb-4">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-indigo-600 animate-pulse" />
                          Validated Core Competencies & Proficiency Metrics
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          A direct visual breakdown of Ahmad's technical mastery and parameter-level command under recruiters' active requirements.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {detailedSkills.map((categoryGroup, catIdx) => (
                          <div key={catIdx} className="space-y-4">
                            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                              {categoryGroup.category === "AI & Prompt Engineering" ? (
                                <Brain className="w-4 h-4 text-indigo-605 text-indigo-600" />
                              ) : categoryGroup.category === "Content Operations & Architecture" ? (
                                <Sliders className="w-4 h-4 text-indigo-605 text-indigo-600" />
                              ) : (
                                <Search className="w-4 h-4 text-indigo-605 text-indigo-600" />
                              )}
                              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{categoryGroup.category}</h4>
                            </div>

                            <div className="space-y-4">
                              {categoryGroup.skills.map((skill, sIdx) => (
                                <div key={sIdx} className="space-y-1.5 bg-slate-50/50 p-3 rounded-lg border border-slate-100/60 hover:bg-slate-50/80 transition-colors">
                                  <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                                    <span className="text-[10px] font-mono font-bold text-indigo-650 text-indigo-600">{skill.text}</span>
                                  </div>
                                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${skill.level}%` }}
                                      transition={{ duration: 1, delay: sIdx * 0.1 }}
                                      className="h-full bg-indigo-600 rounded-full"
                                    />
                                  </div>
                                  <p className="text-[10px] text-slate-500 leading-normal italic">{skill.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step 6: CV & PORTFOLIO ALIGNMENT PROOF TABLE */}
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                      <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                        <h4 className="text-sm font-bold text-green-800 flex items-center gap-1.5 mb-1">
                          <CheckCircle className="w-4 h-4" />
                          Step 6 Verification: CV & Portfolio Audit Alignment Complete
                        </h4>
                        <p className="text-xs text-green-700 leading-relaxed">
                          Recruiters regularly search for missing proof. Below is the strict alignment validation table proving that every single keyword and competency stated on Ahmad's CV is objectively verified by a dedicated portfolio asset.
                        </p>
                      </div>

                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 font-mono text-slate-400 uppercase text-[9px] tracking-wider select-none">
                              <th className="p-3 font-bold">Key Competency / Skill</th>
                              <th className="p-3 font-bold">Demonstrated In Project</th>
                              <th className="p-3 font-bold">Concrete Factual Evidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-600 font-sans">
                            {skillMappings.map((map, index) => (
                              <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                                <td className="p-3 font-bold text-slate-800">{map.skill}</td>
                                <td className="p-3 text-indigo-650 font-bold font-mono text-[10px]">{map.projectTitle}</td>
                                <td className="p-3 leading-relaxed text-slate-500 text-[11px]">{map.evidence}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            )}

            {/* TAB 2: 10-PROJECT INTERACTIVE PORTFOLIO */}
            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">AI Portfolio Showcase (10 Active Projects)</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Click any project card to expand precise workflows, KPIs, objectives and direct remote recruiter values.
                    </p>
                  </div>
                  <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    Step 3 & 4 Verified
                  </span>
                </div>

                {/* Filter category bar */}
                <div className="flex flex-wrap gap-1.5 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setExpandedProject(null);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-colors ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 hover:bg-slate-105 text-slate-600 border border-slate-150"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Premium Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects
                    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
                    .map((project) => {
                      const isExpanded = expandedProject === project.id;
                      return (
                        <div
                          key={project.id}
                          className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                            isExpanded 
                              ? "border-indigo-600 ring-2 ring-indigo-50 md:col-span-2" 
                              : "border-slate-200 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.015] cursor-pointer"
                          }`}
                          onClick={() => !isExpanded && setExpandedProject(project.id)}
                        >
                          <div className="p-6">
                            
                            {/* Inner Header tags */}
                            <div className="flex justify-between items-start gap-4 mb-3 flex-wrap">
                              <span className="text-[9px] font-bold text-indigo-700 uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-800">
                                {project.category}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 font-bold">PROJECT ID: {project.id}</span>
                            </div>

                            {/* GitHub Live Tracker Badges */}
                            <div className="flex items-center gap-2 mb-2.5 flex-wrap select-none no-print">
                              {project.githubStars !== undefined && (
                                <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 dark:bg-amber-955/20 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40 rounded px-1.5 py-0.5 font-mono font-bold shadow-sm">
                                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 dark:text-amber-400" />
                                  {project.githubStars} Stars
                                </span>
                              )}
                              {project.lastCommit && (
                                <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 dark:bg-emerald-955/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/40 rounded px-1.5 py-0.5 font-mono font-semibold shadow-sm">
                                  <GitBranch className="w-2.5 h-2.5 text-emerald-500 dark:text-emerald-450" />
                                  Active: {project.lastCommit}
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-slate-850 mb-2">{project.title}</h4>
                            
                            {/* Short / Long descriptions */}
                            <p className="text-xs text-slate-500 leading-relaxed mb-4">
                              {isExpanded 
                                ? project.description 
                                : `${project.description.slice(0, 185)}...`}
                            </p>

                            {/* Keywords Matrix Pills */}
                            <div className="flex flex-wrap gap-1.5 mb-4 select-none">
                              {project.atsKeywords.map((k, idx) => (
                                <span key={idx} className="bg-slate-50 text-slate-650 border border-slate-150 text-[10px] px-2 py-0.5 rounded font-mono font-medium">
                                  #{k}
                                </span>
                              ))}
                            </div>

                            {!isExpanded ? (
                              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 flex-wrap gap-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedProject(project.id);
                                  }}
                                  className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                                >
                                  Review Detailed Workflow & KPIs
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewProject(project);
                                  }}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm hover:shadow transition-all hover:-translate-y-0.5 cursor-pointer no-print"
                                >
                                  <PlayCircle className="w-3.5 h-3.5" />
                                  Live Preview
                                </button>
                              </div>
                            ) : (
                              // Expanded section
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="border-t border-slate-100 pt-5 mt-5 space-y-6"
                                onClick={(e) => e.stopPropagation()} 
                              >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs leading-relaxed">
                                  
                                  {/* Problem objective context */}
                                  <div className="space-y-4">
                                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-indigo-800">Business Problem Faced</h5>
                                      <p className="text-slate-600 mt-1">{project.businessProblem}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-indigo-800">Project Objective</h5>
                                      <p className="text-slate-600 mt-1">{project.objective}</p>
                                    </div>
                                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-indigo-800">Simulating My Explicit Role</h5>
                                      <p className="text-slate-600 mt-1">{project.role}</p>
                                    </div>
                                    <div>
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1.5">Stack & Technical Tools</h5>
                                      <div className="flex flex-wrap gap-1">
                                        {project.toolsUsed.map((t, i) => (
                                          <span key={i} className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                                            {t}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Workflow pipelines list */}
                                  <div className="space-y-4">
                                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-emerald-800 mb-2">Workflow & Optimization Pipeline</h5>
                                      <ol className="list-decimal pl-4 space-y-2 text-slate-600 text-[11px]">
                                        {project.workflow.map((step, idx) => (
                                          <li key={idx}><strong>Step {idx + 1}:</strong> {step}</li>
                                        ))}
                                      </ol>
                                    </div>
                                    <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                                      <h5 className="font-bold font-mono text-[9px] uppercase tracking-wider text-emerald-800 mb-1.5">Concrete Deliverables</h5>
                                      <ul className="list-disc pl-4 space-y-1 text-slate-600 text-[11px]">
                                        {project.deliverables.map((d, idx) => (
                                          <li key={idx}>{d}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>

                                </div>

                                {/* Outcomes alignment box */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-900 rounded-xl p-5 text-white shadow-sm border border-indigo-950">
                                  <div>
                                    <h5 className="font-bold font-mono text-[9px] text-indigo-200 uppercase tracking-wider">RECRUITER ALIGNMENT VALUE</h5>
                                    <p className="text-indigo-100 mt-1 leading-relaxed text-[11px]">{project.recruiterValue}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-bold font-mono text-[9px] text-green-300 uppercase tracking-wider">
                                      {project.id === "proj-10" 
                                        ? "MEASURABLE OUTCOME (DEMO LIVE)" 
                                        : "MEASURABLE OUTCOME (PROTOTIPE FISIK/NYATA YANG KHUSUS DITUJUKAN UNTUK KEBUTUHAN)"
                                      }
                                    </h5>
                                    <p className="text-green-100 font-semibold mt-1 leading-relaxed text-[11px]">{project.simulatedOutcome}</p>
                                  </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 flex-wrap gap-2">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <button
                                      onClick={() => setPreviewProject(project)}
                                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg text-xs font-bold font-mono shadow-sm hover:shadow transition-all hover:-translate-y-0.5 cursor-pointer no-print animate-pulse"
                                    >
                                      <PlayCircle className="w-4 h-4 text-indigo-200" />
                                      {project.id === "proj-10" ? "Launch Live Demo" : "Jalankan Prototipe Fisik/Nyata"}
                                    </button>
                                    {project.githubUrl && (
                                      <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-905 dark:hover:bg-slate-850 text-slate-705 dark:text-slate-201 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold font-mono shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer no-print"
                                      >
                                        <Github className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                        View Source Code
                                      </a>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => setExpandedProject(null)}
                                    className="px-3 py-1.5 bg-white border border-slate-250 text-xs font-mono font-bold rounded-lg hover:bg-slate-5 bg-[#fafafa] flex items-center gap-1.5 text-slate-700 cursor-pointer"
                                  >
                                    <X className="w-3.5 h-3.5 text-slate-500" /> Close Detailed Case
                                  </button>
                                </div>
                              </motion.div>
                            )}

                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Recruiter Verdict persistent seal banner */}
                <section className="bg-indigo-950 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between text-white shadow-lg border border-slate-950 gap-4 mt-8">
                  <div>
                    <h3 className="text-sm font-bold tracking-wide text-indigo-200 font-mono uppercase">Validated Recruiter Verdict</h3>
                    <p className="text-[11px] md:text-xs text-indigo-100 max-w-xl mt-1.5 leading-relaxed italic">
                      "Ahmad demonstrates the rare intersection of certified prompt architecture, technical writing standards and remote operations compliance. Exceptional asset for fast-moving startups and organizations seeking immediate impact."
                    </p>
                  </div>
                  <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 shrink-0 text-center sm:text-right w-full sm:w-auto">
                    <p className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider">Recommendation STATUS</p>
                    <p className="text-sm font-black text-white mt-0.5">APPROVED HIRE (100% READY)</p>
                  </div>
                </section>

              </motion.div>
            )}

            {/* TAB 3: ATS MATCH ENGINE */}
            {activeTab === "ats" && (
              <motion.div
                key="ats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Parameter Panel: scoreboard summary */}
                  <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">ATS Compliance Indicators</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Baseline scores recorded for Ahmad across global screening regulations for senior AI content specialists.
                        </p>
                      </div>

                      {/* Score display radial */}
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-white border-4 border-indigo-500 mb-4 shadow-sm">
                          <span className="text-3xl font-black font-mono text-slate-800">{atsScores.overallScore}%</span>
                          <span className="absolute -bottom-2 bg-indigo-600 text-white text-[8px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold">APPROVED</span>
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">OVERALL PARSE SCORE</p>
                      </div>

                      {/* Breakdown criteria list */}
                      <div className="space-y-4">
                        {atsScores.breakdown.map((item, index) => (
                          <div key={index} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-slate-850">{item.name}</span>
                              <span className="font-mono text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-bold text-[10px]">
                                {item.score}%
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 leading-normal">{item.explanation}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Right interactive optimizer workspace */}
                  <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                      
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <Sliders className="w-5 h-5 text-indigo-600" />
                          Dynamic ATS Keyword Match Optimizer
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                          Test Ahmad's immediate fit against any live remote job description. Paste any senior or specialist <strong>AI Content Specialist</strong> job requirement details, and our server-side LLM engine will map skill alignments, highlight verified project proofs, and extract gaps.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste a live target job description here... (e.g., We are looking for an AI Content Specialist to manage prompt catalogs, write Google AI Studio templates, minimize hallucinations, and format production-level HTML pages...) "
                          rows={6}
                          className="w-full text-xs p-4 bg-slate-50 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono leading-relaxed text-slate-800"
                        />

                        <div className="flex flex-wrap gap-3 justify-between items-center text-xs">
                          <button
                            onClick={() => setJobDescription(`We are looking for a remote AI Content Specialist with 2+ years of experience in content operations, system instructions within Google AI Studio, and prompt development (zero-shot, few-shot, CoT). The role requires collaborating with developers, managing technical writing layout pipelines using HTML/CSS, and mitigating LLM hallucination risks.`)}
                            className="text-indigo-600 hover:text-indigo-800 font-mono font-bold underline hover:no-underline text-[11px]"
                          >
                            ⚡ Load Sample Remote Job Spec
                          </button>
                          
                          <button
                            onClick={runJobMatch}
                            disabled={analyzing || !jobDescription.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-lg text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
                          >
                            {analyzing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                            Scout Match Metrics
                          </button>
                        </div>
                      </div>

                      {atsErrorMessage && (
                        <div className="p-4 bg-red-50 border border-red-150 rounded-lg text-xs text-red-850 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <p>{atsErrorMessage}</p>
                        </div>
                      )}

                      {/* Display Results */}
                      <AnimatePresence>
                        {analysisResult ? (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-6 text-xs leading-relaxed"
                          >
                            <div className="flex justify-between items-start border-b border-slate-200 pb-4 flex-wrap gap-4 select-none">
                              <div>
                                <span className="text-[9px] font-mono uppercase font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                                  AST Match Evaluation Complete
                                </span>
                                <h4 className="text-xs font-bold text-slate-800 mt-2">
                                  Target Role Analyzed: {analysisResult.jobTitle}
                                </h4>
                                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                                  Source Entity: {analysisResult.companyName}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-2xl font-mono font-bold text-indigo-650">{analysisResult.matchScore}%</span>
                                <span className="text-[9px] font-mono text-indigo-900 font-bold bg-indigo-100 px-2.5 py-1 rounded">
                                  COMPATIBILITY
                                </span>
                              </div>
                            </div>

                            {/* Keywords categories columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-200">
                              <div>
                                <h5 className="font-bold text-slate-700 mb-2.5 text-[9px] font-mono uppercase tracking-wider">EXTRACTED CORE SKILLS SPECIFIED</h5>
                                <div className="flex flex-wrap gap-1">
                                  {analysisResult.extractedKeywords.map((tag: string, i: number) => (
                                    <span key={i} className="bg-white border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded font-mono">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h5 className="font-bold text-slate-700 mb-2.5 text-[9px] font-mono uppercase tracking-wider">AHMAD'S MATCHING EVIDENCE</h5>
                                <div className="flex flex-wrap gap-1">
                                  {analysisResult.matchedKeywords.map((tag: string, i: number) => (
                                    <span key={i} className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                                      ✔ {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Skills Gaps Warnings */}
                            {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 && (
                              <div className="bg-amber-50/55 border border-amber-100 rounded-lg p-3.5">
                                <h5 className="font-mono text-[9px] text-amber-850 font-bold uppercase tracking-wider mb-1">POSSIBLE SPECIFICATION DRIFTS LISTED</h5>
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {analysisResult.missingKeywords.map((tag: string, i: number) => (
                                    <span key={i} className="text-amber-800 text-[10px] bg-white px-2 py-0.5 rounded font-mono border border-amber-100">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <p className="text-[10px] text-amber-700 mt-2 italic leading-tight">Note: Gaps represent localized auxiliary tools, completely offset by Ahmad's rapid adaptability workflows.</p>
                              </div>
                            )}

                            {/* Reasoning commentary */}
                            <div>
                              <h5 className="font-bold text-slate-700 text-[9px] font-mono uppercase mb-2">RECRUITMENT REASONING & ANALYSIS</h5>
                              <ul className="space-y-1.5 text-slate-650">
                                {analysisResult.reasoning.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2 text-xs">
                                    <span className="text-indigo-600 font-bold mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Project proofs suggested */}
                            <div className="p-4 bg-white border border-slate-150 rounded-lg space-y-1">
                              <h5 className="font-bold text-slate-800 text-[9px] font-mono uppercase tracking-wider">OBJECTIVE PROOF ASSIGNED</h5>
                              <div className="flex flex-wrap gap-1.5 pt-1.5 select-none">
                                {analysisResult.suggestedProjects.map((pName: string, i: number) => (
                                  <span key={i} className="bg-indigo-50 text-indigo-700 text-[10px] font-mono border border-indigo-100 px-2.5 py-1 rounded-md font-bold">
                                    📂 {pName}
                                  </span>
                                ))}
                              </div>
                              <p className="text-[10px] text-slate-400 pt-2 leading-tight">Consult these projects in Tab 2 to examine step-by-step artifacts backing this capability.</p>
                            </div>

                          </motion.div>
                        ) : (
                          !analyzing && (
                            <div className="py-12 text-center text-xs text-slate-400 bg-slate-50 border-2 border-dashed border-slate-205 rounded-xl flex flex-col items-center justify-center">
                              <Activity className="w-8 h-8 text-slate-300 mb-2 animate-pulse" />
                              <p className="font-medium">No live job description matched yet.</p>
                              <p className="text-[11px] mt-0.5">Insert a job query requirements details above to initiate live compliance verification.</p>
                            </div>
                          )
                        )}
                      </AnimatePresence>

                    </div>
                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB 4: INTERACTIVE AI CHAT & REVIEW */}
            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                
                {/* Executive Report Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Step 1 responsibilities */}
                  <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                    <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider block w-max select-none">
                      STEP 1 ROLE COMPLIANCE
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">Operational Role Analysis</h3>
                    
                    <div className="space-y-4 text-xs leading-relaxed text-slate-600">
                      <div>
                        <h4 className="font-bold text-slate-800">Critical Daily Responsibilities</h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Drafting target-specific system instructions, prompt structure debugging, establishing fact RAG grounding mechanisms on draft texts, and laying out copy outputs using compliant HTML/CSS wrappers.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Remote Collaboration Standards</h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Relying on clear, concise written directives, GitHub log tracking, asynchronous feedback coordination, and strict template version control.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">Technical Skill Standards</h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Google AI Studio parameter manipulation (temperature, Top-K/P limits), few-shot structuring, structural JSON parsers, and browser-safe styling syntax.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 10: executive reviews */}
                  <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 inline-block uppercase select-none">
                          Step 10 Executive Report
                        </span>
                        <h3 className="text-sm font-bold text-slate-850 mt-2">Professional Recruiter Review Verdict</h3>
                      </div>
                      <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-[10px] font-mono font-semibold">
                        RECOMMENDED HIRE
                      </span>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-slate-650">
                      <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                        <strong className="text-slate-800 font-mono text-[9px] block uppercase text-slate-400 mb-1 select-none">First Impression Summary</strong>
                        <p className="text-slate-600">{recruiterReview.firstImpression}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <strong className="text-slate-800 font-mono text-[9px] block uppercase text-green-600 mb-1 select-none">Strengths Highlighted</strong>
                          <ul className="list-disc pl-4 mt-1.5 space-y-1.5 text-slate-500 text-[11px]">
                            {recruiterReview.strengths.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-slate-800 font-mono text-[9px] block uppercase text-amber-800 mb-1 select-none">Possible Concerns & Mitigation</strong>
                          <p className="mt-1.5 text-slate-500 text-[11px]">{recruiterReview.weaknesses[0]}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-green-50 text-green-800 border border-green-100 p-3 rounded-lg text-[11px] font-medium leading-none">
                        <span>Candidate Interview Readiness Status:</span>
                        <span className="font-bold">100% READY</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Interactive AI recruiter screen panel */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[525px] bg-white">
                  
                  {/* Chat logs upper bar */}
                  <div className="bg-slate-900 text-white p-4 flex justify-between items-center select-none shrink-0 border-b border-slate-950">
                    <div className="flex items-center gap-2.5">
                      <Brain className="w-4 h-4 text-indigo-400" />
                      <div>
                        <h4 className="text-xs font-bold font-mono text-white">Ahmad Ilham Fachrudin Nur Yahya Interactive Screening</h4>
                        <p className="text-[9px] text-[#94a3b8]">Operational Client-Face Screening</p>
                      </div>
                    </div>
                    <span className="bg-emerald-600 text-[8px] font-mono font-bold px-2 py-0.5 rounded text-white tracking-widest leading-none">ONLINE MATCH</span>
                  </div>

                  {/* Chat scrolling log */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
                    {chatHistory.map((item, index) => (
                      <div key={index} className={`flex ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[80%] rounded-xl p-3.5 shadow-sm leading-relaxed ${
                          item.role === "user" 
                            ? "bg-indigo-650 text-white" 
                            : "bg-white text-slate-800 border border-slate-200"
                        }`}>
                          {item.role === "model" && (
                            <span className="text-[9px] font-mono font-bold text-indigo-600 block mb-1 uppercase tracking-wider">
                              AI AGENT
                            </span>
                          )}
                          <p className="whitespace-pre-wrap text-[11px]">{item.content}</p>
                        </div>
                      </div>
                    ))}

                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white text-slate-800 border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-2.5">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                          <span className="text-[10px] font-mono italic text-slate-400">Generatively reasoning alignments...</span>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Question suggestions pills */}
                  <div className="p-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5 text-[10px] font-mono shrink-0 select-none">
                    <span className="text-slate-400 px-1 whitespace-nowrap self-center font-bold uppercase tracking-wide text-[9px]">recruiter hints:</span>
                    <button 
                      onClick={() => handleSendMessage("What key certified prompt credentials does Ahmad hold?")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-550 rounded px-2 py-1 text-left cursor-pointer transition-colors"
                    >
                      # Certifications?
                    </button>
                    <button 
                      onClick={() => handleSendMessage("Explain Project 3 - Retrieval Semantic Grounding and how it prevents hallucinations.")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-550 rounded px-2 py-1 text-left cursor-pointer transition-colors"
                    >
                      # Preventing Hallucinations?
                    </button>
                    <button 
                      onClick={() => handleSendMessage("Tell me about Ahmad's technical coding experience in HTML and CSS.")}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-550 rounded px-2 py-1 text-left cursor-pointer transition-colors"
                    >
                      # HTML & CSS?
                    </button>
                  </div>

                  {/* Input controls form */}
                  <div className="p-3 border-t border-slate-200 bg-white flex gap-2 shrink-0">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      placeholder="Ask me any professional screening alignments... (e.g., What are Ahmad's prompt ops skills?)"
                      className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-0 font-mono text-slate-800 bg-slate-50"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 font-mono font-bold flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </motion.div>
            )}

            {/* TAB 5: COMPREHENSIVE LINKEDIN & NOTION KIT */}
            {activeTab === "branding" && (
              <motion.div
                key="branding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                {/* LinkedIn assets panel */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Linkedin className="w-5 h-5 text-[#0a66c2]" />
                      LinkedIn Profile Blueprint (Step 8 Hub)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Professional LinkedIn copy assets set up specifically to map recruiter keyword search indexes.
                    </p>
                  </div>

                  <div className="space-y-5">
                    
                    {/* Professional Headline */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 space-y-2 relative">
                      <div className="flex justify-between items-center gap-4 flex-wrap">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider select-none">LinkedIn Headline</span>
                        <button
                          onClick={() => handleCopy(linkedinAssets.headline, "headline")}
                          className="text-[10px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                        >
                          {copiedText === "headline" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy Headline
                        </button>
                      </div>
                      <p className="text-xs font-bold text-indigo-900 font-mono leading-relaxed bg-white p-3.5 rounded border border-slate-100">
                        {linkedinAssets.headline}
                      </p>
                    </div>

                    {/* About copy section */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150 space-y-2 relative">
                      <div className="flex justify-between items-center gap-4 flex-wrap">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider select-none">LinkedIn About Content</span>
                        <button
                          onClick={() => handleCopy(linkedinAssets.about, "about")}
                          className="text-[10px] font-mono text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                        >
                          {copiedText === "about" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          Copy About Block
                        </button>
                      </div>
                      <pre className="text-xs text-slate-705 leading-relaxed font-sans bg-white p-4 rounded border border-slate-100 whitespace-pre-wrap max-h-72 overflow-y-auto">
                        {linkedinAssets.about}
                      </pre>
                    </div>

                    {/* Featured items highlight list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {linkedinAssets.featured.map((item, index) => (
                        <div key={index} className="p-4 bg-white border border-slate-205 rounded-xl text-xs space-y-2 flex flex-col justify-between">
                          <div>
                            <span className="text-[8px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 select-none">FEATURED POST {index + 1}</span>
                            <h4 className="font-bold text-slate-800 mt-2.5 mb-1 text-[11px]">{item.title}</h4>
                            <p className="text-slate-500 leading-normal text-[11px]">{item.desc}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[9px] font-mono text-slate-400">Attached Call:</span>
                            <span className="text-[9px] font-mono font-bold text-indigo-600 bg-indigo-50/50 px-2 py-1 rounded">{item.link}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Notion workspace template block */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                  
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-600" />
                      Notion Portfolio Workspace Structure (Step 9 Setup)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Ahmad recommends replicating this dashboard layout outline inside Notion. Use it to cleanly present the portfolio assets.
                    </p>
                  </div>

                  <div className="p-5 md:p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-5">
                    
                    {/* Simulated header */}
                    <div className="flex items-center gap-3.5 border-b border-slate-200 pb-4">
                      <span className="text-2xl select-none">📓</span>
                      <div>
                        <h4 className="font-bold text-xs text-slate-850">{notionStructure.homepage.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{notionStructure.homepage.description}</p>
                      </div>
                    </div>

                    {/* Section directories grids */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {notionStructure.sections.map((sec, index) => (
                        <div key={index} className="p-4 bg-white border border-slate-150 rounded-lg hover:shadow-sm transition-shadow">
                          <div className="flex items-center gap-2 mb-1.5 select-none">
                            <span className="text-sm">📁</span>
                            <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-slate-700">{sec.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal">{sec.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-[10px] text-indigo-800 font-medium leading-relaxed">
                      <strong>Notion Synchronicity Note:</strong> This structured database framework helps recruiters evaluate credential alignment instantly, preventing contextual friction during vetting cycles.
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

          {/* Project live simulator playground modal overlay */}
          <ProjectPreviewModal
            project={previewProject}
            isOpen={previewProject !== null}
            onClose={() => setPreviewProject(null)}
          />

          {/* Dynamic copyright Footer */}
          <footer className="pt-8 border-t border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 gap-3 font-mono select-none">
            <div>
              <span>© 2026 Ahmad Ilham Fachrudin Nur Yahya. All rights and assets reserved.</span>
            </div>
            <div className="flex gap-4 text-slate-400">
              <span>ATS COMPLIANT STATE: APPROVED</span>
              <span>|</span>
              <span>GOOGLE GENERATIVE PRO CREDENTIAL DESIGN</span>
            </div>
          </footer>

        </div>

      </div>

    </div>
  );
}
