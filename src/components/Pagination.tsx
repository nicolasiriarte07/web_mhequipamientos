import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Paginación">
      <PaginationArrow href={isFirst ? null : buildHref(currentPage - 1)} label="Página anterior">
        <path d="m15 18-6-6 6-6" />
      </PaginationArrow>

      <span className="text-sm font-medium text-gray-700">
        Página {currentPage} de {totalPages}
      </span>

      <PaginationArrow href={isLast ? null : buildHref(currentPage + 1)} label="Página siguiente">
        <path d="m9 18 6-6-6-6" />
      </PaginationArrow>
    </nav>
  );
}

function PaginationArrow({
  href,
  label,
  children,
}: {
  href: string | null;
  label: string;
  children: React.ReactNode;
}) {
  const className =
    "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors";
  const icon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      {children}
    </svg>
  );

  if (!href) {
    return (
      <span className={`${className} border-gray-200 text-gray-300`} aria-hidden>
        {icon}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`${className} border-gray-200 text-gray-600 hover:border-brand hover:text-brand`}
    >
      {icon}
    </Link>
  );
}
