import { PolicyPage, policyMetadata } from "@/components/policy-page";

export const metadata = policyMetadata(
  "Privacy Policy",
  "How Bunonbari collects, uses and protects the information you share when you enquire or order.",
);

export default function Privacy() {
  return (
    <PolicyPage
      eyebrow="POLICIES"
      wide
      title="Privacy Policy"
      updated="October 2026"
      intro="Bunonbari respects your privacy. This policy explains what information we collect when you use this website or contact us, how we use it, and the choices you have."
      sections={[
        {
          heading: "What we collect",
          list: [
            "Details you give us when you send an enquiry or request a video call, such as your name, business name, phone number, city and the collections you are interested in.",
            "Details you share with our team on WhatsApp while arranging a viewing or an order, such as delivery address and GST number.",
            "Your shopping cart, which is saved in your own browser so it is still there when you return.",
            "Basic technical information, such as browser type and pages visited, which our hosting provider may record to keep the website running and secure.",
          ],
        },
        {
          heading: "What we do not collect",
          paragraphs: [
            "This website does not take card or bank details. Payments are arranged directly with our team, and we do not store your payment credentials on the website.",
          ],
        },
        {
          heading: "How we use your information",
          list: [
            "To reply to your enquiry and arrange a WhatsApp video viewing.",
            "To confirm, pack, dispatch and deliver your order, and to keep our accounts and GST records.",
            "To tell you about new collections, only if you have asked us to or have ordered from us before. You can ask us to stop at any time.",
            "To improve this website and keep it secure.",
          ],
        },
        {
          heading: "Sharing your information",
          paragraphs: [
            "We do not sell your personal information. We share it only with the people who help us serve you, such as courier partners who need your delivery details, our website hosting provider, and WhatsApp when you chat with us there. These services have their own privacy practices. We may also share information when the law requires it.",
          ],
        },
        {
          heading: "WhatsApp and third-party links",
          paragraphs: [
            "When you press Checkout or a WhatsApp link, you are taken to WhatsApp, which is run by a separate company. What you send there is also covered by WhatsApp's own terms and privacy policy.",
          ],
        },
        {
          heading: "Cookies and local storage",
          paragraphs: [
            "We use your browser's local storage to remember your cart. You can clear it at any time from your browser settings, which will also empty your cart.",
          ],
        },
        {
          heading: "How long we keep information",
          paragraphs: [
            "We keep enquiry and order details for as long as we need them to serve you and to meet our tax and accounting obligations.",
          ],
        },
        {
          heading: "Your choices",
          paragraphs: [
            "You can ask us to show you the personal information we hold about you, correct it, or delete it where the law allows. Just message us through the Contact page or on WhatsApp.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this policy from time to time. The latest version is always on this page, with the date it was last updated.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Bunonbari, Pune, Maharashtra. For any privacy question, please reach us through the Contact page or on WhatsApp.",
          ],
        },
      ]}
    />
  );
}
