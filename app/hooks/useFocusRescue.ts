"use client";
import { useEffect, type RefObject } from "react";

const ENABLED_CONTROL =
  "button:not([disabled]):not([aria-disabled='true']), a[href]";

function isLost(active: Element | null) {
  return (
    !active ||
    active === document.body ||
    !active.isConnected ||
    active.matches("[disabled]")
  );
}

/**
 * Keeps keyboard focus inside a play area. When the focused control is
 * removed or disabled (a new round, a removed option), focus moves to the
 * area's first enabled control instead of falling back to the top of the page.
 */
export function useFocusRescue(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const area = ref.current;
    if (!area) return;
    // Whether focus was last inside this area.
    let owned = area.contains(document.activeElement);

    const rescue = () => {
      if (!owned || !isLost(document.activeElement)) return;
      area
        .querySelector<HTMLElement>(ENABLED_CONTROL)
        ?.focus({ preventScroll: true });
    };
    const onFocusIn = (event: FocusEvent) => {
      owned = area.contains(event.target as Node);
    };

    // Unmounting a focused button fires no event, so watch the DOM instead.
    const observer = new MutationObserver(() => requestAnimationFrame(rescue));
    observer.observe(area, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled", "aria-disabled"],
    });
    document.addEventListener("focusin", onFocusIn);
    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [ref]);
}
