import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { useIsMobile } from "@/hooks/useIsMobile";

const PARAGRAPHS = [
  "I've been communicating my whole life. First learning, then practicing, now looking for where to do it at scale.",
  "My most recent chapter was at L'Oréal Spain & Portugal, within the Corporate Communication team. I worked across content strategy, the We Are L'Oréal Ambassadors advocacy program, internal campaign execution and event production for 1,200+ people. It was my first time inside a large corporation — and I learned that communication done right moves people, it doesn't just inform them.",
  "Before that, I lived in Paris, where I worked at Heuritech as Assistant to the Art Director. I designed newsletter systems in Figma, produced visual content for social media, created presentations for Fashion Weeks in Paris, Milan and London, and worked on UI design for digital products — all with brands like Dior, Louis Vuitton and New Balance in the background.",
  "I'm trilingual (ES · EN · FR), I move comfortably between creative and strategic work, and I'm increasingly using AI and automation to work smarter and faster. Right now I'm looking for a role in Brand Content, Influencer Marketing or Creator Partnerships — at a company where communication is part of the DNA, not a support department."
];

const PILLS = ["ES · EN · FR", "Madrid, Spain", "Open to remote"];

export function AboutMePage() {
  const isMobile = useIsMobile();

  return (
    <>
      <Cursor />
      <Grain />
      <Nav activePage="about" />

      <main>
        <section
          id="sobre-mi"
          style={{
            background: "#ffffff",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            minHeight: "100vh",
            paddingTop: isMobile ? 78 : 56
          }}
        >
          {/* Photo column */}
          <div style={{
            flex: isMobile ? "0 0 auto" : "0 0 50%",
            width: isMobile ? "100%" : undefined,
            height: isMobile ? "56vw" : "100vh",
            minHeight: isMobile ? 220 : undefined,
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? undefined : 0,
            overflow: "hidden",
            background: "#ffffff"
          }}>
            <img
              src={`${import.meta.env.BASE_URL}images/about-photo.png`}
              alt="Antonio Ruiz Martos"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block"
              }}
            />
          </div>

          {/* Text column */}
          <div style={{
            flex: isMobile ? "0 0 auto" : "0 0 50%",
            width: isMobile ? "100%" : undefined,
            padding: isMobile
              ? "40px 24px 60px"
              : "clamp(60px, 10vh, 120px) clamp(40px, 6vw, 90px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: isMobile ? 24 : 32
          }}>
            <span style={{
              fontFamily: "'Syncopate', sans-serif",
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: "0.35em",
              color: "#FF6B00",
              textTransform: "uppercase"
            }}>
              ABOUT ME
            </span>

            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: isMobile ? "clamp(28px, 7vw, 40px)" : "clamp(36px, 4vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#1d1d1f",
              letterSpacing: "-0.01em"
            }}>
              A story still being written.
            </div>

            <div style={{ width: 40, height: 1, background: "#FF6B00", opacity: 0.4 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: isMobile ? 16 : 18,
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: "#3d3d3d",
                    margin: 0
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
              {PILLS.map((pill, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{
                    fontFamily: "'Syncopate', sans-serif",
                    fontSize: 8, letterSpacing: "0.2em",
                    color: "#888", textTransform: "uppercase"
                  }}>
                    {pill}
                  </span>
                  {i < PILLS.length - 1 && (
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "#FF6B00", display: "inline-block",
                      opacity: 0.7, flexShrink: 0
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}
