export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  brand: string | null;
  description: string | null;
  price: number | null;
  image_url: string | null;
  images: string[] | null;
  stock: number;
  active: boolean;
  categories?: Category | null;
};
