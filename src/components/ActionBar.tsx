import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  FileDown,
  Trash2,
  BookOpen,
  Loader2,
  PartyPopper,
  RotateCcw,
} from "lucide-react";

interface ActionBarProps {
  onExportPdf: () => Promise<void>;
  onExportDocx: () => Promise<void>;
  onClear: () => void;
  onLoadExample: () => void;
}

export default function ActionBar({
  onExportPdf,
  onExportDocx,
  onClear,
  onLoadExample,
}: ActionBarProps) {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [justExported, setJustExported] = useState<string | null>(null);

  const handlePdf = async () => {
    setLoadingPdf(true);
    try {
      await onExportPdf();
      setJustExported("pdf");
      setTimeout(() => setJustExported(null), 2000);
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDocx = async () => {
    setLoadingDocx(true);
    try {
      await onExportDocx();
      setJustExported("docx");
      setTimeout(() => setJustExported(null), 2000);
    } finally {
      setLoadingDocx(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap items-center gap-3 p-4 glass-strong rounded-2xl glow-sm"
    >
      {/* Export PDF */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePdf}
        disabled={loadingPdf}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 cursor-pointer"
        style={{ background: "var(--gradient-primary)" }}
      >
        {loadingPdf ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : justExported === "pdf" ? (
          <PartyPopper className="w-4 h-4 text-white" />
        ) : (
          <FileText className="w-4 h-4 text-white group-hover:animate-wiggle" />
        )}
        <span className="text-white">
          {justExported === "pdf" ? "Exportado! 🎉" : "Export PDF"}
        </span>
      </motion.button>

      {/* Export DOCX */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDocx}
        disabled={loadingDocx}
        className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 cursor-pointer"
        style={{ background: "var(--gradient-accent)" }}
      >
        {loadingDocx ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : justExported === "docx" ? (
          <PartyPopper className="w-4 h-4 text-white" />
        ) : (
          <FileDown className="w-4 h-4 text-white group-hover:animate-wiggle" />
        )}
        <span className="text-white">
          {justExported === "docx" ? "Exportado! 🎉" : "Export DOCX"}
        </span>
      </motion.button>

      <div className="hidden sm:block w-px h-8 bg-border" />

      {/* Load Example */}
      <motion.button
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoadExample}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm glass transition-all duration-300 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <BookOpen className="w-4 h-4 group-hover:animate-wiggle" />
        <span>Exemplo</span>
      </motion.button>

      {/* Clear */}
      <motion.button
        whileHover={{ scale: 1.08, rotate: 5 }}
        whileTap={{ scale: 0.95, rotate: -5 }}
        onClick={onClear}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm glass transition-all duration-300 text-muted-foreground hover:text-red-400 cursor-pointer"
      >
        <Trash2 className="w-4 h-4 group-hover:animate-wiggle" />
        <span>Limpar</span>
      </motion.button>
    </motion.div>
  );
}
