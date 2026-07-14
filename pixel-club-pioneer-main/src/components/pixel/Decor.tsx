import { useEffect, useRef, useState, type ReactElement } from "react";

// Floating pixel particles + custom pixel cursor.
export function PixelBackground() {
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setIsMobile(window.innerWidth < 768);
    setIsTouch(!window.matchMedia("(pointer: fine)").matches);
  }, []);

  // No particles on touch devices (no mouse = no parallax gain, save perf)
  const count = reduced || isTouch ? 0 : isMobile ? 8 : 20;
  const colors = ["#00fff2", "#ff2e9a"];


  const particles = Array.from({ length: count }, (_, i) => {
    const size = 3 + Math.floor(Math.random() * 6);
    const color = colors[i % colors.length];
    return (
      <span
        key={i}
        className="absolute animate-drift animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: size,
          height: size,
          background: color,
          opacity: 0.4,
          boxShadow: `0 0 ${size}px ${color}`,

          animationDelay: `${Math.random() * 5}s, ${Math.random() * 3}s`,
          animationDuration: `${8 + Math.random() * 10}s, ${1.6 + Math.random() * 2}s`,
        }}
      />
    );
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden pixel-grid-bg"
    >
      {particles}
    </div>
  );
}

export function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const interactive =
        !!target &&
        !!target.closest("a, button, input, textarea, [role='button'], [data-cursor='hover']");
      setHover(interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] transition-[width,height,background,box-shadow] duration-150"
      style={{
        width: hover ? 26 : 14,
        height: hover ? 26 : 14,
        background: hover ? "rgba(255,46,154,0.15)" : "var(--neon-cyan)",
        border: `2px solid ${hover ? "var(--neon-magenta)" : "var(--neon-cyan)"}`,
        boxShadow: hover
          ? "0 0 20px rgba(255,46,154,0.7)"
          : "0 0 12px rgba(0,255,242,0.7)",
        mixBlendMode: "screen",
      }}
    />
  );
}

// Small SVG pixel-art decorative sprites (1-2px pixel grid style)
export type PixelSpriteVariant =
  | "controller"
  | "coin"
  | "star"
  | "heart"
  | "monitor"
  | "sofa"
  | "moon"
  | "bolt"
  | "trophy"
  | "phone";

export function PixelSprite({
  variant,
  className = "",
  color,
}: {
  variant: PixelSpriteVariant;
  className?: string;
  color?: string;
}) {
  const c = color ?? "var(--neon-cyan)";
  const paths: Record<PixelSpriteVariant, ReactElement> = {
    star: (
      <>
        <rect x="4" y="0" width="2" height="2" />
        <rect x="4" y="8" width="2" height="2" />
        <rect x="0" y="4" width="2" height="2" />
        <rect x="8" y="4" width="2" height="2" />
        <rect x="3" y="3" width="4" height="4" />
      </>
    ),
    coin: (
      <>
        <rect x="3" y="1" width="4" height="1" />
        <rect x="1" y="3" width="1" height="4" />
        <rect x="8" y="3" width="1" height="4" />
        <rect x="3" y="8" width="4" height="1" />
        <rect x="2" y="2" width="6" height="6" />
        <rect x="4" y="3" width="2" height="4" fill="#0a0a0f" />
      </>
    ),
    controller: (
      <>
        <rect x="1" y="3" width="8" height="4" />
        <rect x="0" y="4" width="1" height="2" />
        <rect x="9" y="4" width="1" height="2" />
        <rect x="2" y="4" width="1" height="1" fill="#0a0a0f" />
        <rect x="3" y="4" width="1" height="1" fill="#0a0a0f" />
        <rect x="7" y="5" width="1" height="1" fill="#0a0a0f" />
      </>
    ),
    heart: (
      <>
        <rect x="1" y="2" width="2" height="1" />
        <rect x="7" y="2" width="2" height="1" />
        <rect x="0" y="3" width="4" height="2" />
        <rect x="6" y="3" width="4" height="2" />
        <rect x="1" y="5" width="8" height="1" />
        <rect x="2" y="6" width="6" height="1" />
        <rect x="3" y="7" width="4" height="1" />
        <rect x="4" y="8" width="2" height="1" />
      </>
    ),
    monitor: (
      <>
        <rect x="0" y="1" width="10" height="1" />
        <rect x="0" y="1" width="1" height="6" />
        <rect x="9" y="1" width="1" height="6" />
        <rect x="0" y="6" width="10" height="1" />
        <rect x="2" y="3" width="6" height="2" />
        <rect x="3" y="8" width="4" height="1" />
        <rect x="2" y="9" width="6" height="1" />
      </>
    ),
    sofa: (
      <>
        <rect x="0" y="3" width="2" height="5" />
        <rect x="8" y="3" width="2" height="5" />
        <rect x="1" y="5" width="8" height="3" />
        <rect x="2" y="2" width="6" height="2" />
        <rect x="1" y="8" width="1" height="1" />
        <rect x="8" y="8" width="1" height="1" />
      </>
    ),
    moon: (
      <>
        <rect x="3" y="1" width="4" height="1" />
        <rect x="2" y="2" width="2" height="1" />
        <rect x="1" y="3" width="2" height="4" />
        <rect x="2" y="7" width="2" height="1" />
        <rect x="3" y="8" width="4" height="1" />
      </>
    ),
    bolt: (
      <>
        <rect x="5" y="0" width="3" height="1" />
        <rect x="4" y="1" width="3" height="1" />
        <rect x="3" y="2" width="3" height="1" />
        <rect x="2" y="3" width="4" height="1" />
        <rect x="3" y="4" width="5" height="1" />
        <rect x="4" y="5" width="3" height="1" />
        <rect x="3" y="6" width="3" height="1" />
        <rect x="2" y="7" width="3" height="1" />
        <rect x="1" y="8" width="3" height="1" />
      </>
    ),
    trophy: (
      <>
        <rect x="2" y="1" width="6" height="1" />
        <rect x="2" y="2" width="6" height="3" />
        <rect x="1" y="2" width="1" height="2" />
        <rect x="8" y="2" width="1" height="2" />
        <rect x="4" y="5" width="2" height="2" />
        <rect x="3" y="7" width="4" height="1" />
        <rect x="2" y="8" width="6" height="1" />
      </>
    ),
    phone: (
      <>
        <rect x="2" y="0" width="6" height="10" />
        <rect x="3" y="1" width="4" height="7" fill="#0a0a0f" />
        <rect x="4" y="8" width="2" height="1" fill="#0a0a0f" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 10 10" className={className} fill={c} aria-hidden>
      {paths[variant]}
    </svg>
  );
}

