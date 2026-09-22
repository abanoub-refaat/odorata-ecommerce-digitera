export type ProductId = string;

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ScentAnatomy = {
  top: string;
  heart: string;
  base: string;
  narrative?: string;
};

export type ProductDetailsInfo = {
  scentAnatomy?: ScentAnatomy;
  concentration?: string;
  longevity?: string;
  sillage?: string;
  ingredients?: string;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  notes: string;
  price: number;
  images: string[];
  category: string;
  scentFamily: string;
  occasion: string;
  options: ProductOption[];
  details?: ProductDetailsInfo;
};

export type ProductSort = "name-asc" | "name-desc" | "price-asc" | "price-desc";

export type ProductListQuery = {
  search?: string;
  category?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSearchParams = Record<string, string | string[] | undefined>;
