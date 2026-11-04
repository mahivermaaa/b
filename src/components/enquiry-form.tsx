"use client";
import { useState, type FormEvent } from "react";
import { whatsappNumber, isValidWhatsappNumber } from "@/lib/config";
import { buildEnquiryUrl, isValidCustomerNumber } from "@/lib/enquiry";
// selectedCollection is still passed by the contact page but no longer used.
export function EnquiryForm(props: { selectedCollection?: string }) {
  void props;
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
      businessName: String(data.get("businessName") ?? ""),
      phone,
      city: String(data.get("city") ?? ""),
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
      <h2>
        Schedule Your
        <br />
        <em>Collection Viewing</em>
      </h2>
      <p>Tell us about your business.</p>
      {!enabled && (
        <div className="contact-status" role="status">
          <strong>Video-call requests will open soon.</strong>
          <span>10 Am to 8 Pm</span>
        </div>
      )}
      <div className="form-grid">
        <label className="full">
          Store Name / Boutique / Business Name / Person Name <span>*</span>
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
          WhatsApp Number / Calling Number <span>*</span>
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
