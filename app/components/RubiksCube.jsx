"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";

const AMBER = "#D4A574";
const BLACK = "#252220"; // dark warm brown (v2 surface color)

const SIZE = 0.92;
const GAP = 0.06;
const SPACING = SIZE + GAP;
const STICKER_INSET = 0.05;   // Just enough to clear the rounded edge
const STICKER_THICKNESS = 0.01;
const STICKER_SIZE = SIZE - STICKER_INSET * 2;

const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

// Strong deceleration for assembly — fast snap then gentle settle
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

// How far each cubelet starts from its grid position (exploded outward)
const EXPLODE_DISTANCE = 8;
// How long the assembly takes in seconds
const ASSEMBLY_DURATION = 3.0;
// Delay before assembly begins (matches Framer Motion container fade delay)
const ASSEMBLY_DELAY = 2.5;

const blackMaterial = new THREE.MeshStandardMaterial({
  color: BLACK,
  roughness: 0.3,
  metalness: 0.1,
});

const amberMaterial = new THREE.MeshPhysicalMaterial({
  color: AMBER,
  roughness: 0.3,
  metalness: 0.5,
  clearcoat: 0.6,
  clearcoatRoughness: 0.15,
  reflectivity: 0.7,
  emissive: AMBER,
  emissiveIntensity: 0.22,
});

// Amber pattern — each entry: cubelet position → which face gets amber
// Face: "+x" | "-x" | "+y" | "-y" | "+z" | "-z"
const AMBER_MAP = {
  // Front face (+Z, z=1) — 3 amber
  "0,1,1": "+z",
  "-1,0,1": "+z",
  "1,-1,1": "+z",

  // Right face (+X, x=1) — 2 amber
  "1,1,-1": "+x",
  "1,0,0": "+x",

  // Top face (+Y, y=1) — 2 amber
  "0,1,0": "+y",
  "-1,1,-1": "+y",

  // Back face (-Z, z=-1) — 3 amber
  "0,1,-1": "-z",
  "-1,0,-1": "-z",
  "1,-1,-1": "-z",

  // Left face (-X, x=-1) — 2 amber
  "-1,0,0": "-x",
  "-1,-1,0": "-x",

  // Bottom face (-Y, y=-1) — 2 amber
  "-1,-1,-1": "-y",
  "0,-1,0": "-y",
};

// Sticker position offset and rotation for each face direction
const FACE_CONFIG = {
  "+x": { position: [SIZE / 2 + STICKER_THICKNESS / 2, 0, 0], rotation: [0, Math.PI / 2, 0] },
  "-x": { position: [-SIZE / 2 - STICKER_THICKNESS / 2, 0, 0], rotation: [0, -Math.PI / 2, 0] },
  "+y": { position: [0, SIZE / 2 + STICKER_THICKNESS / 2, 0], rotation: [-Math.PI / 2, 0, 0] },
  "-y": { position: [0, -SIZE / 2 - STICKER_THICKNESS / 2, 0], rotation: [Math.PI / 2, 0, 0] },
  "+z": { position: [0, 0, SIZE / 2 + STICKER_THICKNESS / 2], rotation: [0, 0, 0] },
  "-z": { position: [0, 0, -SIZE / 2 - STICKER_THICKNESS / 2], rotation: [0, Math.PI, 0] },
};

function Cubelet({ initialX, initialY, initialZ, animRef, stateRef, assemblyRef }) {
  const groupRef = useRef();
  const id = `${initialX}_${initialY}_${initialZ}`;
  const key = `${initialX},${initialY},${initialZ}`;
  const amberFace = AMBER_MAP[key] || null;

  // Per-cubelet material clones so we can fade opacity independently
  const localMaterials = useMemo(() => {
    const black = blackMaterial.clone();
    black.transparent = true;
    black.opacity = 0;
    const amber = amberFace ? amberMaterial.clone() : null;
    if (amber) {
      amber.transparent = true;
      amber.opacity = 0;
    }
    return { black, amber };
  }, [amberFace]);

  // Compute a stable scattered start position (exploded outward along grid direction)
  const scatterData = useMemo(() => {
    const dir = new THREE.Vector3(initialX, initialY, initialZ);
    // Center cubelet (0,0,0) gets a random direction
    if (dir.length() === 0) dir.set(0.5, 0.8, 0.3);
    dir.normalize();
    const startPos = dir.multiplyScalar(EXPLODE_DISTANCE);
    // Random tumble axis and amount for each cubelet
    const tumbleAxis = new THREE.Vector3(
      Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5
    ).normalize();
    const tumbleAmount = Math.PI * (1.5 + Math.random() * 1.5); // 1.5-3 full rotations
    return { startPos, tumbleAxis, tumbleAmount };
  }, [initialX, initialY, initialZ]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    const s = stateRef.current[id];
    const anim = animRef.current;
    const assembly = assemblyRef.current;

    const basePos = new THREE.Vector3(
      s.gx * SPACING, s.gy * SPACING, s.gz * SPACING,
    );

    // During assembly: lerp from scattered position to grid position
    if (assembly.progress < 1) {
      const t = easeOutQuint(assembly.progress);
      // Fade in during first 30% of assembly progress
      const fadeT = Math.min(assembly.progress / 0.3, 1);
      localMaterials.black.opacity = fadeT;
      if (localMaterials.amber) localMaterials.amber.opacity = fadeT;

      const pos = new THREE.Vector3().lerpVectors(scatterData.startPos, basePos, t);
      group.position.copy(pos);
      // Tumble rotation that settles to identity
      const remainingAngle = scatterData.tumbleAmount * (1 - t);
      const tumbleQuat = new THREE.Quaternion().setFromAxisAngle(scatterData.tumbleAxis, remainingAngle);
      group.quaternion.copy(tumbleQuat);
      return;
    }

    // Ensure fully opaque after assembly
    if (localMaterials.black.opacity < 1) {
      localMaterials.black.opacity = 1;
      localMaterials.black.transparent = false;
      if (localMaterials.amber) {
        localMaterials.amber.opacity = 1;
        localMaterials.amber.transparent = false;
      }
    }

    if (!anim.isAnimating) {
      group.position.copy(basePos);
      group.quaternion.copy(s.quat);
      return;
    }

    const coord = anim.axis === "x" ? s.gx : anim.axis === "y" ? s.gy : s.gz;
    if (Math.round(coord) !== anim.layerIndex) {
      group.position.copy(basePos);
      group.quaternion.copy(s.quat);
      return;
    }

    const angle = easeInOutQuart(anim.progress) * (Math.PI / 2) * anim.direction;
    const axisVec = anim.axis === "x" ? new THREE.Vector3(1, 0, 0)
      : anim.axis === "y" ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(0, 0, 1);
    const animQuat = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);
    group.position.copy(basePos.clone().applyQuaternion(animQuat));
    group.quaternion.multiplyQuaternions(animQuat, s.quat);
  });

  const stickerConfig = amberFace ? FACE_CONFIG[amberFace] : null;

  return (
    <group ref={groupRef}>
      {/* Black base cube */}
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={0.07} smoothness={4} material={localMaterials.black} />

      {/* Amber sticker — plane on one face */}
      {stickerConfig && localMaterials.amber && (
        <mesh
          position={stickerConfig.position}
          rotation={stickerConfig.rotation}
          material={localMaterials.amber}
        >
          <planeGeometry args={[STICKER_SIZE, STICKER_SIZE]} />
        </mesh>
      )}
    </group>
  );
}

// Reference viewport: 16" MacBook Pro "More Space" fullscreen Chrome
const REF_HEIGHT = 1117;
const REF_FOV = 26; // matches camera fov

function AdaptiveFOV() {
  const { camera, size } = useThree();
  // Run every frame to guarantee consistent sizing
  useFrame(() => {
    const targetFov = REF_FOV * (REF_HEIGHT / size.height);
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

const CUBE_LAYOUTS = [
  { maxWidth: 767, position: [3.0, -0.95, 0], scale: 1.3 },
  { maxWidth: 1200, position: [5.0, 2.05, 0], scale: 1.3 },
  { maxWidth: Infinity, position: [5.9, 1.8, 0], scale: 1.0 },
];

function useCubeLayout() {
  const [layout, setLayout] = useState(CUBE_LAYOUTS[CUBE_LAYOUTS.length - 1]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const match = CUBE_LAYOUTS.find((bp) => w <= bp.maxWidth);
      setLayout(match || CUBE_LAYOUTS[CUBE_LAYOUTS.length - 1]);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

function CubeScene() {
  const groupRef = useRef();
  const layout = useCubeLayout();

  const assemblyRef = useRef({ progress: 0, elapsed: 0, timeSinceDone: 0 });

  const stateRef = useRef({});
  const cubelets = useMemo(() => {
    const list = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const id = `${x}_${y}_${z}`;
          list.push({ id, x, y, z });
          stateRef.current[id] = { gx: x, gy: y, gz: z, quat: new THREE.Quaternion() };
        }
      }
    }
    return list;
  }, []);

  const animRef = useRef({
    isAnimating: false,
    axis: null,
    layerIndex: 0,
    direction: 1,
    progress: 0,
    speed: 0.008,
    pauseTimer: 0,
    pauseDuration: 1.5,
  });

  const commitMove = useCallback(() => {
    const anim = animRef.current;
    const angle = (Math.PI / 2) * anim.direction;
    const axisVec = anim.axis === "x" ? new THREE.Vector3(1, 0, 0)
      : anim.axis === "y" ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(0, 0, 1);
    const rotQuat = new THREE.Quaternion().setFromAxisAngle(axisVec, angle);

    Object.values(stateRef.current).forEach((s) => {
      const coord = anim.axis === "x" ? s.gx : anim.axis === "y" ? s.gy : s.gz;
      if (Math.round(coord) !== anim.layerIndex) return;
      const pos = new THREE.Vector3(s.gx, s.gy, s.gz);
      pos.applyQuaternion(rotQuat);
      s.gx = Math.round(pos.x);
      s.gy = Math.round(pos.y);
      s.gz = Math.round(pos.z);
      s.quat.premultiply(rotQuat);
    });
  }, []);

  const pickNextMove = useCallback(() => {
    const axes = ["x", "y", "z"];
    const layers = [-1, 0, 1];
    const directions = [1, -1];
    const anim = animRef.current;
    anim.axis = axes[Math.floor(Math.random() * axes.length)];
    anim.layerIndex = layers[Math.floor(Math.random() * layers.length)];
    anim.direction = directions[Math.floor(Math.random() * directions.length)];
    anim.progress = 0;
    anim.isAnimating = true;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Advance assembly (wait for delay before starting)
    const assembly = assemblyRef.current;
    if (assembly.progress < 1) {
      assembly.elapsed += delta;
      const activeTime = Math.max(0, assembly.elapsed - ASSEMBLY_DELAY);
      assembly.progress = Math.min(activeTime / ASSEMBLY_DURATION, 1);
      // Slow rotation during assembly
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = 0.15;
      return; // Don't shuffle during assembly
    }

    // Smooth transition from assembly speed to normal speed over 1.5s
    assembly.timeSinceDone += delta;
    const blend = Math.min(assembly.timeSinceDone / 1.5, 1);
    const rotSpeed = 0.05 + blend * 0.05; // 0.05 → 0.1
    const xTilt = blend * (Math.sin(assembly.timeSinceDone * 0.15) * 0.03);
    groupRef.current.rotation.y += delta * rotSpeed;
    groupRef.current.rotation.x = 0.15 + xTilt;

    const anim = animRef.current;
    if (!anim.isAnimating) {
      anim.pauseTimer += delta;
      if (anim.pauseTimer >= anim.pauseDuration) {
        anim.pauseTimer = 0;
        pickNextMove();
      }
      return;
    }
    anim.progress = Math.min(anim.progress + delta * 0.5, 1);
    if (anim.progress >= 1) {
      commitMove();
      anim.isAnimating = false;
      anim.pauseDuration = 0.8 + Math.random() * 1.2;
    }
  });

  return (
    <group ref={groupRef} position={layout.position} rotation={[0.2, -0.8, 0]} scale={layout.scale}>
      {cubelets.map((c) => (
        <Cubelet
          key={c.id}
          initialX={c.x}
          initialY={c.y}
          initialZ={c.z}
          animRef={animRef}
          stateRef={stateRef}
          assemblyRef={assemblyRef}
        />
      ))}
    </group>
  );
}

export default function RubiksCube({ className, style }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause the render loop when the cube is scrolled out of view
  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div ref={containerRef} className={className} style={{ ...style, background: "transparent" }} />;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: "relative",
      }}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [10, 6, 10], fov: 26 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        {/* Warm ambient base */}
        <ambientLight intensity={0.2} color="#E0B88A" />
        {/* Key — camera-aligned, reduced to tame top face */}
        <directionalLight position={[7, 1, 9]} intensity={1.2} color="#D4A574" />
        {/* Hero light — golden beam from bottom-left of screen */}
        <directionalLight position={[-8, -5, 6]} intensity={2.5} color="#D4A574" />
        {/* Dim fill — left side, keeps geometry readable */}
        <directionalLight position={[-4, 0, 3]} intensity={0.3} color="#C4956A" />
        {/* Soft rim — back edge separation, tinted warm */}
        <directionalLight position={[-2, 2, -5]} intensity={0.5} color="#E0B88A" />
        {/* Amber env map — lifts all faces so cube reads as 3D */}
        <Environment background={false} environmentIntensity={0.55}>
          <color attach="background" args={["#1a1008"]} />
          <ambientLight intensity={0.6} color="#D4A574" />
          <directionalLight position={[-8, -5, 6]} intensity={0.4} color="#D4A574" />
        </Environment>
        <AdaptiveFOV />
        <CubeScene />
      </Canvas>
    </div>
  );
}
