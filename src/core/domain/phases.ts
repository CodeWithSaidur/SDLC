export type ProjectPhase =
    | "IDEA_VALIDATION"
    | "MVP_SCOPING"
    | "SYSTEM_DESIGN"
    | "BRANDING"
    | "UIUX_DESIGN"
    | "DEVELOPMENT"
    | "QA_OPTIMIZATION"
    | "LAUNCH_SCALE";

export interface SdlcPhase {
    id: ProjectPhase;
    label: string;
    description: string;
    icon: string;
}

export const SDLC_PHASES: SdlcPhase[] = [
    {
        id: "IDEA_VALIDATION",
        label: "Idea Validation",
        description: "Identify problems & define core value",
        icon: "Lightbulb"
    },
    {
        id: "MVP_SCOPING",
        label: "MVP Scoping",
        description: "Define essential features list",
        icon: "Target"
    },
    {
        id: "SYSTEM_DESIGN",
        label: "System Design",
        description: "Arch, Tech stack & DB structure",
        icon: "Layers"
    },
    {
        id: "BRANDING",
        label: "Branding",
        description: "Name, Logo & Identity",
        icon: "Palette"
    },
    {
        id: "UIUX_DESIGN",
        label: "UI/UX Specs",
        description: "Wireframing & Figma designs",
        icon: "Layout"
    },
    {
        id: "DEVELOPMENT",
        label: "Development",
        description: "DB -> API -> Frontend Build",
        icon: "Code2"
    },
    {
        id: "QA_OPTIMIZATION",
        label: "QA & Testing",
        description: "Bug fixing & Performance",
        icon: "ShieldCheck"
    },
    {
        id: "LAUNCH_SCALE",
        label: "Launch & Scale",
        description: "Deployment to AWS/Vercel",
        icon: "Rocket"
    },
];
