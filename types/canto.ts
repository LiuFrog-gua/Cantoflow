export type Tone = 1 | 2 | 3 | 4 | 5 | 6;

export type Word = {
  id: string;
  char: string;
  jyutping: string;
  tone: Tone;
  mandarin: string;
  category: string;
};

export type TranslationDiff = {
  word: string;
  replacement: string;
};

export type Translation = {
  original: string;
  canto: string;
  jyutping: string;
  diff: TranslationDiff[];
};

export type ColloquialDiff = {
  original_word: string;
  canto_word: string;
  reason: string;
};

export type ColloquialTranslation = {
  canto: string;
  jyutping: string;
  diff: ColloquialDiff[];
};
