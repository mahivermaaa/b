import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteOrigin } from "@/lib/config";
import { Motion } from "@/components/motion";
import "./globals.css";
import "./heritage-theme.css";
export const metadata: Metadata = {
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
  title: {
    default: "Bunonbari | Pure Handloom Sarees for Your Business",
    template: "%s | Bunonbari",
  },
  description:
    "Explore Bengal handloom saree collections for boutiques, stores and resellers. Arrange a personal WhatsApp video viewing with Bunonbari, Pune.",
  openGraph: {
    title: "Bunonbari — Pure Handloom Sarees",
    description:
      "From Bengal’s looms to your next collection. A B2B digital showroom for boutiques, stores and resellers.",
    type: "website",
    locale: "en_IN",
    siteName: "Bunonbari",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
