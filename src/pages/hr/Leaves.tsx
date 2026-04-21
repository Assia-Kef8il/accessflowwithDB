import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { leaves as initial } from "@/data/mock";
import { CalendarDays, Clock, CheckCircle2, XCircle, Check, X } from "lucide-react";
import StatCard from "@/components/StatCard";
import { toast } from "sonner";

type Leave = { id: string; employee: string; type: string; start: string; end: string; days: number; status: string };

// Mock API: simulate sending mobile push notification
const notifyEmployee = async (employee: string, status: string) => {
  await new Promise((r) => setTimeout(r, 400));
  console.log(`[mock-push] -> ${employee}: Your leave was ${status}`);
  return { ok: true };
};

const Leaves = () => {
  const { t } = useLang();
  const [list, setList] = useState<Leave[]>(initial);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const target = list.find((l) => l.id === id);
    setList(list.map((l) => (l.id === id ? { ...l, status } : l)));
    toast.success("Leave status updated", {
      description: `${target?.employee} • ${status === "approved" ? t("approved") : t("rejected")}`,
    });
    if (target) {
      await notifyEmployee(target.employee, status);
      toast(`📱 Notification sent to ${target.employee}`);
    }
  };

  const color = (s: string) =>
    s === "approved"
      ? "bg-emerald-100 text-emerald-700"
      : s === "pending"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-600";
  const lbl = (s: string) => (s === "approved" ? t("approved") : s === "pending" ? t("pending") : t("rejected"));

  const stats = [
    { label: t("totalLeaves"), value: list.length, icon: CalendarDays, tone: "primary" as const },
    { label: t("pendingLeaves"), value: list.filter((l) => l.status === "pending").length, icon: Clock, tone: "amber" as const },
    { label: t("approvedLeaves"), value: list.filter((l) => l.status === "approved").length, icon: CheckCircle2, tone: "green" as const },
    { label: t("rejected"), value: list.filter((l) => l.status === "rejected").length, icon: XCircle, tone: "red" as const },
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">{t("leaves")}</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">{t("employee")}</th>
              <th className="text-left px-4 py-3">{t("type")}</th>
              <th className="text-left px-4 py-3">{t("departureDate")}</th>
              <th className="text-left px-4 py-3">{t("returnDate")}</th>
              <th className="text-left px-4 py-3">{t("duration")}</th>
              <th className="text-left px-4 py-3">{t("status")}</th>
              <th className="text-left px-4 py-3">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.id} className="border-t border-border hover:bg-primary-soft/40">
                <td className="px-4 py-3 font-medium">{l.employee}</td>
                <td className="px-4 py-3">{l.type}</td>
                <td className="px-4 py-3">{l.start}</td>
                <td className="px-4 py-3">{l.end}</td>
                <td className="px-4 py-3">{l.days} {t("days")}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${color(l.status)}`}>{lbl(l.status)}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(l.id, "approved")}
                      disabled={l.status === "approved"}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40"
                    >
                      <Check className="w-3 h-3" /> {t("approve")}
                    </button>
                    <button
                      onClick={() => updateStatus(l.id, "rejected")}
                      disabled={l.status === "rejected"}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-red-600 text-white hover:bg-red-700 disabled:opacity-40"
                    >
                      <X className="w-3 h-3" /> {t("reject")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaves;
