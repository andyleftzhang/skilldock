import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

type NavbarProps = {
  currentLocale: string;
  exploreLabel: string;
  builderLabel: string;
  languageLabel: string;
  exploreHref?: string;
  builderHref?: string;
  activeItem?: "explore" | "builder";
};

export function Navbar({
  currentLocale,
  exploreLabel,
  builderLabel,
  languageLabel,
  exploreHref = "#explore",
  builderHref = "#builder",
  activeItem = "builder",
}: NavbarProps) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#22d3ee,#8b5cf6,#ec4899)] shadow-[0_0_34px_rgba(168,85,247,0.55)]">
          <Sparkles className="size-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-lg font-semibold tracking-[-0.04em] text-white">
          SkillDock
        </span>
      </div>

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

      <LanguageSwitcher currentLocale={currentLocale} label={languageLabel} />
    </header>
  );
}
