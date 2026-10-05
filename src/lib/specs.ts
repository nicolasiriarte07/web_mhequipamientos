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
