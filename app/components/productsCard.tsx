import { Product } from "../types/types";
import Link from "next/link";

const ProductsCard = ({
  product,
}: {
  product: Product;
}) => {
  const price =
    product.variants?.[0]?.price || 0;

  return (
    <Link
      href={`/sanpham/${product.slug}`}
      className="group block"
    >
      <article>

        {/* IMAGE */}
        <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">

          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />

        </div>

        {/* CONTENT */}
        <div className="pt-6 space-y-3">

          {/* CATEGORY */}
          <p className="uppercase tracking-[0.22em] text-xs text-neutral-500 font-medium">
            {product.category?.name ||
              "HyperLane"}
          </p>

          {/* NAME */}
          <h3 className="text-xl font-light tracking-[0.02em] text-neutral-900 leading-snug group-hover:text-black transition">
            {product.name}
          </h3>

          {/* PRICE */}
          <p className="text-lg font-light text-neutral-700 pt-1">
            {price.toLocaleString()}₫
          </p>

        </div>
      </article>
    </Link>
  );
};

export default ProductsCard;