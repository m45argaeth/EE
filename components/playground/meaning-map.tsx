"use client"

import * as React from "react"
import { ZoomIn, ZoomOut } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  getMapCoordinates,
  CLUSTER_COLORS,
  type Cluster,
} from "@/lib/embeddings"

interface MeaningMapProps {
  activeWord?: string | null
}

export function MeaningMap({ activeWord }: MeaningMapProps) {
  const { t } = useI18n()
  const [zoom, setZoom] = React.useState(1)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const points = React.useMemo(() => getMapCoordinates(), [])

  const clusterList: Cluster[] = ["animals", "food", "technology", "nature"]

  // Compute cluster centers for background regions
  const clusterCenters = React.useMemo(() => {
    const centers: Record<string, { x: number; y: number; count: number }> = {}
    for (const p of points) {
      if (!centers[p.cluster]) centers[p.cluster] = { x: 0, y: 0, count: 0 }
      centers[p.cluster].x += p.x
      centers[p.cluster].y += p.y
      centers[p.cluster].count++
    }
    for (const key of Object.keys(centers)) {
      centers[key].x /= centers[key].count
      centers[key].y /= centers[key].count
    }
    return centers
  }, [points])

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{t.meaningMap.title}</h2>
            <p className="text-sm text-muted-foreground">{t.meaningMap.subtitle}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border bg-muted/20">
          <svg
            viewBox="0 0 800 500"
            className="w-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform 0.3s ease" }}
          >
            {/* Cluster background ellipses */}
            {clusterList.map((cluster) => {
              const center = clusterCenters[cluster]
              if (!center) return null
              const color = CLUSTER_COLORS[cluster]
              return (
                <ellipse
                  key={cluster}
                  cx={center.x}
                  cy={center.y}
                  rx={120}
                  ry={80}
                  fill={color.hex}
                  fillOpacity={0.06}
                  stroke={color.hex}
                  strokeOpacity={0.15}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              )
            })}

            {/* Points */}
            {points.map((p) => {
              const isActive = activeWord?.toLowerCase() === p.word.toLowerCase()
              const isHovered = hovered === p.word
              const color = CLUSTER_COLORS[p.cluster]
              const r = isActive ? 8 : isHovered ? 7 : 5

              return (
                <g key={p.word}>
                  {/* Glow ring for active word */}
                  {isActive && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={14}
                      fill="none"
                      stroke={color.hex}
                      strokeWidth={2}
                      strokeOpacity={0.4}
                    >
                      <animate
                        attributeName="r"
                        from="10"
                        to="20"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="stroke-opacity"
                        from="0.4"
                        to="0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={r}
                    fill={color.hex}
                    fillOpacity={isActive ? 1 : 0.7}
                    stroke={isActive || isHovered ? color.hex : "transparent"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHovered(p.word)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* Label on hover or active */}
                  {(isHovered || isActive) && (
                    <text
                      x={p.x}
                      y={p.y - r - 6}
                      textAnchor="middle"
                      className="text-[11px] font-medium"
                      fill="currentColor"
                      style={{ pointerEvents: "none" }}
                    >
                      {p.word}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="text-xs font-medium text-muted-foreground">{t.meaningMap.legend}:</span>
          {clusterList.map((cluster) => {
            const color = CLUSTER_COLORS[cluster]
            return (
              <div key={cluster} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {cluster}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          {t.meaningMap.zoom}
        </p>
      </CardContent>
    </Card>
  )
}
