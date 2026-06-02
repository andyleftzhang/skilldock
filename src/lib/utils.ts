import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const premiumButtonClass =
  "relative isolate overflow-hidden !border-cyan-100/20 !bg-slate-950/70 !text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_56px_rgba(2,6,23,0.34)] backdrop-blur-xl transition before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_82%_120%,rgba(236,72,153,0.16),transparent_38%)] before:opacity-60 before:transition-opacity after:absolute after:inset-x-[-35%] after:top-0 after:-z-10 after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.95),rgba(236,72,153,0.75),transparent)] after:opacity-70 hover:!border-cyan-200/45 hover:!bg-slate-950/82 hover:!text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1px_rgba(34,211,238,0.10),0_18px_70px_rgba(34,211,238,0.16),0_10px_48px_rgba(236,72,153,0.10)] hover:before:opacity-100";

export const neonBadgeClass =
  "border border-cyan-200/18 bg-slate-950/55 text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-md";

export const neonAccentBadgeClass =
  "border border-fuchsia-200/18 bg-slate-950/55 text-fuchsia-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_24px_rgba(236,72,153,0.08)] backdrop-blur-md";

export const subtleBadgeClass =
  "border border-white/10 bg-white/[0.045] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md";

export const cyanPanelClass =
  "border-cyan-300/20 bg-slate-950/75 shadow-[0_24px_120px_rgba(34,211,238,0.16)] backdrop-blur-xl";

export const fuchsiaPanelClass =
  "border-fuchsia-300/20 bg-slate-950/75 shadow-[0_24px_120px_rgba(236,72,153,0.14)] backdrop-blur-xl";

export const quietPanelClass =
  "border-white/10 bg-slate-950/70 shadow-[0_20px_90px_rgba(34,211,238,0.10)] backdrop-blur-xl";

export const interactiveSurfaceClass =
  "border-white/10 bg-white/[0.035] transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.055] hover:shadow-[0_0_28px_rgba(34,211,238,0.08)]";

export const activeSurfaceClass =
  "border-cyan-300/45 bg-cyan-300/[0.10] shadow-[0_0_34px_rgba(34,211,238,0.14)]";

export const dividerClass = "bg-white/10";

export const sectionLabelClass =
  "text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/85";
