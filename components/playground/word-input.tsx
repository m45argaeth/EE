"use client"

import * as React from "react"
import { Shuffle, Wand2, Eraser } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { randomWordExcept } from "@/lib/examples"

interface WordInputProps {
  value: string
  onChange: (value: string) => void
  onVisualize: () => void
  onRandom: () => void
  onClear: () => void
  hasResult: boolean
}

export function WordInput({
  value,
  onChange,
  onVisualize,
  onRandom,
  onClear,
  hasResult,
}: WordInputProps) {
  const { t } = useI18n()

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                onVisualize()
              }
            }}
            placeholder={t.wordInput.placeholder}
            className="flex-1 text-base"
          />
          <div className="flex gap-2">
            <Button onClick={onVisualize} className="flex-1 sm:flex-none">
              <Wand2 className="h-4 w-4" />
              {t.wordInput.visualize}
            </Button>
            <Button variant="outline" onClick={onRandom} className="flex-1 sm:flex-none">
              <Shuffle className="h-4 w-4" />
              {t.wordInput.randomExample}
            </Button>
            {hasResult && (
              <Button variant="ghost" onClick={onClear} className="flex-1 sm:flex-none">
                <Eraser className="h-4 w-4" />
                {t.wordInput.clear}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
