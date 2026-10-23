import { PolicyPage, policyMetadata } from "@/components/policy-page";

export const metadata = policyMetadata(
  "Refund Policy",
  "Bunonbari does not offer refunds. Eligible orders can be exchanged for another saree, as explained here.",
);

export default function Refund() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      title="Refund Policy"
      wide
      updated="October 2026"
      intro="Bunonbari does not offer refunds. Every order is prepared for a business buyer from stock you have chosen personally, and payment is taken in full before dispatch. If something is wrong with your order, we will exchange it as described below."
      sections={[
        {
          heading: "No refunds",
          paragraphs: [
            "Once payment is confirmed and an order is accepted, it cannot be cancelled or refunded. This applies to the saree price, GST and shipping charges. There are no cash-on-delivery adjustments, since all orders are paid in full before dispatch.",
          ],
        },
        {
          heading: "When we exchange",
          list: [
            "You received a different saree, colour or quantity from what was confirmed with you.",
            "A saree arrived damaged in transit or has a clear defect that was not visible when you viewed it.",
            "Items are missing from the parcel.",
          ],
        },
        {
          heading: "What is not a defect",
          paragraphs: [
            "Our sarees are handwoven. Slight irregularities in the weave, small differences in shade or motif placement, and the natural feel of handloom fabric are part of the product and are not reasons for an exchange. Slight colour differences between a screen or video and the saree in hand are also not a defect.",
          ],
        },
        {
          heading: "How to request an exchange",
          list: [
            "Message our team on WhatsApp within 48 hours of delivery.",
            "Share your order details and clear photographs of the saree and the parcel.",
            "Please record a short unboxing video when you open the parcel. It helps us settle courier claims quickly.",
          ],
        },
        {
          heading: "How the exchange works",
          paragraphs: [
            "Once we have checked your photos and video, we will offer an exchange for the affected items with another saree from available stock, of the same value. Sarees sent back for exchange must be unused, unwashed and in their original condition. We bear the shipping cost of an exchange when the problem was caused by our error or by damage in transit.",
            "If we do not have a suitable saree of the same value in stock, our team will work with you to choose other designs from our current collection.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For any question about an exchange, please reach us through the Contact page or on WhatsApp.",
          ],
        },
      ]}
    />
  );
}
