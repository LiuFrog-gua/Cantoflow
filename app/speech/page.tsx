"use client";

import { useState } from "react";
import { ArrowRightLeft, LoaderCircle, Volume2 } from "lucide-react";

import { useCantoSpeech } from "@/hooks/use-canto-speech";
import type { ColloquialTranslation } from "@/types/canto";

export default function SpeechPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ColloquialTranslation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { speak, supported, speaking } = useCantoSpeech();

  const onTranslate = async () => {
    const text = input.trim();
    if (!text) {
      setError("请输入普通话内容后再转换。");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const payload = (await response.json()) as ColloquialTranslation | { error?: string };
      if (!response.ok) {
        setResult(null);
        setError((payload as { error?: string }).error ?? "转换失败，请稍后再试。");
        return;
      }

      setResult(payload as ColloquialTranslation);
    } catch {
      setResult(null);
      setError("网络异常，暂时无法调用转换接口。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          <h1 className="text-2xl font-semibold text-canto-cream">地道口语转换器</h1>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-canto-cream/85">输入普通话书面语，生成香港口语表达、粤拼和替换解释。</p>
      </header>

      <article className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <h2 className="text-base font-semibold text-canto-cream">普通话输入</h2>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例如：他在哪？我现在过去找他。"
          className="mt-3 h-40 w-full resize-none rounded-xl border border-canto-cream/25 bg-canto-deep/30 p-3 text-base text-canto-cream outline-none placeholder:text-canto-cream/45 focus:border-canto-cream/60"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onTranslate}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-canto-cream px-4 py-2 text-sm font-semibold text-canto-deep transition hover:bg-canto-cream/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
            {loading ? "转换中..." : "开始转换"}
          </button>
          <p className="text-xs text-canto-cream/70">提示：可输入整句或短段落（500 字内）。</p>
        </div>
      </article>

      <article className="rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-canto-cream">转换结果</h2>
          <button
            type="button"
            onClick={() => result?.canto && speak(result.canto)}
            disabled={!result?.canto || !supported || speaking}
            className="inline-flex items-center gap-1 rounded-lg border border-canto-cream/40 px-2 py-1 text-xs text-canto-cream transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-canto-cream/15"
          >
            <Volume2 className="h-3.5 w-3.5" /> 一键朗读
          </button>
        </div>

        {error && <p className="mt-3 rounded-lg border border-amber-300/35 bg-amber-200/10 p-2 text-sm text-amber-100">{error}</p>}

        <div className="mt-3 space-y-3">
          <div className="rounded-xl border border-canto-cream/20 bg-canto-deep/25 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-canto-cream/60">Cantonese</p>
            <p className="mt-2 min-h-10 text-lg text-canto-cream">{result?.canto || "等待转换"}</p>
          </div>

          <div className="rounded-xl border border-canto-cream/20 bg-canto-deep/25 p-3">
            <p className="text-xs uppercase tracking-[0.12em] text-canto-cream/60">Jyutping</p>
            <p className="font-jyutping mt-2 min-h-10 text-base text-canto-cream/90">{result?.jyutping || "waiting..."}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-canto-cream/20 bg-canto-deep/20 p-3">
          <h3 className="text-sm font-semibold text-canto-cream">地道词汇替换对照表</h3>
          {result?.diff.length ? (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="text-canto-cream/65">
                  <tr>
                    <th className="px-2 py-2 font-medium">原词</th>
                    <th className="px-2 py-2 font-medium">地道表达</th>
                    <th className="px-2 py-2 font-medium">原因</th>
                  </tr>
                </thead>
                <tbody>
                  {result.diff.map((item, idx) => (
                    <tr key={`${item.original_word}-${item.canto_word}-${idx}`} className="border-t border-canto-cream/15">
                      <td className="px-2 py-2 text-canto-cream">{item.original_word}</td>
                      <td className="px-2 py-2 text-canto-cream">{item.canto_word}</td>
                      <td className="px-2 py-2 text-canto-cream/80">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-2 text-sm text-canto-cream/70">转换后将显示词汇替换说明。</p>
          )}
        </div>
      </article>
    </section>
  );
}
