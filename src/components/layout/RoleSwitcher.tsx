"use client";

import React from "react";
import { WORKSPACE_TABS, UserRole } from "@/core/domain/roles";
import { cn } from "@/lib/utils";
import {
    Lightbulb,
    FileText,
    PenTool,
    Database,
    Palette,
    Code,
    ShieldCheck,
    Terminal,
    Activity,
    Radio,
    Zap
} from "lucide-react";

const iconMap = {
    Lightbulb,
    FileText,
    PenTool,
    Database,
    Palette,
    Code,
    ShieldCheck,
    Terminal,
    Activity,
    Radio,
    Zap,
};

interface RoleSwitcherProps {
    activeRole: UserRole;
    onRoleChange: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
    activeRole,
    onRoleChange,
}) => {
    return (
        <div className="flex items-center space-x-1 border-b border-border/50 bg-background/50 backdrop-blur-md px-4 overflow-x-auto no-scrollbar">
            {WORKSPACE_TABS.map((tab) => {
                const Icon = (iconMap as any)[tab.icon];
                return (
                    <button
                        key={tab.id}
                        onClick={() => onRoleChange(tab.id)}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 border-transparent hover:text-primary",
                            activeRole === tab.id
                                ? "text-primary border-primary bg-primary/5"
                                : "text-muted-foreground"
                        )}
                    >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
