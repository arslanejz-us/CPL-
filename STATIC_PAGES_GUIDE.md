# Static Pages Guide

This project now uses **static pages** instead of dynamic routing. Each category and product has its own dedicated page file that you can copy and paste to create new pages.

## Directory Structure

```
src/app/
├── product-category/
│   ├── custom-tuck-boxes/
│   │   └── page.tsx          ← Category page template
│   ├── kraft-boxes/           ← Copy custom-tuck-boxes folder here
│   │   └── page.tsx
│   └── [other-categories]/
│
└── products/
    ├── custom-tuck-boxes-standard/
    │   └── page.tsx          ← Product page template
    ├── kraft-boxes-deluxe/    ← Copy custom-tuck-boxes-standard folder here
    │   └── page.tsx
    └── [other-products]/
```

## How to Create a New Category Page

### Step 1: Duplicate the Category Folder
```
Copy: src/app/product-category/custom-tuck-boxes/
To:   src/app/product-category/your-category-name/
```

### Step 2: Update the Content
In `page.tsx`:
- Update the `metadata` object with new title and description
- Modify `heroData` with your category information
- Update `features`, `types`, `materials`, `testimonials`, `faqs`, and `trustedBrands` arrays with your content

Example:
```typescript
export const metadata = {
  title: "Your Category Name | Custom Packaging Lane",
  description: "Your category description here",
};

export default function YourCategoryPage() {
  const heroData = {
    breadcrumbLabel: "Your Category Name",
    title: "Your Category Name",
    description: "Your category description here.",
  };
  
  const features = [
    {
      id: "1",
      icon: "🎯",
      title: "Feature Name",
      description: "Feature description",
    },
    // ... more features
  ];
  
  // ... rest of the data arrays
}
```

### Step 3: Update Navigation Links
The breadcrumb automatically updates based on `breadcrumbLabel`.

---

## How to Create a New Product Page

### Step 1: Duplicate the Product Folder
```
Copy: src/app/products/custom-tuck-boxes-standard/
To:   src/app/products/your-product-name/
```

### Step 2: Update the Content
In `page.tsx`:
- Update the `metadata` object
- Modify `heroData` with your product information
- Update `specifications`, `testimonials`, and `faqs` arrays
- **IMPORTANT:** Update the `backLink` to point to the correct category page

Example:
```typescript
export const metadata = {
  title: "Your Product Name | Custom Packaging Lane",
  description: "Your product description here",
};

export default function YourProductPage() {
  const heroData = {
    breadcrumbLabel: "Your Product Name",
    title: "Your Product Name",
    description: "Your product description here.",
  };
  
  const specifications = [
    { label: "Material", value: "Your material" },
    { label: "Box Type", value: "Your box type" },
    // ... more specs
  ];

  return (
    <>
      <Header />
      <main className="flex-grow">
        <StaticProductHero
          breadcrumbLabel={heroData.breadcrumbLabel}
          title={heroData.title}
          description={heroData.description}
          backLink="/product-category/your-category-slug"  ← UPDATE THIS
        />
        {/* ... rest of page */}
      </main>
      <Footer />
    </>
  );
}
```

### Step 3: Update the Breadcrumb Link
Change the `backLink` prop to point to your category page.

---

## Components Used

### 1. StaticCategoryHero
- Location: `src/components/StaticCategoryHero.tsx`
- Props:
  - `breadcrumbLabel`: Displayed in breadcrumb
  - `title`: Main page title
  - `description`: Subtitle/description
- Features:
  - Background image on right side
  - Quote form with Name, Email, Phone, Quantity, Packaging Details
  - Breadcrumb navigation

### 2. StaticProductHero
- Location: `src/components/StaticProductHero.tsx`
- Props:
  - `breadcrumbLabel`: Displayed in breadcrumb
  - `title`: Main page title
  - `description`: Subtitle/description
  - `backLink`: Link to parent category page
- Features:
  - Same as StaticCategoryHero
  - Plus "Back to Category" button with back arrow
  - Extended breadcrumb with all levels

---

## Template Data Structure

### Features Array
```typescript
const features = [
  {
    id: "1",
    icon: "🎯",              // Use emoji or text
    title: "Feature Name",
    description: "Feature description",
  },
];
```

### Types/Products Array
```typescript
const types = [
  {
    id: "1",
    name: "Type Name",
    description: "Type description",
    image: null,            // Add image path: "/path/to/image.png"
  },
];
```

### Materials Array
```typescript
const materials = [
  {
    id: "1",
    name: "Material Name",
    description: "Material description",
    image: null,
    properties: ["Property 1", "Property 2", "Property 3"],
  },
];
```

### Testimonials Array
```typescript
const testimonials = [
  {
    id: "1",
    client_name: "Name",
    client_title: "Title",
    client_company: "Company",
    rating: 5,
    content: "Testimonial text...",
  },
];
```

### FAQs Array
```typescript
const faqs = [
  {
    id: "1",
    question: "Your question here?",
    answer: "Your answer here...",
  },
];
```

---

## Page Structure

Both category and product pages follow this structure:

1. **Header** - Navigation bar
2. **Hero Section** - StaticCategoryHero or StaticProductHero
3. **Trusted Brands** (category only)
4. **Features Section** - Display feature cards
5. **Types/Products Grid** (category only)
6. **Customization Section**
7. **Materials Section** (category only)
8. **Testimonials** - Client reviews
9. **FAQ** - Frequently asked questions
10. **CTA Section** - Call to action buttons
11. **Newsletter** - Signup form
12. **Footer** - Site footer

---

## URL Patterns

### Categories
- Format: `/product-category/{slug}`
- Example: `/product-category/custom-tuck-boxes`
- Folder: `src/app/product-category/custom-tuck-boxes/`

### Products
- Format: `/products/{slug}`
- Example: `/products/custom-tuck-boxes-standard`
- Folder: `src/app/products/custom-tuck-boxes-standard/`

---

## Tips for Duplicating Pages

1. **Use find & replace** to quickly update titles and descriptions
2. **Test local links** - Make sure breadcrumb and back links point to correct pages
3. **Keep consistent naming** - Use kebab-case for folder names (e.g., `custom-tuck-boxes`)
4. **Update metadata** - Always update title and description for SEO
5. **Check images** - Add image paths in the data arrays if needed
6. **Deploy frequently** - Push changes to GitHub to see them live

---

## Quick Copy-Paste Template

Here's a minimal template to get started quickly:

```typescript
// src/app/product-category/[your-category]/page.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaticCategoryHero from "@/components/StaticCategoryHero";

export const metadata = {
  title: "Your Title | Custom Packaging Lane",
  description: "Your description",
};

export default function YourPage() {
  const heroData = {
    breadcrumbLabel: "Your Label",
    title: "Your Title",
    description: "Your description",
  };

  return (
    <>
      <Header />
      <main className="flex-grow">
        <StaticCategoryHero {...heroData} />
        {/* Add more sections here */}
      </main>
      <Footer />
    </>
  );
}
```

That's it! Copy, paste, and modify for each new page. 🚀
