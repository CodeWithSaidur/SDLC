"use client";

import React, { useState } from "react";
import {
    Activity,
    BarChart3,
    LineChart,
    AlertCircle,
    Flame,
    Clock,
    Signal,
    Zap,
    Monitor,
    Bell,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const MonitoringWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"metrics" | "tracing" | "alerts">("metrics");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Observability</h1>
                    <p className="text-muted-foreground mt-1">Real-time metrics, distributed tracing, and incident management.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="glass-morphism rounded-lg px-3 py-1.5 flex items-center space-x-2 text-sm text-green-500 border-green-500/20">
                        <Signal className="w-4 h-4 animate-pulse" />
                        <span className="font-medium">Live Feed: Connected</span>
                    </div>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Activity className="w-4 h-4" />
                        <span>Snapshot Report</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} label="Service Metrics" />
                <TabButton active={activeTab === "tracing"} onClick={() => setActiveTab("tracing")} label="Distributed Tracing" />
                <TabButton active={activeTab === "alerts"} onClick={() => setActiveTab("alerts")} label="Active Alerts" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "metrics" && <MetricsDashboard />}
                    {activeTab === "tracing" && <DistributedTracingView />}
                    {activeTab === "alerts" && <AlertsCenter />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">System Vitals</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <VitalCard label="Latency" value="24ms" status="good" />
                            <VitalCard label="Error Rate" value="0.02%" status="good" />
                            <VitalCard label="Throughput" value="1.2k/s" status="good" />
                            <VitalCard label="P99" value="142ms" status="warn" />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Service Map</h3>
                        <div className="relative aspect-square rounded-2xl bg-muted/20 border border-border/50 flex items-center justify-center p-4">
                            {/* Minimalist Service Map Mockup */}
                            <ServiceNode name="GW" active />
                            <div className="absolute top-1/2 left-1/4 w-1/2 h-[1px] bg-border flex justify-around">
                                <div className="w-2 h-2 rounded-full bg-primary -mt-1" />
                                <div className="w-2 h-2 rounded-full bg-primary -mt-1" />
                            </div>
                            <div className="absolute top-1/4 left-1/2 w-[1px] h-1/2 bg-border flex flex-col justify-around">
                                <div className="w-2 h-2 rounded-full bg-primary -ml-1" />
                                <div className="w-2 h-2 rounded-full bg-primary -ml-1" />
                            </div>
                            <div className="absolute top-1/4 right-1/4"><ServiceSubNode label="API" /></div>
                            <div className="absolute bottom-1/4 right-1/4"><ServiceSubNode label="DB" /></div>
                            <div className="absolute top-1/4 left-1/4"><ServiceSubNode label="RED" /></div>
                            <div className="absolute bottom-1/4 left-1/4"><ServiceSubNode label="KAF" /></div>
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
        {active && <motion.div layoutId="monTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const MetricsDashboard = () => (
    <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 md:col-span-4 glass-morphism rounded-2xl p-6 h-[300px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                    <LineChart className="w-4 h-4 text-primary" />
                    <h4 className="font-bold">Requests per Second</h4>
                </div>
                <div className="flex space-x-2 text-[10px] font-bold opacity-40">
                    <span>LAST 60 MINS</span>
                </div>
            </div>
            <div className="flex-1 flex items-end space-x-1">
                {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.random() * 80 + 20}%` }}
                        transition={{ delay: i * 0.02 }}
                        className="flex-1 bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm"
                    />
                ))}
            </div>
        </div>

        <div className="col-span-6 md:col-span-2 glass-morphism rounded-2xl p-6 h-[300px]">
            <h4 className="font-bold mb-6 text-sm">Error Sources</h4>
            <div className="space-y-4">
                <ErrorSource label="API Timeout" percent={64} />
                <ErrorSource label="DB Connection" percent={22} />
                <ErrorSource label="Auth Expired" percent={14} />
            </div>
        </div>

        <div className="col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricMiniCard label="Memory Usage" value="84%" trend="up" />
            <MetricMiniCard label="Network I/O" value="450 MB/s" trend="stable" />
            <MetricMiniCard label="Disk IOPS" value="12k" trend="down" />
        </div>
    </div>
);

const DistributedTracingView = () => (
    <div className="glass-morphism rounded-xl overflow-hidden divide-y divide-border/50">
        <div className="px-6 py-4 bg-muted/20 flex justify-between items-center">
            <h4 className="text-sm font-bold font-mono">Trace ID: 8f2a1...9b2z</h4>
            <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Completed</span>
        </div>
        <div className="p-6 space-y-6">
            {[
                { service: 'api-gateway', op: 'POST /v1/action', duration: '2ms', depth: 0 },
                { service: 'auth-svc', op: 'VerifyToken', duration: '14ms', depth: 1 },
                { service: 'tenant-svc', op: 'GetMetadata', duration: '8ms', depth: 1 },
                { service: 'event-bus', op: 'KafkaEmit', duration: '4ms', depth: 2 }
            ].map((span, i) => (
                <div key={i} className="flex items-center space-x-4">
                    <div style={{ marginLeft: `${span.depth * 24}px` }} className="flex-1 flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div>
                            <span className="text-xs font-bold">{span.service}</span>
                            <p className="text-[10px] text-muted-foreground font-mono">{span.op}</p>
                        </div>
                    </div>
                    <div className="w-32 h-1 bg-muted rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary opacity-30" />
                        <div className="absolute inset-y-0 left-0 bg-primary w-2/3" />
                    </div>
                    <span className="text-[10px] font-mono w-12 text-right">{span.duration}</span>
                </div>
            ))}
        </div>
    </div>
);

const AlertsCenter = () => (
    <div className="space-y-3">
        {[
            { title: 'High Memory pressure on node-02', sev: 'Critical', time: '5m ago' },
            { title: 'API Gateway latencies above P99 threshold', sev: 'Warning', time: '12m ago' },
            { title: 'Kafka consumer lag increasing in "audit" topic', sev: 'Warning', time: '45m ago' }
        ].map((alert, i) => (
            <div key={i} className={cn(
                "p-4 rounded-xl border flex items-center justify-between group cursor-pointer",
                alert.sev === 'Critical' ? "bg-red-500/5 border-red-500/20" : "bg-orange-500/5 border-orange-500/20"
            )}>
                <div className="flex items-center space-x-4">
                    {alert.sev === 'Critical' ? <Flame className="w-5 h-5 text-red-500" /> : <AlertCircle className="w-5 h-5 text-orange-400" />}
                    <div>
                        <h5 className="text-sm font-semibold">{alert.title}</h5>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{alert.sev}</span>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                    <button className="p-2 border border-border rounded-lg bg-background text-xs font-bold hover:bg-accent transition-colors">Acknowledge</button>
                </div>
            </div>
        ))}
    </div>
);

const ServiceNode = ({ name, active }: { name: string, active?: boolean }) => (
    <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs shadow-2xl z-10",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border border-border"
    )}>{name}</div>
);

const ServiceSubNode = ({ label }: { label: string }) => (
    <div className="w-10 h-10 rounded-lg bg-accent/50 border border-border flex items-center justify-center text-[8px] font-bold z-10">
        {label}
    </div>
);

const VitalCard = ({ label, value, status }: { label: string, value: string, status: 'good' | 'warn' }) => (
    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
        <div className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider">{label}</div>
        <div className={cn("text-xs font-bold mt-1", status === 'good' ? "text-green-400" : "text-orange-400")}>{value}</div>
    </div>
);

const ErrorSource = ({ label, percent }: { label: string, percent: number }) => (
    <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-medium">
            <span className="text-muted-foreground">{label}</span>
            <span>{percent}%</span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
    </div>
);

const MetricMiniCard = ({ label, value, trend }: { label: string, value: string, trend: 'up' | 'down' | 'stable' }) => (
    <div className="glass-morphism p-4 rounded-xl flex items-center justify-between">
        <div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{label}</span>
            <div className="text-lg font-bold mt-0.5">{value}</div>
        </div>
        <div className={cn(
            "p-2 rounded-lg bg-accent",
            trend === 'up' ? "text-red-400" : trend === 'down' ? "text-green-400" : "text-blue-400"
        )}>
            {trend === 'up' ? <Flame className="w-4 h-4" /> : trend === 'down' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
        </div>
    </div>
);
