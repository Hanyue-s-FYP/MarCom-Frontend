import type { CreateProduct, EditProduct, GetProduct, ProductTableData } from "@/types/Products";
import { callApi } from "@/utils";
import type { GeneralResponse } from ".";

export const getProductsTableByBusinessID = async (id: number): Promise<ProductTableData[]> => {
  const res = await getProducts(id);
  const result: ProductTableData[] = [];

  if (res) {
    for (const el of res as GetProduct[]) {
      const simplifiedEnvs = await callApi(`environments/has-product/${el.ID ?? 0}`, {
        method: "GET",
      });
      result.push({ ...el, InEnvironments: simplifiedEnvs?.Data ?? [] });
    }
  }

  return result; // if empty backend will return null, just make it to empty array
};

export const getProducts = async (id: number): Promise<GetProduct[]> => {
  const res = await callApi(`business-products/${id}`, {
    method: "GET",
  });

  if (res?.Data) {
    return res?.Data;
  }

  return [];
};

export const createProduct = async (data: CreateProduct): Promise<GeneralResponse> => {
  return await callApi("products", {
    method: "POST",
    data,
  });
};

export const getProduct = async (id: number): Promise<GetProduct> => {
  return await callApi(`products/${id}`, {
    method: "GET",
  });
};

export const getProductWithSimplifiedEnv = async (
  id: number,
): Promise<ProductTableData | undefined> => {
  const product = await getProduct(id);
  if (product) {
    const inEnvs = await callApi(`environments/has-product/${product?.ID ?? 0}`, {
      method: "GET",
    });
    return { ...product, InEnvironments: inEnvs?.Data ?? [] };
  }
  return undefined;
};

export const updateProduct = async (data: EditProduct | GetProduct): Promise<GeneralResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Report: _, ...rest } = data as GetProduct; // for efficiency purpose just trick ts into believing that
  return await callApi(`products`, {
    method: "PUT",
    data: rest,
  });
};

export const deleteProduct = async (id: number): Promise<GeneralResponse> => {
  return await callApi(`products/${id}`, { method: "DELETE" });
};

export const generateProductCompetitorReport = async (id: number): Promise<GetProduct> => {
  return await callApi(`products/report/${id}`, { method: "GET" });
};
