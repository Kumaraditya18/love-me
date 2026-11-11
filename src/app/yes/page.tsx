"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { M } from "@/lib/memes";

export default function YesPage() {
  const [needOpen, setNeedOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = needOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [needOpen]);

  useEffect(() => {
    if (!needOpen) {
      setStep(1);
      return;
    }
    const t = window.setTimeout(() => setStep(2), 4000);
    return () => clearTimeout(t);
  }, [needOpen]);

  const openNeed = () => {
    setStep(1);
    setNeedOpen(true);
  };

  const overlay =
    needOpen && mounted
      ? createPortal(
          <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setNeedOpen(false)}
          >
            <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="overlay-close"
                onClick={() => setNeedOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <img
                src={step === 1 ? M.need1 : M.need2}
                alt=""
                className="cat-overlay"
              />
              {step === 2 && <p className="aao">aao na baby</p>}
              <button
                type="button"
                className="overlay-done"
                onClick={() => setNeedOpen(false)}
              >
                chotu badmosh
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <main className="page scene">
      <h1 className="title">Yaaay! 💕</h1>
      <img src={M.yes} alt="Happy cat" className="cat-big" />
      <p className="sub">i knew it</p>

      <button type="button" className="mirror-btn" onClick={openNeed}>
        click here to see what u need
      </button>

      {overlay}

      <Link href="/love" className="back">
        ask again
      </Link>
    </main>
  );
}
