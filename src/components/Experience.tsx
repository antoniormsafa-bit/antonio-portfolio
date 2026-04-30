import { useEffect, useRef, useState } from "react";
import { TV_CARDS } from "@/data/experiences";
import { useIsMobile } from "@/hooks/useIsMobile";

type TvState = "off" | "powering" | "on";

interface ExperienceProps {
  onCardClick: (index: number) => void;
}

function TvCard({ card, index, onCardClick }: {
  card: typeof TV_CARDS[0];
  index: number;
  onCardClick: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);
  const [tvState, setTvState] = useState<TvState>("off");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          setTimeout(() => {
            setTvState("powering");
            setTimeout(() => setTvState("on"), 680);
          }, index * 220);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      data-testid={`tv-card-${index}`}
      onClick={() => onCardClick(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        opacity: tvState === "off" ? 0 : 1,
        transform: tvState === "off" ? "translateY(50px)" : "translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease"
      }}
    >
      {/* Outer plastic shell */}
      <div style={{
        background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 60%, #111 100%)",
        borderRadius: 18,
        padding: "14px 14px 12px",
        boxShadow: hovered
          ? "0 40px 100px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)"
          : "0 16px 48px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        transform: hovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease"
      }}>
        {/* Screen bezel */}
        <div style={{
          background: "#0d0d0d",
          borderRadius: 10,
          padding: 8,
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.8)"
        }}>
          {/* Screen */}
          <div style={{
            width: "100%",
            aspectRatio: "4/3",
            background: tvState === "off" ? "#000" : "#06060e",
            borderRadius: 6,
            position: "relative",
            overflow: "hidden"
          }}>


            {/* Gloss highlight */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "42%",
              background: "linear-gradient(155deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)",
              zIndex: 4,
              pointerEvents: "none",
              borderRadius: "6px 6px 0 0"
            }} />

            {/* CRT turn-on flash */}
            {tvState === "powering" && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 6,
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <div style={{
                  width: "100%",
                  background: "#ffffff",
                  animation: "tvFlash 0.68s cubic-bezier(0.4,0,0.2,1) forwards"
                }} />
              </div>
            )}

            {/* Screen content — shown once on */}
            <div style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "clamp(14px,3%,24px)",
              zIndex: 2,
              opacity: tvState === "on" ? 1 : 0,
              animation: tvState === "on" ? "tvContentIn 0.5s ease-out forwards" : "none"
            }}>
              <div style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#ffffff",
                textTransform: "uppercase",
                textAlign: "center"
              }}>
                {card.company}
              </div>

              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2vw, 26px)",
                color: "rgba(255,255,255,0.65)",
                textAlign: "center",
                lineHeight: 1.4
              }}>
                {card.role}
              </div>

              {/* Blinking dot */}
              <div style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#FF6B00",
                marginTop: 6,
                animation: "blink 2s ease-in-out infinite"
              }} />
            </div>
          </div>
        </div>

        {/* Bottom controls bar */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          padding: "0 6px 2px"
        }}>
          {/* Power LED */}
          <div style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: tvState === "on" ? "#22c55e" : (tvState === "powering" ? "#f97316" : "#2a2a2a"),
            boxShadow: tvState === "on" ? "0 0 8px rgba(34,197,94,0.8)" : (tvState === "powering" ? "0 0 8px rgba(249,115,22,0.8)" : "none"),
            transition: "background 0.4s, box-shadow 0.4s"
          }} />
          {/* Channel knobs */}
          <div style={{ display: "flex", gap: 5 }}>
            {[14, 18, 14].map((w, i) => (
              <div key={i} style={{
                width: w,
                height: 5,
                background: "#333",
                borderRadius: 2
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* TV stand */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "16%", height: 16, background: "#222", borderRadius: "0 0 3px 3px" }} />
        <div style={{ width: "38%", height: 7, background: "#1a1a1a", borderRadius: "0 0 4px 4px" }} />
      </div>

      {/* Caption below stand */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <div style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: 8,
          letterSpacing: "0.32em",
          color: "#aaa",
          textTransform: "uppercase",
          marginBottom: 7
        }}>
          {card.label}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(13px,1.1vw,16px)",
          color: "#888",
          lineHeight: 1.3
        }}>
          {card.desc}
        </div>
      </div>
    </div>
  );
}

export function Experience({ onCardClick }: ExperienceProps) {
  const isMobile = useIsMobile();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      style={{
        background: "#ffffff",
        padding: "clamp(80px,12vh,140px) clamp(24px,7vw,100px) clamp(100px,14vh,160px)",
        minHeight: "100vh"
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          textAlign: "center",
          marginBottom: "clamp(64px,10vh,110px)",
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease"
        }}
      >
        <span style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.35em",
          color: "#FF6B00",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 22
        }}>
          EXPERIENCE
        </span>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(34px,4.5vw,62px)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.08,
          color: "#1d1d1f",
          letterSpacing: "-0.01em"
        }}>
          Four chapters, one journey.
        </div>
      </div>

      {/* TV Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
        gap: "clamp(40px,5vw,80px) clamp(30px,4vw,60px)",
        maxWidth: 1080,
        margin: "0 auto"
      }}>
        {TV_CARDS.map((card, i) => (
          <TvCard key={i} card={card} index={i} onCardClick={onCardClick} />
        ))}
      </div>
    </section>
  );
}
