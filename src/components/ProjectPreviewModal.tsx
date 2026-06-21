import React, { useState, useEffect, useRef } from "react";
import { 
  X, 
  Play, 
  Terminal, 
  Settings, 
  Sparkles, 
  Check, 
  Copy, 
  Eye, 
  Cpu, 
  Sliders, 
  ShieldAlert, 
  Calendar,
  Code,
  FileText,
  Bookmark,
  CheckCircle,
  Database,
  RefreshCw,
  Search,
  CheckCircle2,
  Github,
  Star,
  GitBranch
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";

interface ProjectPreviewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectPreviewModal({ project, isOpen, onClose }: ProjectPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0); // 0 = idle, 1 = running steps, 2 = success output
  const [logMessages, setLogMessages] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [customCommand, setCustomCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal when logs update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logMessages, isLoading, step]);

  // --- Project 1 State (Production Assembly) ---
  const [p1Topic, setP1Topic] = useState("Enterprise Cloud Infrastructure Orchestration");
  const [p1Tone, setP1Tone] = useState("Formal Technical Specialist");
  const [p1Temperature, setP1Temperature] = useState(0.35);
  const [p1Format, setP1Format] = useState("HTML Section Tags");
  const [p1Output, setP1Output] = useState("");

  // --- Project 2 State (B2B Blogging Framework) ---
  const [p2Topic, setP2Topic] = useState("Eliminating Microservices Latency Overhead");
  const [p2Audience, setP2Audience] = useState("Enterprise Chief Technology Officers (CTOs)");
  const [p2NegativeConstraints, setP2NegativeConstraints] = useState(true);
  const [p2FewShots, setP2FewShots] = useState(3);
  const [p2ActiveTab, setP2ActiveTab] = useState<"outline" | "comparison">("outline");

  // --- Project 3 State (RAG Grounding System) ---
  const [p3KnowledgeBase, setP3KnowledgeBase] = useState("SOC-2_Security_SOP_v4.pdf");
  const [p3Query, setP3Query] = useState("Verify strict backup logging policies and schedule requirements.");
  const [p3GroundingRatio, setP3GroundingRatio] = useState(90);

  // --- Project 4 State (LSI Content Tuning) ---
  const [p4Keyword, setP4Keyword] = useState("secure serverless data syncing");
  const [p4DraftText, setP4DraftText] = useState("In this article we delve into the world of database systems. Standard apps should save user state securely. Here are serverless ways to do it.");

  // --- Project 5 State (Content Quality Eval) ---
  const [p5SelectedDraft, setP5SelectedDraft] = useState("robotic"); // robotic or executive
  const [p5Strictness, setP5Strictness] = useState("Moderate");

  // --- Project 6 State (Kanban Scheduler) ---
  const [p6Weeks, setP6Weeks] = useState(4);
  const [p6Pillar, setP6Pillar] = useState("Software Engineering Principles");

  // --- Project 7 State (Developer Portal Builder) ---
  const [p7Lang, setP7Lang] = useState("JavaScript");
  const [p7Endpoint, setP7Endpoint] = useState("POST /api/v1/auth/tokens");
  const [p7CopiedCode, setP7CopiedCode] = useState(false);

  // --- Project 8 State (Whitepaper Gen) ---
  const [p8Concept, setP8Concept] = useState("Post-Quantum Decentralized Cryptography Protocols");
  const [p8Depth, setP8Depth] = useState("Deep Technical Specification (Level 3)");

  // --- Project 9 State (Dashboard Analytics) ---
  const [p9Scale, setP9Scale] = useState("30 Days");
  const [p9Metric, setP9Metric] = useState("Generation Velocity");

  // --- Project 10 State (Compliance Auditor) ---
  const [p10Standard, setP10Standard] = useState("EU AI Act Compliance (Arts 52-60)");
  const [p10PolicyDraft, setP10PolicyDraft] = useState("We deployed a system that automatically labels all generated chat texts as artificial, satisfying local provisions without requiring custom deep watermarking structures.");

  // Reset states when changing project
  useEffect(() => {
    if (!project) return;
    setStep(0);
    setIsLoading(false);
    setLogMessages([]);
  }, [project?.id]);

  if (!project || !isOpen) return null;

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const cmd = customCommand.trim();
    if (!cmd) return;

    // Append user input
    setLogMessages(prev => [...prev, `visitor@ahmad-interactive-node:~$ ${cmd}`]);
    setCustomCommand("");

    // Simulate shell delay before outputting
    setTimeout(() => {
      const lower = cmd.toLowerCase();
      let response: string[] = [];

      if (lower === "help") {
        response = [
          "--------------------------------------------------------------------------------",
          "Ahmad's SYSTEM SHELL CONTROLLER - Available Interactive Commands:",
          "  help           Display this terminal guidance and list of commands",
          "  status         Display current workflow telemetry, project ID, and config states",
          "  metrics        Request high-fidelity system statistics, tokens, and response validation",
          "  optimize       Execute algorithmic evaluation to optimize prompt guidelines",
          "  sysinfo        Query host hardware specs, author profile, and workspace logs",
          "  clear          Purge current terminal buffer log stream",
          "--------------------------------------------------------------------------------"
        ];
      } else if (lower === "status") {
        response = [
          `Active Project  : [${project?.id}] ${project?.title}`,
          `Active Mode     : ${project?.id === "proj-10" ? "DEMO LIVE" : "PROTOTIPE FISIK / NYATA"}`,
          `Execution State : ${isLoading ? "RUNNING PIPELINE" : step === 2 ? "ONLINE & FULLY VERIFIED" : "STANDBY / AWAITING INVOCATION"}`,
          `Node Location   : ID-Jakarta-01 (Uptime Sync)`,
          `Framework       : Google AI Studio Prompt Sandbox v2.4`,
          "Status          : 100% HEALTHY"
        ];
        if (project?.id === "proj-1") {
          response.push(`Parameters      : Tone="${p1Tone}", Temp=${p1Temperature}, Format="${p1Format}"`);
        } else if (project?.id === "proj-2") {
          response.push(`Parameters      : Topic="${p2Topic.slice(0, 30)}...", Audience="${p2Audience}", AvoidClichés=${p2NegativeConstraints}`);
        } else if (project?.id === "proj-3") {
          response.push(`Parameters      : KnowledgeBase="${p3KnowledgeBase}", MinimumThreshold=${p3GroundingRatio}%`);
        } else if (project?.id === "proj-4") {
          response.push(`Parameters      : TargetKeyword="${p4Keyword.slice(0, 30)}..."`);
        } else if (project?.id === "proj-5") {
          response.push(`Parameters      : EvaluationRule="${p5Strictness}", SourceDraft="${p5SelectedDraft}"`);
        } else if (project?.id === "proj-6") {
          response.push(`Parameters      : TargetTopic="${p6Pillar}", CycleRange=${p6Weeks} weeks`);
        } else if (project?.id === "proj-7") {
          response.push(`Parameters      : DevLanguage="${p7Lang}", RouteURI="${p7Endpoint}"`);
        } else if (project?.id === "proj-8") {
          response.push(`Parameters      : TechConcept="${p8Concept.slice(0, 30)}...", Depth="${p8Depth}"`);
        } else if (project?.id === "proj-9") {
          response.push(`Parameters      : Timeframe="${p9Scale}", SelectedMetric="${p9Metric}"`);
        } else if (project?.id === "proj-10") {
          response.push(`Parameters      : QualityStandard="${p10Standard}"`);
        }
      } else if (lower === "metrics") {
        response = [
          `[Metrics Query Initiated for ${project?.id}]`,
          "--------------------------------------------------------------------------------",
          "Inference Latency     : 0.38 seconds average response time",
          "Semantic Accuracy     : 99.4% (Based on strict automated cosine vector checks)",
          "Brand Align Index     : 98.6% (Human-rating metric calibration)",
          "Prompt Cache State    : ACTIVE (Google AI Studio Server Side Cache hits: 98%)",
          "Calculated Prompt Size: 3,842 Tokens (Cached input keys populated)",
          "Generated Size        : 724 Tokens (High Fidelity Structured Response Assets)",
          "Validation Checks     : 12/12 Automated Compliance Rules PASSED",
          "--------------------------------------------------------------------------------"
        ];
      } else if (lower === "optimize") {
        response = [
          `[Algorithmic Prompt Optimization Engine Triggered for ${project?.id || 'Active Project'}]`,
          "Scanning current instruction structures for ambiguities...",
          "Checking cliché frequency and word-pattern constraints...",
          "Applying prompt architect heuristic patterns:",
          "--------------------------------------------------------------------------------",
          `• RECOMMENDED INSTRUCTION: For optimal target density, prefix the prompt with:`,
          `  'You are a technical leader specializing in highly actionable developer guides.'`,
          `• CLICHÉ SCRUB CHECK: Keep 'delve', 'testament', 'game-changer' banned. (+18% human-rating score)`,
          "• OUTPUT BLOCK DIAGRAMS: Enforce clear, strict Markdown or JSON structural tags.",
          `• PERFORMANCE FORECAST: Estimated +14.2% clarity, -20.4% generation overhead.`,
          "--------------------------------------------------------------------------------"
        ];
      } else if (lower === "clear") {
        setLogMessages([]);
        return;
      } else if (lower === "sysinfo") {
        response = [
          "Host Telemetry Node    : ahmad-interactive-node-production-01",
          "Operating Architecture : ArchLinux x86_64, Kernel v6.8.9-amd-core",
          "Language Suite Runtime : Node.js v20.12.2 LTS / ESR-Ready Enterprise Bundle",
          "Interactive Specialist : Ahmad Ilham Fachrudin Nur Yahya",
          "Primary Title          : Senior AI Content Specialist & Prompt Architect",
          "Certified Alignments   : EU AI Act Compliance, ISO/IEC 42001, Advanced PromptOps",
          "Workspace Sync Health : SECURE connection to Cloud Run ingress (Port 3000 mapping)",
          "Console Shell Session : Active demo session virtualized in React environment"
        ];
      } else {
        response = [
          `sh: command not found: "${cmd}"`,
          "Type 'help' to review list of active terminal commands supported in this interactive demo sandbox."
        ];
      }

      setLogMessages(prev => [...prev, ...response]);
    }, 150);
  };

  const runSimulation = () => {
    setIsLoading(true);
    setStep(1);
    const startCmd = project.id === "proj-10" 
      ? "systemctl start-live-demo" 
      : "systemctl start-prototipe-nyata";
    setLogMessages([
      `visitor@ahmad-interactive-node:~$ ${startCmd}`,
      `Starting payload orchestration for project reference: ${project.id}...`,
      "Loading dynamic workspace resources..."
    ]);

    const stepsList: string[] = [];
    if (project.id === "proj-1") {
      stepsList.push(
        "Initializing Google AI Studio System Prompt Interface...",
        "Validating structural HTML schema templates...",
        `Loading brand assets guidelines for alignment to tone: "${p1Tone}"...`,
        `Injecting runtime context variables into system directives...`,
        `Calibrating hyperparameters to Temperature: ${p1Temperature} / Top-P: 0.95...`,
        "Calling Google Gemini API proxy gateway...",
        "Generative engine successfully parsed and verified template tags!"
      );
    } else if (project.id === "proj-2") {
      stepsList.push(
        "Parsing Multi-Turn conversational history constraints...",
        `Injecting ${p2FewShots} gold-standard few-shot articles directly into prompt context window...`,
        p2NegativeConstraints 
          ? "Activating NEGATIVE CONSTRAINTS (Blacklisting clichés: 'delve into', 'testament to', 'game changer', 'moreover')..." 
          : "Bypassing negative constraints registry (Cliché monitoring inactive)...",
        `Refining outline structure for target audience: "${p2Audience}"...`,
        "Running Step-1 Outline Generator sequence...",
        "Running Step-2 Prose Drafting sequence...",
        "Executing Step-3 Cliche scrubbing and grammatical verification pipeline...",
        "Authoritative, human-sounding SaaS blog draft completed!"
      );
    } else if (project.id === "proj-3") {
      stepsList.push(
        "Accessing document metadata vector index...",
        `Loading grounding model guidelines for context: "${p3KnowledgeBase}"...`,
        "Parsing user query for semantic intent...",
        `Enforcing strict citation threshold: ${p3GroundingRatio}% ground compliance...`,
        "Matching assertions with local document factual spreadsheets...",
        "Assembling citation attributions: page index mapped, claim references verified.",
        "Grounding verification passed without hallucination anomalies!"
      );
    } else if (project.id === "proj-4") {
      stepsList.push(
        `Scanning LSI index matrices for target anchor keyword: "${p4Keyword}"...`,
        "Evaluating draft syntax against Top-10 SERP clusters...",
        "Calculating current Latent Semantic density score... [Initial Score: 41/100]",
        "Generating optimized high-value heading alterations...",
        "Rewriting draft sentences to balance contextual semantic keywords...",
        "Re-calculating density matching metrics... [Optimized Score: 96/100] Success."
      );
    } else if (project.id === "proj-5") {
      stepsList.push(
        "Initializing Editorial Quality Evaluation program...",
        `Loading appraisal criteria rubrics set to: "${p5Strictness}" guidelines...`,
        "Evaluating syntactic flow, readability index, and brand voice compatibility...",
        "Flagging formulaic structures and sentence construction anomalies...",
        "Compiling compliance diagnostic ratings scorecard..."
      );
    } else if (project.id === "proj-6") {
      stepsList.push(
        "Retrieving team Notion Editorial database structure...",
        `Accessing publication campaign cycles for topic: "${p6Pillar}"...`,
        `Structuring systematic weekly content sequences for ${p6Weeks} weeks...`,
        "Validating campaign mix ratios: 30% Educational, 30% Product guides, 25% Summaries, 15% Case Reports...",
        "Injecting metadata labels into Kanban dashboard grid successfully!"
      );
    } else if (project.id === "proj-7") {
      stepsList.push(
        `Compiling developer interactive sample layout for protocol: "${p7Endpoint}"...`,
        `Formatting dynamic code snippets for language engine: "${p7Lang}"...`,
        "Launching dev sandbox prototipe fisik/nyata yang khusus ditujukan untuk kebutuhan...",
        "Running mock server response sequence with mock JSON database fetch...",
        "Rendering sandbox explorer successfully!"
      );
    } else if (project.id === "proj-8") {
      stepsList.push(
        `Parsing whitepaper structure block for base technology: "${p8Concept}"...`,
        `Designing hierarchy: Executive Summary, Architectural Flow, and Implementation Guides...`,
        "Applying deep token-management parameters...",
        "Synthesizing layered sections and system architecture outline trees..."
      );
    } else if (project.id === "proj-9") {
      stepsList.push(
        `Retrieving operational telemetry data...`,
        `Analyzing trends over a "${p9Scale}" period...`,
        `Plotting visual charts tracking "${p9Metric}" performance indicator...`
      );
    } else if (project.id === "proj-10") {
      stepsList.push(
        "Loading global alignment policy registers...",
        `Injecting compliance criteria for: "${p10Standard}"...`,
        "Executing contrastive NLP parser to audit user content draft for gaps...",
        "Validating transparency markers, AI labeling and safety disclosures..."
      );
    }

    // Interactive step-by-step console loading
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < stepsList.length) {
        setLogMessages(prev => [...prev, stepsList[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        setStep(2); // Success view!
      }
    }, 450);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm p-4 cursor-default">
        
        {/* Backdrop close */}
        <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-b border-slate-205 dark:border-slate-800 flex justify-between items-center select-none">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-indigo-500 text-white leading-none">
                <Cpu className="w-4 h-4" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs md:text-sm">
                  {project.title} — Active Playground
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  MODEL TESTING SANDBOX • SYSTEM: VERIFIED_STEPS_3_AND_4
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body Container */}
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN: CONTROLS & PARMS TUNING (md:col-span-4) */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-xl p-5 space-y-5 h-fit">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800 select-none">
                <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-bold text-[10px] uppercase font-mono tracking-wider text-slate-700 dark:text-slate-300">
                  Model Calibration & Inputs
                </h4>
              </div>

              {/* PROJECT SPECIFIC CUSTOM INPUTS */}
              {project.id === "proj-1" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target Topic Summary</label>
                    <input 
                      type="text" 
                      value={p1Topic}
                      onChange={(e) => setP1Topic(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Brand Alignment Tone</label>
                    <select 
                      value={p1Tone}
                      onChange={(e) => setP1Tone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Formal Technical Specialist">Formal Technical Specialist</option>
                      <option value="Authoritative Enterprise Consultant">Authoritative Enterprise Consultant</option>
                      <option value="Conversational / Friendly Explainer">Conversational / Friendly Explainer</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                      <span>Model Temperature</span>
                      <span className="font-mono font-bold text-indigo-600">{p1Temperature}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.0" 
                      step="0.05"
                      value={p1Temperature}
                      onChange={(e) => setP1Temperature(parseFloat(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target Output Scheme</label>
                    <div className="flex gap-2">
                      {["HTML Section Tags", "Pure Markdown", "Strict JSON Structure"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setP1Format(opt)}
                          className={`flex-1 py-1 px-1.5 rounded text-[10px] font-mono border transition-all ${
                            p1Format === opt 
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent font-bold" 
                              : "bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-450 border-slate-200 dark:border-slate-850"
                          }`}
                        >
                          {opt.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.id === "proj-2" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">B2B Core Topic</label>
                    <input 
                      type="text" 
                      value={p2Topic}
                      onChange={(e) => setP2Topic(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Target Reader Demographic</label>
                    <select 
                      value={p2Audience}
                      onChange={(e) => setP2Audience(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Enterprise Chief Technology Officers (CTOs)">Enterprise CTOs</option>
                      <option value="DevOps Architects & Leads">DevOps Architects</option>
                      <option value="Venture Capital/Non-technical SaaS Cofounders">Business SaaS Founders</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 pt-1.5">
                    <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-850">
                      <div>
                        <span className="font-bold block text-[11px] text-slate-755 dark:text-slate-250">Negative Cliché Scrubbing</span>
                        <span className="text-[9px] text-slate-450">Filter out automated robotic filler words</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={p2NegativeConstraints} 
                        onChange={(e) => setP2NegativeConstraints(e.target.checked)}
                        className="w-4 h-4 cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">Few-Shot Article Exemplars</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setP2FewShots(num)}
                          className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-all ${
                            p2FewShots === num 
                              ? "bg-indigo-600 text-white border-transparent" 
                              : "bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-850 hover:bg-slate-50"
                          }`}
                        >
                          {num} {num === 1 ? "shot" : "shots"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.id === "proj-3" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Anchor File Database</label>
                    <select 
                      value={p3KnowledgeBase}
                      onChange={(e) => setP3KnowledgeBase(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="SOC-2_Security_SOP_v4.pdf">SOC-2_Security_SOP_v4.pdf (184 KB)</option>
                      <option value="API_Integration_Manifesto_v12.txt">API_Integration_Manifesto_v12.txt (85 KB)</option>
                      <option value="Quarterly_Global_Performance_Telemetry.xlsx">Quarterly_Global_Performance_Telemetry.xlsx (2.1 MB)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Fact Grounding Query</label>
                    <textarea 
                      rows={3}
                      value={p3Query}
                      onChange={(e) => setP3Query(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
                      <span>Strict Citation Threshold</span>
                      <span className="font-mono font-bold text-indigo-600">{p3GroundingRatio}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      step="5"
                      value={p3GroundingRatio}
                      onChange={(e) => setP3GroundingRatio(parseInt(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <span className="text-[9px] text-slate-400 block italic mt-1">Forces model to return NULL if claim-grounding ratio falls below specified factor</span>
                  </div>
                </div>
              )}

              {project.id === "proj-4" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target SEO Theme Keyword</label>
                    <input 
                      type="text" 
                      value={p4Keyword}
                      onChange={(e) => setP4Keyword(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Raw Draft Content (To Optimize)</label>
                    <textarea 
                      rows={5}
                      value={p4DraftText}
                      onChange={(e) => setP4DraftText(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {project.id === "proj-5" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">Select Input Draft to Critique</label>
                    <div className="space-y-2">
                      <div 
                        onClick={() => setP5SelectedDraft("robotic")}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                          p5SelectedDraft === "robotic"
                            ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                            : "border-slate-250 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span className="font-bold text-[11px] block text-slate-800 dark:text-slate-200">Robotic AI Output Draft</span>
                        <span className="text-[10px] text-slate-450 block italic truncate">"In this day and age, we must delve deep into critical cloud architectures..."</span>
                      </div>
                      <div 
                        onClick={() => setP5SelectedDraft("executive")}
                        className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                          p5SelectedDraft === "executive"
                            ? "border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/10"
                            : "border-slate-250 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <span className="font-bold text-[11px] block text-slate-800 dark:text-slate-200">Premium Human Brief</span>
                        <span className="text-[10px] text-slate-450 block italic truncate">"Standard accounting systems audit balances quarterly, bypassing structural lag..."</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Critique Standard Rubric</label>
                    <select 
                      value={p5Strictness}
                      onChange={(e) => setP5Strictness(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="Moderate">Moderate (Basic grammar & tone check)</option>
                      <option value="Strict-Pro">Strict-Pro (Excludes typical AI words + formatting verification)</option>
                      <option value="Corporate-Standard">Corporate-Standard (Requires active voice, specific heading levels)</option>
                    </select>
                  </div>
                </div>
              )}

              {project.id === "proj-6" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Campaign Pillar Core Topic</label>
                    <input 
                      type="text" 
                      value={p6Pillar}
                      onChange={(e) => setP6Pillar(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">Cycle Weeks Duration</label>
                    <div className="flex gap-2">
                      {[2, 4, 6, 8].map((w) => (
                        <button
                          key={w}
                          onClick={() => setP6Weeks(w)}
                          className={`flex-1 py-1 px-1 rounded text-xs font-mono border font-bold ${
                            p6Weeks === w 
                              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent" 
                              : "bg-white dark:bg-slate-950 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-850"
                          }`}
                        >
                          {w} Weeks
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.id === "proj-7" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target API Endpoint</label>
                    <select 
                      value={p7Endpoint} 
                      onChange={(e) => setP7Endpoint(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="POST /api/v1/auth/tokens">POST /api/v1/auth/tokens (Verify Token Auth)</option>
                      <option value="GET /api/v1/projects/prototyped">GET /api/v1/projects/prototyped (List Projects - Prototipe Nyata)</option>
                      <option value="PUT /api/v1/prompts/calibration">PUT /api/v1/prompts/calibration (Calibrate Prompt Parameters)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">Language Driver Syntax</label>
                    <div className="flex gap-1.5">
                      {["JavaScript", "cURL", "Python"].map((l) => (
                        <button
                          key={l}
                          onClick={() => setP7Lang(l)}
                          className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-all ${
                            p7Lang === l 
                              ? "bg-indigo-600 text-white border-transparent" 
                              : "bg-white dark:bg-slate-950 text-slate-600 border-slate-200 dark:border-slate-850 hover:bg-slate-50"
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {project.id === "proj-8" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Technology Focus Concept</label>
                    <input 
                      type="text" 
                      value={p8Concept}
                      onChange={(e) => setP8Concept(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Requested Outline Depth</label>
                    <select 
                      value={p8Depth}
                      onChange={(e) => setP8Depth(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="Executive Summary Layout (Level 1)">Executive Summary Layout (Level 1)</option>
                      <option value="Detailed Section Breakdown (Level 2)">Detailed Section Breakdown (Level 2)</option>
                      <option value="Deep Technical Specification (Level 3)">Deep Technical Specification (Level 3)</option>
                    </select>
                  </div>
                </div>
              )}

              {project.id === "proj-9" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block">Telemetry Resolution Timeframe</label>
                    <div className="flex gap-2">
                      {["7 Days", "30 Days", "90 Days"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setP9Scale(s)}
                          className={`flex-1 py-1 rounded text-xs font-mono font-bold border transition-all ${
                            p9Scale === s 
                              ? "bg-indigo-600 text-white border-transparent" 
                              : "bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-350 border-slate-200 dark:border-slate-850"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Focus KPI Metric</label>
                    <select 
                      value={p9Metric}
                      onChange={(e) => setP9Metric(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="Generation Velocity">Output Generation Velocity (Words/sec)</option>
                      <option value="Token Economy Alignment">Token Economy Cost Reduction ($/million)</option>
                      <option value="Fidelity Quality Rating">Fidelity Quality Rating (% Accuracy)</option>
                    </select>
                  </div>
                </div>
              )}

              {project.id === "proj-10" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Target Standard Authority</label>
                    <select 
                      value={p10Standard}
                      onChange={(e) => setP10Standard(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none"
                    >
                      <option value="EU AI Act Compliance (Arts 52-60)">EU AI Act Compliance (Arts 52-60)</option>
                      <option value="GDPR Content Privacy Act, Sec 4">GDPR Content Privacy Act, Sec 4</option>
                      <option value="FTC Consumer Transparency Act (Disclosure standards)">FTC Consumer Transparency Guides</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">Content Draft for Audit Analysis</label>
                    <textarea 
                      rows={5}
                      value={p10PolicyDraft}
                      onChange={(e) => setP10PolicyDraft(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* ACTION EXEC BUTTON */}
              <button
                disabled={isLoading}
                onClick={runSimulation}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold font-mono shadow flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md transition-all select-none"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
                {project.id === "proj-10" 
                  ? (step === 0 ? "Jalankan Demo Live" : "Restart Demo Live") 
                  : (step === 0 ? "Jalankan Prototipe Fisik/Nyata" : "Nyalakan Ulang Prototipe")
                }
              </button>

              {project.githubUrl && (
                <div className="flex flex-col gap-2 mt-2.5">
                  <div className="flex items-center gap-2 select-none">
                    {project.githubStars !== undefined && (
                      <div className="flex-1 py-1 px-2 border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-955/20 text-amber-700 dark:text-amber-400 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500 dark:text-amber-400" />
                        <span>{project.githubStars} Stars</span>
                      </div>
                    )}
                    {project.lastCommit && (
                      <div className="flex-1 py-1 px-2 border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-955/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-[10px] font-bold font-mono flex items-center justify-center gap-1 shadow-sm">
                        <GitBranch className="w-3 h-3 text-emerald-500 dark:text-emerald-450" />
                        <span>Last Commit</span>
                      </div>
                    )}
                  </div>
                  {project.lastCommit && (
                    <div className="text-[9px] text-center font-mono text-slate-400 dark:text-slate-500 border-b border-dashed border-slate-200 dark:border-slate-800 pb-1.5 select-none">
                      Active Development: {project.lastCommit}
                    </div>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1.5 cursor-pointer select-none shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    View Source Code
                  </a>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: RAW TERMINAL CONSOLE & GENERATIVE OUTPUT OUTPUT (md:col-span-8) */}
            <div className="md:col-span-7 flex flex-col h-[52vh] md:h-[480px]">
              
              {/* Terminal Logs (Always visible while loading, and collapses to bottom or top tab) */}
              <div className="bg-slate-950 rounded-xl border border-slate-850 p-4 font-mono text-[10px] md:text-[11px] leading-relaxed flex flex-col h-full overflow-hidden select-text text-slate-305">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2 shrink-0 select-none">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>SYSTEM SHELL OUTPUT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                    <span className="text-[9px] uppercase text-emerald-400 font-bold tracking-widest animate-pulse">
                      {isLoading ? "EXECUTING..." : step === 2 ? "ONLINE / COMPLETED" : "READY"}
                    </span>
                  </div>
                </div>

                {/* Simulated log content screen */}
                <div ref={terminalRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                  {step === 0 && (
                    <div className="text-slate-500 italic h-full flex flex-col justify-center items-center text-center">
                      <Sparkles className="w-8 h-8 text-indigo-500/20 mb-2 animate-bounce" />
                      <p className="font-mono text-[10px]">
                        {project.id === "proj-10" 
                          ? "Awaiting live demo parameters adjustment..." 
                          : "Awaiting parameters adjustment for prototipe fisik/nyata yang khusus ditujukan untuk kebutuhan..."
                        }
                      </p>
                      <p className="text-[9px] text-slate-600 mt-1">
                        {project.id === "proj-10" 
                          ? "Configure inputs in the left calibration grid, then hit 'Jalankan Demo Live'." 
                          : "Configure inputs in the left calibration grid, then hit 'Jalankan Prototipe Fisik/Nyata'."
                        }
                      </p>
                    </div>
                  )}

                  {logMessages.map((msg, idx) => {
                    if (typeof msg !== "string" || !msg) return null;
                    const isUserCmd = msg.startsWith("visitor@");
                    return (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -5 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-start gap-1 font-mono text-[10px] md:text-[11px] leading-relaxed ${isUserCmd ? "text-indigo-400 font-bold" : "text-emerald-350"}`}
                      >
                        {!isUserCmd && <span className="text-emerald-500 font-bold shrink-0">$&gt;</span>}
                        <span>{msg}</span>
                      </motion.div>
                    );
                  })}

                  {/* Generated fully custom output screen when loaded successfully */}
                  {step === 2 && !isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 pt-4 border-t border-slate-900 text-slate-100"
                    >
                      <div className="flex justify-between items-center mb-3 select-none">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                          Generated Response Output Assets
                        </span>
                        <button
                          onClick={() => {
                            const container = document.getElementById("mock-copy-content");
                            if (container) copyToClipboard(container.innerText);
                          }}
                          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-850 px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono transition-colors border border-slate-800 cursor-pointer"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          Copy Draft
                        </button>
                      </div>

                      {/* Actual Mock output payload container */}
                      <div 
                        id="mock-copy-content" 
                        className="bg-slate-900/40 p-4 rounded-lg border border-slate-900 font-sans text-xs text-slate-200 select-text leading-relaxed overflow-y-auto max-h-[220px]"
                      >
                        
                        {/* PROJECT 1 DESIGN */}
                        {project.id === "proj-1" && (
                          <div className="space-y-3 font-sans">
                            <h4 className="font-bold text-sm text-indigo-300 font-mono">
                              &lt;content_generation_payload_compiled&gt;
                            </h4>
                            <p className="text-[11px] text-slate-400 italic">
                              [Tone Model Calibration: {p1Tone} | Temperature: {p1Temperature} | Output Format: {p1Format}]
                            </p>
                            <hr className="border-slate-800" />
                            {p1Format === "HTML Section Tags" ? (
                              <pre className="text-[10px] font-mono text-emerald-400 bg-slate-900 p-2 rounded block whitespace-pre-wrap">
{`&lt;section class="tech-brief" data-align="${p1Tone.toLowerCase().replace(/\s+/g, '-')}"&gt;
  &lt;h3 class="heading-lead"&gt;Developing ${p1Topic}&lt;/h3&gt;
  &lt;p class="summary-text"&gt;
    To execute deployment workflows with minimal structural friction, organizations must align system parameters to corporate policies. High-velocity systems can utilize decoupled controllers to prevent thread blocks on secondary threads.
  &lt;/p&gt;
&lt;/section&gt;`}
                              </pre>
                            ) : p1Format === "Pure Markdown" ? (
                              <pre className="text-[10px] font-mono text-indigo-300 bg-slate-900 p-2 rounded block whitespace-pre-wrap">
{`### Developing ${p1Topic}

To execute deployment workflows with minimal structural friction, organizations must align system parameters to corporate policies.

- **Primary Matrix Control**: Bypasses secondary thread locking.
- **Dynamic Parameter Tuning**: Calibrates temperature factors inline.`}
                              </pre>
                            ) : (
                              <pre className="text-[10px] font-mono text-yellow-300 bg-slate-900 p-2 rounded block whitespace-pre-wrap">
{`{
  "system": "enterprise_assembly",
  "topic": "${p1Topic}",
  "calibrated_tone": "${p1Tone}",
  "temperature": ${p1Temperature},
  "content_attributes": {
    "sections": 1,
    "structural_balance_rating": "OPTIMAL_98%"
  }
}`}
                              </pre>
                            )}
                          </div>
                        )}

                        {/* PROJECT 2 DESIGN */}
                        {project.id === "proj-2" && (
                          <div className="space-y-4 font-sans">
                            <div className="flex gap-2 border-b border-slate-800 pb-2">
                              <button 
                                onClick={() => p2ActiveTab !== "outline" && setP2ActiveTab("outline")}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${p2ActiveTab === "outline" ? "bg-indigo-600 font-bold" : "text-slate-400 hover:text-white"}`}
                              >
                                Outline Section
                              </button>
                              <button 
                                onClick={() => p2ActiveTab !== "comparison" && setP2ActiveTab("comparison")}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${p2ActiveTab === "comparison" ? "bg-indigo-600 font-bold" : "text-slate-400 hover:text-white"}`}
                              >
                                Cliché Scrubbing Diff
                              </button>
                            </div>

                            {p2ActiveTab === "outline" ? (
                              <div className="space-y-2 text-[11px]">
                                <h4 className="font-extrabold text-indigo-400 text-xs">
                                  Prototipe Fisik/Nyata Strategic Outline for: {p2Topic}
                                </h4>
                                <p className="text-slate-400 uppercase text-[9px] font-mono font-bold">Target Reader: {p2Audience}</p>
                                <hr className="border-slate-850" />
                                <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
                                  <li><strong>Executive Core Proof:</strong> Microservice latency is not a failure of host configurations, but rather a structural failure of unoptimized RPC pipelines.</li>
                                  <li><strong>Architectural Slicing:</strong> How to map request tokens using low-latency memory buses (excluding traditional API controllers).</li>
                                  <li><strong>Recruiter Metric Impact:</strong> Demonstrating a 40% page load acceleration inside standard enterprise environments.</li>
                                </ol>
                              </div>
                            ) : (
                              <div className="space-y-2 text-[11px]">
                                <h4 className="font-bold text-red-400 text-xs flex items-center gap-1.5">
                                  <ShieldAlert className="w-3.5 h-3.5" /> Cliché Scrubbing Verification Diff
                                </h4>
                                <div className="grid grid-cols-2 gap-4 text-[10px] font-mono">
                                  <div className="p-2 border border-red-950 bg-red-950/20 rounded">
                                    <span className="text-red-400 font-bold block mb-1 text-[8px] uppercase">BEFORE AUDIT (Unfiltered)</span>
                                    In this day and age, we must <span className="text-red-300 bg-red-900/50 px-1 font-extrabold">delve deep</span> into microservices. Latency is a <span className="text-red-300 bg-red-900/50 px-1 font-extrabold">testament to</span> poor configs...
                                  </div>
                                  <div className="p-2 border border-green-950 bg-green-950/20 rounded">
                                    <span className="text-green-400 font-bold block mb-1 text-[8px] uppercase">AFTER AUDIT (Scrubbed)</span>
                                    Analyzing modern software architecture requires <span className="text-green-300 bg-green-900/50 px-1 font-extrabold">probing</span> microservices. Latency directly <span className="text-green-300 bg-green-900/50 px-1 font-extrabold">proves</span> poor configs...
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* PROJECT 3 DESIGN */}
                        {project.id === "proj-3" && (
                          <div className="space-y-3">
                            <h4 className="font-bold text-indigo-400 font-mono text-[11px] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> FACTUAL GROUNDING RESPONSE VERIFIED
                            </h4>
                            <p className="text-[10px] text-slate-400 italic font-mono uppercase bg-slate-900 p-1.5 rounded border border-slate-850">
                              [Context Source Buffer: {p3KnowledgeBase} | Hard Fact compliance: {p3GroundingRatio}%]
                            </p>
                            <p className="text-slate-300 text-[11px] leading-relaxed">
                              "In direct accordance with the verified documentation of <strong>{p3KnowledgeBase}</strong>, backup records are scheduled at exactly 02:00 UTC on a daily cadence<sup>[Log_SOP_p34]</sup>. The verification agent certified that recovery keys are stored locally inside sandboxed container profiles<sup>[Sec_Spec_p12]</sup>."
                            </p>
                            <div className="p-2 bg-slate-950 rounded border border-slate-850 space-y-1 text-[10px] font-mono text-slate-400">
                              <p className="font-bold text-slate-200">System Source Ledger Map:</p>
                              <div>• Claim [02:00 UTC Scheduler] &rarr; Matching factor: 100% | Source p.34, Sec 2.1</div>
                              <div>• Claim [Container Profile Keys] &rarr; Matching factor: 100% | Source p.12, Sec 1.4</div>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 4 DESIGN */}
                        {project.id === "proj-4" && (
                          <div className="space-y-3 font-sans">
                            <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                              <span className="text-[10px] font-mono text-emerald-400">SEO Metric optimization</span>
                              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900">Score: 96/100</span>
                            </div>
                            <div className="text-[11px] space-y-2 text-slate-300">
                              <p className="font-bold text-slate-100">Keyword Injected: <span className="bg-indigo-950 text-indigo-300 font-mono px-1 border border-indigo-900">#"{p4Keyword}"</span></p>
                              <hr className="border-slate-800" />
                              <p className="leading-relaxed">
                                "Developers face serious hurdles establishing <strong>{p4Keyword}</strong> parameters inside active react containers. By mapping local database triggers straight to serverless event clusters, this drafting guide optimizes state saving protocols safely."
                              </p>
                              <div className="p-2.5 bg-slate-950 rounded border border-slate-850 text-[10px] font-mono space-y-1 text-slate-450">
                                <p className="font-bold text-slate-200">Anchor Density Adjustments:</p>
                                <div>• Injected LSI clusters: "serverless event grids", "react hooks syncing", "data isolation layers".</div>
                                <div>• Headings optimization of Page Title completed.</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 5 DESIGN */}
                        {project.id === "proj-5" && (
                          <div className="space-y-3">
                            <h4 className="font-bold text-indigo-400 text-xs">Editorial Evaluation Diagnosis Scorecard</h4>
                            <p className="text-[10px] text-slate-450 font-mono">APPRAISAL RIGOR LEVEL: {p5Strictness.toUpperCase()}</p>
                            <hr className="border-slate-850" />
                            
                            <div className="grid grid-cols-3 gap-2.5 text-center my-2">
                              <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                <span className="text-[9px] font-mono uppercase text-slate-400 block">Readability</span>
                                <span className="text-sm font-black font-mono text-indigo-300">{p5SelectedDraft === "robotic" ? "42%" : "91%"}</span>
                              </div>
                              <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                <span className="text-[9px] font-mono uppercase text-slate-400 block">Tone Match</span>
                                <span className="text-sm font-black font-mono text-indigo-300">{p5SelectedDraft === "robotic" ? "15%" : "96%"}</span>
                              </div>
                              <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                <span className="text-[9px] font-mono uppercase text-slate-400 block">Factual Seal</span>
                                <span className="text-sm font-black font-mono text-indigo-300">{p5SelectedDraft === "robotic" ? "50%" : "98%"}</span>
                              </div>
                            </div>

                            <div className="space-y-1.5 text-[11px] text-slate-300">
                              <p className="font-bold text-slate-200">Critical Improvements Identified:</p>
                              {p5SelectedDraft === "robotic" ? (
                                <ul className="list-disc pl-4 space-y-1 text-red-300">
                                  <li>Severe clichés: 'in this day and age' is highly robotic. Swap to 'currently'.</li>
                                  <li>Passive language detected in 4 sentences. Refactor to improve dwell retention.</li>
                                  <li>Missing structured heading wrappers. Needs distinct H2 to satisfy standard reader focus.</li>
                                </ul>
                              ) : (
                                <ul className="list-disc pl-4 space-y-1 text-emerald-300">
                                  <li>Zero robotic words found. Prose flow is pristine.</li>
                                  <li>Proper active verbs utilized ('audit quarterly', 'bypassing lag').</li>
                                  <li>Formatting matches target mobile framework correctly.</li>
                                </ul>
                              )}
                            </div>
                          </div>
                        )}

                        {/* PROJECT 6 DESIGN */}
                        {project.id === "proj-6" && (
                          <div className="space-y-3 font-mono text-[10px]">
                            <h4 className="font-bold text-[11px] text-indigo-405 font-sans">Automated Kanban Publishing Schedule for: {p6Pillar}</h4>
                            <p className="text-slate-450 uppercase text-[9px] font-mono">[Campaign Mix Strategy: 60% Educational/Briefs | 40% Case Reports]</p>
                            <hr className="border-slate-850" />
                            <div className="grid grid-cols-4 gap-2 text-[9px]">
                              {[...Array(p6Weeks)].map((_, i) => (
                                <div key={i} className="bg-slate-950 border border-slate-850 p-1.5 rounded space-y-1">
                                  <span className="font-black text-[8px] text-indigo-400 block">WEEK 1.0{i+1}</span>
                                  <div className="bg-indigo-950/40 p-1 rounded border border-indigo-900/50 text-[8px] text-slate-300">
                                    <span className="font-bold block text-indigo-300 text-[7px]" style={{fontSize: "7px"}}>EDUCATIONAL</span>
                                    Core Specs: {p6Pillar.slice(0, 15)}...
                                  </div>
                                  <div className="bg-emerald-950/40 p-1 rounded border border-emerald-900/50 text-[8px] text-slate-300">
                                    <span className="font-bold block text-emerald-300 text-[7px]" style={{fontSize: "7px"}}>CASE REPORT</span>
                                    Outcomes Audit
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* PROJECT 7 DESIGN */}
                        {project.id === "proj-7" && (
                          <div className="space-y-3 font-mono text-[11px]">
                            <div className="flex justify-between items-center text-[10px] bg-slate-950 p-1.5 rounded text-slate-400 border border-slate-850">
                              <span>SANDBOX ROUTE: {p7Endpoint}</span>
                              <button 
                                onClick={() => {
                                  setP7CopiedCode(true);
                                  setTimeout(() => setP7CopiedCode(false), 2000);
                                }}
                                className="text-slate-200 hover:text-white cursor-pointer bg-slate-900 p-1 rounded text-[9px]"
                              >
                                {p7CopiedCode ? "Copied" : "Copy Code"}
                              </button>
                            </div>
                            
                            {p7Lang === "JavaScript" && (
                              <pre className="text-[10px] text-emerald-400 whitespace-pre-wrap leading-tight bg-slate-950 p-2.5 rounded border border-slate-900">
{`const response = await fetch("https://api.ahmad-content.dev${p7Endpoint.split(" ")[1]}", {
  method: "${p7Endpoint.split(" ")[0]}",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ credential_level: "specialist" })
});
const payload = await response.json();
console.log("Verified Status Code: ", response.status);`}
                              </pre>
                            )}

                            {p7Lang === "cURL" && (
                              <pre className="text-[10px] text-indigo-300 whitespace-pre-wrap leading-tight bg-slate-950 p-2.5 rounded border border-slate-900">
{`curl -X ${p7Endpoint.split(" ")[0]} "https://api.ahmad-content.dev${p7Endpoint.split(" ")[1]}" \\
  -H "Content-Type: application/json" \\
  -d '{"credential_level": "specialist"}'`}
                              </pre>
                            )}

                            {p7Lang === "Python" && (
                              <pre className="text-[10px] text-yellow-300 whitespace-pre-wrap leading-tight bg-slate-950 p-2.5 rounded border border-slate-900">
{`import requests
headers = {"Content-Type": "application/json"}
r = requests.${p7Endpoint.split(" ")[0].toLowerCase()}("https://api.ahmad-content.dev${p7Endpoint.split(" ")[1]}", json={"credential_level": "specialist"}, headers=headers)
print("HTTP STATUS: ", r.status_code)`}
                              </pre>
                            )}

                            <div className="p-2 bg-indigo-950/20 text-indigo-300 rounded text-[10px] font-sans border border-indigo-950">
                              <strong>
                                Prototipe Fisik/Nyata HTTP 200 OK Response Payload:
                              </strong>
                              <pre className="text-[9px] font-mono mt-1 text-slate-300">
{`{
  "status": "APPROVED_HIRE",
  "endpoint_called": "${p7Endpoint.split(" ")[1]}",
  "message": "Authentication token verified in 14ms."
}`}
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 8 DESIGN */}
                        {project.id === "proj-8" && (
                          <div className="space-y-2.5 text-[11px] font-sans">
                            <h4 className="font-bold text-indigo-300 text-xs">Dynamic Layered Context Tree Structure</h4>
                            <p className="text-slate-450 uppercase text-[9px] font-mono bg-slate-950 p-1 rounded border border-slate-850">
                              Base Technology Concept: {p8Concept}
                            </p>
                            <div className="border bg-slate-950/50 border-slate-850 p-2 rounded font-mono text-[9px] text-slate-350 space-y-2">
                              <div className="text-indigo-400 font-bold">• [SECTION 1.0] EXECUTIVE BRIEF SUMMARY</div>
                              <div className="pl-3 text-slate-400">High-level outcome statement defining quantum decryption latency limits.</div>
                              <hr className="border-slate-850" />
                              <div className="text-indigo-400 font-bold">• [SECTION 2.0] ARCHITECTURAL PROTOCOL BLUEPRINT</div>
                              <div className="pl-3 text-slate-400">Layered specification detailing message key distribution factors.</div>
                              <hr className="border-slate-850" />
                              <div className="text-indigo-400 font-bold">• [SECTION 3.0] DEPLOYMENT COMPLIANCE SPEC</div>
                              <div className="pl-3 text-slate-400">Detailed container cluster guidelines for remote coordinators.</div>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 9 DESIGN */}
                        {project.id === "proj-9" && (
                          <div className="space-y-3 font-sans">
                            <h4 className="font-bold text-indigo-300 text-xs flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-850">
                              <span>Telemetry Data Analytics Indicator Tracker</span>
                              <span className="font-mono text-[10px] text-slate-400">Period: {p9Scale}</span>
                            </h4>
                            <div className="space-y-2.5 pt-1.5">
                              <span className="text-[10px] block font-mono text-slate-405">KPI Index: {p9Metric.toUpperCase()}</span>
                              <div className="grid grid-cols-4 gap-2.5 text-center text-slate-200">
                                <div className="bg-slate-950 border border-slate-850 p-2 rounded">
                                  <span className="text-[8px] font-mono text-slate-500 block uppercase">Baseline</span>
                                  <span className="text-xs font-mono font-bold text-indigo-400">45%</span>
                                </div>
                                <div className="bg-slate-950 border border-slate-850 p-2 rounded">
                                  <span className="text-[8px] font-mono text-slate-500 block uppercase">Peak Max</span>
                                  <span className="text-xs font-mono font-bold text-emerald-400">98%</span>
                                </div>
                                <div className="bg-slate-950 border border-slate-850 p-2 rounded">
                                  <span className="text-[8px] font-mono text-slate-500 block uppercase">Daily Ave</span>
                                  <span className="text-xs font-mono font-bold text-indigo-400">89%</span>
                                </div>
                                <div className="bg-emerald-950/20 border border-emerald-900/40 p-2 rounded">
                                  <span className="text-[8px] font-mono text-emerald-400 block uppercase">ROAS Growth</span>
                                  <span className="text-xs font-mono font-bold text-emerald-300">+140%</span>
                                </div>
                              </div>
                              <div className="h-4 bg-slate-950 border border-slate-850 rounded overflow-hidden flex items-stretch">
                                <div className="bg-indigo-600 animate-pulse" style={{width: "89%"}}></div>
                              </div>
                              <span className="block text-[9px] text-slate-450 italic text-right font-mono">
                                *Prototipe fisik/nyata yang khusus ditujukan untuk kebutuhan dynamic output values calculated on recent server cache
                              </span>
                            </div>
                          </div>
                        )}

                        {/* PROJECT 10 DESIGN */}
                        {project.id === "proj-10" && (
                          <div className="space-y-3 font-sans">
                            <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-850">
                              <h4 className="font-bold text-indigo-400 text-xs">Alignment Governance Compliance Audit</h4>
                              <span className="text-[9px] font-mono text-slate-400">Audit Rule: {p10Standard}</span>
                            </div>
                            <div className="text-[11px] leading-relaxed text-slate-300">
                              <p className="font-bold text-slate-200">Policy Audited Text snippet:</p>
                              <p className="p-2 border border-slate-850 bg-slate-950 font-mono text-[10px] text-slate-400 rounded">
                                "{p10PolicyDraft}"
                              </p>
                              <div className="flex items-center gap-2 text-emerald-300 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-950 mt-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>FTC/EU AI ACT COMPLIANCE STATUS: PASSED CERTIFICATION</span>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                   )}
                </div>

                {/* REALISTIC DEMO COMMAND LINE INPUT */}
                <div className="mt-2 pt-2 border-t border-slate-900/60 flex items-center gap-1.5 select-none font-mono text-[10px] md:text-[11px] shrink-0 text-emerald-400">
                  <span className="text-indigo-400 font-bold shrink-0">visitor@ahmad-interactive-node:~$</span>
                  <input
                    type="text"
                    placeholder="Type commands here (e.g. 'help', 'status', 'metrics', 'optimize')..."
                    className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 m-0 flex-1 text-emerald-300 placeholder-slate-700 font-mono text-[10px] md:text-[11px] focus:border-none focus:shadow-none min-w-0"
                    value={customCommand}
                    onChange={(e) => setCustomCommand(e.target.value)}
                    onKeyDown={handleCommandSubmit}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Modal Footer / Summary Actions */}
          <div className="bg-slate-50 dark:bg-slate-900 px-6 py-4 border-t border-slate-205 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono select-none shrink-0 flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-indigo-505 dark:text-indigo-407 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              IN-BROWSER LIVE EMULATION MODEL ACTIVE
            </span>
            <span>PRESENCE ID: Ahmad_Ilham_CV</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
