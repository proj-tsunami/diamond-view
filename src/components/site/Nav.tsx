"use client";

/* Top header — the single nav used across the whole site. On the home page the
   section links smooth-scroll; on any other route they navigate to /#section.
   Wordmark only (no tagline). Solidifies on scroll with a progress hairline. */

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon, smoothTo } from "@/components/site/primitives";

const NAV_LOGO = "/images/brand/logos/wordmark-inline_noaccent__primary-dark.svg";

// Ordered to match the page flow: Makers/Studio → Capabilities → Work → Process.
// href overrides scroll behaviour — renders as a Link instead of a button.
const LINKS = [
  { label: "Studio", id: "studio" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Work", id: "work", href: "/work" },
  { label: "Process", id: "process" },
];

export default function Nav({ onContact }: { onContact?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [prog, setProg] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProg(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section highlight (home only).
  useEffect(() => {
    if (!isHome) return;
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isHome]);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) smoothTo(id);
    else router.push(`/#${id}`);
  };
  const contact = () => {
    setOpen(false);
    if (onContact) onContact();
    else router.push("/#contact");
  };

  return (
    <header className={"header" + (stuck ? " is-stuck" : "")}>
      <nav className="nav" style={{ opacity: 1 }}>
        <Link className="nav__brand" href="/">
          <span
            className="nav__logo"
            style={{ "--src": `url("${NAV_LOGO}")` } as CSSProperties}
            role="img"
            aria-label="Diamond View"
          />
        </Link>
        <div className="nav__links">
          {LINKS.map((l) =>
            l.href ? (
              <Link
                key={l.id}
                className={"nav__link" + (pathname === l.href ? " is-active" : "")}
                href={l.href}
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.id}
                className={"nav__link" + (isHome && active === l.id ? " is-active" : "")}
                onClick={() => go(l.id)}
              >
                {l.label}
              </button>
            )
          )}
          <button className="dv-btn dv-btn--primary nav__cta" onClick={contact}>
            Start a Project
          </button>
        </div>
        <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
        {open && (
          <div className="nav__mobile">
            {LINKS.map((l) =>
              l.href ? (
                <Link
                  key={l.id}
                  className="nav__link"
                  style={{ textAlign: "left" }}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.id}
                  className="nav__link"
                  style={{ textAlign: "left" }}
                  onClick={() => go(l.id)}
                >
                  {l.label}
                </button>
              )
            )}
            <button
              className="dv-btn dv-btn--primary"
              style={{ justifyContent: "center" }}
              onClick={contact}
            >
              Start a Project
            </button>
          </div>
        )}
        <span className="nav__progress" style={{ width: prog + "%" }} />
      </nav>
    </header>
  );
}
