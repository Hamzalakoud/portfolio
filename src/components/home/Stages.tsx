"use client";

import type { Project } from "@/data/portfolio";
import { useLocale } from "@/lib/i18n";

/*
 * What each system does, drawn over its picture while the stage is pinned.
 * The pictures are concept artwork rendered at 2400×1500 (design/concepts/);
 * the SVG overlays share that space and crop the same way (slice = cover).
 */

/* ————————————————————————————————————————————————————————————————
   zIARAT — the amphora is found, then the three ideas of the platform.
   ———————————————————————————————————————————————————————————————— */
export function ZiaratOverlay({ project }: { project: Project }) {
  const { t } = useLocale();
  const rows = [
    [project.flow[0], project.features[0]],
    [project.flow[1], project.features[1]],
    [project.flow[2], project.features[3]],
  ];
  return (
    <>
      <svg className="cv cv--ziarat" viewBox="0 0 2400 1500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="zi__scan">
          <rect x="980" y="0" width="440" height="3" />
          <rect className="zi__trail" x="980" y="-90" width="440" height="90" />
        </g>
        <g className="cv__box">
          <rect x="1030" y="470" width="340" height="680" pathLength={1} />
          <path d="M1030 520 V470 H1080 M1320 470 H1370 V520 M1370 1100 V1150 H1320 M1080 1150 H1030 V1100" />
          <text x="1030" y="448">
            {t.stages.recognised.toUpperCase()}
          </text>
        </g>
      </svg>
      <div className="readout mono" aria-hidden="true">
        <p className="readout__row readout__head">
          <span>{t.stages.concept}</span>
          <span>zIArat</span>
        </p>
        {rows.map(([step, what], i) => (
          <p className="readout__row" key={step}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
            <span className="readout__soft">{what}</span>
          </p>
        ))}
      </div>
    </>
  );
}

/* ————————————————————————————————————————————————————————————————
   CAR COMPONENTS — boxes land on the parts; the read-out has bars, not numbers.
   ———————————————————————————————————————————————————————————————— */
const parts = [
  { key: "wheel", box: [600, 928, 240, 240], level: 0.92 },
  { key: "door", box: [1195, 815, 260, 230], level: 0.78 },
  { key: "mirror", box: [1410, 768, 100, 60], level: 0.7 },
  { key: "headlight", box: [1786, 868, 132, 70], level: 0.84 },
  { key: "wheel", box: [1520, 928, 240, 240], level: 0.9 },
] as const;

export function CarsOverlay() {
  const { t } = useLocale();
  const names = t.stages.parts;
  const listed = parts.filter((p, i) => parts.findIndex((q) => q.key === p.key) === i);
  return (
    <>
      <svg className="cv cv--cars" viewBox="0 0 2400 1500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect className="cars__scan" x="440" y="620" width="3" height="560" />
        {parts.map(({ key, box: [x, y, w, h] }, i) => (
          <g className="cv__box" key={i}>
            <rect x={x} y={y} width={w} height={h} pathLength={1} />
            <text x={x} y={y - 16}>
              {names[key].toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      <div className="readout mono" aria-hidden="true">
        <p className="readout__row readout__head">
          <span>{t.stages.scan}</span>
          <span>{t.stages.illustrative}</span>
        </p>
        {listed.map(({ key, level }) => (
          <p className="readout__row readout__bar" key={key}>
            <span>{names[key]}</span>
            <span>
              <b style={{ width: `${level * 100}%` }} />
            </span>
          </p>
        ))}
      </div>
    </>
  );
}

/* ————————————————————————————————————————————————————————————————
   SWIFT — a pulse travels MT → converter → MX; the fields map across.
   Tags are from the public formats; no message is shown.
   ———————————————————————————————————————————————————————————————— */
const mapping = [
  [":20:", "<InstrId>"],
  [":32A:", "<IntrBkSttlmAmt>"],
  [":50K:", "<Dbtr>"],
  [":59:", "<Cdtr>"],
];

export function SwiftOverlay() {
  const { t } = useLocale();
  return (
    <>
      <svg className="cv cv--swift" viewBox="0 0 2400 1500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="swift__pulse" pathLength={1} d="M840 640 C940 600 1010 600 1090 640" />
        <path className="swift__pulse" pathLength={1} d="M1310 640 C1390 680 1430 680 1480 640" />
        <circle className="swift__ring" cx="1200" cy="640" r="128" pathLength={1} />
      </svg>
      <div className="readout mono" aria-hidden="true">
        <p className="readout__row readout__head">
          <span>{t.stages.mapping}</span>
          <span>{t.stages.generic}</span>
        </p>
        {mapping.map(([mt, mx]) => (
          <p className="readout__row readout__map" key={mt}>
            <span>{mt}</span>
            <span>→</span>
            <span>{mx}</span>
          </p>
        ))}
      </div>
    </>
  );
}
