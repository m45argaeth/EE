"use client"

import * as React from "react"
import { Check, Copy, Link2 } from "lucide-react"

import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { copyToClipboard, buildShareUrl } from "@/lib/share"

interface ShareFeaturesProps {
  word: string | null
}

type Status = "idle" | "copied" | "linked"

export function ShareFeatures({ word }: ShareFeaturesProps) {
  const { t } = useI18n()
  const [status, setStatus] = React.useState<Status>("idle")
  const disabled = !word

  React.useEffect(() => {
    if (status === "idle") return
    const tm = setTimeout(() => setStatus("idle"), 1800)
    return () => clearTimeout(tm)
  }, [status])

  const copyResult = async () => {
    if (!word) return
    const payload = `Embedding Explorer\n\nWord: "${word}"\n\nExplore at: ${buildShareUrl(word)}`
    const ok = await copyToClipboard(payload)
    if (ok) setStatus("copied")
  }

  const shareLink = async () => {
    if (!word || typeof window === "undefined") return
    const url = buildShareUrl(word)
    const ok = await copyToClipboard(url)
    if (ok) setStatus("linked")
    else window.location.hash = encodeURIComponent(word)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={copyResult} disabled={disabled}>
        {status === "copied" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {status === "copied" ? t.share.copied : t.share.copyResult}
      </Button>
      <Button variant="outline" size="sm" onClick={shareLink} disabled={disabled}>
        {status === "linked" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
        {status === "linked" ? t.share.linkCopied : t.share.shareLink}
      </Button>
    </div>
  )
}
