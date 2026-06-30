"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export default function useIsMobile(
  breakpoint = MOBILE_BREAKPOINT
) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width:${breakpoint - 1}px)`
    );

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}