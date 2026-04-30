import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Contact() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const availableRef = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredPhone, setHoveredPhone] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [filled, setFilled]   = useState(false);

  // Fade-in on first intersect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger fill once "I'm available." enters the viewport
  useEffect(() => {
    const el = availableRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so the section fade-in starts first
          setTimeout(() => setFilled(true), 250);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // clipRight: 100% when not filled (fully hidden), 0% when filled (fully revealed)
  const clipRight = filled ? "0%" : "100%";

  return (
    <section
      id="contact"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e8e8e8",
        padding: "clamp(80px,12vh,140px) clamp(24px,7vw,100px) clamp(60px,10vh,100px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 36
      }}
    >
      <div
        ref={sectionRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 36,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s ease, transform 0.8s ease"
        }}
      >
        <span style={{
          fontFamily: "'Syncopate', sans-serif",
          fontSize: 9,
          letterSpacing: "0.42em",
          color: "#999",
          textTransform: "uppercase"
        }}>
          CONTACT
        </span>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(42px,6.5vw,88px)",
          fontWeight: 400,
          lineHeight: 1.0,
          color: "#1d1d1f",
          letterSpacing: "-0.02em"
        }}>
          Let's talk.<br />

          {/* "I'm available." — dual-layer fill animation */}
          <span style={{ position: "relative", display: "inline-block" }}>
            {/* Base layer — grey */}
            <em ref={availableRef} style={{ fontStyle: "italic", color: "#9a9a9a", display: "block" }}>
              I'm available.
            </em>
            {/* Orange fill layer — clipped from right, CSS transition drives it to 100% */}
            <em
              aria-hidden="true"
              style={{
                fontStyle: "italic",
                color: "#FF6B00",
                position: "absolute",
                top: 0,
                left: 0,
                whiteSpace: "nowrap",
                clipPath: `inset(0 ${clipRight} 0 0)`,
                transition: "clip-path 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                display: "block"
              }}
            >
              I'm available.
            </em>
          </span>
        </div>

        {/* Phone + email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a
            href="tel:+34693006452"
            onMouseEnter={() => setHoveredPhone(true)}
            onMouseLeave={() => setHoveredPhone(false)}
            style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "#1d1d1f",
              textDecoration: "none",
              borderBottom: hoveredPhone ? "1px solid #FF6B00" : "1px solid transparent",
              transition: "border-color 0.25s ease",
              width: "fit-content"
            }}
          >
            +34 693 006 452
          </a>
          <a
            href="mailto:antoruizmartos@gmail.com"
            onMouseEnter={() => setHoveredEmail(true)}
            onMouseLeave={() => setHoveredEmail(false)}
            style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "#1d1d1f",
              textDecoration: "none",
              borderBottom: hoveredEmail ? "1px solid #FF6B00" : "1px solid transparent",
              transition: "border-color 0.25s ease",
              width: "fit-content"
            }}
          >
            antoruizmartos@gmail.com
          </a>
        </div>

        <a
          href="https://www.linkedin.com/in/antonio-ruiz-martos/"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="linkedin-link"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            textDecoration: "none",
            color: hovered ? "#ffffff" : "#1d1d1f",
            fontFamily: "'Syncopate', sans-serif",
            fontSize: isMobile ? 8 : 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: isMobile ? "10px 16px" : "16px 28px",
            border: "1.5px solid #1d1d1f",
            background: hovered ? "#1d1d1f" : "transparent",
            transition: "background 0.3s ease, color 0.3s ease",
            whiteSpace: "nowrap"
          }}
        >
          <span>LinkedIn — Antonio Ruiz Martos</span>
          <span style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease"
          }}>→</span>
        </a>
      </div>

      <div style={{
        marginTop: 40,
        fontFamily: "'Syncopate', sans-serif",
        fontSize: 8,
        letterSpacing: "0.22em",
        color: "#bbb",
        textTransform: "uppercase"
      }}>
        © 2026 Antonio Ruiz Martos · All rights reserved
      </div>
    </section>
  );
}
