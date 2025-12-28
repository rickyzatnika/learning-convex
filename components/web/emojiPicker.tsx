"use client";

import { useEffect, useRef } from "react";

const EMOJIS = [
  "😀","😁","😂","🤣","😊","😍","😘","😎","🤗","🤔",
  "👍","👏","🙏","💪","🔥","✨","🎉","🥳","✅","❗",
  "❤️","💙","💚","💛","💜","🧡","🤍","🤎","🖤","💖",
  "😅","😉","🙃","🙂","😇","😌","😴","🤤","🤒","🤕",
];

export function EmojiPicker({ onPick, onClose }: { onPick: (emoji: string) => void; onClose?: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose?.();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  return (
    <div ref={ref} className="p-3 rounded-xl border bg-popover shadow-xl grid grid-cols-6 gap-2 max-w-[260px]">
      {EMOJIS.map((e) => (
        <button
          key={e}
          type="button"
          className="hover:bg-accent/60 rounded-lg text-2xl leading-none p-2 transition-transform hover:scale-110"
          onClick={() => onPick(e)}
          aria-label={`Emoji ${e}`}
        >
          {e}
        </button>
      ))}
    </div>
  );
}
