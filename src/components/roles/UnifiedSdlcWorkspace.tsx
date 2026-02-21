"use client";

import React, { useState } from "react";
import {
    Lightbulb,
    Target,
    Layers,
    Palette,
    Database,
    Code2,
    ShieldCheck,
    Rocket,
    ArrowRight,
    CheckCircle2,
    Lock,
    Globe,
    Layout,
    Cpu,
    Server,
    Kanban,
    ExternalLink,
    ChevronRight,
    TrendingUp,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export const UnifiedSdlcWorkspace = () => {
    const [activePhase, setActivePhase] = useState(0);

    const phases = [
        {
            id: "validation",
            title: "Validate Idea",
            subtitle: "Identify real problems & core value",
            icon: Lightbulb,
            color: "text-amber-400",
            bg: "bg-amber-400/10",
            content: {
                stats: [
                    { label: "Problem Validation", value: "Verified", trend: "High" },
                    { label: "Core Value Prop", value: "Defined", trend: "MVP-Ready" }
                ],
                items: [
                    "Identify the real problem users face",
                    "Define the core value the app provides",
                    "Target audience identification",
                    "Early feedback loops"
                ]
            }
        },
        {
            id: "mvp",
            title: "Plan MVP",
            subtitle: "Define focused essential features",
            icon: Target,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            content: {
                stats: [
                    { label: "Essential Features", value: "5", trend: "Focused" },
                    { label: "Secondary Scope", value: "Deferred", trend: "Backlog" }
                ],
                items: [
                    "Identify must-have user stories",
                    "Strip away secondary features",
                    "Define success metrics for MVP",
                    "Map out the critical user path"
                ]
            }
        },
        {
            id: "system",
            title: "Design System",
            subtitle: "Architecture & Tech Stack",
            icon: Layers,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            content: {
                stats: [
                    { label: "Architecture", value: "Clean/Hex", trend: "Scale" },
                    { label: "Tech Stack", value: "Next/Bun/PG", trend: "Fast" }
                ],
                items: [
                    "Decide tech stack & database structure",
                    "Define authentication strategy",
                    "Plan deployment strategy (AWS/Vercel)",
                    "Internal API contract design"
                ]
            }
        },
        {
            id: "branding",
            title: "Branding",
            subtitle: "Name, Logo & Domain",
            icon: Palette,
            color: "text-pink-400",
            bg: "bg-pink-400/10",
            content: {
                stats: [
                    { label: "Business Name", value: "Locked", trend: "DNS" },
                    { label: "Dev Delay", value: "0ms", trend: "No Blocks" }
                ],
                items: [
                    "Finalize business name & logo",
                    "Purchase domain (GoDaddy/Namecheap)",
                    "Branding should NOT delay development",
                    "Setup project identity assets"
                ]
            }
        },
        {
            id: "uiux",
            title: "UI/UX Specs",
            subtitle: "Wireframing & Prototypes",
            icon: Layout,
            color: "text-indigo-400",
            bg: "bg-indigo-400/10",
            content: {
                stats: [
                    { label: "Wireframes", value: "Done", trend: "Figma" },
                    { label: "Prototyping", value: "Active", trend: "React" }
                ],
                items: [
                    "Wireframing using Figma",
                    "High-fidelity UI components",
                    "User flow visual mapping",
                    "Design system token exports"
                ]
            }
        },
        {
            id: "build",
            title: "Build Systematically",
            subtitle: "Database → API → Frontend",
            icon: Code2,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
            content: {
                stats: [
                    { label: "DB Schema", value: "Ready", trend: "Step 1" },
                    { label: "API/UI", value: "Syncing", trend: "Step 2/3" }
                ],
                items: [
                    "Phase 1: Database First strategy",
                    "Phase 2: Backend API implementation",
                    "Phase 3: Frontend integration",
                    "Full system end-to-end wiring"
                ]
            }
        },
        {
            id: "launch",
            title: "Launch & Iterate",
            subtitle: "Test, Deploy & Improve",
            icon: Rocket,
            color: "text-cyan-400",
            bg: "bg-cyan-400/10",
            content: {
                stats: [
                    { label: "Status", value: "Live", trend: "Global" },
                    { label: "CI/CD", value: "Active", trend: "Continuous" }
                ],
                items: [
                    "Test thoroughly & fix issues",
                    "Optimize system performance",
                    "Deploy to AWS or Vercel",
                    "Improve continuously based on data"
                ]
            }
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in h-full pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-4xl font-extrabold tracking-tight gradient-text">Modern SDLC Engine</h1>
                        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                            Practical Execution
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Validate the idea, design the system, build systematically, launch quickly, and improve continuously.
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="glass-morphism rounded-2xl px-6 py-3 text-sm font-bold flex items-center space-x-2 hover:bg-white/5 transition-all text-muted-foreground">
                        <TrendingUp className="w-4 h-4" />
                        <span>Project ROI: 142%</span>
                    </button>
                    <button className="bg-primary text-primary-foreground rounded-2xl px-6 py-3 text-sm font-bold flex items-center space-x-2 shadow-xl shadow-primary/20 hover:opacity-90 transition-all">
                        <Rocket className="w-4 h-4" />
                        <span>Execute Next Step</span>
                    </button>
                </div>
            </div>

            {/* The Master Timeline Visualizer */}
            <div className="relative mt-12 mb-20 px-4">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2 rounded-full" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${(activePhase / (phases.length - 1)) * 100}%` }}
                />

                <div className="relative flex justify-between">
                    {phases.map((phase, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center cursor-pointer group"
                            onClick={() => setActivePhase(idx)}
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-2xl relative z-10",
                                activePhase >= idx ? "bg-primary text-primary-foreground scale-110" : "bg-card text-muted-foreground border border-border group-hover:border-primary/50"
                            )}>
                                <phase.icon className="w-6 h-6" />
                                {activePhase > idx && (
                                    <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5 border-2 border-background">
                                        <CheckCircle2 className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 text-center">
                                <span className={cn(
                                    "text-[10px] font-bold uppercase tracking-widest block transition-colors",
                                    activePhase >= idx ? "text-primary" : "text-muted-foreground"
                                )}>
                                    Phase {idx + 1}
                                </span>
                                <span className={cn(
                                    "text-xs font-bold mt-1 block",
                                    activePhase === idx ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {phase.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Content Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-5 gap-8"
                >
                    {/* Phase Insight Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className={cn("rounded-3xl p-8 border border-white/5 relative overflow-hidden", phases[activePhase].bg)}>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                {React.createElement(phases[activePhase].icon, { className: "w-32 h-32" })}
                            </div>
                            <h2 className={cn("text-2xl font-bold mb-1", phases[activePhase].color)}>{phases[activePhase].title}</h2>
                            <p className="text-foreground/60 font-medium mb-8">{phases[activePhase].subtitle}</p>

                            <div className="space-y-6">
                                {phases[activePhase].content.stats.map((stat, i) => (
                                    <div key={i} className="bg-background/40 backdrop-blur-xl rounded-2xl p-4 border border-white/5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground font-bold uppercase">{stat.label}</span>
                                            <span className="text-[10px] font-bold text-green-400">{stat.trend}</span>
                                        </div>
                                        <div className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-morphism rounded-3xl p-6">
                            <h4 className="text-sm font-bold mb-4 flex items-center space-x-2">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                <span>Expert Guidance</span>
                            </h4>
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                "The key here is speed to validation. Don't let branding or perfect code delay the moment you put this in front of a real user."
                            </p>
                        </div>
                    </div>

                    {/* Checkbox Matrix */}
                    <div className="lg:col-span-3">
                        <div className="glass-morphism rounded-3xl p-8 h-full">
                            <h3 className="text-xl font-bold mb-8">Actionable Roadmap</h3>
                            <div className="space-y-4">
                                {phases[activePhase].content.items.map((item, idx) => (
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={idx}
                                        className="flex items-center group p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5"
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-lg border-2 flex items-center justify-center mr-4 transition-all",
                                            idx === 0 ? "bg-primary border-primary" : "border-muted-foreground/30 group-hover:border-primary/50"
                                        )}>
                                            {idx === 0 && <CheckCircle2 className="w-4 h-4 text-primary-foreground" />}
                                        </div>
                                        <span className={cn(
                                            "text-sm font-medium transition-colors",
                                            idx === 0 ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                        )}>{item}</span>
                                        <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-40" />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-muted/20 border border-border/50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Resources</span>
                                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <ToolLink label="Figma" color="purple" />
                                    <ToolLink label="GitHub" color="slate" />
                                    <ToolLink label="Drizzle" color="emerald" />
                                    <ToolLink label="Vercel" color="slate" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ToolLink = ({ label, color }: { label: string, color: string }) => (
    <div className="p-3 bg-background border border-border/50 rounded-xl flex items-center justify-center text-xs font-bold hover:border-primary/50 transition-colors cursor-pointer group">
        <span className={cn(
            "w-1.5 h-1.5 rounded-full mr-2",
            color === 'purple' ? "bg-purple-500" : color === 'emerald' ? "bg-emerald-500" : "bg-foreground"
        )} />
        {label}
    </div>
);

const ArrowUpRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
);
