/**
 * Share / copy helpers for the Embedding Explorer.
 */

/** Encode a word for use in a URL hash. */
export function encodeShareWord(word: string): string {
  return encodeURIComponent(word.toLowerCase().trim())
}

/** Decode a word from a URL hash. */
export function decodeShareWord(hash: string): string | null {
  try {
    const decoded = decodeURIComponent(hash.replace(/^#/, "").trim())
    return decoded || null
  } catch {
    return null
  }
}

/** Copy text to clipboard, returning success boolean. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** Build a share URL for a specific word. */
export function buildShareUrl(word: string): string {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}/playground#${encodeShareWord(word)}`
}

/** Build a comparison share URL. */
export function buildCompareUrl(wordA: string, wordB: string): string {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}/playground?compare=${encodeShareWord(wordA)},${encodeShareWord(wordB)}#${encodeShareWord(wordA)}`
}
