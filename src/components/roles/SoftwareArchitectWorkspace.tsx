"use client";

import React, { useState } from "react";
import {
    Box,
    Layers,
    Settings,
    Database,
    Globe,
    Cpu,
    Share2,
    Code2,
    GitBranch,
    ChevronRight,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const SoftwareArchitectWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"c4" | "api" | "decisions">("c4");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">System Architecture</h1>
                    <p className="text-muted-foreground mt-1">Design scalable, resilient systems using standard patterns.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="glass-morphism px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-white/5 transition-all">
                        <Download className="w-4 h-4" />
                        <span>Export DDL</span>
                    </button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Share2 className="w-4 h-4" />
                        <span>Share Design</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "c4"} onClick={() => setActiveTab("c4")} label="C4 Diagrams" />
                <TabButton active={activeTab === "api"} onClick={() => setActiveTab("api")} label="API Contracts" />
                <TabButton active={activeTab === "decisions"} onClick={() => setActiveTab("decisions")} label="Decision Logs (ADR)" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "c4" && <C4Workspace />}
                    {activeTab === "api" && <APIWorkspace />}
                    {activeTab === "decisions" && <DecisionLogs />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Tech Stack</h3>
                        <div className="space-y-3">
                            <TechItem icon={<Globe className="w-4 h-4 text-blue-400" />} name="Next.js 16" version="latest" />
                            <TechItem icon={<Cpu className="w-4 h-4 text-purple-400" />} name="Bun Runtime" version="v1.1" />
                            <TechItem icon={<Database className="w-4 h-4 text-green-400" />} name="PostgreSQL" version="v16" />
                            <TechItem icon={<Box className="w-4 h-4 text-orange-400" />} name="Redis" version="v7.2" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Design Principles</h3>
                        <div className="space-y-3">
                            <PrincipleItem text="Hexagonal Architecture" checked />
                            <PrincipleItem text="Event-Driven Flow" checked />
                            <PrincipleItem text="Stateless Auth" checked />
                            <PrincipleItem text="CQRS (Partial)" checked={false} />
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
        {active && <motion.div layoutId="archTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const C4Workspace = () => (
    <div className="glass-morphism rounded-xl aspect-[16/9] flex items-center justify-center relative overflow-hidden group">
        {/* Simulation of a diagramming canvas */}
        <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(0,1fr))] grid-rows-[repeat(40,minmax(0,1fr))] opacity-[0.03]">
            {Array.from({ length: 1600 }).map((_, i) => <div key={i} className="border border-white/20" />)}
        </div>

        <div className="flex flex-col items-center space-y-8 z-10">
            <DiagramNode label="Web App" icon={<Globe className="w-6 h-6" />} color="blue" />
            <div className="h-16 w-[2px] bg-gradient-to-b from-blue-500 to-purple-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 py-0.5 text-[8px] font-mono border border-border rounded whitespace-nowrap uppercase tracking-widest text-muted-foreground">JSON/HTTPS</div>
            </div>
            <DiagramNode label="API Gateway" icon={<Layers className="w-6 h-6" />} color="purple" />
            <div className="h-16 w-[2px] bg-gradient-to-b from-purple-500 to-green-500 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 py-0.5 text-[8px] font-mono border border-border rounded whitespace-nowrap uppercase tracking-widest text-muted-foreground">Prisma/Drizzle</div>
            </div>
            <div className="flex space-x-12">
                <DiagramNode label="PostgreSQL" icon={<Database className="w-6 h-6" />} color="green" />
                <DiagramNode label="Kafka Event Bus" icon={<Cpu className="w-6 h-6" />} color="orange" />
            </div>
        </div>

        <div className="absolute bottom-6 left-6 flex space-x-2">
            <button className="p-2 bg-background/50 rounded-lg border border-border backdrop-blur hover:bg-background transition-colors"><Settings className="w-4 h-4" /></button>
            <button className="p-2 bg-background/50 rounded-lg border border-border backdrop-blur hover:bg-background transition-colors"><GitBranch className="w-4 h-4" /></button>
        </div>
    </div>
);

const DiagramNode = ({ label, icon, color }: { label: string, icon: React.ReactNode, color: string }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
            "px-6 py-4 rounded-2xl border-2 flex flex-col items-center space-y-2 shadow-2xl backdrop-blur-xl",
            color === 'blue' ? "border-blue-500/50 bg-blue-500/5 ring-8 ring-blue-500/5" :
                color === 'purple' ? "border-purple-500/50 bg-purple-500/5 ring-8 ring-purple-500/5" :
                    color === 'green' ? "border-green-500/50 bg-green-500/5 ring-8 ring-green-500/5" :
                        "border-orange-500/50 bg-orange-500/5 ring-8 ring-orange-500/5"
        )}
    >
        <div className={cn(
            "p-3 rounded-xl",
            color === 'blue' ? "bg-blue-500/20 text-blue-400" :
                color === 'purple' ? "bg-purple-500/20 text-purple-400" :
                    color === 'green' ? "bg-green-500/20 text-green-400" :
                        "bg-orange-500/20 text-orange-400"
        )}>
            {icon}
        </div>
        <span className="text-sm font-bold tracking-tight">{label}</span>
    </motion.div>
);

const APIWorkspace = () => (
    <div className="space-y-4">
        {[
            { method: 'GET', path: '/v1/projects', desc: 'List all multi-tenant projects' },
            { method: 'POST', path: '/v1/workspace/action', desc: 'Execute role-specific atomic action' },
            { method: 'PUT', path: '/v1/auth/provision', desc: 'SaaS user provisioning endpoint' }
        ].map((api, i) => (
            <div key={i} className="glass-morphism p-5 rounded-xl border border-white/5 flex items-center justify-between group">
                <div className="flex items-center space-x-6">
                    <span className={cn(
                        "font-mono text-xs font-bold px-3 py-1 rounded w-16 text-center shadow-lg",
                        api.method === 'GET' ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                            api.method === 'POST' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    )}>{api.method}</span>
                    <div>
                        <code className="text-sm text-primary/80 font-mono">{api.path}</code>
                        <p className="text-xs text-muted-foreground mt-1">{api.desc}</p>
                    </div>
                </div>
                <button className="p-2 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground hover:text-white"><Code2 className="w-4 h-4" /></button>
            </div>
        ))}
    </div>
);

const DecisionLogs = () => (
    <div className="space-y-4">
        {[
            { id: 'ADR-001', title: 'Adoption of Turborepo', status: 'Accepted', date: 'Feb 15, 2026' },
            { id: 'ADR-002', title: 'Kafka vs RabbitMQ for Event Bus', status: 'Proposed', date: 'Feb 18, 2026' },
            { id: 'ADR-003', title: 'OpenTelemetry for Distributed Tracing', status: 'Accepted', date: 'Feb 20, 2026' }
        ].map((adr, i) => (
            <div key={i} className="glass-morphism p-5 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-primary/60">{adr.id}</span>
                    <h4 className="font-semibold">{adr.title}</h4>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-[10px] text-muted-foreground">{adr.date}</span>
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        adr.status === 'Accepted' ? "bg-green-500/10 text-green-400" : "bg-blue-500/10 text-blue-400"
                    )}>{adr.status}</span>
                </div>
            </div>
        ))}
    </div>
);

const TechItem = ({ icon, name, version }: { icon: React.ReactNode, name: string, version: string }) => (
    <div className="flex items-center justify-between group">
        <div className="flex items-center space-x-3">
            {icon}
            <span className="text-xs font-medium">{name}</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">{version}</span>
    </div>
);

const PrincipleItem = ({ text, checked }: { text: string, checked: boolean }) => (
    <div className="flex items-center space-x-3">
        <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-all", checked ? "bg-primary border-primary" : "border-border")}>
            {checked && <div className="w-2 h-1 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />}
        </div>
        <span className={cn("text-xs", checked ? "text-foreground" : "text-muted-foreground")}>{text}</span>
    </div>
);
