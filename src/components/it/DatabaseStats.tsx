import { Table2, FunctionSquare, FileStack } from "lucide-react";
import StatCard from "@/components/StatCard";

const DatabaseStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatCard label="Tables" value={7} icon={Table2} tone="primary" />
    <StatCard label="Functions" value={12} icon={FunctionSquare} tone="amber" />
    <StatCard label="Records" value={"1 482"} icon={FileStack} tone="green" />
  </div>
);

export default DatabaseStats;
