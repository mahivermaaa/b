"use client";
import Image from "next/image";
import { useState } from "react";
import type { CatalogueImage } from "@/types/catalogue";
import { Textile } from "./textile";
export function CatalogueMedia({
  image,
  variant = 0,
  priority = false,
  sizes = "(max-width: 600px) 50vw, 25vw",
}: {
  image?: CatalogueImage;
  variant?: number;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) return <Textile variant={variant} />;
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      preload={priority}
      onError={() => setFailed(true)}
    />
  );
}
