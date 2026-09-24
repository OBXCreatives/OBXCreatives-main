import { FitTextEffect, LayoutIsland, MenuLink, ResponsiveWrapper } from "../framer";
import { useFontLoaded } from "../hooks/useFontLoaded";
import { ALETHIA_URL } from "../site";
import "./Hero.css";

// MenuLink variant names per breakpoint (ResponsiveWrapper: md ≥ 810px, lg ≥ 1200px).
const MENU_VARIANTS = { base: "Mobile", md: "Tablet", lg: "Desktop" };
const MENU_VARIANTS_NEW_TAB = {
  base: "Mobile - New Tab",
  md: "Tablet - New Tab",
  lg: "Desktop - New Tab",
};

const HERO_LINKS = [
  { title: "GALLERY", link: "#gallery", icon: "ArrowRight" },
  { title: "SHOP", link: "#shop", icon: "ArrowRight" },
  { title: "SERVICES", link: "#services", icon: "ArrowRight" },
  { title: "ALETHIA", link: ALETHIA_URL, icon: "ArrowUpRight", newTab: true },
];

export const WORDMARK_TYPOGRAPHY = {
  fontFamily: '"Inter", sans-serif',
  fontWeight: 900,
  letterSpacing: "-0.03em",
  // Inter's cap height — the line box starts exactly at the top of the capitals.
  lineHeight: "0.727em",
};

export const WORDMARK_FONT = '900 1em "Inter"';

export default function Hero() {
  const fontLoaded = useFontLoaded(WORDMARK_FONT);

  return (
    <section className="hero" id="home">
      <div className="container">
        <h1 className="hero__wordmark">
          <span className="sr-only">OBXCREATIVES®</span>
          <div aria-hidden="true">
            {fontLoaded && (
              <FitTextEffect
                text="OBXCREATIVES®"
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

        <nav className="hero__menu" aria-label="Explore">
          {HERO_LINKS.map((item) => (
            <div className="hero__menu-row" key={item.title}>
              <LayoutIsland>
                <ResponsiveWrapper
                  Component={MenuLink}
                  variants={item.newTab ? MENU_VARIANTS_NEW_TAB : MENU_VARIANTS}
                  title={item.title}
                  titleHover={item.title}
                  link={item.link}
                  newTab={item.newTab ?? false}
                  icon={item.icon}
                  style={{ width: "100%" }}
                />
              </LayoutIsland>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
