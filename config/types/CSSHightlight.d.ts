declare interface HighlightRegistry {
  clear: () => void;
  set: (key: string, highlight: Highlight) => void;
}

declare namespace CSS {
  const highlights: HighlightRegistry;
}

declare const Highlight: {
  prototype: Highlight;
  new (...initialRanges: AbstractRange[]): Highlight;
};
