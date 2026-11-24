import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  reverse = false,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("overflow-hidden py-6", className)} aria-hidden>
      <div className={reverse ? "marquee-reverse" : "marquee"}>
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10 pr-10 font-display text-3xl md:text-4xl">
            {item}
            <span className="text-gold text-2xl md:text-3xl">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
