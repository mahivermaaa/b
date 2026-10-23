import Image from "next/image";

export function BrandLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Image
      className="brand-image"
      src="/images/brand/bunonbari-logo-transparent.png"
      alt="Bunonbari — The Bengal Weave Co."
      width={2172}
      height={724}
      sizes="(max-width: 600px) 155px, 200px"
      preload={preload}
    />
  );
}
