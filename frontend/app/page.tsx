import ProductsCard from "./components/productsCard";
import { Product } from "./types/types";
import BannerSlider from "./components/bannerSlide";

export default async function Home() {
  const products: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/products`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <main className="w-full bg-white text-neutral-900">

      {/* HERO */}
      <BannerSlider />

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        {/* HEADING */}
        <div className="mb-20 border-b border-neutral-200 pb-10">

          <p className="uppercase tracking-[0.35em] text-sm text-neutral-500 mb-5">
            Bộ Sưu Tập Mới Nhất
          </p>

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">

            <h2 className="text-5xl font-light tracking-[0.04em]">
              Sản Phẩm Nổi Bật
            </h2>

          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.filter((product) => product.hot).map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
            />
          ))}
        </div>


      </section>
      {/* Thời Trang Nam */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        {/* HEADING */}
        <div className="mb-20 border-b border-neutral-200 pb-10">

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">

            <h2 className="text-5xl font-light tracking-[0.04em]">
              Thời Trang Nam
            </h2>

          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.filter((product) => product.categoryId === "c1").slice(0, 4).map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
            />
          ))}
        </div>


      </section>
      {/* Thời Trang Nữ */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        {/* HEADING */}
        <div className="mb-20 border-b border-neutral-200 pb-10">

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">

            <h2 className="text-5xl font-light tracking-[0.04em]">
              Thời Trang Nữ
            </h2>

          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.filter((product) => product.categoryId === "c2").slice(0, 4).map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

      {/* Thời Trang Trẻ Em  */}
      <section className="max-w-7xl mx-auto px-8 py-24">

        {/* HEADING */}
        <div className="mb-20 border-b border-neutral-200 pb-10">

          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">

            <h2 className="text-5xl font-light tracking-[0.04em]">
              Thời Trang Trẻ Em
            </h2>

          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.filter((product) => product.categoryId === "c3").slice(0, 4).map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>


      {/* BOTTOM PROMO */}
      <section className="border-t border-neutral-200 py-24 text-center">

        <p className="uppercase tracking-[0.35em] text-sm text-neutral-500 mb-6">
          HyperLane
        </p>

        <h3 className="text-4xl font-light mb-6">
          Được chế tác dành cho sự sang trọng mỗi ngày.
        </h3>

        <p className="text-neutral-500 max-w-2xl mx-auto leading-8">
          Được thiết kế với độ chính xác cao và sự đơn giản được nâng tầm để tái định nghĩa
          những món đồ thời trang thiết yếu của thời đại.
        </p>

      </section>

    </main>
  );
}