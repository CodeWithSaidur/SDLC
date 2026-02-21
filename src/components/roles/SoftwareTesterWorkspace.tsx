"use client";

import React, { useState } from "react";
import {
    ShieldCheck,
    Bug,
    TestTube2,
    PlayCircle,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    FileSearch,
    Zap,
    History,
    Activity,
    Filter,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const SoftwareTesterWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"suites" | "bugs" | "security">("suites");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Quality Assurance</h1>
                    <p className="text-muted-foreground mt-1">Ensure stability, performance, and security across the platform.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="glass-morphism px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-white/5 transition-all">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>Run All Tests</span>
                    </button>
                    <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-destructive/20">
                        <Bug className="w-4 h-4" />
                        <span>Report Bug</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "suites"} onClick={() => setActiveTab("suites")} label="Test Suites" />
                <TabButton active={activeTab === "bugs"} onClick={() => setActiveTab("bugs")} label="Bug Tracker" />
                <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} label="OWASP Audit" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "suites" && <TestSuitesView />}
                    {activeTab === "bugs" && <BugTrackerView />}
                    {activeTab === "security" && <SecurityAuditView />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Test Coverage</h3>
                        <div className="flex flex-col items-center py-4">
                            <div className="relative w-32 h-32">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/20" />
                                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={364.42} strokeDashoffset={364.42 * (1 - 0.78)} className="text-primary transition-all duration-1000" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold">78%</span>
                                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Overall</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full mt-6">
                                <CoverageBadge label="Unit" value="92%" />
                                <CoverageBadge label="E2E" value="64%" />
                                <CoverageBadge label="Integration" value="81%" />
                                <CoverageBadge label="API" value="88%" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Execution History</h3>
                        <div className="space-y-4">
                            <HistoryItem label="Main Pipeline" time="2h ago" status="pass" />
                            <HistoryItem label="Auth Flow" time="4h ago" status="fail" />
                            <HistoryItem label="Data Sync" time="1d ago" status="pass" />
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
        {active && <motion.div layoutId="testTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const TestSuitesView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
            { name: 'User Authentication', cases: 42, passed: 41, status: 'stable' },
            { name: 'Data Pipeline (Kafka)', cases: 18, passed: 15, status: 'unstable' },
            { name: 'Multi-tenant Logic', cases: 24, passed: 24, status: 'stable' },
            { name: 'UI Components (Chromat)', cases: 156, passed: 154, status: 'stable' }
        ].map((suite, i) => (
            <div key={i} className="glass-morphism p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-xl bg-accent group-hover:bg-primary/10 transition-colors">
                        <TestTube2 className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        suite.status === 'stable' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-400"
                    )}>{suite.status}</span>
                </div>
                <h4 className="font-bold mb-1">{suite.name}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{suite.passed}/{suite.cases} Passed</span>
                    <div className="flex items-center space-x-2">
                        <PlayCircle className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                </div>
                <div className="w-full h-1 bg-muted mt-4 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(suite.passed / suite.cases) * 100}%` }} />
                </div>
            </div>
        ))}
    </div>
);

const BugTrackerView = () => (
    <div className="glass-morphism rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold">Active Deficts (14)</span>
            </div>
            <div className="flex space-x-2">
                <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">3 Critical</span>
                <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">5 High</span>
            </div>
        </div>
        <div className="divide-y divide-border/50">
            {[
                { id: 'BUG-402', title: 'Memory leak in Kafka consumer stream', priority: 'Critical', reported: '2h ago' },
                { id: 'BUG-405', title: 'Invalid CSS vars in dark mode switcher', priority: 'High', reported: '5h ago' },
                { id: 'BUG-408', title: 'Tenant slug conflict on quick creation', priority: 'High', reported: '12h ago' }
            ].map((bug, i) => (
                <div key={i} className="p-4 hover:bg-accent/30 transition-colors flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                        <Bug className={cn("w-4 h-4", bug.priority === 'Critical' ? "text-red-500" : "text-orange-400")} />
                        <div>
                            <span className="text-[10px] font-mono text-muted-foreground">{bug.id}</span>
                            <h5 className="text-sm font-semibold">{bug.title}</h5>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-xs text-muted-foreground">{bug.reported}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SecurityAuditView = () => (
    <div className="glass-morphism rounded-xl p-8 space-y-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">OWASP Top 10 Compliance</h3>
                    <p className="text-sm text-muted-foreground">Automated security scanning and threat modeling.</p>
                </div>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">Full Report</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SecurityMetric label="A01: Broken Access Control" status="pass" />
            <SecurityMetric label="A02: Cryptographic Failures" status="pass" />
            <SecurityMetric label="A03: Injection (SQL/NoSQL)" status="pass" />
            <SecurityMetric label="A07: Identification and Auth" status="warn" />
        </div>

        <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-start space-x-4">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-1 shrink-0" />
            <div>
                <h4 className="text-sm font-bold text-orange-400">Security Warning</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Token entropy for multi-tenant invitations is below recommended standards. High risk of invitation brute-forcing.
                </p>
            </div>
        </div>
    </div>
);

const CoverageBadge = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-accent/40 rounded-lg p-2 border border-border/50 text-center">
        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold">{value}</div>
    </div>
);

const HistoryItem = ({ label, time, status }: { label: string, time: string, status: 'pass' | 'fail' }) => (
    <div className="flex items-center justify-between group cursor-help">
        <div className="flex items-center space-x-3">
            {status === 'pass' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
            <span className="text-xs font-medium">{label}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">{time}</span>
    </div>
);

const SecurityMetric = ({ label, status }: { label: string, status: 'pass' | 'fail' | 'warn' }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
            <span className="text-xs font-medium">{label}</span>
            {status === 'pass' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />}
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div className={cn(
                "h-full rounded-full transition-all duration-1000",
                status === 'pass' ? "bg-green-500" : status === 'warn' ? "bg-orange-500" : "bg-red-500"
            )} style={{ width: status === 'pass' ? '100%' : '65%' }} />
        </div>
    </div>
);
