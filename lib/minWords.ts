export function wordCountFromText(text: string): number {
  if (!text) return 0;
  // Normalize whitespace and count "word" tokens
  const normalized = text
    .toString()
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return 0;
  return normalized.split(" ").filter(Boolean).length;
}

export function isBelowMinWords(text: string, minWords = 400): boolean {
  return wordCountFromText(text) < minWords;
}

/**
 * Dev-only helper to surface a thin-content SEO warning in UI.
 * Returns a React element (use in a Client Component if you want to render it there).
 */
export function getContentLengthWarningElement(opts: {
  content: string;
  minWords?: number;
  devLabel?: string;
}) {
  const { content, minWords = 400, devLabel = "SEO" } = opts;

  // NOTE: This utility is framework-agnostic. It is safe in Server Components
  // as long as you don't reference window/document.
  const below = isBelowMinWords(content, minWords);

  if (!below) return null;

  // Render only in development environments
  const isDev = process.env.NODE_ENV !== "production";
  if (!isDev) return null;

  // Lazy require to avoid React import issues for non-React consumers
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require("react");
  return React.createElement(
    "div",
    {
      className:
        "mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900",
      role: "note",
    },
    `${devLabel} warning: Content is below ${minWords} words. Consider expanding it for stronger SEO.`
  );
}
