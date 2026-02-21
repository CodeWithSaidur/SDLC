"use client";

import React from "react";
import { UserRole } from "@/core/domain/roles";
import { Bell, Search, User, ChevronDown } from "lucide-react";

interface TopBarProps {
    activeRole: UserRole;
}

export const TopBar: React.FC<TopBarProps> = ({ activeRole }) => {
    return (
        <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
            <div className="flex items-center space-x-4">
                <div className="bg-muted px-3 py-1.5 rounded-md text-sm font-medium border border-border">
                    Acme Corp Project X
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="bg-accent/50 border border-border rounded-lg pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
                    />
                </div>

                <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-2 border-background" />
                </button>

                <div className="flex items-center space-x-3 pl-2 border-l border-border">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                        JD
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold leading-none">John Doe</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Super Admin</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>
            </div>
        </header>
    );
};
