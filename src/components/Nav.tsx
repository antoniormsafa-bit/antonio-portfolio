import { useState } from "react";
import { Link } from "wouter";
import { useIsMobile } from "@/hooks/useIsMobile";

interface NavProps {
  activePage?: "home" | "about";
}

export function Nav({ activePage = "home" }: NavProps) {
  const isAbout  = activePage === "about";
  const homeBase = import.meta.env.BASE_URL;
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const shellStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 150,
    background: "rgba(15,15,15,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.25)"
  };

  const linkBase: React.CSSProperties = {
    fontFamily: "'Syncopate', sans-serif",
    fontWeight: 400,
    fontSize: 9,
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    color: isAbout ? "rgba(255,107,0,0.4)" : "#FF6B00"
  };

  const linkActive: React.CSSProperties = { ...linkBase, color: "#FF6B00" };

  /* ── MOBILE: Hamburger ──────────────────────────────────────────── */
  if (isMobile) {
    return (
      <nav style={{
        ...shellStyle,
        top: 16, left: 16, right: 16,
        borderRadius: menuOpen ? 16 : 50,
        transition: "border-radius 0.3s ease"
      }}>
        {/* Top bar: ARM + hamburger */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", height: 46, padding: "0 20px"
        }}>
          <a href={homeBase} style={{
            fontFamily: "'Syncopate', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: "0.22em",
            color: "#FF6B00", textDecoration: "none"
          }}>ARM</a>

          {/* Animated hamburger → X */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}
          >
            <span style={{
              display: "block", width: 20, height: 1.5,
              background: "#FF6B00", borderRadius: 2,
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              transition: "transform 0.25s ease"
            }} />
            <span style={{
              display: "block", width: 20, height: 1.5,
              background: "#FF6B00", borderRadius: 2,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s ease"
            }} />
            <span style={{
              display: "block", width: 20, height: 1.5,
              background: "#FF6B00", borderRadius: 2,
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              transition: "transform 0.25s ease"
            }} />
          </button>
        </div>

        {/* Dropdown links */}
        <div style={{
          maxHeight: menuOpen ? 220 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)"
        }}>
          <div style={{ display: "flex", flexDirection: "column", padding: "4px 20px 20px" }}>
            <a
              href={`${homeBase}#experience`}
              onClick={() => setMenuOpen(false)}
              style={{ ...linkBase, display: "block", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >My Experience</a>
            <a
              href="https://vimeo.com/antonioruiz"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{ ...linkBase, display: "block", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >My Videos</a>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              style={{ ...linkActive, display: "block", padding: "14px 0" }}
            >About Me</Link>
          </div>
        </div>
      </nav>
    );
  }

  /* ── DESKTOP: Pill nav ──────────────────────────────────────────── */
  return (
    <nav style={{
      ...shellStyle,
      top: 16, left: "50%", transform: "translateX(-50%)",
      display: "flex", alignItems: "center",
      gap: "clamp(24px, 4vw, 56px)",
      padding: "0 clamp(20px, 3vw, 36px)",
      height: 46, borderRadius: 50
    }}>
      <a href={homeBase} style={{
        fontFamily: "'Syncopate', sans-serif", fontWeight: 700,
        fontSize: 13, letterSpacing: "0.22em",
        color: "#FF6B00", textDecoration: "none"
      }}>ARM</a>

      <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)", flexShrink: 0 }} />

      <div style={{ display: "flex", gap: "clamp(16px, 2.5vw, 36px)", alignItems: "center" }}>
        <a href={`${homeBase}#experience`} style={linkBase}>My Experience</a>
        <a href="https://vimeo.com/antonioruiz" target="_blank" rel="noopener noreferrer" style={linkBase}>My Videos</a>
        <Link to="/about" style={linkActive}>About Me</Link>
      </div>
    </nav>
  );
}
