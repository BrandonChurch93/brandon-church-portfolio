"use client";

import { useEffect, useRef, useState } from "react";

const VantaGlobe = ({ className = "" }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      // Create script elements for Three.js and Vanta
      const threeScript = document.createElement("script");
      threeScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.async = true;

      const vantaScript = document.createElement("script");
      vantaScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js";
      vantaScript.async = true;

      // Load scripts in order
      threeScript.onload = () => {
        document.head.appendChild(vantaScript);
      };

      vantaScript.onload = () => {
        if (window.VANTA && vantaRef.current) {
          const effect = window.VANTA.GLOBE({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x23153c, // Deep purple background
            color: 0xff3f81, // Pink/magenta primary color
            color2: 0xffffff, // White secondary color
            points: 10.0,
            maxDistance: 20.0,
            spacing: 15.0,
            showDots: true,
            size: 0.7, // Smaller globe size as requested
          });
          setVantaEffect(effect);
        }
      };

      document.head.appendChild(threeScript);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className={`vanta-container ${className}`}>
      {/* This will be the Vanta background */}
    </div>
  );
};

export default VantaGlobe;
