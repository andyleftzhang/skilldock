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
import type { Enhancement, OutputLanguage, Persona } from "@/lib/skilldock-types";
import {
  activeSurfaceClass,
  cn,
  dividerClass,
  fuchsiaPanelClass,
  interactiveSurfaceClass,
  subtleBadgeClass,
} from "@/lib/utils";

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
  personas: Persona[];
  enhancements: Enhancement[];
  outputLanguages: OutputLanguage[];
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
  personas,
  enhancements,
  outputLanguages,
  onPersonaSelect,
  onEnhancementToggle,
  onOutputLanguageChange,
}: DockingPanelProps) {
  return (
    <Card className={cn("min-w-0", fuchsiaPanelClass)}>
      <CardHeader>
        <CardTitle className="text-base text-white">Docking Panel</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <section className="flex flex-col gap-3">
          <PanelHeading label={personasLabel} shelf={shelfA} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {personas.map((persona) => (
              <button
                aria-pressed={persona.id === selectedPersonaId}
                className={cn(
                  "rounded-2xl border p-3 text-left",
                  interactiveSurfaceClass,
                  persona.id === selectedPersonaId && activeSurfaceClass,
                )}
                key={persona.id}
                onClick={() => onPersonaSelect(persona.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-white">{persona.title}</span>
                  <Badge className={subtleBadgeClass} variant="outline">
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

        <Separator className={dividerClass} />

        <section className="flex flex-col gap-3">
          <PanelHeading label={enhancementsLabel} shelf={shelfB} />
          <div className="flex flex-col gap-3">
            {enhancements.map((enhancement) => (
              <label
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border p-3",
                  interactiveSurfaceClass,
                )}
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

        <Separator className={dividerClass} />

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
                  "flex cursor-pointer items-center gap-3 rounded-2xl border p-3",
                  interactiveSurfaceClass,
                  language.locale === selectedOutputLocale && activeSurfaceClass,
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
      <Badge className={subtleBadgeClass} variant="outline">
        {shelf}
      </Badge>
    </div>
  );
}
