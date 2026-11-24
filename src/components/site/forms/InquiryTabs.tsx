import { motion } from "framer-motion";
import { Code2, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { CareerInquiryForm } from "./CareerInquiryForm";
import { DigitalInquiryForm } from "./DigitalInquiryForm";

export type InquiryType = "digital" | "career";

const tabs = [
  { key: "digital" as const, label: "Digital Solutions", sub: "Websites & web apps", icon: Code2 },
  { key: "career" as const, label: "Career Solutions", sub: "Job search support", icon: Compass },
];

/** Lets visitors pick a division; both forms stay mounted so typed answers are never lost. */
export function InquiryTabs({
  value,
  onChange,
  idPrefix,
}: {
  value: InquiryType;
  onChange: (v: InquiryType) => void;
  idPrefix: string;
}) {
  return (
    <div>
      <div role="tablist" aria-label="Choose a service" className="glass-night grid grid-cols-2 gap-1 rounded-full p-1.5">
        {tabs.map(({ key, label, sub, icon: Icon }) => {
          const active = value === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${key}`}
              aria-selected={active}
              aria-controls={`${idPrefix}-panel-${key}`}
              onClick={() => onChange(key)}
              className={cn(
                "relative flex items-center justify-center gap-2.5 rounded-full px-3 py-3 text-left transition-colors duration-500 sm:px-5",
                active ? "text-gold-foreground" : "text-night-foreground hover:text-gold",
              )}
            >
              {active && (
                <motion.span
                  layoutId={`${idPrefix}-tab-pill`}
                  className="absolute inset-0 rounded-full bg-gradient-gold shadow-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="relative h-4 w-4 shrink-0" />
              <span className="relative leading-tight">
                <span className="block text-sm font-semibold">{label}</span>
                <span className={cn("hidden text-[0.7rem] sm:block", active ? "opacity-80" : "text-night-muted")}>{sub}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-6">
        <div role="tabpanel" id={`${idPrefix}-panel-digital`} aria-labelledby={`${idPrefix}-tab-digital`} hidden={value !== "digital"}>
          <DigitalInquiryForm idPrefix={`${idPrefix}-digital`} />
        </div>
        <div role="tabpanel" id={`${idPrefix}-panel-career`} aria-labelledby={`${idPrefix}-tab-career`} hidden={value !== "career"}>
          <CareerInquiryForm idPrefix={`${idPrefix}-career`} />
        </div>
      </div>
    </div>
  );
}
