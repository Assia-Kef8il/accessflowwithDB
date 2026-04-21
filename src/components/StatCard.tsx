import { LucideIcon } from "lucide-react";

type Props = { label: string; value: number | string; icon: LucideIcon; tone?: "primary" | "amber" | "green" | "red" };

const tones: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  amber: "bg-amber-100 text-amber-700",
  green: "bg-emerald-100 text-emerald-700",
  red: "bg-red-100 text-red-600",
};

const StatCard = ({ label, value, icon: Icon, tone = "primary" }: Props) => (
  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${tones[tone]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default StatCard;
