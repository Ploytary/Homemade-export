export function sentenceCase(text: string): string {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}
