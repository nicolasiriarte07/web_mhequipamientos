export type Category = {
  id: number;
  nombre: string;
  descripcion: string | null;
  created_at: string;
};

export type Product = {
  id: number;
  categoria_id: number | null;
  titulo: string;
  marca: string | null;
  descripcion: string | null;
  imagen_url: string | null;
  precio: number | null;
  stock_fisico: boolean;
  disponible: boolean;
  entrega_inmediata: boolean;
  created_at: string;
  categorias?: Category | null;
};
