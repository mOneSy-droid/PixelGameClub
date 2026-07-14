import { useEffect, useState } from "react";

export const NAV_ITEMS = [
  { id: "home", label: "Bosh sahifa" },
  { id: "about", label: "Biz haqimizda" },
  { id: "pricing", label: "Xizmatlar & narxlar" },
  { id: "gallery", label: "Galereya" },
  { id: "vip", label: "A'zolik" },
  { id: "reviews", label: "Sharhlar" },
  { id: "contact", label: "Aloqa" },
];

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0f]/85 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 group"
            aria-label="PIXEL GAME CLUB home"
          >
            <span className="grid grid-cols-3 gap-[2px]" aria-hidden>
              {[1, 0, 1, 0, 1, 0, 1, 0, 1].map((v, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5"
                  style={{
                    background: v
                      ? i % 2
                        ? "var(--neon-magenta)"
                        : "var(--neon-cyan)"
                      : "transparent",
                  }}
                />
              ))}
            </span>
            <span className="font-pixel text-[11px] sm:text-xs text-glow-cyan glitch-hover">
              PIXEL<span className="text-glow-magenta">.</span>GC
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((n) => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className={`relative font-pixel text-[10px] px-3 py-2 uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[var(--neon-cyan)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute -left-1 top-1/2 -translate-y-1/2 text-[var(--neon-magenta)] animate-blink"
                      aria-hidden
                    >
                      ▶
                    </span>
                  )}
                  <span className="relative">
                    {n.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[3px] bg-[var(--neon-cyan)] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      }`}
                      style={{ boxShadow: "0 0 8px var(--neon-cyan)" }}
                    />
                  </span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => go("contact")}
            className="hidden lg:inline-flex btn-pixel"
            style={{
              background: "var(--neon-cyan)",
              color: "#0a0a0f",
              borderColor: "var(--neon-cyan)",
            }}
          >
            Band qilish
          </button>


          <button
            className="lg:hidden font-pixel text-[10px] text-[var(--neon-cyan)] p-2 border border-[var(--neon-cyan)]/50"
            onClick={() => setOpen((s) => !s)}
            aria-label="Menyu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-[#05050b]/98 backdrop-blur-lg transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pixel-grid-bg absolute inset-0 opacity-40" />
        <nav className="relative h-full flex flex-col items-center justify-center gap-4 px-6">
          {NAV_ITEMS.map((n, i) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="font-pixel text-sm text-white hover:text-[var(--neon-cyan)] glitch-hover"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, color 0.2s`,
              }}
            >
              ▶ {n.label}
            </button>
          ))}
          <button
            onClick={() => go("contact")}
            className="btn-pixel mt-6"
            style={{ background: "var(--neon-cyan)", color: "#0a0a0f", borderColor: "var(--neon-cyan)" }}
          >
            Band qilish
          </button>

        </nav>
      </div>
    </>
  );
}
