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

-- Ajouts du plan d'amélioration : référence produit + variantes simples.
-- À exécuter une fois dans Supabase (SQL Editor) : ne casse rien si déjà exécuté.
alter table products add column if not exists reference text;
alter table products add column if not exists color text;
alter table products add column if not exists size text;
alter table products add column if not exists format text;

-- Index pour accélérer la recherche par nom / référence.
create index if not exists products_name_idx on products using gin (to_tsvector('french', name));
create index if not exists products_reference_idx on products (reference);

-- Table des administrateurs : un compte Supabase Auth n'est admin que s'il
-- possède une ligne ici (voir proxy.ts et app/login). Pour ajouter le tout
-- premier administrateur : crée le compte dans Supabase → Authentication →
-- Users, copie son UID, puis insère-le ici (ou utilise /admin/administrators
-- une fois qu'un premier admin est connecté).
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

-- ============================================================
-- Vague 2 d'améliorations : avis, codes promo, blog, kits, galerie.
-- À exécuter une fois dans Supabase (SQL Editor).
-- ============================================================

-- Avis clients sur les produits.
create table if not exists product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  approved boolean default true,
  created_at timestamptz default now()
);
create index if not exists product_reviews_product_idx on product_reviews (product_id);

-- Codes promo.
create table if not exists promo_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_percent integer not null check (discount_percent between 1 and 100),
  active boolean default true,
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- Articles de blog (conseils couture, actus).
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  status text default 'published',
  created_at timestamptz default now()
);

-- Kits / bundles de produits à prix groupé.
create table if not exists bundles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price integer not null,
  image_url text,
  status text default 'published',
  created_at timestamptz default now()
);
create table if not exists bundle_items (
  id uuid primary key default gen_random_uuid(),
  bundle_id uuid not null references bundles(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  label text not null,
  created_at timestamptz default now()
);

-- Galerie "Nos créations" (remplace une intégration Instagram/TikTok live,
-- que tu alimentes toi-même depuis /admin/galerie).
create table if not exists social_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  link_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- Total avec remise sur les commandes (facultatif, pour tracer les codes promo utilisés).
alter table orders add column if not exists promo_code text;
alter table orders add column if not exists discount integer default 0;

-- ============================================================
-- Vague 3 : catégories dynamiques + catalogue de démarrage.
-- ============================================================

-- Champ image pour les catégories, utilisé sur la page catalogue.
alter table categories add column if not exists image_url text;

-- Contrainte d'unicité pour éviter les doublons de catégories
-- (ignorée si elle existe déjà).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'categories_name_key'
  ) then
    alter table categories add constraint categories_name_key unique (name);
  end if;
end $$;
