"use client";

import { useState } from "react";
import { Copy, Download, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ExportArtifact, ExportTargetId } from "@/lib/skill-exporter";
import { cn } from "@/lib/utils";

export type ExportTargetOption = {
  id: ExportTargetId;
  label: string;
  description: string;
};

type PromptPreviewProps = {
  title: string;
  format: string;
  copyLabel: string;
  copiedLabel: string;
  downloadLabel: string;
  exportAsLabel: string;
  exportArtifact: ExportArtifact;
  exportTargets: ExportTargetOption[];
  selectedExportTargetId: ExportTargetId;
  onExportTargetChange: (targetId: ExportTargetId) => void;
};

export function PromptPreview({
  title,
  format,
  copyLabel,
  copiedLabel,
  downloadLabel,
  exportAsLabel,
  exportArtifact,
  exportTargets,
  selectedExportTargetId,
  onExportTargetChange,
}: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);
  const promptPreviewLines = exportArtifact.content.split("\n");

  async function copyPrompt() {
    await navigator.clipboard.writeText(exportArtifact.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadPrompt() {
    const blob = new Blob([exportArtifact.content], { type: exportArtifact.mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportArtifact.fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

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
      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
          {exportAsLabel}
        </div>
        <RadioGroup
          className="grid grid-cols-1 gap-2 sm:grid-cols-3"
          onValueChange={(value) => onExportTargetChange(value as ExportTargetId)}
          value={selectedExportTargetId}
        >
          {exportTargets.map((target) => (
            <label
              className={cn(
                "cursor-pointer rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition hover:border-cyan-300/30 hover:bg-cyan-300/5",
                target.id === selectedExportTargetId &&
                  "border-cyan-300/40 bg-cyan-300/10",
              )}
              key={target.id}
            >
              <span className="flex items-start gap-2">
                <RadioGroupItem className="mt-0.5" value={target.id} />
                <span>
                  <span className="block text-sm font-medium text-white">
                    {target.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {target.description}
                  </span>
                </span>
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>
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
        <Button
          className="w-full sm:w-auto"
          onClick={copyPrompt}
          type="button"
          variant="secondary"
        >
          <Copy data-icon="inline-start" />
          {copied ? copiedLabel : copyLabel}
        </Button>
        <Button
          className="w-full bg-cyan-300 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.34)] hover:bg-cyan-200 sm:w-auto"
          onClick={downloadPrompt}
          type="button"
        >
          <Download data-icon="inline-start" />
          {downloadLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
