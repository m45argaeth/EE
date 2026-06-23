"use client"

import * as React from "react"
import { ArrowLeftRight } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { compareWords, CLUSTER_COLORS, type Cluster } from "@/lib/embeddings"
import { formatPercent, formatDimension } from "@/lib/format"

interface CompareConceptsProps {
  initialWordA?: string | null
  initialWordB?: string | null
}

export function CompareConcepts({ initialWordA, initialWordB }: CompareConceptsProps) {
  const { t } = useI18n()
  const [wordA, setWordA] = React.useState(initialWordA ?? "cat")
  const [wordB, setWordB] = React.useState(initialWordB ?? "kitten")

  const result = React.useMemo(() => compareWords(wordA, wordB), [wordA, wordB])

  const getExplanation = (): string => {
    const sim = result.similarity
    if (sim >= 0.85) return t.compare.explanation.high
    if (sim >= 0.55) {
      return t.compare.explanation.medium.replace("{cluster}", result.clusterA)
    }
    if (sim >= 0.3) {
      return t.compare.explanation.low
        .replace("{clusterA}", result.clusterA)
        .replace("{clusterB}", result.clusterB)
    }
    return t.compare.explanation.veryLow
  }

  const getRingColor = (): string => {
    const sim = result.similarity
    if (sim >= 0.85) return "#10b981"
    if (sim >= 0.65) return "#f59e0b"
    if (sim >= 0.45) return "#f97316"
    return "#ef4444"
  }

  // SVG ring
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - result.similarity)

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t.compare.title}</h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.compare.subtitle}</p>

        {/* Presets */}
        <div className="mb-6 flex flex-wrap gap-2">
          {t.compare.presets.map((preset) => (
            <Button
              key={preset.label}
              variant="outline"
              size="sm"
              onClick={() => {
                setWordA(preset.a)
                setWordB(preset.b)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.compare.wordA}
            </label>
            <Input
              value={wordA}
              onChange={(e) => setWordA(e.target.value)}
              placeholder="cat"
            />
          </div>
          <div className="hidden self-center text-muted-foreground sm:block">
            <ArrowLeftRight className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.compare.wordB}
            </label>
            <Input
              value={wordB}
              onChange={(e) => setWordB(e.target.value)}
              placeholder="kitten"
            />
          </div>
        </div>

        {/* Result */}
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Ring gauge */}
          <div className="relative flex-shrink-0">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="10"
              />
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke={getRingColor()}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 75 75)"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-mono">
                {formatPercent(result.similarity, 0)}
              </span>
              <span className="text-xs text-muted-foreground">
                {t.compare.similarity}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="capitalize"
                style={{
                  borderColor: CLUSTER_COLORS[result.clusterA as Cluster]?.hex,
                  color: CLUSTER_COLORS[result.clusterA as Cluster]?.hex,
                }}
              >
                {result.clusterA}
              </Badge>
              {result.sameCluster ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400">
                  ✓ {t.compare.sameCluster}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  ≠ {t.compare.differentCluster}
                </span>
              )}
              <Badge
                variant="outline"
                className="capitalize"
                style={{
                  borderColor: CLUSTER_COLORS[result.clusterB as Cluster]?.hex,
                  color: CLUSTER_COLORS[result.clusterB as Cluster]?.hex,
                }}
              >
                {result.clusterB}
              </Badge>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
              {result.sameCluster && (
                <span className="font-medium text-foreground">
                  {t.compare.explanation.sameCluster.replace("{cluster}", result.clusterA)}{" "}
                </span>
              )}
              {getExplanation()}
            </div>

            {/* Vector preview */}
            {result.vectorA && result.vectorB && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {wordA || "A"}
                  </p>
                  <div className="flex gap-1">
                    {result.vectorA.map((v, i) => (
                      <div
                        key={i}
                        className="h-6 flex-1 rounded-sm bg-sky-500/30"
                        style={{ opacity: 0.3 + v * 0.7 }}
                        title={`D${i}: ${formatDimension(v)}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {wordB || "B"}
                  </p>
                  <div className="flex gap-1">
                    {result.vectorB.map((v, i) => (
                      <div
                        key={i}
                        className="h-6 flex-1 rounded-sm bg-amber-500/30"
                        style={{ opacity: 0.3 + v * 0.7 }}
                        title={`D${i}: ${formatDimension(v)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
