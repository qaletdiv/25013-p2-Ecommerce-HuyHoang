"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

type Payment = {
    id: string;
    name: string;
    type: "cash" | "bank" | "qr";
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    qr?: string;
};

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("");

    const [shipping, setShipping] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) return router.push("/login");

        const parsed = JSON.parse(user);

        setShipping((prev) => ({
            ...prev,
            name: parsed.name || "",
        }));

        fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/payments`
        )
            .then((res) => res.json())
            .then((data) => {
                setPayments(data);
                setPaymentMethod(data[0]?.id || "");
            })
            .finally(() => setLoading(false));
    }, [router]);

    const total = useMemo(
        () =>
            cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            ),
        [cart]
    );

    const selectedPayment = payments.find(
        (p) => p.id === paymentMethod
    );

    const updateShipping = (
        key: keyof typeof shipping,
        value: string
    ) => {
        setShipping((prev) => ({ ...prev, [key]: value }));
    };

    const handleConfirm = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            return router.push("/login");
        }

        const parsedUser = JSON.parse(user);
        if (!selectedPayment) {
            return alert("Vui lòng chọn phương thức thanh toán.");
        }

        if (!shipping.name || !shipping.phone || !shipping.address) {
            return alert("Vui lòng điền đầy đủ thông tin giao hàng.");
        }

        if (cart.length === 0) {
            return alert("Giỏ hàng đang trống.");
        }

        const payload = {
            userId: parsedUser.id,
            name: shipping.name,
            phone: shipping.phone,
            address: shipping.address,
            items: cart.map((item) => ({
                variantId: item.variantId,
                quantity: item.quantity,
            })),
            paymentMethod: selectedPayment.id,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE}/api/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            return alert(
                error?.message ||
                    "Không thể tạo đơn hàng. Vui lòng thử lại sau."
            );
        }

        const result = await res.json();
        const savedOrder = {
            id: result.orderId || `o-${Date.now()}`,
            userId: parsedUser.id,
            name: shipping.name,
            phone: shipping.phone,
            address: shipping.address,
            items: cart,
            total,
            paymentMethod: selectedPayment.id,
            status: "pending",
            createdAt: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
        };

        const storedOrders =
            JSON.parse(localStorage.getItem("orders") || "[]");
        localStorage.setItem(
            "orders",
            JSON.stringify([...storedOrders, savedOrder])
        );

        clearCart();
        router.push("/confirm-checkout");
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-8 py-20">
            <h1 className="text-5xl font-light mb-16 uppercase">
                Checkout
            </h1>

            <div className="grid md:grid-cols-2 gap-20">
                {/* LEFT */}
                <div>
                    {/* SHIPPING */}
                    <Section title="Shipping">
                        <Input
                            placeholder="Name"
                            value={shipping.name}
                            onChange={(v:any) =>
                                updateShipping("name", v)
                            }
                        />
                        <Input
                            placeholder="Phone"
                            value={shipping.phone}
                            onChange={(v:any) =>
                                updateShipping("phone", v)
                            }
                        />
                        <Textarea
                            placeholder="Address"
                            value={shipping.address}
                            onChange={(v:any) =>
                                updateShipping("address", v)
                            }
                        />
                    </Section>

                    {/* PAYMENT */}
                    <Section title="Payment">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                {payments.map((method) => (
                                    <label
                                        key={method.id}
                                        className={`block border p-5 cursor-pointer transition ${paymentMethod === method.id
                                                ? "border-black bg-neutral-50"
                                                : "border-neutral-300 hover:border-black"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            checked={
                                                paymentMethod === method.id
                                            }
                                            onChange={() =>
                                                setPaymentMethod(method.id)
                                            }
                                            className="mr-4"
                                        />
                                        {method.name}
                                    </label>
                                ))}
                            </div>

                            <PaymentDetail
                                payment={selectedPayment}
                            />
                        </div>
                    </Section>
                </div>

                {/* RIGHT */}
                <div className="border p-10 h-fit">
                    <h2 className="text-2xl mb-8">
                        Order Summary
                    </h2>

                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between"
                            >
                                <span>
                                    {item.name} x {item.quantity}
                                </span>
                                <span>
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString()}
                                    ₫
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-6 mt-8 flex justify-between text-xl">
                        <span>Tổng cộng</span>
                        <span>
                            {total.toLocaleString()}₫
                        </span>
                    </div>

                    <button
                        onClick={handleConfirm}
                        className="w-full mt-8 bg-black text-white py-4 hover:bg-neutral-800"
                    >
                        Xác nhận đơn hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------- COMPONENTS ---------- */

function Section({
    title,
    children,
}: any) {
    return (
        <div className="mb-14">
            <h2 className="text-2xl mb-8">
                {title}
            </h2>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}

function Input({
    value,
    onChange,
    placeholder,
}: any) {
    return (
        <input
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            placeholder={placeholder}
            className="w-full border-b py-4 outline-none"
        />
    );
}

function Textarea({
    value,
    onChange,
    placeholder,
}: any) {
    return (
        <textarea
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            placeholder={placeholder}
            className="w-full border-b py-4 outline-none"
        />
    );
}

function PaymentDetail({
    payment,
}: {
    payment?: Payment;
}) {
    if (!payment) return null;

    if (payment.type === "cash") {
        return (
            <div className="border p-8 flex items-center justify-center text-center">
                Thanh toán khi nhận hàng
            </div>
        );
    }

    if (payment.type === "bank") {
        return (
            <div className="border p-8 space-y-4">
                <p>
                    <b>Ngân hàng:</b>{" "}
                    {payment.bankName}
                </p>
                <p>
                    <b>STK:</b>{" "}
                    {payment.accountNumber}
                </p>
                <p>
                    <b>Chủ TK:</b>{" "}
                    {payment.accountName}
                </p>
            </div>
        );
    }

    return (
        <div className="border p-8 text-center">
            <img
                src={payment.qr}
                alt="QR"
                className="w-56 mx-auto"
            />
            <p className="mt-4 text-neutral-500">
                Quét mã để thanh toán
            </p>
        </div>
    );
}