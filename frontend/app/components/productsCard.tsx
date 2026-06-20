"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../types/types";
import { useCart } from "../context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductsCard({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const { addToCart } = useCart();

  const firstVariant =
    product.variants?.[0];

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const user = localStorage.getItem("user");

    if (!user || user === "undefined") {
      router.push("/login");
      return;
    }

    if (!firstVariant) return;

    addToCart({
      id: `${product.id}-${firstVariant.id}`,
      productId: product.id.toString(),
      variantId: firstVariant.id.toString(),
      name: product.name,
      price: firstVariant.price,
      thumbnail: product.thumbnail,
      color: firstVariant.color,
      size: firstVariant.size,
      quantity: 1,
    });
  };

  return (
    <article className="group block">
      <Link
        href={`/sanpham/${product.slug}`}
        className="group block"
      >
        <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />
        </div>

        <div className="pt-6 space-y-3">
          <p className="uppercase tracking-[0.22em] text-xs text-neutral-500">
            {product.category?.name}
          </p>

          <h3 className="text-xl font-light">
            {product.name}
          </h3>

          <p className="text-lg">
            {formatPrice(firstVariant?.price || 0)}₫
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="w-full border border-black py-3 mt-4 hover:bg-black hover:text-white transition"
      >
        Thêm vào giỏ hàng
      </button>
    </article>
  );
}