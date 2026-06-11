"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-white text-neutral-900">

            {/* HERO */}
            <section className="border-b border-neutral-200 py-28 text-center">
                <p className="uppercase tracking-[0.35em] text-sm text-neutral-500 mb-5">
                    Liên hệ
                </p>

                <h1 className="text-5xl font-light tracking-[0.08em] mb-4">
                    Chúng tôi sẵn sàng hỗ trợ bạn
                </h1>

                <p className="text-neutral-500 max-w-xl mx-auto leading-8">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn với các câu hỏi, đơn hàng và mọi thứ bạn cần để có được trải nghiệm mua sắm liền mạch.
                </p>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-24">

                {/* FORM */}
                <div>
                    <h2 className="uppercase tracking-[0.25em] text-sm mb-10 text-neutral-500">
                        Gửi tin nhắn cho chúng tôi
                    </h2>

                    <form className="space-y-10">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full border-b border-neutral-300 py-4 outline-none focus:border-black transition bg-transparent"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border-b border-neutral-300 py-4 outline-none focus:border-black transition bg-transparent"
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="w-full border-b border-neutral-300 py-4 outline-none focus:border-black transition bg-transparent"
                        />

                        <textarea
                            rows={5}
                            placeholder="Your Message"
                            className="w-full border-b border-neutral-300 py-4 outline-none focus:border-black transition resize-none bg-transparent"
                        />

                        <button
                            type="submit"
                            className="bg-black text-white px-14 py-4 uppercase tracking-[0.2em] text-sm hover:bg-neutral-800 transition"
                        >
                            Gửi
                        </button>
                    </form>
                </div>

                {/* INFO */}
                <div>
                    <h2 className="uppercase tracking-[0.25em] text-sm mb-10 text-neutral-500">
                        Thông tin liên hệ
                    </h2>

                    <div className="space-y-10">

                        <div className="flex gap-5 items-start">
                            <MapPin className="w-5 h-5 mt-1 text-neutral-700" />
                            <div>
                                <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                                    Địa chỉ
                                </p>
                                <p>Thanh Hóa, Việt Nam</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-start">
                            <Phone className="w-5 h-5 mt-1 text-neutral-700" />
                            <div>
                                <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                                    Liên Hệ
                                </p>
                                <p>0123 456 789</p>
                            </div>
                        </div>

                        <div className="flex gap-5 items-start">
                            <Mail className="w-5 h-5 mt-1 text-neutral-700" />
                            <div>
                                <p className="uppercase text-xs tracking-[0.2em] text-neutral-500 mb-2">
                                    Email
                                </p>
                                <p>support@hyperlane.com</p>
                            </div>
                        </div>
                    </div>

                    {/* MAP */}
                    <div className="mt-16 border border-neutral-200 overflow-hidden">
                        <iframe
                            src="https://maps.google.com/maps?q=Thanh%20Hoa&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            className="w-full h-[380px]"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}