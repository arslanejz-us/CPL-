-- ============================================
-- DATABASE MIGRATION: Full Solution Implementation
-- ============================================

-- 1. CREATE category_types TABLE (Product Variants)
CREATE TABLE IF NOT EXISTS category_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  icon VARCHAR(100),
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CREATE product_materials TABLE
CREATE TABLE IF NOT EXISTS product_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  properties TEXT[] DEFAULT ARRAY[]::text[],
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CREATE category_features TABLE
CREATE TABLE IF NOT EXISTS category_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CREATE testimonials TABLE
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  client_image VARCHAR(500),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CREATE faqs TABLE
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CREATE trusted_brands TABLE
CREATE TABLE IF NOT EXISTS trusted_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  brand_name VARCHAR(255) NOT NULL,
  brand_logo VARCHAR(500),
  brand_url VARCHAR(500),
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. UPDATE categories TABLE - Add new columns
ALTER TABLE categories ADD COLUMN IF NOT EXISTS hero_image VARCHAR(500);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS hero_description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS tagline VARCHAR(255);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon VARCHAR(100);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS customization_description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS customize_options JSONB DEFAULT '{}'::jsonb;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE categories ADD COLUMN IF NOT EXISTS display_order INT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 8. UPDATE products TABLE - Add new columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_images TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_url VARCHAR(500);
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_thumbnail VARCHAR(500);
ALTER TABLE products ADD COLUMN IF NOT EXISTS min_price DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS max_price DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_description VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS dimensions JSONB DEFAULT '{}'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS materials TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS customization_options JSONB DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS benefits TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS usage_guide TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_instructions TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_slug VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] DEFAULT ARRAY[]::text[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- 9. CREATE INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_category_types_category ON category_types(category_id);
CREATE INDEX IF NOT EXISTS idx_category_types_active ON category_types(is_active);
CREATE INDEX IF NOT EXISTS idx_product_materials_category ON product_materials(category_id);
CREATE INDEX IF NOT EXISTS idx_product_materials_active ON product_materials(is_active);
CREATE INDEX IF NOT EXISTS idx_category_features_category ON category_features(category_id);
CREATE INDEX IF NOT EXISTS idx_category_features_active ON category_features(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category_id);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_trusted_brands_category ON trusted_brands(category_id);
CREATE INDEX IF NOT EXISTS idx_trusted_brands_active ON trusted_brands(is_active);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);

-- 10. UPDATE existing products with enhanced data
UPDATE products SET
  hero_images = ARRAY['/Custom-tuck-boxes.png'],
  min_price = 150,
  max_price = 1000,
  price_description = 'Custom quote based on volume',
  benefits = ARRAY['Easy to assemble', 'Excellent durability', 'Fully customizable', 'Eco-friendly options'],
  display_order = 1,
  is_featured = true,
  seo_title = 'Custom Straight Tuck Boxes | Premium Packaging',
  seo_description = 'Professional custom tuck boxes for retail packaging. Durable, customizable, and eco-friendly options available.'
WHERE id = 'straight-tuck-boxes';

-- 11. UPDATE categories with enhanced data
UPDATE categories SET
  hero_image = '/Custom-tuck-boxes.png',
  hero_description = 'Professional custom tuck boxes for your retail products',
  tagline = 'Premium Packaging Solutions',
  icon = 'Package',
  customization_description = 'Customize every detail with purpose',
  customize_options = '[
    {"title": "Printing Options", "description": "4-color CMYK, spot colors, foil stamping"},
    {"title": "Materials", "description": "Eco-friendly or premium cardboard"},
    {"title": "Finishes", "description": "Matte, gloss, or spot UV coating"},
    {"title": "Sizing", "description": "Custom dimensions to fit your products"}
  ]'::jsonb,
  long_description = 'Our custom tuck boxes combine durability with aesthetic appeal. Perfect for retail products, these boxes provide excellent protection while maintaining your brand image.',
  seo_title = 'Custom Boxes for Your Industry',
  seo_description = 'Premium custom packaging solutions tailored to your industry needs.',
  display_order = 1,
  is_active = true
WHERE slug = 'custom-boxes';

-- 12. ENABLE ROW LEVEL SECURITY policies if not already
ALTER TABLE category_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE trusted_brands ENABLE ROW LEVEL SECURITY;

-- 13. CREATE RLS POLICIES for public read access
CREATE POLICY "Allow public read on category_types" ON category_types FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on product_materials" ON product_materials FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on category_features" ON category_features FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on testimonials" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on faqs" ON faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read on trusted_brands" ON trusted_brands FOR SELECT USING (is_active = true);

-- ============================================
-- SAMPLE DATA INSERTION
-- ============================================

-- Insert features for custom-boxes category
INSERT INTO category_features (category_id, title, description, icon, display_order, is_active)
SELECT id, 'Durable Protection', 'Premium materials protect your products during shipping', 'Shield', 1, true FROM categories WHERE slug = 'custom-boxes'
ON CONFLICT DO NOTHING;

INSERT INTO category_features (category_id, title, description, icon, display_order, is_active)
SELECT id, 'Eco-Friendly Options', 'Sustainable materials that appeal to conscious consumers', 'Leaf', 2, true FROM categories WHERE slug = 'custom-boxes'
ON CONFLICT DO NOTHING;

INSERT INTO category_features (category_id, title, description, icon, display_order, is_active)
SELECT id, 'Quick Assembly', 'Easy to assemble with minimal additional materials', 'Zap', 3, true FROM categories WHERE slug = 'custom-boxes'
ON CONFLICT DO NOTHING;

INSERT INTO category_features (category_id, title, description, icon, display_order, is_active)
SELECT id, 'Cost-Effective', 'Competitive pricing without compromising on quality', 'Package', 4, true FROM categories WHERE slug = 'custom-boxes'
ON CONFLICT DO NOTHING;

-- Insert product types for custom-boxes
INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Straight Tuck Box', 'Most versatile and popular choice', '/Custom-tuck-boxes.png', 1, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Reverse Tuck Box', 'Premium folding design', '/Retail-packaging.png', 2, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Snap Lock Box', 'Secure locking mechanism', '/Cosmetic-packaging.png', 3, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Disc Box', 'Perfect for round products', '/Beverage-Packaging.png', 4, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Auto Lock Box', 'Self-locking bottom design', '/Food-Packaging.png', 5, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Kraft Tuck Box', 'Eco-friendly kraft paper', '/Custom-tuck-boxes.png', 6, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Rigid Box', 'Premium luxury packaging', '/Retail-packaging.png', 7, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO category_types (category_id, name, description, image, display_order, is_active)
SELECT id, 'Sleeve Box', 'Two-piece rigid construction', '/Cosmetic-packaging.png', 8, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

-- Insert materials
INSERT INTO product_materials (category_id, name, description, image, properties, display_order, is_active)
SELECT id, 'Kraft Cardboard', 'Eco-friendly and biodegradable', '/Custom-tuck-boxes.png', ARRAY['Eco-friendly', 'Biodegradable', 'Recyclable'], 1, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO product_materials (category_id, name, description, image, properties, display_order, is_active)
SELECT id, 'White Cardboard', 'Clean, bright finish', '/Retail-packaging.png', ARRAY['Premium', 'Bright White', 'Professional'], 2, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO product_materials (category_id, name, description, image, properties, display_order, is_active)
SELECT id, 'Corrugated', 'Extra durable for shipping', '/Beverage-Packaging.png', ARRAY['Durable', 'Shock-resistant', 'Lightweight'], 3, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (category_id, client_name, client_title, client_company, rating, content, display_order, is_active)
SELECT id, 'Sarah Johnson', 'CEO', 'Beauty Brands Co.', 5, 'Outstanding packaging quality! Our customers love the premium feel. Highly recommended!', 1, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (category_id, client_name, client_title, client_company, rating, content, display_order, is_active)
SELECT id, 'Mike Chen', 'Founder', 'Eco Packaging', 5, 'Fast turnaround, excellent service, and eco-friendly materials. Perfect for our brand.', 2, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (category_id, client_name, client_title, client_company, rating, content, display_order, is_active)
SELECT id, 'Emma Williams', 'Marketing Director', 'Retail Plus', 4, 'Great packaging solution at competitive prices. The customization options are excellent.', 3, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO testimonials (category_id, client_name, client_title, client_company, rating, content, display_order, is_active)
SELECT id, 'David Rodriguez', 'Product Manager', 'Tech Gadgets', 5, 'Professional design, durable material, and exceptional customer support throughout.', 4, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

-- Insert FAQs
INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'What is the minimum order quantity?', 'We accept orders starting from 100 units. For bulk orders, we offer special pricing discounts.', 1, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'How long does production take?', 'Standard production time is 7-10 business days. Rush orders available upon request with additional fees.', 2, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'What are the customization options?', 'We offer full customization including size, printing (4-color CMYK, spot colors, foil), finishes (matte, gloss, UV), and materials.', 3, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'Do you offer eco-friendly materials?', 'Yes! We provide kraft cardboard, recycled materials, and soy-based inks for environmentally conscious brands.', 4, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'Can I get a sample before ordering?', 'Absolutely! We offer free sample kits so you can see and feel the quality before placing a large order.', 5, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO faqs (category_id, question, answer, display_order, is_active)
SELECT id, 'What is your quality guarantee?', 'We provide 100% quality guarantee. If you\'re not satisfied, we\'ll reprint or refund your order.', 6, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

-- Insert trusted brands
INSERT INTO trusted_brands (category_id, brand_name, brand_logo, display_order, is_active)
SELECT id, 'Google', 'https://via.placeholder.com/100x50?text=Google', 1, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO trusted_brands (category_id, brand_name, brand_logo, display_order, is_active)
SELECT id, 'HP', 'https://via.placeholder.com/100x50?text=HP', 2, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO trusted_brands (category_id, brand_name, brand_logo, display_order, is_active)
SELECT id, 'Shopify', 'https://via.placeholder.com/100x50?text=Shopify', 3, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO trusted_brands (category_id, brand_name, brand_logo, display_order, is_active)
SELECT id, 'L\'OREAL', 'https://via.placeholder.com/100x50?text=LOREAL', 4, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

INSERT INTO trusted_brands (category_id, brand_name, brand_logo, display_order, is_active)
SELECT id, 'FIQUE', 'https://via.placeholder.com/100x50?text=FIQUE', 5, true FROM categories WHERE slug = 'custom-boxes' ON CONFLICT DO NOTHING;

-- ============================================
-- END OF MIGRATION
-- ============================================
