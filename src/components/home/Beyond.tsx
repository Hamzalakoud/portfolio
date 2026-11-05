"use client";

import { useRef } from "react";
import { useLocale } from "@/lib/i18n";
import { gsap } from "@/lib/motion";
import { useScene } from "@/lib/useScene";
import { Line } from "../ui/Text";

/**
 * Leadership and sport, as four cards over the pitch. On a mouse each card
 * leans toward the pointer; the word inside it fills in.
 */
export default function Beyond() {
  const { t } = useLocale();
  const { beyond } = t;
  const root = useRef<HTMLElement>(null);

  useScene(root, ({ motion, fine }, el) => {
    if (!motion) return;
    const q = gsap.utils.selector(el);
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 66%" } })
      .from(q(".beyond__title .line__inner"), { yPercent: 108, duration: 1.3, ease: "expo.out", stagger: 0.1 }, 0)
      .from(q(".beyond__lede"), { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out" }, 0.3)
      .from(q(".card"), { y: 80, rotateX: -18, autoAlpha: 0, duration: 1.2, ease: "expo.out", stagger: 0.09 }, 0.35);

    if (!fine) return;
    const cleanups = (q(".card") as HTMLElement[]).map((card) => {
      const rx = gsap.quickTo(card, "rotateX", { duration: 0.7, ease: "power3.out" });
      const ry = gsap.quickTo(card, "rotateY", { duration: 0.7, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 12);
        card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      };
    });
    return () => cleanups.forEach((off) => off());
  });

  return (
    <section ref={root} className="beyond" id="beyond" data-world="beyond" data-section={t.sections.beyond} aria-labelledby="beyond-title">
      <header className="beyond__head">
        <h2 className="beyond__title display" id="beyond-title" aria-label={beyond.title.join(" ")}>
          <Line>
            <span aria-hidden="true">{beyond.title[0]}</span>
          </Line>
          <Line className="beyond__serif">
            <span aria-hidden="true">{beyond.title[1]}</span>
          </Line>
        </h2>
        <p className="beyond__lede">{beyond.lede}</p>
      </header>

      <ul className="cards">
        {beyond.cards.map((card, i) => (
          <li className="card" key={card.kicker}>
            <p className="card__kicker mono">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{card.kicker}</span>
            </p>
            <p className="card__word display" aria-hidden="true">
              {card.word}
            </p>
            <h3 className="card__title">{card.title}</h3>
            <p className="card__text">{card.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
