import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandLogo({
  tagline,
  size = "header",
}: {
  tagline?: string | null;
  size?: "header" | "footer";
}) {
  const isFooter = size === "footer";

  return (
    <Link
      to="/"
      className="group inline-flex shrink-0 items-center gap-3 focus-visible:outline-none"
      aria-label="Nexoys home"
    >
      <img
        src="/nexoys-mark.svg"
        alt=""
        width={48}
        height={48}
        className={cn(
          "shrink-0 rounded-full object-contain transition-transform duration-700 ease-out group-hover:rotate-[360deg]",
          isFooter ? "h-12 w-12" : "h-10 w-10 sm:h-11 sm:w-11",
        )}
      />
      <span className="flex flex-col items-start justify-center leading-none">
        <img
          src="/nexoys-logo.svg"
          alt="Nexoys"
          width={210}
          height={45}
          className={cn(
            "w-auto object-contain",
            isFooter ? "h-10 sm:h-11" : "h-8 sm:h-9",
          )}
        />
        {tagline && (
          <span className="mt-1 pl-0.5 font-mono text-[0.52rem] font-medium uppercase tracking-[0.22em] text-night-foreground/85 sm:text-[0.58rem]">
            {tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
