"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "./brand-logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const home = pathname === "/";
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const mobile = window.matchMedia("(max-width: 900px)");
    if (mobile.matches) document.body.style.overflow = "hidden";
    const closeOnDesktop = () => {
      if (!mobile.matches) {
        setOpen(false);
        document.body.style.overflow = previousOverflow;
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab" || !mobile.matches) return;
      const links = nav.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
      const last = links?.[links.length - 1];
      if (event.shiftKey && document.activeElement === toggle.current) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    mobile.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      mobile.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  const links = [
    ["Home", "/"],
    ["Collections", "/collections"],
    ["Why Us", "/why-us"],
    ["FAQs", "/faqs"],
    ["Contact", "/contact"],
  ];
  return (
    <div
      className={`header-shell ${home ? "home-header" : ""} ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}
    >
      <header className="header">
        <Link
          href="/"
          className="brand"
          aria-label="Bunonbari home"
          onClick={() => setOpen(false)}
        >
          <BrandLogo preload />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <nav
          ref={nav}
          id="main-nav"
          className={open ? "nav is-open" : "nav"}
          aria-label="Main navigation"
        >
          <div className="nav-group nav-left">
            {links.slice(0, 3).map(([label, href], i) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <small>0{i + 1}</small>
                {label}
                <span className="mobile-nav-arrow">↗</span>
              </Link>
            ))}
          </div>
          <div className="nav-group nav-right">
            {links.slice(3).map(([label, href], i) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <small>0{i + 4}</small>
                {label}
                <span className="mobile-nav-arrow">↗</span>
              </Link>
            ))}
            <Link
              href="/contact#viewing"
              className="button nav-cta"
              onClick={() => setOpen(false)}
            >
              Schedule a Video Call <span>↗</span>
            </Link>
          </div>
          <div className="mobile-menu-note">
            Woven in Bengal. Chosen with care.
            <span>For boutiques, stores & resellers.</span>
          </div>
        </nav>
      </header>
    </div>
  );
}
