import { useEffect, useRef } from "react";

/**
 * Enhanced background with morphing orbs + drifting particles + mouse-reactive glow
 */
export default function BackgroundOrbs() {
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.left = `${e.clientX - 150}px`;
        mouseGlowRef.current.style.top = `${e.clientY - 150}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large purple morphing orb */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] animate-morph animate-float opacity-30 blur-[100px]"
        style={{ background: "hsl(265 90% 65%)" }}
      />
      {/* Blue orb */}
      <div
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] animate-morph animate-float-delay opacity-25 blur-[80px]"
        style={{ background: "hsl(220 90% 60%)", animationDelay: "2s" }}
      />
      {/* Pink orb */}
      <div
        className="absolute bottom-20 left-1/4 w-[350px] h-[350px] animate-morph animate-float-delay-2 opacity-20 blur-[90px]"
        style={{ background: "hsl(330 85% 60%)", animationDelay: "4s" }}
      />
      {/* Coral orb */}
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] animate-pulse-glow opacity-15 blur-[70px]"
        style={{ background: "hsl(15 90% 60%)" }}
      />
      {/* NEW: Green orb */}
      <div
        className="absolute top-[10%] left-[60%] w-[200px] h-[200px] animate-morph animate-float opacity-10 blur-[60px]"
        style={{ background: "hsl(150 80% 50%)", animationDelay: "6s" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-particle-drift"
          style={{
            background: `hsl(${(i * 50) % 360} 80% 65%)`,
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${8 + (i % 5) * 2}s`,
            opacity: 0.3 + (i % 3) * 0.1,
          }}
        />
      ))}

      {/* Mouse-reactive glow */}
      <div
        ref={mouseGlowRef}
        className="w-[300px] h-[300px] rounded-full blur-[120px] opacity-10 transition-all duration-300 ease-out"
        style={{ background: "var(--gradient-hero)", position: "fixed" }}
      />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
