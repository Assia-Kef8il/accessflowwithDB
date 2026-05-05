import { useLang } from "@/i18n/LangContext";
import { Users, CalendarDays, Briefcase, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ActivityItem = {
  id: number;
  employee: string;
  door: string;
  date: string;
  time: string;
  action: "entry" | "exit";
};

const Dashboard = () => {
  const { t } = useLang();

const [employeesCount, setEmployeesCount] = useState(0);
const [presenceCount, setPresenceCount] = useState(0);
const [leavesCount, setLeavesCount] = useState(0);
const [missionsCount, setMissionsCount] = useState(0);
const [activity, setActivity] = useState<ActivityItem[]>([]);

const stats = [
  { label: t("totalEmployees"), value: employeesCount, icon: Users },
  { label: t("presentToday"), value: presenceCount, icon: UserCheck },
  { label: t("onLeave"), value: leavesCount, icon: CalendarDays },
  { label: t("onMission"), value: missionsCount, icon: Briefcase },
];


useEffect(() => {
  const fetchDashboard = async () => {

    const { count: empCount } = await supabase
      .from("employes")
      .select("*", { count: "exact", head: true });

    const { data: pointage } = await supabase
      .from("pointage")
      .select("*");

    const { count: congeCount } = await supabase
      .from("conges")
      .select("*", { count: "exact", head: true });

    const { count: missionCount } = await supabase
      .from("missions")
      .select("*", { count: "exact", head: true });

    const { data: access } = await supabase
      .from("historique_acces")
      .select("*")
      .order("date_heure", { ascending: false })
      .limit(6);

    setEmployeesCount(empCount || 0);

    setPresenceCount(
      pointage?.filter((p) => p.heure_arrivee).length || 0
    );

    setLeavesCount(congeCount || 0);
    setMissionsCount(missionCount || 0);

    const formatted =
      access?.map((l) => {
        const d = new Date(l.date_heure);

        return {
          id: l.id_acces,
          employee: `Badge ${l.id_badge}`,
          door: l.zone,
          date: d.toLocaleDateString(),
          time: d.toLocaleTimeString().slice(0, 5),
          action: l.type_mouv === "ENTREE" ? "entry" : "exit",
        };
      }) || [];

    setActivity(formatted);
  };

  fetchDashboard();
}, []);

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
          {activity.map((l) => (
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
