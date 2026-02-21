"use client";

import React, { useState } from "react";
import { UserRole, WORKSPACE_TABS } from "@/core/domain/roles";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { RoleSwitcher } from "@/components/layout/RoleSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { EntrepreneurWorkspace } from "@/components/roles/EntrepreneurWorkspace";

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeRole, setActiveRole] = useState<UserRole>("ENTREPRENEUR");

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopBar activeRole={activeRole} />
                <RoleSwitcher activeRole={activeRole} onRoleChange={setActiveRole} />
                <main className="flex-1 overflow-y-auto p-6 bg-secondary/20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeRole}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {/* This is where the specific workspace content will go */}
                            <div className="max-w-7xl mx-auto h-full">
                                {/* Workspace Router logic would go here */}
                                <WorkspaceContent role={activeRole} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

const WorkspaceContent: React.FC<{ role: UserRole }> = ({ role }) => {
    switch (role) {
        case "ENTREPRENEUR":
            return <EntrepreneurWorkspace />;
        default:
            return (
                <div className="space-y-6">
                    <header>
                        <h1 className="text-3xl font-bold tracking-tight gradient-text">
                            {WORKSPACE_TABS.find((t) => t.id === role)?.label} Workspace
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your {role.toLowerCase().replace("_", " ")} tasks and resources.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-2 glass-morphism rounded-xl p-8 min-h-[400px]">
                            <p className="text-primary/80 font-mono text-sm">
                                Initializing {role} module...
                            </p>
                            <div className="mt-8 p-12 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="text-primary font-bold text-2xl">?</span>
                                </div>
                                <h2 className="text-xl font-semibold">Modular Implementation in Progress</h2>
                                <p className="text-muted-foreground mt-2 max-w-sm">
                                    This module is being built following Hexagonal Architecture principles to ensure strict RBAC and event-driven consistency.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 space-y-6">
                            <div className="glass-morphism rounded-xl p-6">
                                <h3 className="font-semibold mb-4">Activity Timeline</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-sm">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span>Project initialized</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
};
