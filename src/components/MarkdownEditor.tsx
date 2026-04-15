import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Hash,
  Bold,
  Italic,
  List,
  Minus,
  Link2,
  Type,
} from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const toolbarActions = [
  { icon: Hash, label: "H1", insert: "# " },
  { icon: Type, label: "H2", insert: "## " },
  { icon: Bold, label: "Bold", insert: "****", cursorOffset: -2 },
  { icon: Italic, label: "Italic", insert: "**", cursorOffset: -1 },
  { icon: List, label: "List", insert: "- " },
  { icon: Minus, label: "HR", insert: "\n---\n" },
  { icon: Link2, label: "Link", insert: "[text](url)", cursorOffset: -5 },
];

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(1);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setLineCount(value.split("\n").length);
    setCharCount(value.length);
  }, [value]);

  const handleTab = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue =
          value.substring(0, start) + "  " + value.substring(end);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    },
    [value, onChange],
  );

  const insertMarkdown = useCallback(
    (insert: string, cursorOffset?: number) => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue =
        value.substring(0, start) + insert + value.substring(end);
      onChange(newValue);
      setTimeout(() => {
        const newPos = start + insert.length + (cursorOffset ?? 0);
        textarea.selectionStart = textarea.selectionEnd = newPos;
        textarea.focus();
      }, 0);
    },
    [value, onChange],
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-col h-full"
    >
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Code2 className="w-4 h-4 text-neon-purple" />
        <span className="text-sm font-semibold gradient-text-primary">
          Markdown Editor
        </span>
        <div className="ml-auto flex gap-1.5">
          <motion.div
            whileHover={{ scale: 1.3 }}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ background: "hsl(0 70% 55%)" }}
          />
          <motion.div
            whileHover={{ scale: 1.3 }}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ background: "hsl(45 80% 55%)" }}
          />
          <motion.div
            whileHover={{ scale: 1.3 }}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ background: "hsl(130 50% 45%)" }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border/50 overflow-x-auto">
        {toolbarActions.map(({ icon: Icon, label, insert, cursorOffset }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => insertMarkdown(insert, cursorOffset)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            title={label}
          >
            <Icon className="w-3.5 h-3.5" />
          </motion.button>
        ))}
        <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground/60">
          <span>{lineCount} linhas</span>
          <span>{charCount} chars</span>
        </div>
      </div>

      {/* Editor area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleTab}
        className="flex-1 w-full p-4 bg-transparent text-foreground editor-font text-sm leading-relaxed resize-none outline-none placeholder:text-muted-foreground/40"
        placeholder="Comece a escrever seu currículo em Markdown... ✍️"
        spellCheck={false}
      />
    </motion.div>
  );
}
