import { useEffect, useState, type CSSProperties } from "react";
import { ALETHIA_URL, NAV_LINKS } from "../site";
import "./Navbar.css";

// One span per letter so the hover roll can stagger left to right. The link carries the
// accessible name, so the letters are hidden from screen readers.
function RollingText({ text }: { text: string }) {
  return (
    <span className="roll" aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="roll__char" style={{ "--i": i } as CSSProperties}>
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav__frame">
        <a className="nav__logo" href="#home" aria-label="OBXCREATIVES home">
          <img src="/assets/obx-enso-logo.png" alt="" width={75} height={75} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              className="nav__link nav__link--roll"
              href={link.href}
              aria-label={link.label.charAt(0) + link.label.slice(1).toLowerCase()}
            >
              <RollingText text={link.label} />
            </a>
          ))}
          <span className="nav__divider" aria-hidden="true">
            |
          </span>
          <a className="nav__link" href={ALETHIA_URL} target="_blank" rel="noreferrer">
            ALETHIA
          </a>
        </nav>

        <div className="nav__actions">
          <a className="btn btn--outline" href="#contact">
            Contact us
          </a>
          <a className="btn btn--solid" href="#quote">
            Get a quote
          </a>
        </div>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div id="nav-panel" className="nav__panel" hidden={!open}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} className="nav__panel-link" href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <a className="nav__panel-link" href={ALETHIA_URL} target="_blank" rel="noreferrer">
          ALETHIA ↗
        </a>
        <div className="nav__panel-actions">
          <a className="btn btn--outline" href="#contact" onClick={close}>
            Contact us
          </a>
          <a className="btn btn--solid" href="#quote" onClick={close}>
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}
