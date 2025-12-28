"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false }) as any;

export function EmojiMartPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Load emoji data from CDN to avoid installing @emoji-mart/data locally
    fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        // silently fail; picker won't render
      });
    return () => { cancelled = true; };
  }, []);

  const handleSelect = useCallback((emoji: any) => {
    const val = emoji?.native || emoji?.shortcodes || "";
    if (val) onPick(val);
  }, [onPick]);

  if (!data) return null;

  return (
    <div className="rounded-xl border bg-popover shadow-xl">
      <Picker data={data} onEmojiSelect={handleSelect} theme="auto" previewPosition="none" skinTonePosition="search" />
    </div>
  );
}
