import { DashboardShell } from "@/components/layout/DashboardShell";

export default function Home() {
  return (
    <DashboardShell>
      {/* The shell handles internal routing via state for demo purposes, 
          in a real app we might use url segments but for this complex multi-role single-page vibe, 
          state-based workspace switching inside the shell is common */}
      <div>Main Content Placeholder</div>
    </DashboardShell>
  );
}
