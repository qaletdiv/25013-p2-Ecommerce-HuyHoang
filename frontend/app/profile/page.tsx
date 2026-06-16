"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        // Lấy orders từ API 
        const user = localStorage.getItem("user");

        if (!user) return router.push("/login");
        const parsed = JSON.parse(user);
        setUser(parsed);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/orders/${parsed.id}`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch(() => setOrders([]));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (!user) return null;

    return (
        <main className="min-h-screen bg-white text-black">

            <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-16">

                {/* User Info */}
                <div className="border border-neutral-200 p-10 h-fit">

                    <h2 className="text-2xl font-light mb-10">
                        Thông tin cá nhân
                    </h2>

                    <div className="space-y-8">

                        <div>
                            <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                              Tên đầy đủ
                            </p>
                            <p className="text-lg">
                                {user.name}
                            </p>
                        </div>

                        <div>
                            <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                                Email
                            </p>
                            <p className="text-lg">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                                Vai trò
                            </p>
                            <p className="text-lg capitalize">
                                {user.role}
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full mt-12 bg-black text-white py-4 uppercase tracking-[0.2em] hover:bg-neutral-800 transition"
                    >
                        Đăng xuất
                    </button>
                </div>

                {/* Orders */}
                <div className="md:col-span-2">

                    <h2 className="text-2xl font-light mb-10">
                        Lịch sử mua hàng
                    </h2>

                    <div className="space-y-6">

                        {orders.length === 0 ? (
                            <div className="border border-neutral-200 p-8 text-neutral-500">
                                Chưa có đơn hàng nào.
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border border-neutral-200 p-8 hover:border-black transition"
                                >
                                    <div className="flex justify-between mb-4">
                                        <p className="font-medium">
                                            {order.id}
                                        </p>

                                        <p className="text-sm text-neutral-500">
                                            {order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString()
                                                : order.date}
                                        </p>
                                    </div>

                                    <p className="text-xl font-light mb-3">
                                        {formatPrice(order.total)}
                                        ₫
                                    </p>

                                    <p className="uppercase text-xs tracking-[0.2em] text-neutral-500">
                                        {order.status}
                                    </p>
                                </div>
                            ))
                        )}

                    </div>
                </div>

            </section>
        </main>
    );
}