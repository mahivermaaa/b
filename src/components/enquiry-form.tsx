"use client";
import { useState, type FormEvent } from "react";
import { categories } from "@/data/categories";
import { whatsappNumber, isValidWhatsappNumber } from "@/lib/config";
import { buildEnquiryUrl, isValidCustomerNumber } from "@/lib/enquiry";
export function EnquiryForm({
  selectedCollection = "",
}: {
  selectedCollection?: string;
}) {
  const enabled = isValidWhatsappNumber(whatsappNumber);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!enabled) return;
    const data = new FormData(event.currentTarget);
    const phone = String(data.get("phone") ?? "");
    if (!isValidCustomerNumber(phone)) {
      setError(
        "Please enter a valid WhatsApp number, including country code if outside India.",
      );
      return;
    }
    const url = buildEnquiryUrl(whatsappNumber, {
      businessType: String(data.get("businessType") ?? ""),
      businessName: String(data.get("businessName") ?? ""),
      phone,
      city: String(data.get("city") ?? ""),
      collection: String(data.get("collection") ?? ""),
      time: String(data.get("time") ?? ""),
    });
    if (!url) {
      setError("Please complete the required business details.");
      return;
    }
    window.location.assign(url);
  }
  return (
    <form onSubmit={submit} className="enquiry-form">
      <div className="eyebrow">A PERSONAL VIEWING, FROM WHEREVER YOU ARE</div>
      <h2>
        Schedule Your
        <br />
        <em>Collection Viewing</em>
      </h2>
      <p>Tell us a little about your business.</p>
      {!enabled && (
        <div className="contact-status" role="status">
          <strong>Video-call requests will open soon.</strong>
          <span>
            Our business WhatsApp contact is being finalised. You can explore
            the collections in the meantime; this form cannot send or save your
            details yet.
          </span>
        </div>
      )}
      <div className="form-grid">
        <label className="full">
          Business category <span>*</span>
          <select name="businessType" required defaultValue="">
            <option value="" disabled>
              Select your business type
            </option>
            {[
              "Saree Store Owner",
              "Boutique Owner",
              "Exhibition Reseller",
              "Apartment Reseller",
              "Reseller",
            ].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="full">
          Store / Boutique / Business Name <span>*</span>
          <input
            name="businessName"
            required
            maxLength={120}
            pattern=".*\S.*"
            autoComplete="organization"
            placeholder="Your business name"
          />
        </label>
        <label>
          WhatsApp Number <span>*</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            maxLength={22}
            placeholder="Include country code"
          />
        </label>
        <label>
          City <span>*</span>
          <input
            name="city"
            required
            maxLength={80}
            pattern=".*\S.*"
            autoComplete="address-level2"
            placeholder="Your city"
          />
        </label>
        <label className="full">
          Interested Collection <small>Optional</small>
          <select name="collection" defaultValue={selectedCollection}>
            <option value="">I’d like to explore</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="full">
          Preferred Video-Call Time <small>Optional</small>
          <input
            name="time"
            maxLength={120}
            placeholder="e.g. Weekday afternoons, 2–5 pm IST"
          />
        </label>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit" disabled={!enabled}>
        Continue to WhatsApp <span>↗︎</span>
      </button>
      <p className="form-footnote">
        Opens a pre-filled WhatsApp message for you to review and send. Your
        viewing time is confirmed directly by our team.
      </p>
    </form>
  );
}
