import { Activity, ExternalLink } from "lucide-react";

const MonitoringCard = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-5">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
        <Activity className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-semibold">Monitoring — Zabbix</h3>
        <p className="text-xs text-muted-foreground">Infrastructure metrics</p>
      </div>
    </div>
    <p className="text-sm text-muted-foreground mb-4">Open the Zabbix dashboard for full monitoring.</p>
    <a
      href="https://www.zabbix.com/"
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90"
    >
      Zabbix Dashboard <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

export default MonitoringCard;
