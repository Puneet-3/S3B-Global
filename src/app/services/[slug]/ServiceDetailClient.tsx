"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Cloud, 
  Cpu, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  ArrowRight, 
  Terminal, 
  Settings, 
  AlertCircle, 
  Fingerprint, 
  Lock, 
  Server, 
  Activity, 
  Workflow, 
  Layers, 
  Binary, 
  GitBranch,
  Users,
  Rocket,
  BarChart,
  RefreshCw,
  Search,
  Target,
  Heart,
  Clock,
  TrendingUp
} from "lucide-react";

// Types for cloud transformation particles
interface GridNode {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
  vz: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  size: number;
}

// Types for AI synapses
interface AINeuron {
  x: number;
  y: number;
  ox: number;
  oy: number;
  size: number;
  vx: number;
  vy: number;
  pulsePhase: number;
}

interface SynapseSignal {
  path: number[];
  progress: number;
  speed: number;
  size: number;
  color: string;
}

// Types for Data Engineering
interface PipelineTrack {
  points: { x: number; y: number }[];
  yBase: number;
  phase: number;
}

interface PipelinePacket {
  trackIdx: number;
  xProgress: number;
  speed: number;
  size: number;
}

interface DatabaseShard {
  x: number;
  y: number;
  size: number;
  rot: number;
  pulse: number;
}

// Canvas Component that handles all 4 interactive service illustrations
function ServiceCanvas({ slug, themeColor }: { slug: string; themeColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    let transform = { scale: 1, offsetX: 0, offsetY: 0 };

    const isCloud = slug === "cloud-infrastructure" || slug === "cloud-transformation";
    const isAI = slug === "ai-transformation" || slug === "ai-integration" || slug === "digital-product-experience";
    const isData = slug === "data-ai" || slug === "data-engineering";
    const isEnterprise = slug === "enterprise-services";

    // A. Setup dimensions and retina support with uniform centering scale
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const scale = Math.min(rect.width / 400, rect.height / 250);
      const offsetX = (rect.width - 400 * scale) / 2;
      const offsetY = (rect.height - 250 * scale) / 2;
      
      transform = { scale, offsetX, offsetY };
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Setup mouse triggers with inverse transform mapping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      mouseRef.current = {
        x: (rawX - transform.offsetX) / transform.scale,
        y: (rawY - transform.offsetY) / transform.scale,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    const canvasParent = canvas.parentElement;
    if (canvasParent) {
      canvasParent.addEventListener("mousemove", handleMouseMove);
      canvasParent.addEventListener("mouseleave", handleMouseLeave);
    }

    // ----------------------------------------------------
    // INITIALIZE PARTICLE SYSTEMS ACCORDING TO SLUG
    // ----------------------------------------------------
    
    // 1. Cloud Infrastructure structures
    const cloudNodes: GridNode[] = [];
    const cloudPackets: DataPacket[] = [];
    const gridCols = 5;
    const gridRows = 5;
    
    if (isCloud) {
      // Create a 5x5 grid in 3D coordinate space
      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const x = 50 + c * 75 + (Math.random() - 0.5) * 15;
          const y = 40 + r * 50 + (Math.random() - 0.5) * 15;
          const z = (Math.random() - 0.5) * 40;
          cloudNodes.push({
            x, y, z,
            ox: x, oy: y, oz: z,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            vz: (Math.random() - 0.5) * 0.4,
          });
        }
      }

      // Initialize sliding cloud packets along grid connections
      for (let i = 0; i < 15; i++) {
        const from = Math.floor(Math.random() * cloudNodes.length);
        // Find a neighboring node in the grid (horizontal or vertical)
        const row = Math.floor(from / gridCols);
        const col = from % gridCols;
        const neighbors: number[] = [];
        
        if (row > 0) neighbors.push(from - gridCols);
        if (row < gridRows - 1) neighbors.push(from + gridCols);
        if (col > 0) neighbors.push(from - 1);
        if (col < gridCols - 1) neighbors.push(from + 1);

        if (neighbors.length > 0) {
          const to = neighbors[Math.floor(Math.random() * neighbors.length)];
          cloudPackets.push({
            fromNode: from,
            toNode: to,
            progress: Math.random(),
            speed: Math.random() * 0.008 + 0.004,
            size: Math.random() * 1.5 + 1
          });
        }
      }
    }

    // 2. AI Synapse neurons
    const aiNeurons: AINeuron[] = [];
    const aiSignals: SynapseSignal[] = [];
    
    if (isAI) {
      // Central primary cognitive core soma
      aiNeurons.push({
        x: 200, y: 125,
        ox: 200, oy: 125,
        size: 7,
        vx: 0, vy: 0,
        pulsePhase: 0
      });

      // Distribute primary axon roots around the center
      const rootCount = 6;
      for (let i = 0; i < rootCount; i++) {
        const angle = (i / rootCount) * Math.PI * 2;
        const dist = 60 + Math.random() * 20;
        const nx = 200 + Math.cos(angle) * dist;
        const ny = 125 + Math.sin(angle) * dist;
        aiNeurons.push({
          x: nx, y: ny,
          ox: nx, oy: ny,
          size: 3.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // Fill in secondary peripheral nodes
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 90 + Math.random() * 90;
        const nx = 200 + Math.cos(angle) * dist;
        const ny = 125 + Math.sin(angle) * dist;
        aiNeurons.push({
          x: nx, y: ny,
          ox: nx, oy: ny,
          size: Math.random() * 1.2 + 0.8,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // Initialize signals traveling along synaptic branches
      for (let i = 0; i < 18; i++) {
        // Path starts at central node (0), goes to a root node (1-6), then to a random close peripheral node
        const rootIdx = Math.floor(Math.random() * rootCount) + 1;
        
        // Find peripheral closest to root
        let closestIdx = 7;
        let minDist = 9999;
        const rootNode = aiNeurons[rootIdx];
        for (let j = 7; j < aiNeurons.length; j++) {
          const dx = aiNeurons[j].ox - rootNode.ox;
          const dy = aiNeurons[j].oy - rootNode.oy;
          const d = dx * dx + dy * dy;
          if (d < minDist) {
            minDist = d;
            closestIdx = j;
          }
        }

        aiSignals.push({
          path: [0, rootIdx, closestIdx],
          progress: Math.random(),
          speed: Math.random() * 0.012 + 0.006,
          size: Math.random() * 1.8 + 1,
          color: i % 2 === 0 ? "rgba(16, 185, 129, 0.95)" : "rgba(255, 255, 255, 0.95)"
        });
      }
    }

    // 3. Data Engineering pipelines
    const dataTracks: PipelineTrack[] = [];
    const dataPackets: PipelinePacket[] = [];
    const dataShards: DatabaseShard[] = [];
    
    if (isData) {
      // 3 Parallel horizontal tracks
      const baseLines = [60, 125, 190];
      baseLines.forEach((yVal, idx) => {
        const points: { x: number; y: number }[] = [];
        const resolution = 20;
        for (let i = 0; i <= resolution; i++) {
          points.push({
            x: (i / resolution) * 400,
            y: yVal
          });
        }
        dataTracks.push({
          points,
          yBase: yVal,
          phase: idx * (Math.PI / 3)
        });

        // Add databases/shards along the streams
        dataShards.push({
          x: 100 + idx * 110 + (Math.random() - 0.5) * 20,
          y: yVal,
          size: 16,
          rot: Math.random() * Math.PI * 2,
          pulse: 0
        });
      });

      // Stream of 60 running data packets
      for (let i = 0; i < 60; i++) {
        dataPackets.push({
          trackIdx: Math.floor(Math.random() * dataTracks.length),
          xProgress: Math.random(),
          speed: Math.random() * 0.006 + 0.003,
          size: Math.random() * 1.6 + 0.8
        });
      }
    }

    // 4. Enterprise Services assets
    const shieldPaths: { x: number; y: number }[] = [];
    const serverMatrix: { x: number; y: number; active: boolean; pulse: number }[] = [];
    if (isEnterprise) {
      // Draw 3D security shield vectors (24 coordinates shaping the outer crest)
      const steps = 30;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        let sx = 0;
        let sy = 0;
        
        if (t < 0.5) {
          // Left side
          const k = t * 2;
          sx = 200 - 45 * Math.sin(k * Math.PI / 2);
          sy = 70 + 80 * k - 25 * Math.pow(k, 3);
        } else {
          // Right side
          const k = (t - 0.5) * 2;
          sx = 200 + 45 * Math.cos((1 - k) * Math.PI / 2);
          sy = 150 - 80 * (1 - k) + 25 * Math.pow(1 - k, 3);
        }
        shieldPaths.push({ x: sx, y: sy });
      }

      // Server Matrix (6x6 modules on background plane)
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          serverMatrix.push({
            x: 95 + c * 52,
            y: 55 + r * 35,
            active: Math.random() > 0.3,
            pulse: Math.random() * Math.PI * 2
          });
        }
      }
    }

    // ----------------------------------------------------
    // ANIMATION RENDER LOOP
    // ----------------------------------------------------
    const runFrame = () => {
      time += 0.015;
      const isLightMode = document.documentElement.classList.contains("light-mode");

      // 1. Clear the entire canvas safely by resetting transform
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // 2. Apply scaled centering transform
      ctx.save();
      ctx.translate(transform.offsetX, transform.offsetY);
      ctx.scale(transform.scale, transform.scale);

      // Extract coordinates from mouse ref
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;

      // ----------------------------------------------------
      // DRAW CLOUD ENVIRONMENT
      // ----------------------------------------------------
      if (isCloud) {
        // Slow Y-axis rotation angles
        const rotY = time * 0.12;
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const cx = 200;
        const cy = 125;

        // Project 3D nodes
        const projected = cloudNodes.map(node => {
          // Breathe velocities
          const breath = Math.sin(time * 0.7 + node.ox * 0.05) * 4;
          
          let dx = node.ox + node.vx * breath - cx;
          let dy = node.oy + node.vy * breath - cy;
          let dz = node.oz + node.vz * breath;

          // Push nodes away from mouse in 2D perspective
          if (isMouseActive) {
            const rx = dx + cx;
            const ry = dy + cy;
            const mxDist = mx - rx;
            const myDist = my - ry;
            const mDist = Math.sqrt(mxDist * mxDist + myDist * myDist);
            if (mDist < 75) {
              const pull = (1.0 - mDist / 75) * 12;
              dx -= (mxDist / mDist) * pull;
              dy -= (myDist / mDist) * pull;
            }
          }

          // 3D rotation around Y axis
          const rx = dx * cosY - dz * sinY;
          const rz = dx * sinY + dz * cosY;

          // 2D orthographic projection scale
          const perspective = 300;
          const scale = perspective / (perspective + rz);
          
          return {
            x: cx + rx * scale,
            y: cy + dy * scale,
            scale,
            alpha: Math.min(1.0, 0.45 + (rz / 120))
          };
        });

        // Draw connections
        ctx.lineWidth = isLightMode ? 0.65 : 0.45;
        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            const currentIdx = r * gridCols + c;
            const nodeA = projected[currentIdx];

            // Right connection
            if (c < gridCols - 1) {
              const rightIdx = currentIdx + 1;
              const nodeB = projected[rightIdx];
              
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              
              const edgeOpacity = Math.min(nodeA.alpha, nodeB.alpha) * (isLightMode ? 0.28 : 0.12);
              ctx.strokeStyle = isLightMode ? `rgba(29, 112, 184, ${edgeOpacity})` : `rgba(6, 182, 212, ${edgeOpacity})`;
              ctx.stroke();
            }

            // Down connection
            if (r < gridRows - 1) {
              const downIdx = currentIdx + gridCols;
              const nodeB = projected[downIdx];
              
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              
              const edgeOpacity = Math.min(nodeA.alpha, nodeB.alpha) * (isLightMode ? 0.28 : 0.12);
              ctx.strokeStyle = isLightMode ? `rgba(29, 112, 184, ${edgeOpacity})` : `rgba(6, 182, 212, ${edgeOpacity})`;
              ctx.stroke();
            }
          }
        }

        // Draw sliding packets
        cloudPackets.forEach(p => {
          p.progress += p.speed;
          if (p.progress >= 1.0) {
            p.progress = 0;
            // Swap node connection targets randomly
            const from = p.toNode;
            const row = Math.floor(from / gridCols);
            const col = from % gridCols;
            const neighbors: number[] = [];
            
            if (row > 0) neighbors.push(from - gridCols);
            if (row < gridRows - 1) neighbors.push(from + gridCols);
            if (col > 0) neighbors.push(from - 1);
            if (col < gridCols - 1) neighbors.push(from + 1);

            if (neighbors.length > 0) {
              p.fromNode = from;
              p.toNode = neighbors[Math.floor(Math.random() * neighbors.length)];
            }
          }

          const nodeA = projected[p.fromNode];
          const nodeB = projected[p.toNode];
          if (nodeA && nodeB) {
            const px = nodeA.x + (nodeB.x - nodeA.x) * p.progress;
            const py = nodeA.y + (nodeB.y - nodeA.y) * p.progress;
            
            ctx.save();
            ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.95)" : "rgba(6, 182, 212, 0.95)";
            ctx.shadowColor = ctx.fillStyle as string;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(px, py, p.size * ((nodeA.scale + nodeB.scale) / 2), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // Draw grid nodes
        projected.forEach(node => {
          ctx.beginPath();
          ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.9)" : "rgba(255, 255, 255, 0.9)";
          ctx.globalAlpha = node.alpha * (isLightMode ? 1.5 : 1.0);
          ctx.arc(node.x, node.y, 2.5 * node.scale * (isLightMode ? 1.25 : 0.85), 0, Math.PI * 2);
          ctx.fill();

          // Outer halo
          ctx.beginPath();
          ctx.fillStyle = isLightMode ? "rgba(29, 112, 184, 0.16)" : "rgba(6, 182, 212, 0.12)";
          ctx.arc(node.x, node.y, 6.5 * node.scale, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
      }

      // ----------------------------------------------------
      // DRAW AI SYNAPTIC NETWORKS
      // ----------------------------------------------------
      if (isAI) {
        // Slowly drift nodes
        aiNeurons.forEach((node, idx) => {
          if (idx === 0) return; // keep core pinned
          
          const breathe = Math.sin(time * 0.8 + node.pulsePhase) * 1.5;
          node.x = node.ox + node.vx * breathe;
          node.y = node.oy + node.vy * breathe;

          // Pull slightly toward mouse
          if (isMouseActive) {
            const dx = mx - node.x;
            const dy = my - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              const factor = (1 - dist / 60) * 0.15;
              node.x += dx * factor;
              node.y += dy * factor;
            }
          }
        });

        // Draw dynamic webbing connecting closest synapse neighbors
        ctx.lineWidth = isLightMode ? 0.55 : 0.35;
        for (let i = 0; i < aiNeurons.length; i++) {
          const nA = aiNeurons[i];
          
          for (let j = i + 1; j < aiNeurons.length; j++) {
            const nB = aiNeurons[j];
            
            const dx = nA.x - nB.x;
            const dy = nA.y - nB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Connect only relatively close nodes to represent organic neural branches
            const threshold = i === 0 ? 95 : 36;
            if (dist < threshold) {
              ctx.beginPath();
              ctx.moveTo(nA.x, nA.y);
              ctx.lineTo(nB.x, nB.y);
              
              const factor = 1.0 - (dist / threshold);
              const opacity = factor * (isLightMode ? 0.32 : 0.08);
              ctx.strokeStyle = isLightMode ? `rgba(4, 120, 87, ${opacity})` : `rgba(16, 185, 129, ${opacity})`;
              ctx.stroke();
            }
          }
        }

        // Draw Synaptic Signals firing along pathways
        aiSignals.forEach(s => {
          s.progress += s.speed;
          if (s.progress >= 1.0) {
            s.progress = 0;
            s.speed = Math.random() * 0.012 + 0.006;
          }

          // Dynamic path coordinates
          const len = s.path.length;
          const segCount = len - 1;
          const pos = s.progress * segCount;
          const segIdx = Math.floor(pos);
          const segProgress = pos - segIdx;

          const nAIdx = s.path[Math.min(segIdx, len - 1)];
          const nBIdx = s.path[Math.min(segIdx + 1, len - 1)];

          const nA = aiNeurons[nAIdx];
          const nB = aiNeurons[nBIdx];

          if (nA && nB) {
            const sx = nA.x + (nB.x - nA.x) * segProgress;
            const sy = nA.y + (nB.y - nA.y) * segProgress;

            ctx.save();
            ctx.fillStyle = isLightMode ? (s.color.includes("185") ? "rgba(4, 120, 87, 0.95)" : "rgba(29, 112, 184, 0.95)") : s.color;
            ctx.shadowColor = ctx.fillStyle as string;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(sx, sy, s.size * (isLightMode ? 1.4 : 1.0), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // Draw Neuron Soma centers
        aiNeurons.forEach((node, idx) => {
          ctx.beginPath();
          ctx.fillStyle = idx === 0 
            ? (isLightMode ? "rgba(4, 120, 87, 0.95)" : "rgba(16, 185, 129, 0.95)") 
            : (isLightMode ? "rgba(4, 120, 87, 0.9)" : "rgba(255, 255, 255, 0.88)");
          
          const sizeMult = isLightMode ? 1.35 : 0.85;
          ctx.arc(node.x, node.y, node.size * sizeMult, 0, Math.PI * 2);
          ctx.fill();

          // Somas thinking core glows
          if (idx === 0 || (idx <= 6 && Math.sin(time * 3 + node.pulsePhase) > 0.7)) {
            ctx.save();
            ctx.fillStyle = isLightMode ? "rgba(4, 120, 87, 0.2)" : "rgba(16, 185, 129, 0.16)";
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // ----------------------------------------------------
      // DRAW DATA PIPELINES
      // ----------------------------------------------------
      if (isData) {
        // Draw relational flowing data pipelines
        dataTracks.forEach((track, trackIdx) => {
          ctx.beginPath();
          ctx.lineWidth = isLightMode ? 1.2 : 0.8;
          ctx.strokeStyle = isLightMode ? "rgba(194, 120, 3, 0.18)" : "rgba(245, 158, 11, 0.08)";

          const len = track.points.length;
          
          // Animate wave fluctuations on tracks based on time
          track.points.forEach((pt, ptIdx) => {
            const xPos = (ptIdx / (len - 1)) * 400;
            
            // Attract tracks slightly to cursor
            let mousePull = 0;
            if (isMouseActive) {
              const dx = mx - xPos;
              const dy = my - track.yBase;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 80) {
                mousePull = (1.0 - dist / 80) * (my - track.yBase) * 0.45;
              }
            }

            pt.x = xPos;
            pt.y = track.yBase + Math.sin(time * 1.5 + xPos * 0.03 + track.phase) * 6 + mousePull;

            if (ptIdx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });

        // Draw horizontal databases shards/junction disks
        dataShards.forEach((shard, idx) => {
          // Sync disk coordinate to point coordinate
          const track = dataTracks[idx];
          const closestPt = track.points[Math.floor(shard.x / 400 * track.points.length)];
          if (closestPt) {
            shard.y = closestPt.y;
          }

          shard.rot += 0.015;
          shard.pulse = Math.sin(time * 2.5 + idx * Math.PI) * 2;

          ctx.save();
          ctx.translate(shard.x, shard.y);
          
          // Shard glass plate background
          ctx.fillStyle = isLightMode ? "rgba(241, 245, 249, 0.8)" : "rgba(10, 15, 30, 0.8)";
          ctx.strokeStyle = isLightMode ? "rgba(194, 120, 3, 0.55)" : "rgba(245, 158, 11, 0.45)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(0, 0, shard.size + shard.pulse * 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Rotating relational dashed tracks
          ctx.strokeStyle = isLightMode ? "rgba(194, 120, 3, 0.65)" : "rgba(245, 158, 11, 0.55)";
          ctx.lineWidth = 0.8;
          ctx.setLineDash([3, 3]);
          ctx.rotate(shard.rot);
          ctx.beginPath();
          ctx.arc(0, 0, shard.size - 4, 0, Math.PI * 2);
          ctx.stroke();

          // Central connection core
          ctx.fillStyle = isLightMode ? "rgba(194, 120, 3, 0.9)" : "rgba(245, 158, 11, 0.9)";
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });

        // Draw flowing data packets along track equations
        dataPackets.forEach(p => {
          p.xProgress += p.speed;
          
          // Boost speed if mouse is magnetically near the packet
          if (isMouseActive) {
            const track = dataTracks[p.trackIdx];
            const px = p.xProgress * 400;
            const py = track.yBase;
            const dx = mx - px;
            const dy = my - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              p.xProgress += p.speed * 0.75; // speed up through gravity well
            }
          }

          if (p.xProgress >= 1.0) {
            p.xProgress = 0;
            p.speed = Math.random() * 0.006 + 0.003;
            // Transfer pipeline randomly
            p.trackIdx = Math.floor(Math.random() * dataTracks.length);
          }

          const track = dataTracks[p.trackIdx];
          const len = track.points.length;
          const idxFloat = p.xProgress * (len - 1);
          const baseIdx = Math.floor(idxFloat);
          const diff = idxFloat - baseIdx;

          const ptA = track.points[Math.min(baseIdx, len - 1)];
          const ptB = track.points[Math.min(baseIdx + 1, len - 1)];

          if (ptA && ptB) {
            const px = ptA.x + (ptB.x - ptA.x) * diff;
            const py = ptA.y + (ptB.y - ptA.y) * diff;

            ctx.save();
            ctx.fillStyle = isLightMode ? "rgba(194, 120, 3, 0.95)" : "rgba(245, 158, 11, 0.95)";
            
            // Sparkling packets passing databases
            dataShards.forEach(shard => {
              const dx = px - shard.x;
              const dy = py - shard.y;
              if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
                ctx.fillStyle = "#ffffff";
                ctx.shadowColor = isLightMode ? "rgba(194, 120, 3, 0.8)" : "rgba(245, 158, 11, 0.8)";
                ctx.shadowBlur = 6;
              }
            });

            ctx.beginPath();
            ctx.arc(px, py, p.size * (isLightMode ? 1.35 : 1.0), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
      }

      // ----------------------------------------------------
      // DRAW ENTERPRISE CYBER SHIELDS
      // ----------------------------------------------------
      if (isEnterprise) {
        // Draw server matrix in background
        serverMatrix.forEach(node => {
          node.pulse += 0.02;
          const statePulse = Math.sin(node.pulse);
          
          ctx.save();
          if (node.active) {
            // Pulse color green or purple
            ctx.fillStyle = isLightMode
              ? (statePulse > 0.4 ? "rgba(126, 34, 206, 0.28)" : "rgba(4, 120, 87, 0.28)")
              : (statePulse > 0.4 ? "rgba(168, 85, 247, 0.12)" : "rgba(16, 185, 129, 0.12)");
            ctx.strokeStyle = isLightMode
              ? (statePulse > 0.4 ? "rgba(126, 34, 206, 0.5)" : "rgba(4, 120, 87, 0.5)")
              : (statePulse > 0.4 ? "rgba(168, 85, 247, 0.25)" : "rgba(16, 185, 129, 0.25)");
          } else {
            ctx.fillStyle = isLightMode ? "rgba(15, 23, 42, 0.03)" : "rgba(255, 255, 255, 0.02)";
            ctx.strokeStyle = isLightMode ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.04)";
          }

          // Highlight server node on radar cursor sweep
          if (isMouseActive) {
            const dx = mx - node.x;
            const dy = my - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 45) {
              const factor = 1.0 - (dist / 45);
              ctx.strokeStyle = isLightMode ? `rgba(126, 34, 206, ${factor * 0.9})` : `rgba(168, 85, 247, ${factor * 0.7})`;
              ctx.lineWidth = 1.1;
            }
          }

          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.rect(node.x - 7, node.y - 5, 14, 10);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        });

        // 3D Concentric Compliance Security Rings rotating around the center
        const drawComplianceRing = (rx: number, ry: number, speed: number, color: string) => {
          ctx.save();
          ctx.translate(200, 125);
          ctx.rotate(time * speed);
          
          ctx.lineWidth = isLightMode ? 0.95 : 0.65;
          ctx.strokeStyle = color;
          
          ctx.beginPath();
          // Draw rotated tilted ellipse
          for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
            const ex = rx * Math.cos(angle);
            // Tilt the Y coordinate to fake 3D perspective
            const ey = ry * Math.sin(angle) * 0.35;
            
            if (angle === 0) ctx.moveTo(ex, ey);
            else ctx.lineTo(ex, ey);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        };

        // Inner compliance ring (glowing emerald green)
        const innerColor = isLightMode ? "rgba(4, 120, 87, 0.45)" : "rgba(16, 185, 129, 0.32)";
        drawComplianceRing(68, 68, -0.15, innerColor);

        // Outer compliance ring (glowing brand purple)
        const outerColor = isLightMode ? "rgba(126, 34, 206, 0.48)" : "rgba(168, 85, 247, 0.38)";
        drawComplianceRing(88, 88, 0.2, outerColor);

        // Draw Central Security Shield Crest
        ctx.save();
        ctx.beginPath();
        shieldPaths.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.closePath();
        
        ctx.fillStyle = isLightMode ? "rgba(241, 245, 249, 0.88)" : "rgba(7, 13, 28, 0.82)";
        ctx.strokeStyle = isLightMode ? "rgba(126, 34, 206, 0.85)" : "rgba(168, 85, 247, 0.75)";
        ctx.lineWidth = 1.6;
        ctx.shadowColor = isLightMode ? "rgba(126, 34, 206, 0.25)" : "rgba(168, 85, 247, 0.4)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Glowing shield core symbol
        ctx.save();
        ctx.fillStyle = isLightMode ? "rgba(126, 34, 206, 0.95)" : "rgba(168, 85, 247, 0.95)";
        ctx.beginPath();
        // Shield inner cross
        ctx.rect(198, 92, 4, 32);
        ctx.rect(188, 102, 24, 4);
        ctx.fill();
        ctx.restore();

        // Pulsing security lock scan arc
        const scanY = 75 + (Math.sin(time * 2.0) + 1.0) * 35;
        ctx.save();
        ctx.strokeStyle = isLightMode ? "rgba(4, 120, 87, 0.8)" : "rgba(16, 185, 129, 0.65)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(160, scanY);
        ctx.lineTo(240, scanY);
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(runFrame);
    };

    animationFrameId = requestAnimationFrame(runFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (canvasParent) {
        canvasParent.removeEventListener("mousemove", handleMouseMove);
        canvasParent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [slug]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block bg-transparent"
      style={{ minHeight: "220px" }}
    />
  );
}

const TESTIMONIALS_LIST = [
  {
    quote:
      "Collaborating with S3B Global has transformed our growth path. They crafted a strategic, highly professional digital platform and database. Their data-driven approach, clear communication, and commitment to our success have been a game-changer for our team.",
    name: "Amie Tremblay",
    role: "Founder, BuzzBound",
  },
  {
    quote:
      "S3B Global has been key to driving our digital transformation, turning complex challenges into scalable solutions with ease. Their innovation, professionalism, and responsiveness make them an invaluable technology partner.",
    name: "Satya Katakam",
    role: "Founder & CEO, iPivot",
  },
  {
    quote:
      "Partnering with S3B Global has significantly boosted our operational efficiency through their deep domain expertise and technical precision. Their result-driven approach and clear communication made them a trusted extension of our team.",
    name: "Sourabh Yadav",
    role: "Regional Head, Rocksensor",
  },
];

// Service content mapping matching approved specifications
const SERVICES_DATA: Record<string, {
  badge: string;
  title: string;
  tagline: string;
  themeColor: string; // Tailwind hex colors
  lightColor: string;
  overviewHeader: string;
  paragraphs: string[];
  statusMetrics: { label: string; val: string }[];
  image: string;
  capabilities: { num: string; title: string; desc: string }[];
  solutionsTitle: string;
  solutions: {
    title: string;
    desc: string;
    icon: React.ComponentType<any>;
    items: string[];
  }[];
  accelerator?: {
    title?: string;
    desc?: string;
    features?: { title: string; desc: string }[];
    buttonText: string;
    buttonHref: string;
  };
  showTestimonials?: boolean;
  ctaOverride?: {
    title: string;
    desc: string;
  };
}> = {
  "ai-transformation": {
    badge: "SERVICE",
    title: "AI Transformation",
    tagline: "Turning artificial intelligence into measurable business value.",
    themeColor: "text-[#10b981]",
    lightColor: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/25",
    overviewHeader: "Intelligent Solutions for a Smarter Future",
    paragraphs: [
      "Moving beyond the hype requires a strategic approach. We help enterprises identify high-impact use cases and deploy AI solutions that automate complex workflows, augment human capabilities, and drive real return on investment. Our focus is on practical, secure AI integration that solves specific operational bottlenecks."
    ],
    statusMetrics: [
      { label: "SYNAPSE SPEED", val: "<95ms PAYLOAD" },
      { label: "MODEL INTEGRITY", val: "99.2% ACCURATE" },
      { label: "AGENTS DEPLOYED", val: "25+ ACTIVE" }
    ],
    image: "/ai-transformation-hero.png",
    capabilities: [
      {
        num: "01",
        title: "AI Strategy & Roadmap",
        desc: "We audit your current processes to identify where AI can deliver the highest ROI. We define clear success metrics and build a phased implementation plan that aligns directly with your business objectives."
      },
      {
        num: "02",
        title: "Workflow Automation (Agents & RPA)",
        desc: "Replace manual, repetitive tasks with intelligent agents. We integrate robotic process automation and AI to handle data entry, customer routing, and back-office operations with zero fatigue."
      },
      {
        num: "03",
        title: "Custom Generative AI & Copilots",
        desc: "Build secure, private AI models trained on your proprietary data. We develop internal copilots that assist your team with drafting documents, querying internal knowledge bases, and generating code."
      },
      {
        num: "04",
        title: "AI Governance & Ethics",
        desc: "Deploy AI responsibly. We establish frameworks to ensure your AI systems maintain data privacy, eliminate bias, and comply with industry-specific security regulations."
      }
    ],
    solutionsTitle: "ENTERPRISE SOLUTIONS FOR AI ADOPTION",
    solutions: [
      {
        title: "Drive Operational Efficiency",
        desc: "Reduce manual effort and error rates across departments.",
        icon: Settings,
        items: [
          "Process bottleneck automation",
          "Smart document processing (OCR)",
          "Predictive maintenance models",
          "Intelligent resource allocation"
        ]
      },
      {
        title: "Enhance Customer Experience",
        desc: "Deliver instant, personalized support at scale.",
        icon: Users,
        items: [
          "Context-aware AI chatbots",
          "Dynamic recommendation engines",
          "Real-time sentiment analysis",
          "Voice and conversational AI"
        ]
      },
      {
        title: "Accelerate Innovation",
        desc: "Unlock new capabilities and revenue streams.",
        icon: Rocket,
        items: [
          "Rapid product prototyping",
          "Market trend analysis",
          "Competitive intelligence tracking",
          "Automated code generation"
        ]
      }
    ]
  },
  "cloud-infrastructure": {
    badge: "SERVICE",
    title: "Cloud & Infrastructure",
    tagline: "Scalable, secure, and cost-optimized cloud environments.",
    themeColor: "text-[#1d70b8]",
    lightColor: "text-[#1d70b8] bg-[#1d70b8]/10 border-[#1d70b8]/25",
    overviewHeader: "Resilient Infrastructure for Modern Enterprises",
    paragraphs: [
      "Modern businesses need infrastructure that adapts instantly to market demands. We help organizations migrate, manage, and modernize their systems on AWS, Azure, or Google Cloud. By optimizing architecture and eliminating wasted resources, we turn your cloud environment into a catalyst for agility rather than a cost center."
    ],
    statusMetrics: [
      { label: "SLA RESILIENCE", val: "99.999% UPTIME" },
      { label: "LATENCY THRESHOLD", val: "<12ms EDGE" },
      { label: "SECURE COMPLIANCE", val: "SOC 2 TYPE II" }
    ],
    image: "/cloud-infrastructure-hero.png",
    capabilities: [
      {
        num: "01",
        title: "Cloud Migration & Modernization",
        desc: "Transition smoothly from on-premise servers to the cloud with zero downtime. We re-architect legacy applications to take full advantage of cloud-native features like auto-scaling and serverless computing."
      },
      {
        num: "02",
        title: "Infrastructure as Code (IaC)",
        desc: "Automate the provisioning and management of your IT environment. Using tools like Terraform, we ensure your infrastructure is deployed consistently, rapidly, and without manual configuration errors."
      },
      {
        num: "03",
        title: "Cloud Cost Optimization (FinOps)",
        desc: "Stop paying for idle resources. We audit your cloud usage, implement right-sizing strategies, and set up automated billing alerts to drastically reduce your monthly cloud spend."
      },
      {
        num: "04",
        title: "Cloud Security Posture Management",
        desc: "Embed security directly into your cloud architecture. We configure continuous monitoring, strict identity controls, and automated compliance checks to secure your data across all environments."
      }
    ],
    solutionsTitle: "ENTERPRISE SOLUTIONS FOR CLOUD AGILITY",
    solutions: [
      {
        title: "Maximize System Reliability",
        desc: "Ensure continuous availability for mission-critical apps.",
        icon: Server,
        items: [
          "Multi-zone/Multi-region deployments",
          "Automated disaster recovery",
          "Intelligent load balancing",
          "24/7 performance monitoring"
        ]
      },
      {
        title: "Control Infrastructure Costs",
        desc: "Pay only for the compute power you actually use.",
        icon: BarChart,
        items: [
          "Resource right-sizing",
          "Spot and reserved instance usage",
          "Automated budget alerts",
          "Granular usage analytics"
        ]
      },
      {
        title: "Enable Rapid Deployment",
        desc: "Ship features faster with modern infrastructure.",
        icon: RefreshCw,
        items: [
          "CI/CD pipeline automation",
          "Containerization (Docker/Kubernetes)",
          "Microservices architecture",
          "Automated testing environments"
        ]
      }
    ]
  },
  "data-ai": {
    badge: "SERVICE",
    title: "Data + AI",
    tagline: "Transforming raw data into strategic intelligence.",
    themeColor: "text-[#f59e0b]",
    lightColor: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/25",
    overviewHeader: "Fueling Growth with Actionable Insights",
    paragraphs: [
      "Data is only valuable if you can act on it. We build the robust data pipelines and centralized warehouses necessary to break down information silos. By layering advanced analytics and predictive modeling on top of clean data, we give your leadership team the visibility they need to make confident, proactive decisions."
    ],
    statusMetrics: [
      { label: "THROUGHPUT VOLUME", val: "50M+ EVENTS/D" },
      { label: "SYNC LATENCY", val: "180ms STREAM" },
      { label: "SHARD RESILIENCE", val: "ACTIVE-ACTIVE" }
    ],
    image: "/data-ai-hero.png",
    capabilities: [
      {
        num: "01",
        title: "Modern Data Engineering",
        desc: "Build the foundation. We design and implement automated ETL (Extract, Transform, Load) pipelines that securely move data from fragmented sources into a centralized, highly structured data lake or warehouse."
      },
      {
        num: "02",
        title: "Advanced Analytics & BI",
        desc: "Turn complex datasets into clear narratives. We create interactive dashboards and reporting tools that provide real-time visibility into your most critical Key Performance Indicators (KPIs)."
      },
      {
        num: "03",
        title: "Predictive Modeling",
        desc: "Move from reacting to anticipating. We train machine learning models on your historical data to forecast future trends, customer behaviors, and market shifts before they happen."
      },
      {
        num: "04",
        title: "Data Governance & Quality",
        desc: "Ensure your insights are built on truth. We implement strict data validation rules, access controls, and cataloging to maintain data integrity and regulatory compliance."
      }
    ],
    solutionsTitle: "ENTERPRISE SOLUTIONS FOR DATA-DRIVEN GROWTH",
    solutions: [
      {
        title: "Unify Disconnected Data",
        desc: "Break down silos to create a single source of truth.",
        icon: Database,
        items: [
          "Centralized data warehouse setup",
          "Automated ETL pipelines",
          "Real-time API data syncing",
          "Legacy system data integration"
        ]
      },
      {
        title: "Gain Clear Visibility",
        desc: "See the whole picture across your organization.",
        icon: Search,
        items: [
          "Interactive BI dashboards",
          "Real-time KPI tracking",
          "Custom executive reporting",
          "Ad-hoc data exploration"
        ]
      },
      {
        title: "Predict Business Outcomes",
        desc: "Stay ahead of the curve with predictive insights.",
        icon: Target,
        items: [
          "Inventory demand forecasting",
          "Customer churn prediction",
          "Financial risk scoring",
          "Dynamic pricing optimization"
        ]
      }
    ]
  },
  "digital-product-experience": {
    badge: "SERVICE",
    title: "Digital Product Experience",
    tagline: "Designing intelligent digital experiences that users embrace and businesses depend on.",
    themeColor: "text-[#10b981]",
    lightColor: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/25",
    overviewHeader: "Crafting Engaging Digital Journeys",
    paragraphs: [
      "Today's best products don't just work; they anticipate, adapt, and delight. By combining AI-driven insights, user psychology, and modern design thinking, we create seamless digital experiences that accelerate growth, improve retention, and deliver measurable business impact."
    ],
    statusMetrics: [
      { label: "ENGAGEMENT RATE", val: "+45% YOY" },
      { label: "RETENTION INDEX", val: "94.8% HIGH" },
      { label: "LOAD PERFORMANCE", val: "0.8s AVERAGE" }
    ],
    image: "/digital-product-experience-hero.png",
    capabilities: [
      {
        num: "01",
        title: "Product Strategy & Intelligent Road mapping",
        desc: "Move beyond feature lists and build with purpose. We combine user insights, market intelligence, and business objectives to create strategic roadmaps that prioritize what matters most, accelerating growth, reducing waste, and maximizing product impact."
      },
      {
        num: "02",
        title: "AI-Driven UX/UI Design",
        desc: "Design experiences that feel effortless, intuitive, and future-ready. We craft intelligent interfaces across web, mobile, and enterprise platforms that reduce friction, increase engagement, and turn complex workflows into seamless interactions."
      },
      {
        num: "03",
        title: "User Research & Experience Validation",
        desc: "Replace assumptions with evidence. Through behavioural analysis, usability testing, customer interviews, and data-driven insights, we uncover what users truly need helping you validate ideas faster and build with confidence."
      },
      {
        num: "04",
        title: "Scalable Design Systems & Governance",
        desc: "Create once. Scale everywhere. We build flexible design systems and reusable component libraries that ensure consistency, accelerate development, and empower teams to deliver exceptional experiences at speed."
      }
    ],
    solutionsTitle: "Challenges Decoded. Experiences Reimagined.",
    solutions: [
      {
        title: "Too Many Ideas. Not Enough Direction.",
        desc: "Transforming product vision into a focused strategy that aligns users, teams, and business growth.",
        icon: Heart,
        items: []
      },
      {
        title: "Great Features. Frustrating Experience.",
        desc: "Creating seamless, intelligent journeys that feel natural from the first interaction to the last.",
        icon: Clock,
        items: []
      },
      {
        title: "Guesswork Driving Decisions.",
        desc: "Replacing assumptions with user insights, behavioural data, and evidence-backed design choices.",
        icon: TrendingUp,
        items: []
      }
    ],
    accelerator: {
      features: [
        {
          title: "Think Beyond Implementation",
          desc: "Technology alone doesn't create impact. We combine strategic thinking, AI innovation, and experience design to solve business challenges at their root."
        },
        {
          title: "Design for Momentum",
          desc: "From customer experiences to internal operations, we build systems that keep organizations moving forward, faster, smarter, and with greater confidence."
        }
      ],
      buttonText: "Get Details",
      buttonHref: "/contact"
    },
    showTestimonials: true,
    ctaOverride: {
      title: "Your Next Breakthrough Starts Here",
      desc: "Transform bold ideas into intelligent experiences, scalable solutions, and measurable business impact."
    }
  },
  "enterprise-services": {
    badge: "SERVICE",
    title: "Enterprise IT Solutions & Services",
    tagline: "Empowering modern enterprises with scalable, secure, and resilient IT infrastructure.",
    themeColor: "text-accent-purple",
    lightColor: "text-accent-purple bg-accent-purple/10 border-accent-purple/25",
    overviewHeader: "Institutional Resilience and Dedicated Support",
    paragraphs: [
      "Great enterprise IT doesn't just keep the lights on—it accelerates growth. We blend strategic infrastructure planning, robust cybersecurity, and advanced managed services to turn complex IT environments into streamlined, secure ecosystems. Our focus is helping organizations scale seamlessly, optimize operational costs, and build a resilient foundation for digital transformation."
    ],
    statusMetrics: [
      { label: "SLA DISPATCH", val: "<15m DEV RESPONSE" },
      { label: "THREAT SHIELD", val: "100% MITIGATION" },
      { label: "AUDIT RATING", val: "A+ CERTIFIED" }
    ],
    image: "/enterprise-services-hero.png",
    capabilities: [
      {
        num: "01",
        title: "Infrastructure Modernization",
        desc: "Upgrade and migrate legacy systems to scalable, hybrid, and cloud-ready architectures. We help you reduce technical debt, improve system agility, and build a flexible IT foundation that aligns directly with your long-term business goals."
      },
      {
        num: "02",
        title: "Cybersecurity & Compliance",
        desc: "Implement multi-layered security frameworks to safeguard your critical data. From identity and access management (IAM) to continuous threat monitoring, we ensure your infrastructure is protected against evolving cyber threats while meeting strict regulatory standards."
      },
      {
        num: "03",
        title: "Digital Workplace Solutions",
        desc: "Equip your teams to work securely from anywhere. We deploy intuitive collaboration platforms, secure virtual desktops, and mobile device management (MDM) solutions that drive employee productivity and streamline remote operations."
      },
      {
        num: "04",
        title: "Managed IT Services",
        desc: "Offload the burden of day-to-day IT management. We provide 24/7 proactive monitoring, automated patch management, and disaster recovery support, allowing your internal teams to stop troubleshooting and start focusing on strategic innovation."
      }
    ],
    solutionsTitle: "ENTERPRISE SOLUTIONS FOR IT MODERNIZATION",
    solutions: [
      {
        title: "Optimize IT Operations",
        desc: "Streamline resources and reduce operational overhead for maximum efficiency.",
        icon: Settings,
        items: [
          "Proactive 24/7 monitoring",
          "Automated patch management",
          "IT service desk support",
          "Vendor and asset management"
        ]
      },
      {
        title: "Strengthen Security Posture",
        desc: "Protect digital assets and mitigate risks against external threats.",
        icon: ShieldCheck,
        items: [
          "Endpoint detection and response",
          "Vulnerability assessments",
          "Zero-trust architecture",
          "Data backup and disaster recovery"
        ]
      },
      {
        title: "Accelerate Scalability",
        desc: "Build a high-performance infrastructure that grows with your business.",
        icon: Cloud,
        items: [
          "Cloud migration strategies",
          "Capacity and workload planning",
          "Network optimization",
          "High-availability architecture"
        ]
      }
    ]
  }
};

export default function ServiceDetailClient({ slug }: { slug: string }) {
  // Safe fallback if slug is unknown
  const activeService = SERVICES_DATA[slug] || SERVICES_DATA["cloud-infrastructure"] || SERVICES_DATA["cloud-transformation"];

  // CTA form states
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Testimonials Slider State & Handlers
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!activeService.showTestimonials) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeService.showTestimonials]);

  const nextSlide = () => {
    setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const prevSlide = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please specify an email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    setLogs([`[17:32:28] POST /api/v1/inquire?service=${slug} HTTP/1.1`]);

    const traceLogs = [
      `[info] Hostname: secure.s3b-global.com`,
      `[crypt] Activating TLS 1.3 cryptographic handshake protocol...`,
      `[crypt] AES-256-GCM package keyspace successfully established.`,
      `[cloud] Syncing client data intake record: ${email}`,
      `[database] Inserting secure transaction row in AWS US-East primary shards...`,
      `[success] 201 Created. Handshake complete! SLA notification dispatched to engineers.`
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

      {/* Main Page Layout */}
      <main className="flex-1 w-full pt-20 md:pt-24 pb-20 relative">
        {/* Futuristic background glow blobs */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-primary/3 blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-[40%] left-0 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 space-y-20">
          
          {/* Section 1: Hero Block */}
          <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
            <div className={`inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border shadow-sm ${activeService.lightColor}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              <span className="text-[10px] md:text-xs font-mono font-normal uppercase tracking-wider">
                SERVICE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[54.4px] font-light text-text-title tracking-tight leading-[1.1] md:leading-none">
              {activeService.title}
            </h1>
          </ScrollReveal>

          {/* Two-Column Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto pt-4 pb-8">
            {/* Left Column: Tagline & Description */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h2 className="text-xl sm:text-2xl md:text-[28px] font-light text-text-title leading-snug tracking-tight">
                {activeService.tagline}
              </h2>
              <div className="space-y-4 text-[16px] text-text-muted leading-relaxed font-light">
                {activeService.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            {/* Right Column: Premium Hero Image */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] border border-card-border bg-card-bg shadow-2xl">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-w-768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Section 2: Key Solutions Section (Challenges Decoded) */}
          <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-light tracking-tight text-text-title uppercase">
                {activeService.solutionsTitle}
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-3 text-left">
              {activeService.solutions.map((sol, index) => {
                const Icon = sol.icon;
                return (
                  <ScrollReveal key={index} delay={index * 100} className="flex h-full">
                    <div className="flex flex-col space-y-5 p-6 rounded-[2.2rem] border border-card-border bg-card-bg/20 w-full">
                      {/* Icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-white/[0.02]">
                        <Icon className={`h-6 w-6 ${activeService.themeColor}`} />
                      </div>
                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-normal text-text-title">{sol.title}</h3>
                        <p className="text-sm text-text-muted leading-relaxed font-light">{sol.desc}</p>
                      </div>
                      {/* Bullet list */}
                      {sol.items && sol.items.length > 0 && (
                        <ul className="space-y-2 pt-2 border-t border-card-border/40 font-light">
                          {sol.items.map((item, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-sm text-text-title">
                              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${activeService.themeColor.replace("text-", "bg-")}`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Section 3: Capabilities "What we offer" List */}
          <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
            <ScrollReveal className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                  CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl md:text-[44px] font-light tracking-tight text-text-title">
                What we offer
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100} className="w-full">
              <div className="divide-y divide-card-border/40 text-left">
                {activeService.capabilities.map((cap, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 py-8 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-5 flex items-baseline space-x-6">
                      <span className="font-mono text-2xl font-light text-[#10b981]">
                        {cap.num}
                      </span>
                      <h3 className="text-2xl font-light text-text-title">
                        {cap.title}
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-[16px] text-text-muted leading-relaxed font-light">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Let's Get Started Button */}
            <ScrollReveal delay={150} className="pt-6">
              <a
                href="#cta-section"
                className="inline-block px-10 py-4 rounded-full text-sm font-semibold tracking-wider text-[#041018] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 select-none cursor-pointer"
              >
                LET'S GET STARTED
              </a>
            </ScrollReveal>
          </div>

          {/* Section 4: Accelerator Section */}
          {activeService.accelerator && (
            <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
              <ScrollReveal className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#10b981]">
                    ACCELERATOR
                  </span>
                </div>
                {activeService.accelerator.title && (
                  <h2 className="text-3xl md:text-[44px] font-light tracking-tight text-text-title">
                    {activeService.accelerator.title}
                  </h2>
                )}
              </ScrollReveal>

              {activeService.accelerator.features ? (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {activeService.accelerator.features.map((feat, idx) => (
                      <ScrollReveal key={idx} delay={idx * 100} className="flex h-full">
                        <div className="flex flex-col justify-between p-8 rounded-[2.2rem] border border-card-border bg-card-bg/20 backdrop-blur-sm relative overflow-hidden group hover:border-[#10b981]/50 transition-all duration-300 w-full">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />
                          <div className="space-y-4">
                            <span className="font-mono text-xs text-[#10b981] uppercase tracking-[0.2em] block">
                              0{idx + 1}. CONCEPT
                            </span>
                            <h3 className="text-2xl font-light text-text-title group-hover:text-[#10b981] transition-colors duration-300">
                              {feat.title}
                            </h3>
                            <p className="text-[15px] text-text-muted leading-relaxed font-light font-sans">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>

                  <ScrollReveal delay={200} className="pt-4">
                    <a
                      href={activeService.accelerator.buttonHref}
                      className="inline-flex items-center space-x-2 px-10 py-4 rounded-full text-sm font-semibold tracking-wider text-white bg-white/[0.04] border border-card-border hover:bg-white/[0.08] hover:border-[#10b981] transition-all duration-300 group select-none cursor-pointer"
                    >
                      <span>{activeService.accelerator.buttonText}</span>
                      <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                    </a>
                  </ScrollReveal>
                </div>
              ) : (
                <ScrollReveal delay={100} className="w-full">
                  <div className="p-8 md:p-12 rounded-[2.2rem] border border-card-border bg-card-bg/25 backdrop-blur-sm relative overflow-hidden text-left max-w-4xl mx-auto">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-4 max-w-2xl">
                        <p className="text-[18px] text-text-muted leading-relaxed font-light font-sans">
                          {activeService.accelerator.desc}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <a
                          href={activeService.accelerator.buttonHref}
                          className="inline-flex items-center space-x-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wider text-white bg-white/[0.04] border border-card-border hover:bg-white/[0.08] hover:border-[#10b981] transition-all duration-300 group select-none cursor-pointer"
                        >
                          <span>{activeService.accelerator.buttonText}</span>
                          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          )}

          {/* Section 5: Testimonials Section */}
          {activeService.showTestimonials && (
            <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
              <ScrollReveal className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-card-bg border border-card-border shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] shrink-0" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                    TESTIMONIALS
                  </span>
                </div>
                <h2 className="text-3xl md:text-[44px] font-light tracking-tight text-text-title">
                  The Trust We've Earned
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={100} className="relative max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-[2.2rem] border border-card-border bg-card-bg/25 backdrop-blur-sm p-8 md:p-14 min-h-[260px] flex flex-col justify-between">
                  <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative h-full flex flex-col justify-center text-left">
                    {TESTIMONIALS_LIST.map((t, idx) => {
                      const isActive = idx === currentTestimonial;
                      return (
                        <div
                          key={idx}
                          className={`transition-all duration-700 ease-in-out ${
                            isActive
                              ? "opacity-100 translate-x-0 relative z-10 scale-100"
                              : "opacity-0 absolute pointer-events-none translate-x-8 scale-95"
                          }`}
                        >
                          <blockquote className="text-lg md:text-xl font-light text-text-title italic leading-relaxed mb-6 font-sans">
                            "{t.quote}"
                          </blockquote>
                          <div className="space-y-1">
                            <cite className="not-italic font-medium text-[16px] text-text-title block font-sans">
                              {t.name}
                            </cite>
                            <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                              {t.role}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-card-border/30">
                    <div className="flex space-x-2">
                      {TESTIMONIALS_LIST.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTestimonial(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentTestimonial ? "w-6 bg-[#10b981]" : "w-1.5 bg-card-border"
                          }`}
                          aria-label={`Go to testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={prevSlide}
                        className="p-2.5 rounded-full border border-card-border bg-white/[0.02] hover:bg-white/[0.06] text-text-title transition-colors cursor-pointer"
                        aria-label="Previous testimonial"
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2.5 rounded-full border border-card-border bg-white/[0.02] hover:bg-white/[0.06] text-text-title transition-colors cursor-pointer"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Section 4: High-Impact Consultation CTA Form */}
          <ScrollReveal id="cta-section" className="always-dark rounded-3xl border border-card-border bg-gradient-to-br from-[#0c1e3b] via-[#051124] to-[#040c1a] shadow-2xl p-10 sm:p-14 text-left max-w-5xl mx-auto relative overflow-hidden">
            {/* Background glowing telemetry */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(29,112,184,0.15)_0%,transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
              {/* Left Column: Heading and Description */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-3xl md:text-[54.4px] font-light text-white tracking-tight leading-tight">
                  {activeService.ctaOverride?.title || "Start Your AI Transformation"}
                </h2>
                <p className="text-[16px] text-zinc-300 leading-relaxed max-w-2xl font-light">
                  {activeService.ctaOverride?.desc || "Let's discuss how intelligent automation and scalable cloud infrastructure can accelerate your business."}
                </p>
              </div>

              {/* Right Column: Email Form */}
              <div className="lg:col-span-5 w-full">
                {isSubmitted ? (
                  <div className="py-4 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in select-none">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center text-[#10b981] shadow-md">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Inquiry Safely Routed!</h3>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                      Our system architect will reach out at **{email}** within 12 business hours.
                    </p>
                  </div>
                ) : isSubmitting ? (
                  /* High-fidelity Inline Terminal Logging Panel */
                  <div className="w-full rounded-xl border border-card-border bg-black/90 p-4 font-mono text-[9px] text-[#10b981] text-left space-y-1 shadow-inner h-[110px] overflow-y-auto select-none">
                    {logs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed animate-fade-in">
                        {log}
                      </div>
                    ))}
                    <div className="w-1.5 h-3.5 bg-[#10b981] inline-block animate-pulse" />
                  </div>
                ) : (
                  /* Inline Email Input Form */
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        required
                        placeholder="* Enter your work email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        className={`w-full px-6 py-4 rounded-full border bg-black/40 text-sm font-semibold text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-[#1d70b8] transition-all disabled:opacity-50 ${
                          error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-card-border focus:border-[#1d70b8]"
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 rounded-full text-sm font-bold text-[#041018] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 shadow-lg transition-all duration-300 shrink-0 select-none cursor-pointer disabled:opacity-50"
                    >
                      GET STARTED
                    </button>
                  </form>
                )}

                {/* Subtext info */}
                <div className="mt-4 text-xs font-mono font-medium text-zinc-400">
                  Connect with our enterprise IT experts today.
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </main>

      {/* 3. Global Sitemap Footer */}
      <Footer />
    </div>
  );
}
