"use client";

import { useEffect, useState } from "react";

type TitleSegment = {
  text: string;
  newLine?: boolean;
  small?: boolean;
};

export function TypewriterTitle({
  segments,
  className,
}: {
  segments: TitleSegment[];
  className?: string;
}) {
  const fullText = segments.map((segment) => segment.text).join("");
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(0);
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setLength((current) => {
          if (current >= fullText.length) {
            if (interval) clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, 80);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [fullText]);

  let consumed = 0;

  return (
    <h1 className={className}>
      {segments.map((segment, i) => {
        const start = consumed;
        consumed += segment.text.length;
        const visibleLength = Math.max(
          0,
          Math.min(length - start, segment.text.length)
        );
        const visibleText = segment.text.slice(0, visibleLength);

        return (
          <span key={i}>
            {segment.newLine && <br />}
            <span className={segment.small ? "text-2xl sm:text-3xl" : undefined}>
              {visibleText}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
