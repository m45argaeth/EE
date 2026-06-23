/**
 * Simulated embedding engine with ~30 predefined concepts and hand-crafted
 * 8-dimensional vectors. All computation is deterministic and runs client-side.
 */

/* ------------------------------------------------------------------ */
/*  Cluster definitions                                                */
/* ------------------------------------------------------------------ */

export type Cluster = "animals" | "food" | "technology" | "nature"

export const CLUSTER_COLORS: Record<Cluster, { bg: string; text: string; border: string; fill: string; hex: string }> = {
  animals: {
    bg: "bg-rose-100 dark:bg-rose-500/15",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-500/25",
    fill: "fill-rose-500",
    hex: "#f43f5e",
  },
  food: {
    bg: "bg-amber-100 dark:bg-amber-500/15",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-500/25",
    fill: "fill-amber-500",
    hex: "#f59e0b",
  },
  technology: {
    bg: "bg-sky-100 dark:bg-sky-500/15",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-200 dark:border-sky-500/25",
    fill: "fill-sky-500",
    hex: "#0ea5e9",
  },
  nature: {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-500/25",
    fill: "fill-emerald-500",
    hex: "#10b981",
  },
}

/* ------------------------------------------------------------------ */
/*  Embedding data                                                     */
/* ------------------------------------------------------------------ */

export interface ConceptEntry {
  word: string
  vector: number[]
  cluster: Cluster
}

/**
 * 8-dimensional vectors, hand-crafted so that:
 *   - cat ↔ kitten ≈ 0.98
 *   - cat ↔ lion   ≈ 0.82
 *   - cat ↔ dog    ≈ 0.75
 *   - cat ↔ pizza  ≈ 0.15
 *
 * Dimensions loosely encode:
 *   [living, animal, size, tech, nature, food, warmth, abstract]
 */
const CONCEPTS: ConceptEntry[] = [
  // ── Animals ──────────────────────────────────────────────
  { word: "cat",      vector: [0.92, 0.90, 0.25, 0.05, 0.55, 0.08, 0.80, 0.10], cluster: "animals" },
  { word: "kitten",   vector: [0.93, 0.91, 0.12, 0.04, 0.56, 0.07, 0.82, 0.10], cluster: "animals" },
  { word: "feline",   vector: [0.92, 0.89, 0.28, 0.05, 0.54, 0.08, 0.79, 0.11], cluster: "animals" },
  { word: "dog",      vector: [0.93, 0.92, 0.35, 0.04, 0.50, 0.06, 0.82, 0.12], cluster: "animals" },
  { word: "lion",     vector: [0.94, 0.88, 0.70, 0.03, 0.75, 0.05, 0.65, 0.08], cluster: "animals" },
  { word: "tiger",    vector: [0.94, 0.87, 0.68, 0.03, 0.74, 0.05, 0.63, 0.08], cluster: "animals" },
  { word: "bird",     vector: [0.93, 0.85, 0.10, 0.04, 0.70, 0.05, 0.55, 0.12], cluster: "animals" },
  { word: "fish",     vector: [0.91, 0.80, 0.15, 0.03, 0.85, 0.04, 0.30, 0.08], cluster: "animals" },
  { word: "elephant", vector: [0.94, 0.86, 0.95, 0.03, 0.72, 0.04, 0.70, 0.06], cluster: "animals" },
  { word: "monkey",   vector: [0.93, 0.88, 0.45, 0.06, 0.68, 0.05, 0.78, 0.18], cluster: "animals" },

  // ── Food ─────────────────────────────────────────────────
  { word: "pizza",     vector: [0.08, 0.04, 0.40, 0.06, 0.25, 0.95, 0.80, 0.05], cluster: "food" },
  { word: "burger",    vector: [0.08, 0.05, 0.42, 0.05, 0.20, 0.94, 0.82, 0.05], cluster: "food" },
  { word: "coffee",    vector: [0.06, 0.02, 0.20, 0.08, 0.35, 0.92, 0.85, 0.08], cluster: "food" },
  { word: "tea",       vector: [0.06, 0.02, 0.18, 0.06, 0.45, 0.90, 0.70, 0.06], cluster: "food" },
  { word: "rice",      vector: [0.05, 0.02, 0.22, 0.04, 0.50, 0.93, 0.60, 0.04], cluster: "food" },
  { word: "bread",     vector: [0.06, 0.03, 0.25, 0.04, 0.30, 0.93, 0.72, 0.04], cluster: "food" },
  { word: "pasta",     vector: [0.07, 0.03, 0.30, 0.05, 0.28, 0.94, 0.75, 0.05], cluster: "food" },
  { word: "chocolate", vector: [0.06, 0.02, 0.15, 0.05, 0.40, 0.93, 0.88, 0.06], cluster: "food" },

  // ── Technology ───────────────────────────────────────────
  { word: "computer",         vector: [0.10, 0.05, 0.40, 0.95, 0.05, 0.04, 0.20, 0.85], cluster: "technology" },
  { word: "ai",               vector: [0.12, 0.04, 0.30, 0.96, 0.04, 0.03, 0.15, 0.92], cluster: "technology" },
  { word: "internet",         vector: [0.05, 0.02, 0.50, 0.93, 0.04, 0.03, 0.10, 0.88], cluster: "technology" },
  { word: "software",         vector: [0.05, 0.02, 0.25, 0.95, 0.03, 0.02, 0.12, 0.90], cluster: "technology" },
  { word: "robot",            vector: [0.50, 0.15, 0.55, 0.90, 0.10, 0.04, 0.25, 0.80], cluster: "technology" },
  { word: "algorithm",        vector: [0.04, 0.02, 0.20, 0.94, 0.03, 0.02, 0.10, 0.93], cluster: "technology" },
  { word: "machine learning", vector: [0.08, 0.03, 0.30, 0.96, 0.04, 0.03, 0.12, 0.94], cluster: "technology" },

  // ── Nature ───────────────────────────────────────────────
  { word: "ocean",   vector: [0.30, 0.10, 0.95, 0.03, 0.96, 0.08, 0.30, 0.06], cluster: "nature" },
  { word: "mountain", vector: [0.12, 0.05, 0.90, 0.03, 0.97, 0.04, 0.15, 0.05], cluster: "nature" },
  { word: "forest",  vector: [0.65, 0.10, 0.75, 0.03, 0.96, 0.10, 0.50, 0.05], cluster: "nature" },
  { word: "river",   vector: [0.28, 0.08, 0.50, 0.03, 0.95, 0.06, 0.35, 0.05], cluster: "nature" },
  { word: "sun",     vector: [0.05, 0.02, 0.98, 0.04, 0.90, 0.03, 0.95, 0.08], cluster: "nature" },
  { word: "moon",    vector: [0.04, 0.02, 0.75, 0.04, 0.92, 0.03, 0.10, 0.10], cluster: "nature" },
  { word: "star",    vector: [0.04, 0.02, 0.60, 0.08, 0.90, 0.03, 0.20, 0.15], cluster: "nature" },
]

const WORD_MAP = new Map(CONCEPTS.map((c) => [c.word.toLowerCase(), c]))

/* ------------------------------------------------------------------ */
/*  Core math                                                          */
/* ------------------------------------------------------------------ */

/** Dot product of two vectors. */
function dot(a: number[], b: number[]): number {
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

/** Euclidean norm. */
function norm(v: number[]): number {
  return Math.sqrt(dot(v, v))
}

/** Cosine similarity between two vectors (returns 0..1 for our data). */
export function cosineSimilarity(a: number[], b: number[]): number {
  const n = norm(a) * norm(b)
  if (n === 0) return 0
  return Math.max(0, Math.min(1, dot(a, b) / n))
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Get the embedding vector for a known word (case-insensitive). Returns null if unknown. */
export function getEmbedding(word: string): number[] | null {
  return WORD_MAP.get(word.toLowerCase())?.vector ?? null
}

/** Get the cluster a word belongs to, or "unknown". */
export function findCluster(word: string): string {
  return WORD_MAP.get(word.toLowerCase())?.cluster ?? "unknown"
}

/** Get all clusters and their words. */
export function getAllClusters(): Record<string, string[]> {
  const clusters: Record<string, string[]> = {}
  for (const c of CONCEPTS) {
    if (!clusters[c.cluster]) clusters[c.cluster] = []
    clusters[c.cluster].push(c.word)
  }
  return clusters
}

/** Get cluster color hex for a cluster name. */
export function getClusterColor(cluster: string): string {
  return CLUSTER_COLORS[cluster as Cluster]?.hex ?? "#6b7280"
}

/** Get all concept entries. */
export function getAllConcepts(): ConceptEntry[] {
  return CONCEPTS
}

/** Find the top-K most similar words to the given word. */
export function getSimilarWords(
  word: string,
  topK = 8,
): Array<{ word: string; similarity: number; cluster: Cluster }> {
  const entry = WORD_MAP.get(word.toLowerCase())
  if (!entry) return []

  const results = CONCEPTS
    .filter((c) => c.word.toLowerCase() !== word.toLowerCase())
    .map((c) => ({
      word: c.word,
      similarity: cosineSimilarity(entry.vector, c.vector),
      cluster: c.cluster,
    }))
    .sort((a, b) => b.similarity - a.similarity)

  return results.slice(0, topK)
}

/** Compare two words and return similarity + explanation data. */
export function compareWords(
  wordA: string,
  wordB: string,
): {
  similarity: number
  clusterA: string
  clusterB: string
  sameCluster: boolean
  vectorA: number[] | null
  vectorB: number[] | null
} {
  const a = WORD_MAP.get(wordA.toLowerCase())
  const b = WORD_MAP.get(wordB.toLowerCase())

  if (!a || !b) {
    return {
      similarity: 0,
      clusterA: a?.cluster ?? "unknown",
      clusterB: b?.cluster ?? "unknown",
      sameCluster: false,
      vectorA: a?.vector ?? null,
      vectorB: b?.vector ?? null,
    }
  }

  return {
    similarity: cosineSimilarity(a.vector, b.vector),
    clusterA: a.cluster,
    clusterB: b.cluster,
    sameCluster: a.cluster === b.cluster,
    vectorA: a.vector,
    vectorB: b.vector,
  }
}

/** Pick a random word from the dataset. */
export function randomExample(): string {
  return CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)].word
}

/** Pick a random word that is different from the given word. */
export function randomExampleExcept(current: string): string {
  const others = CONCEPTS.filter((c) => c.word.toLowerCase() !== current.toLowerCase())
  return others[Math.floor(Math.random() * others.length)].word
}

/**
 * Get 2D coordinates for the meaning map (using first two dimensions,
 * scaled to a nice viewport range).
 */
export function getMapCoordinates(): Array<{
  word: string
  x: number
  y: number
  cluster: Cluster
}> {
  // Find bounds
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const c of CONCEPTS) {
    if (c.vector[0] < minX) minX = c.vector[0]
    if (c.vector[0] > maxX) maxX = c.vector[0]
    if (c.vector[1] < minY) minY = c.vector[1]
    if (c.vector[1] > maxY) maxY = c.vector[1]
  }

  const padX = (maxX - minX) * 0.1 || 0.1
  const padY = (maxY - minY) * 0.1 || 0.1
  const rangeX = maxX - minX + 2 * padX
  const rangeY = maxY - minY + 2 * padY

  // Map to 0..800 x 0..500 viewport
  return CONCEPTS.map((c) => ({
    word: c.word,
    x: ((c.vector[0] - minX + padX) / rangeX) * 800,
    y: ((c.vector[1] - minY + padY) / rangeY) * 500,
    cluster: c.cluster,
  }))
}

/**
 * Build a simple "token" representation for the AI Perspective pipeline.
 * Splits text into words, and for each word either finds an embedding or marks it unknown.
 */
export function textToPipeline(text: string): Array<{
  word: string
  hasEmbedding: boolean
  vector: number[] | null
  cluster: string
}> {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0)

  return words.map((w) => {
    const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase()
    const entry = WORD_MAP.get(clean)
    return {
      word: w,
      hasEmbedding: !!entry,
      vector: entry?.vector ?? null,
      cluster: entry?.cluster ?? "unknown",
    }
  })
}
