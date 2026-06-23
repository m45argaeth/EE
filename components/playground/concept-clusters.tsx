"use client"

import * as React from "react"
import { Network } from "lucide-react"
import Link from "next/link"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAllClusters, CLUSTER_COLORS, type Cluster } from "@/lib/embeddings"

export function ConceptClusters() {
  const { t } = useI18n()
  const clusters = React.useMemo(() => getAllClusters(), [])

  const clusterOrder: Cluster[] = ["animals", "food", "technology", "nature"]

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Network className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{t.clusters.title}</h2>
        </div>
        <p className="mb-6 text-sm text-muted-foreground">{t.clusters.subtitle}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {clusterOrder.map((clusterName) => {
            const words = clusters[clusterName]
            if (!words) return null
            const color = CLUSTER_COLORS[clusterName]
            return (
              <div
                key={clusterName}
                className="animate-fade-up rounded-xl border p-5 transition-all hover:shadow-md"
                style={{
                  borderColor: color?.hex + "40",
                  animationDelay: `${clusterOrder.indexOf(clusterName) * 80}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color?.hex }}
                    />
                    <h3 className="text-base font-semibold capitalize">
                      {clusterName}
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {words.length} {t.clusters.members}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {words.map((word) => (
                    <span
                      key={word}
                      className="rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-muted"
                      style={{
                        borderColor: color?.hex + "30",
                        color: color?.hex,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Visual connection lines indicator */}
                <div className="mt-3 flex items-center gap-1">
                  {words.map((_, i) => (
                    <React.Fragment key={i}>
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: color?.hex, opacity: 0.6 }}
                      />
                      {i < words.length - 1 && (
                        <span
                          className="h-px flex-1"
                          style={{ backgroundColor: color?.hex, opacity: 0.2 }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/playground?tab=meaningMap">
              {t.clusters.viewOnMap}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
