import { ProductGrid } from "@/components/product-grid";
import { RevealSection } from "@/components/home/reveal-section";
import { products } from "@/lib/site-data";

export function ProductsSection() {
  return (
    <section id="products" className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-24">
        <RevealSection className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Products
          </h2>
          <p className="mt-3 text-muted-foreground">
            Tools and platforms we build and maintain
          </p>
        </RevealSection>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
