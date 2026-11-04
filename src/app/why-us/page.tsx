import { redirect } from "next/navigation";

// The story now lives on the homepage.
export default function WhyUs() {
  redirect("/#story");
}
