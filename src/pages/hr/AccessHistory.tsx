import { useLang } from "@/i18n/LangContext";
import { accessLogs } from "@/data/mock";

const AccessHistory = () => {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">{t("accessHistory")}</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">{t("employee")}</th>
              <th className="text-left px-4 py-3">{t("date")}</th>
              <th className="text-left px-4 py-3">{t("time")}</th>
              <th className="text-left px-4 py-3">Porte</th>
              <th className="text-left px-4 py-3">{t("type")}</th>
            </tr>
          </thead>
          <tbody>
            {accessLogs.map((l) => (
              <tr key={l.id} className="border-t border-border hover:bg-primary-soft/40">
                <td className="px-4 py-3 font-medium">{l.employee}</td>
                <td className="px-4 py-3">{l.date}</td>
                <td className="px-4 py-3 font-mono">{l.time}</td>
                <td className="px-4 py-3">{l.door}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    l.action === "entry" ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {l.action === "entry" ? t("entry") : t("exit")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessHistory;
