import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { address } from "@/lib/config";
import { getCategory } from "@/data/categories";
export const metadata: Metadata = {
  title: "Contact & Video Viewing",
  description:
    "Arrange a personal WhatsApp video viewing of Bunonbari handloom saree collections. For boutiques, saree stores and resellers across India.",
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ collection?: string }>;
}) {
  const { collection } = await searchParams;
  const selected = collection ? getCategory(collection)?.name : undefined;
  return (
    <main id="main">
      <section className="contact-layout section">
        <div className="contact-copy">
          <div className="eyebrow">LET’S CONNECT</div>
          <h1>
            Your collection
            <br />
            begins with
            <br />
            <em>a conversation.</em>
          </h1>
          <p>
            Let us bring the showroom to you. Explore available designs over a
            WhatsApp video call, with our team by your side.
          </p>
          <div className="contact-detail">
            <h2>Find us in Pune</h2>
            <address>{address}</address>
            <span>
              Working with weavers in West Bengal.
              <br />
              Delivering across India.
            </span>
          </div>
          <div className="contact-detail">
            <h2>A few things to know</h2>
            <p>
              Minimum order ₹20,000 + GST & shipping.
              <br />
              Full payment before dispatch. No COD.
              <br />
              Dispatch typically 4–5 days after payment confirmation.
            </p>
          </div>
        </div>
        <div id="viewing">
          <EnquiryForm key={selected ?? "all"} selectedCollection={selected} />
        </div>
      </section>
    </main>
  );
}
