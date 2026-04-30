import { useEffect } from "react";
import { Experience } from "@/data/experiences";

interface ModalProps {
  experience: Experience | null;
  onClose: () => void;
}

export function Modal({ experience, onClose }: ModalProps) {
  useEffect(() => {
    if (experience) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [experience]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      data-testid="modal-overlay"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8,8,7,0.92)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: experience ? 1 : 0,
        pointerEvents: experience ? "all" : "none",
        transition: "opacity 0.4s",
        backdropFilter: "blur(8px)",
        padding: 20
      }}
    >
      <div
        style={{
          background: "#0e0d0b",
          border: "1px solid #252318",
          maxWidth: 680,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "clamp(30px,5vw,60px)",
          position: "relative",
          transform: experience ? "translateY(0)" : "translateY(20px)",
          transition: "transform 0.4s",
          scrollbarWidth: "thin",
          scrollbarColor: "var(--gold) transparent"
        }}
      >
        <button
          data-testid="modal-close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 24,
            background: "transparent",
            border: "none",
            color: "var(--cream)",
            fontFamily: "'Syncopate', sans-serif",
            fontSize: 9,
            letterSpacing: "0.25em",
            cursor: "pointer",
            opacity: 0.4,
            textTransform: "uppercase",
            padding: "4px 8px",
            transition: "opacity 0.2s"
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.4")}
        >
          Close ×
        </button>

        {experience && (
          <>
            <span style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: 8,
              letterSpacing: "0.35em",
              color: "var(--gold)",
              textTransform: "uppercase",
              marginBottom: 12,
              display: "block"
            }}>{experience.tag}</span>

            <div style={{
              fontSize: "clamp(32px,5vw,56px)",
              fontWeight: 300,
              lineHeight: 1.0,
              color: "var(--white)",
              marginBottom: 6
            }}>{experience.company}</div>

            <div style={{
              fontSize: "clamp(14px,1.4vw,18px)",
              fontStyle: "italic",
              color: "var(--cream)",
              opacity: 0.55,
              marginBottom: 6,
              fontWeight: 300
            }}>{experience.role}</div>

            <div style={{
              fontFamily: "'Syncopate', sans-serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              color: "var(--gold)",
              opacity: 0.45,
              marginBottom: 36
            }}>{experience.period}</div>

            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.3, marginBottom: 28 }} />

            {experience.sections.map((section, si) => (
              <div key={si}>
                <div style={{
                  fontFamily: "'Syncopate', sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  marginBottom: 14,
                  opacity: 0.7
                }}>{section.title}</div>

                <ul style={{ listStyle: "none", marginBottom: 28 }}>
                  {section.bullets.map((b, bi) => (
                    <li key={bi} style={{
                      fontSize: "clamp(13px,1.1vw,15px)",
                      fontWeight: 300,
                      color: "var(--cream)",
                      opacity: 0.72,
                      lineHeight: 1.7,
                      paddingLeft: 16,
                      position: "relative",
                      marginBottom: 8
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "var(--gold)",
                        opacity: 0.5,
                        fontSize: 10
                      }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>

                {section.result && (
                  <div style={{
                    fontSize: "clamp(13px,1.1vw,15px)",
                    fontStyle: "italic",
                    color: "var(--gold)",
                    opacity: 0.8,
                    lineHeight: 1.6,
                    padding: "14px 18px",
                    borderLeft: "1px solid rgba(255,107,0,0.3)",
                    marginBottom: 24,
                    fontWeight: 300
                  }}>{section.result}</div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
