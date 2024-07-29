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

export const updateProduct = async (data: EditProduct): Promise<GeneralResponse> => {
  return await callApi(`products`, {
    method: "PUT",
    data,
  });
};
