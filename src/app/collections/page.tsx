import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { CollectionCard } from "@/components/collection-card";
import { FinalCTA } from "@/components/sections";
export const metadata: Metadata = {
  title: "Our Collections",
  description:
    "Explore 18 saree collections, from Mulmul Cotton and Jamdani to silk and hand embroidery. View available designs on a personal video call.",
};
export default function Collections() {
  return (
    <main id="main">
      <section className="page-intro">
        <div className="eyebrow">THE BUNONBARI CATALOGUE</div>
        <h1>
          A world of weaves.
          <br />
          <em>Your next collection.</em>
        </h1>
        <p>
          Explore our collection families. For a closer look at available
          designs,
          <br className="desktop-break" /> arrange a personal video viewing with
          our team.
        </p>
        <span className="catalogue-count">
          18 COLLECTIONS <span>·</span> ₹20,000 MINIMUM ORDER
        </span>
      </section>
      <section className="section catalogue-section">
        <div className="small-section-title">
          <h2>The featured edit</h2>
          <span>01 — 04</span>
        </div>
        <div className="collection-grid featured-grid">
          {categories.slice(0, 4).map((c) => (
            <CollectionCard key={c.id} category={c} />
          ))}
        </div>
        <div className="small-section-title remaining-title">
          <h2>Explore further</h2>
          <span>05 — 18</span>
        </div>
        <div className="collection-grid secondary-grid">
          {categories.slice(4).map((c) => (
            <CollectionCard key={c.id} category={c} />
          ))}
        </div>
        <p className="image-disclaimer">
          Illustrative textile studies, not product photographs. Actual stock is
          shown during your viewing.
        </p>
      </section>
      <FinalCTA />
    </main>
  );
}
