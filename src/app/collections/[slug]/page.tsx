import { redirect } from "next/navigation";

// Collection grid pages were removed; the collections overview is the only list.
export default function CollectionPage() {
  redirect("/collections");
}
