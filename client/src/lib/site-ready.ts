import { createContext, useContext } from "react";

/*
  True once the loading screen has finished leaving — not when it decides to
  leave, but when the last of it is off the screen.

  It exists for one reason: the clip set into the headline plays through once
  and then holds on its last frame. Mounted behind the curtain with `autoPlay`
  it spent that single pass unwatched, and the first thing a visitor saw was
  its final frame, indistinguishable from a still. Anything else that gets one
  chance to be seen should read this too.

  Default true so a component outside the provider — a case study opened
  directly, a test rendering one piece — behaves as it always did rather than
  waiting on a signal that is never coming.
*/
export const SiteReadyContext = createContext(true);

export const useSiteReady = () => useContext(SiteReadyContext);
