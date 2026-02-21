"use client";

import React from "react";
import {
    BarChart3,
    Settings,
    Users,
    FolderKanban,
    LogOut,
    Infinity as InfinityIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
    return (
        <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
            <div className="p-6 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <InfinityIcon className="text-primary-foreground w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight">SDLC <span className="text-primary">SaaS</span></span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                <SidebarItem icon={<FolderKanban className="w-5 h-5" />} label="Projects" active />
                <SidebarItem icon={<Users className="w-5 h-5" />} label="Organization" />
                <SidebarItem icon={<BarChart3 className="w-5 h-5" />} label="Global Analytics" />
                <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" />
            </nav>

            <div className="p-4 border-t border-border">
                <button className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors px-4 py-2 w-full">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={cn(
        "flex items-center space-x-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200 group",
        active ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
    </button>
);
