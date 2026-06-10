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
  TrendingUp,
  Brain
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
    name: "Amin Toussaint",
    role: "Founder, BuzzBreach",
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
    features?: { title: string; desc: string; badge?: string }[];
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
    tagline: "Commanding the AI Frontier: Deep Expertise. Rapid Execution. Tangible ROI.",
    themeColor: "text-[#10b981]",
    lightColor: "text-[#10b981] bg-[#10b981]/10 border-[#10b981]/25",
    overviewHeader: "Intelligent Solutions for a Smarter Future",
    paragraphs: [
      "S3B Global enables businesses to fully leverage artificial intelligence through Agentic AI, Microsoft Copilot, machine learning, AI governance, and advanced knowledge management. Our AI-centric approach positions your organization at the cutting edge—equipping you to disrupt your market, accelerate technological progress, and achieve measurable business results."
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
        title: "AI Strategy & Consulting",
        desc: "Architect a tailored AI strategy that connects advanced technology directly to your core business outcomes. We partner with you from initial vision to measurable ROI, driving an enterprise-wide transformation that is both scalable and sustainable."
      },
      {
        num: "02",
        title: "Generative AI & Copilot Solutions",
        desc: "Develop intelligent, adaptive applications that grow alongside your user base. By embedding generative AI and leveraging Microsoft Copilot Studio, we build custom solutions that deliver highly personalized and predictive digital experiences."
      },
      {
        num: "03",
        title: "AI Governance & Ethics",
        desc: "Establish trust and maintain regulatory compliance with transparent, accountable AI systems. S3B Global helps you integrate comprehensive governance frameworks, ensuring your AI initiatives are developed and deployed responsibly."
      },
      {
        num: "04",
        title: "Enhanced Developer Productivity",
        desc: "Speed up your software lifecycle using AI-driven digital labor. Our tools assist human engineers by writing code, automating quality assurance, and mapping functional requirements—equipping your team to build faster and with absolute confidence."
      }
    ],
    solutionsTitle: "Transform Business Challenges into AI-Driven Competitive Advantages",
    solutions: [
      {
        title: "Demystify AI Complexity",
        desc: "We translate complex AI capabilities into clear, actionable strategies. Through targeted consulting and proprietary accelerators, S3B Global helps you bypass adoption barriers and engineer tailored, high-impact AI solutions without the guesswork.",
        icon: Brain,
        items: []
      },
      {
        title: "Unlock Enterprise Productivity",
        desc: "From proof-of-concept to full-scale deployment, we seamlessly integrate AI agents and intelligent automation into your core workflows and applications. We equip your teams with the exact tools needed to streamline operations and drastically maximize efficiency.",
        icon: Workflow,
        items: []
      },
      {
        title: "Drive Measurable Results",
        desc: "We bridge the gap between advanced technical execution and core business strategy. By aligning custom AI architectures directly with your enterprise objectives, we ensure every deployment acts as a catalyst for sustainable innovation and quantifiable ROI.",
        icon: Rocket,
        items: []
      }
    ],
    accelerator: {
      title: "Proprietary Accelerators",
      features: [
        {
          title: "Data Governance Accelerator",
          desc: "Architect and implement robust enterprise data governance utilizing Microsoft Purview, Fabric, and Profisee. Guarantee data integrity, comprehensive audit trails, and end-to-end lifecycle management.",
          badge: "GOVERN"
        },
        {
          title: "Microsoft Fabric Migration Assistant",
          desc: "Fast-track the migration of your data, schemas, and reports into Microsoft Fabric. Eliminate manual bottlenecks, enforce stringent quality standards, and realize AI-driven insights faster through highly reliable analytics.",
          badge: "MIGRATE"
        }
      ],
      buttonText: "GET STARTED",
      buttonHref: "#cta-section"
    },
    showTestimonials: true,
    ctaOverride: {
      title: "Ready to build your competitive edge?",
      desc: "Architect a custom AI transformation roadmap with S3B Global and start achieving measurable business results."
    }
  },
  "cloud-infrastructure": {
    badge: "SERVICE",
    title: "Cloud + Infrastructure",
    tagline: "AI-Powered Cloud. Architected for Growth. Secured for the Future.",
    themeColor: "text-[#1d70b8]",
    lightColor: "text-[#1d70b8] bg-[#1d70b8]/10 border-[#1d70b8]/25",
    overviewHeader: "Resilient Infrastructure for Modern Enterprises",
    paragraphs: [
      "S3B Global unlocks the full capabilities of Microsoft Azure through smart, resilient cloud architectures. Whether modernizing legacy systems or engineering cloud-native products, we utilize advanced AI agents, proprietary IP, and compliance-driven automation to build infrastructure that continuously evolves with your business."
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
        title: "Deploy Autonomous Infrastructure",
        desc: "Transition from static scripts to AI-augmented infrastructure capable of autonomous provisioning, monitoring, and self-optimization. By integrating Agentic AI, S3B Global delivers self-healing environments, policy-driven change management, and zero-touch operations."
      },
      {
        num: "02",
        title: "Next-Gen Platform Architecture",
        desc: "Transform legacy platforms into modern, AI-ready architectures. S3B Global refactors and re-platforms your core applications to unlock enterprise agility, securely integrate cloud-native services, and enable the seamless adoption of generative AI and agentic capabilities—establishing a robust foundation for continuous innovation."
      },
      {
        num: "03",
        title: "Optimize Your Cloud ROI",
        desc: "Maximize your cloud investment through AI-powered analytics. S3B Global continuously assesses system performance, resource utilization, and operational costs to implement strategies that enhance efficiency and optimize your overall cloud spend."
      },
      {
        num: "04",
        title: "Migrate with Zero Disruption",
        desc: "Accelerate your transition to Azure with highly secure, low-disruption migrations. S3B Global leverages AI-powered automation and specialized accelerators for AVS, Linux, PostgreSQL, and legacy workloads to drastically reduce risk, guarantee maximum uptime, and expedite modernization across cloud, hybrid, and edge environments."
      }
    ],
    solutionsTitle: "Eliminate IT Constraints with Smart Cloud Architecture",
    solutions: [
      {
        title: "Eliminate Downtime & Data Loss Risks",
        desc: "Guarantee business continuity through AI-monitored automated backups and resilient disaster recovery frameworks. We ensure seamless transitions and zero-disruption operations during your most critical cloud migrations.",
        icon: ShieldCheck,
        items: []
      },
      {
        title: "Optimize Infrastructure & Licensing Costs",
        desc: "Slash operational expenditures by adopting a highly scalable, pay-as-you-go cloud architecture. Our engineers help you eliminate resource over-provisioning and restructure your licensing models to drive immediate, long-term cost efficiency.",
        icon: BarChart,
        items: []
      },
      {
        title: "Neutralize Threats & Simplify Compliance",
        desc: "Fortify your enterprise against evolving cyber threats with proactive, AI-driven monitoring and native cloud security. We implement continuous, automated governance to ensure your infrastructure maintains strict adherence to complex industry regulations.",
        icon: Lock,
        items: []
      }
    ],
    accelerator: {
      title: "Proprietary Accelerators",
      features: [
        {
          title: "Intelligent Ops Automation Framework",
          desc: "Built natively on Azure, this framework leverages advanced AI and machine learning to autonomously handle issue detection, resolution, and ticketing. S3B Global delivers real-time operational insights to drive faster, smarter, and highly resilient enterprise operations at scale.",
          badge: "AUTOMATE"
        },
        {
          title: "Cloud Factory Migration Accelerator",
          desc: "A highly repeatable, automated engine for cloud migration aligned with Microsoft’s Cloud Adoption Framework (CAF). S3B Global accelerates secure lift-and-shift initiatives, seamless application refactoring, and comprehensive infrastructure modernization.",
          badge: "MIGRATE"
        }
      ],
      buttonText: "GET STARTED",
      buttonHref: "#cta-section"
    },
    showTestimonials: true,
    ctaOverride: {
      title: "Ready to optimize your cloud ecosystem?",
      desc: "Architect a highly scalable, secure, and cost-effective cloud environment with S3B Global today."
    }
  },
  "data-ai": {
    badge: "SERVICE",
    title: "Data + AI",
    tagline: "Powering the AI Frontier with Secure Data & Actionable Intelligence.",
    themeColor: "text-[#f59e0b]",
    lightColor: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/25",
    overviewHeader: "Fueling Growth with Actionable Insights",
    paragraphs: [
      "S3B Global empowers enterprises to convert complex data into strategic assets and intelligent products. Our Data and AI services equip leaders to drive precise decision-making through modern architectures, advanced analytics, and predictive modeling. Leveraging deep technical expertise and our proprietary accelerators, we engineer scalable data ecosystems that consistently deliver measurable business outcomes."
    ],
    statusMetrics: [
      { label: "THROUGHPUT VOLUME", val: "50M+ EVENTS/D" },
      { label: "SYNC LATENCY", val: "180ms STREAM" },
      { label: "SHARD RESILIENCE", val: "ACTIVE-ACTIVE" }
    ],
    image: "/data-ai-hero-new.png",
    capabilities: [
      {
        num: "01",
        title: "AI Readiness + Strategy",
        desc: "Establish a robust architecture to responsibly integrate, scale, and govern artificial intelligence across your enterprise. By aligning your data infrastructure with strict security protocols, we bridge the gap between AI ambition and execution—ensuring your data is reliable, accessible, and primed to drive tangible ROI."
      },
      {
        num: "02",
        title: "Data Migration + Modernization",
        desc: "Convert fragmented data into a centralized strategic asset. S3B Global migrates legacy systems to scalable, cloud-native architectures, streamlining your entire data ecosystem to build a future-proof foundation that accelerates processing and fuels continuous innovation."
      },
      {
        num: "03",
        title: "Enterprise Data Governance + Security",
        desc: "Guarantee the accuracy, privacy, and regulatory compliance of your digital assets. We implement comprehensive governance frameworks and automated access controls, ensuring high data integrity and robust master data management for secure, trusted utilization across your organization."
      },
      {
        num: "04",
        title: "Advanced Analytics + Predictive Insights",
        desc: "Translate complex datasets into autonomous, AI-driven business outcomes. By unifying data access and quality controls, we empower your teams with real-time, actionable insights that accelerate strategic decision-making, optimize productivity, and scale intelligent enterprise growth."
      }
    ],
    solutionsTitle: "Maximize Your Data Asset Value in the AI Era",
    solutions: [
      {
        title: "Unify Your Data Ecosystem",
        desc: "Break down enterprise silos by integrating disparate sources into a centralized, highly accessible architecture. We engineer a single source of truth that powers real-time visibility, cross-functional collaboration, and rapid, unified decision-making.",
        icon: Database,
        items: []
      },
      {
        title: "Engineer Data for AI Readiness",
        desc: "Intelligent systems demand absolute data integrity. We establish rigorous governance frameworks, automated validation protocols, and continuous monitoring to guarantee high-quality, reliable datasets that drive confident business strategies.",
        icon: ShieldCheck,
        items: []
      },
      {
        title: "Accelerate AI-Driven Innovation",
        desc: "In today’s competitive landscape, deployment speed is a baseline requirement. S3B Global leverages advanced methodologies and proprietary IP to deliver the most direct path to enterprise adoption, ensuring rapid, measurable ROI on your data infrastructure.",
        icon: Rocket,
        items: []
      }
    ],
    accelerator: {
      title: "Proprietary Accelerators",
      features: [
        {
          title: "Engineer a Modular Data Intelligence Platform",
          desc: "Engineer highly scalable, metadata-driven ecosystems utilizing Databricks and S3B Global’s proprietary modular engine. Our solution seamlessly supports decentralized data mesh frameworks and Medallion architectures—organizing data progressively from raw to business-ready—to accelerate your transition to a fully AI-enabled enterprise.",
          badge: "INTELLIGENT"
        },
        {
          title: "Centralize Operations with Control Tower",
          desc: "Driven by advanced artificial intelligence, S3B Global’s Control Tower integrates enterprise data, IoT, and high-performance analytics into a centralized operational hub. We empower your business with real-time, cross-industry insights to maximize efficiency, significantly reduce operational costs, and actively support your strategic ESG initiatives.",
          badge: "OPERATIONAL"
        }
      ],
      buttonText: "GET STARTED",
      buttonHref: "#cta-section"
    },
    showTestimonials: true,
    ctaOverride: {
      title: "Ready to unlock the true power of your data?",
      desc: "Partner with S3B Global to design a secure, scalable data architecture and accelerate your journey toward actionable intelligence."
    }
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
          desc: "Technology alone doesn't create impact. We combine strategic thinking, AI innovation, and experience design to solve business challenges at their root.",
          badge: "STRATEGIZE"
        },
        {
          title: "Design for Momentum",
          desc: "From customer experiences to internal operations, we build systems that keep organizations moving forward, faster, smarter, and with greater confidence.",
          badge: "DESIGN"
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
    title: "Enterprise IT Solutions + Services",
    tagline: "Enterprise Transformation, Reimagined",
    themeColor: "text-accent-purple",
    lightColor: "text-accent-purple bg-accent-purple/10 border-accent-purple/25",
    overviewHeader: "Simplifying complexity. Accelerating intelligence.",
    paragraphs: [
      "Simplifying complexity. Accelerating intelligence.",
      "Enterprise transformation starts with the right strategy, technology, and expertise. S3B partners with organizations to modernize systems, harness AI, and build secure, scalable digital ecosystems that improve efficiency, accelerate innovation, and support long-term growth."
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
        title: "Intelligent Infrastructure",
        desc: "Modernize legacy systems and unlock the flexibility, scalability, and performance required to support long-term digital growth."
      },
      {
        num: "02",
        title: "AI-Powered Cybersecurity & Digital Trust",
        desc: "Leverage AI-driven threat intelligence, proactive risk management, and enterprise-grade security strategies to identify vulnerabilities faster, respond smarter, and safeguard your business in an increasingly connected world."
      },
      {
        num: "03",
        title: "The Modern Workplace",
        desc: "Create connected experiences that empower employees, streamline collaboration, and elevate productivity across every touchpoint."
      },
      {
        num: "04",
        title: "Always-On Operations",
        desc: "Ensure business continuity through proactive management, continuous optimization, and expert-led support that keeps innovation moving forward."
      }
    ],
    solutionsTitle: "A.I.M. Methodology for Enterprise Transformation",
    solutions: [
      {
        title: "Advise",
        desc: "Strategic planning for IT assets, licensing, and solutions to align with business goals.",
        icon: ({ className }: { className?: string }) => <span className={`font-mono text-xl font-bold ${className}`}>A</span>,
        items: []
      },
      {
        title: "Implement",
        desc: "Seamless design, deployment, and adoption for empowered end-users.",
        icon: ({ className }: { className?: string }) => <span className={`font-mono text-xl font-bold ${className}`}>I</span>,
        items: []
      },
      {
        title: "Manage",
        desc: "Ongoing support for platforms, users, and devices to ensure consistent performance.",
        icon: ({ className }: { className?: string }) => <span className={`font-mono text-xl font-bold ${className}`}>M</span>,
        items: []
      }
    ],
    accelerator: {
      title: "Turning strategy into measurable momentum.",
      desc: "Every enterprise operates differently. That's why we don't believe in one-size-fits-all transformation. Our accelerator framework combines business strategy, AI innovation, modern technology, and human-centred design to create solutions tailored to your organization's goals, processes, and growth ambitions.",
      features: [
        {
          title: "Intelligence with Purpose",
          desc: "Align AI, data, and technology investments with real business objectives to create measurable value, not just innovation for innovation's sake.",
          badge: "ALIGN"
        },
        {
          title: "Flexible Digital Foundations",
          desc: "Create flexible digital foundations that adapt to changing business needs, support growth, and accelerate transformation at every stage.",
          badge: "SCALE"
        }
      ],
      buttonText: "GET STARTED",
      buttonHref: "#cta-section"
    },
    showTestimonials: true,
    ctaOverride: {
      title: "Ready to start your enterprise transformation?",
      desc: "Partner with S3B to modernize legacy systems, integrate intelligent technology, and build a secure digital foundation."
    }
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
      <main className="flex-1 w-full pt-28 md:pt-36 pb-20 relative">
        {/* Futuristic background glow blobs */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-primary/3 blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-[40%] left-0 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" />

        <div className="max-w-7xl mx-auto px-6 space-y-20">

          {/* Section 1: Hero Block */}
          <ScrollReveal className="text-center max-w-4xl mx-auto space-y-6">
            <div className={`inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-card-bg border shadow-sm ${activeService.lightColor}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              <span className="text-xs md:text-sm font-mono font-semibold uppercase tracking-wider">
                SERVICE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[54.4px] font-bold text-text-title tracking-tight leading-[1.1] md:leading-none">
              {activeService.title}
            </h1>
          </ScrollReveal>

          {/* Two-Column Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-5xl mx-auto pt-4 pb-8">
            {/* Left Column: Tagline & Description (7 columns) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex gap-6 items-stretch">
                {/* Visual vertical accent line with theme-colored gradient */}
                <div className="relative w-1 shrink-0 rounded-full overflow-hidden">
                  <div className={`absolute inset-0 bg-current ${activeService.themeColor} opacity-70`} />
                  <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-current ${activeService.themeColor} to-transparent animate-pulse`} />
                </div>
                <div className="space-y-6 py-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-[26px] xl:text-[34px] font-normal text-text-title leading-snug tracking-tight">
                    {activeService.tagline}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-text-muted leading-relaxed font-normal">
                    {activeService.paragraphs.map((p, idx) => (
                      <p key={idx} className="leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Column: Premium Hero Image + Interactive Canvas (5 columns) */}
            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.2rem] border border-card-border bg-card-bg shadow-2xl group">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-w-768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Section 2: Key Solutions Section (Challenges Decoded) */}
          <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight text-text-title uppercase">
                {activeService.solutionsTitle}
              </h2>
            </ScrollReveal>

            <div className="grid gap-8 md:gap-12 grid-cols-1 md:grid-cols-3 text-left items-stretch">
              {activeService.solutions.map((sol, index) => {
                const Icon = sol.icon;
                const isAIM = slug === "enterprise-services";
                return (
                  <ScrollReveal key={index} delay={index * 100} className="flex h-full group">
                    <div className={`flex flex-col space-y-4 w-full transition-all duration-300 ${isAIM ? "p-4 bg-transparent border-0" : "p-6 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm hover:shadow-md"
                      }`}>
                      {/* Icon */}
                      {isAIM ? (
                        <div className="relative flex items-end justify-start h-40 md:h-48 overflow-visible select-none mb-2">
                          {/* Soft background ambient glow behind the huge letter */}
                          <div className="absolute left-8 bottom-4 w-32 h-32 rounded-full bg-gradient-to-tr from-accent-purple/15 via-indigo-500/5 to-transparent blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                          {/* Huge Letter with modern multi-color gradient */}
                          <div className="text-[9.5rem] sm:text-[11.5rem] md:text-[13rem] font-extralight leading-none bg-gradient-to-br from-indigo-500 via-accent-purple to-pink-500 bg-clip-text text-transparent tracking-tighter transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1.5 font-sans drop-shadow-[0_8px_24px_rgba(168,85,247,0.12)]">
                            {sol.title.charAt(0)}
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-card-border bg-white/[0.02]">
                          <Icon className={`h-6 w-6 ${activeService.themeColor}`} />
                        </div>
                      )}
                      {/* Content */}
                      <div className="space-y-2 relative z-10">
                        <h3 className="text-xl md:text-2xl font-normal text-text-title tracking-wide">{sol.title}</h3>
                        <p className="text-[16px] text-text-muted leading-relaxed font-normal">{sol.desc}</p>
                      </div>
                      {/* Bullet list */}
                      {sol.items && sol.items.length > 0 && (
                        <ul className="space-y-2 pt-2 border-t border-card-border/40 font-normal">
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
              <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-card-bg border border-card-border shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] shrink-0" />
                <span className="text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.2em] text-text-muted">
                  CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title">
                What we offer
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100} className="w-full">
              <div className="divide-y divide-card-border/40 text-left">
                {activeService.capabilities.map((cap, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 py-8 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-5 flex items-baseline space-x-6">
                      <span className="font-mono text-2xl font-normal text-emerald-700 dark:text-[#10b981]">
                        {cap.num}
                      </span>
                      <h3 className="text-2xl font-semibold text-text-title">
                        {cap.title}
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-[17px] text-text-muted leading-relaxed font-normal">
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
                className="relative inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/50 hover:border-[#1d70b8] dark:border-cyan-400/60 dark:hover:border-cyan-300 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-white shadow-none dark:shadow-[0_0_18px_rgba(34,211,238,0.22)] dark:hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer select-none tracking-wider"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>LET'S GET STARTED</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </a>
            </ScrollReveal>
          </div>

          {/* Section 4: Accelerator Section */}
          {activeService.accelerator && (
            <div className="max-w-5xl mx-auto pt-16 border-t border-card-border/40 text-center space-y-12">
              <ScrollReveal className="space-y-4">
                <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-card-bg border border-card-border shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  <span className="text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-[#10b981]">
                    ACCELERATOR
                  </span>
                </div>
                {activeService.accelerator.title && (
                  <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title">
                    {activeService.accelerator.title}
                  </h2>
                )}
              </ScrollReveal>

              {activeService.accelerator.features ? (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
                    {activeService.accelerator.features.map((feat, idx) => (
                      <ScrollReveal key={idx} delay={idx * 100} className="flex h-full">
                        <div className="flex flex-col justify-between p-8 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm hover:shadow-md relative overflow-hidden group hover:border-[#10b981] dark:hover:border-[#10b981]/50 transition-all duration-300 w-full">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(16,185,129,0.04)_0%,transparent_70%)] pointer-events-none" />
                          <div className="space-y-4">
                            <span className="inline-flex items-center px-3.5 py-1 rounded-full border border-emerald-700/20 dark:border-[#10b981]/30 bg-emerald-700/5 dark:bg-[#10b981]/10 font-mono text-[13px] md:text-[14px] font-semibold text-emerald-700 dark:text-[#10b981] uppercase tracking-wider select-none">
                              0{idx + 1}. {feat.badge || "CONCEPT"}
                            </span>
                            <h3 className="text-2xl font-semibold text-text-title group-hover:text-[#10b981] transition-colors duration-300">
                              {feat.title}
                            </h3>
                            <p className="text-[16px] text-text-muted leading-relaxed font-normal font-sans">
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
                      className="relative inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <span>{activeService.accelerator.buttonText}</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </a>
                  </ScrollReveal>
                </div>
              ) : (
                <ScrollReveal delay={100} className="w-full">
                  <div className="p-8 md:p-12 rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm relative overflow-hidden text-left max-w-4xl mx-auto">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-4 max-w-2xl">
                        <p className="text-[18px] text-text-muted leading-relaxed font-normal font-sans">
                          {activeService.accelerator.desc}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <a
                          href={activeService.accelerator.buttonHref}
                          className="relative inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer"
                        >
                          <span className="relative z-10 flex items-center space-x-2">
                            <span>{activeService.accelerator.buttonText}</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
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
                <h2 className="text-3xl md:text-[44px] font-semibold tracking-tight text-text-title">
                  The Trust We've Earned
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={100} className="relative max-w-4xl mx-auto">
                <div className="relative overflow-hidden rounded-[2.2rem] border border-card-border bg-card-bg shadow-sm p-8 md:p-14 min-h-[260px] flex flex-col justify-between">
                  <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#10b981]/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="grid grid-cols-1 grid-rows-1 text-left w-full h-full items-center">
                    {TESTIMONIALS_LIST.map((t, idx) => {
                      const isActive = idx === currentTestimonial;
                      return (
                        <div
                          key={idx}
                          className={`col-start-1 row-start-1 transition-all duration-700 ease-in-out ${isActive
                            ? "opacity-100 translate-x-0 z-10 scale-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none translate-x-8 scale-95"
                            }`}
                        >
                          <blockquote className="text-lg md:text-xl font-normal text-text-title italic leading-relaxed mb-6 font-sans">
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
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentTestimonial ? "w-6 bg-[#10b981]" : "w-1.5 bg-card-border"
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
          <ScrollReveal id="cta-section" className="rounded-3xl border border-card-border bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0c1e3b] dark:via-[#051124] dark:to-[#040c1a] shadow-2xl p-10 sm:p-14 text-left max-w-5xl mx-auto relative overflow-hidden">
            {/* Background glowing telemetry */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(29,112,184,0.15)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
              {/* Left Column: Heading and Description */}
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-3xl md:text-[54.4px] font-bold text-text-title tracking-tight leading-tight">
                  {activeService.ctaOverride?.title || "Start Your AI Transformation"}
                </h2>
                <p className="text-[17px] text-text-muted leading-relaxed max-w-2xl font-normal">
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
                    <h3 className="text-sm font-bold text-text-title">Inquiry Safely Routed!</h3>
                    <p className="text-[10px] text-text-muted leading-relaxed font-medium">
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <div className="relative w-full">
                      <input
                        type="email"
                        required
                        placeholder="* Enter your work email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        className={`w-full px-6 py-4 rounded-full border bg-foreground/[0.04] text-sm font-semibold text-text-title placeholder-text-muted/60 focus:outline-none focus:ring-1 focus:ring-[#1d70b8] transition-all disabled:opacity-50 ${error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" : "border-card-border focus:border-[#1d70b8]"
                          }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative inline-flex items-center justify-center w-full px-8 py-4 rounded-full text-sm font-bold bg-transparent border border-[#1d70b8]/40 dark:border-cyan-400/40 hover:border-[#1d70b8] dark:hover:border-cyan-400 text-[#1d70b8] dark:text-cyan-400 hover:text-white dark:hover:text-[#050505] shadow-[0_0_12px_rgba(29,112,184,0.08)] dark:shadow-[0_0_15px_rgba(34,211,238,0.12)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-0.5 overflow-hidden cursor-pointer disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>GET STARTED</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1d70b8] to-[#125492] dark:from-cyan-400 dark:to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </button>
                  </form>
                )}

                {/* Subtext info */}
                <div className="mt-4 text-xs font-mono font-medium text-text-muted/70">
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
