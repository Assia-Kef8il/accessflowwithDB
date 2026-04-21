import { useLang } from "@/i18n/LangContext";
import { initialEmployees, leaves, missions, presence, accessLogs } from "@/data/mock";
import { Users, CalendarDays, Briefcase, UserCheck } from "lucide-react";

const Dashboard = () => {
  const { t } = useLang();

  const stats = [
    { label: t("totalEmployees"), value: initialEmployees.length, icon: Users },
    { label: t("presentToday"), value: presence.filter((p) => p.status === "present").length, icon: UserCheck },
    { label: t("onLeave"), value: leaves.filter((l) => l.status === "approved").length, icon: CalendarDays },
    { label: t("onMission"), value: missions.length, icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("overview")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card rounded-xl p-5 border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-bold mt-1">{s.value}</p>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-primary-foreground"
                style={{ background: "var(--brand-gradient)" }}
              >
                <s.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: "var(--shadow-soft)" }}>
        <h3 className="font-semibold mb-4">{t("recentActivity")}</h3>
        <ul className="divide-y divide-border">
          {accessLogs.slice(0, 6).map((l) => (
            <li key={l.id} className="py-3 flex items-center justify-between text-sm">
              <span className="font-medium">{l.employee}</span>
              <span className="text-muted-foreground">{l.door}</span>
              <span className="text-muted-foreground">{l.date} • {l.time}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  l.action === "entry" ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {l.action === "entry" ? t("entry") : t("exit")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
