import { redirect } from "next/navigation";

// Individual product pages were removed; send visitors to the collection.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/collections/${slug}`);
}
