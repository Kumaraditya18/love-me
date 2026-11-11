"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { M } from "@/lib/memes";

export default function LovePage() {
  const router = useRouter();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mirrorOpen, setMirrorOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mirrorOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mirrorOpen]);

  const dodge = () => {
    setPos({
      x: Math.random() * 160 - 80,
      y: Math.random() * 60 - 30,
    });
  };

  const mirrorOverlay =
    mirrorOpen && mounted
      ? createPortal(
          <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label="How you look"
            onClick={() => setMirrorOpen(false)}
          >
            <div
              className="overlay-card"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="overlay-close"
                onClick={() => setMirrorOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
              <img src={M.mirror} alt="How you look" className="cat-overlay" />
              <button
                type="button"
                className="overlay-done"
                onClick={() => setMirrorOpen(false)}
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
      <h1 className="title">Do you love me?</h1>
      <img src={M.ask} alt="Yapapa cat" className="cat-big" />

      <div className="before-yes">
        <p className="sub">before saying yes…</p>
        <button
          type="button"
          className="mirror-btn"
          onClick={() => setMirrorOpen(true)}
        >
          click here to see how u look
        </button>
      </div>

      <div className="btns">
        <button type="button" className="yes" onClick={() => router.push("/yes")}>
          Yes 💖
        </button>
        <button
          type="button"
          className="no"
          onMouseEnter={dodge}
          onTouchStart={(e) => {
            e.preventDefault();
            dodge();
          }}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          No
        </button>
      </div>

      {mirrorOverlay}

      <Link href="/" className="back">
        ← back
      </Link>
    </main>
  );
}
