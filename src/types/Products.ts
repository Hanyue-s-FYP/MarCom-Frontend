import type { SimplifiedEnvironment } from "./Environments";

export interface CreateProduct {
  Name: string;
  Description: string;
  Price: number;
  Cost: number;
  BusinessID: number;
}

export type EditProduct = CreateProduct & { ID: number; Report: string };

export type GetProduct = EditProduct;

export type ProductTableData = GetProduct & { InEnvironments: SimplifiedEnvironment[] };

export type DashboardProduct = GetProduct & { InEnvironments: number };
