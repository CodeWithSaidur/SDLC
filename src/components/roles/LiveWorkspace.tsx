"use client";

import React from "react";
import {
    Radio,
    Users,
    Activity,
    MessageSquare,
    Zap,
    Clock,
    ArrowUpRight,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const LiveWorkspace = () => {
    return (
        <div className="space-y-6 animate-fade-in h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center space-x-2">
                        <h1 className="text-3xl font-bold tracking-tight gradient-text">Live Platform Pulse</h1>
                        <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span>Live</span>
                        </div>
                    </div>
                    <p className="text-muted-foreground mt-1">Real-time activity across all organizations and tenants.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="glass-morphism rounded-lg px-3 py-1.5 flex items-center space-x-4 text-xs font-medium">
                        <div className="flex items-center space-x-1">
                            <Users className="w-3.5 h-3.5 text-primary" />
                            <span>1,204 Active</span>
                        </div>
                        <div className="w-[1px] h-4 bg-border" />
                        <div className="flex items-center space-x-1">
                            <Globe className="w-3.5 h-3.5 text-blue-400" />
                            <span>12 Regions</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="glass-morphism rounded-2xl border border-white/5 flex flex-col h-[600px]">
                        <div className="p-4 border-b border-border/50 flex justify-between items-center">
                            <h3 className="text-sm font-bold flex items-center space-x-2">
                                <Activity className="w-4 h-4 text-primary" />
                                <span>Activity Stream</span>
                            </h3>
                            <div className="flex space-x-2">
                                <span className="text-[10px] text-muted-foreground">Auto-refreshing...</span>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            <LiveItem
                                org="Vercel"
                                user="Lee Robinson"
                                role="DevOps"
                                action="Deployed to Production"
                                time="Just now"
                                status="success"
                            />
                            <LiveItem
                                org="Linear"
                                user="Karri Saarinen"
                                role="UI Designer"
                                action="Updated Brand Tokens"
                                time="2m ago"
                                status="info"
                            />
                            <LiveItem
                                org="Scale AI"
                                user="Alexandr Wang"
                                role="Architect"
                                action="Approved System Design #42"
                                time="5m ago"
                                status="success"
                            />
                            <LiveItem
                                org="Stripe"
                                user="Patrick Collison"
                                role="Entrepreneur"
                                action="Submitted New Feature Idea"
                                time="12m ago"
                                status="info"
                            />
                            <LiveItem
                                org="OpenAI"
                                user="Sam Altman"
                                role="BA"
                                action="Locked User Stories for v5"
                                time="15m ago"
                                status="success"
                            />
                            <LiveItem
                                org="Google"
                                user="Sundar Pichai"
                                role="Tester"
                                action="Detected Regression in Auth Flow"
                                time="20m ago"
                                status="error"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar Widgets */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-2xl p-6">
                        <h4 className="text-sm font-bold mb-6 flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>Global Throughput</span>
                        </h4>
                        <div className="space-y-6">
                            <LiveMetric label="API Requests" value="12.4k/s" trend="+5.2%" />
                            <LiveMetric label="Event Transformations" value="8.1k/s" trend="+1.2%" />
                            <LiveMetric label="Active WebSocket Conns" value="45.2k" trend="+0.8%" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-2xl p-6 h-[300px] flex flex-col">
                        <h4 className="text-sm font-bold mb-4 flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                            <span>Role Distribution</span>
                        </h4>
                        <div className="flex-1 flex items-end justify-between space-x-2 px-2">
                            {[40, 65, 30, 85, 50, 70, 45].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="w-full bg-gradient-to-t from-primary/20 to-primary rounded-t-lg relative group"
                                >
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border px-1.5 py-0.5 rounded text-[8px] font-bold z-20">
                                        {h}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
                            <span>Ent</span>
                            <span>BA</span>
                            <span>Arch</span>
                            <span>Dev</span>
                            <span>Ops</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LiveItem = ({ org, user, role, action, time, status }: { org: string, user: string, role: string, action: string, time: string, status: 'success' | 'error' | 'info' }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex items-start justify-between group"
    >
        <div className="flex items-start space-x-4">
            <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center font-bold text-xs">
                    {user.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={cn(
                    "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-background flex items-center justify-center",
                    status === 'success' ? "bg-green-500" : status === 'error' ? "bg-red-500" : "bg-blue-500"
                )}>
                    {status === 'success' ? <Zap className="w-2 h-2 text-white" /> : status === 'error' ? <ArrowUpRight className="w-2 h-2 text-white" /> : <Clock className="w-2 h-2 text-white" />}
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-foreground">{user}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-muted-foreground border border-white/5">{org}</span>
                </div>
                <p className="text-sm font-semibold mt-1 group-hover:text-primary transition-colors">{action}</p>
                <div className="flex items-center space-x-2 mt-1.5 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    <span>{role}</span>
                    <span>•</span>
                    <span>{time}</span>
                </div>
            </div>
        </div>
        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-white">
            <ArrowUpRight className="w-4 h-4" />
        </button>
    </motion.div>
);

const LiveMetric = ({ label, value, trend }: { label: string, value: string, trend: string }) => (
    <div className="flex items-center justify-between">
        <div className="space-y-0.5">
            <span className="text-xs text-muted-foreground">{label}</span>
            <div className="text-xl font-bold font-mono">{value}</div>
        </div>
        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">{trend}</span>
    </div>
);
