"use client"

import * as React from "react"
import { BarChart3 } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { getSimilarWords, CLUSTER_COLORS, type Cluster } from "@/lib/embeddings"
import { formatPercent } from "@/lib/format"

interface SimilarityExplorerProps {
  word: string | null
}

export function SimilarityExplorer({ word }: SimilarityExplorerProps) {
  const { t } = useI18n()

  const results = React.useMemo(() => {
    if (!word) return []
    return getSimilarWords(word, 8)
  }, [word])

  const getColor = (similarity: number): string => {
    if (similarity >= 0.85) return "bg-emerald-500"
    if (similarity >= 0.65) return "bg-amber-500"
    if (similarity >= 0.45) return "bg-orange-500"
    return "bg-red-500"
  }

  const getTextColor = (similarity: number): string => {
    if (similarity >= 0.85) return "text-emerald-600 dark:text-emerald-400"
    if (similarity >= 0.65) return "text-amber-600 dark:text-amber-400"
    if (similarity >= 0.45) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t.similarity.title}</h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.similarity.subtitle}</p>

        {!word ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t.similarity.noResults}
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium">
              {t.similarity.mostSimilar} <span className="font-mono">"{word}"</span>
            </p>
            {results.map((r, i) => {
              const clusterColor = CLUSTER_COLORS[r.cluster as Cluster]
              const percent = r.similarity * 100
              return (
                <div
                  key={r.word}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: clusterColor?.hex ?? "#6b7280" }}
                      />
                      <span className="text-sm font-medium">{r.word}</span>
                      <span className="text-xs capitalize text-muted-foreground">
                        {r.cluster}
                      </span>
                    </div>
                    <span className={`text-sm font-semibold font-mono ${getTextColor(r.similarity)}`}>
                      {formatPercent(r.similarity)}
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${getColor(r.similarity)}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
