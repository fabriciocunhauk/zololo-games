"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";

/** Timers that are cleared on unmount, or on demand with `clearAll`. */
export function useSafeTimeout() {
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  const clearAll = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
  }, []);

  useEffect(() => clearAll, [clearAll]);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      timers.current.delete(id);
      callback();
    }, delay);
    timers.current.add(id);
  }, []);

  return useMemo(() => ({ schedule, clearAll }), [schedule, clearAll]);
}
