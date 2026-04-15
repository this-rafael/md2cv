import { forwardRef, useState } from "react";
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

    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col h-full"
      >
        {/* Preview header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Eye className="w-4 h-4 text-neon-pink" />
          <span
            className="text-sm font-semibold"
            style={{ color: "hsl(330 85% 60%)" }}
          >
            Live Preview
          </span>
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
            >
              {isZoomed ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-auto p-6">
          <motion.div
            ref={ref}
            layout
            className={`resume-preview mx-auto p-8 rounded-lg shadow-xl transition-all duration-300 ${
              isZoomed ? "max-w-[900px] scale-100" : "max-w-[700px]"
            }`}
          >
            <AnimatePresence mode="wait">
              {markdown ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
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
                  <p className="text-sm opacity-60">
                    Comece a digitar no editor →
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    );
  },
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
