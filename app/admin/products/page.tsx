import Link from "next/link";
import { Product } from "../../types/types";

export default async function AdminProductsPage() {
  const products: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/products`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <main className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-light">
          Quản Lý Sản Phẩm
        </h1>

        <Link
          href="/admin/products/create"
          className="px-5 py-3 bg-black text-white"
        >
          Thêm sản phẩm
        </Link>
      </div>

      <div className="overflow-x-auto border">
        <table className="w-full">
          <thead className="bg-neutral-100">
            <tr>
              <th className="text-left p-4">
                ID
              </th>

              <th className="text-left p-4">
                Tên sản phẩm
              </th>

              <th className="text-left p-4">
                Danh mục
              </th>

              <th className="text-left p-4">
                Giá thấp nhất
              </th>

              <th className="text-center p-4">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const minPrice =
                product.variants?.length
                  ? Math.min(
                      ...product.variants.map(
                        (v) => v.price
                      )
                    )
                  : 0;

              return (
                <tr
                  key={product.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {product.id}
                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category?.name}
                  </td>

                  <td className="p-4">
                    {minPrice.toLocaleString()}
                    ₫
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Sửa
                      </Link>

                      <button
                        className="text-red-500 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}