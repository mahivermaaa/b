export const isValidWhatsappNumber = (number: string) =>
  /^[1-9]\d{7,14}$/.test(number);
export const normalizeCustomerNumber = (number: string) =>
  number.replace(/[\s()+-]/g, "");
export const isValidCustomerNumber = (number: string) =>
  /^[1-9]\d{9,14}$/.test(normalizeCustomerNumber(number));

export type EnquiryDetails = {
  businessType?: string;
  businessName: string;
  phone: string;
  city: string;
  collection?: string;
  time?: string;
};

/** Prepares a URL only. The visitor must review and send the message in WhatsApp. */
export function buildEnquiryUrl(
  number: string,
  details: EnquiryDetails,
): string | undefined {
  if (!isValidWhatsappNumber(number) || !isValidCustomerNumber(details.phone))
    return undefined;
  if (!details.businessName.trim() || !details.city.trim()) return undefined;
  const lines = [
    "Hello Bunonbari, I would like to schedule a video call to explore your saree collections.",
    "",
    ...(details.businessType?.trim()
      ? [`Business Type: ${details.businessType.trim()}`]
      : []),
    `Business Name: ${details.businessName.trim()}`,
    `WhatsApp: ${normalizeCustomerNumber(details.phone)}`,
    `City: ${details.city.trim()}`,
    ...(details.collection?.trim()
      ? [`Interested Collection: ${details.collection.trim()}`]
      : []),
    `Preferred Time: ${details.time?.trim() || "Please coordinate with me"}`,
  ];
  const message = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
