export type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

/**
 * Minimal, dependency-free `cn` helper compatible with the shadcn/ui API.
 * Joins truthy class names (supports strings, arrays and { class: condition } maps).
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const push = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(push);
    } else if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) out.push(key);
      }
    }
  };

  inputs.forEach(push);
  return out.join(" ");
}
