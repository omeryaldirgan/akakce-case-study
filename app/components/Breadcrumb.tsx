import { Link } from "@remix-run/react";

interface BreadcrumbProps {
  productName: string;
}

export default function Breadcrumb({ productName }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Ürünler
          </Link>
        </li>
        <li className="text-gray-500 dark:text-gray-400">/</li>
        <li className="text-gray-500 dark:text-gray-400">{productName}</li>
      </ol>
    </nav>
  );
}
