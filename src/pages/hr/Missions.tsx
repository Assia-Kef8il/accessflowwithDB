import { useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { missions as initial, wilayas } from "@/data/mock";
import { Briefcase, MapPin, Plus, X, CalendarCheck } from "lucide-react";
import StatCard from "@/components/StatCard";
import WilayaInput from "@/components/WilayaInput";

type Mission = { id: string; employee: string; mission: string; wilaya: string; departure: string; returnDate: string };

const empty = { employee: "", mission: "", wilaya: "", departure: "", returnDate: "" };

const Missions = () => {
  const { t } = useLang();
  const [list, setList] = useState<Mission[]>(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setList([...list, { ...form, id: String(Date.now()) }]);
    setForm(empty);
    setOpen(false);
  };

  const stats = [
    { label: t("totalMissions"), value: list.length, icon: Briefcase, tone: "primary" as const },
    { label: t("wilaya"), value: new Set(list.map((m) => m.wilaya)).size, icon: MapPin, tone: "amber" as const },
    { label: t("employees"), value: new Set(list.map((m) => m.employee)).size, icon: CalendarCheck, tone: "green" as const },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("missions")}</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> {t("addMission")}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">{t("employee")}</th>
              <th className="text-left px-4 py-3">{t("mission")}</th>
              <th className="text-left px-4 py-3">{t("wilaya")}</th>
              <th className="text-left px-4 py-3">{t("departureDate")}</th>
              <th className="text-left px-4 py-3">{t("returnDate")}</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-t border-border hover:bg-primary-soft/40">
                <td className="px-4 py-3 font-medium">{m.employee}</td>
                <td className="px-4 py-3">{m.mission}</td>
                <td className="px-4 py-3">{m.wilaya}</td>
                <td className="px-4 py-3">{m.departure}</td>
                <td className="px-4 py-3">{m.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold">{t("addMission")}</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-medium">{t("employee")}</label>
                <input required value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">{t("mission")}</label>
                <input required value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">{t("wilaya")}</label>
                <WilayaInput required value={form.wilaya} onChange={(v) => setForm({ ...form, wilaya: v })} placeholder={wilayas[0]} />
              </div>
              <div>
                <label className="text-sm font-medium">{t("departureDate")}</label>
                <input required type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium">{t("returnDate")}</label>
                <input required type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-border hover:bg-muted">{t("cancel")}</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">{t("save")}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Missions;
