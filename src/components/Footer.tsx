import { FitTextEffect } from "../framer";
import { useFontLoaded } from "../hooks/useFontLoaded";
import { SOCIAL_LINKS } from "../site";
import { WORDMARK_FONT, WORDMARK_TYPOGRAPHY } from "./Hero";
import "./Footer.css";

export default function Footer() {
  const fontLoaded = useFontLoaded(WORDMARK_FONT);

  return (
    <footer className="footer">
      <div className="container footer__top">
        <ul className="footer__social mono-sm">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="footer__tagline mono-sm">
          The world is art,
          <br />
          live with curiosity,
          <br />
          experience with passion.
        </p>

        <h2 className="footer__headline">
          Do you like
          <br />
          what you see?
        </h2>
      </div>

      <div className="container footer__meta mono-sm">
        <p>2025 ® OBXCREATIVES</p>
        <p className="footer__disclaimer">

        </p>
        <a className="btn btn--solid btn--compact" href="#quote">
          Let’s connect
        </a>
      </div>

      <div className="container footer__wordmark" aria-hidden="true">
        {fontLoaded && (
          <FitTextEffect
            text="HOBX"
            animationType="Fade Up"
            splitBy="Letter"
            trigger="On In View"
            stagger={0.06}
            duration={0.7}
            color="var(--ink)"
            typography={WORDMARK_TYPOGRAPHY}
            minFontSize={48}
            maxFontSize={1200}
          />
        )}
      </div>
    </footer>
  );
}
