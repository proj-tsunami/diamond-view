"use client";

/* Start a Project form modal. Fields: name, contact, industry, referral source,
   message, consent + email list opt-in, and a studio contact info strip.
   TODO: wire onSent() to a real backend (Formspree / Resend / API route) before launch. */

import { useState } from "react";
import { Icon, Eyebrow } from "@/components/site/primitives";

const INDUSTRIES = [
  "Sports & Athletics",
  "Entertainment",
  "Healthcare",
  "Real Estate",
  "Consumer Brands",
  "Technology",
  "Education",
  "Non-Profit",
  "Government / Public Sector",
  "Other",
];

const REFERRAL_SOURCES = [
  "Google / Search",
  "Social Media",
  "Referral — Client",
  "Referral — Partner / Agency",
  "Previous Client",
  "Industry Event / Conference",
  "Other",
];

export default function ContactModal({
  onClose,
  onSent,
}: {
  onClose: () => void;
  onSent: () => void;
}) {
  const [consent, setConsent] = useState(false);
  const [emailList, setEmailList] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("cf-first") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("cf-last") as HTMLInputElement).value,
      email: (form.elements.namedItem("cf-email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("cf-phone") as HTMLInputElement).value,
      industry: (form.elements.namedItem("cf-industry") as HTMLSelectElement).value,
      source: (form.elements.namedItem("cf-source") as HTMLSelectElement).value,
      message: (form.elements.namedItem("cf-message") as HTMLTextAreaElement).value,
      emailList,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("Something went wrong. Please try again or email us directly.");
      return;
    }
    onSent();
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal modal--form" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>

        <Eyebrow>Start a Project</Eyebrow>
        <h3 className="modal__title">Tell us the story</h3>
        <p className="modal__sub">
          No matter the scale, we&apos;d love to bring your vision to life.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-first">First Name</label>
              <input id="cf-first" required placeholder="First" />
            </div>
            <div className="field">
              <label htmlFor="cf-last">Last Name</label>
              <input id="cf-last" required placeholder="Last" />
            </div>
          </div>

          {/* Contact */}
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" required type="email" placeholder="you@brand.com" />
            </div>
            <div className="field">
              <label htmlFor="cf-phone">Phone</label>
              <input id="cf-phone" type="tel" placeholder="(000) 000-0000" />
            </div>
          </div>

          {/* Industry + Referral */}
          <div className="field-row">
            <div className="field">
              <label htmlFor="cf-industry">Industry</label>
              <select id="cf-industry">
                <option value="">Select your industry</option>
                {INDUSTRIES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cf-source">How did you hear about us?</label>
              <select id="cf-source">
                <option value="">Select one</option>
                {REFERRAL_SOURCES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              rows={4}
              placeholder="Tell us about your project, timeline, and goals…"
            />
          </div>

          {/* Consent */}
          <div className="field field--check">
            <label className="check-label">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <span>
                I agree to Diamond View&apos;s{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>{" "}
                and consent to being contacted regarding my project inquiry.
              </span>
            </label>
          </div>

          {/* Email list opt-in */}
          <div className="field field--check">
            <label className="check-label">
              <input
                type="checkbox"
                checked={emailList}
                onChange={(e) => setEmailList(e.target.checked)}
              />
              <span>
                Add me to the Diamond View email list for studio updates, work, and news.
              </span>
            </label>
          </div>

          {error && (
            <p style={{ color: "var(--color-error, #e53e3e)", marginTop: 12, fontSize: 14 }}>
              {error}
            </p>
          )}

          <button
            className="dv-btn dv-btn--primary"
            type="submit"
            disabled={submitting}
            style={{ marginTop: 28, width: "100%", justifyContent: "center", opacity: submitting ? 0.6 : 1 }}
          >
            {submitting ? "Sending…" : <>Send It <Icon name="arrow-right" size={15} /></>}
          </button>
        </form>

        {/* Studio contact info */}
        <div className="modal__contact-strip">
          <div className="modal__contact-item">
            <span className="modal__contact-label">Studio</span>
            <span>1616 E. Bearss Ave · Tampa, FL 33613</span>
          </div>
          <div className="modal__contact-item">
            <span className="modal__contact-label">Phone</span>
            <a href="tel:+18139725400">1 (813) 972 5400</a>
            <span className="modal__contact-sep">&middot;</span>
            <a href="tel:+18006139693">1 (800) 613 9693</a>
          </div>
          <div className="modal__contact-item">
            <span className="modal__contact-label">Email</span>
            <a href="mailto:info@diamondviewstudios.com">info@diamondviewstudios.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
