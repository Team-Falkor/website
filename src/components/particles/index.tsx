import fireworksOptions from "@/utils/particles/fireworks.json";
import { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";

const ParticleSystem = () => {
  const [init, setInit] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    // Initialize particles engine
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });

    // Event listener to stop particles on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStop((prev) => !prev); // Stop the particles when Escape is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (stop || !init) return null; // Stop particles or wait for init
  return <Particles options={fireworksOptions as ISourceOptions} />;
};

export default ParticleSystem;
