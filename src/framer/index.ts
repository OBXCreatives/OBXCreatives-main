// Typed entry points for the verbatim Framer export in ./Work.
// The generated MenuLink*.d.ts files don't parse (a "*/" inside a JSDoc default closes the
// comment early), so the components are imported through the "@framer-work" alias and typed here.
import type { ComponentType, CSSProperties } from "react";
import MenuLinkComponent from "@framer-work/MenuLink.js";
import FitTextEffectComponent from "@framer-work/Fittexteffect.js";

export type MenuLinkVariant =
  | "Desktop"
  | "Tablet"
  | "Mobile"
  | "LINK"
  | "Link- White"
  | "Link-Default"
  | "Desktop - New Tab"
  | "Tablet - New Tab"
  | "Mobile - New Tab"
  | "Desktop-White New Tab"
  | "Mobile-White New Tab";

export type MenuLinkProps = {
  variant?: MenuLinkVariant;
  title?: string;
  titleHover?: string;
  link?: string;
  newTab?: boolean;
  /** Fill colour of the hover wipe and icon. Defaults to the export's Orange50 token. */
  color?: string;
  /** Phosphor icon name, e.g. "ArrowRight". */
  icon?: string;
  style?: CSSProperties;
  className?: string;
};

export type FitTextEffectProps = {
  text?: string;
  animationType?: "Fade" | "Fade Up" | "Fade Down" | "Blur In" | "Scale In" | "Slide In" | "Rotate In";
  splitBy?: "Letter" | "Word" | "Line";
  slideFrom?: "Bottom" | "Top" | "Left" | "Right";
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: "On Mount" | "On In View";
  loop?: boolean;
  color?: string;
  textAlignMode?: "start" | "center" | "end";
  typography?: {
    fontFamily?: string;
    fontWeight?: number | string;
    fontStyle?: string;
    letterSpacing?: string;
    lineHeight?: string | number;
  };
  minFontSize?: number;
  maxFontSize?: number;
  style?: CSSProperties;
};

export const MenuLink = MenuLinkComponent as ComponentType<MenuLinkProps>;
export const FitTextEffect = FitTextEffectComponent as ComponentType<FitTextEffectProps>;
export { default as LayoutIsland } from "./Work/utils/LayoutIsland";
export { default as ResponsiveWrapper } from "./Work/utils/ResponsiveWrapper";
