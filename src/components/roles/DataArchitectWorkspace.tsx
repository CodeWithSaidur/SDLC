"use client";

import React, { useState } from "react";
import {
    Database,
    Table2,
    Key,
    Link as LinkIcon,
    Save,
    Download,
    RefreshCcw,
    Zap,
    ShieldCheck,
    Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const DataArchitectWorkspace = () => {
    const [view, setView] = useState<"erd" | "schema" | "migrations">("erd");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">Data Architecture</h1>
                    <p className="text-muted-foreground mt-1">Design normalized schemas and manage migrations.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="glass-morphism px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-white/5 transition-all">
                        <Code className="w-4 h-4" />
                        <span>Generate Drizzle</span>
                    </button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Save className="w-4 h-4" />
                        <span>Apply Changes</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={view === "erd"} onClick={() => setView("erd")} label="ER Diagrams" />
                <TabButton active={view === "schema"} onClick={() => setView("schema")} label="Table Definitions" />
                <TabButton active={view === "migrations"} onClick={() => setView("migrations")} label="Migration History" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {view === "erd" && <ERDDesigner />}
                    {view === "schema" && <SchemaManager />}
                    {view === "migrations" && <MigrationTimeline />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Database Health</h3>
                        <div className="space-y-4">
                            <HealthMetric label="Storage Usage" value="4.2 GB" percent={42} />
                            <HealthMetric label="Active Connections" value="128" percent={65} />
                            <HealthMetric label="Index Hit Rate" value="99.4%" percent={99} />
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Schema Compliance</h3>
                        <div className="space-y-3">
                            <ComplianceItem text="GDPR Encrypted" status="ok" />
                            <ComplianceItem text="Soft Delete Enabled" status="ok" />
                            <ComplianceItem text="Audit Fields Present" status="warn" />
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
        {active && <motion.div layoutId="dataTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const ERDDesigner = () => (
    <div className="glass-morphism rounded-xl aspect-[16/9] bg-grid-slate-900/[0.04] dark:bg-grid-white/[0.02] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-6 space-y-4">
            <ERDTable
                name="tenants"
                fields={[
                    { name: 'id', type: 'uuid', pk: true },
                    { name: 'name', type: 'text' },
                    { name: 'slug', type: 'text' }
                ]}
            />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ERDTable
                name="projects"
                fields={[
                    { name: 'id', type: 'uuid', pk: true },
                    { name: 'tenant_id', type: 'uuid', fk: true },
                    { name: 'name', type: 'text' },
                    { name: 'status', type: 'varchar' }
                ]}
            />
        </div>

        <div className="absolute bottom-6 right-6">
            <ERDTable
                name="audit_logs"
                fields={[
                    { name: 'id', type: 'uuid', pk: true },
                    { name: 'entity_id', type: 'uuid' },
                    { name: 'action', type: 'text' }
                ]}
            />
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="200" y1="150" x2="450" y2="300" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
            <circle cx="200" cy="150" r="4" fill="currentColor" />
            <circle cx="450" cy="300" r="4" fill="currentColor" />
        </svg>
    </div>
);

const ERDTable = ({ name, fields }: { name: string, fields: any[] }) => (
    <motion.div
        drag
        dragMomentum={false}
        className="w-48 bg-card border border-border rounded-lg shadow-xl overflow-hidden cursor-move ring-4 ring-primary/5 hover:ring-primary/10 transition-shadow"
    >
        <div className="bg-primary/10 px-3 py-2 border-b border-border flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{name}</span>
            <Table2 className="w-3 h-3 text-primary/60" />
        </div>
        <div className="p-2 space-y-1">
            {fields.map((f, i) => (
                <div key={i} className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center space-x-1">
                        {f.pk && <Key className="w-2.5 h-2.5 text-yellow-500" />}
                        {f.fk && <LinkIcon className="w-2.5 h-2.5 text-blue-500" />}
                        <span className="font-semibold text-foreground/80">{f.name}</span>
                    </div>
                    <span className="text-muted-foreground font-mono">{f.type}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

const SchemaManager = () => (
    <div className="space-y-4">
        {[1, 2, 3].map(i => (
            <div key={i} className="glass-morphism p-5 rounded-xl border border-white/5 flex items-center justify-between group">
                <div className="flex items-center space-x-6">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                        <Table2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="font-semibold">Table: users_v{i}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Managed via Drizzle Push. 12 columns established.</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><RefreshCcw className="w-4 h-4" /></button>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors"><Zap className="w-4 h-4" /></button>
                </div>
            </div>
        ))}
    </div>
);

const MigrationTimeline = () => (
    <div className="glass-morphism rounded-xl p-6 relative overflow-hidden">
        <div className="space-y-6">
            {[
                { name: '0001_initial_schema', desc: 'Core authentication and multi-tenancy tables.', status: 'Applied' },
                { name: '0002_add_audit_logs', desc: 'Extended tracking for administrative actions.', status: 'Applied' },
                { name: '0003_indexing_optimization', desc: 'Adding GIN indexes for JSONB fields.', status: 'Pending' }
            ].map((m, i) => (
                <div key={i} className="flex space-x-4 relative">
                    <div className="flex flex-col items-center">
                        <div className={cn("w-3 h-3 rounded-full mt-1.5", m.status === 'Applied' ? "bg-green-500" : "bg-orange-500")} />
                        {i !== 2 && <div className="w-[2px] flex-1 bg-border/50 my-2" />}
                    </div>
                    <div>
                        <h5 className="text-sm font-bold font-mono">{m.name}</h5>
                        <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                        <span className={cn(
                            "inline-block mt-2 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
                            m.status === 'Applied' ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-400"
                        )}>{m.status}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const HealthMetric = ({ label, value, percent }: { label: string, value: string, percent: number }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-bold">{value}</span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
    </div>
);

const ComplianceItem = ({ text, status }: { text: string, status: 'ok' | 'warn' }) => (
    <div className="flex items-center space-x-2">
        {status === 'ok' ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <RefreshCcw className="w-4 h-4 text-orange-500" />}
        <span className="text-xs text-muted-foreground">{text}</span>
    </div>
);
