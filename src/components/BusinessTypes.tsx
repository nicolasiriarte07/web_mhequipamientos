const items = [
  {
    label: "Kioscos",
    icon: <path d="M3 9l1-5h16l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />,
  },
  {
    label: "Supermercados",
    icon: (
      <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-1.5 3H17M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    ),
  },
  {
    label: "Bares",
    icon: <path d="M3 4h18l-8 9v6h4M11 13v6H7M3 4l8 9" />,
  },
  {
    label: "Restaurantes",
    icon: <path d="M6 2v8a2 2 0 0 0 4 0V2M8 10v12M16 2c-1 0-2 1-2 3v4c0 1 .5 2 2 2v9" />,
  },
  {
    label: "Pizzerías",
    icon: <path d="M12 2 4 20a10 10 0 0 0 16 0L12 2Z M9 12h.01M14 14h.01M11.5 17h.01" />,
  },
  {
    label: "Rotiserías",
    icon: (
      <path d="M12 2c1.5 3-2.5 4.5-2.5 8.5a2.5 2.5 0 0 0 5 0c0-1-.5-2-.5-3 2 1.5 4 4.5 4 7.5a6 6 0 0 1-12 0c0-6 4-7 6-13Z" />
    ),
  },
  {
    label: "Panaderías",
    icon: (
      <path d="M4 14a8 6 0 1 0 16 0 8 6 0 1 0-16 0Z M9 11l-1 3M13 10l-1 4M17 11l-1 3" />
    ),
  },
  {
    label: "Hoteles",
    icon: (
      <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8 M2 20v-2h20v2 M6 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4 M2 20V10" />
    ),
  },
  {
    label: "Airbnbs",
    icon: <path d="M3 11.5 12 4l9 7.5M5 10v10h14V10 M9 20v-6h6v6" />,
  },
];

export function BusinessTypes() {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-center text-xl font-bold text-gray-900">A quién ayudamos</h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Equipamos todo tipo de comercios y emprendimientos
      </p>

      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
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
            <p className="text-sm font-medium text-gray-700">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
