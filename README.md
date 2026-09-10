# MH Equipamientos

Catálogo de equipamiento comercial (Next.js + Tailwind + Supabase).

## Desarrollo local

1. Copiá `.env.example` a `.env.local` y completá con los datos de tu proyecto de Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (la clave pública/anon, nunca la `service_role`)
2. Instalá dependencias y corré el servidor:

```bash
npm install
npm run dev
```

3. Abrí [http://localhost:3000](http://localhost:3000).

## Base de datos

El esquema base (tablas `categories` y `products`, con lectura pública vía RLS) está en
[`supabase/schema.sql`](./supabase/schema.sql). Corré ese script en el SQL Editor de Supabase
para crear las tablas si todavía no existen.

## Deploy

El proyecto está pensado para deployar en Vercel. Configurá las mismas variables de entorno
(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) en Project Settings → Environment
Variables del proyecto de Vercel.
