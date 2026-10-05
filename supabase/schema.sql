-- MH Equipamientos — ajustes sobre las tablas reales del proyecto
-- (categorias, productos). Seguro de correr más de una vez.

-- Nos aseguramos de que el catálogo sea legible públicamente (sin login),
-- sin importar qué políticas existan hoy en esas tablas.
alter table categorias enable row level security;
alter table productos enable row level security;

drop policy if exists "Public read categorias" on categorias;
create policy "Public read categorias" on categorias
  for select using (true);

drop policy if exists "Public read productos" on productos;
create policy "Public read productos" on productos
  for select using (true);

-- Limpieza: borramos las tablas de prueba en inglés (categories/products)
-- que habíamos creado antes de saber que ya existían categorias/productos
-- con los datos reales. Solo tenían las 4 categorías de ejemplo, nada real.
drop table if exists products;
drop table if exists categories;

-- Bloqueamos el acceso público (anon key) a las tablas internas del
-- negocio. Figuraban como "Unrestricted" en el dashboard de Supabase, es
-- decir, con RLS desactivado: cualquiera con la anon key (la misma que usa
-- este sitio en el navegador) podía leer o escribir ahí directamente
-- contra la API de Supabase, sin pasar por el sitio ni por ningún login.
--
-- Al activar RLS sin crear ninguna política para estas tablas, el acceso
-- queda denegado por defecto para los roles anon/authenticated. Siguen
-- totalmente accesibles desde el SQL Editor y el resto del dashboard de
-- Supabase (que usan el rol postgres/service_role, no sujeto a RLS), así
-- que esto no cambia nada de cómo administrás los datos ahí.
alter table comercios enable row level security;
alter table cotizaciones enable row level security;
alter table movimientos_inventario enable row level security;
alter table orden_compra_items enable row level security;
alter table ordenes_compra enable row level security;
alter table precios_compra enable row level security;
alter table proveedores enable row level security;
alter table sales enable row level security;

-- Tabla para los leads del formulario "Pedí tu cotización" en /contacto.
-- Es una tabla nueva y separada de `cotizaciones` (que es de uso interno)
-- para no arriesgarnos a romper nada que ya uses ahí.
--
-- La política solo permite INSERT desde el sitio (anon): el formulario
-- puede crear filas nuevas, pero nadie puede leer, editar ni borrar leads
-- ajenos usando la anon key pública. Para ver los leads entrá al Table
-- Editor de Supabase (ahí usás el rol postgres/service_role, no sujeto a
-- esta restricción).
create table if not exists leads_web (
  id bigint generated always as identity primary key,
  nombre text not null,
  telefono text not null,
  email text,
  nombre_comercio text,
  mensaje text,
  created_at timestamptz not null default now()
);

alter table leads_web enable row level security;

drop policy if exists "Public insert leads_web" on leads_web;
create policy "Public insert leads_web" on leads_web
  for insert
  to anon
  with check (true);
