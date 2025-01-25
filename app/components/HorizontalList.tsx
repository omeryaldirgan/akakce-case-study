import { useRef, useState, useEffect } from "react";
import { Product } from "~/models/Product";
import ProductCard from "./ProductCard";
import ChevronLeft from "lucide-react/ChevronLeft";
import ChevronRight from "lucide-react/ChevronRight";

interface HorizontalListProps {
  products: Product[];
}

export default function HorizontalList({ products }: HorizontalListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    updateScrollState();

    scrollElement.addEventListener("scroll", updateScrollState);
    return () => scrollElement.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          data-testid="scroll-left"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition hidden sm:flex items-center justify-center"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        <div className="inline-flex space-x-4">
          {products.map((product) => (
            <div key={product.code} className="w-1/3 flex-shrink-0 snap-center">
              <ProductCard product={product} layout="horizontal" />
            </div>
          ))}
        </div>
      </div>

      {canScrollRight && (
        <button
          data-testid="scroll-right"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-200 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition hidden sm:flex items-center justify-center"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
