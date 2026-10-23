import type { Metadata } from "next";
import { FAQList, FinalCTA } from "@/components/sections";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Minimum order, video viewings, payment, dispatch and shipping information for Bunonbari business customers.",
};
export default function FAQs() {
  return (
    <main id="main">
      <section className="page-intro">
        <div className="eyebrow">BEFORE WE BEGIN</div>
        <h1>
          A few questions.
          <br />
          <em>Thoughtful answers.</em>
        </h1>
        <p>
          Everything you need to know about choosing your collection with
          Bunonbari.
        </p>
      </section>
      <section className="section standalone-faq">
        <FAQList />
      </section>
      <FinalCTA />
    </main>
  );
}
