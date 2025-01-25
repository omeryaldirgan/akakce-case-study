import { useState } from "react";
import { json, MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchProductDetail } from "~/apis/ProductService";
import Breadcrumb from "~/components/Breadcrumb";
import ProductRating from "~/components/ProductRating";
import StorageOptions from "~/components/StorageOptions";
import { formatLastUpdate, formatPrice } from "~/utils/common";
import { ProductDetailType } from "~/models/Product";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const product = await fetchProductDetail(params.id as string);
  return json(product);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "Ürün Bulunamadı" }];
  }
  return [
    { title: `${data.productName} - En Uygun Fiyat` },
    {
      name: "description",
      content: `${data.productName} için en iyi fiyatları ve detayları keşfedin.`,
    },
    { property: "og:title", content: `${data.productName} - En Uygun Fiyat` },
    {
      property: "og:description",
      content: `Şimdi satın al: ${data.productName} - ${formatPrice(
        data.price
      )} TL`,
    },
    { property: "og:image", content: data.imageUrl },
    { property: "og:type", content: "product" },
  ];
};

export default function ProductDetail() {
  const product = useLoaderData<ProductDetailType>();
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb productName={product.productName} />
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 mt-3">
        <img
          alt={product.productName}
          src={product.imageUrl}
          className="aspect-2/3 w-full rounded-lg bg-gray-100 dark:bg-gray-800 object-cover sm:col-span-4 lg:col-span-5"
        />

        <div className="sm:col-span-8 lg:col-span-7">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
            >
              {product.mkName}
            </a>
            <ProductRating
              rating={product.rating}
              totalReviews={product.countOfPrices}
            />
          </div>

          <h2 className="text-2xl font-medium text-gray-900 dark:text-gray-100 sm:pr-12">
            {product.productName}
          </h2>

          {product.badge && (
            <span className="inline-flex items-center rounded-md bg-yellow-50 dark:bg-yellow-900 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-300 ring-1 ring-yellow-600/20 ring-inset">
              {product.badge}
            </span>
          )}

          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {formatPrice(product.price)} TL
          </p>

          {product.storageOptions.length > 0 && (
            <section className="mt-6">
              <h3 className="text-md font-semibold text-gray-900 dark:text-gray-200">
                Kapasite Seçenekleri:
              </h3>
              <StorageOptions
                options={product.storageOptions}
                onChange={setSelectedStorage}
              />
              {selectedStorage && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Seçili: {selectedStorage}
                </p>
              )}
            </section>
          )}

          <section className="mt-4 p-4 border rounded-lg bg-white dark:bg-gray-900 shadow-xs">
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {product.countOfPrices} satıcı içinde kargo dahil en ucuz fiyat
              seçeneği
            </p>
            {product.freeShipping && (
              <p className="text-green-600 dark:text-green-400 font-medium mt-1">
                🚚 Ücretsiz kargo
              </p>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Son güncelleme: {formatLastUpdate(product.lastUpdate)}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
