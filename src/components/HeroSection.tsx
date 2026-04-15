import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  FileText,
  Wand2,
  Rocket,
  Zap,
} from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const funPhrases = [
  "Crie seu currículo",
  "Markdown → Currículo lindo",
  "Exporte PDF & DOCX em 1 clique",
  "Simples e Rapido",
];

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % funPhrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge — animated rotating text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 glow-sm"
        >
          <Sparkles className="w-4 h-4 text-neon-yellow animate-spin-slow" />
          <motion.span
            key={phraseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm font-medium text-muted-foreground"
          >
            {funPhrases[phraseIndex]}
          </motion.span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
        >
          <span className="gradient-text-rainbow">Craft Your</span>
          <br />
          <span className="text-foreground">Dream Resume</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Escreva em Markdown. Preview em tempo real. Exporte como PDF ou DOCX.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={onGetStarted}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden cursor-pointer"
            style={{ background: "var(--gradient-hero)" }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              <motion.span
                animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Rocket className="w-5 h-5" />
              </motion.span>
              Começar Agora!
            </span>
            <div className="absolute inset-0 shimmer-overlay" />
          </motion.button>

          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -3 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-muted-foreground cursor-default"
            >
              <FileText className="w-4 h-4 text-neon-blue" />
              <span className="text-sm font-medium">PDF</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-muted-foreground cursor-default"
            >
              <FileText className="w-4 h-4 text-neon-pink" />
              <span className="text-sm font-medium">DOCX</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Fun stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex justify-center gap-8 text-muted-foreground"
        >
          {[
            { icon: Zap, label: "Tempo real", color: "text-neon-yellow" },
            { icon: Rocket, label: "Zero config", color: "text-neon-coral" },
            { icon: Sparkles, label: "Delightful", color: "text-neon-green" },
          ].map(({ icon: Icon, label, color }) => (
            <motion.div
              key={label}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center gap-1"
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-xs font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16"
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground mx-auto" />
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-3 h-3 rounded-full opacity-60"
        style={{ background: "hsl(265 90% 65%)" }}
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-16 w-2 h-2 rounded-full opacity-50"
        style={{ background: "hsl(330 85% 60%)" }}
      />
      <motion.div
        animate={{ y: [0, -25, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-8 w-4 h-4 rounded-full opacity-40"
        style={{ background: "hsl(220 90% 60%)" }}
      />
      {/* Fun emoji floaters */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 20, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] text-2xl opacity-40 select-none"
      >
        📝
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -15, 15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] right-[25%] text-2xl opacity-30 select-none"
      >
        🚀
      </motion.div>
    </section>
  );
}
