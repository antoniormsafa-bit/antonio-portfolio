import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Cursor() {
  const isMobile = useIsMobile();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const [hotspot, setHotspot] = useState(false);
  const pos    = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    const animate = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx) * 0.12;
      pos.current.ry += (my - pos.current.ry) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top  = my + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + "px";
        ringRef.current.style.top  = pos.current.ry + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onEnter = () => setHotspot(true);
    const onLeave = () => setHotspot(false);
    const hotspots = document.querySelectorAll(".hotspot, .tv-card");
    hotspots.forEach(h => {
      h.addEventListener("mouseenter", onEnter);
      h.addEventListener("mouseleave", onLeave);
    });
    return () => {
      hotspots.forEach(h => {
        h.removeEventListener("mouseenter", onEnter);
        h.removeEventListener("mouseleave", onLeave);
      });
    };
  });

  if (isMobile) return null;

  return (
    <>
      {/* Dot cursor — solid orange, no blend mode so it never inverts over text */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: 7,
          height: 7,
          background: "#FF6B00",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%,-50%)"
        }}
      />
      {/* Ring cursor — subtle, non-intrusive */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: hotspot ? 52 : 32,
          height: hotspot ? 52 : 32,
          border: `1px solid ${hotspot ? "#FF6B00" : "rgba(255,107,0,0.35)"}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease"
        }}
      />
    </>
  );
}
