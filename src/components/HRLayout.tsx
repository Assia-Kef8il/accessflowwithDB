import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarDays, Briefcase, Clock, History, IdCard, ArrowLeft, Languages } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const HRLayout = () => {
  const { t, toggle, lang } = useLang();
  const nav = useNavigate();

  const links = [
    { to: "/hr", icon: LayoutDashboard, label: t("dashboard"), end: true },
    { to: "/hr/employees", icon: Users, label: t("employees") },
    { to: "/hr/leaves", icon: CalendarDays, label: t("leaves") },
    { to: "/hr/missions", icon: Briefcase, label: t("missions") },
    { to: "/hr/presence", icon: Clock, label: t("presence") },
    { to: "/hr/access-history", icon: History, label: t("accessHistory") },
    { to: "/hr/badges", icon: IdCard, label: t("badges") },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside
        className="w-64 border-r border-border flex flex-col text-primary-foreground"
        style={{ background: "var(--brand-gradient)" }}
      >
        <div className="px-6 py-6 border-b border-white/15">
          <h1 className="text-2xl font-bold">{t("appName")}</h1>
          <p className="text-xs opacity-80 mt-1">{t("hr")}</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white text-primary font-medium shadow-sm"
                    : "text-primary-foreground/90 hover:bg-white/15"
                }`
              }
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => nav("/")}
          className="m-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary-foreground/90 hover:bg-white/15"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backHome")}
        </button>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6">
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border hover:bg-primary-soft text-sm"
          >
            <Languages className="w-4 h-4" />
            {lang === "fr" ? "EN" : "FR"}
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
