"use client";

/* Top header — nav that solidifies on scroll, with a scroll-progress hairline.
   Faithful port of the prototype Nav.jsx. */

import { useEffect, useState } from "react";
import { Icon } from "@/components/site/primitives";

const NAV_LOGO = "/images/brand/logos/wordmark-inline_noaccent__primary-dark.svg";

type NavLink = "Home" | "Work" | "Capabilities" | "Process" | "Studio";

export default function Nav({
  active,
  onNav,
  onContact,
}: {
  active: NavLink;
  onNav: (l: NavLink) => void;
  onContact: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [prog, setProg] = useState(0);
  const links: NavLink[] = ["Work", "Capabilities", "Process", "Studio"];

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

  return (
    <header className={"header" + (stuck ? " is-stuck" : "")}>
      <nav className="nav" style={{ opacity: 1 }}>
        <a className="nav__brand" onClick={() => onNav("Home")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="nav__logo" src={NAV_LOGO} alt="Diamond View" />
          <span className="nav__tag">Feeling in Motion</span>
        </a>
        <div className="nav__links">
          {links.map((l) => (
            <button
              key={l}
              className={"nav__link" + (active === l ? " is-active" : "")}
              onClick={() => onNav(l)}
            >
              {l}
            </button>
          ))}
          <button className="dv-btn dv-btn--primary nav__cta" onClick={onContact}>
            Start a Project
          </button>
        </div>
        <button className="nav__toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <Icon name={open ? "x" : "menu"} size={22} />
        </button>
        {open && (
          <div className="nav__mobile">
            {links.map((l) => (
              <button
                key={l}
                className="nav__link"
                style={{ textAlign: "left" }}
                onClick={() => {
                  setOpen(false);
                  onNav(l);
                }}
              >
                {l}
              </button>
            ))}
            <button
              className="dv-btn dv-btn--primary"
              style={{ justifyContent: "center" }}
              onClick={() => {
                setOpen(false);
                onContact();
              }}
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

export type { NavLink };
