/**
 * Curated examples for the "Random Example" button.
 * Grouped by category for easy browsing.
 */

export const EXAMPLE_WORDS: Record<string, string[]> = {
  animals: ["cat", "dog", "lion", "tiger", "kitten", "bird", "fish", "elephant", "monkey", "feline"],
  food: ["pizza", "burger", "coffee", "tea", "rice", "bread", "pasta", "chocolate"],
  technology: ["computer", "ai", "internet", "software", "robot", "algorithm", "machine learning"],
  nature: ["ocean", "mountain", "forest", "river", "sun", "moon", "star"],
}

export const ALL_EXAMPLES = Object.values(EXAMPLE_WORDS).flat()

/** Pick a random word from the full example set. */
export function randomWord(): string {
  return ALL_EXAMPLES[Math.floor(Math.random() * ALL_EXAMPLES.length)]
}

/** Pick a random word that differs from `current`. */
export function randomWordExcept(current: string): string {
  const lower = current.toLowerCase()
  const pool = ALL_EXAMPLES.filter((w) => w.toLowerCase() !== lower)
  if (pool.length === 0) return randomWord()
  return pool[Math.floor(Math.random() * pool.length)]
}
