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
