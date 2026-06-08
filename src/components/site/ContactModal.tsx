"use client";

/* Lightweight "Start a Project" overlay. On submit it hands off to the parent
   (which shows a toast); a real backend can be wired later. */

import { Icon, Eyebrow } from "@/components/site/primitives";

export default function ContactModal({
  onClose,
  onSent,
}: {
  onClose: () => void;
  onSent: () => void;
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>
        <Eyebrow>Start a Project</Eyebrow>
        <h3 className="modal__title">Tell us the story</h3>
        <p className="modal__sub">
          No matter the scale, we&apos;d love to bring your vision to life.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSent();
          }}
        >
          <div className="field">
            <label>Name</label>
            <input required placeholder="Your name" />
          </div>
          <div className="field">
            <label>Email</label>
            <input required type="email" placeholder="you@brand.com" />
          </div>
          <div className="field">
            <label>The brief</label>
            <textarea rows={3} placeholder="What are we making?" />
          </div>
          <button
            className="dv-btn dv-btn--primary"
            type="submit"
            style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
          >
            Send <Icon name="arrow-right" size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
