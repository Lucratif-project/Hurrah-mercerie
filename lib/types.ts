export type Category = {
  id: string;
  name: string;
  description: string | null;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  status: string;
  category_id: string | null;
  featured: boolean;
  image_url?: string | null;
};

export type CartItem = Product & { quantity: number };
