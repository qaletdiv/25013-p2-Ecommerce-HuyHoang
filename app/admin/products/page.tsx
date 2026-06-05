import ProductsCard from "../../components/productsCard";
import { Product } from "../../types/types";

export default async function Home() {
  const products: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/products`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  // show danh sách sản phẩm trang admin dưới dạng bảng với các cột: ID, Tên sản phẩm, Danh mục, Giá thấp nhất, Hành động (Sửa/Xóa)
  return (
    <main className="w-full bg-white text-neutral-900">
        <section className="max-w-7xl mx-auto px-8 py-24">
            <h1 className="text-5xl font-light tracking-[0.04em] mb-10">
                Quản Lý Sản Phẩm
            </h1>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border-b border-neutral-200 text-left py-3">ID</th>
                        <th className="border-b border-neutral-200 text-left py-3">Tên sản phẩm</th>
                        <th className="border-b border-neutral-200 text-left py-3">Danh mục</th>
                        <th className="border-b border-neutral-200 text-left py-3">Giá thấp nhất</th>
                        <th className="border-b border-neutral-200 text-left py-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td className="border-b border-neutral-200 py-3">{product.id}</td>
                            <td className="border-b border-neutral-200 py-3">{product.name}</td>
                            <td className="border-b border-neutral-200 py-3">{product. category.name}</td>
                            <td className="border-b border-neutral-200 py-3">{Math.min(...product.variants.map((v) => v.price)).toLocaleString()} VND</td>
                            <td className="border-b border-neutral-200 py-3">
                                <button className="text-blue-500 hover:underline mr-4">Sửa</button>
                                <button className="text-red-500 hover:underline">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </main>
  ); 
}