const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

async function executeQuery(table: string, columns: string, filters: Array<{column: string, value: any}>, isSingle: boolean) {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("select", columns);

    for (const filter of filters) {
      queryParams.append(filter.column, `eq.${filter.value}`);
    }

    const url = `${supabaseUrl}/rest/v1/${table}?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { data: null, error: true };
    }

    const data = await response.json();
    const result = isSingle
      ? { data: Array.isArray(data) ? data[0] || null : data, error: null }
      : { data: Array.isArray(data) ? data : [], error: null };

    return result;
  } catch (error) {
    return { data: null, error };
  }
}

class QueryBuilder {
  private table: string;
  private columns: string = "*";
  private filters: Array<{ column: string; value: any }> = [];
  private isSingle: boolean = false;

  constructor(table: string) {
    this.table = table;
  }

  select(columns: string = "*") {
    this.columns = columns;
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push({ column, value });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  // Make this thenable
  [Symbol.toStringTag] = "Promise";

  then(onFulfilled?: ((value: any) => any) | null, onRejected?: ((reason?: any) => any) | null) {
    return executeQuery(this.table, this.columns, this.filters, this.isSingle).then(onFulfilled, onRejected);
  }

  catch(onRejected?: ((reason?: any) => any) | null) {
    return executeQuery(this.table, this.columns, this.filters, this.isSingle).catch(onRejected);
  }

  finally(onFinally?: (() => void) | null) {
    return executeQuery(this.table, this.columns, this.filters, this.isSingle).finally(onFinally);
  }
}

class SupabaseClient {
  from(table: string) {
    return new QueryBuilder(table);
  }
}

export const supabase = new SupabaseClient();

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          title: string;
          subtitle: string;
          description: string;
          badge: string;
          category_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["products"]["Row"], "created_at">;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["categories"]["Row"], "created_at">;
      };
    };
  };
};
