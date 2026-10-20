"use client";
import { useEffect, useState } from "react";
import { getBubbleSize } from "../utils/getBubbleSize";

export function useBubbleSize() {
  const [size, setSize] = useState(() => getBubbleSize(Infinity));

  useEffect(() => {
    const update = () => setSize(getBubbleSize(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}
