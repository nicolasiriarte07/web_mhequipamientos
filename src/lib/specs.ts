export function parseSpecLines(descripcion: string): string[] {
  const byLine = descripcion
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s|•\-–.]+/, "").trim())
    .filter(Boolean);

  // Si la descripción viene como un solo párrafo (sin saltos de línea ni
  // viñetas cargadas a mano en Supabase), la partimos por oraciones para
  // no mostrar un único bloque de texto gigante e ilegible.
  if (byLine.length > 1) return byLine;

  const paragraph = byLine[0];
  if (!paragraph) return [];

  return paragraph
    .split(/(?<=[.;])\s+(?=[A-ZÁÉÍÓÚÑ])/)
    .map((sentence) => sentence.replace(/[.;]\s*$/, "").trim())
    .filter(Boolean);
}

export type ProductContent = {
  description: string | null;
  specLines: string[];
  idealPara: string[];
};

const SPECS_MARKER_RE = /especificaciones\s*:\s*/i;
const DESCRIPTION_PREFIX_RE = /^descripci[oó]n\s*:\s*/i;
const IDEAL_PARA_RE = /^ideal\s+para\s*:\s*/i;

// Separa de las líneas de especificaciones la que arranca con
// "Ideal para: ..." (si está), para mostrarla en su propio bloque con
// íconos en vez de como una viñeta técnica más.
function extractIdealPara(specLines: string[]): { specLines: string[]; idealPara: string[] } {
  const idealLine = specLines.find((line) => IDEAL_PARA_RE.test(line));
  if (!idealLine) return { specLines, idealPara: [] };

  const idealPara = idealLine
    .replace(IDEAL_PARA_RE, "")
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  return {
    specLines: specLines.filter((line) => line !== idealLine),
    idealPara,
  };
}

// Si en Supabase se cargó la descripción con el formato
// "Descripción: ...texto libre...\nEspecificaciones:\nClave: valor\n...",
// separa el párrafo comercial de la lista técnica. Si no encuentra el
// marcador "Especificaciones:", mantiene el comportamiento de siempre
// (todo el texto se muestra como viñetas), para no romper los productos
// ya cargados que no siguen esta convención.
export function parseProductContent(raw: string): ProductContent {
  const text = raw.trim();
  const match = text.match(SPECS_MARKER_RE);

  if (!match || match.index == null) {
    const { specLines, idealPara } = extractIdealPara(parseSpecLines(text));
    return { description: null, specLines, idealPara };
  }

  const before = text.slice(0, match.index).trim().replace(DESCRIPTION_PREFIX_RE, "").trim();
  const after = text.slice(match.index + match[0].length).trim();
  const { specLines, idealPara } = extractIdealPara(after ? parseSpecLines(after) : []);

  return {
    description: before || null,
    specLines,
    idealPara,
  };
}
