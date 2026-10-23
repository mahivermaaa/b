import type { Category } from "@/types/catalogue";
import { products } from "./products";
const names = [
  "Mulmul Cotton",
  "Jamdani",
  "Bengal Cotton",
  "Tissue",
  "Linen Tissue",
  "Linen by Linen",
  "Mercerised Cotton",
  "Matka Silk",
  "Modal Silk",
  "Tussar Silk",
  "Muslin Silk",
  "Murshidabadi Silk",
  "Cotton Silk",
  "Paithani",
  "Hand Embroidery",
  "Baluchari",
  "Ajrak",
  "Bujhodi",
];
// Add approved cover images and descriptions here, keyed by the category slug.
// Example shape: "jamdani": { coverImage: { src: "/images/catalogue/approved.jpg", alt: "Approved description" } }
const categoryDetails: Record<
  string,
  Pick<Category, "coverImage" | "description">
> = {};
export const categories: Category[] = names.map((name, index) => {
  const slug = name.toLowerCase().replaceAll(" ", "-");
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
