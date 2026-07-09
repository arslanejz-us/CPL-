-- Create Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE,
  image VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
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

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Insert Sample Categories
INSERT INTO categories (name, description, slug) VALUES
('Custom Boxes', 'Professional custom packaging solutions', 'custom-boxes'),
('Mailer Boxes', 'Secure shipping and mailing boxes', 'mailer-boxes'),
('Cosmetic Packaging', 'Beauty and cosmetics packaging', 'cosmetic-packaging')
ON CONFLICT DO NOTHING;

-- Insert Sample Product
INSERT INTO products (
  id,
  name,
  title,
  subtitle,
  description,
  badge,
  category_id,
  hero_quick_benefits,
  key_features,
  packaging_benefits,
  content_sections,
  showcase_items,
  related_products
) VALUES (
  'straight-tuck-boxes',
  'Straight Tuck Boxes',
  'Custom Straight Tuck Boxes',
  'Professional, versatile, and cost-effective packaging',
  'Professional, versatile, and cost-effective packaging that protects your products while enhancing your brand presence on shelves.',
  'PREMIUM PACKAGING SOLUTION',
  (SELECT id FROM categories WHERE slug = 'custom-boxes'),
  ARRAY['Easy to assemble', 'Excellent durability', 'Fully customizable', 'Eco-friendly options'],
  '[
    {
      "title": "Durable Protection",
      "description": "Premium materials protect your products during shipping",
      "iconName": "Shield"
    },
    {
      "title": "Eco-Friendly Options",
      "description": "Sustainable materials that appeal to conscious consumers",
      "iconName": "Leaf"
    },
    {
      "title": "Quick Assembly",
      "description": "Easy to assemble with minimal additional materials",
      "iconName": "Zap"
    },
    {
      "title": "Cost-Effective",
      "description": "Competitive pricing without compromising on quality",
      "iconName": "Package"
    }
  ]'::jsonb,
  '{
    "title": "Packaging Made Easier & Quicker",
    "subtitle": "Streamlined Process from Design to Delivery",
    "description": "Get your custom tuck boxes faster with our optimized production workflow",
    "image": "/Custom-tuck-boxes.png",
    "features": [
      {
        "number": 1,
        "iconName": "Zap",
        "title": "Quick Design",
        "description": "Fast turnaround on design approvals and customization"
      },
      {
        "number": 2,
        "iconName": "Package",
        "title": "Fast Production",
        "description": "Efficient manufacturing process ensures quick delivery"
      },
      {
        "number": 3,
        "iconName": "Leaf",
        "title": "Easy Assembly",
        "description": "Simple fold-and-tuck design requires minimal effort"
      },
      {
        "number": 4,
        "iconName": "Shield",
        "title": "Reliable Quality",
        "description": "Consistent quality control throughout production"
      }
    ]
  }'::jsonb,
  '[
    {
      "title": "Custom Tuck Boxes for Durable, Retail-Ready Product Packaging",
      "subtitle": "Industry-Leading Packaging Solutions",
      "description": "Our custom tuck boxes are engineered for optimal product protection while maintaining an attractive retail presence. Perfect for cosmetics, food, beverages, and retail products, these versatile boxes combine functionality with stunning visual impact.",
      "bullets": [
        "Durable construction withstands shipping and handling",
        "Customizable sizes to fit your exact product specifications",
        "Full-color printing with premium finish options",
        "Eco-friendly materials available for sustainable brands",
        "Fast turnaround times without compromising quality",
        "Expert design assistance from our creative team"
      ],
      "image": "/Retail-packaging.png",
      "imagePosition": "right"
    },
    {
      "title": "Premium-Grade Materials Tailored for Your Product Safety and Print Quality",
      "subtitle": "Superior Materials & Craftsmanship",
      "description": "We understand that packaging is the first point of contact with your customers. That''s why we use only premium-grade materials and employ advanced printing techniques to ensure your brand stands out while protecting your products.",
      "bullets": [
        "Premium cardboard stock with superior durability",
        "Advanced CMYK printing technology for vibrant colors",
        "Specialty finishing options including matte, gloss, and spot UV",
        "Reinforced tuck tabs for secure closure and longevity",
        "FDA-compliant materials for food and beverage products",
        "Moisture-resistant options for sensitive product protection"
      ],
      "image": "/Custom-tuck-boxes.png",
      "imagePosition": "left"
    }
  ]'::jsonb,
  '[
    {
      "id": 1,
      "title": "Cosmetic Products",
      "description": "Perfect for skincare and beauty products",
      "image": "/Cosmetic-packaging.png"
    },
    {
      "id": 2,
      "title": "Retail Products",
      "description": "Ideal for retail store shelves",
      "image": "/Retail-packaging.png"
    },
    {
      "id": 3,
      "title": "Beverage Products",
      "description": "Suitable for drinks and beverages",
      "image": "/Beverage-Packaging.png"
    },
    {
      "id": 4,
      "title": "Food Products",
      "description": "Great for food and snack items",
      "image": "/Custom-tuck-boxes.png"
    }
  ]'::jsonb,
  '[
    {
      "id": "cosmetic-boxes",
      "name": "Cosmetic Boxes",
      "link": "/products/cosmetic-boxes"
    },
    {
      "id": "mailer-boxes",
      "name": "Mailer Boxes",
      "link": "/products/mailer-boxes"
    },
    {
      "id": "soap-boxes",
      "name": "Soap Boxes",
      "link": "/products/soap-boxes"
    }
  ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (Optional)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for Public Read Access
CREATE POLICY "Allow public read on categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Allow public read on products"
  ON products FOR SELECT
  USING (true);
