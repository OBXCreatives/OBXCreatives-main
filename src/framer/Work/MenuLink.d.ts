export interface MenulinkProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Desktop - New Tab" → CXGPkP11l
   *   "Desktop-White New Tab" → Vt5DC45Go
   *   "Link- White" → WbH394pxb
   *   "Link-Default" → uJzq0eSCK
   *   "Mobile - New Tab" → eGZyQwKlj
   *   "Mobile-White New Tab" → iEdcxDLaV
   *   "Tablet - New Tab" → BEroqjrWH
   *   "Desktop" → Syzxa1YVw
   *   "LINK" → ywEA3jzyx
   *   "Mobile" → iw6W2sjyl
   *   "Tablet" → LF6TmrGuM
   */
  variant?: 'Desktop - New Tab' | 'Desktop-White New Tab' | 'Link- White' | 'Link-Default' | 'Mobile - New Tab' | 'Mobile-White New Tab' | 'Tablet - New Tab' | 'Desktop' | 'LINK' | 'Mobile' | 'Tablet' | 'Syzxa1YVw' | 'LF6TmrGuM' | 'iw6W2sjyl' | 'ywEA3jzyx' | 'Vt5DC45Go' | 'WbH394pxb' | 'iEdcxDLaV' | 'CXGPkP11l' | 'BEroqjrWH' | 'eGZyQwKlj' | 'uJzq0eSCK';
  /**
   * Title — pass as `avVFjwr_8` not `title`.
   * @default "WORK"
   */
  avVFjwr_8?: string;
  onavVFjwr_8Change?: string;
  /**
   * Link — pass as `JuK7M5nzE` not `link`.
   */
  JuK7M5nzE?: string;
  onNcibIrZBgChange?: string;
  /**
   * Title Hover — pass as `VNczDV5_T` not `titleHover`.
   * @default "WORK"
   */
  VNczDV5_T?: string;
  onVNczDV5_TChange?: string;
  /**
   * Color — pass as `eqkivNDgL` not `color`.
   * @default "var(--token-633663d4-6135-4d2d-a328-8707c8a7d2dc, rgb(255, 60, 0)) /* {"name":"Orange50"} */"
   */
  eqkivNDgL?: string;
  /**
   * New Tab — pass as `uKTtRpbhS` not `newTab`.
   * @default false
   */
  uKTtRpbhS?: boolean;
  onuKTtRpbhSChange?: string;
  /** Additional properties */
  [key: string]: unknown;
}
