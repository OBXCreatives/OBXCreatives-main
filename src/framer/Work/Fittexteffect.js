var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/mwZG8nN5EjAe7zwxBTSW/SE78G7JEt83zzoPux7eS/FitTextEffect.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useMemo, useRef, useState, startTransition } from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "./_framer-runtime.js";
import { motion, useInView } from "framer-motion";
function getAnimationStates(animationType, slideFrom) {
  const slideOffset = 24;
  switch (animationType) {
    case "Fade Up":
      return { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
    case "Fade Down":
      return { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } };
    case "Blur In":
      return { initial: { opacity: 0, filter: "blur(8px)" }, animate: { opacity: 1, filter: "blur(0px)" } };
    case "Scale In":
      return { initial: { opacity: 0, scale: 0.86 }, animate: { opacity: 1, scale: 1 } };
    case "Slide In":
      if (slideFrom === "Top") {
        return { initial: { opacity: 0, y: -slideOffset }, animate: { opacity: 1, y: 0 } };
      }
      if (slideFrom === "Left") {
        return { initial: { opacity: 0, x: -slideOffset }, animate: { opacity: 1, x: 0 } };
      }
      if (slideFrom === "Right") {
        return { initial: { opacity: 0, x: slideOffset }, animate: { opacity: 1, x: 0 } };
      }
      return { initial: { opacity: 0, y: slideOffset }, animate: { opacity: 1, y: 0 } };
    case "Rotate In":
      return { initial: { opacity: 0, rotate: -12, y: 8 }, animate: { opacity: 1, rotate: 0, y: 0 } };
    case "Fade":
    default:
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
  }
}
function FitTextEffect(props) {
  const { text = "QUOMI\xAE", animationType = "Fade", slideFrom = "Bottom", splitBy = "Letter", stagger = 0.04, duration = 0.6, delay = 0, trigger = "On In View", loop = false, color = "#111111", textAlignMode = "start", typography = { fontSize: "40px", letterSpacing: "-0.01em", lineHeight: "1.2em", textAlign: "left" }, minFontSize = 12, maxFontSize = 240 } = props;
  const style = props.style;
  const isStatic = useIsStaticRenderer();
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [resolvedFontSize, setResolvedFontSize] = useState(Math.max(minFontSize, Math.min(72, maxFontSize)));
  const [hasMeasured, setHasMeasured] = useState(false);
  const inView = useInView(containerRef, { amount: 0.4, once: !loop });
  const singleLineText = useMemo(() => text.replace(/\r\n/g, "\n").replace(/\n+/g, " "), [text]);
  const splitUnits = useMemo(() => {
    if (splitBy === "Word") {
      return singleLineText.split(/(\s+)/).map((part) => ({ value: part, animate: part.trim().length > 0 }));
    }
    if (splitBy === "Line") {
      const lines = text.replace(/\r\n/g, "\n").split("\n");
      return lines.flatMap((line, index) => {
        const token = line.length > 0 ? line : " ";
        if (index < lines.length - 1) {
          return [{ value: `${token} `, animate: true }];
        }
        return [{ value: token, animate: true }];
      });
    }
    return Array.from(singleLineText).map((char) => ({ value: char, animate: char.trim().length > 0 }));
  }, [splitBy, singleLineText, text]);
  const fitText = useCallback(() => {
    if (typeof __dai_window === "undefined")
      return;
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure)
      return;
    const containerWidth = container.getBoundingClientRect().width;
    if (!containerWidth || containerWidth <= 0)
      return;
    const maxSafe = Math.max(minFontSize, maxFontSize);
    const minSafe = Math.min(minFontSize, maxFontSize);
    let nextSize = Math.max(minSafe, Math.min(resolvedFontSize || maxSafe, maxSafe));
    for (let i = 0; i < 4; i++) {
      measure.style.fontSize = `${nextSize}px`;
      const textWidth = measure.getBoundingClientRect().width;
      if (!textWidth || textWidth <= 0)
        break;
      const ratio = containerWidth / textWidth;
      nextSize = Math.max(minSafe, Math.min(nextSize * ratio, maxSafe));
    }
    const finalSize = Number.isFinite(nextSize) ? nextSize : minSafe;
    startTransition(() => {
      setResolvedFontSize(finalSize);
      setHasMeasured(true);
    });
  }, [maxFontSize, minFontSize, resolvedFontSize]);
  useLayoutEffect(() => {
    fitText();
  }, [fitText, singleLineText, typography.letterSpacing, typography.fontFamily, typography.fontWeight, typography.fontStyle, typography.lineHeight]);
  useLayoutEffect(() => {
    if (typeof __dai_window === "undefined")
      return;
    const container = containerRef.current;
    if (!container)
      return;
    const observer = new ResizeObserver(() => {
      fitText();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [fitText]);
  const animationStates = useMemo(() => getAnimationStates(animationType, slideFrom), [animationType, slideFrom]);
  const triggerReady = trigger === "On Mount" ? true : inView;
  const shouldAnimate = !isStatic && hasMeasured && triggerReady;
  const resolvedTextAlign = textAlignMode === "start" ? "left" : textAlignMode === "end" ? "right" : "center";
  const parentVariants = useMemo(() => ({ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay, repeat: loop ? Infinity : 0, repeatType: "loop", repeatDelay: Math.max(0.1, duration * 0.5) } } }), [stagger, delay, loop, duration]);
  const childVariants = useMemo(() => ({ hidden: animationStates.initial, show: animationStates.animate }), [animationStates]);
  return /* @__PURE__ */ _jsxs("div", { ref: containerRef, style: { position: "relative", width: "100%", height: "auto", display: "block", ...style }, children: [/* @__PURE__ */ _jsx("span", { ref: measureRef, "aria-hidden": true, style: { position: "absolute", left: 0, top: 0, visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none", fontFamily: typography.fontFamily || "Clash Display", fontStyle: typography.fontStyle, fontWeight: typography.fontWeight ?? 500, letterSpacing: typography.letterSpacing, lineHeight: typography.lineHeight ?? 1.2 }, children: singleLineText }), /* @__PURE__ */ _jsx("div", { style: { width: "100%", minWidth: "100%", whiteSpace: "nowrap", lineHeight: typography.lineHeight ?? 1.2, color, textAlign: resolvedTextAlign, opacity: hasMeasured || isStatic ? 1 : 1e-3 }, children: /* @__PURE__ */ _jsx(motion.div, { variants: parentVariants, initial: isStatic ? false : "hidden", animate: isStatic ? void 0 : shouldAnimate ? "show" : "hidden", style: { display: "block", width: "100%" }, children: splitUnits.map((unit, index) => {
    if (!unit.animate) {
      return /* @__PURE__ */ _jsx("span", { style: { display: "inline-block", whiteSpace: "pre", fontSize: resolvedFontSize, fontFamily: typography.fontFamily || "Clash Display", fontStyle: typography.fontStyle, fontWeight: typography.fontWeight ?? 500, letterSpacing: typography.letterSpacing, lineHeight: typography.lineHeight ?? 1.2 }, children: unit.value }, `unit-${index}`);
    }
    return /* @__PURE__ */ _jsx(motion.span, { variants: childVariants, transition: { duration, ease: "easeOut" }, style: { display: "inline-block", whiteSpace: "pre", fontSize: resolvedFontSize, fontFamily: typography.fontFamily || "Clash Display", fontStyle: typography.fontStyle, fontWeight: typography.fontWeight ?? 500, letterSpacing: typography.letterSpacing, lineHeight: typography.lineHeight ?? 1.2, willChange: "transform, opacity, filter" }, children: unit.value }, `unit-${index}`);
  }) }) })] });
}
addPropertyControls(FitTextEffect, { text: { type: ControlType.String, title: "Text", defaultValue: "QUOMI\xAE", displayTextArea: true }, animationType: { type: ControlType.Enum, title: "Animation", defaultValue: "Fade", options: ["Fade", "Fade Up", "Fade Down", "Blur In", "Scale In", "Slide In", "Rotate In"] }, splitBy: { type: ControlType.Enum, title: "Animate Per", defaultValue: "Letter", options: ["Letter", "Word", "Line"], displaySegmentedControl: true }, slideFrom: { type: ControlType.Enum, title: "Slide From", defaultValue: "Bottom", options: ["Bottom", "Top", "Left", "Right"], hidden: (props) => props.animationType !== "Slide In" }, stagger: { type: ControlType.Number, title: "Stagger", defaultValue: 0.04, min: 0, max: 1, step: 0.01 }, duration: { type: ControlType.Number, title: "Duration", defaultValue: 0.6, min: 0.1, max: 4, step: 0.05 }, delay: { type: ControlType.Number, title: "Delay", defaultValue: 0, min: 0, max: 3, step: 0.05 }, trigger: { type: ControlType.Enum, title: "Trigger", defaultValue: "On In View", options: ["On Mount", "On In View"], displaySegmentedControl: true }, loop: { type: ControlType.Boolean, title: "Loop", defaultValue: false, enabledTitle: "On", disabledTitle: "Off" }, color: { type: ControlType.Color, title: "Color", defaultValue: "#000000" }, textAlignMode: { type: ControlType.Enum, title: "Align", defaultValue: "start", options: ["start", "center", "end"], displaySegmentedControl: true }, typography: { type: ControlType.Font, title: "Text Font", controls: "extended", defaultFontType: "sans-serif", defaultValue: { fontSize: "40px", variant: "Medium", letterSpacing: "-0.01em", lineHeight: "1.2em", textAlign: "left" } }, minFontSize: { type: ControlType.Number, title: "Min Size", defaultValue: 12, min: 1, max: 400, step: 1 }, maxFontSize: { type: ControlType.Number, title: "Max Size", defaultValue: 240, min: 1, max: 800, step: 1 } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "FitTextEffect", "slots": [], "annotations": { "framerSupportedLayoutHeight": "auto", "framerSupportedLayoutWidth": "any", "framerContractVersion": "1" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  FitTextEffect as default
};
