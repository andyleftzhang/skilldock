import { Copy, Download, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { promptPreviewLines } from "@/lib/skilldock-data";

type PromptPreviewProps = {
  title: string;
  format: string;
  copyLabel: string;
  downloadLabel: string;
};

export function PromptPreview({
  title,
  format,
  copyLabel,
  downloadLabel,
}: PromptPreviewProps) {
  return (
    <Card className="overflow-hidden border-cyan-300/20 bg-slate-950/80 shadow-[0_24px_120px_rgba(34,211,238,0.18)] backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <div>
          <CardTitle className="flex items-center gap-2 text-base text-white">
            <TerminalSquare className="size-4 text-cyan-300" aria-hidden="true" />
            {title}
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">{format}</p>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <pre className="min-h-[24rem] overflow-hidden px-5 py-5 text-left font-mono text-[0.78rem] leading-7 text-slate-200 sm:text-sm">
          {promptPreviewLines.map((line, index) => (
            <code
              className={
                line.endsWith(":")
                  ? "block text-cyan-300"
                  : line.startsWith("  -")
                    ? "block text-fuchsia-200"
                    : line.startsWith("  ")
                      ? "block text-violet-100"
                      : "block text-slate-300"
              }
              key={`${line}-${index}`}
            >
              {line}
            </code>
          ))}
        </pre>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:justify-end">
        <Button className="w-full sm:w-auto" type="button" variant="secondary">
          <Copy data-icon="inline-start" />
          {copyLabel}
        </Button>
        <Button
          className="w-full bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.34)] hover:bg-cyan-200 sm:w-auto"
          type="button"
        >
          <Download data-icon="inline-start" />
          {downloadLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
