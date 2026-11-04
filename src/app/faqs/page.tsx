import { redirect } from "next/navigation";

// The FAQs now live on the homepage.
export default function FAQs() {
  redirect("/#faq");
}
