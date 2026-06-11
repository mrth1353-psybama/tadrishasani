"use client";

import { useEffect, useState } from "react";

export function TypewriterTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    setLength(0);
    const interval = setInterval(() => {
      setLength((current) => {
        if (current >= text.length) {
          clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [text]);

  return <h1 className={className}>{text.slice(0, length)}</h1>;
}
