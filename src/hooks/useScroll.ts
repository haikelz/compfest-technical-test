import { useAtom } from "jotai";
import { scrollAtom } from "../store";
import { useCallback, useEffect } from "react";
import { useAtomCallback } from "jotai/utils";

export function useScroll() {
  const [scroll, setScroll] = useAtom(scrollAtom);

  const handleScroll = useAtomCallback(
    useCallback(() => {
      setScroll(window.pageYOffset);
    }, [setScroll])
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
}
