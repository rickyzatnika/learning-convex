"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "emoji-picker": any;
    }
  }
}

export function EmojiCDNPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    // Load emoji-picker-element from CDN once
    const src = "https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/index.js";
    const existing = document.querySelector(`script[data-emoji-picker-cdn="1"]`) as HTMLScriptElement | null;
    if (existing) {
      setReady(true);
      return;
    }
    const s = document.createElement("script");
    s.type = "module";
    s.src = src;
    s.dataset.emojiPickerCdn = "1";
    s.onload = () => setReady(true);
    s.onerror = () => setReady(false);
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    if (!ready || !ref.current) return;
    const onClick = (e: any) => {
      const unicode = e?.detail?.unicode || e?.detail?.emoji?.unicode || e?.detail?.emoji?.native;
      if (unicode) onPick(unicode);
    };
    ref.current.addEventListener("emoji-click", onClick);
    return () => ref.current?.removeEventListener("emoji-click", onClick);
  }, [ready, onPick]);

  if (!ready) return null;
  return (
    <emoji-picker ref={ref} class="rounded-xl border bg-popover shadow-xl" emoji-version="14"></emoji-picker>
  );
}
