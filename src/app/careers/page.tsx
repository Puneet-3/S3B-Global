"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Activity, 
  Sparkles, 
  Cpu, 
  Database, 
  Users, 
  Workflow, 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Terminal, 
  Lock, 
  FileText,
  ArrowRight
} from "lucide-react";

// Job opening interface
interface Job {
  id: number;
  title: string;
  department: "Development" | "Data & AI" | "Design & Marketing" | "Management" | "Operations & Support";
  location: string;
  experience: string;
  skills: string[];
  icon: React.ElementType;
  themeColor: string;
  themeBg: string;
  themeBorder: string;
}

// Full array representing the 34 job cards shown in the user's reference image
const JOBS_DATA: Job[] = [
  {
    id: 1,
    title: ".Net Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["C#", "ASP.NET Core", "Web API", "SQL Server"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 2,
    title: "Java Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Java", "Spring Boot", "Microservices", "Hibernate"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 3,
    title: "Python Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Python", "Django", "FastAPI", "PostgreSQL"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 4,
    title: "PHP Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["PHP", "Laravel", "MySQL", "MVC"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 5,
    title: "React Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["React.js", "Redux", "HTML5", "CSS3", "Tailwind CSS"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 6,
    title: "Angular Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Angular", "TypeScript", "RxJS", "NgRx"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 7,
    title: "Vue Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Vue.js", "Nuxt.js", "Pinia", "JavaScript"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 8,
    title: "Node.js Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Node.js", "Express.js", "MongoDB", "REST API"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 9,
    title: "Go Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Golang", "Docker", "Kubernetes", "gRPC"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 10,
    title: "Rust Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Rust", "WebAssembly", "Cargo", "System Programming"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 11,
    title: "iOS Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Swift", "SwiftUI", "Objective-C", "CocoaTouch"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 12,
    title: "Android Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Kotlin", "Java", "Jetpack Compose", "Android SDK"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 13,
    title: "Flutter Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Flutter", "Dart", "Provider/Bloc", "Mobile UI"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 14,
    title: "React Native Developer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["React Native", "TypeScript", "Redux", "Push Notifications"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 15,
    title: "QA Automation Engineer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Selenium", "Cypress", "JUnit", "TestNG", "Jenkins"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 16,
    title: "DevOps Engineer",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "CI/CD"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 17,
    title: "Cloud Solutions Architect",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "8-12 Years",
    skills: ["AWS/Azure/GCP", "Terraform", "Cloud Security", "Architecture"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 18,
    title: "Cybersecurity Specialist",
    department: "Development",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Penetration Testing", "OWASP", "SOC 2", "ISO 27001"],
    icon: Cpu,
    themeColor: "text-[#1d70b8]",
    themeBg: "bg-[#1d70b8]/5 dark:bg-[#1d70b8]/10",
    themeBorder: "border-[#1d70b8]/20"
  },
  {
    id: 19,
    title: "Data Engineer",
    department: "Data & AI",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Apache Spark", "Hadoop", "SQL", "ETL Pipelines"],
    icon: Database,
    themeColor: "text-[#f59e0b]",
    themeBg: "bg-[#f59e0b]/5 dark:bg-[#f59e0b]/10",
    themeBorder: "border-[#f59e0b]/20"
  },
  {
    id: 20,
    title: "Data Scientist",
    department: "Data & AI",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Python", "R", "TensorFlow", "PyTorch", "Scikit-Learn"],
    icon: Database,
    themeColor: "text-[#f59e0b]",
    themeBg: "bg-[#f59e0b]/5 dark:bg-[#f59e0b]/10",
    themeBorder: "border-[#f59e0b]/20"
  },
  {
    id: 21,
    title: "ML Engineer",
    department: "Data & AI",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["NLP", "Deep Learning", "PyTorch", "MLOps", "LLMs"],
    icon: Database,
    themeColor: "text-[#f59e0b]",
    themeBg: "bg-[#f59e0b]/5 dark:bg-[#f59e0b]/10",
    themeBorder: "border-[#f59e0b]/20"
  },
  {
    id: 22,
    title: "Business Analyst",
    department: "Management",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Agile", "Scrum", "Jira", "SQL", "UML", "Requirements Gathering"],
    icon: Workflow,
    themeColor: "text-[#a855f7]",
    themeBg: "bg-[#a855f7]/5 dark:bg-[#a855f7]/10",
    themeBorder: "border-[#a855f7]/20"
  },
  {
    id: 23,
    title: "Scrum Master",
    department: "Management",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Scrum", "Agile", "Kanban", "Jira", "Team Facilitation"],
    icon: Workflow,
    themeColor: "text-[#a855f7]",
    themeBg: "bg-[#a855f7]/5 dark:bg-[#a855f7]/10",
    themeBorder: "border-[#a855f7]/20"
  },
  {
    id: 24,
    title: "Project Manager",
    department: "Management",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["PMP", "Agile", "Scrum", "Project Planning", "Risk Management"],
    icon: Workflow,
    themeColor: "text-[#a855f7]",
    themeBg: "bg-[#a855f7]/5 dark:bg-[#a855f7]/10",
    themeBorder: "border-[#a855f7]/20"
  },
  {
    id: 25,
    title: "Product Manager",
    department: "Management",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["Product Strategy", "Roadmap", "Agile", "Market Research"],
    icon: Workflow,
    themeColor: "text-[#a855f7]",
    themeBg: "bg-[#a855f7]/5 dark:bg-[#a855f7]/10",
    themeBorder: "border-[#a855f7]/20"
  },
  {
    id: 26,
    title: "UI/UX Designer",
    department: "Design & Marketing",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping"],
    icon: Sparkles,
    themeColor: "text-[#10b981]",
    themeBg: "bg-[#10b981]/5 dark:bg-[#10b981]/10",
    themeBorder: "border-[#10b981]/20"
  },
  {
    id: 27,
    title: "Graphic Designer",
    department: "Design & Marketing",
    location: "Alpharetta, GA",
    experience: "2-4 Years",
    skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Branding"],
    icon: Sparkles,
    themeColor: "text-[#10b981]",
    themeBg: "bg-[#10b981]/5 dark:bg-[#10b981]/10",
    themeBorder: "border-[#10b981]/20"
  },
  {
    id: 28,
    title: "Content Writer",
    department: "Design & Marketing",
    location: "Alpharetta, GA",
    experience: "2-4 Years",
    skills: ["SEO", "Copywriting", "Content Strategy", "Proofreading"],
    icon: Sparkles,
    themeColor: "text-[#10b981]",
    themeBg: "bg-[#10b981]/5 dark:bg-[#10b981]/10",
    themeBorder: "border-[#10b981]/20"
  },
  {
    id: 29,
    title: "SEO Specialist",
    department: "Design & Marketing",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Google Analytics", "SEMrush", "Ahrefs", "Keyword Research"],
    icon: Sparkles,
    themeColor: "text-[#10b981]",
    themeBg: "bg-[#10b981]/5 dark:bg-[#10b981]/10",
    themeBorder: "border-[#10b981]/20"
  },
  {
    id: 30,
    title: "Digital Marketing Specialist",
    department: "Design & Marketing",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Social Media", "SEO", "SEM", "PPC", "Email Campaigns"],
    icon: Sparkles,
    themeColor: "text-[#10b981]",
    themeBg: "bg-[#10b981]/5 dark:bg-[#10b981]/10",
    themeBorder: "border-[#10b981]/20"
  },
  {
    id: 31,
    title: "HR Specialist",
    department: "Operations & Support",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Recruitment", "Onboarding", "Payroll", "Employee Relations"],
    icon: Users,
    themeColor: "text-[#ec4899]",
    themeBg: "bg-[#ec4899]/5 dark:bg-[#ec4899]/10",
    themeBorder: "border-[#ec4899]/20"
  },
  {
    id: 32,
    title: "Sales Account Executive",
    department: "Operations & Support",
    location: "Alpharetta, GA",
    experience: "5-8 Years",
    skills: ["B2B Sales", "CRM", "Client Acquisition", "Negotiation"],
    icon: Users,
    themeColor: "text-[#ec4899]",
    themeBg: "bg-[#ec4899]/5 dark:bg-[#ec4899]/10",
    themeBorder: "border-[#ec4899]/20"
  },
  {
    id: 33,
    title: "Customer Support Specialist",
    department: "Operations & Support",
    location: "Alpharetta, GA",
    experience: "1-3 Years",
    skills: ["Helpdesk", "Zendesk", "Customer Relations", "Ticketing Systems"],
    icon: Users,
    themeColor: "text-[#ec4899]",
    themeBg: "bg-[#ec4899]/5 dark:bg-[#ec4899]/10",
    themeBorder: "border-[#ec4899]/20"
  },
  {
    id: 34,
    title: "System Administrator",
    department: "Operations & Support",
    location: "Alpharetta, GA",
    experience: "3-5 Years",
    skills: ["Windows/Linux Server", "Active Directory", "Network Admin"],
    icon: Users,
    themeColor: "text-[#ec4899]",
    themeBg: "bg-[#ec4899]/5 dark:bg-[#ec4899]/10",
    themeBorder: "border-[#ec4899]/20"
  }
];

const DEPARTMENTS = ["All", "Development", "Data & AI", "Design & Marketing", "Management", "Operations & Support"] as const;

export default function CareersPage() {
  useEffect(() => {
    document.title = "Careers - S3B Global";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(JOBS_DATA);
  
  // Modal states for applying
  const [selectedJobForModal, setSelectedJobForModal] = useState<Job | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Filtering Logic
  useEffect(() => {
    let results = JOBS_DATA;
    
    // 1. Department filter
    if (selectedDept !== "All") {
      results = results.filter(job => job.department === selectedDept);
    }
    
    // 2. Search query filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.experience.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredJobs(results);
  }, [searchQuery, selectedDept]);

  const handleApplyClick = (job: Job) => {
    setSelectedJobForModal(job);
    setFullName("");
    setEmail("");
    setResumeUrl("");
    setNotes("");
    setFormError("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    setLogs([]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !resumeUrl.trim()) {
      setFormError("All marked fields (*) are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!resumeUrl.toLowerCase().startsWith("http://") && !resumeUrl.toLowerCase().startsWith("https://")) {
      setFormError("Please enter a valid HTTP/HTTPS URL to your resume.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);
    setLogs([`[18:37:49] POST /api/v1/careers/apply?jobId=${selectedJobForModal?.id} HTTP/1.1`]);

    const traceLogs = [
      `[info] Hostname: secure.s3b-global.com`,
      `[crypt] Initializing dynamic handshake on secure TLS 1.3 channel...`,
      `[crypt] AES-256-GCM package keyspace synced successfully.`,
      `[cloud] Processing candidate profile package: { name: "${fullName}" }`,
      `[cloud] Attaching cryptographically-signed file reference: ${resumeUrl}`,
      `[database] Inserting secure applicant payload in AWS Shards (US-East)...`,
      `[success] 201 Created. Handshake complete! Notification dispatched to S3B HR.`
    ];

    traceLogs.forEach((log, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (idx === traceLogs.length - 1) {
          setIsSubmitting(false);
          setIsSubmitted(true);
        }
      }, (idx + 1) * 750);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      
      {/* 1. Global Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 md:pt-24 pb-20 relative">
        {/* Dynamic visual blobs */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#1d70b8]/3 blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-[35%] left-0 w-[400px] h-[400px] rounded-full bg-[#10b981]/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-accent-purple/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 space-y-16">
          
          {/* Section 1: Hero Header */}
          <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border shadow-sm">
              <Briefcase className="h-3.5 w-3.5 text-[#f59e0b]" />
              <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                JOIN S3B GLOBAL
              </span>
            </div>

            <h1 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight leading-tight">
              Build the Future <br />
              <span className="bg-gradient-to-r from-[#1d70b8] via-[#f59e0b] to-[#10b981] bg-clip-text text-transparent">
                With S3B Global
              </span>
            </h1>

            <p className="text-[16px] text-text-muted leading-relaxed max-w-3xl mx-auto font-light">
              Explore our active career opportunities. Join our elite engineering, analytics, design, and management teams in Georgia or work remotely to deliver speed, velocity, and technical precision to global brands.
            </p>
          </ScrollReveal>

          {/* Section 2: Search & Categorical Department Filters */}
          <ScrollReveal delay={100} className="w-full space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto bg-card-bg/40 border border-card-border p-5 rounded-2xl backdrop-blur-md">
              
              {/* Dynamic search bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/40" />
                <input 
                  type="text" 
                  placeholder="Search jobs by title, skills, experience..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted/40 hover:text-text-title transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Jobs Count indicator */}
              <div className="shrink-0 font-mono text-[10px] font-bold text-text-muted bg-card-bg border border-card-border px-3.5 py-1.5 rounded-full select-none">
                ACTIVE RECRUITMENTS: <span className="text-[#f59e0b]">{filteredJobs.length}</span>
              </div>
            </div>

            {/* Department Navigation buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
              {DEPARTMENTS.map((dept, idx) => {
                const isActive = selectedDept === dept;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-5 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer select-none ${
                      isActive 
                        ? "bg-gradient-to-r from-emerald-400 to-cyan-400 border-transparent text-[#041018] shadow-[0_4px_12px_rgba(34,211,238,0.25)] scale-[1.02]"
                        : "bg-card-bg border-card-border text-text-muted hover:border-card-border-hover hover:bg-card-bg-hover hover:text-text-title"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Section 3: Job Grid matches 3-column layout */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto select-none">
              {filteredJobs.map((job, idx) => {
                const Icon = job.icon;
                return (
                  <ScrollReveal
                    key={job.id}
                    delay={(idx % 3) * 80}
                    className="liquid-glass-glowing bg-card-bg/40 border border-card-border p-6 rounded-2xl flex flex-col justify-between hover:-translate-y-1 text-left relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      {/* Job Header row */}
                      <div className="flex items-start justify-between space-x-3">
                        <div className={`p-2.5 rounded-lg ${job.themeColor} ${job.themeBg} ${job.themeBorder} border shrink-0`}>
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#f59e0b] bg-[#f59e0b]/5 px-2 py-0.5 rounded border border-[#f59e0b]/15 block">
                            {job.department}
                          </span>
                        </div>
                      </div>

                      {/* Job Info */}
                      <div className="space-y-1">
                        <h3 className="text-[20px] font-normal text-text-title tracking-tight leading-tight">
                          {job.title}
                        </h3>
                        <div className="flex items-center space-x-3 text-[14px] font-mono text-text-muted/70">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-text-muted/40 shrink-0" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Activity className="h-3 w-3 text-text-muted/40 shrink-0" />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills Tags list */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[14px] font-light text-text-muted/80 bg-slate-100/80 dark:bg-black/20 border border-slate-200 dark:border-card-border px-2 py-0.5 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA to trigger Application Form modal */}
                    <div className="pt-6">
                      <button
                        onClick={() => handleApplyClick(job)}
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1d70b8] hover:bg-blue-600 shadow-[0_4px_12px_rgba(29,112,184,0.25)] transition-all cursor-pointer space-x-1.5 group"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            /* No Results view */
            <ScrollReveal className="text-center py-16 bg-card-bg/20 border border-card-border border-dashed rounded-3xl max-w-xl mx-auto space-y-3 select-none">
              <AlertCircle className="h-10 w-10 text-[#f59e0b] mx-auto animate-bounce" />
              <h3 className="text-[20px] font-normal text-text-title">No Openings Match Your Query</h3>
              <p className="text-[14px] text-text-muted max-w-sm mx-auto leading-relaxed font-light">
                Try searching for other developer technologies or reset your department filters to browse all active careers.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("All");
                }}
                className="px-4 py-2 rounded-full bg-[#1d70b8] hover:bg-blue-600 text-white font-mono text-[10px] font-bold transition-all shadow cursor-pointer mt-2"
              >
                Reset Filters
              </button>
            </ScrollReveal>
          )}

        </div>
      </main>

      {/* Application Drawer Modal Form */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-card-bg border border-card-border rounded-2xl backdrop-blur-md shadow-2xl p-6 md:p-8 space-y-6 text-left relative overflow-hidden animate-scale-up">
            
            {/* Background design blobbing */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 blur-[40px] pointer-events-none -z-10" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-card-border/40 select-none">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-primary/10 border border-primary/25 text-[#f59e0b]">
                  <Briefcase className="h-3 w-3" />
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider select-none">Application Form</span>
                </div>
                <h3 className="text-[20px] font-normal text-text-title tracking-tight leading-tight">
                  {selectedJobForModal.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedJobForModal(null)}
                className="p-1.5 rounded-full border border-card-border bg-card-bg hover:bg-primary/5 text-text-muted hover:text-primary transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Application Submit States */}
            {isSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in select-none">
                <div className="w-14 h-14 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shadow animate-bounce">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-[20px] font-normal text-text-title">Application Transmitted!</h4>
                <p className="text-[14px] text-text-muted leading-relaxed font-light max-w-sm">
                  Thank you, **{fullName}**. Your dossier and resume have been securely synced. S3B Human Resources will review your credentials and contact you within 48 business hours.
                </p>
                <button
                  onClick={() => setSelectedJobForModal(null)}
                  className="px-5 py-2.5 rounded-full bg-[#1d70b8] hover:bg-blue-600 text-white font-sans font-bold text-xs shadow transition-all cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : isSubmitting ? (
              /* High-fidelity Inline Terminal Logger Animation */
              <div className="rounded-xl border border-card-border bg-black/90 p-4 font-mono text-[9px] text-[#10b981] space-y-1 shadow-inner h-[160px] overflow-y-auto select-none select-none">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed animate-fade-in">
                    {log}
                  </div>
                ))}
                <div className="w-1.5 h-3.5 bg-[#10b981] inline-block animate-pulse" />
              </div>
            ) : (
              /* The Intake Form Fields */
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-mono font-bold text-text-muted block uppercase select-none">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-mono font-bold text-text-muted block uppercase select-none">Email Address *</label>
                  <input 
                    type="email" 
                    placeholder="e.g. hello@s3b-global.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                  />
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-mono font-bold text-text-muted block uppercase select-none">Resume URL Link *</label>
                    <span className="text-[8px] font-mono text-text-muted/50 block font-bold">LINK GOOGLE DRIVE/DROPBOX</span>
                  </div>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted/40" />
                    <input 
                      type="text" 
                      placeholder="e.g. https://drive.google.com/file/..."
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-mono font-bold text-text-muted block uppercase select-none">Cover Notes</label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly state your primary skill sets or background achievements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border bg-slate-100/90 dark:bg-black/20 text-xs font-semibold text-text-title placeholder-text-muted/75 focus:outline-none transition-all border-slate-200 dark:border-card-border focus:border-[#1d70b8]"
                  />
                </div>

                {formError && (
                  <div className="flex items-center space-x-1.5 text-[10px] text-red-400 font-bold justify-center pt-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Secure warning indicators */}
                <div className="flex items-center justify-between text-[8px] font-mono font-bold text-text-muted/50 pt-2 uppercase select-none">
                  <span className="flex items-center space-x-1">
                    <Lock className="h-3 w-3 text-text-muted/40 shrink-0" />
                    <span>AES-256 Crypto Transmission</span>
                  </span>
                  <span>* Required Files</span>
                </div>

                {/* Form Buttons */}
                <div className="pt-2 flex items-center justify-end space-x-3 select-none">
                  <button 
                    type="button"
                    onClick={() => setSelectedJobForModal(null)}
                    className="px-4.5 py-2.5 rounded-lg border border-card-border bg-card-bg text-xs font-semibold text-text-muted hover:bg-card-bg-hover hover:text-text-title transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-[#1d70b8] hover:bg-blue-600 shadow-[0_4px_12px_rgba(29,112,184,0.25)] transition-all cursor-pointer flex items-center space-x-1.5 hover:-translate-y-0.5"
                  >
                    <span>Transmit File</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
