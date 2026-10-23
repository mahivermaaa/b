"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { rupees, whatsappLink } from "@/lib/whatsapp";
import { useCart } from "./cart-provider";

const money = rupees;

export function CartDrawer() {
  const { items, count, total, isOpen, closeCart, setQty, remove } = useCart();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  const lines = items.map(
    (item, index) =>
      `${index + 1}. ${item.title} x ${item.qty}${
        item.price != null ? ` - ${money(item.price * item.qty)}` : ""
      }`,
  );
  const message = [
    "Hello Bunonbari, I would like to place an order:",
    "",
    ...lines,
    "",
    `Total: ${money(total)} (GST & shipping extra)`,
  ].join("\n");
  const checkoutHref = whatsappLink(message);

  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " is-open" : ""}`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={`cart-drawer${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-head">
          <h2>Your cart{count > 0 ? ` (${count})` : ""}</h2>
          <button
            ref={closeButton}
            type="button"
            className="cart-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-thumb">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="72px"
                      />
                    )}
                  </div>
                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>
                      {item.price != null
                        ? money(item.price)
                        : "Contact for Price"}
                    </p>
                    <div className="cart-qty">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="cart-remove"
                        onClick={() => remove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-foot">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{money(total)}</strong>
          </div>
          <small>GST &amp; shipping extra. Order is confirmed on WhatsApp.</small>
          {items.length > 0 ? (
            <a
              className="cart-checkout"
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Checkout
            </a>
          ) : (
            <span className="cart-checkout is-disabled" aria-disabled="true">
              Checkout
            </span>
          )}
        </div>
      </aside>
    </>
  );
}
