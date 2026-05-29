"use client";

import { ChevronDown, Languages } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";

const languageLabels: Record<string, string> = {
  en: "English",
  ja: "日本語",
  es: "Español",
  "zh-CN": "简体中文",
};

type LanguageSwitcherProps = {
  currentLocale: string;
  label: string;
};

export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-white/10 bg-white/5 text-foreground shadow-[0_0_28px_rgba(34,211,238,0.14)] hover:bg-white/10"
          size="sm"
          variant="outline"
        >
          <Languages data-icon="inline-start" />
          {languageLabels[currentLocale] ?? currentLocale}
          <ChevronDown data-icon="inline-end" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-white/10 bg-popover/95">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => router.push(`/${locale}`)}
          >
            {languageLabels[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
