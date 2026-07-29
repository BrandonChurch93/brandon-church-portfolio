"use client";

import { useEffect, useRef } from "react";

const FixedParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Responsive particle count
    const getParticleCount = () => {
      if (window.innerWidth < 768) return 20; // Mobile
      if (window.innerWidth < 1024) return 28; // Tablet
      return 35; // Desktop
    };

    // Responsive sizes
    const getParticleSizes = () => {
      if (window.innerWidth < 768) return { min: 1, max: 3 }; // Mobile
      if (window.innerWidth < 1024) return { min: 2, max: 4 }; // Tablet
      return { min: 2, max: 5 }; // Desktop
    };

    // Responsive connection distance
    const getConnectionDistance = () => {
      if (window.innerWidth < 768) return 150; // Mobile
      if (window.innerWidth < 1024) return 175; // Tablet
      if (window.innerWidth < 1920) return 300; // Regular desktop
      return 400; // Large displays (4K+)
    };

    const initParticles = () => {
      const count = getParticleCount();
      const sizes = getParticleSizes();

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (sizes.max - sizes.min) + sizes.min,
        baseSize: 0, // Will be set after creation
        speedX:
          (Math.random() - 0.5) * 0.6 + (Math.random() > 0.5 ? 0.1 : -0.1),
        speedY:
          (Math.random() - 0.5) * 0.6 + (Math.random() > 0.5 ? 0.1 : -0.1),
        opacity: Math.random() * 0.4 + 0.5,
        pulseOffset: Math.random() * Math.PI * 2, // For pulsing effect
        connections: 0, // Track number of connections
      }));

      // Set base size after creation
      particlesRef.current.forEach((p) => (p.baseSize = p.size));
    };

    initParticles();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles(); // Reinit particles on resize
    });

    // Animation loop
    let time = 0;
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      const connectionDistance = getConnectionDistance();
      const isMobile = window.innerWidth < 768;

      // Reset connection counts
      particlesRef.current.forEach((p) => (p.connections = 0));

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle pulsing effect
        const pulse = Math.sin(time + particle.pulseOffset) * 0.1 + 1;
        particle.size = particle.baseSize * pulse;

        // Draw particle with glow effect
        ctx.save();

        // Add glow (skip on mobile for performance)
        if (!isMobile) {
          ctx.shadowBlur = particle.size * 3;
          ctx.shadowColor = `rgba(255, 63, 129, ${particle.opacity})`;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 63, 129, ${particle.opacity})`;
        ctx.fill();

        ctx.restore();

        // Draw connections - optimized to only check particles ahead
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const particle2 = particlesRef.current[j];

          // Skip if either particle has too many connections
          if (particle.connections >= 3 || particle2.connections >= 3) continue;

          const dx = particle.x - particle2.x;
          const dy = particle.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // Draw connection
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle2.x, particle2.y);

            // Gradient effect for connections
            const gradient = ctx.createLinearGradient(
              particle.x,
              particle.y,
              particle2.x,
              particle2.y
            );
            const connectionOpacity = (1 - distance / connectionDistance) * 0.4;
            gradient.addColorStop(
              0,
              `rgba(255, 63, 129, ${connectionOpacity * particle.opacity})`
            );
            gradient.addColorStop(
              1,
              `rgba(255, 63, 129, ${connectionOpacity * particle2.opacity})`
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = isMobile ? 0.5 : 1;
            ctx.stroke();

            // Increment connection count
            particle.connections++;
            particle2.connections++;
          }
        }

        // Adjust particle speed based on connections
        if (particle.connections > 2) {
          // Slow down particles with many connections (crystallization effect)
          particle.speedX *= 0.995; // Much gentler slowdown
          particle.speedY *= 0.995;

          // Ensure minimum speed (prevent particles from stopping)
          const minSpeed = 0.1;
          if (Math.abs(particle.speedX) < minSpeed) {
            particle.speedX = particle.speedX < 0 ? -minSpeed : minSpeed;
          }
          if (Math.abs(particle.speedY) < minSpeed) {
            particle.speedY = particle.speedY < 0 ? -minSpeed : minSpeed;
          }
        } else {
          // Gradually restore speed for particles with few connections
          particle.speedX *= 1.002; // Much gentler acceleration
          particle.speedY *= 1.002;

          // Add tiny random movement to prevent stagnation
          particle.speedX += (Math.random() - 0.5) * 0.01;
          particle.speedY += (Math.random() - 0.5) * 0.01;

          // Clamp maximum speed
          const maxSpeed = 0.4;
          particle.speedX = Math.max(
            -maxSpeed,
            Math.min(maxSpeed, particle.speedX)
          );
          particle.speedY = Math.max(
            -maxSpeed,
            Math.min(maxSpeed, particle.speedY)
          );
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      {/* Base gradient - matches mobile hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#23153c] via-[#1a0f2e] to-[#23153c]" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f2e]/80 via-transparent to-transparent" />
    </div>
  );
};

export default FixedParticleBackground;
