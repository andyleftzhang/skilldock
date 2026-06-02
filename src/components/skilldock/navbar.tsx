import { Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavbarProps = {
  exploreLabel: string;
  builderLabel: string;
  homeHref?: string;
  exploreHref?: string;
  builderHref?: string;
  activeItem?: "explore" | "builder";
};

export function Navbar({
  exploreLabel,
  builderLabel,
  homeHref = "/en",
  exploreHref = "#explore",
  builderHref = "#builder",
  activeItem,
}: NavbarProps) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <Link
        className="flex items-center gap-3 transition-opacity hover:opacity-90"
        href={homeHref}
      >
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#8b5cf6,#ec4899)] shadow-[0_0_34px_rgba(168,85,247,0.55)]">
          <Sparkles className="size-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold tracking-[-0.04em] text-white">
          SkillDock
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        <a
          className={cn(
            "transition-colors hover:text-white",
            activeItem === "explore" && "text-white",
          )}
          href={exploreHref}
        >
          {exploreLabel}
        </a>
        <a
          className={cn(
            "transition-colors hover:text-cyan-100",
            activeItem === "builder" && "text-white",
          )}
          href={builderHref}
        >
          {builderLabel}
        </a>
      </nav>

      <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100 sm:block">
        English
      </div>
    </header>
  );
}
