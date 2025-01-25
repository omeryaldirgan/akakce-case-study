import { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { json, MetaFunction } from "@remix-run/node";
import { fetchProducts } from "~/apis/ProductService";
import ProductCard from "~/components/ProductCard";
import HorizontalList from "~/components/HorizontalList";
import GridToggle from "~/components/GridToggle";

export const loader = async () => {
  const products = await fetchProducts();
  return json(products);
};

export const meta: MetaFunction = () => {
  return [
    { title: "Ürünler | Akakçe" },
    {
      property: "og:title",
      content: "Ürünler",
    },
    {
      name: "description",
      content: "Ne Nerede En Ucuz Akakçe'de | Piyasaya Göre En Ucuz Ürünler",
    },
  ];
};

export default function Index() {
  const { horizontalProductList, productList, nextUrl } =
    useLoaderData<typeof loader>();
  const [products, setProducts] = useState(productList);
  const [next, setNext] = useState(nextUrl);
  const [loading, setLoading] = useState<boolean>(false);
  const [gridCols, setGridCols] = useState<number>(3);

  const loadMore = async () => {
    if (!next || loading) return;
    setLoading(true);

    try {
      const response = await fetch(next);
      const data = await response.json();
      setProducts((prev) => [...prev, ...data.productList]);
      setNext(data.nextUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-24">
        <HorizontalList products={horizontalProductList} />
      </div>

      <GridToggle gridCols={gridCols} setGridCols={setGridCols} />
      <div
        className={`grid gap-6 ${
          gridCols === 2
            ? "grid-cols-2"
            : gridCols === 3
            ? "md:grid-cols-3"
            : "lg:grid-cols-4"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>

      {next && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Daha Fazla Yükle
          </button>
        </div>
      )}
    </div>
  );
}
