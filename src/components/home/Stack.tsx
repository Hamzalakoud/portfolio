"use client";

import { useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { gsap, motion, onFrame } from "@/lib/motion";
import { useScene } from "@/lib/useScene";

/** Rows of type drifting in opposite directions. Scroll speed pushes them; stillness lets them idle. */
export default function Stack() {
  const { t } = useLocale();
  const rows = t.stack.rows;
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ motion: animate }, el) => {
    if (!animate) return;
    const lines = Array.from(el.querySelectorAll<HTMLElement>(".stack__row"));
    const state = lines.map((row, i) => ({ row, x: 0, dir: i % 2 === 0 ? -1 : 1, half: 0 }));
    const measure = () => state.forEach((s) => (s.half = s.row.scrollWidth / 2));
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    let visible = false;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: "20%" });
    observer.observe(el);

    const skew = gsap.quickSetter(lines, "skewX", "deg");
    const off = onFrame((_, dt) => {
      if (!visible) return;
      for (const s of state) {
        if (!s.half) continue;
        // Idle drift plus whatever the scroll adds, always in the row's own direction.
        s.x += s.dir * (34 + Math.abs(motion.v) * 1500) * dt;
        if (s.x <= -s.half) s.x += s.half;
        if (s.x > 0) s.x -= s.half;
        s.row.style.translate = `${s.x}px 0`;
      }
      skew(motion.v * -7);
    });

    return () => {
      off();
      observer.disconnect();
      window.removeEventListener("resize", measure);
      lines.forEach((row) => row.style.removeProperty("translate"));
    };
  });

  return (
    <section ref={root} className="stack" id="stack" data-world="stack" data-section={t.sections.stack} aria-labelledby="stack-title">
      <h2 className="stack__title mono" id="stack-title">
        <span>05</span>
        <span>{t.stack.label}</span>
      </h2>
      <p className="sr-only">{rows.flat().join(", ")}.</p>
      <div className="stack__rows" aria-hidden="true">
        {rows.map((row, i) => (
          <div className="stack__clip" key={i}>
            <div className={`stack__row display${i === 1 ? " is-hollow" : ""}`}>
              {[0, 1].map((copy) => (
                <span className="stack__set" key={copy}>
                  {row.map((word) => (
                    <span className="stack__word" key={word}>
                      {word}
                      <i>—</i>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
