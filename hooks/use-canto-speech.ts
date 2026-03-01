"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechOptions = {
  rate?: number;
  pitch?: number;
};

export function useCantoSpeech() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    setSupported(true);

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const hkVoice = voices.find((voice) => voice.lang === "zh-HK");
      const zhVoice = voices.find((voice) => voice.lang.startsWith("zh"));
      voiceRef.current = hkVoice ?? zhVoice ?? null;
    };

    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string, options?: SpeechOptions) => {
      if (!supported || typeof window === "undefined") {
        return false;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-HK";
      utterance.voice = voiceRef.current;
      utterance.rate = options?.rate ?? 0.9;
      utterance.pitch = options?.pitch ?? 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      return true;
    },
    [supported],
  );

  return { speak, supported, speaking };
}
