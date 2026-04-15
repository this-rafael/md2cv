const A4_PAGE_WIDTH_MM = 210;
const A4_PAGE_HEIGHT_MM = 297;
const A4_MARGIN_MM = 12;
const CONTENT_WIDTH_MM = A4_PAGE_WIDTH_MM - A4_MARGIN_MM * 2;
const CONTENT_HEIGHT_MM = A4_PAGE_HEIGHT_MM - A4_MARGIN_MM * 2;
const CANVAS_SCALE = 2;

/**
 * Collects canvas-pixel Y positions where it is safe to start a new page.
 *
 * A cut is safe when it lands BEFORE an independent block, not in the middle
 * of one. We use the tops of:
 *   - h2 elements  → new major section (Experiência, Projetos…)
 *   - h3 elements  → new job entry (heading + date + bullets travel together)
 *   - li elements  → individual bullet points (can be split between pages)
 *
 * We intentionally exclude paragraph tops so that a date-line paragraph is
 * never orphaned from its preceding h3 heading.
 */
function getSafeCutPoints(container: HTMLElement): number[] {
  const containerTop = container.getBoundingClientRect().top;
  const pts = new Set<number>([0]);

  container.querySelectorAll("h2, h3, li").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.height === 0) return;
    pts.add(Math.round((r.top - containerTop) * CANVAS_SCALE));
  });

  return Array.from(pts).sort((a, b) => a - b);
}

function createExportRoot(element: HTMLElement) {
  const measuredWidthPx = Math.max(
    Math.ceil(element.getBoundingClientRect().width),
    element.scrollWidth,
    700,
  );

  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  host.style.width = `${measuredWidthPx}px`;
  host.style.padding = "0";
  host.style.opacity = "0";
  host.style.pointerEvents = "none";
  host.style.background = "#ffffff";
  host.setAttribute("aria-hidden", "true");

  const style = document.createElement("style");
  style.textContent = `
    .pdf-export-root {
      width: ${measuredWidthPx}px !important;
      max-width: none !important;
      margin: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      background: #ffffff !important;
      color: #1a1a1a !important;
      transform: none !important;
    }

    .pdf-export-root,
    .pdf-export-root * {
      animation: none !important;
      transition: none !important;
    }

    .pdf-export-root h1,
    .pdf-export-root h2,
    .pdf-export-root h3,
    .pdf-export-root hr {
      break-after: avoid-page;
      page-break-after: avoid;
    }

    .pdf-export-root p,
    .pdf-export-root ul,
    .pdf-export-root li {
      break-inside: avoid-page;
      page-break-inside: avoid;
    }
  `;

  const clonedElement = element.cloneNode(true) as HTMLElement;
  clonedElement.classList.add("pdf-export-root");

  host.append(style, clonedElement);
  document.body.appendChild(host);

  return {
    host,
    clonedElement,
    measuredWidthPx,
  };
}

export async function exportToPdf(
  element: HTMLElement,
  filename = "resume.pdf",
) {
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  try {
    await document.fonts?.ready;
  } catch {
    // Continue even if custom web fonts are unavailable.
  }

  const { host, clonedElement, measuredWidthPx } = createExportRoot(element);

  try {
    await new Promise((resolve) =>
      window.requestAnimationFrame(() => resolve(null)),
    );

    // Measure safe cut points BEFORE html2canvas captures the layout.
    const safeCutPoints = getSafeCutPoints(clonedElement);

    const canvas = await html2canvas(clonedElement, {
      backgroundColor: "#ffffff",
      imageTimeout: 0,
      logging: false,
      scale: CANVAS_SCALE,
      useCORS: true,
      width: measuredWidthPx,
      windowWidth: measuredWidthPx,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageHeightPx = Math.floor(
      (canvas.width * CONTENT_HEIGHT_MM) / CONTENT_WIDTH_MM,
    );

    let renderedHeightPx = 0;
    let pageIndex = 0;

    while (renderedHeightPx < canvas.height) {
      if (pageIndex > 0) {
        pdf.addPage("a4", "portrait");
      }

      const idealCut = renderedHeightPx + pageHeightPx;

      // Pick the largest safe cut point that fits within this page.
      // Falls back to the ideal cut when no boundary fits (e.g. element taller than a page).
      let actualCut: number;
      if (idealCut >= canvas.height) {
        actualCut = canvas.height;
      } else {
        const safeCut = safeCutPoints
          .filter((p) => p > renderedHeightPx && p <= idealCut)
          .pop();
        actualCut = safeCut ?? idealCut;
      }
      const sliceHeightPx = actualCut - renderedHeightPx;
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;

      const context = pageCanvas.getContext("2d");
      if (!context) {
        throw new Error("Nao foi possivel gerar o canvas do PDF.");
      }

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(
        canvas,
        0,
        renderedHeightPx,
        canvas.width,
        sliceHeightPx,
        0,
        0,
        canvas.width,
        sliceHeightPx,
      );

      const imageHeightMm = (sliceHeightPx * CONTENT_WIDTH_MM) / canvas.width;
      pdf.addImage(
        pageCanvas.toDataURL("image/png"),
        "PNG",
        A4_MARGIN_MM,
        A4_MARGIN_MM,
        CONTENT_WIDTH_MM,
        imageHeightMm,
        undefined,
        "FAST",
      );

      renderedHeightPx = actualCut;
      pageIndex += 1;
    }

    pdf.save(filename);
  } finally {
    host.remove();
  }
}
