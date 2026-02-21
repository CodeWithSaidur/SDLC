"use client";

import React, { useState } from "react";
import { ProjectPhase, SDLC_PHASES } from "@/core/domain/phases";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

// Workspace Imports
import { EntrepreneurWorkspace as ValidationView } from "@/components/roles/EntrepreneurWorkspace";
import { BusinessAnalystWorkspace as MvpView } from "@/components/roles/BusinessAnalystWorkspace";
import { SoftwareArchitectWorkspace as ArchitectureView } from "@/components/roles/SoftwareArchitectWorkspace";
import { UIUXDesignerWorkspace as DesignView } from "@/components/roles/UIUXDesignerWorkspace";
import { FullstackDeveloperWorkspace as BuildView } from "@/components/roles/FullstackDeveloperWorkspace";
import { SoftwareTesterWorkspace as QaView } from "@/components/roles/SoftwareTesterWorkspace";
import { DevOpsEngineerWorkspace as LaunchView } from "@/components/roles/DevOpsEngineerWorkspace";
import { UnifiedSdlcWorkspace as OverviewView } from "@/components/roles/UnifiedSdlcWorkspace";

export const DashboardShell: React.FC = () => {
    const [activePhase, setActivePhase] = useState<ProjectPhase>("IDEA_VALIDATION");
    const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview");

    return (
        <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden font-sans selection:bg-primary selection:text-primary-foreground">
            {/* Minimalist Phase Sidebar */}
            <aside className="w-72 bg-card/30 border-r border-white/5 flex flex-col backdrop-blur-3xl relative z-20">
                <div className="p-8">
                    <div className="flex items-center space-x-3 mb-10">
                        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse">
                            <Icons.Zap className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <span className="font-black text-xl tracking-tighter uppercase">SDLC <span className="text-primary font-medium">Engine</span></span>
                            <div className="text-[9px] font-bold text-muted-foreground tracking-[0.2em] uppercase">Enterprise-Grade Flow</div>
                        </div>
                    </div>

                    <nav className="space-y-4">
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 opacity-50 px-2">Project Lifecycle</div>
                        {SDLC_PHASES.map((phase, idx) => {
                            const Icon = (Icons as any)[phase.icon] || Icons.Circle;
                            const isActive = activePhase === phase.id;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => {
                                        setActivePhase(phase.id);
                                        setViewMode("detailed");
                                    }}
                                    className={cn(
                                        "w-full flex flex-col p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden border",
                                        isActive
                                            ? "bg-primary/10 border-primary/20"
                                            : "border-transparent hover:bg-white/[0.03] text-muted-foreground hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center space-x-4 relative z-10">
                                        <div className={cn(
                                            "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg",
                                            isActive ? "bg-primary text-white" : "bg-white/5 text-muted-foreground group-hover:bg-white/10"
                                        )}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-sm font-bold tracking-tight">{phase.label}</span>
                                            <span className="text-[9px] font-medium opacity-50 line-clamp-1">{phase.description}</span>
                                        </div>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active-pill"
                                            className="absolute inset-0 bg-primary/5 z-0"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/5">
                    <button className="flex items-center space-x-3 p-3 w-full rounded-xl hover:bg-white/5 transition-all text-muted-foreground">
                        <Icons.Settings className="w-5 h-5" />
                        <span className="text-sm font-semibold">Project Settings</span>
                    </button>
                    <button className="flex items-center space-x-3 p-3 w-full rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all mt-1">
                        <Icons.LogOut className="w-5 h-5" />
                        <span className="text-sm font-semibold">Exit Engine</span>
                    </button>
                </div>
            </aside>

            {/* Main Stage */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Stage Header */}
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl relative z-10">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Active Project: <span className="text-foreground">SaaS Platform v1.0</span></span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium text-muted-foreground">Global Progress:</span>
                            <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: "45%" }}
                                />
                            </div>
                            <span className="text-[10px] font-black text-primary">45%</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => setViewMode("overview")}
                            className={cn(
                                "p-2.5 rounded-xl border transition-all",
                                viewMode === "overview" ? "bg-white/10 border-white/10" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <Icons.LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("detailed")}
                            className={cn(
                                "p-2.5 rounded-xl border transition-all",
                                viewMode === "detailed" ? "bg-white/10 border-white/10" : "border-transparent text-muted-foreground"
                            )}
                        >
                            <Icons.Maximize2 className="w-5 h-5" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-accent border border-white/10 shadow-inner" />
                    </div>
                </header>

                {/* Stage Content */}
                <main className="flex-1 overflow-y-auto p-12 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={viewMode === "overview" ? "engine-overview" : activePhase}
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.02, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-7xl mx-auto h-full"
                        >
                            {viewMode === "overview" ? (
                                <OverviewView />
                            ) : (
                                <PhasePortal phase={activePhase} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

const PhasePortal: React.FC<{ phase: ProjectPhase }> = ({ phase }) => {
    switch (phase) {
        case "IDEA_VALIDATION":
            return <ValidationView />;
        case "MVP_SCOPING":
            return <MvpView />;
        case "SYSTEM_DESIGN":
            return <ArchitectureView />;
        case "BRANDING":
            return (
                <div className="glass-morphism rounded-3xl p-12 text-center space-y-6">
                    <div className="w-20 h-20 bg-pink-500/10 rounded-3xl flex items-center justify-center mx-auto text-pink-500">
                        <Icons.Palette className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold">Brand Identity Matrix</h2>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Finalize your business name, logo, and domain. branding supports the product, but execution determines success.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-left">
                            <span className="text-[10px] font-black uppercase opacity-40">Business Name</span>
                            <div className="text-lg font-bold mt-2">SDLC Engine</div>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-left">
                            <span className="text-[10px] font-black uppercase opacity-40">Domain Status</span>
                            <div className="text-lg font-bold mt-2 text-green-500">Secured</div>
                        </div>
                    </div>
                </div>
            );
        case "UIUX_DESIGN":
            return <DesignView />;
        case "DEVELOPMENT":
            return <BuildView />;
        case "QA_OPTIMIZATION":
            return <QaView />;
        case "LAUNCH_SCALE":
            return <LaunchView />;
        default:
            return <OverviewView />;
    }
};
