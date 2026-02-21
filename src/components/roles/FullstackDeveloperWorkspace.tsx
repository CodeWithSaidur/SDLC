"use client";

import React, { useState } from "react";
import {
    GitBranch,
    GitPullRequest,
    Code2,
    Terminal,
    Github,
    ExternalLink,
    Play,
    CheckCircle2,
    Clock,
    Layers,
    Search,
    Plus,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const FullstackDeveloperWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"tasks" | "git" | "validation">("tasks");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Development</h1>
                    <p className="text-muted-foreground mt-1">Translate designs and requirements into clean, modular code.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="glass-morphism rounded-lg px-3 py-1.5 flex items-center space-x-2 text-sm border-blue-500/20">
                        <Github className="w-4 h-4" />
                        <span className="font-medium">code-with-saidur/sdlc:main</span>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "tasks"} onClick={() => setActiveTab("tasks")} label="Task Management" />
                <TabButton active={activeTab === "git"} onClick={() => setActiveTab("git")} label="Git & PRs" />
                <TabButton active={activeTab === "validation"} onClick={() => setActiveTab("validation")} label="Architecture Validation" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "tasks" && <KanbanBoard />}
                    {activeTab === "git" && <GitIntegration />}
                    {activeTab === "validation" && <SchemaValidationView />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm flex items-center justify-between">
                            Current Sprint
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">Day 4/14</span>
                        </h3>
                        <div className="space-y-4">
                            <ProgressItem label="Backend API" percent={80} status="ahead" />
                            <ProgressItem label="UI Components" percent={45} status="stable" />
                            <ProgressItem label="Unit Tests" percent={15} status="behind" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Active PRs</h3>
                        <div className="space-y-3">
                            <PRItem id="#124" title="feat: rabbitmq-bus" author="Saidur" status="review" />
                            <PRItem id="#125" title="fix: auth-redirect" author="John" status="draft" />
                            <PRItem id="#123" title="feat: dashboard-ui" author="Sarah" status="merged" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
    <button onClick={onClick} className={cn("pb-4 text-sm font-medium transition-all relative", active ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
        {label}
        {active && <motion.div layoutId="devTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const KanbanBoard = () => (
    <div className="grid grid-cols-3 gap-6 h-[500px]">
        <KanbanColumn title="To Do" count={5}>
            <KanbanCard id="DEV-101" title="Setup Redis cache-aside middleware" priority="high" />
            <KanbanCard id="DEV-104" title="Implement idempotency keys for POST" priority="medium" />
        </KanbanColumn>
        <KanbanColumn title="In Progress" count={2}>
            <KanbanCard id="DEV-102" title="Connect Kafka consumer to Audit service" priority="critical" active />
        </KanbanColumn>
        <KanbanColumn title="Review/Done" count={12}>
            <KanbanCard id="DEV-100" title="Initial project scaffolding" priority="low" done />
        </KanbanColumn>
    </div>
);

const KanbanColumn = ({ title, count, children }: { title: string, count: number, children: React.ReactNode }) => (
    <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between px-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4>
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{count}</span>
        </div>
        <div className="flex-1 bg-muted/20 rounded-2xl p-3 space-y-3 border border-border/50">
            {children}
            <button className="w-full py-2 border border-dashed border-border rounded-xl text-xs text-muted-foreground hover:border-primary/50 transition-all flex items-center justify-center space-x-2">
                <Plus className="w-3 h-3" />
                <span>Add Task</span>
            </button>
        </div>
    </div>
);

const KanbanCard = ({ id, title, priority, active = false, done = false }: { id: string, title: string, priority: 'critical' | 'high' | 'medium' | 'low', active?: boolean, done?: boolean }) => (
    <motion.div
        whileHover={{ y: -2 }}
        className={cn(
            "p-4 rounded-xl border bg-card shadow-sm group cursor-pointer",
            active ? "border-primary/30 ring-2 ring-primary/5" : "border-border/50",
            done && "opacity-60"
        )}
    >
        <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground">{id}</span>
            <span className={cn(
                "w-2 h-2 rounded-full",
                priority === 'critical' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                    priority === 'high' ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" :
                        priority === 'medium' ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                            "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
            )} />
        </div>
        <h5 className="text-xs font-semibold leading-tight group-hover:text-primary transition-colors">{title}</h5>
        <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-2">
                {[1, 2].map(i => <div key={i} className="w-5 h-5 rounded-full bg-accent border border-background flex items-center justify-center text-[8px] font-bold">{i === 1 ? 'S' : 'J'}</div>)}
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>2d</span>
            </div>
        </div>
    </motion.div>
);

const GitIntegration = () => (
    <div className="space-y-4">
        <div className="glass-morphism rounded-xl p-6 bg-slate-950 border-white/5">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <Github className="w-8 h-8" />
                    <div>
                        <h4 className="font-bold">Sync Progress</h4>
                        <p className="text-xs text-muted-foreground">Automatically watching 12 files for changes.</p>
                    </div>
                </div>
                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                    <Terminal className="w-5 h-5" />
                </button>
            </div>

            <div className="font-mono text-[11px] space-y-2 bg-black/40 p-4 rounded-lg border border-white/5 overflow-x-auto">
                <div className="flex items-center space-x-2"><span className="text-green-500">$</span> <span>git status</span></div>
                <div className="text-muted-foreground opacity-60">On branch main</div>
                <div className="text-muted-foreground opacity-60">Your branch is up to date with 'origin/main'.</div>
                <div className="text-muted-foreground opacity-60">Changes not staged for commit:</div>
                <div className="text-red-400 ml-4">modified:   src/infrastructure/events/kafka.ts</div>
                <div className="flex items-center space-x-2"><span className="text-green-500">$</span> <span className="animate-pulse">_</span></div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="glass-morphism p-5 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">14 Active Branches</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="glass-morphism p-5 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <GitPullRequest className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold">4 Open PRs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
        </div>
    </div>
);

const SchemaValidationView = () => (
    <div className="glass-morphism rounded-xl p-8 space-y-6">
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-lg font-bold">Architecture Linter</h3>
                <p className="text-sm text-muted-foreground">Verifying hexagonal patterns and clean boundaries.</p>
            </div>
        </div>

        <div className="space-y-3">
            <ValidationRow label="Core-Infrastructure Boundary" status="pass" />
            <ValidationRow label="Use Case Dependencies" status="pass" />
            <ValidationRow label="Domain Entity Isolation" status="pass" />
            <ValidationRow label="Repository Interface Compliance" status="warn" msg="TenantRepository missing findBySlug" />
        </div>
    </div>
);

const ValidationRow = ({ label, status, msg }: { label: string, status: 'pass' | 'fail' | 'warn', msg?: string }) => (
    <div className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/5">
        <div className="flex items-center space-x-3">
            <div className={cn(
                "w-2 h-2 rounded-full",
                status === 'pass' ? "bg-green-500" : status === 'warn' ? "bg-yellow-500" : "bg-red-500"
            )} />
            <div>
                <span className="text-xs font-medium">{label}</span>
                {msg && <p className="text-[10px] text-orange-400 mt-0.5">{msg}</p>}
            </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{status}</span>
    </div>
);

const ProgressItem = ({ label, percent, status }: { label: string, percent: number, status: 'ahead' | 'stable' | 'behind' }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground font-medium">{label}</span>
            <span className={cn(
                "font-bold",
                status === 'ahead' ? "text-green-400" : status === 'behind' ? "text-red-400" : "text-blue-400"
            )}>{percent}%</span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div className={cn(
                "h-full rounded-full transition-all duration-1000",
                status === 'ahead' ? "bg-green-500" : status === 'behind' ? "bg-red-500" : "bg-blue-500"
            )} style={{ width: `${percent}%` }} />
        </div>
    </div>
);

const PRItem = ({ id, title, author, status }: { id: string, title: string, author: string, status: 'merged' | 'review' | 'draft' }) => (
    <div className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg transition-colors cursor-pointer group">
        <div className="flex flex-col">
            <span className="text-[11px] font-bold group-hover:text-primary transition-colors">{title}</span>
            <span className="text-[9px] text-muted-foreground">{id} by {author}</span>
        </div>
        <span className={cn(
            "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
            status === 'merged' ? "bg-purple-500/10 text-purple-400" :
                status === 'review' ? "bg-blue-500/10 text-blue-400" :
                    "bg-accent text-muted-foreground"
        )}>{status}</span>
    </div>
);
