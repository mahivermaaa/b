export type CatalogueImage = { src: string; alt: string };
export type Product = {
  id: string;
  categoryId: string;
  title: string;
  images: CatalogueImage[];
  description?: string;
  price?: number; // INR; when missing the card shows "Contact for Price"
  fabric?: string;
  color?: string;
  priceVisibility: "contact";
  available?: boolean;
};
export type Category = {
  id: string;
  slug: string;
  name: string;
  sortOrder: number;
  featured: boolean;
  coverImage?: CatalogueImage;
  description?: string;
  products: Product[];
};
