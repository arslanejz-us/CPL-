export interface Industry {
  id: string;
  name: string;
  iconName: string;
  count?: number;
}

export const INDUSTRIES: Industry[] = [
  { id: "apparel-fashion", name: "Apparel & Fashion", iconName: "Shirt", count: 245 },
  { id: "automotive", name: "Automotive", iconName: "Car", count: 189 },
  { id: "baby-products", name: "Baby Products", iconName: "Package", count: 167 },
  { id: "beverages", name: "Beverages, Wine, Liquor", iconName: "Wine", count: 234 },
  { id: "candles", name: "Candle", iconName: "Flame", count: 198 },
  { id: "candy-sweets", name: "Candy & Sweet", iconName: "Gift", count: 156 },
  { id: "cbd", name: "CBD", iconName: "Leaf", count: 145 },
  { id: "chocolate", name: "Chocolate", iconName: "Package", count: 123 },
  { id: "coffee-tea", name: "Coffee & Tea", iconName: "Coffee", count: 176 },
  { id: "cosmetics", name: "Cosmetics", iconName: "Sparkles", count: 289 },
  { id: "custom-coffee-cups", name: "Custom Coffee Cups", iconName: "Coffee", count: 134 },
  { id: "ecommerce", name: "Ecommerce", iconName: "ShoppingCart", count: 267 },
  { id: "electronics", name: "Electronics", iconName: "Zap", count: 201 },
  { id: "food-restaurant", name: "Food & Restaurant", iconName: "UtensilsCrossed", count: 298 },
  { id: "fragrance", name: "Fragrance", iconName: "Droplet", count: 178 },
  { id: "gadgets-accessories", name: "Gadgets and Accessories", iconName: "Smartphone", count: 145 },
  { id: "gift", name: "Gift", iconName: "Gift", count: 212 },
  { id: "health-wellness", name: "Health & Wellness Packaging", iconName: "Heart", count: 223 },
  { id: "holiday", name: "Holiday", iconName: "Sun", count: 167 },
  { id: "jewelry", name: "Jewelry", iconName: "Sparkles", count: 189 },
  { id: "marijuana-cannabis", name: "Marijuana & Cannabis", iconName: "Leaf", count: 134 },
  { id: "office-supplies", name: "Office & Stationery", iconName: "FileText", count: 156 },
  { id: "pet", name: "Pet", iconName: "PawPrint", count: 143 },
  { id: "pharma", name: "Pharma", iconName: "Pill", count: 198 },
  { id: "presentation", name: "Presentation", iconName: "Presentation", count: 121 },
  { id: "retail", name: "Retail", iconName: "Store", count: 267 },
  { id: "shipping", name: "Shipping", iconName: "Truck", count: 234 },
  { id: "soap", name: "Soap", iconName: "Droplet", count: 156 },
  { id: "sports", name: "Sports", iconName: "Trophy", count: 145 },
  { id: "stationery", name: "Stationery", iconName: "Pencil", count: 167 },
  { id: "sustainable", name: "Sustainable Packaging", iconName: "Leaf", count: 189 },
  { id: "tobacco", name: "Tobacco & Cigarettes", iconName: "Package", count: 98 },
];

export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((ind) => ind.id === id);
}
