"use client";

import { useMemo, useState } from "react";
import { ChevronDown, RefreshCw, Volume2 } from "lucide-react";

import { PRACTICE_VOCAB } from "@/constants/practice_vocab";
import { useCantoSpeech } from "@/hooks/use-canto-speech";
import { cn } from "@/lib/utils";

function randomIndex(max: number, current: number): number {
  if (max <= 1) {
    return 0;
  }

  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * max);
  }
  return next;
}

export function VocabPractice() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState(PRACTICE_VOCAB[0]?.id ?? "");
  const { speak, supported } = useCantoSpeech();

  const currentPhrase = useMemo(() => PRACTICE_VOCAB[currentIndex], [currentIndex]);

  const onRandom = () => {
    const next = randomIndex(PRACTICE_VOCAB.length, currentIndex);
    setCurrentIndex(next);
    setExpandedId(PRACTICE_VOCAB[next]?.id ?? "");
  };

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <h1 className="text-2xl font-semibold text-canto-cream">词汇练习</h1>
        <p className="mt-2 text-sm text-canto-cream/80">点击词卡展开例句，结合语境记忆地道表达。</p>
      </header>

      <article className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-canto-cream">随机学习</h2>
          <button
            type="button"
            onClick={onRandom}
            className="inline-flex items-center gap-2 rounded-lg bg-canto-cream px-3 py-2 text-xs font-semibold text-canto-deep transition hover:bg-canto-cream/90"
          >
            <RefreshCw className="h-3.5 w-3.5" /> 随机学习
          </button>
        </div>

        <div className="rounded-xl border border-canto-cream/20 bg-canto-deep/25 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-4xl font-black text-canto-cream md:text-5xl">{currentPhrase.canto}</p>
              <p className="font-jyutping mt-2 text-sm text-canto-cream/80">{currentPhrase.jyutping}</p>
              <p className="mt-2 text-sm text-canto-cream/80">{currentPhrase.mandarin}</p>
              <p className="mt-1 text-xs text-canto-cream/60">{currentPhrase.category}</p>
            </div>
            <button
              type="button"
              onClick={() => speak(currentPhrase.canto, { rate: 0.9 })}
              disabled={!supported}
              className="rounded-lg border border-canto-cream/40 p-2 text-canto-cream transition hover:bg-canto-cream/15 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="播放词汇发音"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 rounded-lg bg-white/10 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm text-canto-cream/95">{currentPhrase.sentence}</p>
                <p className="font-jyutping mt-1 text-xs text-canto-cream/75">{currentPhrase.sentence_jyutping}</p>
              </div>
              <button
                type="button"
                onClick={() => speak(currentPhrase.sentence, { rate: 0.9 })}
                disabled={!supported}
                className="rounded-lg border border-canto-cream/35 p-1.5 text-canto-cream transition hover:bg-canto-cream/15 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="播放随机例句发音"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-xs text-canto-cream/70">例句释义：{currentPhrase.sentence_mandarin}</p>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <h2 className="mb-3 text-sm font-semibold text-canto-cream">词汇卡片（点击展开例句）</h2>

        <div className="max-h-[62vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PRACTICE_VOCAB.map((phrase, index) => {
              const isOpen = expandedId === phrase.id;

              return (
                <article
                  key={`${phrase.id}-${index}`}
                  data-phrase-id={phrase.id}
                  className={cn(
                    "rounded-xl border bg-canto-deep/20 transition",
                    isOpen ? "border-canto-cream/45" : "border-canto-cream/20",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedId((prev) => (prev === phrase.id ? "" : phrase.id))}
                    className="flex w-full items-start justify-between gap-2 p-3 text-left"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-3xl font-black text-canto-cream">{phrase.canto}</p>
                      <p className="font-jyutping mt-1 text-[11px] text-canto-cream/70">{phrase.jyutping}</p>
                      <p className="mt-2 text-xs text-canto-cream/70">{phrase.mandarin}</p>
                    </div>
                    <ChevronDown className={cn("mt-1 h-4 w-4 shrink-0 text-canto-cream/75 transition", isOpen && "rotate-180")} />
                  </button>

                  {isOpen && (
                    <div className="space-y-2 border-t border-canto-cream/20 px-3 py-3">
                      <div className="rounded-lg bg-white/10 p-2">
                        <p className="text-sm font-medium text-canto-cream/95">{phrase.sentence}</p>
                        <p className="font-jyutping mt-1 text-xs text-canto-cream/75">{phrase.sentence_jyutping}</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2">
                        <p className="text-xs text-canto-cream/70">例句释义：{phrase.sentence_mandarin}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speak(phrase.sentence, { rate: 0.9 })}
                        disabled={!supported}
                        className="inline-flex items-center gap-1 rounded-lg border border-canto-cream/35 px-2 py-1 text-xs text-canto-cream transition hover:bg-canto-cream/15 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Volume2 className="h-3.5 w-3.5" /> 朗读例句
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
