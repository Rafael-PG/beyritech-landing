import { lazy, Suspense, useEffect, useState, type FormEvent } from "react";
import { Lock, LogIn, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { login, getToken, clearToken } from "../api/dashboard";

const AdminDashboard = lazy(() => import("../components/dashboard/AdminDashboard"));

type AuthState = "checking" | "loggedOut" | "loggedIn";

export default function Direccion() {
  const [auth, setAuth] = useState<AuthState>("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setAuth(getToken() ? "loggedIn" : "loggedOut");
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const ok = await login(password);
    setBusy(false);
    if (ok) {
      setAuth("loggedIn");
      setPassword("");
    } else {
      setError("Contraseña incorrecta.");
    }
  };

  const handleLogout = () => {
    clearToken();
    setAuth("loggedOut");
  };

  if (auth === "checking") {
    return (
      <div className="min-h-screen bg-jet-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
      </div>
    );
  }

  if (auth === "loggedOut") {
    return (
      <div className="min-h-screen bg-jet-950 flex items-center justify-center p-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm relative border border-jet-800/70 bg-jet-900/60 p-8"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/40" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold-500/40 text-gold-500 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight">Acceso al Panel</h1>
            <p className="text-jet-400 text-sm font-light mt-2">Ingrese la contraseña para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-jet-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                autoFocus
                className="w-full pl-10 pr-4 py-3 bg-jet-950 border border-jet-700 text-white text-sm font-light focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            {error && <p className="text-xs text-[#e46d63]">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-black font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
              Ingresar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-jet-950 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
        </div>
      }
    >
      <AdminDashboard onLogout={handleLogout} />
    </Suspense>
  );
}
