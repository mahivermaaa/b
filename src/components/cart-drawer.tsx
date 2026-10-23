"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { rupees, whatsappLink } from "@/lib/whatsapp";
import { useCart } from "./cart-provider";

const money = rupees;

export function CartDrawer() {
  const { items, count, total, isOpen, openCart, closeCart, setQty, remove } = useCart();
  const closeButton = useRef<HTMLButtonElement>(null);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  useEffect(() => {
    try {
      setName(localStorage.getItem("bunonbari-name") ?? "");
      setBusiness(localStorage.getItem("bunonbari-business") ?? "");
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("bunonbari-name", name);
      localStorage.setItem("bunonbari-business", business);
    } catch {
      /* ignore */
    }
  }, [name, business]);
  const ready = name.trim().length > 0;

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
    `Name: ${name.trim()}`,
    ...(business.trim() ? [`Business: ${business.trim()}`] : []),
    "",
    ...lines,
    "",
    `Total: ${money(total)} (GST & shipping extra)`,
  ].join("\n");
  const checkoutHref = whatsappLink(message);

  return (
    <>
      {count > 0 && (
      <button
        type="button"
        className="cart-fab"
        aria-label={`Open cart${count > 0 ? `, ${count} items` : ""}`}
        onClick={openCart}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 4h2.5l2.2 10.5a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L20 8H6.2" />
          <circle cx="9.5" cy="19.5" r="1.4" />
          <circle cx="17" cy="19.5" r="1.4" />
        </svg>
        <span className="cart-fab-count">{count}</span>
      </button>
      )}
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
          <div className="cart-customer">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name (required)"
              autoComplete="name"
              aria-label="Your name"
            />
            <input
              type="text"
              value={business}
              onChange={(event) => setBusiness(event.target.value)}
              placeholder="Boutique / store name"
              autoComplete="organization"
              aria-label="Boutique or store name"
            />
          </div>
          {items.length > 0 && ready ? (
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
