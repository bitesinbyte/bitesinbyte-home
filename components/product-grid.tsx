"use client";

import { useReveal } from "@/hooks/use-reveal";

export interface Product {
  name: string;
  title: string;
  description: string;
  url: string;
  cover: string;
  tags?: string[];
  featured?: boolean;
}

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const isFeatured = product.featured;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card-glow group block overflow-hidden rounded-xl ${
        isFeatured ? "sm:col-span-2" : ""
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div
        className={`relative flex flex-col justify-end bg-cover bg-center p-6 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl ${
          isFeatured ? "min-h-[400px] sm:min-h-[420px]" : "min-h-[340px]"
        }`}
        style={{ backgroundImage: `url(${product.cover})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60" />

        {/* Content */}
        <div className={`relative z-10 translate-y-2 transition-transform duration-500 group-hover:translate-y-0 ${
          isFeatured ? "max-w-2xl" : ""
        }`}>
          {product.tags && product.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/10 px-2.5 py-0.5 text-xs text-white/90 backdrop-blur-md transition-colors group-hover:bg-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className={`font-bold text-white ${isFeatured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            {product.name}
          </h3>
          <p className={`mt-1 font-medium text-white/85 ${isFeatured ? "text-base" : "text-sm"}`}>
            {product.title}
          </p>
          <p className={`mt-2 text-white/60 transition-colors group-hover:text-white/75 ${
            isFeatured ? "line-clamp-3 text-sm sm:text-base" : "line-clamp-2 text-sm"
          }`}>
            {product.description}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
            Visit site &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={`reveal-stagger grid gap-6 sm:grid-cols-2 ${visible ? "visible" : ""}`}
    >
      {products.map((product, i) => (
        <ProductCard key={product.name} product={product} index={i} />
      ))}
    </div>
  );
}
