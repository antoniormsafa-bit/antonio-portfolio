import { useState } from "react";
import { Cursor } from "@/components/Cursor";
import { Grain } from "@/components/Grain";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { FilmStrip } from "@/components/FilmStrip";
import { Contact } from "@/components/Contact";
import { Modal } from "@/components/Modal";
import { EXPERIENCES } from "@/data/experiences";

export function Portfolio() {
  const [activeExp, setActiveExp] = useState<number | null>(null);

  const openModal = (index: number) => setActiveExp(index);
  const closeModal = () => setActiveExp(null);

  return (
    <>
      <Cursor />
      <Grain />
      <Nav />

      <main>
        <Hero onHotspotClick={openModal} />
        <Experience onCardClick={openModal} />
        <FilmStrip />
        <Contact />
      </main>

      <Modal
        experience={activeExp !== null ? EXPERIENCES[activeExp] : null}
        onClose={closeModal}
      />
    </>
  );
}
