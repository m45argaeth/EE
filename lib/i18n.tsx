"use client"

import * as React from "react"

export type Locale = "id" | "en"
export const LOCALES: Locale[] = ["id", "en"]
export const DEFAULT_LOCALE: Locale = "id"
const STORAGE_KEY = "ee-locale"

/* ------------------------------------------------------------------ */
/*  English dictionary                                                 */
/* ------------------------------------------------------------------ */

const en = {
  header: { playground: "Playground", tryNow: "Try Now" },
  hero: {
    badge: "An educational playground for how AI understands meaning",
    title: "Embedding Explorer",
    subtitle:
      "Discover how AI transforms words into numbers that capture meaning. Explore similarity, clusters, and the geometry of language — all in your browser.",
    tryNow: "Try Now",
    randomExample: "Random Word",
    mono: "Humans read words. AI reads vectors.",
  },
  features: {
    heading: "Words are points in a universe of meaning.",
    subtitle:
      "Every word gets mapped to a vector — a list of numbers that captures its meaning. Similar words end up close together.",
    meaningMap: {
      title: "Meaning Map",
      formula: "word → vector → coordinates",
      body: "See how concepts cluster in a 2D space. Animals group together, food forms its own island, and technology occupies a different corner entirely.",
    },
    similarity: {
      title: "Similarity Explorer",
      formula: "cosine(vec₁, vec₂)",
      body: "Type any word and instantly see which other concepts are most similar. Watch similarity bars animate as the AI's 'opinion' is revealed.",
    },
    comparison: {
      title: "Compare Concepts",
      formula: "similarity(A, B) = cos θ",
      body: "Pick two words and see exactly how similar they are, with a percentage score and an explanation of why the AI thinks they're related.",
    },
  },
  how: {
    heading: "How it works",
    subtitle: "Three steps, entirely client-side.",
    steps: [
      {
        title: "1. Choose a word",
        body: "Type any concept or pick a random example from our curated set of 30+ words across animals, food, technology, and nature.",
      },
      {
        title: "2. We compute embeddings",
        body: "Each word is mapped to an 8-dimensional vector. Similar meanings produce nearby vectors — this is the core idea behind all modern AI.",
      },
      {
        title: "3. Explore the geometry",
        body: "Visualize clusters, compare similarities, inspect raw vectors, and build intuition for how machines understand language.",
      },
    ],
  },
  cta: {
    heading: "Ready to see how AI understands meaning?",
    subtitle:
      "No sign-up, no server calls. Just you, your curiosity, and the beautiful geometry of word embeddings.",
    button: "Open the Playground",
  },
  playground: {
    title: "The Playground",
    subtitle:
      "Type a word and explore its embedding, find similar concepts, or compare two words side by side. Everything runs locally in your browser.",
    intro: {
      title: "Welcome to the Embedding Explorer",
      body: "This playground lets you explore how AI models represent word meaning as vectors — lists of numbers. Try typing a word below, or click 'Random Word' to get started.",
    },
  },
  tabs: {
    meaningMap: "Meaning Map",
    similarity: "Similarity",
    compare: "Compare",
    aiPerspective: "AI Perspective",
    inspector: "Inspector",
    clusters: "Clusters",
  },
  wordInput: {
    placeholder: "Type a word (e.g. cat, ocean, ai)…",
    visualize: "Visualize",
    randomExample: "Random Word",
    clear: "Clear",
    unknownWord: "Word not found. Try one of the suggested examples.",
  },
  meaningMap: {
    title: "Meaning Map",
    subtitle: "Each dot is a concept. Similar meanings cluster together.",
    zoom: "Scroll to zoom • Drag to pan",
    legend: "Clusters",
  },
  similarity: {
    title: "Similarity Explorer",
    subtitle: "Enter a word to see its closest neighbors.",
    mostSimilar: "Most similar to",
    noResults: "Type a word above to see similar concepts.",
    similarityLabel: "similarity",
  },
  compare: {
    title: "Compare Two Concepts",
    subtitle: "See how similar two words are in the AI's representation.",
    wordA: "Word A",
    wordB: "Word B",
    compare: "Compare",
    similarity: "Similarity",
    sameCluster: "Same category",
    differentCluster: "Different categories",
    explanation: {
      high: "These words are very similar in meaning. They likely appear in similar contexts in text.",
      medium: "These words share some semantic overlap. They belong to {cluster} and have related concepts.",
      low: "These words are quite different. They belong to different domains: {clusterA} vs {clusterB}.",
      veryLow: "These words are almost unrelated. They come from completely different conceptual spaces.",
      sameCluster: "Both belong to the '{cluster}' category, so the AI sees them as conceptually related.",
    },
    presets: [
      { label: "Cat vs Kitten", a: "cat", b: "kitten" },
      { label: "Cat vs Lion", a: "cat", b: "lion" },
      { label: "Cat vs Pizza", a: "cat", b: "pizza" },
      { label: "AI vs Robot", a: "ai", b: "robot" },
      { label: "Ocean vs Mountain", a: "ocean", b: "mountain" },
      { label: "Coffee vs Tea", a: "coffee", b: "tea" },
    ],
  },
  aiPerspective: {
    title: "How AI Sees Words",
    subtitle: "Humans read words. AI reads vectors.",
    humansSee: "Humans see",
    aiSees: "AI sees",
    pipeline: "The Embedding Pipeline",
    steps: [
      { title: "Text", body: "You type a word" },
      { title: "Lookup", body: "Find it in the vocabulary" },
      { title: "Embedding", body: "Map to a vector" },
      { title: "Meaning", body: "Now comparable!" },
    ],
    placeholder: "Type a word to see how AI transforms it",
    tokenPlaceholder: "…",
  },
  inspector: {
    title: "Embedding Inspector",
    subtitle: "See the raw numbers that represent a word's meaning.",
    dimensions: "8 Dimensions",
    explanation:
      "Each number in the vector captures a different aspect of meaning. Together, they define a unique 'address' in meaning-space.",
    noWord: "Type a word above to inspect its embedding vector.",
    dimLabels: ["Living", "Animal", "Size", "Tech", "Nature", "Food", "Warmth", "Abstract"],
  },
  clusters: {
    title: "Concept Clusters",
    subtitle: "Words that share meaning get grouped into clusters.",
    members: "members",
    viewOnMap: "View on map",
  },
  insights: {
    heading: "Did you know?",
    items: {
      id: [
        "Embedding adalah teknik yang digunakan oleh hampir semua model AI modern, dari chatbot hingga mesin pencari.",
        "Semakin mirip dua vektor (cosine similarity mendekati 1), semakin mirip maknanya menurut AI.",
        "Teknologi embedding pertama kali dipopulerkan oleh Word2Vec pada tahun 2013 oleh tim Google.",
        "Dalam embedding sungguhan, setiap kata bisa memiliki ratusan hingga ribuan dimensi — bukan hanya 8.",
        "Konsep 'kedekatan' dalam embedding memungkinkan AI melakukan analogi: king - man + woman ≈ queen.",
        "Cluster yang terbentuk dari embedding sering kali mengejutkan — AI bisa menemukan pola yang tidak kita sadari.",
      ],
      en: [
        "Embeddings are used by nearly every modern AI model, from chatbots to search engines.",
        "The more similar two vectors are (cosine similarity near 1), the more similar their meaning according to AI.",
        "The embedding technique was popularized by Word2Vec in 2013 by a team at Google.",
        "In real embeddings, each word can have hundreds or even thousands of dimensions — not just 8.",
        "The concept of 'closeness' in embeddings allows AI to make analogies: king - man + woman ≈ queen.",
        "Clusters formed from embeddings are often surprising — AI can find patterns we don't consciously notice.",
      ],
    },
  },
  share: {
    copyResult: "Copy result",
    copied: "Copied!",
    shareLink: "Share link",
    linkCopied: "Link copied!",
    exportPng: "Export PNG",
  },
  footer: {
    tagline: "Embedding Explorer — discover how AI understands meaning behind words.",
    home: "Home",
    playground: "Playground",
    madeWith: "Made with ❤️ by",
  },
}

/* ------------------------------------------------------------------ */
/*  Indonesian dictionary                                              */
/* ------------------------------------------------------------------ */

const id: typeof en = {
  header: { playground: "Playground", tryNow: "Coba Sekarang" },
  hero: {
    badge: "Playground edukasi tentang cara AI memahami makna",
    title: "Embedding Explorer",
    subtitle:
      "Temukan bagaimana AI mengubah kata menjadi angka yang menangkap makna. Jelajahi kesamaan, kluster, dan geometri bahasa — semuanya di browser-mu.",
    tryNow: "Coba Sekarang",
    randomExample: "Kata Acak",
    mono: "Manusia membaca kata. AI membaca vektor.",
  },
  features: {
    heading: "Kata adalah titik di alam semesta makna.",
    subtitle:
      "Setiap kata dipetakan ke sebuah vektor — deretan angka yang menangkap maknanya. Kata-kata yang mirip berakhir berdekatan.",
    meaningMap: {
      title: "Peta Makna",
      formula: "kata → vektor → koordinat",
      body: "Lihat bagaimana konsep-konsep berkelompok dalam ruang 2D. Hewan-hewan berkumpul, makanan membentuk pulau sendiri, dan teknologi menempati sudut yang berbeda.",
    },
    similarity: {
      title: "Penjelajah Kesamaan",
      formula: "cosine(vec₁, vec₂)",
      body: "Ketik kata apa saja dan langsung lihat konsep mana yang paling mirip. Saksikan batang kesamaan beranimasi saat 'pendapat' AI terungkap.",
    },
    comparison: {
      title: "Bandingkan Konsep",
      formula: "similarity(A, B) = cos θ",
      body: "Pilih dua kata dan lihat persisnya seberapa mirip mereka, dengan skor persentase dan penjelasan mengapa AI menganggap mereka terkait.",
    },
  },
  how: {
    heading: "Cara kerjanya",
    subtitle: "Tiga langkah, sepenuhnya di sisi browser.",
    steps: [
      {
        title: "1. Pilih kata",
        body: "Ketik konsep apa saja atau pilih contoh acak dari kumpulan 30+ kata kami yang mencakup hewan, makanan, teknologi, dan alam.",
      },
      {
        title: "2. Kami hitung embedding",
        body: "Setiap kata dipetakan ke vektor 8 dimensi. Makna yang mirip menghasilkan vektor yang berdekatan — ini ide inti di balik semua AI modern.",
      },
      {
        title: "3. Jelajahi geometrinya",
        body: "Visualisasikan kluster, bandingkan kesamaan, inspeksi vektor mentah, dan bangun intuisi tentang bagaimana mesin memahami bahasa.",
      },
    ],
  },
  cta: {
    heading: "Siap melihat bagaimana AI memahami makna?",
    subtitle:
      "Tanpa daftar, tanpa panggilan server. Hanya kamu, rasa ingin tahumu, dan geometri indah dari word embedding.",
    button: "Buka Playground",
  },
  playground: {
    title: "Playground",
    subtitle:
      "Ketik kata dan jelajahi embedding-nya, temukan konsep serupa, atau bandingkan dua kata berdampingan. Semuanya berjalan lokal di browser-mu.",
    intro: {
      title: "Selamat Datang di Embedding Explorer",
      body: "Playground ini memungkinkanmu menjelajahi bagaimana model AI merepresentasikan makna kata sebagai vektor — deretan angka. Coba ketik kata di bawah, atau klik 'Kata Acak' untuk memulai.",
    },
  },
  tabs: {
    meaningMap: "Peta Makna",
    similarity: "Kesamaan",
    compare: "Bandingkan",
    aiPerspective: "Perspektif AI",
    inspector: "Inspektor",
    clusters: "Kluster",
  },
  wordInput: {
    placeholder: "Ketik kata (misalnya cat, ocean, ai)…",
    visualize: "Visualisasikan",
    randomExample: "Kata Acak",
    clear: "Hapus",
    unknownWord: "Kata tidak ditemukan. Coba salah satu contoh yang disarankan.",
  },
  meaningMap: {
    title: "Peta Makna",
    subtitle: "Setiap titik adalah sebuah konsep. Makna yang mirip berkelompok bersama.",
    zoom: "Scroll untuk zoom • Seret untuk geser",
    legend: "Kluster",
  },
  similarity: {
    title: "Penjelajah Kesamaan",
    subtitle: "Masukkan kata untuk melihat tetangga terdekatnya.",
    mostSimilar: "Paling mirip dengan",
    noResults: "Ketik kata di atas untuk melihat konsep serupa.",
    similarityLabel: "kesamaan",
  },
  compare: {
    title: "Bandingkan Dua Konsep",
    subtitle: "Lihat seberapa mirip dua kata dalam representasi AI.",
    wordA: "Kata A",
    wordB: "Kata B",
    compare: "Bandingkan",
    similarity: "Kesamaan",
    sameCluster: "Kategori sama",
    differentCluster: "Kategori berbeda",
    explanation: {
      high: "Kata-kata ini sangat mirip maknanya. Mereka kemungkinan muncul dalam konteks yang serupa dalam teks.",
      medium: "Kata-kata ini memiliki tumpang tindih semantik. Mereka termasuk dalam {cluster} dan memiliki konsep yang terkait.",
      low: "Kata-kata ini cukup berbeda. Mereka termasuk dalam domain yang berbeda: {clusterA} vs {clusterB}.",
      veryLow: "Kata-kata ini hampir tidak berhubungan. Mereka berasal dari ruang konseptual yang sama sekali berbeda.",
      sameCluster: "Keduanya termasuk dalam kategori '{cluster}', jadi AI menganggapnya terkait secara konseptual.",
    },
    presets: [
      { label: "Cat vs Kitten", a: "cat", b: "kitten" },
      { label: "Cat vs Lion", a: "cat", b: "lion" },
      { label: "Cat vs Pizza", a: "cat", b: "pizza" },
      { label: "AI vs Robot", a: "ai", b: "robot" },
      { label: "Ocean vs Mountain", a: "ocean", b: "mountain" },
      { label: "Coffee vs Tea", a: "coffee", b: "tea" },
    ],
  },
  aiPerspective: {
    title: "Bagaimana AI Melihat Kata",
    subtitle: "Manusia membaca kata. AI membaca vektor.",
    humansSee: "Manusia melihat",
    aiSees: "AI melihat",
    pipeline: "Pipeline Embedding",
    steps: [
      { title: "Teks", body: "Kamu mengetik kata" },
      { title: "Lookup", body: "Cari di kosakata" },
      { title: "Embedding", body: "Petakan ke vektor" },
      { title: "Makna", body: "Sekarang bisa dibandingkan!" },
    ],
    placeholder: "Ketik kata untuk melihat bagaimana AI mengubahnya",
    tokenPlaceholder: "…",
  },
  inspector: {
    title: "Inspektor Embedding",
    subtitle: "Lihat angka mentah yang merepresentasikan makna sebuah kata.",
    dimensions: "8 Dimensi",
    explanation:
      "Setiap angka dalam vektor menangkap aspek makna yang berbeda. Bersama-sama, mereka mendefinisikan 'alamat' unik di ruang-makna.",
    noWord: "Ketik kata di atas untuk menginspeksi vektor embedding-nya.",
    dimLabels: ["Hidup", "Hewan", "Ukuran", "Teknologi", "Alam", "Makanan", "Kehangatan", "Abstrak"],
  },
  clusters: {
    title: "Kluster Konsep",
    subtitle: "Kata-kata yang berbagi makna dikelompokkan ke dalam kluster.",
    members: "anggota",
    viewOnMap: "Lihat di peta",
  },
  insights: {
    heading: "Tahukah kamu?",
    items: {
      id: [
        "Embedding adalah teknik yang digunakan oleh hampir semua model AI modern, dari chatbot hingga mesin pencari.",
        "Semakin mirip dua vektor (cosine similarity mendekati 1), semakin mirip maknanya menurut AI.",
        "Teknologi embedding pertama kali dipopulerkan oleh Word2Vec pada tahun 2013 oleh tim Google.",
        "Dalam embedding sungguhan, setiap kata bisa memiliki ratusan hingga ribuan dimensi — bukan hanya 8.",
        "Konsep 'kedekatan' dalam embedding memungkinkan AI melakukan analogi: king - man + woman ≈ queen.",
        "Cluster yang terbentuk dari embedding sering kali mengejutkan — AI bisa menemukan pola yang tidak kita sadari.",
      ],
      en: [
        "Embeddings are used by nearly every modern AI model, from chatbots to search engines.",
        "The more similar two vectors are (cosine similarity near 1), the more similar their meaning according to AI.",
        "The embedding technique was popularized by Word2Vec in 2013 by a team at Google.",
        "In real embeddings, each word can have hundreds or even thousands of dimensions — not just 8.",
        "The concept of 'closeness' in embeddings allows AI to make analogies: king - man + woman ≈ queen.",
        "Clusters formed from embeddings are often surprising — AI can find patterns we don't consciously notice.",
      ],
    },
  },
  share: {
    copyResult: "Salin hasil",
    copied: "Tersalin!",
    shareLink: "Bagikan tautan",
    linkCopied: "Tautan tersalin!",
    exportPng: "Ekspor PNG",
  },
  footer: {
    tagline: "Embedding Explorer — temukan bagaimana AI memahami makna di balik kata-kata.",
    home: "Beranda",
    playground: "Playground",
    madeWith: "Dibuat dengan ❤️ oleh",
  },
}

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

export type Dict = typeof en

const DICTS: Record<Locale, Dict> = { en, id }

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "id" || stored === "en") setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTS[locale],
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
