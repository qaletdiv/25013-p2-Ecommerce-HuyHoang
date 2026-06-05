"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Variant = {
  id: string;
  size: string;
  color: string;
  price: number;
  stock: number;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: Category;
  variants: Variant[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category.slug))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Search
    data = data.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Category
    if (category !== "all") {
      data = data.filter((p) => p.category.slug === category);
    }

    // Price
    if (price !== "all") {
      data = data.filter((p) => {
        const minPrice = Math.min(...p.variants.map((v) => v.price));

        switch (price) {
          case "under200":
            return minPrice < 200000;
          case "200to400":
            return minPrice >= 200000 && minPrice <= 400000;
          case "above400":
            return minPrice > 400000;
          default:
            return true;
        }
      });
    }

    // Sort
    if (sort === "low") {
      data.sort(
        (a, b) =>
          Math.min(...a.variants.map((v) => v.price)) -
          Math.min(...b.variants.map((v) => v.price))
      );
    }

    if (sort === "high") {
      data.sort(
        (a, b) =>
          Math.min(...b.variants.map((v) => v.price)) -
          Math.min(...a.variants.map((v) => v.price))
      );
    }

    return data;
  }, [products, search, category, price, sort]);

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">Đang tải sản phẩm...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">

      {/* Header */}
      <div className="mb-16">
        <p className="uppercase tracking-[0.25em] text-sm text-neutral-500 mb-4">
          Bộ sưu tập mới nhất của chúng tôi
        </p>

        <h1 className="text-5xl font-light uppercase tracking-[0.12em]">
          Sản Phẩm
        </h1>

        <p className="text-neutral-500 mt-4 max-w-xl leading-7">
          Khám phá những món đồ thiết yếu vượt thời gian được chế tác dành cho
          sự thanh lịch hiện đại.
        </p>
      </div>

      {/* Filter */}
      <div className="grid md:grid-cols-4 gap-6 mb-20">

        <input
          type="text"
          placeholder="Search"
          className="border-b border-neutral-300 py-4 px-2 outline-none focus:border-black bg-transparent uppercase text-sm tracking-[0.15em]"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="border-b border-neutral-300 py-4 px-2 bg-transparent outline-none focus:border-black uppercase text-sm tracking-[0.15em]"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="all">
            Tất cả danh mục
          </option>

          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border-b border-neutral-300 py-4 px-2 bg-transparent outline-none focus:border-black uppercase text-sm tracking-[0.15em]"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        >
          <option value="all">
            Tất cả giá
          </option>

          <option value="under200">
            Dưới 200k
          </option>

          <option value="200to400">
            200K — 400K
          </option>

          <option value="above400">
            Trên 400k
          </option>
        </select>

        <select
          className="border-b border-neutral-300 py-4 px-2 bg-transparent outline-none focus:border-black uppercase text-sm tracking-[0.15em]"
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Mặc định
          </option>

          <option value="low">
            Giá tăng dần
          </option>

          <option value="high">
            Giá giảm dần
          </option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">

        {filteredProducts.map(
          (product) => {
            const minPrice =
              Math.min(
                ...product.variants.map(
                  (v) => v.price
                )
              );

            return (
              <Link
                href={`/sanpham/${product.slug}`}
                key={product.id}
                className="group"
              >
                {/* Image */}
                <div className="overflow-hidden bg-neutral-100">
                  <img
                    src={
                      product.thumbnail
                    }
                    alt={product.name}
                    className="w-full h-[460px] object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                {/* Info */}
                <div className="pt-6">

                  <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-3">
                    {
                      product.category
                        .name
                    }
                  </p>

                  <h2 className="text-lg font-light mb-3">
                    {product.name}
                  </h2>

                  <p className="text-neutral-500 text-sm line-clamp-2 leading-6">
                    {
                      product.description
                    }
                  </p>

                  <div className="flex justify-between items-center mt-6">

                    <span className="text-lg font-medium">
                      {minPrice.toLocaleString()}
                      ₫
                    </span>

                    <span className="uppercase text-xs tracking-[0.18em] border-b border-black pb-1">
                      View
                    </span>

                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>

      {/* Empty */}
      {filteredProducts.length ===
        0 && (
          <div className="text-center py-32 text-neutral-500 uppercase tracking-[0.15em]">
            Không tìm thấy sản phẩm
          </div>
        )}
    </div>
  );
}