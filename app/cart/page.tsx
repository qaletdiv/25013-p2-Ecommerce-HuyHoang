"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } =
    useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-8">
        <h1 className="text-5xl font-light tracking-[0.15em] uppercase mb-6">
          Giỏ hàng trống
        </h1>

        <p className="text-neutral-500 mb-10 tracking-wide">
          Túi mua sắm của bạn đang chờ sẵn.
        </p>

        <Link
          href="/sanpham"
          className="bg-black text-white px-10 py-4 uppercase text-sm tracking-[0.2em] hover:bg-neutral-800 transition"
        >
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-20">
      {/* Title */}
      <h1 className="text-5xl font-light uppercase tracking-[0.18em] mb-16">
        Shopping Bag
      </h1>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Left */}
        <div className="lg:col-span-2 space-y-10">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 border-b border-neutral-200 pb-10"
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-44 h-56 object-cover bg-neutral-100"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-light">
                    {item.name}
                  </h2>

                  <p className="uppercase tracking-[0.15em] text-sm text-neutral-500 mt-3">
                    {item.color} / {item.size}
                  </p>

                  <p className="text-xl mt-5">
                    {item.price.toLocaleString()}₫
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-5 mt-8">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max(
                          1,
                          item.quantity - 1
                        )
                      )
                    }
                    className="w-12 h-12 border hover:bg-black hover:text-white transition"
                  >
                    −
                  </button>

                  <span className="text-lg w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                    className="w-12 h-12 border hover:bg-black hover:text-white transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="text-sm uppercase tracking-[0.15em] text-neutral-400 hover:text-black transition"
              >
                Xóa Khỏi Giỏ Hàng
              </button>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="border border-neutral-200 p-10 h-fit sticky top-28">
          <h2 className="text-2xl font-light uppercase tracking-[0.15em] mb-10">
            Đơn Hàng Của Bạn
          </h2>

          <div className="space-y-5 text-sm tracking-wide">
            <div className="flex justify-between">
              <span>Tóm Tắt Đơn Hàng</span>
              <span>
                {total.toLocaleString()}₫
              </span>
            </div>

            <div className="flex justify-between">
              <span>Vận Chuyển</span>
              <span>Miễn Phí</span>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-8 pt-8 flex justify-between text-xl font-medium">
            <span>Total</span>
            <span>
              {total.toLocaleString()}₫
            </span>
          </div>

          <button
            onClick={() => router.push("/checkout")}
            className="w-full mt-8 bg-black text-white py-4 rounderd-xl hover:opacity-90 transition"
          >
            Thanh Toán
          </button>

          <Link
            href="/sanpham"
            className="block text-center mt-6 text-sm uppercase tracking-[0.15em] text-neutral-500 hover:text-black transition"
          >
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    </div>
  );
}