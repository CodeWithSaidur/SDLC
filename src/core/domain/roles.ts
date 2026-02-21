export type UserRole =
    | "ENTREPRENEUR"
    | "BUSINESS_ANALYST"
    | "SOFTWARE_ARCHITECT"
    | "DATA_ARCHITECT"
    | "UIUX_DESIGNER"
    | "FULLSTACK_DEVELOPER"
    | "SOFTWARE_TESTER"
    | "DEVOPS_ENGINEER"
    | "MONITORING"
    | "LIVE"
    | "UNIFIED_ENGINE";

export interface WorkspaceTab {
    id: UserRole;
    label: string;
    icon: string;
}

export const WORKSPACE_TABS: WorkspaceTab[] = [
    { id: "UNIFIED_ENGINE", label: "SDLC Engine", icon: "Zap" },
    { id: "ENTREPRENEUR", label: "Ideation", icon: "Lightbulb" },
    { id: "BUSINESS_ANALYST", label: "Requirements", icon: "FileText" },
    { id: "UIUX_DESIGNER", label: "Design", icon: "Palette" },
    { id: "SOFTWARE_ARCHITECT", label: "Architecture", icon: "PenTool" },
    { id: "DATA_ARCHITECT", label: "Database", icon: "Database" },
    { id: "FULLSTACK_DEVELOPER", label: "Development", icon: "Code" },
    { id: "SOFTWARE_TESTER", label: "Testing & QA", icon: "ShieldCheck" },
    { id: "DEVOPS_ENGINEER", label: "Deployment", icon: "Terminal" },
    { id: "MONITORING", label: "Monitoring", icon: "Activity" },
    { id: "LIVE", label: "Live Pulse", icon: "Radio" },
];
