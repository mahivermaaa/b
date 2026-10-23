export type CatalogueImage = { src: string; alt: string };
export type Product = {
  id: string;
  categoryId: string;
  title: string;
  images: CatalogueImage[];
  description?: string;
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
