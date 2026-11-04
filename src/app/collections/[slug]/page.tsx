import { redirect } from "next/navigation";

// Individual collection pages were removed; the collections overview is the only list.
export default function CollectionPage() {
  redirect("/collections");
}
