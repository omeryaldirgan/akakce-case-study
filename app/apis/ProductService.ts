import { ProductResponse, ProductDetailType } from "~/models/Product";

const BASE_URL = "https://mock.akakce.dev";

const fetchData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    console.log("response.ok", response);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch Error: ${error}`);
    throw new Error("Failed to fetch data");
  }
};

export const fetchProducts = (): Promise<ProductResponse> =>
  fetchData<ProductResponse>("/page.json");

export const fetchProductDetail = (id: string): Promise<ProductDetailType> =>
  fetchData<ProductDetailType>(`/product${id}.json`);
