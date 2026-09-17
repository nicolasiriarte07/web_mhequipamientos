const items = [
  {
    title: "Financiación hasta el 100%",
    icon: (
      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    ),
  },
  {
    title: "Asesoramiento personalizado",
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    ),
  },
  {
    title: "Todos los medios de pago",
    icon: (
      <path d="M2 8h20M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z M6 15h4" />
    ),
  },
  {
    title: "Las mejores marcas",
    icon: (
      <path d="m12 2 2.9 6.3 6.8.6-5.2 4.6 1.6 6.7L12 16.9 5.9 20.2l1.6-6.7-5.2-4.6 6.8-.6Z" />
    ),
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-2 gap-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col items-center gap-3 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              aria-hidden
            >
              {item.icon}
            </svg>
          </span>
          <p className="text-sm font-semibold text-gray-800">{item.title}</p>
        </div>
      ))}
    </div>
  );
}
