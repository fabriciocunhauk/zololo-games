"use client";
import { useEffect, useState, type RefObject } from "react";
import { fitBubbleSize } from "../utils/bubbleLayout";
import { getBubbleSize } from "../utils/getBubbleSize";

/**
 * The play area's width and a bubble size that lets `count` bubbles sit side
 * by side in it. Both follow resizes and rotations.
 */
export function useBubbleSize(
  areaRef: RefObject<HTMLElement | null>,
  count: number
) {
  const [viewportWidth, setViewportWidth] = useState(Infinity);
  const [areaWidth, setAreaWidth] = useState(Infinity);

  useEffect(() => {
    const area = areaRef.current;
    const update = () => {
      setViewportWidth(window.innerWidth);
      if (area) setAreaWidth(area.clientWidth);
    };
    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (area) observer.observe(area);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [areaRef]);

  const size = getBubbleSize(viewportWidth);
  return {
    areaWidth,
    size: count > 0 ? fitBubbleSize(size, areaWidth, count) : size,
  };
}
