import { Link } from "@remix-run/react";
import { Product } from "~/models/Product";
import { formatPrice } from "~/utils/common";

interface ProductCardProps {
  product: Product;
  layout?: "vertical" | "horizontal";
}

export default function ProductCard({
  product,
  layout = "vertical",
}: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.code}`}
      className={`group block rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 ${
        layout === "horizontal" ? "flex items-center space-x-4 p-3" : ""
      }`}
    >
      <div className="relative">
        {product.dropRatio > 0 && (
          <span
            className={`absolute z-10 bg-red-600 text-white text-xs font-bold w-9 h-9 flex items-center justify-center rounded-full ${
              layout === "horizontal" ? "top-0 right-1" : " top-2 left-2"
            }`}
          >
            %{product.dropRatio}
          </span>
        )}

        <img
          src={product.imageUrl}
          alt={product.name}
          className={`bg-gray-100 dark:bg-gray-700 object-contain transition ${
            layout === "horizontal"
              ? "w-36 h-36 rounded-md flex-shrink-0"
              : "aspect-square w-full rounded-t-lg group-hover:opacity-75"
          }`}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {product.name}
        </h3>
        <p
          data-testid="product-price"
          className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100"
        >
          {formatPrice(product.price)} TL
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {product.countOfPrices} satıcı →
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {product.followCount.toLocaleString()}+ takip
        </p>
      </div>
    </Link>
  );
}
