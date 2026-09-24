import { FitTextEffect } from "../framer";
import { useFontLoaded } from "../hooks/useFontLoaded";
import { INSTAGRAM_URL } from "../site";
import { WORDMARK_FONT, WORDMARK_TYPOGRAPHY } from "./Hero";
import "./ComingSoon.css";

export default function ComingSoon() {
  const fontLoaded = useFontLoaded(WORDMARK_FONT);

  return (
    <section className="coming-soon" id="home">
      {/* The title sits in front of the bonsai, resting on the moss. */}
      <div className="coming-soon__stage">
        <div className="container coming-soon__title-row">
          <h1 className="coming-soon__title">
            <span className="sr-only">Coming soon</span>
            <div aria-hidden="true">
              {fontLoaded && (
                <FitTextEffect
                  text="COMING SOON"
                  animationType="Fade Up"
                  splitBy="Letter"
                  trigger="On Mount"
                  color="var(--ink)"
                  typography={WORDMARK_TYPOGRAPHY}
                  minFontSize={24}
                  maxFontSize={400}
                />
              )}
            </div>
          </h1>
        </div>
        <img
          className="coming-soon__bonsai"
          src="/assets/bonsai-island-1517.webp"
          srcSet="/assets/bonsai-island-760.webp 760w, /assets/bonsai-island-1517.webp 1517w"
          sizes="(min-width: 1517px) 1517px, 100vw"
          width={1517}
          height={973}
          alt=""
        />
      </div>

      <div className="container">
        <div className="coming-soon__meta mono-sm">
          <p>Gallery, shop and services are on their way.</p>
          <p>
            Until then, <a href="#contact">get in touch</a> or follow along on{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
