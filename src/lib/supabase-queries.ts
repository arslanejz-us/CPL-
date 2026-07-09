const supabaseUrl = "https://ofcwangxybkcigwhonia.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mY3dhbmd4eWJrY2lnd2hvbmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MzQ1MDEsImV4cCI6MjA5ODQxMDUwMX0.1BFTDegKKBedvS6kfsqHPpJvkJPWtWSxJ-GX0OldPE4";

async function fetchFromSupabase(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Supabase API error: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }
}

// Category with all related data
export async function getCategoryWithAllData(slug: string) {
  const baseUrl = `${supabaseUrl}/rest/v1`;

  try {
    // Fetch category
    const categoryData = await fetchFromSupabase(
      `${baseUrl}/categories?slug=eq.${slug}&select=*&limit=1`
    );
    const category = categoryData?.[0];

    if (!category) {
      return null;
    }

    // Fetch all related data in parallel
    const [features, types, materials, testimonials, faqs, trustedBrands] = await Promise.all([
      fetchFromSupabase(
        `${baseUrl}/category_features?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
      fetchFromSupabase(
        `${baseUrl}/category_types?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
      fetchFromSupabase(
        `${baseUrl}/product_materials?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
      fetchFromSupabase(
        `${baseUrl}/testimonials?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
      fetchFromSupabase(
        `${baseUrl}/faqs?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
      fetchFromSupabase(
        `${baseUrl}/trusted_brands?category_id=eq.${category.id}&select=*&order_by=display_order.asc`
      ),
    ]);

    return {
      category,
      features: features || [],
      types: types || [],
      materials: materials || [],
      testimonials: testimonials || [],
      faqs: faqs || [],
      trustedBrands: trustedBrands || [],
    };
  } catch (error) {
    console.error("Error fetching category with all data:", error);
    return null;
  }
}

// Product with all related data
export async function getProductWithAllData(productId: string) {
  const baseUrl = `${supabaseUrl}/rest/v1`;

  try {
    // Fetch product
    const productData = await fetchFromSupabase(
      `${baseUrl}/products?id=eq.${productId}&select=*&limit=1`
    );
    const product = productData?.[0];

    if (!product) {
      return null;
    }

    // Fetch category
    const categoryData = await fetchFromSupabase(
      `${baseUrl}/categories?id=eq.${product.category_id}&select=*&limit=1`
    );
    const category = categoryData?.[0];

    // Fetch all related data in parallel
    const [features, types, materials, testimonials, faqs, trustedBrands, relatedProducts] =
      await Promise.all([
        fetchFromSupabase(
          `${baseUrl}/category_features?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/category_types?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/product_materials?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/testimonials?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/faqs?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/trusted_brands?category_id=eq.${product.category_id}&select=*&order_by=display_order.asc`
        ),
        fetchFromSupabase(
          `${baseUrl}/products?category_id=eq.${product.category_id}&id=neq.${productId}&select=*&order_by=display_order.asc&limit=4`
        ),
      ]);

    return {
      product,
      category,
      features: features || [],
      types: types || [],
      materials: materials || [],
      testimonials: testimonials || [],
      faqs: faqs || [],
      trustedBrands: trustedBrands || [],
      relatedProducts: relatedProducts || [],
    };
  } catch (error) {
    console.error("Error fetching product with all data:", error);
    return null;
  }
}

// Get all categories
export async function getAllCategoriesData() {
  const baseUrl = `${supabaseUrl}/rest/v1`;

  try {
    const data = await fetchFromSupabase(
      `${baseUrl}/categories?select=*&is_active=eq.true&order_by=display_order.asc`
    );
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Get all products
export async function getAllProductsData() {
  const baseUrl = `${supabaseUrl}/rest/v1`;

  try {
    const data = await fetchFromSupabase(
      `${baseUrl}/products?select=*,categories(name,slug)&is_active=eq.true&order_by=display_order.asc`
    );
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
