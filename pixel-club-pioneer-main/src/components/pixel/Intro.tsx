import { useEffect, useRef, useState } from "react";

// Signature intro: pixel "X" assembles → shatters → "PIXEL GAME CLUB" wordmark forms → pixelated wipe.
// Only plays once per browser session (sessionStorage). Skippable on click/tap.
const SESSION_KEY = "pgc_intro_shown_v1";

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const [phase, setPhase] = useState<"x" | "word" | "wipe">("x");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = (ms: number, fn: () => void) => {
      const id = window.setTimeout(fn, prefersReduced ? Math.min(ms, 200) : ms);
      timersRef.current.push(id);
    };
    t(900, () => setPhase("word"));
    t(2100, () => setPhase("wipe"));
    t(2650, () => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      onDone();
    });
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [visible, onDone]);

  const skip = () => {
    timersRef.current.forEach(clearTimeout);
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
    onDone();
  };

  if (!visible) return null;

  // Pixel "X" pattern in a 9x9 grid
  const xGrid: number[][] = Array.from({ length: 9 }, (_, r) =>
    Array.from({ length: 9 }, (_, c) => (r === c || r + c === 8 ? 1 : 0)),
  );

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050b] cursor-pointer select-none ${
        phase === "wipe" ? "pointer-events-none" : ""
      }`}
      style={{
        clipPath:
          phase === "wipe"
            ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        transition: "clip-path 0.5s steps(8, end)",
      }}
      aria-label="Kirish animatsiyasi, o‘tkazib yuborish uchun bosing"
    >
      {/* Pixel X grid */}
      <div
        className={`grid gap-[2px] transition-opacity duration-300 ${
          phase === "x" ? "opacity-100" : "opacity-0 scale-125"
        }`}
        style={{
          gridTemplateColumns: "repeat(9, 1fr)",
          transform: phase === "x" ? "scale(1)" : "scale(1.4)",
          transition: "transform 0.4s steps(6), opacity 0.3s",
        }}
      >
        {xGrid.flat().map((v, i) => (
          <span
            key={i}
            className="w-4 h-4 sm:w-5 sm:h-5"
            style={{
              background: v ? "var(--neon-cyan)" : "transparent",
              boxShadow: v ? "0 0 8px rgba(0,255,242,0.8)" : "none",
              opacity: 0,
              animation: v ? `xAssemble 0.6s steps(4) ${i * 12}ms forwards` : "none",
            }}
          />
        ))}
      </div>

      {/* Wordmark */}
      <div
        className={`absolute font-pixel text-center leading-tight transition-opacity duration-300 ${
          phase === "word" ? "opacity-100" : "opacity-0"
        }`}
        style={{ fontSize: "clamp(14px, 4vw, 34px)" }}
      >
        <span
          className="inline-block text-glow-cyan"
          style={{ animation: phase === "word" ? "wordPop 0.5s steps(4)" : "none" }}
        >
          PIXEL
        </span>{" "}
        <span
          className="inline-block text-glow-magenta"
          style={{ animation: phase === "word" ? "wordPop 0.5s steps(4) 0.15s both" : "none" }}
        >
          GAME
        </span>{" "}
        <span
          className="inline-block text-glow-yellow"
          style={{ animation: phase === "word" ? "wordPop 0.5s steps(4) 0.3s both" : "none" }}
        >
          CLUB
        </span>
        <div
          className="mt-4 font-vt text-base sm:text-lg text-white/60"
          style={{ animation: phase === "word" ? "reveal-up 0.5s ease 0.55s both" : "none" }}
        >
          ▶ TANGA SOLING
        </div>
      </div>

      <div className="absolute bottom-6 font-vt text-white/40 text-sm animate-blink">
        o‘tkazib yuborish uchun bosing
      </div>

      <style>{`
        @keyframes xAssemble {
          0% { opacity: 0; transform: scale(0); }
          60% { opacity: 1; transform: scale(1.3); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes wordPop {
          0% { opacity: 0; transform: translateY(8px) scale(0.6); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
