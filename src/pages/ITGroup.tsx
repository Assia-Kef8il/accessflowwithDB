import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Languages, Lock, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import DatabaseCard from "@/components/it/DatabaseCard";
import DatabaseStats from "@/components/it/DatabaseStats";
import TablesPreview from "@/components/it/TablesPreview";
import MonitoringCard from "@/components/it/MonitoringCard";
import ServerStatus from "@/components/it/ServerStatus";
import ITAlertsPanel from "@/components/it/ITAlertsPanel";

const ITGroup = () => {
  const { t, toggle, lang } = useLang();
  const nav = useNavigate();
  const [role, setRole] = useState<"admin" | "user">("admin");
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <button onClick={() => nav("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {t("backHome")}
        </button>
        <h1 className="text-xl font-bold text-primary">IT Group — Infrastructure & Monitoring</h1>
        <div className="flex items-center gap-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "user")}
            className="px-2 py-1 text-sm rounded-md border border-border bg-background"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button onClick={toggle} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-primary-soft text-sm">
            <Languages className="w-4 h-4" /> {lang === "fr" ? "EN" : "FR"}
          </button>
        </div>
      </header>

      <main className={`max-w-7xl mx-auto p-6 space-y-6 ${!isAdmin ? "pointer-events-none opacity-60" : ""}`}>
        <DatabaseStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DatabaseCard />
          <MonitoringCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TablesPreview />
          <ServerStatus />
        </div>

        <ITAlertsPanel />
      </main>

      <div className="max-w-7xl mx-auto px-6 pb-8 pointer-events-auto opacity-100">
        <div className={`rounded-xl border p-4 flex items-center gap-3 ${isAdmin ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"}`}>
          {isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          <div className="text-sm">
            {isAdmin ? (
              <><strong>Admin</strong> — full access granted.</>
            ) : (
              <><strong>Access restricted</strong> — User role: actions are disabled.</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITGroup;
