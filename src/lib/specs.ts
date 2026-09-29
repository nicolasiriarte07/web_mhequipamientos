export function parseSpecLines(descripcion: string): string[] {
  return descripcion
    .split(/\r?\n/)
    .map((line) => line.replace(/^[\s|•\-–.]+/, "").trim())
    .filter(Boolean);
}
