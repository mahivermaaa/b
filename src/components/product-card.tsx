"use client";
import Link from "next/link";
import type { Product } from "@/types/catalogue";
import { CatalogueMedia } from "./catalogue-media";
import { useCart } from "./cart-provider";

export function ProductCard({
  product,
  variant,
  placeholder = false,
}: {
  product: Pick<Product, "title" | "price" | "images" | "available"> & {
    id?: string;
    categoryId?: string;
  };
  variant: number;
  placeholder?: boolean;
}) {
  const { add } = useCart();
  const price = placeholder
    ? "₹0,000"
    : product.price != null
      ? `₹${product.price.toLocaleString("en-IN")}`
      : "Contact for Price";
  const soldOut = !placeholder && product.available === false;
  const href =
    !placeholder && product.id && product.categoryId
      ? `/collections/${product.categoryId}/products/${product.id}`
      : null;
  const top = (
    <>
      <div className="product-image">
        <CatalogueMedia
          image={product.images[0]}
          variant={variant}
          sizes="(max-width: 700px) 50vw, 25vw"
        />
        {soldOut && <span className="product-tag">Out of stock</span>}
      </div>
      <h3>{product.title}</h3>
    </>
  );
  return (
    <article className="product-card">
      {href ? (
        <Link href={href} className="product-link">
          {top}
        </Link>
      ) : (
        top
      )}
      <p className="product-price">{price}</p>
      <button
        type="button"
        className="add-to-cart"
        disabled={placeholder || soldOut || !product.id}
        onClick={() =>
          product.id &&
          add({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0]?.src,
          })
        }
      >
        {soldOut ? "Out of stock" : "Add to cart"}
      </button>
    </article>
  );
}
