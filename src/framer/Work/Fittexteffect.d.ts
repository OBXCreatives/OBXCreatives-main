export interface FittexteffectProps {
  /**
   * Text
   * @default "QUOMI®"
   */
  text?: string;
  /**
   * Animation — pass as `animationType` not `animation`.
   * Options: "Fade" | "Fade Up" | "Fade Down" | "Blur In" | "Scale In" | "Slide In" | "Rotate In"
   * @default "Fade"
   */
  animationType?: 'Fade' | 'Fade Up' | 'Fade Down' | 'Blur In' | 'Scale In' | 'Slide In' | 'Rotate In';
  /**
   * Animate Per — pass as `splitBy` not `animatePer`.
   * Options: "Letter" | "Word" | "Line"
   * @default "Letter"
   */
  splitBy?: 'Letter' | 'Word' | 'Line';
  /**
   * Slide From
   * Options: "Bottom" | "Top" | "Left" | "Right"
   * @default "Bottom"
   */
  slideFrom?: 'Bottom' | 'Top' | 'Left' | 'Right';
  /**
   * Stagger
   * Range: min: 0, max: 1, step: 0.01
   * @default 0.04
   */
  stagger?: number;
  /**
   * Duration
   * Range: min: 0.1, max: 4, step: 0.05
   * @default 0.6
   */
  duration?: number;
  /**
   * Delay
   * Range: min: 0, max: 3, step: 0.05
   * @default 0
   */
  delay?: number;
  /**
   * Trigger
   * Options: "On Mount" | "On In View"
   * @default "On In View"
   */
  trigger?: 'On Mount' | 'On In View';
  /**
   * Loop
   * @default false
   */
  loop?: boolean;
  /**
   * Color
   * @default "#000000"
   */
  color?: string;
  /**
   * Align — pass as `textAlignMode` not `align`.
   * Options: "start" | "center" | "end"
   * @default "start"
   */
  textAlignMode?: 'start' | 'center' | 'end';
  /**
   * Text Font — pass as `typography` not `textFont`.
   * @default {"fontSize":"40px","variant":"Medium","letterSpacing":"-0.01em","lineHeight":"1.2em","textAlign":"left"}
   */
  typography?: string;
  /**
   * Min Size — pass as `minFontSize` not `minSize`.
   * Range: min: 1, max: 400, step: 1
   * @default 12
   */
  minFontSize?: number;
  /**
   * Max Size — pass as `maxFontSize` not `maxSize`.
   * Range: min: 1, max: 800, step: 1
   * @default 240
   */
  maxFontSize?: number;
  /** Additional properties */
  [key: string]: unknown;
}
