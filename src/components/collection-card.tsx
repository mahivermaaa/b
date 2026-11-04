"use client";
import type { Category } from "@/types/catalogue";
import { CatalogueMedia } from "./catalogue-media";
import { useCart } from "./cart-provider";
import { editorialStudies } from "@/data/editorial";
export function CollectionCard({ category }: { category: Category }) {
  const { add } = useCart();
  return (
    <div className="collection-card">
      <div className="collection-card-link">
        <div className="collection-image">
          <CatalogueMedia
            image={
              category.coverImage ??
              editorialStudies[
                (category.sortOrder - 1) % editorialStudies.length
              ]
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
          <button
            type="button"
            className="card-add"
            onClick={() =>
              add({
                id: category.slug,
                title: category.name,
                image: category.coverImage?.src,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
