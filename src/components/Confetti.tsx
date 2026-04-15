import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  rotation: number;
}

const COLORS = [
  "hsl(265 90% 65%)",
  "hsl(220 90% 60%)",
  "hsl(330 85% 60%)",
  "hsl(15 90% 60%)",
  "hsl(150 80% 50%)",
  "hsl(50 95% 60%)",
  "#fff",
];

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }).map(
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
      }),
    );
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            background: piece.color,
            borderRadius: "2px",
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
