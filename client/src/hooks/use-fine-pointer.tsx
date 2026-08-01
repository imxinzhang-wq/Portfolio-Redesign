import { useEffect, useState } from "react";

/*
  Whether the visitor is driving this with a real pointer.

  Asked as a capability rather than a screen width: a phone held in landscape
  is wide, and a narrow desktop window is not a phone. `hover: hover` rules
  out touch, `pointer: fine` rules out the coarse pointers — a TV remote, a
  games console — that can technically hover but land nowhere near a 12px dot.

  Starts false so a touch device never paints the custom cursor, not even for
  the frame before the effect runs. Desktop pays nothing for that: the dot
  only becomes visible on the first mousemove anyway.
*/
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const decide = () => setFine(mql.matches);

    decide();
    mql.addEventListener("change", decide);
    return () => mql.removeEventListener("change", decide);
  }, []);

  return fine;
}
