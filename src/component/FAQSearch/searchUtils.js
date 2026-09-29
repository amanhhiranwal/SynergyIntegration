const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "shall",
  "can",
  "need",
  "dare",
  "ought",
  "my",
  "your",
  "his",
  "her",
  "its",
  "our",
  "their",
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "me",
  "him",
  "us",
  "them",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "not",
  "no",
  "nor",
  "so",
  "yet",
  "both",
  "either",
  "neither",
  "just",
  "how",
  "why",
  "when",
  "where",
  "after",
  "before",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "of",
  "off",
  "over",
  "under",
  "then",
  "once",
  "than",
  "too",
  "very",
  "also",
  "get",
  "got",
  "make",
  "go",
  "going",
  "come",
  "coming",
]);
const distanceCache = new Map();

export function levenshtein(a, b) {
  const cacheKey = `${a}-${b}`;
  if (distanceCache.has(cacheKey)) {
    return distanceCache.get(cacheKey);
  }
  const m = a.length;
  const n = b.length;

  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  distanceCache.set(cacheKey, dp[m][n]);

  return dp[m][n];
}

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOP_WORDS.has(w));
}

export function highlight(text, terms) {
  if (!terms.length) return text;

  const escaped = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  return text.replace(regex, "<mark>$1</mark>");
}