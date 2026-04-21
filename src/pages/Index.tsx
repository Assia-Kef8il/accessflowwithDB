import { useNavigate } from "react-router-dom";
import { Users, Cpu, Languages, Shield } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const Index = () => {
  const nav = useNavigate();
  const { t, toggle, lang } = useLang();

  const modules = [
    { key: "hr", icon: Users, label: t("hr"), path: "/hr", empty: false, external: false },
    { key: "security", icon: Shield, label: t("security"), path: "https://smart-parking-u3xs.onrender.com", empty: false, external: true },
    { key: "it", icon: Cpu, label: t("it"), path: "/it-group", empty: false, external: false },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <div />
        <h1 className="text-4xl font-bold tracking-tight text-primary">{t("appName")}</h1>
        <button
          onClick={toggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-soft border border-border hover:bg-primary-soft transition"
        >
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">{lang === "fr" ? "EN" : "FR"}</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <p className="text-muted-foreground mb-2">{t("welcome")}</p>
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-center">{t("selectModule")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {modules.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                if (m.external) {
                  window.open(m.path, "_blank", "noopener,noreferrer");
                } else if (!m.empty) {
                  nav(m.path);
                }
              }}
              className="group flex flex-col items-center gap-4"
            >
              <div
                className={`w-44 h-44 md:w-56 md:h-56 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  m.empty
                    ? "border-4 border-dashed border-border bg-card text-muted-foreground cursor-pointer"
                    : "text-primary-foreground"
                }`}
                style={
                  m.empty
                    ? undefined
                    : { background: "var(--brand-gradient)", boxShadow: "var(--shadow-card)" }
                }
              >
                {m.icon && <m.icon className="w-20 h-20 md:w-24 md:h-24" strokeWidth={1.5} />}
              </div>
              <span className={`text-xl font-semibold ${m.empty ? "text-muted-foreground" : ""}`}>{m.label}</span>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-muted-foreground">
        {t("appName")} — {t("tagline")}
      </footer>
    </div>
  );
};

export default Index;
