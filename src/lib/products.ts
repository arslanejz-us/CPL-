import { cache } from "react";

export interface CircularFeature {
  number: number;
  iconName: string;
  title: string;
  description: string;
}

export interface ContentSection {
  title: string;
  subtitle?: string;
  description: string;
  bullets: string[];
  image?: string;
  imagePosition: "left" | "right";
}

export interface RelatedProduct {
  id: string;
  name: string;
  link: string;
}

export interface ProductShowcaseItem {
  id: number;
  title: string;
  description: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  heroImage?: string;
  heroQuickBenefits: string[];
  keyFeatures: {
    title: string;
    description: string;
    iconName: string;
  }[];
  packagingBenefits: {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    features: CircularFeature[];
  };
  contentSections: ContentSection[];
  showcaseItems: ProductShowcaseItem[];
  relatedProducts: RelatedProduct[];
  category_id?: string;
}

async function fetchFromSupabase(table: string, query: string): Promise<any> {
  const supabaseUrl = "https://ofcwangxybkcigwhonia.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mY3dhbmd4eWJrY2lnd2hvbmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MzQ1MDEsImV4cCI6MjA5ODQxMDUwMX0.1BFTDegKKBedvS6kfsqHPpJvkJPWtWSxJ-GX0OldPE4";

  try {
    const url = `${supabaseUrl}/rest/v1/${table}${query}`;
    const response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Supabase API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }
}

export const getProduct = async (productId: string): Promise<Product | undefined> => {
  try {
    const data = await fetchFromSupabase("products", `?id=eq.${productId}&select=*&limit=1`);

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`Product not found: ${productId}`);
      return undefined;
    }

    return (data[0] as unknown as Product);
  } catch (error) {
    console.error(`getProduct error: ${error}`);
    return undefined;
  }
};

export const getAllProducts = cache(async (): Promise<Product[]> => {
  try {
    const data = await fetchFromSupabase("products", `?select=*`);

    if (!Array.isArray(data)) {
      return [];
    }

    return (data as unknown as Product[]);
  } catch (error) {
    console.error(`getAllProducts error: ${error}`);
    return [];
  }
});

export const getAllProductIds = cache(async (): Promise<string[]> => {
  try {
    const data = await fetchFromSupabase("products", `?select=id`);

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: { id: string }) => item.id);
  } catch (error) {
    console.error(`getAllProductIds error: ${error}`);
    return [];
  }
});

export const getProductsByCategory = cache(
  async (categoryId: string): Promise<Product[]> => {
    try {
      const data = await fetchFromSupabase("products", `?category_id=eq.${categoryId}&select=*`);

      if (!Array.isArray(data)) {
        return [];
      }

      return (data as unknown as Product[]);
    } catch (error) {
      console.error(`getProductsByCategory error: ${error}`);
      return [];
    }
  }
);
