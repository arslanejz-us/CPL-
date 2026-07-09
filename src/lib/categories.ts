import { supabase } from "./supabase";
import { cache } from "react";

export interface Category {
  id: string;
  name: string;
  description: string;
  slug?: string;
  image?: string;
}

export const getCategory = cache(async (categoryId: string): Promise<Category | undefined> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .single();

  if (error || !data) {
    console.error("Error fetching category:", error);
    return undefined;
  }

  return data as unknown as Category;
});

export const getAllCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return (data || []) as unknown as Category[];
});

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | undefined> => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Error fetching category by slug:", error);
      return undefined;
    }

    return data as unknown as Category;
  }
);
