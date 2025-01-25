export interface Product {
  code: number;
  name: string;
  imageUrl: string;
  price: number;
  url: string;
  countOfPrices: number;
  dropRatio: number;
  followCount: number;
}

export interface ProductResponse {
  horizontalProductList: Product[];
  productList: Product[];
  nextUrl: string | null;
}

export interface ProductDetailType {
  mkName: string;
  productName: string;
  badge?: string;
  rating: number;
  imageUrl: string;
  countOfPrices: number;
  freeShipping: boolean;
  lastUpdate: string;
  price: number;
  storageOptions: string[];
}
