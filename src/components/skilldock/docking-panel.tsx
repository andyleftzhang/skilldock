import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { enhancements, outputLanguages, personas } from "@/lib/skilldock-data";
import type { OutputLanguage } from "@/lib/skilldock-types";
import { cn } from "@/lib/utils";

type DockingPanelProps = {
  personasLabel: string;
  enhancementsLabel: string;
  outputLanguageLabel: string;
  shelfA: string;
  shelfB: string;
  shelfC: string;
  selectedPersonaId: string;
  selectedEnhancementIds: string[];
  selectedOutputLocale: OutputLanguage["locale"];
  onPersonaSelect: (personaId: string) => void;
  onEnhancementToggle: (enhancementId: string) => void;
  onOutputLanguageChange: (locale: OutputLanguage["locale"]) => void;
};

export function DockingPanel({
  personasLabel,
  enhancementsLabel,
  outputLanguageLabel,
  shelfA,
  shelfB,
  shelfC,
  selectedPersonaId,
  selectedEnhancementIds,
  selectedOutputLocale,
  onPersonaSelect,
  onEnhancementToggle,
  onOutputLanguageChange,
}: DockingPanelProps) {
  return (
    <Card className="border-fuchsia-300/20 bg-slate-950/70 shadow-[0_24px_120px_rgba(236,72,153,0.16)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-base text-white">Docking Panel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <PanelHeading label={personasLabel} shelf={shelfA} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {personas.map((persona, index) => (
              <button
                aria-pressed={persona.id === selectedPersonaId}
                className={cn(
                  "rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-left transition hover:border-cyan-300/50 hover:bg-cyan-300/10",
                  persona.id === selectedPersonaId &&
                    "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,0.14)]",
                )}
                key={persona.id}
                onClick={() => onPersonaSelect(persona.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white">{persona.title}</span>
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    {persona.signal}
                  </Badge>
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {persona.summary}
                </p>
              </button>
            ))}
          </div>
        </section>

        <Separator className="bg-white/10" />

        <section className="flex flex-col gap-3">
          <PanelHeading label={enhancementsLabel} shelf={shelfB} />
          <div className="flex flex-col gap-3">
            {enhancements.map((enhancement) => (
              <label
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition hover:border-cyan-300/30 hover:bg-cyan-300/5"
                key={enhancement.id}
              >
                <Checkbox
                  checked={selectedEnhancementIds.includes(enhancement.id)}
                  onCheckedChange={() => onEnhancementToggle(enhancement.id)}
                />
                <span className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-white">
                    + {enhancement.label}
                  </span>
                  <span className="text-xs leading-5 text-muted-foreground">
                    {enhancement.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <Separator className="bg-white/10" />

        <section className="flex flex-col gap-3">
          <PanelHeading label={outputLanguageLabel} shelf={shelfC} />
          <RadioGroup
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
            onValueChange={(value) =>
              onOutputLanguageChange(value as OutputLanguage["locale"])
            }
            value={selectedOutputLocale}
          >
            {outputLanguages.map((language) => (
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition hover:border-cyan-300/30 hover:bg-cyan-300/5",
                  language.locale === selectedOutputLocale &&
                    "border-cyan-300/40 bg-cyan-300/10",
                )}
                key={language.locale}
              >
                <RadioGroupItem value={language.locale} />
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-white">{language.label}</span>
                  <span className="text-xs text-muted-foreground">{language.hint}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </section>
      </CardContent>
    </Card>
  );
}

function PanelHeading({ label, shelf }: { label: string; shelf: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-white">{label}</h2>
      <Badge className="border-white/10 bg-white/5 text-cyan-100" variant="outline">
        {shelf}
      </Badge>
    </div>
  );
}
