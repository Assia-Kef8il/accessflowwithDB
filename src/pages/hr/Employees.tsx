import { useMemo, useState } from "react";
import { useLang } from "@/i18n/LangContext";
import { initialEmployees, departments, categories, Employee } from "@/data/mock";
import { Plus, X, Search, Users, UserCheck, Briefcase, IdCard } from "lucide-react";
import StatCard from "@/components/StatCard";

const empty = {
  nom: "", prenom: "", email: "", phone: "", matricule: "",
  permis: "", hireDate: "", category: "Cadre", permanent: true, department: "Administration",
};

const Employees = () => {
  const { t } = useLang();
  const [list, setList] = useState<Employee[]>(initialEmployees);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return list.filter((e) => {
      const matchQ = !q || `${e.nom} ${e.prenom} ${e.email} ${e.matricule}`.toLowerCase().includes(q);
      const matchD = dept === "all" || e.department === dept;
      return matchQ && matchD;
    });
  }, [list, query, dept]);

  const stats = [
    { label: t("totalEmployees"), value: list.length, icon: Users, tone: "primary" as const },
    { label: t("permanents"), value: list.filter((e) => e.permanent).length, icon: UserCheck, tone: "green" as const },
    { label: t("department"), value: new Set(list.map((e) => e.department)).size, icon: Briefcase, tone: "amber" as const },
    { label: t("badges"), value: list.length, icon: IdCard, tone: "primary" as const },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setList([...list, { ...form, id: String(Date.now()) }]);
    setForm(empty);
    setOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t("employees")}</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> {t("addEmployee")}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background md:w-64"
        >
          <option value="all">{t("allDepartments")}</option>
          {departments.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">{t("matricule")}</th>
              <th className="text-left px-4 py-3">{t("name")}</th>
              <th className="text-left px-4 py-3">{t("firstName")}</th>
              <th className="text-left px-4 py-3">{t("email")}</th>
              <th className="text-left px-4 py-3">{t("phone")}</th>
              <th className="text-left px-4 py-3">{t("department")}</th>
              <th className="text-left px-4 py-3">{t("hireDate")}</th>
              <th className="text-left px-4 py-3">{t("permanent")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t border-border hover:bg-primary-soft/40">
                <td className="px-4 py-3 font-mono text-xs">{e.matricule}</td>
                <td className="px-4 py-3 font-medium">{e.nom}</td>
                <td className="px-4 py-3">{e.prenom}</td>
                <td className="px-4 py-3 text-muted-foreground">{e.email}</td>
                <td className="px-4 py-3">{e.phone}</td>
                <td className="px-4 py-3">{e.department}</td>
                <td className="px-4 py-3">{e.hireDate}</td>
                <td className="px-4 py-3">{e.permanent ? t("yes") : t("no")}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">—</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold">{t("addEmployee")}</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t("name")} value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} />
              <Field label={t("firstName")} value={form.prenom} onChange={(v) => setForm({ ...form, prenom: v })} />
              <Field label={t("email")} type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div>
                <label className="text-sm font-medium">{t("phone")}</label>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{8,15}"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
              <Field label={t("matricule")} value={form.matricule} onChange={(v) => setForm({ ...form, matricule: v })} />
              <Field label={t("permis")} value={form.permis} onChange={(v) => setForm({ ...form, permis: v })} />
              <div>
                <label className="text-sm font-medium">{t("hireDate")}</label>
                <input
                  required
                  type="date"
                  value={form.hireDate}
                  onChange={(e) => setForm({ ...form, hireDate: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t("category")}</label>
                <select
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">{t("permanent")}</label>
                <select
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                  value={form.permanent ? "oui" : "non"}
                  onChange={(e) => setForm({ ...form, permanent: e.target.value === "oui" })}
                >
                  <option value="oui">{t("yes")}</option>
                  <option value="non">{t("no")}</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">{t("department")}</label>
                <select
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border border-border hover:bg-muted">
                  {t("cancel")}
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <input
      required
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full px-3 py-2 rounded-lg border border-border bg-background"
    />
  </div>
);

export default Employees;
