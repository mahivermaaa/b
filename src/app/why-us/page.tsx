import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Connection to Craft",
  description:
    "Based in Pune and working directly with West Bengal weavers, Bunonbari connects boutiques, stores and resellers with Bengal handloom collections.",
};
export default function WhyUs() {
  return (
    <main id="main">
      <section className="about-section section">
        <div>
          <div className="eyebrow">OUR STORY</div>
          <h2>
            A home for
            <br />
            <em>Bengal handloom.</em>
          </h2>
          <p>
            Bunonbari operates from Pune, Maharashtra, working with weavers from
            West Bengal to bring handloom saree collections to boutiques, saree
            stores and resellers.
          </p>
          <p>
            Our digital showroom is an invitation to explore. Through a personal
            WhatsApp video call, you can view available stock and discuss your
            collection directly with our team.
          </p>
          <p>
            From your first enquiry to payment and dispatch, the conversation
            stays personal.
          </p>
        </div>
      </section>
    </main>
  );
}
