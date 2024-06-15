import type { SimplifiedEnvironment } from "./Environments";

export interface CreateProduct {
  name: string;
  description?: string;
  sellingPrice?: number;
  cost?: number;
}

export type EditProduct = CreateProduct & { id: number };

export type GetProduct = EditProduct;

export type ProductTableData = GetProduct & { inEnvironments: SimplifiedEnvironment[] };
