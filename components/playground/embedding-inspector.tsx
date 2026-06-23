"use client"

import * as React from "react"
import { Layers } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { getEmbedding, findCluster, CLUSTER_COLORS, type Cluster } from "@/lib/embeddings"
import { formatDimension } from "@/lib/format"

interface EmbeddingInspectorProps {
  word: string | null
}

export function EmbeddingInspector({ word }: EmbeddingInspectorProps) {
  const { t } = useI18n()

  const vector = React.useMemo(() => {
    if (!word) return null
    return getEmbedding(word)
  }, [word])

  const cluster = React.useMemo(() => {
    if (!word) return null
    return findCluster(word)
  }, [word])

  const dimLabels = t.inspector.dimLabels

  // Find max absolute value for scaling
  const maxVal = React.useMemo(() => {
    if (!vector) return 1
    return Math.max(...vector.map(Math.abs))
  }, [vector])

  if (!word || !vector) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{t.inspector.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t.inspector.subtitle}</p>
          <p className="mt-8 py-8 text-center text-sm text-muted-foreground">
            {t.inspector.noWord}
          </p>
        </CardContent>
      </Card>
    )
  }

  const clusterColor = CLUSTER_COLORS[cluster as Cluster]

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t.inspector.title}</h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.inspector.subtitle}</p>

        {/* Word header */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-2xl font-bold font-mono">"{word}"</span>
          {cluster !== "unknown" && (
            <span
              className="rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize"
              style={{
                borderColor: clusterColor?.hex,
                color: clusterColor?.hex,
              }}
            >
              {cluster}
            </span>
          )}
        </div>

        {/* Vector bar chart */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {t.inspector.dimensions}
            </span>
          </div>
          {vector.map((val, i) => {
            const percent = (Math.abs(val) / maxVal) * 100
            const isPositive = val >= 0
            return (
              <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    D{i}: {dimLabels[i] ?? `Dim ${i}`}
                  </span>
                  <span className="font-mono text-xs font-semibold">
                    {formatDimension(val)}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isPositive ? "bg-sky-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${Math.max(2, percent)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Explanation */}
        <div className="mt-6 rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">💡 </span>
          {t.inspector.explanation}
        </div>
      </CardContent>
    </Card>
  )
}
