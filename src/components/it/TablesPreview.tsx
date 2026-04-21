import { Table2 } from "lucide-react";

const tables = [
  { name: "employees", rows: 248 },
  { name: "badges", rows: 240 },
  { name: "access_logs", rows: 612 },
  { name: "missions", rows: 87 },
  { name: "leaves", rows: 64 },
  { name: "parking_logs", rows: 154 },
  { name: "alerts", rows: 77 },
];

const TablesPreview = () => (
  <div className="bg-card rounded-xl border border-border shadow-md p-5">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <Table2 className="w-4 h-4 text-primary" /> Tables Preview
    </h3>
    <ul className="divide-y divide-border">
      {tables.map((t) => (
        <li key={t.name} className="flex items-center justify-between py-2 text-sm">
          <span className="font-mono">{t.name}</span>
          <span className="text-muted-foreground">{t.rows} rows</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TablesPreview;
