import { Server, Database, Cpu } from "lucide-react";

const servers = [
  { name: "Web server", icon: Server, status: "online" },
  { name: "DB server", icon: Database, status: "online" },
  { name: "Arduino gateway", icon: Cpu, status: "warning" },
];

const dot = (s: string) =>
  s === "online" ? "bg-emerald-500" : s === "warning" ? "bg-amber-500" : "bg-red-500";

const ServerStatus = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-5">
    <h3 className="font-semibold mb-4">Server Status</h3>
    <ul className="space-y-3">
      {servers.map((s) => (
        <li key={s.name} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <s.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{s.name}</span>
          </div>
          <span className="flex items-center gap-2 text-xs">
            <span className={`w-2 h-2 rounded-full ${dot(s.status)}`} />
            <span className="capitalize">{s.status}</span>
          </span>
        </li>
      ))}
    </ul>
    <p className="mt-4 text-xs text-muted-foreground">Last check: {new Date().toLocaleTimeString()}</p>
  </div>
);

export default ServerStatus;
