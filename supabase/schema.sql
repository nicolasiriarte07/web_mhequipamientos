-- MH Equipamientos - esquema base para el catálogo
-- Corré esto en Supabase (SQL Editor). Es seguro correrlo aunque ya existan
-- las tablas: usa "if not exists" y no borra nada.

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id) on delete set null,
  name text not null,
  brand text,
  description text,
  price numeric,
  image_url text,
  images text[],
  stock int default 0,
  active boolean default true,
  created_at timestamptz default now()
);

alter table categories enable row level security;
alter table products enable row level security;

drop policy if exists "Public read categories" on categories;
create policy "Public read categories" on categories
  for select using (true);

drop policy if exists "Public read products" on products;
create policy "Public read products" on products
  for select using (true);

-- Categorías de ejemplo (basadas en las capturas). Editá/agregá las que falten.
insert into categories (name, slug, description, sort_order) values
  ('Refrigeración', 'refrigeracion', 'Heladeras exhibidoras, freezers y equipos de frío comercial', 1),
  ('Gastronomía', 'gastronomia', 'Hornos comerciales, freidoras y equipamiento gastronómico', 2),
  ('Alimentos', 'alimentos', 'Picadoras de carne, procesadoras y equipos alimentarios', 3),
  ('Exhibición', 'exhibicion', 'Balanzas, vitrinas y mobiliario de exhibición', 4)
on conflict (slug) do nothing;
