import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { CatalogueMedia } from "@/components/catalogue-media";
import { ProductActions } from "@/components/product-actions";

export function generateStaticParams() {
  return categories.flatMap((category) =>
    category.products.map((product) => ({
      slug: category.slug,
      productId: product.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}): Promise<Metadata> {
  const { slug, productId } = await params;
  const product = getCategory(slug)?.products.find((p) => p.id === productId);
  return {
    title: product?.title ?? "Product not found",
    description: product
      ? `${product.title} from the ${getCategory(slug)?.name} collection by Bunonbari.`
      : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;
  const category = getCategory(slug);
  const product = category?.products.find((p) => p.id === productId);
  if (!category || !product) notFound();
  const variant = category.sortOrder - 1;
  const available = product.available !== false;
  const subtitle =
    product.description ??
    [product.color, product.fabric, "saree"].filter(Boolean).join(" ");
  return (
    <main id="main">
      <div className="breadcrumb">
        <Link href="/collections">Collections</Link>
        <span>/</span>
        <Link href={`/collections/${category.slug}`}>{category.name}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>
      <section className="section pdp">
        <div className="pdp-thumbs">
          {product.images.map((image) => (
            <div className="pdp-thumb" key={image.src}>
              <CatalogueMedia image={image} variant={variant} sizes="80px" />
            </div>
          ))}
        </div>
        <div className="pdp-main">
          <CatalogueMedia
            image={product.images[0]}
            variant={variant}
            priority
            sizes="(max-width: 900px) 100vw, 560px"
          />
        </div>
        <div className="pdp-info">
          <h1>{product.title}</h1>
          <p className="pdp-sub">{subtitle}</p>
          <div className="pdp-price">
            {product.price != null
              ? `₹${product.price.toLocaleString("en-IN")}`
              : "Contact for Price"}
          </div>
          <p className="pdp-note">GST &amp; shipping extra.</p>
          {product.color && (
            <div className="pdp-block">
              <div className="pdp-label">
                COLOR <span>— {product.color}</span>
              </div>
              <div className="pdp-swatch">
                <CatalogueMedia
                  image={product.images[0]}
                  variant={variant}
                  sizes="64px"
                />
              </div>
            </div>
          )}
          {product.fabric && (
            <div className="pdp-block">
              <div className="pdp-label">FABRIC</div>
              <span className="pdp-chip">{product.fabric}</span>
            </div>
          )}
          <ProductActions
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.images[0]?.src}
            available={available}
          />
          <ul className="pdp-perks">
            <li>Full payment before dispatch. No COD.</li>
            <li>Dispatch typically 4–5 days after payment confirmation.</li>
            <li>Minimum order ₹20,000 + GST &amp; shipping.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
