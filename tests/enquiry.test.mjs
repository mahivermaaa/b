import test from "node:test";
import assert from "node:assert/strict";
import {
  buildEnquiryUrl,
  isValidWhatsappNumber,
  isValidCustomerNumber,
  normalizeCustomerNumber,
} from "../src/lib/enquiry.ts";

const details = {
  businessType: "Boutique Owner",
  businessName: "Threads & Co.",
  phone: "+91 98765 43210",
  city: "Pune",
};
// Test-only recipient. No network requests or messages are sent by these tests.
const recipient = "919876543210";
test("business contact requires international digits only", () => {
  assert.equal(isValidWhatsappNumber(recipient), true);
  for (const value of [
    "",
    "0000000000",
    "+919876543210",
    "91 9876543210",
    "abc",
    "1234567",
    "1234567890123456",
  ])
    assert.equal(isValidWhatsappNumber(value), false, value);
});
test("customer phone normalisation accepts common formatting and rejects invalid input", () => {
  assert.equal(normalizeCustomerNumber("+91 (98765) 43210"), recipient);
  assert.equal(isValidCustomerNumber(details.phone), true);
  for (const value of ["123", "0000000000", "98765 ext 4", "1234567890123456"])
    assert.equal(isValidCustomerNumber(value), false);
});
test("missing or invalid business contact cannot create a redirect", () => {
  assert.equal(buildEnquiryUrl("", details), undefined);
  assert.equal(buildEnquiryUrl("+123", details), undefined);
});
test("invalid customer or blank required business details cannot create a redirect", () => {
  for (const patch of [
    { phone: "abc" },
    { businessName: "   " },
    { city: "" },
    { businessType: "" },
  ])
    assert.equal(
      buildEnquiryUrl(recipient, { ...details, ...patch }),
      undefined,
    );
});
test("message safely encodes punctuation, Unicode and newlines without changing the destination", () => {
  const url = new URL(
    buildEnquiryUrl(recipient, {
      ...details,
      businessName: "Sarees & Silk #1 / শাড়ি",
      collection: "Jamdani",
      time: "2–5 pm IST & weekends",
    }),
  );
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, `/${recipient}`);
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  const message = url.searchParams.get("text");
  assert.ok(message.includes("Business Name: Sarees & Silk #1 / শাড়ি"));
  assert.ok(message.includes("\nWhatsApp: " + recipient));
  assert.ok(message.includes("Interested Collection: Jamdani"));
  assert.ok(message.includes("Preferred Time: 2–5 pm IST & weekends"));
});
test("empty optional fields use clear enquiry defaults", () => {
  const message = new URL(
    buildEnquiryUrl(recipient, { ...details, collection: "  ", time: "  " }),
  ).searchParams.get("text");
  assert.ok(message.includes("Interested Collection: Please help me choose"));
  assert.ok(message.includes("Preferred Time: Please coordinate with me"));
});
