import Link from "next/link";
import { faqs } from "@/data/faqs";
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="eyebrow">LET’S BUILD YOUR NEXT COLLECTION</div>
      <h2>
        A closer look.
        <br />
        <em>A personal connection.</em>
      </h2>
      <p>
        Discover available designs, ask your questions, and choose
        <br className="desktop-break" /> your collection with our team on a
        WhatsApp video call.
      </p>
      <Link className="button light" href="/contact#viewing">
        Schedule a Video Call <span>↗</span>
      </Link>
      <small>For boutiques, stores & resellers · Minimum order ₹20,000</small>
    </section>
  );
}
export function FAQList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map(([question, answer], i) => (
        <details key={question}>
          <summary>
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            {question}
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
