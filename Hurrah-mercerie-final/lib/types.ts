export type Category = {
  id: string;
  name: string;
  description: string | null;
  name_en?: string | null;
  description_en?: string | null;
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
  reference?: string | null;
  color?: string | null;
  size?: string | null;
  format?: string | null;
  // Versions anglaises (facultatives, voir supabase/i18n-english.sql)
  name_en?: string | null;
  description_en?: string | null;
  color_en?: string | null;
  size_en?: string | null;
  format_en?: string | null;
};

export type CartItem = Product & { quantity: number };
