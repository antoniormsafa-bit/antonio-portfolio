import { useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const CARDS = [
  {
    tag: "PROJECT · ADVOCACY",
    frame: "01",
    title: "Ambassador Program",
    subtitle: "Brand Advocacy",
    desc: "Design and activation of internal and external communities that become a natural amplifier for the brand.",
    image: "ambassadors.jpg"
  },
  {
    tag: "PROJECT · AUTOMATION",
    frame: "02",
    title: "Automation & AI",
    subtitle: "Workflows · Tools",
    desc: "AI-powered workflows and no-code tools to scale content production, reporting, and creative operations.",
    image: "automatizaciones.jpg"
  },
  {
    tag: "PROJECT · SOCIAL",
    frame: "03",
    title: "Social Media",
    subtitle: "Strategy · Editorial",
    desc: "Editorial strategy and organic growth on IG, TikTok and LinkedIn focused on storytelling and native formats.",
    image: "social_media.jpg"
  },
  {
    tag: "PROJECT · INFLUENCERS",
    frame: "04",
    title: "Influencer Management",
    subtitle: "Talent · Partnerships",
    desc: "Casting, negotiation and campaign tracking with creators — from brief to delivery, measuring real impact.",
    image: "influencer_marketing.jpg"
  },
  {
    tag: "PROJECT · DIGITAL CONTENT",
    frame: "05",
    title: "Content Creation",
    subtitle: "Digital Assets",
    desc: "Digital content pieces: short video, motion graphics, carousels, landing pages and ad formats.",
    image: "content_creation.jpg"
  },
  {
    tag: "PROJECT · INTERNAL COMMS",
    frame: "06",
    title: "Internal Communication",
    subtitle: "Culture · People",
    desc: "Internal storytelling that aligns teams: campaigns, events and editorial formats for employees.",
    image: "internal_communication.jpg"
  },
  {
    tag: "PROJECT · EVENTS",
    frame: "07",
    title: "Event Management",
    subtitle: "Events · Production",
    desc: "Production of activations and corporate events for over 1,200 employees alongside an external agency.",
    image: "eventos.jpg"
  }
];

const TOTAL = CARDS.length;
const PERF_COUNT = 20;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// 3D transform config per offset from active card
const OFFSETS: Record<number, { tx: number; ry: number; scale: number; opacity: number; z: number }> = {
  [-2]: { tx: -545, ry: 50,  scale: 0.63, opacity: 0.36, z: 3 },
  [-1]: { tx: -320, ry: 32,  scale: 0.82, opacity: 0.72, z: 4 },
   [0]: { tx:    0, ry:  0,  scale: 1.00, opacity: 1.00, z: 5 },
   [1]: { tx:  320, ry: -32, scale: 0.82, opacity: 0.72, z: 4 },
   [2]: { tx:  545, ry: -50, scale: 0.63, opacity: 0.36, z: 3 },
};

const CARD_W = 380;
const CARD_H = 520;

function FilmBar({ position }: { position: "top" | "bottom" }) {
  const perfs = Array.from({ length: PERF_COUNT });
  return (
    <div style={{
      background: "rgba(15,15,15,0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderTop: position === "bottom" ? "1px solid rgba(255,255,255,0.1)" : "none",
      borderBottom: position === "top" ? "1px solid rgba(255,255,255,0.1)" : "none",
      width: "100%"
    }}>
      {position === "top" && (
        <div style={{ display: "flex", justifyContent: "space-around", padding: "4px 16px 2px" }}>
          {perfs.map((_, i) => (
            <span key={i} style={{
              fontFamily: "monospace", fontSize: 7,
              color: "#FF6B00", lineHeight: 1
            }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "5px 16px" }}>
        {perfs.map((_, i) => (
          <div key={i} style={{
            width: 22, height: 14, borderRadius: 7,
            border: "2px solid rgba(255,107,0,0.4)",
            background: "transparent", flexShrink: 0
          }} />
        ))}
      </div>

      {position === "bottom" && (
        <div style={{ display: "flex", justifyContent: "space-around", padding: "2px 16px 4px" }}>
          {perfs.map((_, i) => (
            <span key={i} style={{
              fontFamily: "monospace", fontSize: 7,
              color: "#FF6B00", lineHeight: 1
            }}>
              {LETTERS[i % 26]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function FilmStrip() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => Math.max(0, i - 1));
  const next = () => setActive(i => Math.min(TOTAL - 1, i + 1));

  return (
    <section id="skills" style={{ background: "#ffffff", overflow: "hidden" }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ padding: "80px clamp(20px, 8vw, 120px) 60px", textAlign: "center" }}>
        <div style={{
          fontFamily: "'Syncopate', sans-serif",
          fontWeight: 700, fontSize: 10,
          letterSpacing: "0.35em", color: "#FF6B00",
          textTransform: "uppercase", marginBottom: 22
        }}>
          SKILLS &amp; PROJECTS
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontSize: "clamp(34px,4.5vw,62px)",
          fontWeight: 400, lineHeight: 1.08,
          color: "#1d1d1f", letterSpacing: "-0.01em"
        }}>
          What I can do in 7 photograms.
        </div>
      </div>

      {/* ── Film bar top ───────────────────────────────────────────── */}
      <FilmBar position="top" />

      {/* ── Carousel: mobile flat / desktop 3D ───────────────────── */}
      {isMobile ? (
        /* ── MOBILE: single card full width ── */
        <div style={{ padding: "24px 16px 16px", background: "#ffffff" }}>
          {(() => {
            const card = CARDS[active];
            return (
              <div style={{
                width: "100%",
                background: "rgba(15,15,15,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 0 40px rgba(255,107,0,0.15), 0 16px 40px rgba(0,0,0,0.12)"
              }}>
                <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={`${import.meta.env.BASE_URL}images/${card.image}`}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "20px 20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 8 }}>
                    <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.4 }}>{card.tag}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 8, color: "#FF6B00", letterSpacing: "0.1em", flexShrink: 0 }}>{card.frame}/07</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 22, fontWeight: 400, color: "#ffffff", lineHeight: 1.15, marginBottom: 8 }}>{card.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>{card.subtitle}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{card.desc}</div>
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        /* ── DESKTOP: 3D perspective carousel ── */
        <div style={{
          width: "100%",
          height: CARD_H + 120,
          position: "relative",
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {CARDS.map((card, i) => {
            const offset = i - active;
            const cfg = OFFSETS[offset];
            if (!cfg) return null;
            const isCenter = offset === 0;

            return (
              <div
                key={i}
                onClick={() => !isCenter && setActive(i)}
                style={{
                  position: "absolute",
                  width: CARD_W,
                  height: CARD_H,
                  left: "50%",
                  top: "50%",
                  marginLeft: -(CARD_W / 2),
                  marginTop: -(CARD_H / 2),
                  transform: `translateX(${cfg.tx}px) rotateY(${cfg.ry}deg) scale(${cfg.scale})`,
                  opacity: cfg.opacity,
                  zIndex: cfg.z,
                  transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.65s ease, box-shadow 0.5s ease",
                  cursor: isCenter ? "default" : "pointer",
                  background: "rgba(15,15,15,0.85)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: isCenter
                    ? "0 0 40px rgba(255,107,0,0.18), 0 24px 48px rgba(0,0,0,0.10)"
                    : "0 8px 32px rgba(0,0,0,0.08)"
                }}
              >
                <div style={{ width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img
                    src={`${import.meta.env.BASE_URL}images/${card.image}`}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 6 }}>
                    <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.4 }}>{card.tag}</span>
                    <span style={{ fontFamily: "monospace", fontSize: 8, color: "#FF6B00", letterSpacing: "0.1em", flexShrink: 0 }}>{card.frame}/07</span>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, fontWeight: 400, color: "#ffffff", lineHeight: 1.15, marginBottom: 6 }}>{card.title}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#FF6B00", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>{card.subtitle}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{card.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Film bar bottom ────────────────────────────────────────── */}
      <FilmBar position="bottom" />

      {/* ── Navigation ────────────────────────────────────────────── */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 22,
        padding: "44px 0 88px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* Prev */}
          <button
            onClick={prev}
            disabled={active === 0}
            aria-label="Previous"
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: `1.5px solid ${active === 0 ? "rgba(255,107,0,0.2)" : "#FF6B00"}`,
              background: "transparent",
              cursor: active === 0 ? "default" : "pointer",
              opacity: active === 0 ? 0.3 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "opacity 0.2s, border-color 0.2s",
              flexShrink: 0
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Counter */}
          <span style={{
            fontFamily: "monospace", fontSize: 11,
            color: "rgba(0,0,0,0.4)", letterSpacing: "0.25em",
            minWidth: 60, textAlign: "center"
          }}>
            {String(active + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>

          {/* Next */}
          <button
            onClick={next}
            disabled={active === TOTAL - 1}
            aria-label="Next"
            style={{
              width: 48, height: 48, borderRadius: "50%",
              border: `1.5px solid ${active === TOTAL - 1 ? "rgba(255,107,0,0.2)" : "#FF6B00"}`,
              background: "transparent",
              cursor: active === TOTAL - 1 ? "default" : "pointer",
              opacity: active === TOTAL - 1 ? 0.3 : 1,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "opacity 0.2s, border-color 0.2s",
              flexShrink: 0
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="#1d1d1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Indicator dots */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {CARDS.map((_, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 22 : 6, height: 6,
                borderRadius: 3,
                background: i === active ? "#FF6B00" : "rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
                flexShrink: 0
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
