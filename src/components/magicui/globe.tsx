"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

// Professional education globe configuration
const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0.85, // Dark professional background
  diffuse: 0.9,
  mapSamples: 50000, // More samples for sharper details
  mapBrightness: 2.5, // More visible continent details
  baseColor: [0.15, 0.4, 0.8], // Rich corporate blue
  markerColor: [1, 1, 1], // Pure white markers
  glowColor: [0.2, 0.5, 0.8], // Subtle blue glow
  markers: [
    // Major tech education hubs
    { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
    { location: [40.7128, -74.006], size: 0.06 }, // New York
    { location: [51.5074, -0.1278], size: 0.06 }, // London
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
    { location: [35.7595, 51.4245], size: 0.06 }, // Tehran
    { location: [30.0444, 31.2357], size: 0.06 }, // Cairo
    { location: [19.0760, 72.8777], size: 0.06 }, // Mumbai
    { location: [55.7558, 37.6173], size: 0.06 }, // Moscow
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [39.9042, 116.4074], size: 0.06 }, // Beijing
    // Professional grid patterns
    // Subtle equator line
    ...[...Array(36)].map((_, i) => ({
      location: [0, (i * 10) - 180] as [number, number],
      size: 0.01,
    })),
    // Subtle longitude lines - more detailed
    ...[...Array(18)].map((_, i) => ({
      location: [(i * 10) - 90, 0] as [number, number],
      size: 0.01,
    })),
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 80,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        // Very smooth, slow rotation for an elegant look
        if (!pointerInteracting.current) phi += 0.0015;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Main globe */}
      <div className="absolute inset-0 mx-auto aspect-[1/1] w-full">
        <canvas
          className={cn(
            "size-full opacity-0 transition-opacity duration-700",
          )}
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          }}
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>
      
      {/* Professional reflection effect */}
      <div className="absolute left-0 right-0 bottom-0 h-1/3 bg-gradient-to-t from-blue-900/20 to-transparent transform scale-y-[-1] opacity-30 blur-sm" />
    </div>
  );
}
