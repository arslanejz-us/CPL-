# 🎨 Database-Driven Category & Product Pages - Detailed Design Plan

## 📸 Layout Analysis

### Category Page Sections (in order):
1. **Hero Section** - Product images + Title + Quote form (right side)
2. **Trusted Brands** - Client logos carousel
3. **Features** - 4 feature boxes (Key benefits)
4. **Types Grid** - 8 product variants/types (4x2 grid)
5. **Customize Section** - Customization options display
6. **Materials Section** - 3 material options with images
7. **Quote CTA** - Get a quote in 15 minutes form
8. **Testimonials** - Client testimonials carousel
9. **FAQ** - Frequently asked questions accordion
10. **Sample Kit** - Order free sample kit form
11. **Newsletter** - Subscribe section
12. **Footer** - Navigation + Links

### Product Page Sections (in order):
1. **Hero Section** - Product images + Title + Quote form
2. **Trusted Brands** - Client logos
3. **Features** - Key feature boxes
4. **Types Grid** - 8 product variants (with image placeholders)
5. **Customize Section** - Customization details
6. **Materials** - Material options
7. **Quote CTA** - Get quote form
8. **Testimonials** - Reviews carousel
9. **FAQ** - Q&A section
10. **Sample Kit** - Sample order
11. **Newsletter** - Subscribe
12. **Footer** - Links

---

## 🗄️ Database Schema Required

### NEW TABLE: `category_types` (Product Variants)
```sql
CREATE TABLE category_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  icon VARCHAR(100),
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### NEW TABLE: `product_materials`
```sql
CREATE TABLE product_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  properties TEXT[], -- ["Eco-friendly", "Durable", etc]
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### NEW TABLE: `category_features`
```sql
CREATE TABLE category_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### UPDATE: `categories` Table (Add These)
```sql
ALTER TABLE categories ADD COLUMN (
  hero_image VARCHAR(500),          -- Main hero image
  hero_video_url VARCHAR(500),      -- Optional video
  hero_description TEXT,             -- Hero subtitle
  tagline VARCHAR(255),              -- Small tagline
  icon VARCHAR(100),                 -- Category icon
  primary_color VARCHAR(7),          -- Brand color
  secondary_color VARCHAR(7),        -- Secondary color
  customization_description TEXT,    -- Customize section text
  customize_options JSONB,           -- Customize options [{title, description}]
  long_description TEXT,             -- Full description
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[],
  display_order INT,
  is_active BOOLEAN DEFAULT true
);
```

### UPDATE: `products` Table (Add These)
```sql
ALTER TABLE products ADD COLUMN (
  featured_image VARCHAR(500),       -- Main product image
  hero_images TEXT[] DEFAULT ARRAY[]::text[],  -- Multiple hero images
  gallery_images TEXT[] DEFAULT ARRAY[]::text[],  -- Product gallery
  video_url VARCHAR(500),            -- Product video
  video_thumbnail VARCHAR(500),
  min_price DECIMAL(10, 2),
  max_price DECIMAL(10, 2),
  price_description VARCHAR(255),
  specifications JSONB,              -- {spec_name: value}
  dimensions JSONB,                  -- {length, width, height, unit}
  materials TEXT[] DEFAULT ARRAY[]::text[],
  customization_options JSONB,       -- [{title, description}]
  benefits TEXT[] DEFAULT ARRAY[]::text[],
  long_description TEXT,
  usage_guide TEXT,                  -- How to use
  care_instructions TEXT,            -- Maintenance
  seo_slug VARCHAR(255),
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT[],
  display_order INT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);
```

### NEW TABLE: `testimonials`
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),         -- Job title
  client_company VARCHAR(255),
  client_image VARCHAR(500),
  rating INT,                         -- 1-5 stars
  content TEXT NOT NULL,
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### NEW TABLE: `faqs`
```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### NEW TABLE: `trusted_brands`
```sql
CREATE TABLE trusted_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  brand_name VARCHAR(255) NOT NULL,
  brand_logo VARCHAR(500),
  brand_url VARCHAR(500),
  display_order INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔄 Data Flow Architecture

### Category Detail Page: `/product-category/[slug]`
```
User visits: /product-category/cosmetic-boxes

1. Fetch Category Data
   SELECT * FROM categories WHERE slug = 'cosmetic-boxes'
   └─ hero_image, hero_description, customization_description, etc.

2. Fetch Category Features (4 boxes)
   SELECT * FROM category_features 
   WHERE category_id = cat.id ORDER BY display_order

3. Fetch Category Types (8 variants grid)
   SELECT * FROM category_types 
   WHERE category_id = cat.id ORDER BY display_order

4. Fetch Product Materials (3 material cards)
   SELECT * FROM product_materials 
   WHERE category_id = cat.id ORDER BY display_order LIMIT 3

5. Fetch Testimonials (carousel)
   SELECT * FROM testimonials 
   WHERE category_id = cat.id ORDER BY display_order

6. Fetch FAQs
   SELECT * FROM faqs 
   WHERE category_id = cat.id ORDER BY display_order

7. Fetch Trusted Brands (logos)
   SELECT * FROM trusted_brands 
   WHERE category_id = cat.id ORDER BY display_order

8. Render page with all data
```

### Product Detail Page: `/products/[productId]`
```
User visits: /products/cosmetic-boxes

1. Fetch Product Data
   SELECT * FROM products WHERE id = 'cosmetic-boxes'
   └─ hero_images, gallery_images, specifications, dimensions, etc.

2. Fetch Product Category
   SELECT * FROM categories WHERE id = product.category_id
   └─ For customization, features context

3. Fetch Related Products (same category)
   SELECT * FROM products 
   WHERE category_id = product.category_id 
   AND id != product.id LIMIT 4

4. Fetch Category Features
   SELECT * FROM category_features 
   WHERE category_id = product.category_id

5. Fetch Category Types
   SELECT * FROM category_types 
   WHERE category_id = product.category_id

6. Fetch Product Materials
   SELECT * FROM product_materials 
   WHERE category_id = product.category_id

7. Fetch Testimonials
   SELECT * FROM testimonials 
   WHERE category_id = product.category_id

8. Fetch FAQs
   SELECT * FROM faqs 
   WHERE category_id = product.category_id

9. Render page with all data
```

---

## 📝 Component Mapping

### Existing Components to Update:
| Component | Location | Updates Needed |
|-----------|----------|------------------|
| Header | /components/Header.tsx | Link to /categories, /products |
| Hero | /components/Hero.tsx | Make it generic for categories |
| TrustedBrands | /components/TrustedBrands.tsx | Fetch from trusted_brands table |
| Features | /components/Features.tsx | Fetch from category_features table |
| QuoteForm | /components/QuoteForm.tsx | Keep as-is |
| Testimonials | /components/Testimonials.tsx | Fetch from testimonials table |
| FAQ | /components/FAQ.tsx | Fetch from faqs table |
| SampleKitForm | /components/SampleKitForm.tsx | Keep as-is |
| Newsletter | /components/Newsletter.tsx | Keep as-is |
| Footer | /components/Footer.tsx | Keep as-is |

### New Components to Create:
| Component | Purpose | Data Source |
|-----------|---------|------------|
| TypesGrid | 8 product types | category_types table |
| MaterialsShowcase | 3 material cards | product_materials table |
| ProductGallery | Hero images carousel | products.hero_images |
| SpecificationsDisplay | Product specs | products.specifications |
| CustomizationSection | Customization options | categories.customize_options |

---

## 📊 Sample Data Structure

### Category Document
```json
{
  "id": "uuid-cosmetic",
  "name": "Cosmetic Boxes",
  "slug": "cosmetic-boxes",
  "hero_image": "https://cdn.example.com/cosmetic-hero.jpg",
  "hero_description": "Premium packaging for beauty products",
  "tagline": "Elevate Your Brand",
  "customization_description": "Customize every detail with purpose",
  "customize_options": [
    {
      "title": "Printing Options",
      "description": "4-color CMYK, spot colors, or foil stamping"
    },
    {
      "title": "Materials",
      "description": "Choose from eco-friendly or premium cardboard"
    }
  ],
  "icon": "Sparkles",
  "primary_color": "#1A7F7E",
  "display_order": 1
}
```

### Category Type (Variant)
```json
{
  "id": "uuid-type-1",
  "name": "Straight Tuck Box",
  "description": "Most popular choice for cosmetics",
  "image": "https://cdn.example.com/straight-tuck.jpg",
  "display_order": 1
}
```

### Product Material
```json
{
  "id": "uuid-material-1",
  "name": "Kraft Cardboard",
  "description": "Eco-friendly and biodegradable",
  "image": "https://cdn.example.com/kraft.jpg",
  "properties": ["Eco-friendly", "Biodegradable", "Recyclable"],
  "display_order": 1
}
```

### Testimonial
```json
{
  "id": "uuid-testimonial-1",
  "client_name": "Sarah Lee",
  "client_title": "CEO",
  "client_company": "Beauty Co.",
  "client_image": "https://cdn.example.com/sarah.jpg",
  "rating": 5,
  "content": "Outstanding packaging quality!",
  "display_order": 1
}
```

### FAQ
```json
{
  "id": "uuid-faq-1",
  "question": "What is the minimum order quantity?",
  "answer": "We accept orders starting from 100 units...",
  "display_order": 1
}
```

---

## 🛠️ Implementation Steps

### Step 1: Create Database Tables (SQL)
```sql
-- Run all the CREATE/ALTER commands above
-- Create indexes for performance
CREATE INDEX idx_category_types_category ON category_types(category_id);
CREATE INDEX idx_testimonials_category ON testimonials(category_id);
CREATE INDEX idx_faqs_category ON faqs(category_id);
CREATE INDEX idx_category_features_category ON category_features(category_id);
CREATE INDEX idx_trusted_brands_category ON trusted_brands(category_id);
CREATE INDEX idx_product_materials_category ON product_materials(category_id);
```

### Step 2: Create Data Fetching Functions
**File**: `src/lib/supabase-queries.ts`
```typescript
export async function getCategoryWithAllData(slug: string) {
  // Fetch category
  // Fetch features
  // Fetch types
  // Fetch materials
  // Fetch testimonials
  // Fetch FAQs
  // Fetch trusted brands
  // Return all combined
}

export async function getProductWithRelated(id: string) {
  // Fetch product
  // Fetch category
  // Fetch related products
  // Fetch all category-related data
  // Return combined
}
```

### Step 3: Update Pages
**File**: `src/app/product-category/[category]/page.tsx`
```typescript
export default async function CategoryPage({ params }) {
  const data = await getCategoryWithAllData(params.category);
  
  return (
    <>
      <CategoryHero data={data.category} />
      <TrustedBrands brands={data.trustedBrands} />
      <Features features={data.features} />
      <TypesGrid types={data.types} />
      <CustomizationSection category={data.category} />
      <MaterialsShowcase materials={data.materials} />
      <QuoteForm />
      <Testimonials testimonials={data.testimonials} />
      <FAQ faqs={data.faqs} />
      <SampleKitForm />
      <Newsletter />
    </>
  );
}
```

**File**: `src/app/products/[productId]/page.tsx`
```typescript
export default async function ProductPage({ params }) {
  const data = await getProductWithRelated(params.productId);
  
  return (
    <>
      <ProductHero product={data.product} images={data.product.hero_images} />
      <TrustedBrands brands={data.trustedBrands} />
      <Features features={data.features} />
      <TypesGrid types={data.types} />
      <SpecificationsDisplay specs={data.product.specifications} />
      <MaterialsShowcase materials={data.materials} />
      <QuoteForm />
      <Testimonials testimonials={data.testimonials} />
      <FAQ faqs={data.faqs} />
      <SampleKitForm />
      <Newsletter />
    </>
  );
}
```

### Step 4: Update Components
- Update each component to accept data props instead of hardcoded data
- All components should fetch from database via these functions
- No component should have local state for display data

### Step 5: Insert Sample Data
For each category, add:
- 4 features
- 8 product types
- 3 materials
- 4-5 testimonials
- 5-6 FAQs
- 5+ trusted brands

---

## ✅ Implementation Checklist

### Database
- [ ] Create category_types table
- [ ] Create product_materials table
- [ ] Create category_features table
- [ ] Create testimonials table
- [ ] Create faqs table
- [ ] Create trusted_brands table
- [ ] Add columns to categories table
- [ ] Add columns to products table
- [ ] Create all indexes

### Data
- [ ] Insert 3-4 sample categories with complete data
- [ ] Insert 5-6 sample products
- [ ] Insert features for each category (4 per)
- [ ] Insert types for each category (8 per)
- [ ] Insert materials for each category (3 per)
- [ ] Insert testimonials (4-5 per category)
- [ ] Insert FAQs (5-6 per category)
- [ ] Insert trusted brands (5+ per category)

### Functions
- [ ] Create getCategoryWithAllData()
- [ ] Create getProductWithRelated()
- [ ] Add error handling
- [ ] Add caching where needed

### Pages
- [ ] Update /product-category/[category]/page.tsx
- [ ] Update /products/[productId]/page.tsx
- [ ] Update /categories list page
- [ ] Update /products list page
- [ ] Update homepage category links

### Components
- [ ] Update TrustedBrands (use data prop)
- [ ] Update Features (use data prop)
- [ ] Update Testimonials (use data prop)
- [ ] Update FAQ (use data prop)
- [ ] Create TypesGrid component
- [ ] Create MaterialsShowcase component
- [ ] Create SpecificationsDisplay component
- [ ] Update ProductGallery (carousel)

### Testing
- [ ] Test category page loads
- [ ] Test product page loads
- [ ] Test all data displays correctly
- [ ] Test images load
- [ ] Test forms work
- [ ] Test responsive design

---

## 🎯 Priority

**Phase 1 (Critical)**: Database tables + data fetching functions + update both pages
**Phase 2 (Important)**: Create new components + update existing components
**Phase 3 (Polish)**: Insert sample data + test + optimize

---

## 📐 Total Scope

- **5 new database tables**
- **16 new database columns** (across 2 tables)
- **2 main pages** to update
- **3 new components** to create
- **5 existing components** to update
- **Sample data** for 3-4 categories

**Estimated Time**: 8-12 hours for complete implementation
