export interface Product {
  name: string;
  description: string;
  sellingPrice: number;
  cost: number;
}

export type ProductTableData = Product & { usedCount: number };
