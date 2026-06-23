"use client"

import { Brain } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"

export function PlaygroundIntro() {
  const { t } = useI18n()

  return (
    <Card className="border-border/70 bg-gradient-to-br from-muted/40 to-background">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
            <Brain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t.playground.intro.title}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {t.playground.intro.body}
        </p>
      </CardContent>
    </Card>
  )
}
