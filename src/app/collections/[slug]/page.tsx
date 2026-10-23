import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { ProductCard } from "@/components/product-card";
import { ProductBrowser } from "@/components/product-browser";
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const category = getCategory((await params).slug);
  return {
    title: category?.name ?? "Collection not found",
    description: category
      ? `Explore ${category.name} with Bunonbari. Schedule a WhatsApp video call to view currently available designs for your business.`
      : undefined,
  };
}
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  return (
    <main id="main">
      <div className="breadcrumb">
        <Link href="/collections">Collections</Link>
        <span>/</span>
        <span>{category.name}</span>
      </div>
      <section className="section designs-section">
        {category.products.length > 0 ? (
          <ProductBrowser
            products={category.products}
            variant={category.sortOrder - 1}
          />
        ) : (
          <div className="product-grid">
            {Array.from({ length: 8 }, (_, n) => (
              <ProductCard
                key={n}
                product={{ title: "Product name", images: [] }}
                variant={category.sortOrder - 1}
                placeholder
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
