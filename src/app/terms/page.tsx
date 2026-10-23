import { PolicyPage, policyMetadata } from "@/components/policy-page";

export const metadata = policyMetadata(
  "Terms & Conditions",
  "Terms for ordering handloom sarees from Bunonbari, a B2B supplier based in Pune for boutiques, saree stores and resellers.",
);

export default function Terms() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      wide
      title="Terms & Conditions"
      updated="October 2026"
      intro="These terms apply when you browse this website, view our collections or place an order with Bunonbari. Bunonbari is a business-to-business supplier of Bengal handloom sarees, based in Pune, Maharashtra. By using this website or placing an order, you agree to these terms."
      sections={[
        {
          heading: "Who we sell to",
          paragraphs: [
            "Bunonbari supplies boutiques, saree stores and resellers. Our collections and prices are meant for business buyers who purchase in quantity, not for individual retail purchases.",
          ],
        },
        {
          heading: "Ordering",
          list: [
            "The minimum order value is ₹20,000, plus GST and shipping.",
            "Designs shown on this website are a preview. Available stock is confirmed with you personally, usually on a WhatsApp video call.",
            "An order is confirmed only when our team accepts it on WhatsApp and we have received your payment.",
            "Items added to the cart on this website are not reserved until the order is confirmed by our team.",
          ],
        },
        {
          heading: "Prices and payment",
          list: [
            "Prices are in Indian rupees. GST and shipping are charged extra unless we tell you otherwise in writing.",
            "Full payment is required before dispatch. We do not offer cash on delivery.",
            "Prices and availability can change without notice until your order is confirmed.",
          ],
        },
        {
          heading: "Dispatch and delivery",
          paragraphs: [
            "We deliver across India. Dispatch is typically 4–5 days after payment confirmation. Delivery times depend on the courier and your location, and delays caused by couriers, weather or public holidays are outside our control.",
            "Risk of loss passes to you once the parcel is handed to the courier. Please check the parcel when it arrives and report any damage as described in our Refund Policy.",
          ],
        },
        {
          heading: "Handloom products",
          paragraphs: [
            "Our sarees are handwoven. Small variations in weave, texture, motif placement and shade are natural features of handloom and are not defects. Colours may also look different on different screens and in photographs or video.",
          ],
        },
        {
          heading: "Images and content",
          paragraphs: [
            "Some images on this website are illustrative or AI-created and are marked as such. They are not a promise of available stock. The photographs, text and designs on this website belong to Bunonbari and may not be copied or reused without our permission.",
          ],
        },
        {
          heading: "Our liability",
          paragraphs: [
            "To the extent permitted by law, Bunonbari is not liable for indirect or consequential losses, such as lost sales or profit, arising from the use of this website or from an order. Our total liability for any order is limited to the amount you paid for that order.",
          ],
        },
        {
          heading: "Changes to these terms",
          paragraphs: [
            "We may update these terms from time to time. The version published on this page when you place an order is the one that applies to that order.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of India. Any dispute will be subject to the courts at Pune, Maharashtra.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For any question about these terms, please reach us through the Contact page or on WhatsApp.",
          ],
        },
      ]}
    />
  );
}
