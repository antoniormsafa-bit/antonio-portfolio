import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface HeroProps {
  onHotspotClick: (index: number) => void;
}

const HOTSPOTS = [
  { top: "35%", left: "15%", label: "L'Oréal", index: 0 },
  { top: "18%", left: "70%", label: "INNN", index: 1 },
  { top: "18%", left: "32%", label: "Kircher Network", index: 2 },
  { top: "35%", left: "85%", label: "Heuritech", index: 3 }
];

const FRAME_COUNT = 20;

function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `${import.meta.env.BASE_URL}frames/ezgif-frame-${padded}.jpg`;
}

function mapRange(v: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (v - inMin) / (inMax - inMin)));
  return outMin + (outMax - outMin) * t;
}

export function Hero({ onHotspotClick }: HeroProps) {
  const isMobile        = useIsMobile();
  const wrapRef         = useRef<HTMLDivElement>(null);
  const canvasWrapRef   = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const hotspotsRef     = useRef<HTMLDivElement>(null);
  const zoomBarRef      = useRef<HTMLDivElement>(null);

  const antonioRef      = useRef<HTMLDivElement>(null);
  const ruizRef         = useRef<HTMLDivElement>(null);
  const roleRef         = useRef<HTMLDivElement>(null);

  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);

  const framesRef       = useRef<HTMLImageElement[]>([]);
  const loadedCountRef  = useRef(0);
  const currentFrameRef = useRef(0);

  const ZOOM_START = 1.0;
  const ZOOM_END   = 1.2;

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    canvas.style.width  = rect.width  + "px";
    canvas.style.height = rect.height + "px";
    const frame = framesRef.current[currentFrameRef.current];
    if (frame) drawFrame(frame);
  };

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    framesRef.current = images;
    loadedCountRef.current = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.onload = () => {
        loadedCountRef.current += 1;
        if (i === 0) { resizeCanvas(); drawFrame(img); }
      };
      img.src = getFrameUrl(i);
      images[i] = img;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const wrapTop    = wrap.getBoundingClientRect().top;
      const wrapHeight = wrap.offsetHeight;
      const vh         = window.innerHeight;
      const scrolled   = -wrapTop;
      const maxScroll  = wrapHeight - vh;
      const p          = Math.max(0, Math.min(1, scrolled / maxScroll));

      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        const frame = framesRef.current[frameIndex];
        if (frame?.complete) drawFrame(frame);
      }

      const scale = ZOOM_START + (ZOOM_END - ZOOM_START) * p;
      if (canvasWrapRef.current) canvasWrapRef.current.style.transform = `scale(${scale})`;

      if (zoomBarRef.current) {
        zoomBarRef.current.style.width   = p * 100 + "%";
        zoomBarRef.current.style.opacity = scrolled > maxScroll ? "0" : "1";
      }

      const antonioOpIn  = mapRange(p, 0,    0.12, 0, 1);
      const antonioOpOut = mapRange(p, 0.28, 0.42, 1, 0);
      const antonioOp    = p < 0.28 ? antonioOpIn : antonioOpOut;
      const antonioTx    = mapRange(p, 0,    0.14, -90, 0);
      if (antonioRef.current) {
        antonioRef.current.style.opacity   = String(antonioOp);
        antonioRef.current.style.transform = `translateX(${antonioTx}px)`;
      }

      const ruizOpIn  = mapRange(p, 0.05, 0.18, 0, 1);
      const ruizOpOut = mapRange(p, 0.28, 0.42, 1, 0);
      const ruizOp    = p < 0.28 ? ruizOpIn : ruizOpOut;
      const ruizTx    = mapRange(p, 0.05, 0.20, 90, 0);
      if (ruizRef.current) {
        ruizRef.current.style.opacity   = String(ruizOp);
        ruizRef.current.style.transform = `translateX(${ruizTx}px)`;
      }

      const roleOpIn  = mapRange(p, 0.38, 0.50, 0, 1);
      const roleOpOut = mapRange(p, 0.55, 0.68, 1, 0);
      const roleOp    = p < 0.55 ? roleOpIn : roleOpOut;
      const roleScale = 1 + mapRange(p, 0.38, 0.50, 0, 0.04) - mapRange(p, 0.55, 0.68, 0, 0.04);
      if (roleRef.current) {
        roleRef.current.style.opacity   = String(roleOp);
        roleRef.current.style.transform = `translate(-50%, -50%) scale(${roleScale})`;
      }

      const phase3 = mapRange(p, 0.68, 0.82, 0, 1);

      if (hotspotsRef.current) {
        hotspotsRef.current.style.opacity        = String(phase3);
        hotspotsRef.current.style.pointerEvents  = phase3 > 0.1 ? "auto" : "none";
        hotspotsRef.current.style.transform       = `scale(${1 / scale})`;
        hotspotsRef.current.style.transformOrigin = "center center";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={zoomBarRef}
        style={{
          position: "fixed", top: 0, left: 0,
          height: 2, background: "#FF6B00",
          width: "0%", zIndex: 9999, opacity: 1,
          transition: "opacity 0.5s ease"
        }}
      />

      {/* Phase 1: Name */}
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 50,
        pointerEvents: "none",
        textAlign: "center",
        width: "90vw"
      }}>
        <div
          ref={antonioRef}
          style={{
            fontFamily: "'Imperial Script', cursive",
            fontWeight: 400,
            fontSize: isMobile ? "clamp(60px, 18vw, 100px)" : "clamp(156px, 25.2vw, 360px)",
            color: "#FF6B00",
            lineHeight: 1.0,
            opacity: 0,
            willChange: "opacity, transform",
            display: "block"
          }}
        >
          Antonio
        </div>

        <div
          ref={ruizRef}
          style={{
            fontFamily: "'Syncopate', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(18px, 3.2vw, 48px)",
            color: "#FF6B00",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: "-0.35em",
            opacity: 0,
            willChange: "opacity, transform",
            display: "block"
          }}
        >
          Ruiz Martos
        </div>
      </div>

      {/* Phase 2: Role */}
      <div
        ref={roleRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          pointerEvents: "none",
          textAlign: "center",
          opacity: 0,
          willChange: "opacity, transform"
        }}
      >
        <div style={{
          fontFamily: "'Syncopate', sans-serif",
          fontWeight: 700,
          fontSize: isMobile ? 10 : 14,
          color: "#FF6B00",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          whiteSpace: isMobile ? "normal" : "nowrap",
          textAlign: "center",
          maxWidth: isMobile ? "80vw" : undefined,
          textShadow: "0 0 24px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.9)"
        }}>
          Influencer Marketing &amp; Brand Content
        </div>
      </div>

      {/* Hero sticky wrap (400vh scroll space) */}
      <div ref={wrapRef} style={{ position: "relative", height: "400vh" }}>
        <div style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden"
        }}>

          {/* Canvas wrapper — oversized for parallax zoom headroom */}
          <div
            ref={canvasWrapRef}
            style={{
              position: "absolute",
              inset: "-10%",
              width: "120%",
              height: "120%",
              transformOrigin: "center center",
              willChange: "transform",
              transform: "scale(1.0)"
            }}
          >
            <canvas
              ref={canvasRef}
              data-testid="hero-canvas"
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                backgroundColor: "#f5f5f5",
                imageRendering: "crisp-edges"
              }}
            />
          </div>

          {/* Hotspots — dot + label, no borders */}
          <div
            ref={hotspotsRef}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 5,
              pointerEvents: "none",
              opacity: 0,
              display: isMobile ? "none" : "block"
            }}
          >
            {HOTSPOTS.map(h => {
              const hovered = hoveredHotspot === h.index;
              return (
                <div
                  key={h.index}
                  data-testid={`hotspot-${h.index}`}
                  onClick={() => onHotspotClick(h.index)}
                  onMouseEnter={() => setHoveredHotspot(h.index)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  style={{
                    position: "absolute",
                    top: h.top,
                    left: h.left,
                    width: 70,
                    height: 70,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "all",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    border: "none",
                    outline: "none",
                    background: "transparent"
                  }}
                >
                  {/* Circle dot */}
                  <div style={{
                    width: hovered ? 20 : 14,
                    height: hovered ? 20 : 14,
                    borderRadius: "50%",
                    background: "#FF6B00",
                    flexShrink: 0,
                    boxShadow: hovered
                      ? "0 0 0 6px rgba(255,107,0,0.18), 0 0 18px rgba(255,107,0,0.55)"
                      : "none",
                    transition: "width 0.22s ease, height 0.22s ease, box-shadow 0.22s ease"
                  }} />

                  {/* Label */}
                  <div style={{
                    fontFamily: "'Syncopate', sans-serif",
                    fontWeight: 400,
                    fontSize: hovered ? 11 : 9,
                    letterSpacing: "0.15em",
                    color: "#FF6B00",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    transition: "font-size 0.22s ease"
                  }}>
                    {h.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom-only white fade */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(255,255,255,0.6) 88%, #ffffff 100%)",
            pointerEvents: "none",
            zIndex: 3
          }} />

        </div>
      </div>
    </>
  );
}
