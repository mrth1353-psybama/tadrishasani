"use client";

import { useEffect, useState } from "react";

type CSSVars = React.CSSProperties & Record<string, string | number>;

const SCENE_DURATION = 3000;

const scenes = [
  {
    id: "bar",
    label: "نمودار میله‌ای",
    caption: "مقایسه میانگین گروه‌ها",
  },
  {
    id: "line",
    label: "نمودار روند",
    caption: "تغییرات یک متغیر در طول زمان",
  },
  {
    id: "scatter",
    label: "نمودار پراکنش",
    caption: "رابطه بین دو متغیر و خط رگرسیون",
  },
  {
    id: "sem",
    label: "مدل معادلات ساختاری",
    caption: "CFI = 0.96 · RMSEA = 0.048",
  },
  {
    id: "pie",
    label: "نمودار دایره‌ای",
    caption: "سهم هر گروه از کل نمونه",
  },
] as const;

function BarChart() {
  const bars = [
    { height: 60, fill: "fill-brand-teal" },
    { height: 95, fill: "fill-brand-navy" },
    { height: 40, fill: "fill-brand-amber" },
    { height: 110, fill: "fill-brand-teal" },
    { height: 75, fill: "fill-brand-navy" },
  ];

  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      <line
        x1="10"
        y1="140"
        x2="290"
        y2="140"
        className="stroke-brand-charcoal/15"
        strokeWidth="1"
      />
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={20 + i * 54}
          y={140 - bar.height}
          width="36"
          height={bar.height}
          rx="4"
          className={`${bar.fill} animate-grow-bar`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </svg>
  );
}

function LineChart() {
  const points = [
    [20, 110],
    [80, 85],
    [140, 100],
    [200, 55],
    [260, 35],
  ];

  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      <line
        x1="10"
        y1="140"
        x2="290"
        y2="140"
        className="stroke-brand-charcoal/15"
        strokeWidth="1"
      />
      <path
        d={`M${points.map((p) => p.join(",")).join(" L")}`}
        fill="none"
        className="stroke-brand-navy animate-draw-line"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="100"
      />
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          className="fill-brand-amber animate-pop-in"
          style={{ animationDelay: `${1.8 + i * 0.12}s` }}
        />
      ))}
    </svg>
  );
}

function ScatterChart() {
  const points = [
    [25, 120],
    [45, 100],
    [70, 110],
    [95, 90],
    [120, 95],
    [140, 75],
    [165, 80],
    [190, 60],
    [210, 65],
    [235, 45],
    [260, 50],
    [280, 30],
  ];

  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      <line
        x1="10"
        y1="140"
        x2="290"
        y2="140"
        className="stroke-brand-charcoal/15"
        strokeWidth="1"
      />
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          className="fill-brand-teal animate-pop-in"
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
      <line
        x1="15"
        y1="130"
        x2="285"
        y2="35"
        className="stroke-brand-amber animate-draw-line"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength="100"
        style={{ animationDelay: "1.1s" }}
      />
    </svg>
  );
}

function SemDiagram() {
  const observed = [
    { y: 20, label: "X1" },
    { y: 65, label: "X2" },
    { y: 110, label: "X3" },
  ];

  return (
    <svg viewBox="0 0 300 160" className="h-full w-full">
      <circle
        cx="60"
        cy="70"
        r="30"
        fill="none"
        className="stroke-brand-teal animate-pop-in"
        strokeWidth="2"
      />
      <text
        x="60"
        y="75"
        textAnchor="middle"
        className="fill-brand-charcoal font-mono text-[11px]"
      >
        F1
      </text>

      {observed.map((item, i) => (
        <g key={item.label}>
          <line
            x1="90"
            y1="70"
            x2="190"
            y2={item.y + 14}
            className="stroke-brand-charcoal/30 animate-draw-line"
            strokeWidth="1.5"
            pathLength="100"
            style={{ animationDelay: `${0.5 + i * 0.2}s` }}
          />
          <rect
            x="190"
            y={item.y}
            width="60"
            height="28"
            rx="4"
            fill="none"
            className="stroke-brand-navy animate-pop-in"
            strokeWidth="2"
            style={{ animationDelay: `${0.3 + i * 0.2}s` }}
          />
          <text
            x="220"
            y={item.y + 18}
            textAnchor="middle"
            className="fill-brand-charcoal font-mono text-[11px]"
          >
            {item.label}
          </text>
        </g>
      ))}

      <text
        x="150"
        y="150"
        textAnchor="middle"
        className="fill-brand-teal animate-fade-in-up font-mono text-xs"
        style={{ animationDelay: "1.6s" }}
      >
        CFI = 0.96 · RMSEA = 0.048
      </text>
    </svg>
  );
}

function PieChart() {
  const segments = [
    { value: 45, className: "stroke-brand-teal" },
    { value: 30, className: "stroke-brand-navy" },
    { value: 25, className: "stroke-brand-amber" },
  ];

  let cumulative = 0;

  return (
    <svg viewBox="0 0 160 160" className="h-full w-full">
      <g transform="translate(80,80)">
        <circle
          r="50"
          fill="none"
          className="stroke-brand-charcoal/10"
          strokeWidth="20"
        />
        {segments.map((segment, i) => {
          const rotation = cumulative * 3.6 - 90;
          cumulative += segment.value;
          return (
            <circle
              key={i}
              r="50"
              fill="none"
              strokeWidth="20"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset="100"
              transform={`rotate(${rotation})`}
              className={`${segment.className} animate-draw-pie`}
              style={
                {
                  animationDelay: `${i * 0.3}s`,
                  "--seg-offset": `${100 - segment.value}`,
                } as CSSVars
              }
            />
          );
        })}
        <text
          textAnchor="middle"
          y="6"
          className="fill-brand-charcoal animate-fade-in-up font-mono text-sm font-bold"
          style={{ animationDelay: "1.2s" }}
        >
          n = 240
        </text>
      </g>
    </svg>
  );
}

export function AnimatedChartsShowcase() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % scenes.length);
      setTick((t) => t + 1);
    }, SCENE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const scene = scenes[index];

  return (
    <div className="rounded-3xl border border-brand-charcoal/10 bg-brand-cream p-8 shadow-lg">
      <p className="font-mono text-sm text-brand-gray">{scene.label}</p>
      <p className="mt-1 font-mono text-sm text-brand-teal">{scene.caption}</p>

      <div key={tick} className="mt-4 h-48">
        {scene.id === "bar" && <BarChart />}
        {scene.id === "line" && <LineChart />}
        {scene.id === "scatter" && <ScatterChart />}
        {scene.id === "sem" && <SemDiagram />}
        {scene.id === "pie" && <PieChart />}
      </div>
    </div>
  );
}
