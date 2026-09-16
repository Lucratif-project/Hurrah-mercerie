-- Tables déjà prévues pour Hurrah Mercerie.
-- À exécuter dans Supabase si nécessaire.
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz default now()
);
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price integer not null,
  stock integer default 0,
  status text default 'published',
  category_id uuid references categories(id) on delete set null,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  display_order integer default 0,
  created_at timestamptz default now()
);
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_address text,
  status text default 'new',
  total integer default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity integer not null,
  price integer not null,
  created_at timestamptz default now()
);
