import { useNavigate } from "react-router-dom";
import { ArrowLeft, Languages, Shield, Cpu } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const Module = ({ kind }: { kind: "security" | "it" }) => {
  const { t, toggle, lang } = useLang();
  const nav = useNavigate();
  const Icon = kind === "security" ? Shield : Cpu;
  const title = kind === "security" ? t("security") : t("it");

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-5 bg-card border-b border-border">
        <button onClick={() => nav("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {t("backHome")}
        </button>
        <h1 className="text-2xl font-bold text-primary">{t("appName")}</h1>
        <button onClick={toggle} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-primary-soft text-sm">
          <Languages className="w-4 h-4" /> {lang === "fr" ? "EN" : "FR"}
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-primary-foreground mx-auto mb-6"
          style={{ background: "var(--brand-gradient)", boxShadow: "var(--shadow-card)" }}
        >
          <Icon className="w-14 h-14" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          {lang === "fr"
            ? "Module en cours de développement. Les fonctionnalités seront disponibles prochainement."
            : "Module under development. Features will be available soon."}
        </p>
      </main>
    </div>
  );
};

export default Module;
