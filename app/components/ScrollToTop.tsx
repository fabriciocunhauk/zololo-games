"use client";
import { useEffect } from "react";

/**
 * Scrolls the window to the top when it mounts. Games swap between intro and
 * play screens on one route, so without this a tap on "Start playing" at the
 * bottom of a long intro opens the game scrolled past its header.
 */
export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return null;
}
