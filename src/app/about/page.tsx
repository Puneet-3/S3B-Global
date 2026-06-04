"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CTASection from "@/components/CTASection";
import { 
  Globe, 
  TrendingUp, 
  Eye, 
  Target, 
  Sparkles, 
  Activity, 
  ArrowRight, 
  Compass,
  Cpu,
  Layers,
  Workflow,
  Server
} from "lucide-react";

// Interactive global map canvas representing S3B Edge node handshakes
function GlobalNetworkMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load high-fidelity world map background image
    const mapImg = new Image();
    mapImg.src = "/world-map.png";
    let mapLoaded = false;
    mapImg.onload = () => {
      mapLoaded = true;
    };

    let animationFrameId: number;
    let time = 0;

    let transform = { scale: 1, offsetX: 0, offsetY: 0 };

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const scale = Math.min(rect.width / 400, rect.height / 240);
      const offsetX = (rect.width - 400 * scale) / 2;
      const offsetY = (rect.height - 240 * scale) / 2;
      
      transform = { scale, offsetX, offsetY };
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // 10-City connection map node coordinates (aligned to high-fidelity background image)
    const nodes = [
      { name: "San Francisco", label: "San Francisco (USA)", x: 63, y: 84, r: 3.5, pulsePhase: 0 },
      { name: "Alpharetta", label: "Alpharetta, GA (USA)", x: 106, y: 88, r: 4.5, pulsePhase: Math.PI / 5 },
      { name: "São Paulo", label: "São Paulo (Brazil)", x: 148, y: 150, r: 3.5, pulsePhase: Math.PI / 4 },
      { name: "London", label: "London (UK)", x: 199, y: 70, r: 4.0, pulsePhase: Math.PI / 3 },
      { name: "Cape Town", label: "Cape Town (South Africa)", x: 219, y: 163, r: 3.5, pulsePhase: Math.PI / 2 },
      { name: "India", label: "India", x: 285, y: 112, r: 4.0, pulsePhase: Math.PI * (2 / 3) },
      { name: "Singapore", label: "Singapore", x: 312, y: 120, r: 3.5, pulsePhase: Math.PI * (3 / 4) },
      { name: "Tokyo", label: "Tokyo (Japan)", x: 354, y: 80, r: 4.0, pulsePhase: Math.PI * (4 / 5) },
      { name: "Sydney", label: "Sydney (Australia)", x: 369, y: 180, r: 4.0, pulsePhase: Math.PI * (5 / 6) },
      { name: "Auckland", label: "Auckland (New Zealand)", x: 391, y: 185, r: 4.5, pulsePhase: Math.PI }
    ];

    // Highly connected transit tracks with arrow indications
    const networkPaths = [
      { from: 0, to: 7, progress: 0.1, speed: 0.005 }, // San Francisco -> Tokyo (Transpacific)
      { from: 1, to: 3, progress: 0.3, speed: 0.004 }, // Alpharetta -> London (Transatlantic)
      { from: 2, to: 1, progress: 0.5, speed: 0.006 }, // São Paulo -> Alpharetta (Americas)
      { from: 3, to: 5, progress: 0.2, speed: 0.005 }, // London -> India (Eurasian Link)
      { from: 4, to: 3, progress: 0.7, speed: 0.004 }, // Cape Town -> London (Euro-African)
      { from: 5, to: 6, progress: 0.4, speed: 0.006 }, // India -> Singapore (Asian Transit)
      { from: 6, to: 7, progress: 0.0, speed: 0.007 }, // Singapore -> Tokyo (East Asian)
      { from: 6, to: 8, progress: 0.6, speed: 0.005 }, // Singapore -> Sydney (Oceania Link)
      { from: 7, to: 8, progress: 0.2, speed: 0.006 }, // Tokyo -> Sydney (Pacific Rim)
      { from: 8, to: 9, progress: 0.8, speed: 0.008 }  // Sydney -> Auckland (Tasman Corridor)
    ];

    // High-tech geometric polygon outlines for all major global continents
    const northAmerica = [
      { x: 25, y: 45 }, { x: 50, y: 40 }, { x: 90, y: 35 }, { x: 130, y: 60 },
      { x: 105, y: 72 }, { x: 100, y: 85 }, { x: 92, y: 92 }, { x: 80, y: 88 },
      { x: 74, y: 110 }, { x: 65, y: 110 }, { x: 50, y: 90 }, { x: 40, y: 70 }
    ];

    const southAmerica = [
      { x: 112, y: 122 }, { x: 125, y: 125 }, { x: 145, y: 145 }, { x: 140, y: 165 },
      { x: 125, y: 200 }, { x: 115, y: 195 }, { x: 105, y: 150 }, { x: 103, y: 132 }
    ];

    const eurasia = [
      { x: 160, y: 55 }, { x: 175, y: 35 }, { x: 200, y: 38 }, { x: 250, y: 35 },
      { x: 310, y: 40 }, { x: 345, y: 45 }, { x: 330, y: 70 }, { x: 310, y: 76 },
      { x: 295, y: 110 }, { x: 275, y: 115 }, { x: 255, y: 105 }, { x: 245, y: 112 },
      { x: 235, y: 100 }, { x: 215, y: 102 }, { x: 210, y: 90 }, { x: 190, y: 88 },
      { x: 180, y: 75 }, { x: 165, y: 72 }
    ];

    const africa = [
      { x: 170, y: 102 }, { x: 212, y: 100 }, { x: 220, y: 115 }, { x: 208, y: 180 },
      { x: 198, y: 175 }, { x: 175, y: 140 }, { x: 162, y: 125 }
    ];

    const australia = [
      { x: 315, y: 165 }, { x: 340, y: 155 }, { x: 355, y: 162 }, { x: 360, y: 182 },
      { x: 345, y: 195 }, { x: 320, y: 190 }
    ];

    const japan = [
      { x: 316, y: 80 }, { x: 324, y: 86 }, { x: 320, y: 94 }, { x: 312, y: 88 }
    ];

    const southeastAsia = [
      { x: 280, y: 132 }, { x: 295, y: 135 }, { x: 300, y: 145 }, { x: 285, y: 148 }
    ];

    const uk = [
      { x: 165, y: 55 }, { x: 172, y: 52 }, { x: 170, y: 60 }
    ];

    const nz = [
      { x: 370, y: 192 }, { x: 378, y: 196 }, { x: 374, y: 204 }
    ];

    const continents = [northAmerica, southAmerica, eurasia, africa, australia, japan, southeastAsia, uk, nz];

    const drawPolygon = (c: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
      if (points.length === 0) return;
      c.beginPath();
      c.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        c.lineTo(points[i].x, points[i].y);
      }
      c.closePath();
    };

    // Pre-calculate continental world outline dots inside shapes to completely eliminate 60fps flickering noise
    const staticDots: { x: number; y: number }[] = [];
    const continentalDots = [
      { cx: 75, cy: 70, rx: 45, ry: 25, dotCount: 35 },
      { cx: 125, cy: 155, rx: 25, ry: 40, dotCount: 22 },
      { cx: 220, cy: 65, rx: 75, ry: 35, dotCount: 50 },
      { cx: 195, cy: 140, rx: 25, ry: 45, dotCount: 26 },
      { cx: 325, cy: 175, rx: 35, ry: 20, dotCount: 28 }
    ];

    continentalDots.forEach(c => {
      for (let a = 0; a < c.dotCount; a++) {
        const theta = Math.random() * Math.PI * 2;
        const radX = Math.sqrt(Math.random()) * c.rx;
        const radY = Math.sqrt(Math.random()) * c.ry;
        const dx = c.cx + radX * Math.cos(theta);
        const dy = c.cy + radY * Math.sin(theta);
        staticDots.push({ x: dx, y: dy });
      }
    });

    const runFrame = () => {
      time += 0.015;
      const isLightMode = document.documentElement.classList.contains("light-mode");
      
      // Clear entire canvas safely by resetting transform
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Apply scaled centering transform
      ctx.save();
      ctx.translate(transform.offsetX, transform.offsetY);
      ctx.scale(transform.scale, transform.scale);

      // Draw high-fidelity world map background image aligned with canvas nodes coordinate space (fully clear opacity)
      if (mapLoaded) {
        ctx.save();
        ctx.globalAlpha = isLightMode ? 0.90 : 0.80;
        if (!isLightMode) {
          ctx.filter = "invert(1) hue-rotate(180deg)";
        }
        ctx.drawImage(mapImg, 0, 0, 400, 240);
        ctx.restore();
      }

      // 1. Draw stylized geometric background map outlines (Latitude / Longitude grids)
      ctx.strokeStyle = isLightMode ? "rgba(15, 23, 42, 0.012)" : "rgba(255, 255, 255, 0.006)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([2, 5]); // High-tech dotted/dashed grid lines
      
      // Draw horizontal grids
      for (let y = 30; y < 220; y += 30) {
        ctx.beginPath();
        ctx.moveTo(15, y);
        ctx.lineTo(385, y);
        ctx.stroke();
      }
      ctx.setLineDash([]); // Reset line dash for normal borders

      // Stylized world continental wireframes and dots are commented out to prevent alignment conflicts with high-fidelity world-map.png
      /* ctx.lineWidth = 0.65;
      ctx.strokeStyle = isLightMode ? "rgba(29, 112, 184, 0.16)" : "rgba(6, 182, 212, 0.09)";
      ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.04)" : "rgba(6, 182, 212, 0.02)";
      
      continents.forEach(poly => {
        drawPolygon(ctx, poly);
        ctx.fill();
        ctx.stroke();
      });

      // Draw stylized world continental dot segments (using static, clean outline dots)
      ctx.fillStyle = isLightMode ? "rgba(15, 23, 42, 0.07)" : "rgba(255, 255, 255, 0.05)";
      staticDots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.0, 0, Math.PI * 2);
        ctx.fill();
      }); */

      // 2. Draw curved connection arches representing secure VPN networks
      ctx.lineWidth = isLightMode ? 0.95 : 0.65;
      networkPaths.forEach(path => {
        const nodeA = nodes[path.from];
        const nodeB = nodes[path.to];

        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        
        // Midpoint with curve offset (create natural arching look)
        const midX = (nodeA.x + nodeB.x) / 2;
        const midY = (nodeA.y + nodeB.y) / 2 - 25;
        ctx.quadraticCurveTo(midX, midY, nodeB.x, nodeB.y);

        const edgeOpacity = isLightMode ? 0.32 : 0.12;
        const lineColor = isLightMode ? `rgba(29, 112, 184, ${edgeOpacity})` : `rgba(6, 182, 212, ${edgeOpacity})`;
        ctx.strokeStyle = lineColor;
        ctx.stroke();

        // Draw elegant, high-precision arrowheads showing data flow direction
        const arrowColor = isLightMode ? "rgba(29, 112, 184, 0.45)" : "rgba(6, 182, 212, 0.25)";
        const angle = Math.atan2(nodeB.y - midY, nodeB.x - midX);
        const headLength = 5.5;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(nodeB.x, nodeB.y);
        ctx.lineTo(nodeB.x - headLength * Math.cos(angle - Math.PI / 7), nodeB.y - headLength * Math.sin(angle - Math.PI / 7));
        ctx.lineTo(nodeB.x - headLength * Math.cos(angle + Math.PI / 7), nodeB.y - headLength * Math.sin(angle + Math.PI / 7));
        ctx.closePath();
        ctx.fillStyle = arrowColor;
        ctx.fill();
        ctx.restore();

        // 3. Draw Synaptic flow packets running across arches
        path.progress += path.speed;
        if (path.progress >= 1.0) {
          path.progress = 0;
        }

        // Quadratic bezier formula to compute running package coordinate
        const t = path.progress;
        const px = (1 - t) * (1 - t) * nodeA.x + 2 * (1 - t) * t * midX + t * t * nodeB.x;
        const py = (1 - t) * (1 - t) * nodeA.y + 2 * (1 - t) * t * midY + t * t * nodeB.y;

        ctx.save();
        ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.95)" : "rgba(6, 182, 212, 0.95)";
        ctx.shadowColor = ctx.fillStyle as string;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Draw edge nodes with pulsing halos
      nodes.forEach(node => {
        // Safe, positive-only pulse calculation to prevent negative radius issues and overlapping clutter
        const pulse = 1.5 + (Math.sin(time * 2.2 + node.pulsePhase) + 1.0) * 2.5;

        ctx.beginPath();
        ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.95)" : "rgba(255, 255, 255, 0.95)";
        ctx.arc(node.x, node.y, node.r * (isLightMode ? 1.15 : 0.88), 0, Math.PI * 2);
        ctx.fill();

        // Glowing radar waves
        ctx.beginPath();
        ctx.strokeStyle = isLightMode ? "rgba(29, 112, 184, 0.2)" : "rgba(6, 182, 212, 0.14)";
        ctx.lineWidth = 0.8;
        ctx.arc(node.x, node.y, node.r + pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Draw very small, highly clean typographic label next to the node
        ctx.fillStyle = isLightMode ? "rgba(15, 23, 42, 0.65)" : "rgba(255, 255, 255, 0.65)";
        ctx.font = "bold 6.5px monospace";
        ctx.fillText(node.name, node.x + 7, node.y + 2);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(runFrame);
    };

    animationFrameId = requestAnimationFrame(runFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block bg-transparent"
      style={{ minHeight: "220px" }}
    />
  );
}

// 5-Step process overview segments
const PROCESS_STEPS = [
  { id: "01", name: "Discover", desc: "Business goals & AI Agent opportunities" },
  { id: "02", name: "Define", desc: "AI strategies, agent workflows & planning" },
  { id: "03", name: "Design", desc: "UX/UI for AI & automated architectures" },
  { id: "04", name: "Develop", desc: "AI agent & automated digital workflows" },
  { id: "05", name: "Deliver", desc: "AI model testing, launch & optimization" }
];

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    document.title = "About - S3B Global";

    const checkTheme = () => {
      setIsDarkMode(!document.documentElement.classList.contains("light-mode"));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans antialiased overflow-x-hidden selection:bg-primary/30 selection:text-white transition-colors duration-300">
      
      {/* 1. Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 md:pt-24 pb-20 relative">
        {/* Background Visual Accents */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-brand-blue/3 blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-[40%] left-0 w-[400px] h-[400px] rounded-full bg-brand-green/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-brand-orange/3 blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 space-y-24">
          
          {/* Section 1: Hero Block */}
          <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-[54.4px] font-light text-text-title tracking-tight leading-[1.1] md:leading-none">
              About Us
            </h1>

            <p className="text-[16px] text-text-muted leading-relaxed max-w-3xl mx-auto font-light">
              We engineer autonomous AI agents, automated digital workflows, cloud solutions, and cognitive AI technologies to help businesses scale and automate operations.
            </p>
          </ScrollReveal>

          {/* Section 2: Company Overview & Global Connection Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Left Column (7 columns) */}
            <ScrollReveal className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d70b8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1d70b8]"></span>
                </span>
                <span className="text-[10px] md:text-xs font-mono font-normal uppercase tracking-wider text-text-muted">
                  GLOBAL TECHNOLOGY PARTNER
                </span>
              </div>

              <h2 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight leading-tight">
                Scalable AI Agents, Automated Workflows & Cognitive AI Solutions.
              </h2>
              
              <p className="text-[16px] text-text-muted leading-relaxed font-light">
                At S3B Global, we engineer autonomous AI agents, intelligent digital workflows, cloud scaling, and cognitive automation systems that help businesses improve operational efficiency, automate workflows, and scale globally.
              </p>

              <p className="text-[16px] text-text-muted leading-relaxed font-light">
                With deep expertise across AI agent development, automated workflow systems, cloud architecture, and enterprise IT services, we empower organizations to automate complex tasks and lead the AI transformation.
              </p>
            </ScrollReveal>

            {/* Right Column (5 columns) */}
            <ScrollReveal delay={150} className="lg:col-span-5">
              <div className="liquid-glass-glowing bg-card-bg/40 border-card-border p-5 rounded-2xl aspect-[4/3] flex items-center justify-center relative overflow-hidden group select-none shadow-md">
                <div className="absolute inset-0 z-10">
                  <GlobalNetworkMap />
                </div>
                
                {/* Visual compass layout overlay */}
                <div className="absolute top-4 left-4 z-10 font-mono text-[8px] font-bold text-text-muted/40 uppercase tracking-widest flex items-center space-x-1">
                  <Globe className="h-3 w-3 animate-spin-slow" />
                  <span>S3B GLOBAL EDGE GATEWAYS</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Section 3: Engineered for Performance & 5-Step Process */}
          <div className="space-y-16 max-w-5xl mx-auto">
            <ScrollReveal className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight">
                Intelligent AI Agents & Workflow Automation.
              </h2>
              
              <p className="text-[16px] text-text-muted leading-relaxed font-light">
                All of our autonomous AI agents, automated workflows, and cognitive digital systems are custom-built to help businesses automate operations and lead their industry.
              </p>

              {/* Anchors path */}
              <div className="flex items-center justify-center space-x-4 font-mono text-[9px] font-normal text-[#1d70b8] uppercase tracking-wider select-none">
                <span className="hover:text-primary transition-colors">From AI Strategy to Autonomous Agent Workflows</span>
              </div>
            </ScrollReveal>

            {/* Horizontal steps flow matching reference layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 select-none">
              {PROCESS_STEPS.map((step, idx) => (
                <ScrollReveal
                  key={idx}
                  delay={idx * 80}
                  className="liquid-glass-glowing bg-card-bg/35 border border-card-border p-5 rounded-2xl flex flex-col justify-between items-center text-center hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-normal text-primary/80 block">{step.id}</span>
                    <h4 className="text-[20px] font-normal text-text-title tracking-tight leading-tight">{step.name}</h4>
                    <p className="text-[14px] text-text-muted leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Section 4: Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto select-none">
            
            {/* Card 1: Our Vision */}
            <ScrollReveal 
              className="rounded-2xl border border-card-border bg-vision-card-bg p-8 text-left space-y-4 relative overflow-hidden group hover:border-[#1d70b8]/40 hover:shadow-md transition-all duration-300"
              style={{ borderColor: isDarkMode ? "rgba(29, 112, 184, 0.35)" : undefined }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-[#1d70b8]/20 to-transparent -z-10" />
              
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-[#1d70b8]/10 border border-[#1d70b8]/20 text-[#1d70b8]">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-light text-text-title tracking-tight">Our Vision</h3>
              </div>
              <p className="text-[14px] text-text-muted leading-relaxed font-light">
                To be the leading global technology partner for autonomous AI agents, intelligent workflow automation, and cognitive enterprise systems.
              </p>
            </ScrollReveal>

            {/* Card 2: Our Mission */}
            <ScrollReveal 
              delay={100} 
              className="rounded-2xl border border-card-border bg-vision-card-bg p-8 text-left space-y-4 relative overflow-hidden group hover:border-brand-green/40 hover:shadow-md transition-all duration-300"
              style={{ borderColor: isDarkMode ? "rgba(16, 185, 129, 0.35)" : undefined }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-brand-green/20 to-transparent -z-10" />
              
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-lg bg-brand-green/10 border border-brand-green/20 text-brand-green">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-light text-text-title tracking-tight">Our Mission</h3>
              </div>
              <p className="text-[14px] text-text-muted leading-relaxed font-light">
                To empower businesses through AI agent deployment, automated workflow engineering, cloud-scale systems, and end-to-end cognitive automation.
              </p>
            </ScrollReveal>
          </div>

          {/* Section 5: Growth Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Left Column: Growth SVG Chart (5 columns) */}
            <ScrollReveal className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] aspect-[4/3] relative p-5 bg-card-bg/40 border border-card-border rounded-2xl backdrop-blur-md flex items-end justify-between shadow-md select-none">
                
                {/* 4 Colored vertical charts bars */}
                <div className="w-10 bg-gradient-to-t from-[#f59e0b] to-[#d97706] rounded-t-lg transition-all duration-1000 h-[22%]" style={{ animationDelay: "100ms" }} />
                <div className="w-10 bg-gradient-to-t from-[#1d70b8] to-[#1e40af] rounded-t-lg transition-all duration-1000 h-[48%]" style={{ animationDelay: "300ms" }} />
                <div className="w-10 bg-gradient-to-t from-[#10b981] to-[#047857] rounded-t-lg transition-all duration-1000 h-[72%]" style={{ animationDelay: "500ms" }} />
                <div className="w-10 bg-gradient-to-t from-[#4ade80] to-[#16a34a] rounded-t-lg transition-all duration-1000 h-[92%]" style={{ animationDelay: "700ms" }} />
                
                {/* Upward neon green arrow mapping curve */}
                <svg className="absolute inset-0 w-full h-full text-[#10b981] pointer-events-none" viewBox="0 0 360 270">
                  <path 
                    d="M 50,225 C 110,210 180,135 285,55" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    className="drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                  />
                  {/* Arrowhead */}
                  <polygon points="280,48 295,50 288,65" fill="currentColor" />
                </svg>

                <div className="absolute top-4 left-4 font-mono text-[8px] font-bold text-text-muted/40 uppercase tracking-widest flex items-center space-x-1">
                  <TrendingUp className="h-3.5 w-3.5 text-[#10b981]" />
                  <span>S3B ACCELERATED GROWTH RATE</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Copy Block (7 columns) */}
            <ScrollReveal delay={150} className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-card-bg border border-card-border shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                </span>
                <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  OUR APPROACH
                </span>
              </div>

              <h2 className="text-3xl md:text-[54.4px] font-light text-text-title tracking-tight leading-tight">
                AI Agent & Automated Workflow Innovation.
              </h2>

              <p className="text-[16px] text-text-muted leading-relaxed font-light">
                We design and configure custom AI agents, automated workflow networks, and cognitive database integrations to accelerate growth.
              </p>
              
              <p className="text-[16px] text-text-muted leading-relaxed font-light">
                Our performance metrics focus on AI deployment speeds, workflow automation efficiency, cloud scaling capabilities, and agent accuracy.
              </p>
            </ScrollReveal>
          </div>

          {/* Section 6: Key Performance Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto select-none">
            {[
              { label: "Years of Experience", val: "8+" },
              { label: "PoC Annually", val: "110 +" },
              { label: "Service Satisfaction", val: "97.4 %" },
              { label: "Global Reach", val: "100%" }
            ].map((metric, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 100}
                className="liquid-glass-glowing bg-card-bg/35 border border-card-border p-6 rounded-2xl flex flex-col justify-between items-center text-center hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  {/* Glowing Blue dot indicators */}
                  <div className="flex items-center justify-center space-x-1.5 pb-1 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1d70b8] animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  </div>
                  
                  <span className="text-[14px] font-mono font-light text-text-muted/65 uppercase tracking-wider block">
                    {metric.label}
                  </span>
                  
                  <h3 className="text-[20px] font-light text-text-title tracking-tight leading-none">
                    {metric.val}
                  </h3>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

        {/* Section 7: Sleek Page CTA Section */}
        <CTASection />
      </main>

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
