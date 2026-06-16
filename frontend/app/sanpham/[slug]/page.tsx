"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [slug, setSlug] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const unwrap = async () => {
      const resolved = await params;
      setSlug(resolved.slug);
    };
    unwrap();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      const [productRes, relatedRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products/${slug}`),
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/productsrelated/${slug}`),
      ]);

      const productData = await productRes.json();
      const relatedData = await relatedRes.json();

      if (!productData?.variants?.length) return;

      const first = productData.variants[0];

      setProduct(productData);
      setRelatedProducts((relatedData || []).slice(0, 4));
      setSelectedVariant(first);
      setSelectedColor(first.color);

      setSelectedImage(productData.images?.[0] || productData.thumbnail);
    };

    fetchData();
  }, [slug]);

  if (!product || !selectedVariant) {
    return (
      <div className="h-screen flex items-center justify-center">Loading...</div>
    );
  }

  const colors = [...new Set(product.variants.map((v: any) => v.color))];

  const sizes = [
    ...new Set(product.variants.filter((v: any) => v.color === selectedColor).map((v: any) => v.size)),
  ];

  const handleColorChange = (color: string) => {
    const variant = product.variants.find((v: any) => v.color === color);
    if (variant) {
      setSelectedColor(color);
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };

  const handleVariantChange = (size: string) => {
    const variant = product.variants.find((v: any) => v.color === selectedColor && v.size === size);
    if (variant) {
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      router.push("/login");
      return;
    }

    addToCart({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      thumbnail: selectedImage,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      {/* DETAIL */}
      <div className="grid md:grid-cols-2 gap-20">
        {/* IMAGE */}
        <div>
          <div className="bg-neutral-100 overflow-hidden">
            <img src={selectedImage} alt={product.name} className="w-full h-[760px] object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            {(product.images || [product.thumbnail]).map((img: string) => (
              <img
                key={img}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`h-28 w-full object-cover cursor-pointer border ${
                  selectedImage === img ? "border-black" : "border-neutral-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-4">Mới đến</p>

          <h1 className="text-5xl font-light mb-8">{product.name}</h1>

          <p className="text-3xl mb-10">{formatPrice(selectedVariant.price)}₫</p>

          <p className="text-neutral-600 leading-8 mb-10">{product.description}</p>

          {/* COLOR */}
          <div className="mb-8">
            <h2 className="mb-3 uppercase text-sm">Màu</h2>

            <div className="flex gap-3">
              {colors.map((color: any) => (
                <button key={color} onClick={() => handleColorChange(color)} className={`px-5 py-3 border ${selectedColor === color ? "bg-black text-white" : ""}`}>
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-8">
            <h2 className="mb-3 uppercase text-sm">Size</h2>

            <div className="flex gap-3">
              {sizes.map((size: any) => (
                <button key={size} onClick={() => handleVariantChange(size)} className={`w-14 h-14 border ${selectedVariant.size === size ? "bg-black text-white" : ""}`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QTY */}
          <div className="flex items-center border w-fit mb-10">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-5 py-4">−</button>

            <span className="px-8">{quantity}</span>

            <button onClick={() => quantity < selectedVariant.stock && setQuantity(quantity + 1)} className="px-5 py-4">+</button>
          </div>

          <button onClick={handleAddToCart} className="w-full bg-black text-white py-5 uppercase">Thêm vào giỏ hàng</button>

          {/* SPEC */}
          <div className="mt-14 border-t pt-8">
            <h2 className="text-xl mb-5">
              Thông số kỹ thuật
              {product.specs && <span className="text-sm text-neutral-500 ml-3">{product.specs}</span>}
            </h2>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="w-full mt-24">
          <h2 className="text-2xl font-light mb-8">Bạn Có Thể Thích</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {relatedProducts.map((item: any) => {
              const minPrice = item.variants?.length ? Math.min(...item.variants.map((v: any) => v.price)) : 0;
              return (
                <Link href={`/sanpham/${item.slug}`} key={item.id} className="group">
                  <div className="overflow-hidden bg-neutral-100">
                    <img src={item.thumbnail} alt={item.name} className="w-full h-[260px] object-cover group-hover:scale-105 transition duration-700" />
                  </div>

                  <div className="pt-4">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-neutral-500">{formatPrice(minPrice)}₫</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}