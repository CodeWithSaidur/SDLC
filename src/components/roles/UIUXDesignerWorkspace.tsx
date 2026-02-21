"use client";

import React, { useState } from "react";
import {
    Palette,
    Type,
    Component,
    ExternalLink,
    Download,
    Image as ImageIcon,
    Framer,
    Layout,
    Layers,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const UIUXDesignerWorkspace = () => {
    const [activeTab, setActiveTab] = useState<"prototype" | "library" | "specs">("prototype");

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight gradient-text">UI/UX Design</h1>
                    <p className="text-muted-foreground mt-1">Design premium interfaces and maintain visual consistency.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="glass-morphism px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 hover:bg-white/5 transition-all">
                        <Framer className="w-4 h-4" />
                        <span>Open in Figma</span>
                    </button>
                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Assets</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-8 border-b border-border/50">
                <TabButton active={activeTab === "prototype"} onClick={() => setActiveTab("prototype")} label="Figma Live Embed" />
                <TabButton active={activeTab === "library"} onClick={() => setActiveTab("library")} label="Design System" />
                <TabButton active={activeTab === "specs"} onClick={() => setActiveTab("specs")} label="Component Specs" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {activeTab === "prototype" && <FigmaEmbed />}
                    {activeTab === "library" && <DesignSystemCatalog />}
                    {activeTab === "specs" && <ComponentSpecs />}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Color Palette</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981', '#ffffff', '#1e293b', '#0f172a', '#64748b', '#94a3b8'].map(c => (
                                <div key={c} className="group relative">
                                    <div className="aspect-square rounded shadow-sm border border-border" style={{ backgroundColor: c }} />
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background border px-1.5 py-0.5 rounded text-[8px] font-mono z-10">{c}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-morphism rounded-xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Asset Quick-Sync</h3>
                        <div className="space-y-3">
                            <AssetSyncItem icon={<ImageIcon className="w-4 h-4" />} name="Logo-dark.svg" size="12 KB" />
                            <AssetSyncItem icon={<ImageIcon className="w-4 h-4" />} name="Hero-image.webp" size="245 KB" />
                            <AssetSyncItem icon={<ImageIcon className="w-4 h-4" />} name="Icon-pack.zip" size="1.2 MB" />
                        </div>
                        <button className="w-full mt-4 py-2 border border-dashed border-border rounded-lg text-xs font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all">
                            Sync from Figma
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
    <button onClick={onClick} className={cn("pb-4 text-sm font-medium transition-all relative", active ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
        {label}
        {active && <motion.div layoutId="designTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
    </button>
);

const FigmaEmbed = () => (
    <div className="glass-morphism rounded-xl aspect-video bg-muted/20 flex flex-col items-center justify-center relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50" />
        <div className="w-20 h-20 rounded-3xl bg-background/50 backdrop-blur-xl border border-border flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
            <Framer className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold tracking-tight mb-2">Connect Figma Project</h3>
        <p className="text-muted-foreground text-sm max-w-xs text-center px-4">
            Paste your Figma file URL to sync components and variants automatically.
        </p>
        <div className="mt-8 flex w-full max-w-md px-6">
            <input
                type="text"
                placeholder="https://www.figma.com/file/..."
                className="flex-1 bg-background border border-border px-4 py-2 rounded-l-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-xl text-xs font-bold hover:opacity-90 transition-opacity">Connect</button>
        </div>

        <div className="absolute top-4 right-4 animate-pulse">
            <div className="flex items-center space-x-2 text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>Live Link Ready</span>
            </div>
        </div>
    </div>
);

const DesignSystemCatalog = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
            <div key={i} className="glass-morphism p-6 rounded-2xl group hover:border-primary/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-accent text-muted-foreground group-hover:text-primary transition-colors">
                        {i === 1 ? <Palette className="w-5 h-5" /> : i === 2 ? <Type className="w-5 h-5" /> : i === 3 ? <Component className="w-5 h-5" /> : <Layout className="w-5 h-5" />}
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-bold mb-1">{i === 1 ? 'Dynamic Tokens' : i === 2 ? 'Typography Scale' : i === 3 ? 'Atomic Components' : 'Layout Systems'}</h4>
                <p className="text-xs text-muted-foreground">Standardized {i === 1 ? 'variables for HSL colors and shadows.' : 'font sizes and leading for Outfit & Inter.'}</p>
            </div>
        ))}
    </div>
);

const ComponentSpecs = () => (
    <div className="glass-morphism rounded-xl overflow-hidden">
        <div className="border-b border-border bg-muted/20 px-6 py-4 flex items-center justify-between">
            <h4 className="text-sm font-bold">Standard Button Variant</h4>
            <div className="flex space-x-2">
                <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded">primary</span>
                <span className="text-[10px] font-mono bg-accent px-1.5 py-0.5 rounded">hover</span>
            </div>
        </div>
        <div className="p-12 flex items-center justify-center bg-grid-white/[0.02]">
            <div className="relative">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">
                    Action Button
                </button>
                {/* Spectator lines */}
                <div className="absolute -top-8 left-0 right-0 h-[1px] bg-red-400 opacity-50 flex justify-center"><span className="bg-background text-[8px] text-red-400 px-1 -mt-1.5">100% width</span></div>
                <div className="absolute top-0 bottom-0 -right-8 w-[1px] bg-red-400 opacity-50 flex items-center"><span className="bg-background text-[8px] text-red-400 px-1 ml-[-4px] rotate-90 whitespace-nowrap">48px height</span></div>
            </div>
        </div>
        <div className="p-6 bg-accent/20 border-t border-border">
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Background</span>
                    <p className="text-xs font-mono">hsl(var(--primary))</p>
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">Radius</span>
                    <p className="text-xs font-mono">0.75rem (12px)</p>
                </div>
            </div>
        </div>
    </div>
);

const AssetSyncItem = ({ icon, name, size }: { icon: React.ReactNode, name: string, size: string }) => (
    <div className="flex items-center justify-between group cursor-pointer p-1 rounded-lg hover:bg-white/5">
        <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded bg-muted text-muted-foreground group-hover:text-primary transition-colors">
                {icon}
            </div>
            <span className="text-[11px] font-medium truncate w-24">{name}</span>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-[10px] text-muted-foreground">{size}</span>
            <Download className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    </div>
);
