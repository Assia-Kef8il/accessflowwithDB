import { useLang } from "@/i18n/LangContext";
import { presence } from "@/data/mock";

const Presence = () => {
  const { t } = useLang();
  const color = (s: string) =>
    s === "present" ? "bg-primary-soft text-primary"
    : s === "leave" ? "bg-muted text-muted-foreground"
    : s === "mission" ? "bg-accent text-accent-foreground"
    : "bg-destructive/10 text-destructive";
  const lbl = (s: string) =>
    s === "present" ? "✓" : s === "leave" ? t("onLeave") : s === "mission" ? t("onMission") : "Absent";

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">{t("presence")}</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">{t("employee")}</th>
              <th className="text-left px-4 py-3">{t("date")}</th>
              <th className="text-left px-4 py-3">{t("entry")}</th>
              <th className="text-left px-4 py-3">{t("exit")}</th>
              <th className="text-left px-4 py-3">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {presence.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-primary-soft/40">
                <td className="px-4 py-3 font-medium">{p.employee}</td>
                <td className="px-4 py-3">{p.date}</td>
                <td className="px-4 py-3">{p.entry}</td>
                <td className="px-4 py-3">{p.exit}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${color(p.status)}`}>{lbl(p.status)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Presence;
