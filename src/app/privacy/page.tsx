import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";

export const metadata = {
  title: "Privacy Policy — Diamond View",
  description: "How Diamond View Productions collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 120, paddingBottom: 100 }}>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", fontStretch: "125%", fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--av-40)", marginBottom: 48 }}>
            Last updated: June 2026
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, fontSize: 15, lineHeight: 1.7, color: "var(--avalanche-deep)" }}>
            <section>
              <h2 style={{ fontSize: 13, fontFamily: "var(--font-display)", fontStretch: "125%", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Information We Collect</h2>
              <p>When you contact us through this website, we collect the information you provide — including your name, email address, phone number, and project details. We use this information solely to respond to your inquiry and communicate about potential projects.</p>
            </section>
            <section>
              <h2 style={{ fontSize: 13, fontFamily: "var(--font-display)", fontStretch: "125%", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>How We Use Your Information</h2>
              <p>We use your contact information to respond to project inquiries and, if you opt in, to send occasional studio updates and news. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
            </section>
            <section>
              <h2 style={{ fontSize: 13, fontFamily: "var(--font-display)", fontStretch: "125%", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Cookies & Analytics</h2>
              <p>This site may use cookies and analytics tools to understand how visitors interact with our content. No personally identifiable information is collected through these tools.</p>
            </section>
            <section>
              <h2 style={{ fontSize: 13, fontFamily: "var(--font-display)", fontStretch: "125%", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Contact</h2>
              <p>Questions about this policy? Reach us at <a href="mailto:info@diamondviewstudios.com" style={{ color: "var(--accent-light)" }}>info@diamondviewstudios.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer cta={false} />
    </>
  );
}
