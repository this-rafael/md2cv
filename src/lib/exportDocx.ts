import { Document, Packer, Paragraph, TextRun, BorderStyle } from "docx";
import { saveAs } from "file-saver";

interface ParsedLine {
  type: "h1" | "h2" | "h3" | "p" | "li" | "hr" | "empty";
  text: string;
}

function parseMarkdownToLines(md: string): ParsedLine[] {
  const lines = md.split("\n");
  const parsed: ParsedLine[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      parsed.push({ type: "empty", text: "" });
    } else if (trimmed.startsWith("### ")) {
      parsed.push({ type: "h3", text: trimmed.replace("### ", "") });
    } else if (trimmed.startsWith("## ")) {
      parsed.push({ type: "h2", text: trimmed.replace("## ", "") });
    } else if (trimmed.startsWith("# ")) {
      parsed.push({ type: "h1", text: trimmed.replace("# ", "") });
    } else if (trimmed.startsWith("---")) {
      parsed.push({ type: "hr", text: "" });
    } else if (trimmed.startsWith("- ")) {
      parsed.push({ type: "li", text: trimmed.replace("- ", "") });
    } else {
      parsed.push({ type: "p", text: trimmed });
    }
  }

  return parsed;
}

function parseInlineFormatting(text: string): TextRun[] {
  const runs: TextRun[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|([^*]+))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      runs.push(
        new TextRun({ text: match[2], bold: true, font: "Georgia", size: 22 }),
      );
    } else if (match[3]) {
      runs.push(
        new TextRun({
          text: match[3],
          italics: true,
          font: "Georgia",
          size: 22,
          color: "555555",
        }),
      );
    } else if (match[4]) {
      const cleaned = match[4].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      runs.push(new TextRun({ text: cleaned, font: "Georgia", size: 22 }));
    }
  }

  if (runs.length === 0) {
    runs.push(new TextRun({ text, font: "Georgia", size: 22 }));
  }

  return runs;
}

export async function exportToDocx(markdown: string, filename = "resume.docx") {
  const lines = parseMarkdownToLines(markdown);
  const children: Paragraph[] = [];

  for (const line of lines) {
    switch (line.type) {
      case "h1":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.text,
                bold: true,
                font: "Georgia",
                size: 36,
                color: "111111",
              }),
            ],
            spacing: { after: 100 },
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 6,
                color: "333333",
                space: 4,
              },
            },
          }),
        );
        break;
      case "h2":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.text.toUpperCase(),
                bold: true,
                font: "Georgia",
                size: 24,
                color: "222222",
              }),
            ],
            spacing: { before: 240, after: 100 },
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: "CCCCCC",
                space: 2,
              },
            },
          }),
        );
        break;
      case "h3":
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line.text,
                bold: true,
                font: "Georgia",
                size: 22,
                color: "333333",
              }),
            ],
            spacing: { before: 160, after: 60 },
          }),
        );
        break;
      case "li":
        children.push(
          new Paragraph({
            children: parseInlineFormatting(line.text),
            bullet: { level: 0 },
            spacing: { after: 40 },
          }),
        );
        break;
      case "hr":
        children.push(
          new Paragraph({
            children: [],
            border: {
              bottom: {
                style: BorderStyle.SINGLE,
                size: 2,
                color: "DDDDDD",
                space: 4,
              },
            },
            spacing: { before: 200, after: 200 },
          }),
        );
        break;
      case "empty":
        break;
      default:
        children.push(
          new Paragraph({
            children: parseInlineFormatting(line.text),
            spacing: { after: 80 },
          }),
        );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
