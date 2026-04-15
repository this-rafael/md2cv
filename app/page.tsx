"use client";

import BackgroundOrbs from "../src/components/BackgroundOrbs";
import HeroSection from "../src/components/HeroSection";
import ResumeWorkspace from "../src/components/ResumeWorkspace";
import Confetti from "../src/components/Confetti";
import { useState, useCallback } from "react";

export default function HomePage() {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGetStarted = useCallback(() => {
    document
      .getElementById("workspace")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <BackgroundOrbs />
      {showConfetti && <Confetti />}
      <div className="relative z-10">
        <HeroSection onGetStarted={handleGetStarted} />
        <ResumeWorkspace onExportSuccess={triggerConfetti} />
        <footer className="text-center py-12 text-muted-foreground text-sm">
          <p className="gradient-text font-medium text-lg tracking-wide">
            Feito com muito café ☕
          </p>
        </footer>
      </div>
    </div>
  );
}
