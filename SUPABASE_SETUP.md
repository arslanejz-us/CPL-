# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [Supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Copy your **Project URL** and **Anon Key** from Project Settings > API
5. Add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 2. Create Database Tables

Go to Supabase Dashboard > SQL Editor and run these queries:

### Create Categories Table

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE,
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### Create Products Table

```sql
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  badge VARCHAR(255),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  hero_image VARCHAR(255),
  hero_quick_benefits TEXT[] DEFAULT ARRAY[]::text[],
  key_features JSONB DEFAULT '[]'::jsonb,
  packaging_benefits JSONB DEFAULT '{}'::jsonb,
  content_sections JSONB DEFAULT '[]'::jsonb,
  showcase_items JSONB DEFAULT '[]'::jsonb,
  related_products JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_created_at ON products(created_at);
```

## 3. Insert Sample Data

### Insert Categories

```sql
INSERT INTO categories (name, description, slug) VALUES
('Custom Boxes', 'Professional custom packaging solutions', 'custom-boxes'),
('Mailer Boxes', 'Secure shipping and mailing boxes', 'mailer-boxes'),
('Cosmetic Packaging', 'Beauty and cosmetics packaging', 'cosmetic-packaging');
```

### Insert Products

```sql
INSERT INTO products (id, name, title, subtitle, description, badge, category_id, hero_quick_benefits, key_features)
VALUES (
  'straight-tuck-boxes',
  'Straight Tuck Boxes',
  'Custom Straight Tuck Boxes',
  'Professional, versatile, and cost-effective packaging',
  'Professional, versatile, and cost-effective packaging that protects your products while enhancing your brand presence on shelves.',
  'PREMIUM PACKAGING SOLUTION',
  (SELECT id FROM categories WHERE slug = 'custom-boxes'),
  ARRAY['Easy to assemble', 'Excellent durability', 'Fully customizable', 'Eco-friendly options'],
  '[
    {"title": "Durable Protection", "description": "Premium materials protect your products during shipping", "iconName": "Shield"},
    {"title": "Eco-Friendly Options", "description": "Sustainable materials that appeal to conscious consumers", "iconName": "Leaf"},
    {"title": "Quick Assembly", "description": "Easy to assemble with minimal additional materials", "iconName": "Zap"},
    {"title": "Cost-Effective", "description": "Competitive pricing without compromising on quality", "iconName": "Package"}
  ]'::jsonb
);
```

## 4. Enable Row Level Security (Optional but Recommended)

```sql
-- Enable RLS on tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on products"
  ON products FOR SELECT
  USING (true);
```

## 5. Run npm install

After adding Supabase credentials to `.env.local`, run:

```bash
npm install
```

Then start your dev server:

```bash
npm run dev
```

## 6. Update Product Page Component

The `[productId]/page.tsx` now fetches from Supabase automatically. Make sure to handle async calls:

```typescript
const product = await getProduct(productId);
```

## Image Hosting

For images, you have two options:

### Option A: Supabase Storage
1. Go to Storage in Supabase Dashboard
2. Create a new bucket (e.g., "product-images")
3. Upload images
4. Store image URLs in the database

### Option B: Keep Using Public Folder
Continue storing images in `/public` and reference them by path in the database

## Troubleshooting

- **"Missing Supabase environment variables"**: Check `.env.local` has correct URL and key
- **CORS errors**: Update Supabase project settings > API > CORS configuration
- **RLS blocking queries**: Make sure RLS policies allow public SELECT access

## Next Steps

1. Migrate all static product data to Supabase
2. Add admin panel for managing products and categories
3. Set up product images in Supabase Storage or CDN
