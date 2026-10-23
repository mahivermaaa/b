"use client";
import { useState } from "react";
import { rupees, whatsappLink } from "@/lib/whatsapp";
import { useCart } from "./cart-provider";

export function ProductActions({
  id,
  title,
  price,
  image,
  available,
}: {
  id: string;
  title: string;
  price?: number;
  image?: string;
  available: boolean;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const message = [
    "Hello Bunonbari, I would like to order:",
    "",
    `1. ${title} x ${qty}${price != null ? ` - ${rupees(price * qty)}` : ""}`,
    ...(price != null
      ? ["", `Total: ${rupees(price * qty)} (GST & shipping extra)`]
      : []),
  ].join("\n");
  return (
    <div className="pdp-actions">
      <div className="pdp-label">QUANTITY</div>
      <div className="pdp-qty">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span aria-live="polite">{qty}</span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="pdp-add"
        disabled={!available}
        onClick={() => add({ id, title, price, image }, qty)}
      >
        {available ? "Add to cart" : "Out of stock"}
      </button>
      {available ? (
        <a
          className="pdp-buy"
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy it now
        </a>
      ) : (
        <span className="pdp-buy is-disabled" aria-disabled="true">
          Buy it now
        </span>
      )}
    </div>
  );
}
