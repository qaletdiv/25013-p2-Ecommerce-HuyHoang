import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white text-neutral-900">

      {/* HERO */}
      <section className="relative h-[75vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
          alt="about-banner"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/35 flex flex-col justify-center items-center text-white">

          <p className="uppercase tracking-[0.35em] text-sm mb-6 opacity-80">
            Our Story
          </p>

          <h1 className="text-6xl md:text-7xl font-light tracking-[0.08em]">
            HyperLane
          </h1>

        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-6xl mx-auto px-8 py-28 border-b border-neutral-200 text-center">

        <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-8">
          Since 2026
        </p>

        <h2 className="text-5xl font-light max-w-4xl mx-auto leading-tight mb-10">
          Redefining contemporary fashion through timeless simplicity
        </h2>

        <p className="text-neutral-600 leading-8 max-w-3xl mx-auto">
          HyperLane is a Vietnamese contemporary fashion label created for
          individuals who value refined design, elevated essentials and modern
          confidence.
        </p>

      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-8 py-24 space-y-28">

        {/* SECTION */}
        <div>
          <p className="uppercase tracking-[0.25em] text-sm text-neutral-500 mb-6">
            Journey
          </p>

          <h3 className="text-4xl font-light mb-8">
            Our Evolution
          </h3>

          <p className="leading-8 text-neutral-600 mb-8">
            What began as a focused local vision has grown into a modern fashion
            destination that serves customers nationwide through elevated design
            and accessible luxury.
          </p>

          <ul className="space-y-4 text-neutral-700 border-l border-neutral-300 pl-8">
            <li>2026 — Founded in Vietnam</li>
            <li>Built on essential wardrobe pieces</li>
            <li>Expanded through digital commerce</li>
            <li>Growing toward international presence</li>
          </ul>
        </div>

        {/* IMAGE */}
        <div className="relative h-[650px]">
          <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050"
            alt="fashion"
            fill
            className="object-cover"
          />
        </div>

        {/* PHILOSOPHY */}
        <div>
          <p className="uppercase tracking-[0.25em] text-sm text-neutral-500 mb-6">
            Philosophy
          </p>

          <h3 className="text-4xl font-light mb-8">
            Designed For Everyday Luxury
          </h3>

          <div className="space-y-6 text-neutral-600 leading-8">
            <p>
              Premium materials selected for comfort and longevity.
            </p>
            <p>
              Minimal silhouettes refined with modern precision.
            </p>
            <p>
              Balanced craftsmanship between quality and accessibility.
            </p>
            <p>
              A timeless approach beyond temporary trends.
            </p>
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <p className="uppercase tracking-[0.25em] text-sm text-neutral-500 mb-6">
            Collection
          </p>

          <h3 className="text-4xl font-light mb-10">
            Signature Essentials
          </h3>

          <div className="grid md:grid-cols-2 gap-y-5 text-lg">
            <p>Shirts</p>
            <p>T-Shirts & Polos</p>
            <p>Trousers & Shorts</p>
            <p>Outerwear</p>
            <p>Accessories</p>
            <p>Seasonal Capsule Pieces</p>
          </div>
        </div>

        {/* VISION */}
        <div className="border-t border-neutral-200 pt-20 text-center">

          <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6">
            Vision
          </p>

          <h3 className="text-5xl font-light mb-10">
            Fashion That Shapes Identity
          </h3>

          <p className="max-w-3xl mx-auto leading-8 text-neutral-600">
            HyperLane exists to empower self-expression through elevated
            essentials that blend confidence, comfort and modern design.
          </p>

        </div>

      </section>
    </main>
  );
}