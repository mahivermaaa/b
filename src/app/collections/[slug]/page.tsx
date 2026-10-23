import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { CatalogueMedia } from "@/components/catalogue-media";
import { editorialStudies } from "@/data/editorial";
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
  const contact = `/contact?collection=${encodeURIComponent(category.slug)}#viewing`;
  return (
    <main id="main">
      <div className="breadcrumb">
        <Link href="/collections">Collections</Link>
        <span>/</span>
        <span>{category.name}</span>
      </div>
      <section className="category-hero">
        <div className="category-art">
          <CatalogueMedia
            image={
              category.coverImage ??
              editorialStudies[
                (category.sortOrder - 1) % editorialStudies.length
              ]
            }
            variant={category.sortOrder - 1}
            priority
            sizes="(max-width: 600px) 100vw, 50vw"
          />
          {!category.coverImage && (
            <span className="illustration-label">
              AI-CREATED MOOD STUDY · NOT PRODUCT STOCK
            </span>
          )}
        </div>
        <div className="category-copy">
          <div className="eyebrow">
            THE COLLECTION / {String(category.sortOrder).padStart(2, "0")}
          </div>
          <h1>{category.name}</h1>
          {category.description && <p>{category.description}</p>}
          <p>
            Explore this collection with our team. Schedule a video call to view
            currently available designs.
          </p>
          <Link href={contact} className="button">
            Request Video Call <span>↗</span>
          </Link>
          <Link href={contact} className="text-link">
            General collection enquiry <span>→</span>
          </Link>
          <span className="minimum-note">
            ₹20,000 minimum order · GST & shipping extra
          </span>
        </div>
      </section>
      <section className="section designs-section">
        <div className="small-section-title">
          <h2>A closer look at the collection</h2>
          <span>PERSONAL VIEWING</span>
        </div>
        {category.products.length > 0 ? (
          <div className="product-grid">
            {category.products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <CatalogueMedia
                    image={product.images[0]}
                    variant={category.sortOrder - 1}
                    sizes="(max-width: 600px) 100vw, 33vw"
                  />
                </div>
                <h3>{product.title}</h3>
                {product.description && <p>{product.description}</p>}
                <p>Contact for Price</p>
                <Link href={contact} className="text-link">
                  Request Video Call ↗
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-collection">
            <span aria-hidden="true" className="empty-symbol">
              ✧
            </span>
            <h3>The best view is a personal one.</h3>
            <p>
              Collection photographs are being prepared.
              <br />
              Our team can show you currently available designs on a video call.
            </p>
            <Link href={contact} className="text-link">
              Arrange your collection viewing <span>↗</span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
