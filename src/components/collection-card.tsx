import Link from "next/link";
import type { Category } from "@/types/catalogue";
import { CatalogueMedia } from "./catalogue-media";
import { editorialStudies } from "@/data/editorial";
export function CollectionCard({ category }: { category: Category }) {
  return (
    <Link className="collection-card" href={`/collections/${category.slug}`}>
      <div className="collection-image">
        <CatalogueMedia
          image={
            category.coverImage ??
            editorialStudies[(category.sortOrder - 1) % editorialStudies.length]
          }
          variant={category.sortOrder - 1}
        />
        <span className="collection-number">
          {String(category.sortOrder).padStart(2, "0")}
        </span>
        {!category.coverImage && (
          <span className="illustration-label">ILLUSTRATIVE MOOD STUDY</span>
        )}
      </div>
      <div className="collection-info">
        <h3>{category.name}</h3>
        <span aria-hidden="true">↗︎</span>
      </div>
      <span className="collection-link">View Collection</span>
    </Link>
  );
}
