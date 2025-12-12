import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function AppLayout() {
  return (
    // 1. MUDANÇA: bg-background e text-foreground se adaptam sozinhos
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* SIDEBAR */}
      {/* 2. MUDANÇA: bg-muted/40 cria um cinza bem clarinho no light mode e escuro no dark */}
      <aside className="w-64 hidden md:flex flex-col border-r border-border bg-muted/40">
        
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-indigo-500 mr-2" />
            <span className="font-bold text-lg tracking-tight">ChurnInsight</span>
          </div>
          <ModeToggle />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <SidebarItem to="/" icon={<LayoutDashboard size={20} />} label="Visão Geral" />
          <SidebarItem to="/clientes" icon={<Users size={20} />} label="Clientes em Risco" />
          <SidebarItem to="/analises" icon={<BarChart3 size={20} />} label="Análise de Cohort" />
          <SidebarItem to="/configuracoes" icon={<Settings size={20} />} label="Configurações" />
        </nav>

        <div className="p-4 border-t border-border">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function SidebarItem({ to, icon, label }: { to: string; icon: any; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          isActive 
            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" // Ajuste fino para contraste
            : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}