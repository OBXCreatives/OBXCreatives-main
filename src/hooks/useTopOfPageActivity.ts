import { useEffect, useState } from "react";

// How long the pointer can rest before the page counts as idle again.
const IDLE_MS = 1500;

// True while the page is scrolled to the very top and the mouse has moved recently.
// Scrolling away from the top ends it straight away.
export function useTopOfPageActivity() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let idleTimer: number | undefined;
    const atTop = () => window.scrollY <= 1;
    const stop = () => {
      window.clearTimeout(idleTimer);
      setActive(false);
    };

    const onMouseMove = (event: MouseEvent) => {
      // Browsers fire zero-distance mousemoves when content scrolls under a still cursor.
      if (event.movementX === 0 && event.movementY === 0) return;
      if (!atTop()) return;
      setActive(true);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(stop, IDLE_MS);
    };
    const onScroll = () => {
      if (!atTop()) stop();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}
