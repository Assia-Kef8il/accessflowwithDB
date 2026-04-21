import { useLang } from "@/i18n/LangContext";
import { badges } from "@/data/mock";
import { IdCard } from "lucide-react";

const Badges = () => {
  const { t } = useLang();
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">{t("badges")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className="bg-card rounded-xl border border-border p-5 flex items-center gap-4"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center text-primary-foreground"
              style={{ background: "var(--brand-gradient)" }}
            >
              <IdCard className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{b.employee}</p>
              <p className="text-xs text-muted-foreground">{b.department}</p>
              <p className="text-xs font-mono mt-1">{b.badgeId}</p>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              b.status === "active" ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground"
            }`}>
              {b.status === "active" ? t("active") : t("inactive")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;
