export type UserRole =
    | "ENTREPRENEUR"
    | "BUSINESS_ANALYST"
    | "SOFTWARE_ARCHITECT"
    | "DATA_ARCHITECT"
    | "UIUX_DESIGNER"
    | "FULLSTACK_DEVELOPER"
    | "SOFTWARE_TESTER"
    | "DEVOPS_ENGINEER"
    | "MONITORING";

export interface WorkspaceTab {
    id: UserRole;
    label: string;
    icon: string;
}

export const WORKSPACE_TABS: WorkspaceTab[] = [
    { id: "ENTREPRENEUR", label: "Entrepreneur", icon: "Lightbulb" },
    { id: "BUSINESS_ANALYST", label: "Business Analyst", icon: "FileText" },
    { id: "SOFTWARE_ARCHITECT", label: "Software Architect", icon: "PenTool" },
    { id: "DATA_ARCHITECT", label: "Data Architect", icon: "Database" },
    { id: "UIUX_DESIGNER", label: "UI/UX Designer", icon: "Palette" },
    { id: "FULLSTACK_DEVELOPER", label: "Developer", icon: "Code" },
    { id: "SOFTWARE_TESTER", label: "Tester", icon: "ShieldCheck" },
    { id: "DEVOPS_ENGINEER", label: "DevOps", icon: "Terminal" },
    { id: "MONITORING", label: "Monitoring", icon: "Activity" },
];
