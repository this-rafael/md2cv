import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import MarkdownEditor from "./MarkdownEditor";
import ResumePreview from "./ResumePreview";
import ActionBar from "./ActionBar";
import { sampleResume } from "../lib/sampleResume";
import { exportToPdf } from "../lib/exportPdf";
import { exportToDocx } from "../lib/exportDocx";

interface ResumeWorkspaceProps {
  onExportSuccess?: () => void;
}

export default function ResumeWorkspace({
  onExportSuccess,
}: ResumeWorkspaceProps) {
  const [markdown, setMarkdown] = useState(sampleResume);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    await exportToPdf(previewRef.current);
    onExportSuccess?.();
  }, [onExportSuccess]);

  const handleExportDocx = useCallback(async () => {
    await exportToDocx(markdown);
    onExportSuccess?.();
  }, [markdown, onExportSuccess]);

  const handleClear = useCallback(() => setMarkdown(""), []);
  const handleLoadExample = useCallback(() => setMarkdown(sampleResume), []);

  return (
    <section id="workspace" className="relative px-4 py-12 max-w-7xl mx-auto">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          <span className="gradient-text-rainbow">Seu Workspace</span>{" "}
          <span className="inline-block animate-bounce-subtle">🎨</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Escreva Markdown na esquerda, veja seu currículo ganhar vida na
          direita.
        </p>
      </motion.div>

      {/* Action bar */}
      <div className="mb-6 flex justify-center">
        <ActionBar
          onExportPdf={handleExportPdf}
          onExportDocx={handleExportDocx}
          onClear={handleClear}
          onLoadExample={handleLoadExample}
        />
      </div>

      {/* Editor + Preview split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
        {/* Editor panel */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl lg:rounded-r-none overflow-hidden min-h-[500px] lg:min-h-[700px] glow-sm hover:glow-md transition-shadow duration-500"
        >
          <MarkdownEditor value={markdown} onChange={setMarkdown} />
        </motion.div>

        {/* Preview panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-strong rounded-2xl lg:rounded-l-none overflow-hidden min-h-[500px] lg:min-h-[700px] border-l-0 lg:border-l border-border hover:glow-md transition-shadow duration-500"
        >
          <ResumePreview ref={previewRef} markdown={markdown} />
        </motion.div>
      </div>

      {/* Fun tip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6 text-muted-foreground/50 text-sm"
      >
        💡 Dica: Use{" "}
        <code className="editor-font text-neon-purple/70 text-xs px-1 py-0.5 rounded bg-white/5">
          **texto**
        </code>{" "}
        para negrito e{" "}
        <code className="editor-font text-neon-purple/70 text-xs px-1 py-0.5 rounded bg-white/5">
          *texto*
        </code>{" "}
        para itálico
      </motion.div>
    </section>
  );
}
