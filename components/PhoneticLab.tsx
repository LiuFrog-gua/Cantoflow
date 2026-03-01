"use client";

import { useMemo, useState } from "react";

import { DEMO_BY_TONE, TONES, VOCAB, type VocabItem } from "@/constants/vocab";
import { useCantoSpeech } from "@/hooks/use-canto-speech";
import { cn } from "@/lib/utils";
import type { Tone } from "@/types/canto";

type ChallengeState = {
  word: VocabItem;
  selectedTone?: Tone;
  correct?: boolean;
};

const TONE_GUIDE: Array<{ tone: Tone; contour: string; label: string }> = [
  { tone: 1, contour: "55", label: "高平" },
  { tone: 2, contour: "25", label: "高上" },
  { tone: 3, contour: "33", label: "中平" },
  { tone: 4, contour: "21", label: "低降" },
  { tone: 5, contour: "23", label: "低上" },
  { tone: 6, contour: "22", label: "低平" },
];

function randomWord(): VocabItem {
  return VOCAB[Math.floor(Math.random() * VOCAB.length)];
}

export function PhoneticLab() {
  const [activeTone, setActiveTone] = useState<Tone | null>(null);
  const [challenge, setChallenge] = useState<ChallengeState | null>(null);
  const { speak, supported } = useCantoSpeech();

  const words = useMemo(() => {
    if (activeTone === null) {
      return VOCAB;
    }
    return VOCAB.filter((word) => word.tone_number === activeTone);
  }, [activeTone]);

  const onSelectToneFilter = (tone: Tone) => {
    setActiveTone(tone);
    speak(DEMO_BY_TONE[tone].char, { rate: 0.9 });
  };

  const onStartChallenge = () => {
    const next = randomWord();
    setChallenge({ word: next });
    speak(next.char, { rate: 0.9 });
  };

  const onGuessTone = (tone: Tone) => {
    if (!challenge) {
      return;
    }

    const correct = tone === challenge.word.tone_number;
    setChallenge({ ...challenge, selectedTone: tone, correct });
  };

  return (
    <section className="space-y-4">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold text-canto-cream">字音实验室</h1>

        <div className="rounded-2xl border border-canto-cream/25 bg-canto-cream/10 p-3 shadow-soft">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-canto-cream">六调发音指南</p>
            <span className="text-xs text-canto-cream/70">粤语声调音高</span>
          </div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {TONE_GUIDE.map((item) => (
              <button
                key={`guide-${item.tone}`}
                type="button"
                onClick={() => speak(DEMO_BY_TONE[item.tone].char, { rate: 0.9 })}
                className="rounded-xl border border-canto-cream/20 bg-canto-deep/25 p-2 text-left transition hover:bg-canto-cream/15"
              >
                <p className="text-xs text-canto-cream/70">{item.tone} 声</p>
                <p className="text-base font-semibold text-canto-cream">{item.label}</p>
                <p className="font-jyutping text-xs text-canto-cream/75">{item.contour}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-canto-cream/25 bg-canto-cream/10 p-3 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-canto-cream/90">挑战模式：听字选声调</p>
            <button
              type="button"
              onClick={onStartChallenge}
              className="rounded-lg bg-canto-cream px-3 py-2 text-sm font-semibold text-canto-deep transition hover:bg-canto-cream/90"
            >
              {challenge ? "换一题" : "挑战模式"}
            </button>
          </div>

          {challenge && (
            <div className="mt-3 space-y-2 border-t border-canto-cream/20 pt-3">
              <p className="text-xs text-canto-cream/70">点击按钮选择你听到的声调</p>
              <div className="grid grid-cols-6 gap-2">
                {TONES.map((tone) => (
                  <button
                    key={`guess-${tone}`}
                    type="button"
                    onClick={() => onGuessTone(tone)}
                    className={cn(
                      "rounded-lg border px-2 py-2 text-sm font-semibold transition",
                      challenge.selectedTone === tone
                        ? "border-canto-cream bg-canto-cream text-canto-deep"
                        : "border-canto-cream/30 bg-canto-cream/10 text-canto-cream hover:bg-canto-cream/20",
                    )}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              {typeof challenge.correct === "boolean" && (
                <p className={cn("text-sm", challenge.correct ? "text-emerald-200" : "text-amber-200")}>
                  {challenge.correct
                    ? `答对：${challenge.word.char} (${challenge.word.jyutping}) 是 ${challenge.word.tone_number} 声。`
                    : `答错：${challenge.word.char} (${challenge.word.jyutping}) 是 ${challenge.word.tone_number} 声。`}
                </p>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="rounded-2xl border border-canto-cream/25 bg-canto-cream/10 p-3">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-canto-cream/90">声调筛选（{VOCAB.length} 字）</p>
          <button
            type="button"
            onClick={() => setActiveTone(null)}
            className={cn(
              "rounded-md px-2 py-1 text-xs transition",
              activeTone === null ? "bg-canto-cream text-canto-deep" : "text-canto-cream/70 hover:text-canto-cream",
            )}
          >
            全部
          </button>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {TONES.map((tone) => (
            <button
              key={`filter-${tone}`}
              type="button"
              onClick={() => onSelectToneFilter(tone)}
              className={cn(
                "rounded-lg border px-2 py-2 text-sm font-semibold transition",
                activeTone === tone
                  ? "border-canto-cream bg-canto-cream text-canto-deep"
                  : "border-canto-cream/30 bg-canto-cream/10 text-canto-cream hover:bg-canto-cream/20",
              )}
            >
              {tone} 声
            </button>
          ))}
        </div>
      </div>

      {!supported && (
        <p className="rounded-xl border border-amber-200/40 bg-amber-100/20 p-3 text-xs text-amber-100">
          当前浏览器不支持 Web Speech API，点击卡片将不会发音。
        </p>
      )}

      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 xl:grid-cols-6">
        {words.map((word, idx) => (
          <button
            key={`${word.char}-${idx}`}
            type="button"
            onClick={() => speak(word.char, { rate: 0.9 })}
            className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-3 text-center transition hover:bg-canto-cream/20"
          >
            <ruby className="text-xl font-semibold text-canto-cream [ruby-position:over]">
              {word.char}
              <rt className="font-jyutping mb-1 text-[11px] font-normal text-canto-cream/80">{word.jyutping}</rt>
            </ruby>
            <p className="mt-1 text-[11px] text-canto-cream/65">{word.tone_number} 声</p>
          </button>
        ))}
      </div>
    </section>
  );
}
