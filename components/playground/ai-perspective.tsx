"use client"

import * as React from "react"
import { ArrowDown, Brain, Cpu, Sparkles, Type } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { textToPipeline, CLUSTER_COLORS, type Cluster } from "@/lib/embeddings"
import { formatDimension } from "@/lib/format"

interface AiPerspectiveProps {
  word: string | null
}

export function AiPerspective({ word }: AiPerspectiveProps) {
  const { t } = useI18n()

  const pipeline = React.useMemo(() => {
    if (!word) return []
    return textToPipeline(word)
  }, [word])

  const STEP_ICONS = [Type, Sparkles, Cpu, Brain]

  if (!word) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{t.aiPerspective.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t.aiPerspective.subtitle}</p>
          <p className="mt-8 py-8 text-center text-sm text-muted-foreground">
            {t.aiPerspective.placeholder}
          </p>
        </CardContent>
      </Card>
    )
  }

  const first = pipeline[0]
  if (!first) return null

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Brain className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t.aiPerspective.title}</h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.aiPerspective.subtitle}</p>

        {/* Side by side: Human vs AI */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border bg-muted/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.aiPerspective.humansSee}
            </p>
            <p className="mt-3 text-2xl font-semibold">{first.word}</p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.aiPerspective.aiSees}
            </p>
            {first.hasEmbedding && first.vector ? (
              <div className="mt-3 flex flex-wrap gap-1">
                {first.vector.map((v, i) => (
                  <span
                    key={i}
                    className="rounded-md border bg-background px-2 py-1 font-mono text-xs"
                    style={{
                      borderColor: CLUSTER_COLORS[first.cluster as Cluster]?.hex ?? undefined,
                      opacity: 0.4 + v * 0.6,
                    }}
                  >
                    {formatDimension(v)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-lg text-muted-foreground">
                {t.aiPerspective.tokenPlaceholder}
              </p>
            )}
          </div>
        </div>

        {/* Pipeline steps */}
        <div className="mt-8">
          <h3 className="mb-4 text-sm font-medium text-center text-muted-foreground">
            {t.aiPerspective.pipeline}
          </h3>
          <div className="grid gap-3 sm:hidden">
            {t.aiPerspective.steps.map((step, i) => (
              <div key={step.title}>
                <div
                  className="flex animate-fade-up flex-col items-center rounded-xl border bg-background p-4 text-center"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                    {React.createElement(STEP_ICONS[i], { className: "h-5 w-5" })}
                  </div>
                  <p className="mt-3 text-sm font-medium">{step.title}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">
                    {i === 0 ? `"${first.word}"` :
                     i === 1 ? `Found: ${first.hasEmbedding ? "✓" : "✗"}` :
                     i === 2 ? `8D vector` :
                     first.hasEmbedding ? `Similar to ${first.cluster}` : "Unknown"}
                  </p>
                </div>
                {i < t.aiPerspective.steps.length - 1 && (
                  <div className="flex justify-center py-1 text-muted-foreground">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden grid-cols-7 items-stretch gap-2 sm:grid">
            {t.aiPerspective.steps.map((step, i) => (
              <div
                key={step.title}
                className={i < t.aiPerspective.steps.length - 1 ? "contents" : ""}
              >
                <div className="col-span-1">
                  <div
                    className="flex h-full animate-fade-up flex-col items-center rounded-xl border bg-background p-4 text-center"
                    style={{ animationDelay: `${i * 90}ms` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                      {React.createElement(STEP_ICONS[i], { className: "h-5 w-5" })}
                    </div>
                    <p className="mt-3 text-sm font-medium">{step.title}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </div>
                {i < t.aiPerspective.steps.length - 1 && (
                  <div className="col-span-1 flex items-center justify-center text-muted-foreground">
                    <span className="text-xl">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
