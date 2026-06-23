/**
 * Formatting helpers for percentages and similarity scores.
 */

const FULL = new Intl.NumberFormat("en-US")

/** Format a number with thousands separators: 1234567 -> "1,234,567". */
export function formatFull(value: number): string {
  if (!Number.isFinite(value)) return "0"
  return FULL.format(Math.round(value))
}

/** Format as percentage: 0.856 -> "85.6%". */
export function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "0%"
  return `${(value * 100).toFixed(digits)}%`
}

/** Format as percentage without symbol: 0.856 -> "85.6". */
export function formatPercentNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "0"
  return (value * 100).toFixed(digits)
}

/** Round a number to N decimal places. */
export function roundTo(value: number, digits: number): string {
  if (!Number.isFinite(value)) return "0"
  return value.toFixed(digits)
}

/** Compact, human-friendly form: 1234567 -> "1.23 million". */
export function formatCompact(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "0"
  const units: Array<[number, string]> = [
    [1e12, "trillion"],
    [1e9, "billion"],
    [1e6, "million"],
    [1e3, "thousand"],
  ]
  for (const [threshold, label] of units) {
    if (value >= threshold) {
      const scaled = value / threshold
      const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2
      return `${scaled.toFixed(digits)} ${label}`
    }
  }
  return formatFull(value)
}

/** Format a vector dimension value for display. */
export function formatDimension(value: number): string {
  if (!Number.isFinite(value)) return "0"
  return value.toFixed(3)
}
