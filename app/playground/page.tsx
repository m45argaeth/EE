"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useI18n } from "@/lib/i18n"
import { getEmbedding, randomExampleExcept } from "@/lib/embeddings"
import { PlaygroundIntro } from "@/components/playground/playground-intro"
import { WordInput } from "@/components/playground/word-input"
import { MeaningMap } from "@/components/playground/meaning-map"
import { SimilarityExplorer } from "@/components/playground/similarity-explorer"
import { CompareConcepts } from "@/components/playground/compare-concepts"
import { AiPerspective } from "@/components/playground/ai-perspective"
import { EmbeddingInspector } from "@/components/playground/embedding-inspector"
import { ConceptClusters } from "@/components/playground/concept-clusters"
import { EducationalInsights } from "@/components/playground/educational-insights"
import { ShareFeatures } from "@/components/playground/share-features"

export default function PlaygroundPage() {
  const { t } = useI18n()
  const searchParams = useSearchParams()

  const [word, setWord] = React.useState("")
  const [activeWord, setActiveWord] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState("meaningMap")

  // Load from URL params on mount
  React.useEffect(() => {
    const urlWord = searchParams.get("word")
    const urlTab = searchParams.get("tab")
    const hashWord = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : ""

    if (urlWord) {
      const decoded = decodeURIComponent(urlWord)
      setWord(decoded)
      setActiveWord(decoded)
    } else if (hashWord) {
      const decoded = decodeURIComponent(hashWord)
      setWord(decoded)
      setActiveWord(decoded)
    }

    if (urlTab) {
      setActiveTab(urlTab)
    }
  }, [searchParams])

  const handleVisualize = () => {
    const trimmed = word.trim().toLowerCase()
    if (!trimmed) return
    const emb = getEmbedding(trimmed)
    if (emb) {
      setActiveWord(trimmed)
    }
  }

  const handleRandom = () => {
    const newWord = activeWord ? randomExampleExcept(activeWord) : randomExampleExcept("")
    setWord(newWord)
    setActiveWord(newWord)
  }

  const handleClear = () => {
    setWord("")
    setActiveWord(null)
  }

  const hasResult = activeWord !== null

  return (
    <div className="container py-10 sm:py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t.playground.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{t.playground.subtitle}</p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl space-y-8">
        {/* Intro */}
        <PlaygroundIntro />

        {/* Word Input */}
        <WordInput
          value={word}
          onChange={setWord}
          onVisualize={handleVisualize}
          onRandom={handleRandom}
          onClear={handleClear}
          hasResult={hasResult}
        />

        {/* Share */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">
            {t.playground.title}
          </h2>
          <ShareFeatures word={activeWord} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="-mx-4 flex justify-start overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
            <TabsList className="flex-nowrap">
              <TabsTrigger value="meaningMap">{t.tabs.meaningMap}</TabsTrigger>
              <TabsTrigger value="similarity">{t.tabs.similarity}</TabsTrigger>
              <TabsTrigger value="compare">{t.tabs.compare}</TabsTrigger>
              <TabsTrigger value="aiPerspective">{t.tabs.aiPerspective}</TabsTrigger>
              <TabsTrigger value="inspector">{t.tabs.inspector}</TabsTrigger>
              <TabsTrigger value="clusters">{t.tabs.clusters}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="meaningMap" id="meaningMap">
            <MeaningMap activeWord={activeWord} />
          </TabsContent>

          <TabsContent value="similarity" id="similarity">
            <SimilarityExplorer word={activeWord} />
          </TabsContent>

          <TabsContent value="compare" id="compare">
            <CompareConcepts />
          </TabsContent>

          <TabsContent value="aiPerspective" id="aiPerspective">
            <AiPerspective word={activeWord} />
          </TabsContent>

          <TabsContent value="inspector" id="inspector">
            <EmbeddingInspector word={activeWord} />
          </TabsContent>

          <TabsContent value="clusters" id="clusters">
            <ConceptClusters />
          </TabsContent>
        </Tabs>

        {/* Educational Insights */}
        <EducationalInsights />
      </div>
    </div>
  )
}
