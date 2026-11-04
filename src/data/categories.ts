import type { Category } from "@/types/catalogue";
import { products } from "./products";
const names = [
  "Jamdani",
  "Mulmul / Mul Cotton",
  "Bengal Cotton",
  "Linen Sarees",
  "Mercerised Cotton",
  "Matka Silk",
  "Linen Jamdani",
  "Tissue Linen",
  "Modal Silk",
  "Aajrak",
  "Bhujodhi",
  "Linen Paithani",
  "Hand Printed",
  "Kaadhi Cotton",
];
// Add approved cover images and descriptions here, keyed by the category slug.
// Example shape: "jamdani": { coverImage: { src: "/images/catalogue/approved.jpg", alt: "Approved description" } }
const categoryDetails: Record<
  string,
  Pick<Category, "coverImage" | "description">
> = {};
export const categories: Category[] = names.map((name, index) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    id: slug,
    slug,
    name,
    sortOrder: index + 1,
    featured: index < 4,
    ...categoryDetails[slug],
    products: products.filter((product) => product.categoryId === slug),
  };
});
export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
