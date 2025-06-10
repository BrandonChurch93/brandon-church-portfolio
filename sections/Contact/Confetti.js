"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Confetti = ({ particleCount = 50, duration = 3000, colors }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    const defaultColors = [
      "#6366f1",
      "#06b6d4",
      "#f59e0b",
      "#22d3ee",
      "#fbbf24",
    ];
    const particleColors = colors || defaultColors;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        angle: Math.random() * 360,
        velocity: 5 + Math.random() * 10,
        color:
          particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, duration);

    return () => clearTimeout(timeout);
  }, [particleCount, duration, colors]);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotate: particle.rotation,
          }}
          animate={{
            x:
              Math.cos((particle.angle * Math.PI) / 180) *
              particle.velocity *
              20,
            y:
              Math.sin((particle.angle * Math.PI) / 180) *
                particle.velocity *
                20 -
              50,
            scale: 0,
            opacity: 0,
            rotate: particle.rotation + particle.rotationSpeed * 50,
          }}
          transition={{
            duration: duration / 1000,
            ease: [0.5, 0, 1, 1],
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
