import { resolveSiteOrigin } from "@/lib/site-origin";
export { isValidWhatsappNumber } from "@/lib/enquiry";
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteOrigin = resolveSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  productionHost,
);
export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "";
// Reserved for the approved client video. Rendering stays disabled until supplied.
export const heroVideo: {
  enabled: boolean;
  src: string | null;
  poster: string | null;
} = { enabled: false, src: null, poster: null };
export const address =
  "Kunal Iconia, St Tukaram Nagar, Mamurdi, Pimpri-Chinchwad, Pune, Maharashtra 412101.";
