"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const pathname = usePathname();
    const { cart } = useCart();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    useEffect(() => {
        const savedUser =
            localStorage.getItem("user");

        if (
            savedUser &&
            savedUser !== "undefined"
        ) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null);
        }
    }, [pathname]);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);

        window.location.href = "/";
    };

    return (
        <header className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex items-center justify-between h-20">

                    <Link
                        href="/"
                        className="text-2xl font-light tracking-[0.35em] uppercase"
                    >
                        HyperLane
                    </Link>

                    <nav className="hidden md:flex gap-10 text-sm uppercase tracking-[0.18em] text-neutral-500">
                        <Link href="/">Trang Chủ</Link>
                        <Link href="/sanpham">Sản Phẩm</Link>
                        <Link href="/about">Giới Thiệu</Link>
                        <Link href="/contact">Liên Hệ</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-6">

                        {/* Cart */}
                        <Link
                            href={
                                user
                                    ? "/cart"
                                    : "/login"
                            }
                            className="relative text-neutral-500 hover:text-black transition"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-2">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/profile"
                                    className="text-sm font-medium hover:text-black"
                                >
                                    {user.name}
                                </Link>
                            </div>
                        ) : (
                            <Link href="/login">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 21a8 8 0 10-16 0" />
                                    <circle
                                        cx="12"
                                        cy="7"
                                        r="4"
                                    />
                                </svg>
                            </Link>
                        )}
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() =>
                            setOpen(!open)
                        }
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    );
}