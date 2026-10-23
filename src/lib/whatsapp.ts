export const WHATSAPP_NUMBER = "919028300495";
export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
