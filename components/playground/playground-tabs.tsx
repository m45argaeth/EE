"use client"

import { useI18n } from "@/lib/i18n"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlaygroundTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function PlaygroundTabs({ activeTab, onTabChange }: PlaygroundTabsProps) {
  const { t } = useI18n()

  const tabs = [
    { value: "meaningMap", label: t.tabs.meaningMap },
    { value: "similarity", label: t.tabs.similarity },
    { value: "compare", label: t.tabs.compare },
    { value: "aiPerspective", label: t.tabs.aiPerspective },
    { value: "inspector", label: t.tabs.inspector },
    { value: "clusters", label: t.tabs.clusters },
  ]

  return (
    <div className="-mx-4 flex justify-start overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList className="flex-nowrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
