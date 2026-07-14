import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Intro } from "@/components/pixel/Intro";
import { Nav } from "@/components/pixel/Nav";
import { PixelBackground, PixelCursor, PixelSprite } from "@/components/pixel/Decor";
import { useCountUp, useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/")({
  component: PixelGameClubPage,
});

/**
 * PIXEL GAME CLUB — single-page site.
 *
 * CONFIRMED FACTS (safe to render as real content):
 *  - Address: Matbuotchilar ko‘chasi 17, Zarafshon savdo markazi (Broadway) yaqinida, Toshkent
 *  - Hours: 24/7 ochiq
 *  - Phone: +998 90 917 66 99
 *  - Rating: 4.4 / 5 on Yandex Maps (54 sharh)
 *  - Facilities: 70 high-performance gaming PCs, Gaming Zone, Lounge Zone
 *  - Instagram: instagram.com/pixel_gamezone
 *  - Telegram: t.me/pixelgamezone
 *
 * Anything else in this file (pricing, tournaments, VIP tiers, testimonials, gallery photos)
 * is PLACEHOLDER content flagged inline and via UI badges so the client can replace it.
 */

function PixelGameClubPage() {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <Intro onDone={() => setReady(true)} />
      <PixelBackground />
      <PixelCursor />
      <Nav />

      <main
        className="relative z-10"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Hero />
        <About />
        <Pricing />
        <Gallery />
        <VIP />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

/* ---------- shared bits ---------- */

function Placeholder({ children = "PLACEHOLDER" }: { children?: React.ReactNode }) {
  return (
    <span
      className="inline-block font-pixel text-[8px] uppercase tracking-wider px-1.5 py-0.5 border border-dashed"
      style={{
        color: "var(--neon-yellow)",
        borderColor: "var(--neon-yellow)",
        background: "rgba(247,255,0,0.08)",
      }}
      title="Placeholder — replace with real data"
    >
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-12 sm:mb-16">
      {eyebrow && (
        <div className="font-vt text-lg text-white/50 mb-3">
          <span className="animate-blink text-[var(--neon-cyan)]">▶</span> {eyebrow}
        </div>
      )}
      <h2 className="heading-pixel text-glow-cyan glitch-hover max-w-4xl">
        {title}
      </h2>
    </div>
  );
}


function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 scanlines"
    >
      {/* Floating decorative sprites */}
      <PixelSprite
        variant="star"
        className="absolute top-32 left-[8%] w-6 h-6 animate-float-y animate-twinkle"
      />
      <PixelSprite
        variant="coin"
        className="absolute top-40 right-[10%] w-8 h-8 animate-float-y"
      />
      <PixelSprite
        variant="controller"
        className="absolute bottom-24 left-[15%] w-10 h-10 animate-float-y"
        // eslint-disable-next-line react/no-unknown-property
      />
      <PixelSprite
        variant="star"
        className="absolute bottom-40 right-[20%] w-4 h-4 animate-twinkle"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-8 border border-white/10 rounded-full px-4 py-2 bg-white/5 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: "var(--neon-green)", boxShadow: "0 0 10px var(--neon-green)" }}
              />
              <span className="animate-pulse-dot inline-flex rounded-full h-2.5 w-2.5" />
            </span>
            <span className="font-pixel text-[10px] tracking-widest text-[var(--neon-green)]">
              24/7 OCHIQ
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="font-vt text-base text-white/80">
              ★ 4.4 <span className="text-white/40">(54 sharh)</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1
            className="font-pixel text-glow-cyan leading-[1.15] mb-6"
            style={{ fontSize: "clamp(28px, 7vw, 78px)" }}
          >
            <span className="inline-block animate-neon-flicker">PIXEL</span>{" "}
            <span className="inline-block">GAME</span>{" "}
            <span className="inline-block">CLUB</span>
          </h1>
        </Reveal>


        <Reveal delay={180}>
          <p className="max-w-2xl mx-auto text-white/70 text-base sm:text-lg leading-relaxed mb-10">
            Toshkentdagi 24/7 ishlaydigan premium PC gaming maydoni. <span className="text-white">70 ta yuqori quvvatli kompyuter</span>,
            alohida <span className="text-[var(--neon-cyan)]">Gaming Zone</span> va
            hordiq uchun <span className="text-[var(--neon-magenta)]">Lounge Zone</span> — pro o‘yinchilar,
            jamoalar va oddiy sessiyalar uchun mo‘ljallangan.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-pixel"
              style={{
                background: "var(--neon-cyan)",
                color: "#0a0a0f",
                borderColor: "var(--neon-cyan)",
              }}
            >
              ▶ Joy band qilish
            </a>
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-pixel"
              style={{ background: "transparent", color: "var(--neon-cyan)", borderColor: "var(--neon-cyan)" }}
            >
              Narxlarni ko‘rish
            </a>
          </div>

        </Reveal>

        <Reveal delay={360}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { k: "70", label: "Gaming PC-lar", real: true },
              { k: "24/7", label: "Doim ochiq", real: true },
              { k: "2", label: "Zonalar", real: true },
              { k: "4.4★", label: "54 sharh", real: true },
            ].map((s) => (
              <div key={s.label} className="card-pixel pixel-corners p-4 text-center">
                <div className="font-pixel text-lg text-glow-cyan">{s.k}</div>
                <div className="font-vt text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */

function About() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const pcs = useCountUp(70, shown);

  // Real amenities (confirmed) — do not remove.
  const realCards: { title: string; desc: string; icon: "monitor" | "controller" | "sofa" | "moon" }[] = [
    { title: "70 top PC", desc: "Esport uchun sozlangan eng so‘nggi avlod kompyuterlari.", icon: "monitor" },
    { title: "Gaming Zone", desc: "Raqobatbardosh o‘yinlar uchun maxsus zona.", icon: "controller" },
    { title: "Lounge Zone", desc: "Bemalol o‘ynash uchun qulay joylar.", icon: "sofa" },
    { title: "24/7 kirish", desc: "Klub hech qachon yopilmaydi.", icon: "moon" },
  ];

  // PLACEHOLDER cards — the client should confirm & keep or remove.
  const placeholderCards = [
    { title: "Snack bar", desc: "O‘yin paytida ichimlik va yengil taomlar." },
    { title: "Turnir zonasi", desc: "Turnir tadbirlari uchun maxsus sahna." },
    { title: "VIP xonalar", desc: "Shaxsiy premium xonalar." },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Klub haqida" title="Piksellar premium bilan uchrashadigan joy." />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="space-y-5 text-white/75 leading-relaxed">
              <p>
                <span className="text-white font-semibold">PIXEL GAME CLUB</span> — Toshkent markazidagi,
                Matbuotchilar ko‘chasidagi Zarafshon savdo markazidan bir necha qadam narida joylashgan
                zamonaviy gaming maydoni. Bir klubda ikkita muhit: raqobat uchun Gaming Zone va
                sokinroq, do‘stona o‘yinlar uchun Lounge Zone.
              </p>
              <p>
                Har bir joy — yuqori quvvatli kompyuter. Eshiklarimiz hech qachon yopilmaydi. Jamoangiz bilan keling
                yoki yolg‘iz o‘ynang — CRT nuri doim yoniq.
              </p>
            </div>
          </Reveal>

          <div ref={ref}>
            <Reveal delay={120}>
              <div className="card-pixel pixel-corners p-8 relative">
                <div className="absolute -top-3 -right-3">
                  <PixelSprite variant="coin" className="w-8 h-8 animate-float-y" />
                </div>
                <div className="font-pixel text-5xl md:text-6xl text-glow-cyan">
                  {pcs}
                </div>
                <div className="font-vt text-2xl text-white/70 mt-2">
                  Gaming PC-lar — tasdiqlangan
                </div>
                <div className="mt-6 h-3 bg-white/5 border border-white/10 relative overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: shown ? "100%" : "0%",
                      background:
                        "linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta))",
                      transition: "width 1.4s ease",
                      boxShadow: "0 0 20px rgba(0,255,242,0.6)",
                    }}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 font-vt text-white/50">
                  <Placeholder>A'zolar</Placeholder>
                  <Placeholder>O‘tkazilgan turnirlar</Placeholder>
                  <Placeholder>Faoliyat yili</Placeholder>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {realCards.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="group card-pixel pixel-corners p-8 h-full transition-all duration-300 hover:-translate-y-1">
                <PixelSprite variant={c.icon} className="w-8 h-8 mb-4" color="var(--neon-cyan)" />
                <div className="font-pixel text-xs text-glow-cyan mb-3">{c.title}</div>
                <div className="font-vt text-lg text-white/65 leading-snug">{c.desc}</div>
                <div
                  className="mt-5 h-[2px] w-8 group-hover:w-full transition-all duration-500"
                  style={{ background: "var(--neon-cyan)" }}
                />
              </div>
            </Reveal>
          ))}
        </div>


        {/* Placeholder amenities — clearly marked */}
        <Reveal>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {placeholderCards.map((c) => (
              <div
                key={c.title}
                className="pixel-corners p-5 border border-dashed border-[var(--neon-yellow)]/40 bg-[var(--neon-yellow)]/[0.03]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-pixel text-[10px] text-[var(--neon-yellow)]">
                    {c.title}
                  </div>
                  <Placeholder>Tasdiqlash</Placeholder>
                </div>
                <div className="font-vt text-lg text-white/50">{c.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */

function Pricing() {
  // PLACEHOLDER — replace with real data when the client provides pricing.
  const tiers = [
    {
      name: "Standart PC",
      tag: "Gaming Zone",
      accent: "cyan" as const,
      price: "X.XX",
      unit: "/soat",
      features: [
        "Yuqori quvvatli PC",
        "144Gts gaming monitor",
        "Premium periferiya",
        "Gaming Zonega kirish",
      ],
    },
    {
      name: "VIP / Premium",
      tag: "Lounge Zone",
      accent: "magenta" as const,
      price: "X.XX",
      unit: "/soat",
      features: [
        "Lounge Zone dagi premium joy",
        "Top darajadagi PC va monitor",
        "Ustuvor band qilish",
        "Sokin muhitli joy",
      ],
      featured: true,
    },
    {
      name: "Tungi paket",
      tag: "22:00 → 08:00",
      accent: "cyan" as const,
      price: "X.XX",
      unit: "/tun",
      features: [

        "10 soatlik o‘yin",
        "Zonalar orasida cheksiz o‘tish",
        "Bir soatga eng foydali narx",
        "24/7 kirish kiritilgan",
      ],
    },
  ];

  return (
    <section id="pricing" className="relative py-28 sm:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Xizmatlar & narxlar"
            title="Qiyinlik darajasini tanlang."

          />
          <div className="mb-8">
            <Placeholder>Barcha narxlar shartli — o‘zgartirish kerak</Placeholder>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => {
            const glow =
              t.accent === "magenta" ? "var(--neon-magenta)" : "var(--neon-cyan)";
            return (
              <Reveal key={t.name} delay={i * 100}>
                <div
                  className="group relative card-pixel pixel-corners p-8 h-full transition-transform duration-300 hover:-translate-y-2"
                  style={{
                    boxShadow: t.featured
                      ? `0 0 0 1px ${glow}, 4px 4px 0 rgba(0,0,0,0.6)`
                      : undefined,
                  }}
                >

                  {t.featured && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel text-[9px] px-3 py-1"
                      style={{ background: glow, color: "#0a0a0f" }}
                    >
                      TAVSIYA
                    </div>
                  )}
                  <div className="font-vt text-white/50 text-sm">{t.tag}</div>
                  <div
                    className="font-pixel text-sm mt-2"
                    style={{ color: glow, textShadow: `0 0 6px ${glow}66` }}
                  >
                    {t.name}
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-vt text-white/40 text-xl">$</span>
                    <span
                      className="font-pixel text-3xl"
                      style={{ color: glow, textShadow: `0 0 6px ${glow}66` }}
                    >
                      {t.price}
                    </span>
                    <span className="font-vt text-white/50">{t.unit}</span>
                    <span className="ml-2">
                      <Placeholder>tahrirlash</Placeholder>
                    </span>
                  </div>
                  <div className="my-5 h-px bg-white/10" />
                  <ul className="space-y-2 font-vt text-white/70 text-lg">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span style={{ color: glow }}>▸</span> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn-pixel mt-6 w-full"
                    style={{
                      background: t.featured ? glow : "transparent",
                      color: t.featured ? "#0a0a0f" : glow,
                      border: `2px solid ${glow}`,
                      boxShadow: t.featured ? `4px 4px 0 #0a0a0f` : "none",
                    }}
                    onClick={() =>
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Tanlash
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- TOURNAMENTS ---------- */
/* ---------- GALLERY ---------- */

function Gallery() {
  // Temporary — replace with real PIXEL GAME CLUB interior photos when available.
  // Using Unsplash source images of gaming interiors as visual placeholders.
  const imgs = [
    { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900", h: "tall" },
    { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900", h: "short" },
    { src: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=900", h: "medium" },
    { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900", h: "medium" },
    { src: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900", h: "short" },
    { src: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=900", h: "tall" },
    { src: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=900", h: "medium" },
    { src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=900", h: "medium" },
  ] as const;
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 sm:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Klub ichida" title="Galereya" />
          <div className="mb-8">
            <Placeholder>Vaqtinchalik rasmlar — haqiqiy klub suratlari bilan almashtiring</Placeholder>
          </div>
        </Reveal>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {imgs.map((img, i) => {
            const heightClass =
              img.h === "tall"
                ? "h-72 md:h-80"
                : img.h === "short"
                  ? "h-40 md:h-44"
                  : "h-56 md:h-60";
            return (
              <Reveal key={img.src} delay={i * 60}>
                <button
                  onClick={() => setLightbox(img.src)}
                  className="group relative block mb-4 w-full overflow-hidden pixel-corners break-inside-avoid"
                  style={{ border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  <img
                    src={img.src}
                    alt="Gaming klub interyeri — vaqtinchalik rasm"
                    loading="lazy"
                    className={`w-full ${heightClass} object-cover transition-transform duration-500 group-hover:scale-110`}
                    style={{
                      filter: "saturate(1.1) contrast(1.05)",
                      imageRendering: "auto",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(0,255,242,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,154,0.15) 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                    }}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setLightbox(null)}
          >
            <img
              src={lightbox}
              alt="Kattalashtirilgan rasm"
              className="max-h-[90vh] max-w-[95vw] pixel-corners"
              style={{ border: "2px solid var(--neon-cyan)", boxShadow: "0 0 40px rgba(0,255,242,0.5)" }}
            />
            <button
              className="absolute top-6 right-6 font-pixel text-xs text-[var(--neon-cyan)] border border-[var(--neon-cyan)] px-3 py-2"
              onClick={() => setLightbox(null)}
            >
              YOPISH ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- VIP / MEMBERSHIP ---------- */

function VIP() {
  // PLACEHOLDER — real tiers to be confirmed with the club.
  const rows = [
    ["Gaming Zonega kirish", true, true],
    ["Lounge Zonega kirish", false, true],
    ["Ustuvor band qilish", false, true],
    ["Chegirmali soatlik tarif", false, true],
    ["Turnirga kirish imtiyozlari", false, true],
    ["Shaxsiy VIP xonaga kirish", false, true],
    ["24/7 mavjudlik", true, true],
  ] as const;

  return (
    <section id="vip" className="relative py-28 sm:py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="A‘zolar & VIP"
            title="Imkoniyatlaringizni oshiring."

          />
          <div className="mb-8">
            <Placeholder>Tarif nomlari va imtiyozlari — klub bilan tasdiqlang</Placeholder>
          </div>
        </Reveal>

        <Reveal>
          <div className="card-pixel pixel-corners overflow-hidden">
            <div className="grid grid-cols-3 font-pixel text-[10px] uppercase">
              <div className="p-4 text-white/50">Imtiyozlar</div>
              <div className="p-4 text-center text-glow-cyan border-l border-white/5">
                Oddiy
              </div>
              <div
                className="p-4 text-center text-glow-magenta border-l border-white/5"
                style={{ background: "rgba(255,46,154,0.08)" }}
              >
                VIP
              </div>
            </div>
            {rows.map(([label, r, v], i) => (
              <VIPRow key={label as string} label={label as string} r={!!r} v={!!v} idx={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VIPRow({ label, r, v, idx }: { label: string; r: boolean; v: boolean; idx: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="grid grid-cols-3 border-t border-white/5 items-center"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.5s ease ${idx * 60}ms, transform 0.5s ease ${idx * 60}ms`,
      }}
    >
      <div className="p-4 font-vt text-lg text-white/80">{label}</div>
      <Check on={r} accent="cyan" show={shown} />
      <Check on={v} accent="magenta" show={shown} highlight />

    </div>
  );
}

function Check({
  on,
  accent,
  show,
  highlight,
}: {
  on: boolean;
  accent: "cyan" | "magenta";
  show: boolean;
  highlight?: boolean;
}) {
  const c = accent === "cyan" ? "var(--neon-cyan)" : "var(--neon-magenta)";
  return (
    <div
      className="p-4 text-center border-l border-white/5"
      style={{ background: highlight ? "rgba(255,46,154,0.04)" : "transparent" }}
    >
      {on ? (
        <span
          className="inline-block font-pixel text-lg"
          style={{
            color: c,
            textShadow: `0 0 10px ${c}`,
            opacity: show ? 1 : 0,
            transform: show ? "scale(1)" : "scale(0.4)",
            transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.2,.7,.2,1.4)",
          }}
        >
          ✓
        </span>
      ) : (
        <span className="text-white/20 font-pixel">—</span>
      )}
    </div>
  );
}

/* ---------- REVIEWS ---------- */

function Reviews() {
  // Aggregate rating is REAL (Yandex Maps): 4.4 / 5 based on 54 sharh.
  // Individual testimonial quotes below are SAMPLE placeholder text — not real customer quotes.
  const samples = [
    "Ajoyib muhit — bu faqat namunaviy sharh, dizayn uchun.",
    "Kuchli kompyuterlar va tartibli joy — bu faqat namunaviy sharh.",
    "24/7 ochiqligi juda qulay — bu faqat namunaviy sharh.",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % samples.length), 5000);
    return () => clearInterval(id);
  }, [samples.length]);

  const { ref, shown } = useReveal<HTMLDivElement>();
  const stars = 4.4;

  return (
    <section id="reviews" className="relative py-28 sm:py-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Hamjamiyat" title="O‘yinchilar gapiryapti." />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <Reveal>
            <div ref={ref} className="card-pixel pixel-corners p-8 text-center h-full flex flex-col items-center justify-center">
              <div className="font-vt text-white/50">Yandex Mapsdagi reyting</div>
              <div className="font-pixel text-6xl text-glow-yellow mt-2">4.4</div>
              <div className="flex gap-1 mt-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="text-3xl transition-all duration-500"
                    style={{
                      color:
                        shown && i < Math.round(stars)
                          ? "var(--neon-yellow)"
                          : "rgba(255,255,255,0.15)",
                      textShadow:
                        shown && i < Math.round(stars) ? "0 0 12px var(--neon-yellow)" : "none",
                      transitionDelay: `${i * 120}ms`,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="font-vt text-white/60 mt-4">
                Asosi: <span className="text-white">54 sharh</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="card-pixel pixel-corners p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-pixel text-[10px] text-glow-cyan">
                    O‘YINCHI FIKRLARI
                  </div>
                  <Placeholder>Namunaviy iqtibos</Placeholder>
                </div>
                <div className="font-vt text-2xl text-white/85 leading-snug min-h-[6rem]">
                  “{samples[idx]}”
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-1">
                  {samples.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`${i + 1}-sharhni ko‘rsatish`}
                      className="w-2 h-2"
                      style={{
                        background:
                          i === idx ? "var(--neon-magenta)" : "rgba(255,255,255,0.2)",
                        boxShadow: i === idx ? "0 0 8px var(--neon-magenta)" : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="font-vt text-white/40 text-sm">
                  {idx + 1} / {samples.length}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", time: "", seats: "1" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend wired — client should hook up their booking system.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  // Google Maps embed centered on Matbuotchilar 17, Tashkent (real address).
  const mapSrc =
    "https://www.google.com/maps?q=Matbuotchilar+Street+17,+Tashkent&output=embed";

  return (
    <section id="contact" className="relative py-28 sm:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Bizni toping / band qiling" title="Aloqa va manzil" />
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="card-pixel pixel-corners overflow-hidden h-full">
              <div className="aspect-[4/3] w-full bg-black/40">
                <iframe
                  title="PIXEL GAME CLUB manzili"
                  src={mapSrc}
                  className="w-full h-full"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(1.2)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6 space-y-3 font-vt text-lg">
                <div>
                  <div className="font-pixel text-[10px] text-glow-cyan mb-1">MANZIL</div>
                  <div className="text-white/85">
                    Matbuotchilar ko‘chasi 17, Zarafshon savdo markazi (Broadway) yaqinida, Toshkent
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-pixel text-[10px] text-glow-cyan mb-1">TELEFON</div>
                    <a
                      href="tel:+998909176699"
                      className="text-white/85 hover:text-[var(--neon-cyan)] transition"
                    >
                      +998 90 917 66 99
                    </a>
                  </div>
                  <div>
                    <div className="font-pixel text-[10px] text-glow-cyan mb-1">ISH VAQTI</div>
                    <div className="text-white/85">24/7 ochiq</div>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <a
                    href="https://instagram.com/pixel_gamezone"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pixel neon-border-magenta text-[var(--neon-magenta)] hover:-translate-y-1 hover:scale-105 transition-transform"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://t.me/pixelgamezone"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pixel neon-border-cyan text-[var(--neon-cyan)] hover:-translate-y-1 hover:scale-105 transition-transform"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="card-pixel pixel-corners p-6 sm:p-8 h-full flex flex-col gap-4"
            >
              <div>
                <div className="font-pixel text-xs text-glow-cyan">▶ JOY BAND QILISH</div>
                <div className="font-vt text-white/50 mt-1">
                  Ma'lumotlaringizni to‘ldiring — biz telefon orqali tasdiqlaymiz.
                </div>
              </div>

              {(
                [
                  ["name", "Ismingiz", "text"],
                  ["phone", "Telefon", "tel"],
                  ["time", "Qulay vaqt", "text"],
                ] as const
              ).map(([k, label, type]) => (
                <label key={k} className="block">
                  <div className="font-pixel text-[9px] text-white/50 mb-1 uppercase">
                    {label}
                  </div>
                  <input
                    type={type}
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    required
                    className="w-full bg-black/40 border-2 border-white/10 focus:border-[var(--neon-cyan)] focus:outline-none px-3 py-3 font-vt text-lg text-white transition-colors"
                    style={{ boxShadow: "inset 2px 2px 0 rgba(0,0,0,0.5)" }}
                  />
                </label>
              ))}

              <label className="block">
                <div className="font-pixel text-[9px] text-white/50 mb-1 uppercase">
                  Joylar
                </div>
                <select
                  value={form.seats}
                  onChange={(e) => setForm({ ...form, seats: e.target.value })}
                  className="w-full bg-black/40 border-2 border-white/10 focus:border-[var(--neon-cyan)] focus:outline-none px-3 py-3 font-vt text-lg text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "joy" : "joy"}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                disabled={sent}
                className="btn-pixel text-[#0a0a0f] mt-2 transition-all"
                style={{
                  background: sent ? "var(--neon-green)" : "var(--neon-cyan)",
                  boxShadow: sent
                    ? "0 0 24px var(--neon-green)"
                    : "0 0 0 2px #0a0a0f, 4px 4px 0 var(--neon-magenta)",
                }}
              >
                {sent ? "✓ SO‘ROV YUBORILDI" : "▶ BAND QILISH SO‘ROVI"}
              </button>
              <div className="font-vt text-xs text-white/40">
                <Placeholder>Forma hali serverga ulanmagan</Placeholder>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="relative pt-14 pb-8 border-t border-white/5">
      {/* Pixel-art divider */}
      <div
        aria-hidden
        className="absolute left-0 right-0 -top-[2px] h-1 flex"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 h-full"
            style={{
              background:
                i % 3 === 0
                  ? "var(--neon-cyan)"
                  : i % 3 === 1
                    ? "var(--neon-magenta)"
                    : "var(--neon-yellow)",
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-pixel text-xs text-glow-cyan mb-3">PIXEL.GC</div>
          <p className="font-vt text-lg text-white/60 leading-snug">
            Toshkentning 24/7 premium gaming klubi. 70 ta PC, ikkita zona, bitta muhit.
          </p>
        </div>
        <div>
          <div className="font-pixel text-[10px] text-white/50 mb-3">TEZ HAVOLALAR</div>
          <ul className="space-y-1 font-vt text-lg">
            {[
              ["about", "Biz haqimizda"],
              ["pricing", "Narxlar"],
              ["gallery", "Galereya"],
              ["contact", "Aloqa"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-white/70 hover:text-[var(--neon-cyan)] transition"
                >
                  ▸ {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-pixel text-[10px] text-white/50 mb-3">KUZATING</div>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/pixel_gamezone"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 grid place-items-center pixel-corners neon-border-magenta text-[var(--neon-magenta)] font-pixel text-[9px] hover:-translate-y-1 transition-transform"
            >
              IG
            </a>
            <a
              href="https://t.me/pixelgamezone"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 grid place-items-center pixel-corners neon-border-cyan text-[var(--neon-cyan)] font-pixel text-[9px] hover:-translate-y-1 transition-transform"
            >
              TG
            </a>
            <a
              href="tel:+998909176699"
              className="w-11 h-11 grid place-items-center pixel-corners font-pixel text-[9px] hover:-translate-y-1 transition-transform"
              style={{
                border: "2px solid var(--neon-yellow)",
                color: "var(--neon-yellow)",
                boxShadow: "0 0 12px rgba(247,255,0,0.35)",
              }}
            >
              ☎
            </a>
          </div>
          <div className="font-vt text-sm text-white/40 mt-4">
            +998 90 917 66 99 · 24/7 ochiq
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-vt text-white/40">
        <div>© {new Date().getFullYear()} PIXEL GAME CLUB · Barcha huquqlar himoyalangan.</div>
        <div>Toshkentda ▶ bilan yaratildi</div>
      </div>
    </footer>
  );
}
