import { useLang } from "@/i18n/LangContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


interface AccessLog {
  id: number;
  employee: string;
  date: string;
  time: string;
  door: string;
  action: "entry" | "exit";
}

const AccessHistory = () => {
  const { t } = useLang();
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);

 useEffect(() => {
  const fetchAccessLogs = async () => {
    const { data, error } = await supabase
      .from("historique_acces")
      .select("*");

    if (error) {
      console.error("Error fetching access logs:", error);
      return;
    }

    const formatted =
      data?.map((l) => {
        const dateObj = new Date(l.date_heure);

        return {
          id: l.id_acces,
          employee: `Badge ${l.id_badge}`,
          date: dateObj.toLocaleDateString(),
          time: dateObj.toLocaleTimeString().slice(0, 5),
          door: l.zone ?? "—",
          action: (l.type_mouv === "ENTREE" ? "entry" : "exit") as "entry" | "exit",
        };
      }) || [];

    setAccessLogs(formatted);
  };

  fetchAccessLogs();
}, []);

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
