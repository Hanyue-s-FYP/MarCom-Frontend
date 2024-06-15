import type { SimplifiedEnvironment } from "./Environments";

export interface CreateProduct {
  name: string;
  description?: string;
  sellingPrice?: number;
  cost?: number;
}

export type EditProduct = CreateProduct & { id: number };

export type GetProduct = EditProduct & { inEnvironments: SimplifiedEnvironment[] };

export type ProductTableData = GetProduct;
