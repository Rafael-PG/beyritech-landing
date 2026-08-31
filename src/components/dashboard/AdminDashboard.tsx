import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, MessageCircle, FileText, LogOut, Menu, X, ChevronLeft,
  Newspaper, Briefcase, Plus, Loader2, FilePen, Undo2,
} from "lucide-react";
import {
  getWhatsappClicks, getWhatsappLeads, getFichaLeads, clearToken,
  listCms, type CmsKind, type CmsListItem, type WhatsappClickRow, type WhatsappLeadRow, type FichaLeadRow,
} from "../../api/dashboard";
import DashboardGeneral from "./DashboardGeneral";
import DashboardWhatsApp from "./DashboardWhatsApp";
import DashboardFichas from "./DashboardFichas";
import AdminEditor from "../admin/AdminEditor";

type Section = "general" | "whatsapp" | "fichas" | "blog" | "casos";
type EditorSel = { id: number | null; nonce: number } | null;

const CONTENT_SECTIONS: Section[] = ["blog", "casos"];

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [section, setSection] = useState<Section>("general");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loadingData, setLoadingData] = useState(true);
  const [clicks, setClicks] = useState<WhatsappClickRow[]>([]);
  const [leads, setLeads] = useState<WhatsappLeadRow[]>([]);
  const [fichas, setFichas] = useState<FichaLeadRow[]>([]);

  const [list, setList] = useState<CmsListItem[]>([]);
  const [editor, setEditor] = useState<EditorSel>(null);

  const isContent = CONTENT_SECTIONS.includes(section);
  const activeKind: CmsKind = section === "blog" ? "blog" : "casos";

  useEffect(() => {
    let active = true;
    setLoadingData(true);
    (async () => {
      const [c, l, f] = await Promise.all([getWhatsappClicks(), getWhatsappLeads(), getFichaLeads()]);
      if (!active) return;
      setClicks(c ?? []);
      setLeads(l ?? []);
      setFichas(f ?? []);
      if (!c && !l && !f) onLogout();
      setLoadingData(false);
    })();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isContent) return;
    listCms(activeKind).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, editor]);

  const refreshList = () => listCms(activeKind).then(setList);

  const selectSection = (s: Section) => {
    setSection(s);
    setSidebarOpen(false);
    if (CONTENT_SECTIONS.includes(s)) {
      setEditor({ id: null, nonce: Date.now() });
    } else {
      setEditor(null);
    }
  };

  const headerTitle = () => {
    switch (section) {
      case "general": return "Panel de datos";
      case "whatsapp": return "WhatsApp";
      case "fichas": return "Fichas técnicas";
      case "blog": return "Artículos del blog";
      case "casos": return "Casos de éxito";
    }
  };

  const headerDesc = () => {
    switch (section) {
      case "general": return "Resumen de actividad de WhatsApp y fichas técnicas";
      case "whatsapp": return "Clicks y leads capturados desde el botón de WhatsApp";
      case "fichas": return "Correos capturados en descargas de fichas técnicas";
      case "blog": return "Crea y edita artículos técnicos con editor visual y SEO";
      case "casos": return "Documenta proyectos reales con editor visual y SEO";
    }
  };

  const navItem = (id: Section, label: string, Icon: any) => {
    const active = section === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => selectSection(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors relative ${
          active ? "text-gold-500 bg-gold-500/5" : "text-jet-300 hover:text-white hover:bg-jet-900/40"
        }`}
      >
        {active && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500" />}
        <Icon className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-jet-950 text-white flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-72 h-screen bg-jet-950 border-r border-jet-800/70 flex flex-col overflow-hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-jet-800/70">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-gold-500" />
            <span className="font-display font-bold text-white tracking-tight">
              Beyritech <span className="text-gold-500">· Panel</span>
            </span>
          </div>
          <button type="button" onClick={() => setSidebarOpen(false)} className="lg:hidden text-jet-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isContent && editor ? (
          <ContentSidebarList
            kind={activeKind}
            items={list}
            selectedId={editor.id}
            onSelect={(id) => setEditor({ id, nonce: Date.now() })}
            onNew={() => setEditor({ id: null, nonce: Date.now() })}
            onBack={() => { setEditor(null); setSection("general"); }}
          />
        ) : (
          <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
            <p className="px-5 text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-2 mt-2">Datos</p>
            {navItem("general", "General", LayoutDashboard)}
            {navItem("whatsapp", "WhatsApp", MessageCircle)}
            {navItem("fichas", "Fichas técnicas", FileText)}

            <p className="px-5 text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-2 mt-6">Contenido</p>
            {navItem("blog", "Artículos", Newspaper)}
            {navItem("casos", "Casos de éxito", Briefcase)}
          </nav>
        )}

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

      <main className="flex-1 min-w-0 flex flex-col p-6 lg:p-8">
        <header className="mb-6">
          <h1 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
            {headerTitle()}
          </h1>
          <p className="text-jet-400 text-sm font-light mt-1">{headerDesc()}</p>
        </header>

        {isContent && editor ? (
          <AdminEditor
            kind={activeKind}
            id={editor.id}
            nonce={editor.nonce}
            onExitEditor={() => { setEditor(null); setSection("general"); }}
            onRefreshList={refreshList}
          />
        ) : loadingData ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
          </div>
        ) : (
          <>
            {section === "general" && <DashboardGeneral clicks={clicks} leads={leads} fichas={fichas} />}
            {section === "whatsapp" && <DashboardWhatsApp clicks={clicks} leads={leads} />}
            {section === "fichas" && <DashboardFichas fichas={fichas} />}
          </>
        )}
      </main>

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 bg-jet-900 border border-jet-800 flex items-center justify-center text-white"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
}

function ContentSidebarList({
  kind, items, selectedId, onSelect, onNew, onBack,
}: {
  kind: CmsKind;
  items: CmsListItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onNew: () => void;
  onBack: () => void;
}) {
  const label = kind === "blog" ? "Artículo" : "Caso";
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 border-b border-jet-800/70">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-jet-400 hover:text-white mb-3"
        >
          <Undo2 className="w-3.5 h-3.5" /> Volver al panel
        </button>
        <button
          type="button"
          onClick={onNew}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded transition-colors ${
            selectedId === null
              ? "bg-gold-500 text-black"
              : "bg-jet-900 border border-jet-700 text-jet-200 hover:border-gold-500/50 hover:text-gold-500"
          }`}
        >
          <Plus className="w-3.5 h-3.5" /> Nuevo {label}
        </button>
      </div>

      <p className="px-4 text-[10px] font-mono uppercase tracking-widest text-jet-500 my-2">
        {items.length} {items.length === 1 ? "registro" : "registros"}
      </p>

      <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-4">
        {items.length === 0 && (
          <p className="px-3 py-6 text-sm text-jet-500 font-light text-center">
            Aún no hay {kind === "blog" ? "artículos" : "casos"}. Crea uno nuevo.
          </p>
        )}
        {items.map((it) => {
          const active = it.id === selectedId;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onSelect(it.id)}
              className={`w-full text-left px-3 py-2.5 rounded border transition-colors ${
                active
                  ? "bg-gold-500/10 border-gold-500/40"
                  : "border-transparent hover:bg-jet-900/60"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider text-jet-500 mb-1">
                {!it.published && <span className="text-[#e46d63]">Borrador · </span>}
                <span>{it.modelo}</span>
              </div>
              <div className="flex items-center gap-2">
                <FilePen className={`w-3.5 h-3.5 shrink-0 ${active ? "text-gold-500" : "text-jet-500"}`} />
                <span className={`text-sm leading-snug ${active ? "text-gold-500" : "text-jet-200"}`}>
                  {it.title}
                </span>
              </div>
              <div className="text-[10px] text-jet-600 mt-1">
                {new Date(it.date).toLocaleDateString("es-PE")}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
