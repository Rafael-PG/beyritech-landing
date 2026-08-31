import { LayoutDashboard, MessageCircle, FileText, LogOut, Menu, X, ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export type DashView = "general" | "whatsapp" | "fichas";

interface SidebarProps {
  view: DashView;
  onNavigate: (v: DashView) => void;
  onLogout: () => void;
  open: boolean;
  setOpen: (b: boolean) => void;
}

const NAV: { id: DashView; label: string; icon: any }[] = [
  { id: "general", label: "General", icon: LayoutDashboard },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "fichas", label: "Fichas técnicas", icon: FileText },
];

export default function Sidebar({ view, onNavigate, onLogout, open, setOpen }: SidebarProps) {
  const item = (id: DashView, label: string, Icon: any, extra?: ReactNode) => {
    const active = view === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => onNavigate(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors relative ${
          active ? "text-gold-500 bg-gold-500/5" : "text-jet-300 hover:text-white hover:bg-jet-900/40"
        }`}
      >
        {active && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500" />}
        <Icon className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
        {extra}
      </button>
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-64 h-screen bg-jet-950 border-r border-jet-800/70 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-jet-800/70">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-gold-500" />
            <span className="font-display font-bold text-white tracking-tight">
              Beyritech <span className="text-gold-500">· Panel</span>
            </span>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="lg:hidden text-jet-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          <p className="px-5 text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-2">Datos</p>
          {NAV.map((n) => item(n.id, n.label, n.icon))}
        </nav>

        <div className="p-4 border-t border-jet-800/70">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-jet-300 hover:text-[#e46d63] hover:bg-red-500/5 transition-colors border border-jet-800"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Topbar mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 bg-jet-900 border border-jet-800 flex items-center justify-center text-white"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>
    </>
  );
}
