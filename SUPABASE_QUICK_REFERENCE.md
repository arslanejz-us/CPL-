# Supabase Quick Reference

## Environment Setup

### .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## Using Products API

### Fetch Single Product
```typescript
import { getProduct } from "@/lib/products";

const product = await getProduct("straight-tuck-boxes");
console.log(product?.title); // "Custom Straight Tuck Boxes"
```

### Fetch All Products
```typescript
import { getAllProducts } from "@/lib/products";

const products = await getAllProducts();
console.log(products.length); // Number of products
```

### Get Product IDs for Static Generation
```typescript
import { getAllProductIds } from "@/lib/products";

const ids = await getAllProductIds();
// Returns: ["straight-tuck-boxes", "cosmetic-boxes", ...]
```

### Filter by Category
```typescript
import { getProductsByCategory } from "@/lib/products";

const categoryProducts = await getProductsByCategory(categoryId);
```

---

## Using Categories API

### Fetch Single Category
```typescript
import { getCategory } from "@/lib/categories";

const category = await getCategory(categoryId);
```

### Get All Categories
```typescript
import { getAllCategories } from "@/lib/categories";

const categories = await getAllCategories();
```

### Find Category by Slug
```typescript
import { getCategoryBySlug } from "@/lib/categories";

const category = await getCategoryBySlug("custom-boxes");
```

---

## Server Components Example

```typescript
import { getProduct, getProductsByCategory } from "@/lib/products";
import { getCategory } from "@/lib/categories";

export default async function ProductPage() {
  // Fetch product data
  const product = await getProduct("straight-tuck-boxes");
  const category = product?.category_id ? 
    await getCategory(product.category_id) : null;
  const related = product?.category_id ?
    await getProductsByCategory(product.category_id) : [];

  if (!product) return <NotFound />;

  return (
    <>
      <ProductHero product={product} />
      <CategoryContentSections sections={product.contentSections} />
      {/* More sections... */}
    </>
  );
}
```

---

## Common SQL Queries

### Insert New Product
```sql
INSERT INTO products (
  id, name, title, subtitle, description, badge, category_id
) VALUES (
  'new-product-id',
  'Product Name',
  'Full Product Title',
  'Product subtitle',
  'Long description here',
  'BADGE TEXT',
  (SELECT id FROM categories WHERE slug = 'custom-boxes')
);
```

### Update Product
```sql
UPDATE products
SET title = 'New Title', description = 'New description'
WHERE id = 'straight-tuck-boxes';
```

### Get Products by Category
```sql
SELECT p.* FROM products p
JOIN categories c ON p.category_id = c.id
WHERE c.slug = 'custom-boxes';
```

### Add to Showcase Items (JSON)
```sql
UPDATE products
SET showcase_items = jsonb_agg(item)
FROM jsonb_array_elements(showcase_items) as item
WHERE id = 'straight-tuck-boxes';
```

---

## Image Hosting

### Generate Supabase Storage URL
```typescript
const imageUrl = 
  `${supabaseUrl}/storage/v1/object/public/product-images/filename.jpg`;
```

### Store in Database
```typescript
const { data, error } = await supabase
  .from('products')
  .update({ hero_image: imageUrl })
  .eq('id', 'product-id');
```

---

## Debugging

### Log Supabase Client
```typescript
import { supabase } from "@/lib/supabase";

console.log("Supabase Client:", supabase);
```

### Check Query Results
```typescript
const { data, error } = await supabase
  .from('products')
  .select('*');

if (error) {
  console.error("Query Error:", error);
} else {
  console.log("Query Result:", data);
}
```

### Monitor Network Requests
- Open Browser DevTools (F12)
- Go to Network tab
- Filter by "supabase"
- Check request/response payloads

---

## Cache & Performance

### Request Deduplication
```typescript
// React cache() automatically deduplicates these calls
const product = await getProduct("id");
const product2 = await getProduct("id"); // Uses cached result
```

### Revalidation (Future Use)
```typescript
// To refresh data on-demand
import { revalidateTag } from "next/cache";

// In Server Action:
"use server"
export async function updateProduct() {
  revalidateTag('products');
}
```

---

## Type Safety

### Product Type
```typescript
import { Product } from "@/lib/products";

const product: Product = {
  id: "string",
  name: "string",
  title: "string",
  subtitle: "string",
  description: "string",
  badge: "string",
  heroImage: "string (optional)",
  heroQuickBenefits: ["string"],
  keyFeatures: [{ title, description, iconName }],
  // ... more fields
};
```

### Category Type
```typescript
import { Category } from "@/lib/categories";

const category: Category = {
  id: "uuid",
  name: "string",
  description: "string",
  slug: "string (optional)",
  image: "string (optional)",
};
```

---

## Error Handling

### Check for Null
```typescript
const product = await getProduct(productId);
if (!product) {
  return notFound(); // Next.js 404 page
}
```

### Catch Errors
```typescript
try {
  const products = await getAllProducts();
} catch (error) {
  console.error("Failed to fetch products:", error);
  return <ErrorComponent />;
}
```

---

## Performance Tips

1. **Use cache() for repeated queries**
   - Deduplicates requests within a render cycle
   
2. **Use static generation**
   - Pre-build pages with `generateStaticParams()`
   
3. **Batch queries**
   - Fetch related data in parallel with Promise.all()

4. **Optimize images**
   - Use Next.js Image component
   - Store optimized URLs in database

---

## Links

- [Supabase Dashboard](https://app.supabase.com)
- [SQL Editor Docs](https://supabase.com/docs/guides/database/query-editor)
- [API Reference](https://supabase.com/docs/reference/javascript)
- [Authentication](https://supabase.com/docs/guides/auth)
