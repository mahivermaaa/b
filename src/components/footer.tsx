import Link from "next/link";
import { categories } from "@/data/categories";
import { address } from "@/lib/config";
import { BrandLogo } from "./brand-logo";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link href="/" className="brand">
          <BrandLogo />
        </Link>
        <p>
          Woven in Bengal.
          <br />
          <em>Chosen with care.</em>
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <h3>Popular Collections</h3>
          {categories.slice(0, 5).map((c) => (
            <Link href={`/collections/${c.slug}`} key={c.id}>
              {c.name}
            </Link>
          ))}
          <Link href="/collections">View All Collections ↗︎</Link>
        </div>
        <div>
          <h3>Customer Support</h3>
          <Link href="/why-us">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faqs">FAQs</Link>
          <Link href="/contact#viewing">Schedule a Video Call</Link>
        </div>
        <div>
          <h3>Policies</h3>
          <p className="policy-note">
            Shipping, exchange, privacy and terms pages will be available after
            their wording is approved.
          </p>
          <Link href="/faqs">Ordering information ↗︎</Link>
        </div>
        <div>
          <h3>Get in Touch</h3>
          <p>Bunonbari</p>
          <address>{address}</address>
          <p className="delivery-note">Pan-India Delivery</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Bunonbari. All rights reserved.
        </span>
        <span>A B2B digital showroom · Orders coordinated directly</span>
      </div>
    </footer>
  );
}
