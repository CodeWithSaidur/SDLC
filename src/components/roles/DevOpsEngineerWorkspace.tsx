"use client";

import React, { useState } from "react";
import {
    Terminal,
    Cloud,
    Cpu,
    Layers,
    Server,
    Activity,
    GitBranch,
    PlayCircle,
    CheckCircle2,
    XCircle,
    RefreshCcw,
    Zap,
    Box,
    Disc
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const DevOpsEngineerWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"pipelines" | "infrastructure" | "logs">("pipelines");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Infrastructure & DevOps</h1>
                    <p className="text-muted-foreground mt-1">Manage cloud resources, CI/CD pipelines, and cluster health.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="glass-morphism px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-white/5 transition-all">
                        <RefreshCcw className="w-4 h-4" />
                        <span>Redeploy Cluster</span>
                    </button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Cloud className="w-4 h-4" />
                        <span>Terraform Plan</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "pipelines"} onClick={() => setActiveTab("pipelines")} label="CI/CD Pipelines" />
                <TabButton active={activeTab === "infrastructure"} onClick={() => setActiveTab("infrastructure")} label="K8s Infrastructure" />
                <TabButton active={activeTab === "logs"} onClick={() => setActiveTab("logs")} label="Deployment Logs" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "pipelines" && <PipelinesView />}
                    {activeTab === "infrastructure" && <K8sInfrastructureView />}
                    {activeTab === "logs" && <DeploymentLogsView />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Cluster Status</h3>
                        <div className="space-y-4">
                            <StatusRow label="API Server" status="healthy" />
                            <StatusRow label="Etcd" status="healthy" />
                            <StatusRow label="Scheduler" status="healthy" />
                            <StatusRow label="Ingress Controller" status="warning" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Resource Usage</h3>
                        <div className="space-y-4">
                            <UsageMetric label="CPU" value="42%" />
                            <UsageMetric label="Memory" value="12.5 GB" />
                            <UsageMetric label="Storage" value="850 GB" />
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
        {active && <motion.div layoutId="devopsTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const PipelinesView = () => (
    <div className="space-y-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="glass-morphism p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between group">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg",
                        i === 1 ? "bg-green-500/20 text-green-500 shadow-green-500/10" : i === 2 ? "bg-red-500/20 text-red-500 shadow-red-500/10" : "bg-blue-500/20 text-blue-500 shadow-blue-500/10"
                    )}>
                        {i === 1 ? <CheckCircle2 className="w-6 h-6" /> : i === 2 ? <XCircle className="w-6 h-6" /> : <RefreshCcw className="w-6 h-6 animate-spin" />}
                    </div>
                    <div>
                        <h4 className="font-bold flex items-center space-x-2">
                            <span>{i === 1 ? 'Production Deployment' : i === 2 ? 'Staging Test Pipeline' : 'PR Automation Run'}</span>
                            <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded font-mono">#{450 + i}</span>
                        </h4>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1"><GitBranch className="w-3 h-3" /> <span>main</span></div>
                            <div className="flex items-center space-x-1"><Layers className="w-3 h-3" /> <span>34 steps</span></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Duration</span>
                        <span className="text-sm font-mono">4m 32s</span>
                    </div>
                    <button className="p-3 rounded-xl bg-accent opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 hover:text-primary">
                        <PlayCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>
        ))}
    </div>
);

const K8sInfrastructureView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <K8sNode name="node-prod-01" type="Worker" cpu="12%" ram="45%" status="ready" />
        <K8sNode name="node-prod-02" type="Worker" cpu="88%" ram="92%" status="pressure" />
        <K8sNode name="node-prod-03" type="Control Plane" cpu="15%" ram="30%" status="ready" />

        <div className="lg:col-span-3 glass-morphism p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold flex items-center space-x-2">
                <Box className="w-4 h-4 text-primary" />
                <span>Active Namespaces</span>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['default', 'kube-system', 'sdlc-prod', 'monitoring'].map(ns => (
                    <div key={ns} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                        <span className="text-xs font-mono">{ns}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const K8sNode = ({ name, type, cpu, ram, status }: { name: string, type: string, cpu: string, ram: string, status: 'ready' | 'pressure' }) => (
    <div className="glass-morphism p-5 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-sm">{name}</h4>
                <span className="text-[10px] text-muted-foreground uppercase">{type}</span>
            </div>
            <div className={cn(
                "w-2 h-2 rounded-full",
                status === 'ready' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            )} />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">CPU</span>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: cpu }} />
                </div>
                <span className="text-[10px] font-mono">{cpu}</span>
            </div>
            <div className="space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">RAM</span>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: ram }} />
                </div>
                <span className="text-[10px] font-mono">{ram}</span>
            </div>
        </div>
    </div>
);

const DeploymentLogsView = () => (
    <div className="glass-morphism rounded-xl bg-slate-950 p-6 border-white/5 h-[400px] flex flex-col">
        <div className="flex items-center space-x-2 mb-4 text-xs font-mono text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>tail -f /var/log/deployments.log</span>
        </div>
        <div className="flex-1 overflow-y-auto font-mono text-[11px] space-y-1 custom-scrollbar">
            {[
                { time: '14:20:01', msg: 'Pulling docker image: sdlc-backend:latest', color: 'text-blue-400' },
                { time: '14:20:15', msg: 'Applying kubernetes manifests...', color: 'text-blue-400' },
                { time: '14:20:22', msg: 'Deployment "sdlc-api" rolled out successfully', color: 'text-green-400' },
                { time: '14:20:25', msg: 'Updating readiness probes...', color: 'text-muted-foreground' },
                { time: '14:20:30', msg: 'Waiting for service mesh stabilization', color: 'text-purple-400' },
                { time: '14:21:05', msg: 'Cloudflare cache purge triggered', color: 'text-orange-400' },
                { time: '14:21:10', msg: 'All systems operational.', color: 'text-green-500 font-bold' }
            ].map((log, i) => (
                <div key={i} className="flex space-x-3 hover:bg-white/5 px-1 py-0.5">
                    <span className="opacity-30 shrink-0">{log.time}</span>
                    <span className={log.color}>{log.msg}</span>
                </div>
            ))}
            <div className="animate-pulse flex space-x-2">
                <span className="opacity-30 shrink-0">14:21:11</span>
                <span className="bg-primary/40 w-2 h-4" />
            </div>
        </div>
    </div>
);

const StatusRow = ({ label, status }: { label: string, status: 'healthy' | 'warning' }) => (
    <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn(
            "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase",
            status === 'healthy' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-400"
        )}>{status}</span>
    </div>
);

const UsageMetric = ({ label, value }: { label: string, value: string }) => (
    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold mt-1">{value}</div>
    </div>
);
