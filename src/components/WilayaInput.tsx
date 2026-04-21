import { useState, useRef, useEffect } from "react";
import { wilayas } from "@/data/mock";

type Props = { value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean };

const WilayaInput = ({ value, onChange, placeholder, required }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = wilayas.filter((w) => w.toLowerCase().includes(value.toLowerCase())).slice(0, 6);

  return (
    <div className="relative" ref={ref}>
      <input
        required={required}
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-border bg-background"
      />
      {open && filtered.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-card border border-border rounded-lg shadow-lg max-h-48 overflow-auto">
          {filtered.map((w) => (
            <li
              key={w}
              onClick={() => { onChange(w); setOpen(false); }}
              className="px-3 py-2 text-sm hover:bg-primary-soft cursor-pointer"
            >
              {w}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WilayaInput;
