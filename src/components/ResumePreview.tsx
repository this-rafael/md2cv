import { forwardRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react";

interface ResumePreviewProps {
  markdown: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ markdown }, ref) => {
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
      if (!isZoomed) return;

      const previousOverflow = document.body.style.overflow;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsZoomed(false);
        }
      };

      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [isZoomed]);

    const renderPreviewContent = () => (
      <AnimatePresence mode="wait">
        {markdown ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-gray-400"
          >
            <EyeOff className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">Nada para mostrar ainda</p>
            <p className="text-sm opacity-60">Comece a digitar no editor →</p>
          </motion.div>
        )}
      </AnimatePresence>
    );

    const renderHeader = (expanded = false) => (
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Eye className="w-4 h-4 text-neon-pink" />
        <span
          className="text-sm font-semibold"
          style={{ color: "hsl(330 85% 60%)" }}
        >
          Live Preview
        </span>
        {expanded && (
          <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70">
            Expandido
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {markdown.length > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green"
            >
              ● Ao vivo
            </motion.span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isZoomed ? "Minimizar preview" : "Maximizar preview"}
            title={isZoomed ? "Minimizar preview" : "Maximizar preview"}
          >
            {isZoomed ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </motion.button>
        </div>
      </div>
    );

    return (
      <>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col h-full"
        >
          {renderHeader()}

          <div className="flex-1 overflow-auto p-6">
            <motion.div
              ref={ref}
              className="resume-preview mx-auto max-w-[700px] rounded-lg p-8 shadow-xl transition-all duration-300"
            >
              {renderPreviewContent()}
            </motion.div>
          </div>
        </motion.div>

        {typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {isZoomed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[80] bg-black/60 p-4 backdrop-blur-sm"
                  onClick={() => setIsZoomed(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 24 }}
                    transition={{ duration: 0.2 }}
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Preview expandido"
                    className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
                  >
                    {renderHeader(true)}

                    <div className="flex-1 overflow-auto bg-background/40 p-4 sm:p-6 md:p-8">
                      <div className="resume-preview mx-auto min-h-full w-full max-w-[1100px] rounded-lg p-8 shadow-xl">
                        {renderPreviewContent()}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </>
    );
  },
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
