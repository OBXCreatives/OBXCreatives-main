import { useEffect, useState } from "react";

// FitTextEffect measures once (and on resize), not when a web font finishes loading,
// so wordmarks are mounted only after their font is available.
export function useFontLoaded(font: string) {
  const [loaded, setLoaded] = useState(() => document.fonts.check(font));

  useEffect(() => {
    if (loaded) return;
    let active = true;
    document.fonts.load(font).finally(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, [font, loaded]);

  return loaded;
}
