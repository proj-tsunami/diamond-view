"use client";

/* Contact CTA band + footer. Faithful port of the prototype Footer.jsx. */

import Link from "next/link";
import { Icon, useReveal } from "@/components/site/primitives";

const FOOTER_LOGO = "/images/brand/logos/wordmark-FIM_left__primary-light.svg";
const FOOTER_HERO = "/images/footer-dreambig-2200.jpg";

export default function Footer({
  onContact,
  cta = true,
}: {
  onContact: () => void;
  cta?: boolean;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <footer
      className={"footer" + (cta ? "" : " footer--bare")}
      id="contact"
      ref={ref}
      data-theme="light"
    >
      {cta && (
        <div className="footer__hero" data-theme="dark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="footer__hero-img"
            data-parallax="0.1"
            src={FOOTER_HERO}
            alt="Diamond View — Dream Big studio mural, Tampa, Florida"
          />
          <div className="footer__hero-scrim" aria-hidden="true" />
          <div className="footer__cta reveal">
            <span className="eyebrow eyebrow--center" style={{ justifyContent: "center" }}>
              <span className="eyebrow__d" />
              Start a Project
            </span>
            <h2 className="footer__cta-title">
              Tell us
              <br />
              the <em>story.</em>
            </h2>
            <button
              className="dv-btn dv-btn--primary"
              onClick={onContact}
              style={{ padding: "16px 30px" }}
            >
              <Icon name="mail" size={15} /> Start a Project
            </button>
          </div>
        </div>
      )}
      <div className="wrap footer__lower">
        <div className="footer__top">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer__logo"
              src={FOOTER_LOGO}
              alt="Diamond View — Feeling in Motion"
            />
            <div className="footer__tag">Tampa, Florida</div>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h4>Studio</h4>
              <Link href="/work">Work</Link>
              <a href="#capabilities">Capabilities</a>
              <a href="#process">Process</a>
              <Link href="/team">The Makers</Link>
              <a href="mailto:hello@diamondviewstudios.com?subject=Careers">Careers</a>
            </div>
            <div className="footer__col">
              <h4>Capabilities</h4>
              <a href="#capabilities">Live-Action</a>
              <a href="#capabilities">Virtual Production</a>
              <a href="#capabilities">Visual Effects</a>
              <a href="#capabilities">AI Workflow</a>
            </div>
            <div className="footer__col">
              <h4>Connect</h4>
              <a
                href="https://www.instagram.com/diamondviewstudios/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/diamond-view-studios/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="https://vimeo.com/diamondview" target="_blank" rel="noopener noreferrer">
                Vimeo
              </a>
              <a href="mailto:hello@diamondviewstudios.com">hello@diamondviewstudios.com</a>
            </div>
          </div>
        </div>
        <div className="footer__base">
          <span className="footer__fine">© 2026 Diamond View — The Makers · Tampa, Florida</span>
          <span className="footer__fine">
            Original creative · Unique production · Story at the heart
          </span>
        </div>
      </div>
    </footer>
  );
}
