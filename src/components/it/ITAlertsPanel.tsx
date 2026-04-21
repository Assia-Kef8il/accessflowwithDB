import { AlertTriangle } from "lucide-react";

const alerts = [
  { msg: "CPU high on web-01", severity: "warning", time: "10:24" },
  { msg: "Server down: cache-02", severity: "critical", time: "09:12" },
  { msg: "DB failover triggered", severity: "critical", time: "08:55" },
  { msg: "Backup completed", severity: "ok", time: "07:00" },
];

const tone: Record<string, string> = {
  ok: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  critical: "bg-red-100 text-red-700 border-red-200",
};

const ITAlertsPanel = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-5">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <AlertTriangle className="w-4 h-4 text-primary" /> IT Alerts
    </h3>
    <ul className="space-y-2">
      {alerts.map((a, i) => (
        <li key={i} className={`flex items-center justify-between border rounded-lg px-3 py-2 text-sm ${tone[a.severity]}`}>
          <span>{a.msg}</span>
          <span className="text-xs opacity-80">{a.time}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ITAlertsPanel;
