"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaCodepen,
  FaBrain,
} from "react-icons/fa";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import { useChatbot } from "@/components/Chatbot/useChatbot";
import styles from "./hero.module.css";

// Function to generate points for geometrical shapes
function generateShapePoints(shapeType, centerX, centerY, particleCount) {
  const points = [];
  if (shapeType === "circle") {
    const radius = 100;
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      points.push({
        x: centerX + radius * Math.cos(theta),
        y: centerY + radius * Math.sin(theta),
        hue: (theta / (Math.PI * 2)) * 360,
      });
    }
  } else if (shapeType === "square") {
    const size = 200;
    const halfSize = size / 2;
    const perimeter = 4 * size;
    const spacing = perimeter / particleCount;
    let currentDistance = 0;
    for (let i = 0; i < particleCount; i++) {
      let x, y, hue;
      if (currentDistance < size) {
        x = centerX - halfSize + currentDistance;
        y = centerY - halfSize;
        hue = (currentDistance / size) * 60;
      } else if (currentDistance < 2 * size) {
        x = centerX + halfSize;
        y = centerY - halfSize + (currentDistance - size);
        hue = 60 + ((currentDistance - size) / size) * 60;
      } else if (currentDistance < 3 * size) {
        x = centerX + halfSize - (currentDistance - 2 * size);
        y = centerY + halfSize;
        hue = 120 + ((currentDistance - 2 * size) / size) * 60;
      } else {
        x = centerX - halfSize;
        y = centerY + halfSize - (currentDistance - 3 * size);
        hue = 180 + ((currentDistance - 3 * size) / size) * 60;
      }
      points.push({ x, y, hue });
      currentDistance += spacing;
    }
  } else if (shapeType === "triangle") {
    const size = 200;
    const height = (Math.sqrt(3) / 2) * size;
    const pointsPerSide = Math.ceil(particleCount / 3);
    for (let side = 0; side < 3; side++) {
      for (let i = 0; i < pointsPerSide; i++) {
        const t = i / (pointsPerSide - 1);
        let x, y, hue;
        if (side === 0) {
          x = centerX - size / 2 + t * size;
          y = centerY + height / 3;
          hue = t * 120;
        } else if (side === 1) {
          x = centerX - size / 2 + t * (size / 2);
          y = centerY + height / 3 - t * height;
          hue = 120 + t * 120;
        } else {
          x = centerX + size / 2 - t * (size / 2);
          y = centerY + height / 3 - t * height;
          hue = 240 + t * 120;
        }
        points.push({ x, y, hue });
      }
    }
  }
  return points;
}

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState([]);
  const cursorInteraction = useCursorInteraction();
  const { mouseX, mouseY, isTouch } = useXRInteraction();
  const { openChatbot } = useChatbot();
  const rafRef = useRef(null);

  const relativeMouseX = useMotionValue(0);
  const relativeMouseY = useMotionValue(0);

  // Tilt effect - only for desktop
  const tiltX = useTransform(relativeMouseY, [0, dimensions.height], [8, -8], {
    clamp: true,
  });
  const tiltY = useTransform(relativeMouseX, [0, dimensions.width], [-8, 8], {
    clamp: true,
  });

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const tiltXSpring = useSpring(tiltX, springConfig);
  const tiltYSpring = useSpring(tiltY, springConfig);

  // Check viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Mouse position updates
  useEffect(() => {
    if (!containerRef.current || isTouch) return;

    const updateRelativePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, mouseX.get() - rect.left));
      const y = Math.max(0, Math.min(rect.height, mouseY.get() - rect.top));
      relativeMouseX.set(x);
      relativeMouseY.set(y);
    };

    const unsubscribeX = mouseX.on("change", updateRelativePosition);
    const unsubscribeY = mouseY.on("change", updateRelativePosition);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, relativeMouseX, relativeMouseY, isTouch]);

  // Complete particle system from old code
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isMobile) return;

    const ctx = canvas.getContext("2d");
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    let animationId;
    let time = 0;

    const gridSize = 40;
    const layers = 3;
    const grids = [];

    const colors = {
      primary: { r: 99, g: 102, b: 241 },
      secondary: { r: 6, g: 182, b: 212 },
      accent: { r: 245, g: 158, b: 11 },
    };

    class ParticleField {
      constructor() {
        this.particles = [];
        this.connections = [];
        this.constellations = [];
        this.activeConnections = new Map();
        this.connectionPulses = [];
        this.shapes = [];
        this.initializeField();
      }

      initializeField() {
        const layers = [
          {
            count: 700,
            z: 0.1,
            sizeRange: [0.5, 1],
            speed: 0.02,
            opacity: 0.3,
          },
          {
            count: 500,
            z: 0.3,
            sizeRange: [1, 1.5],
            speed: 0.05,
            opacity: 0.5,
          },
          {
            count: 350,
            z: 0.5,
            sizeRange: [1.5, 2.5],
            speed: 0.1,
            opacity: 0.7,
          },
          {
            count: 250,
            z: 0.7,
            sizeRange: [2, 3.5],
            speed: 0.15,
            opacity: 0.9,
          },
          { count: 120, z: 1, sizeRange: [3, 5], speed: 0.2, opacity: 1 },
        ];

        layers.forEach((layer, layerIndex) => {
          for (let i = 0; i < layer.count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size =
              layer.sizeRange[0] +
              Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]);

            const baseHue = 200 + Math.random() * 60;

            this.particles.push({
              id: `${layerIndex}-${i}`,
              x: x,
              y: y,
              z: layer.z,
              baseX: x,
              baseY: y,
              vx: (Math.random() - 0.5) * layer.speed,
              vy: (Math.random() - 0.5) * layer.speed,
              size: size,
              baseSize: size,
              opacity: layer.opacity,
              baseOpacity: layer.opacity,
              baseHue: baseHue,
              currentHue: baseHue,
              targetHue: baseHue,
              colorType: Math.floor(Math.random() * 3),
              pulsePhase: Math.random() * Math.PI * 2,
              pulseSpeed: 0.02 + Math.random() * 0.03,
              glowIntensity: 0,
              targetGlowIntensity: 0,
              idealDistance: 80 + layer.z * 40,
              personalSpace: 30 + layer.z * 20,
              latticeForce: 0,
              neighbors: [],
              connectionStrength: 0,
              activated: false,
              activationTime: 0,
              forceX: 0,
              forceY: 0,
              trailPoints: [],
              maxTrailLength: Math.floor(10 + layer.z * 20),
              layer: layerIndex,
              interactive: layer.z > 0.5,
              shapeAssigned: false,
              targetX: undefined,
              targetY: undefined,
              shape: null,
            });
          }
        });
      }

      assignToShape(shapeType, centerX, centerY, particleLimit) {
        const shapePoints = generateShapePoints(
          shapeType,
          centerX,
          centerY,
          particleLimit
        );
        const availableParticles = this.particles.filter(
          (p) => !p.shapeAssigned && p.interactive
        );
        const selectedParticles = availableParticles.slice(0, particleLimit);

        const shape = {
          type: shapeType,
          centerX,
          centerY,
          particles: selectedParticles,
          points: shapePoints,
          creationTime: Date.now(),
        };

        selectedParticles.forEach((particle, index) => {
          const point = shapePoints[index % shapePoints.length];
          particle.targetX = point.x;
          particle.targetY = point.y;
          particle.targetHue = point.hue;
          particle.shapeAssigned = true;
          particle.shape = shape;
        });

        this.shapes.push(shape);
      }

      update(mouseX, mouseY, isTouch) {
        this.particles.forEach((p) => {
          p.forceX = 0;
          p.forceY = 0;
          p.neighbors = [];
        });

        if (!isTouch && this.shapes.length < 3 && Math.random() < 0.005) {
          const shapeType = ["circle", "square", "triangle"][
            Math.floor(Math.random() * 3)
          ];
          const centerX = canvas.width * Math.random();
          const centerY = canvas.height * Math.random();
          const particleLimit = 30;
          this.assignToShape(shapeType, centerX, centerY, particleLimit);
        }

        this.particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < -50) particle.x = canvas.width + 50;
          if (particle.x > canvas.width + 50) particle.x = -50;
          if (particle.y < -50) particle.y = canvas.height + 50;
          if (particle.y > canvas.height + 50) particle.y = -50;

          if (Math.random() < 0.001) {
            particle.baseX = particle.x;
            particle.baseY = particle.y;
          }

          particle.pulsePhase += particle.pulseSpeed;
          const pulseFactor = Math.sin(particle.pulsePhase) * 0.2 + 1;

          if (!isTouch && particle.interactive) {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const activationRadius = 250;

            if (distance < activationRadius) {
              particle.activated = true;
              particle.activationTime = 1;
              particle.targetGlowIntensity = 1 - distance / activationRadius;

              if (particle.colorType === 0) {
                particle.targetHue = 200 + Math.random() * 30;
              } else if (particle.colorType === 1) {
                particle.targetHue = 270 + Math.random() * 30;
              } else {
                particle.targetHue = 15 + Math.random() * 30;
              }
            } else if (!particle.shapeAssigned) {
              particle.activationTime *= 0.95;
              if (particle.activationTime < 0.01) {
                particle.activated = false;
              }
              particle.targetGlowIntensity *= 0.9;
              particle.targetHue = particle.baseHue;
            }
          }

          if (
            particle.shapeAssigned &&
            particle.targetX !== undefined &&
            particle.targetY !== undefined
          ) {
            const dx = particle.targetX - particle.x;
            const dy = particle.targetY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 1) {
              const forceStrength = 0.1;
              particle.forceX += (dx / distance) * forceStrength;
              particle.forceY += (dy / distance) * forceStrength;
            }
          }

          particle.currentHue +=
            (particle.targetHue - particle.currentHue) * 0.1;

          particle.glowIntensity +=
            (particle.targetGlowIntensity - particle.glowIntensity) * 0.15;
          particle.size =
            particle.baseSize *
            pulseFactor *
            (1 + particle.glowIntensity * 0.3);

          if (
            particle.activated &&
            particle.interactive &&
            particle.glowIntensity > 0.3
          ) {
            particle.trailPoints.push({
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity * particle.glowIntensity,
            });
            if (particle.trailPoints.length > particle.maxTrailLength) {
              particle.trailPoints.shift();
            }
          } else if (particle.trailPoints.length > 0) {
            particle.trailPoints.shift();
          }
        });

        const activeParticles = this.particles.filter(
          (p) => p.activated && p.interactive && !p.shapeAssigned
        );

        for (let i = 0; i < activeParticles.length; i++) {
          const p1 = activeParticles[i];
          for (let j = 0; j < activeParticles.length; j++) {
            if (i === j) continue;
            const p2 = activeParticles[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (
              distance < p1.idealDistance * 2 &&
              Math.abs(p1.z - p2.z) < 0.3
            ) {
              let force = 0;
              if (distance < p1.personalSpace) {
                force = -2 * (1 - distance / p1.personalSpace);
              } else if (distance < p1.idealDistance) {
                force =
                  (0.5 * (distance - p1.personalSpace)) /
                  (p1.idealDistance - p1.personalSpace);
              } else {
                force =
                  0.2 * (1 - (distance - p1.idealDistance) / p1.idealDistance);
              }
              const angle = Math.atan2(dy, dx);
              p1.forceX += Math.cos(angle) * force * p1.activationTime;
              p1.forceY += Math.sin(angle) * force * p1.activationTime;

              if (
                distance < p1.idealDistance * 1.5 &&
                p1.neighbors.length < 6
              ) {
                p1.neighbors.push({ particle: p2, distance: distance });
              }
            }
          }
          p1.neighbors.sort((a, b) => a.distance - b.distance);
          p1.neighbors = p1.neighbors.slice(0, 6);
        }

        this.particles.forEach((particle) => {
          particle.x += particle.forceX * 0.3;
          particle.y += particle.forceY * 0.3;

          const returnForce = 0.02;
          particle.x +=
            (particle.baseX - particle.x) *
            returnForce *
            (1 - particle.activationTime) *
            (particle.shapeAssigned ? 0 : 1);
          particle.y +=
            (particle.baseY - particle.y) *
            returnForce *
            (1 - particle.activationTime) *
            (particle.shapeAssigned ? 0 : 1);
        });

        this.shapes = this.shapes.filter((shape) => {
          const age = Date.now() - shape.creationTime;
          if (age > 5000) {
            shape.particles.forEach((p) => {
              p.shapeAssigned = false;
              p.targetX = undefined;
              p.targetY = undefined;
              p.shape = null;
              p.targetHue = p.baseHue;
            });
            return false;
          }
          return true;
        });

        this.updateConnections();
        this.updateEnergyPulses();
        this.updateConstellations();
      }

      updateConnections() {
        this.connections = [];
        const processed = new Set();

        this.particles.forEach((p1) => {
          if (!p1.activated || !p1.interactive || p1.shapeAssigned) return;

          p1.neighbors.forEach(({ particle: p2, distance }) => {
            const connectionId = [p1.id, p2.id].sort().join("-");

            if (!processed.has(connectionId)) {
              processed.add(connectionId);

              const strength =
                p1.activationTime *
                p2.activationTime *
                (1 - distance / (p1.idealDistance * 1.5));

              if (strength > 0.1) {
                const connection = {
                  p1,
                  p2,
                  distance,
                  strength,
                  id: connectionId,
                  pulsePhase: Math.random() * Math.PI * 2,
                  established: this.activeConnections.has(connectionId),
                };

                this.connections.push(connection);

                if (!connection.established) {
                  this.activeConnections.set(connectionId, Date.now());
                  this.createConnectionPulse(p1, p2);
                }
              }
            }
          });
        });

        this.activeConnections.forEach((time, id) => {
          if (!this.connections.find((c) => c.id === id)) {
            this.activeConnections.delete(id);
          }
        });
      }

      createConnectionPulse(p1, p2) {
        this.connectionPulses.push({
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          progress: 0,
          life: 1,
          color: (p1.currentHue + p2.currentHue) / 2,
        });
      }

      updateEnergyPulses() {
        this.connectionPulses = this.connectionPulses.filter((pulse) => {
          pulse.progress += 0.02;
          pulse.life = 1 - pulse.progress;
          return pulse.life > 0;
        });

        this.connections.forEach((conn) => {
          if (Math.random() < 0.01 && conn.strength > 0.5) {
            this.createConnectionPulse(conn.p1, conn.p2);
          }
        });
      }

      updateConstellations() {
        this.constellations = [];
        const processed = new Set();

        this.connections.forEach((conn) => {
          if (
            conn.strength > 0.5 &&
            !processed.has(conn.p1.id) &&
            !processed.has(conn.p2.id)
          ) {
            const constellation = {
              particles: [conn.p1, conn.p2],
              connections: [conn],
              centerX: (conn.p1.x + conn.p2.x) / 2,
              centerY: (conn.p1.y + conn.p2.y) / 2,
              radius: conn.distance / 2,
              hue: (conn.p1.currentHue + conn.p2.currentHue) / 2,
              pulse: 0,
            };

            this.connections.forEach((otherConn) => {
              if (
                constellation.particles.includes(otherConn.p1) ||
                constellation.particles.includes(otherConn.p2)
              ) {
                if (!constellation.particles.includes(otherConn.p1))
                  constellation.particles.push(otherConn.p1);
                if (!constellation.particles.includes(otherConn.p2))
                  constellation.particles.push(otherConn.p2);
                constellation.connections.push(otherConn);
              }
            });

            constellation.particles.forEach((p) => processed.add(p.id));
            this.constellations.push(constellation);
          }
        });
      }

      draw(ctx) {
        for (let layer = 0; layer < 5; layer++) {
          const layerParticles = this.particles.filter(
            (p) => p.layer === layer
          );

          layerParticles.forEach((particle) => {
            if (particle.trailPoints.length > 1) {
              ctx.strokeStyle = `hsla(${particle.currentHue}, 70%, 60%, 0.1)`;
              ctx.lineWidth = particle.size * 0.5;
              ctx.lineCap = "round";
              ctx.beginPath();

              particle.trailPoints.forEach((point, index) => {
                const opacity = (index / particle.trailPoints.length) * 0.3;
                if (index === 0) {
                  ctx.moveTo(point.x, point.y);
                } else {
                  ctx.lineTo(point.x, point.y);
                }
              });
              ctx.stroke();
            }

            if (particle.glowIntensity > 0.1) {
              const glowLayers = [
                { size: 4, alpha: 0.1 },
                { size: 3, alpha: 0.2 },
                { size: 2, alpha: 0.3 },
                { size: 1.5, alpha: 0.4 },
              ];

              glowLayers.forEach(({ size, alpha }) => {
                const glowSize = particle.size * size;
                const gradient = ctx.createRadialGradient(
                  particle.x,
                  particle.y,
                  particle.size,
                  particle.x,
                  particle.y,
                  glowSize
                );

                const glowHue =
                  particle.currentHue + Math.sin(particle.pulsePhase * 2) * 20;
                gradient.addColorStop(0, `hsla(${glowHue}, 80%, 70%, 0)`);
                gradient.addColorStop(
                  0.5,
                  `hsla(${glowHue}, 90%, 60%, ${
                    alpha * particle.glowIntensity
                  })`
                );
                gradient.addColorStop(1, `hsla(${glowHue}, 100%, 50%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
                ctx.fill();
              });
            }

            const particleGradient = ctx.createRadialGradient(
              particle.x - particle.size * 0.3,
              particle.y - particle.size * 0.3,
              0,
              particle.x,
              particle.y,
              particle.size
            );

            const brightness = 60 + particle.glowIntensity * 40;
            const hue = particle.currentHue;
            particleGradient.addColorStop(
              0,
              `hsla(${hue}, 70%, ${brightness}%, ${particle.opacity})`
            );
            particleGradient.addColorStop(
              0.5,
              `hsla(${hue}, 80%, ${brightness - 20}%, ${
                particle.opacity * 0.8
              })`
            );
            particleGradient.addColorStop(
              1,
              `hsla(${hue}, 90%, ${brightness - 40}%, ${
                particle.opacity * 0.5
              })`
            );

            ctx.fillStyle = particleGradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            if (particle.size > 2) {
              ctx.fillStyle = `hsla(${hue - 20}, 60%, 90%, ${
                particle.opacity * (0.5 + particle.glowIntensity * 0.5)
              })`;
              ctx.beginPath();
              ctx.arc(
                particle.x - particle.size * 0.2,
                particle.y - particle.size * 0.2,
                particle.size * 0.3,
                0,
                Math.PI * 2
              );
              ctx.fill();
            }
          });
        }

        this.connections.forEach((conn) => {
          const layers = [
            { width: 6, alpha: 0.1 },
            { width: 3, alpha: 0.3 },
            { width: 1.5, alpha: 0.6 },
          ];

          layers.forEach(({ width, alpha }) => {
            const gradient = ctx.createLinearGradient(
              conn.p1.x,
              conn.p1.y,
              conn.p2.x,
              conn.p2.y
            );

            const hue1 = conn.p1.currentHue + Math.sin(conn.pulsePhase) * 10;
            const hue2 =
              conn.p2.currentHue + Math.sin(conn.pulsePhase + Math.PI) * 10;

            gradient.addColorStop(
              0,
              `hsla(${hue1}, 80%, 60%, ${conn.strength * alpha * 0.5})`
            );
            gradient.addColorStop(
              0.5,
              `hsla(${(hue1 + hue2) / 2}, 90%, 70%, ${conn.strength * alpha})`
            );
            gradient.addColorStop(
              1,
              `hsla(${hue2}, 80%, 60%, ${conn.strength * alpha * 0.5})`
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = width * conn.strength;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(conn.p1.x, conn.p1.y);
            ctx.lineTo(conn.p2.x, conn.p2.y);
            ctx.stroke();
          });

          conn.pulsePhase += 0.05;
        });

        this.connectionPulses.forEach((pulse) => {
          const x = pulse.x1 + (pulse.x2 - pulse.x1) * pulse.progress;
          const y = pulse.y1 + (pulse.y2 - pulse.y1) * pulse.progress;

          const size = 4 * pulse.life;
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);

          gradient.addColorStop(
            0,
            `hsla(${pulse.color}, 100%, 80%, ${pulse.life})`
          );
          gradient.addColorStop(
            0.5,
            `hsla(${pulse.color}, 90%, 70%, ${pulse.life * 0.5})`
          );
          gradient.addColorStop(1, `hsla(${pulse.color}, 80%, 60%, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        });

        this.constellations.forEach((constellation) => {
          constellation.pulse += 0.02;
          const pulseFactor = Math.sin(constellation.pulse) * 0.5 + 0.5;

          const glowGradient = ctx.createRadialGradient(
            constellation.centerX,
            constellation.centerY,
            0,
            constellation.centerX,
            constellation.centerY,
            constellation.radius * 2
          );
          glowGradient.addColorStop(
            0,
            `hsla(${constellation.hue}, 80%, 70%, ${0.1 * pulseFactor})`
          );
          glowGradient.addColorStop(
            1,
            `hsla(${constellation.hue}, 70%, 60%, 0)`
          );

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(
            constellation.centerX,
            constellation.centerY,
            constellation.radius * 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });
      }
    }

    for (let layer = 0; layer < layers; layer++) {
      const grid = [];
      const cols = Math.ceil(canvas.width / gridSize) + 2;
      const rows = Math.ceil(canvas.height / gridSize) + 2;

      for (let row = 0; row < rows; row++) {
        grid[row] = [];
        for (let col = 0; col < cols; col++) {
          grid[row][col] = {
            x: col * gridSize - gridSize,
            y: row * gridSize - gridSize,
            offsetX: 0,
            offsetY: 0,
            targetOffsetX: 0,
            targetOffsetY: 0,
            brightness: 0,
            targetBrightness: 0,
          };
        }
      }
      grids.push(grid);
    }

    const particleField = new ParticleField();

    const animate = () => {
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      bgGradient.addColorStop(0, "rgba(15, 15, 20, 0.95)");
      bgGradient.addColorStop(1, "rgba(5, 5, 10, 0.98)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time++;

      const mouseXPos = relativeMouseX.get();
      const mouseYPos = relativeMouseY.get();

      particleField.update(mouseXPos, mouseYPos, isTouch);
      particleField.draw(ctx);

      if (!isTouch) {
        grids.forEach((grid, layerIndex) => {
          const influence = 150 + layerIndex * 50;
          const strength = 20 - layerIndex * 5;

          grid.forEach((row) => {
            row.forEach((point) => {
              const dx = point.x - mouseXPos;
              const dy = point.y - mouseYPos;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < influence) {
                const force = (1 - distance / influence) * strength;
                const angle = Math.atan2(dy, dx);

                point.targetOffsetX = Math.cos(angle + time * 0.01) * force;
                point.targetOffsetY = Math.sin(angle + time * 0.01) * force;
                point.targetBrightness = (1 - distance / influence) * 0.5;
              } else {
                point.targetOffsetX *= 0.9;
                point.targetOffsetY *= 0.9;
                point.targetBrightness *= 0.9;
              }
            });
          });
        });
      }

      grids.forEach((grid) => {
        grid.forEach((row) => {
          row.forEach((point) => {
            point.offsetX += (point.targetOffsetX - point.offsetX) * 0.1;
            point.offsetY += (point.targetOffsetY - point.offsetY) * 0.1;
            point.brightness +=
              (point.targetBrightness - point.brightness) * 0.1;
          });
        });
      });

      grids.forEach((grid, layerIndex) => {
        const colorIndex = layerIndex % 3;
        const color =
          colorIndex === 0
            ? colors.primary
            : colorIndex === 1
            ? colors.secondary
            : colors.accent;

        grid.forEach((row, rowIndex) => {
          for (let colIndex = 0; colIndex < row.length - 1; colIndex++) {
            const point1 = row[colIndex];
            const point2 = row[colIndex + 1];
            const midX = (point1.x + point2.x) / 2;
            const midY = (point1.y + point2.y) / 2;
            const dx = midX - mouseXPos;
            const dy = midY - mouseYPos;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const influence = Math.pow(1 - distance / 200, 2);
              const opacity = 0.02 + 0.13 * influence;

              ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(point1.x + point1.offsetX, point1.y + point1.offsetY);
              ctx.lineTo(point2.x + point2.offsetX, point2.y + point2.offsetY);
              ctx.stroke();
            }
          }
        });

        for (let col = 0; col < grid[0].length; col++) {
          for (let row = 0; row < grid.length - 1; row++) {
            const point1 = grid[row][col];
            const point2 = grid[row + 1][col];
            const midX = (point1.x + point2.x) / 2;
            const midY = (point1.y + point2.y) / 2;
            const dx = midX - mouseXPos;
            const dy = midY - mouseYPos;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const influence = Math.pow(1 - distance / 200, 2);
              const opacity = 0.02 + 0.13 * influence;

              ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(point1.x + point1.offsetX, point1.y + point1.offsetY);
              ctx.lineTo(point2.x + point2.offsetX, point2.y + point2.offsetY);
              ctx.stroke();
            }
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [dimensions, relativeMouseX, relativeMouseY, isTouch, isMobile]);

  const createParticleBurst = (x, y, color) => {
    const newParticles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 3 + Math.random() * 4;

      newParticles.push({
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 3 + Math.random() * 5,
        color: color || "#6366f1",
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1500);
  };

  const socialLinks = useMemo(
    () => [
      {
        icon: FaYoutube,
        href: "https://www.youtube.com/@brandonchurch2328",
        label: "YouTube",
        color: "#FF0000",
      },
      {
        icon: FaLinkedin,
        href: "https://www.linkedin.com/in/brandon-church-946278138/",
        label: "LinkedIn",
        color: "#0077B5",
      },
      {
        icon: FaGithub,
        href: "https://github.com/BrandonChurch93",
        label: "GitHub",
        color: "#6366f1",
      },
      {
        icon: FaCodepen,
        href: "https://codepen.io/BrandonLeoChurch",
        label: "CodePen",
        color: "#47CF73",
      },
    ],
    []
  );

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Desktop Background */}
      {!isMobile && (
        <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      )}

      {/* Mobile 3D Grid Background */}
      {isMobile && (
        <div className={styles.mobileGrid}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
        </div>
      )}

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} />
      <div className={styles.meshGradient} />

      {/* Content with tilt effect (desktop only) */}
      <motion.div
        className={styles.content}
        style={{
          rotateX: isTouch || isMobile ? 0 : tiltXSpring,
          rotateY: isTouch || isMobile ? 0 : tiltYSpring,
          transformStyle: "preserve-3d",
          transformPerspective: 1200,
        }}
      >
        <motion.div
          className={styles.headlineContainer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Hi, I'm Brandon
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1],
            }}
          >
            As an expert in AI prompt engineering and a senior UI/UX developer,
            I craft experiences that make complex tech feel effortless and
            accessible. With 10+ years of experience, I've built multi-million
            dollar generating UIs using React, accessible design, and XR to
            deliver next-gen digital products.
          </motion.p>
        </motion.div>
        <motion.div
          className={styles.buttonWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <button
            className={styles.ctaButton}
            onClick={openChatbot}
            {...cursorInteraction}
          >
            <span className={styles.buttonText}>Ask Brandon's AI</span>
            <FaBrain className={styles.buttonIcon} />
          </button>
        </motion.div>
      </motion.div>

      {/* Social Links with fixed gravity */}
      <motion.div
        className={styles.socialContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {socialLinks.map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={social.label}
            style={{
              "--social-color": social.color,
              "--animation-delay": `${0.8 + index * 0.1}s`,
            }}
            onMouseEnter={(e) => {
              cursorInteraction.onMouseEnter();
              const rect = e.currentTarget.getBoundingClientRect();
              const containerRect =
                containerRef.current.getBoundingClientRect();
              createParticleBurst(
                rect.left + rect.width / 2 - containerRect.left,
                rect.top + rect.height / 2 - containerRect.top,
                social.color
              );
            }}
            onMouseLeave={cursorInteraction.onMouseLeave}
          >
            <social.icon className={styles.socialIcon} />
            <span className={styles.tooltip}>{social.label}</span>
          </a>
        ))}
      </motion.div>

      {/* Particle Container */}
      <div className={styles.particleContainer}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.particle}
            initial={{ x: particle.x, y: particle.y, scale: 1, opacity: 1 }}
            animate={{
              x: particle.x + particle.vx * 50,
              y: particle.y + particle.vy * 50,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              background: particle.color,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

// Fixed SocialIcon component with proper gravity effect
const SocialIcon = ({
  social,
  index,
  cursorInteraction,
  mouseX,
  mouseY,
  containerRef,
  onParticleBurst,
  isMobile,
  isTouch,
}) => {
  const iconRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(offsetX, springConfig);
  const springY = useSpring(offsetY, springConfig);

  useEffect(() => {
    if (!iconRef.current || !containerRef.current || isMobile || isTouch)
      return;

    const updateGravity = () => {
      const iconRect = iconRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      const iconCenterX =
        iconRect.left + iconRect.width / 2 - containerRect.left;
      const iconCenterY =
        iconRect.top + iconRect.height / 2 - containerRect.top;

      const distanceX = mouseX.get() - iconCenterX;
      const distanceY = mouseY.get() - iconCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const maxDistance = 200; // Increased influence radius
      const maxOffset = 25; // Maximum offset amount

      if (distance < maxDistance && distance > 0) {
        // Quadratic falloff for smoother effect
        const force = Math.pow(1 - distance / maxDistance, 2);

        // Icons move TOWARDS the mouse (attraction)
        const gravityX = (distanceX / distance) * force * maxOffset;
        const gravityY = (distanceY / distance) * force * maxOffset;

        offsetX.set(gravityX);
        offsetY.set(gravityY);
      } else {
        offsetX.set(0);
        offsetY.set(0);
      }
    };

    const unsubscribeX = mouseX.on("change", updateGravity);
    const unsubscribeY = mouseY.on("change", updateGravity);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, offsetX, offsetY, containerRef, isMobile, isTouch]);

  return (
    <motion.a
      ref={iconRef}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
      aria-label={social.label}
      style={{
        "--social-color": social.color,
        x: springX,
        y: springY,
      }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.8 + index * 0.1,
        ease: "easeOut",
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        cursorInteraction.onMouseEnter();
        const rect = e.currentTarget.getBoundingClientRect();
        onParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        cursorInteraction.onMouseLeave();
      }}
    >
      <social.icon className={styles.socialIcon} />
      <span className={styles.tooltip}>{social.label}</span>
    </motion.a>
  );
};

export default Hero;
