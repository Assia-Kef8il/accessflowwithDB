import { Database, Copy } from "lucide-react";
import { toast } from "sonner";

const DatabaseCard = () => {
  const url = "postgres://sdm_user:•••••@db.sdm.dz:5432/sdm_main";
  const copy = () => {
    navigator.clipboard.writeText(url);
    toast.success("Database URL copied");
  };
  return (
    <div className="bg-card rounded-xl border border-border shadow-md p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold">Database Management</h3>
          <p className="text-xs text-muted-foreground">PostgreSQL • sdm_main</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-xs font-mono">
        <span className="truncate flex-1">{url}</span>
        <button onClick={copy} title="Copy URL" className="p-1 hover:bg-background rounded">
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90">View tables</button>
        <button className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted">View functions</button>
      </div>
    </div>
  );
};

export default DatabaseCard;
