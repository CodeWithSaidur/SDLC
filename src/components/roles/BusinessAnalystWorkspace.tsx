"use client";

import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    FileText,
    UserCircle,
    CheckCircle2,
    Clock,
    MoreVertical,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BusinessAnalystWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"stories" | "brd" | "requirements">("stories");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Business Analysis</h1>
                    <p className="text-muted-foreground mt-1">Translate business vision into technical requirements.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="glass-morphism rounded-lg px-3 py-1.5 flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium">85% Complete</span>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        <span>New Requirement</span>
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton
                    active={activeTab === "stories"}
                    onClick={() => setActiveTab("stories")}
                    label="User Stories"
                    count={12}
                />
                <TabButton
                    active={activeTab === "brd"}
                    onClick={() => setActiveTab("brd")}
                    label="BRD Document"
                />
                <TabButton
                    active={activeTab === "requirements"}
                    onClick={() => setActiveTab("requirements")}
                    label="Functional Specs"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "stories" && <UserStoriesList />}
                    {activeTab === "brd" && <BRDPreview />}
                    {activeTab === "requirements" && <RequirementsTable />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Role Progress</h3>
                        <div className="space-y-4">
                            <ProgressBar label="Requirements Gathering" progress={90} color="blue" />
                            <ProgressBar label="User Story Mapping" progress={65} color="violet" />
                            <ProgressBar label="Stakeholder Review" progress={40} color="orange" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4">Stakeholders</h3>
                        <div className="space-y-3">
                            <StakeholderItem name="Sarah Chen" role="Product Owner" />
                            <StakeholderItem name="Mike Ross" role="Lead Developer" />
                            <StakeholderItem name="Jessica Pearson" role="Business Sponsor" />
                        </div>
                        <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            Manage Stakeholders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label, count }: { active: boolean, onClick: () => void, label: string, count?: number }) => (
    <button
        onClick={onClick}
        className={cn(
            "pb-4 text-sm font-medium transition-all relative",
            active ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
    >
        <div className="flex items-center space-x-2">
            <span>{label}</span>
            {count !== undefined && (
                <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px]",
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>{count}</span>
            )}
        </div>
        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            />
        )}
    </button>
);

const UserStoriesList = () => (
    <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-morphism rounded-xl p-5 hover:border-primary/30 transition-all group flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <UserCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">US-00{i}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-medium">In Progress</span>
                        </div>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">As a user, I want to authenticate via SSO...</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">Ensure seamless integration with Okta and LDAP providers.</p>
                    </div>
                </div>
                <button className="p-2 text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>
        ))}
    </div>
);

const BRDPreview = () => (
    <div className="glass-morphism rounded-xl p-8 space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Business Requirements Document v2.1</h3>
            <button className="text-sm text-primary font-medium hover:underline flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>View Full Doc</span>
            </button>
        </div>
        <div className="prose prose-invert max-w-none">
            <h4 className="text-foreground">1. Executive Summary</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
                The project aims to build a centralized SDLC management platform that orchestrates different roles within a unified environment. The multi-tenant architecture ensures data isolation and security across organizations...
            </p>
            <h4 className="text-foreground mt-4">2. Business Objectives</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
                <li>Reduce time-to-market for software product delivery by 30%.</li>
                <li>Eliminate communication silos between designers and developers.</li>
                <li>Automate audit logging for regulatory compliance.</li>
            </ul>
        </div>
    </div>
);

const RequirementsTable = () => (
    <div className="glass-morphism rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">Requirement</th>
                    <th className="px-6 py-4">Priority</th>
                    <th className="px-6 py-4">Complexity</th>
                    <th className="px-6 py-4">Owner</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-sm">
                {[
                    { req: "Real-time WebSocket Updates", pri: "Critical", comp: "High", owner: "Sarah" },
                    { req: "OAuth2 Provider Integration", pri: "High", comp: "Medium", owner: "Mike" },
                    { req: "Event-driven Audit System", pri: "Medium", comp: "High", owner: "Jessica" }
                ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-accent/30 transition-colors">
                        <td className="px-6 py-4 font-medium">{item.req}</td>
                        <td className="px-6 py-4">
                            <span className={cn(
                                "px-2 py-1 rounded text-[10px] font-bold",
                                item.pri === 'Critical' ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-400"
                            )}>{item.pri}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{item.comp}</td>
                        <td className="px-6 py-4 flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                                {item.owner[0]}
                            </div>
                            <span>{item.owner}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ProgressBar = ({ label, progress, color }: { label: string, progress: number, color: string }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">{label}</span>
            <span>{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={cn(
                    "h-full rounded-full",
                    color === 'blue' ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" :
                        color === 'violet' ? "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" :
                            "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
                )}
            />
        </div>
    </div>
);

const StakeholderItem = ({ name, role }: { name: string, role: string }) => (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
        <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-accent flex items-center justify-center text-xs font-bold ring-2 ring-primary/20">
                {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
                <div className="text-xs font-semibold">{name}</div>
                <div className="text-[10px] text-muted-foreground">{role}</div>
            </div>
        </div>
        <ChevronRight className="w-3 h-3 text-muted-foreground" />
    </div>
);
